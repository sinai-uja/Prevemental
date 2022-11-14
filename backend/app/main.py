import os

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from . import crud, schemas, security, models
from .database import SessionLocal, engine, Base
from .dependencies import get_current_supervisor

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Static images
# app.mount("/users/images", StaticFiles(directory="static/images"), name="static")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- SUPERVISOR ENDPOINTS ----------
@app.post("/register", response_model=schemas.Supervisor, tags=["Supervisor"])
def create_supervisor(
    supervisor: schemas.SupervisorCreate, 
    db: Session = Depends(get_db)
):
    """HTTP method to create a new supervisor."""

    db_supervisor = crud.get_supervisor_by_email(db, email=supervisor.email)
    if db_supervisor:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Email already registered"
        )
    if len(supervisor.password) < 8:
        raise HTTPException(
            status_code=status.HTTP_411_LENGTH_REQUIRED, 
            detail="Your password must be at least 8 characters long"
        )

    return crud.create_supervisor(db=db, supervisor=supervisor)

@app.post("/login", response_model=schemas.Token, tags=["Supervisor"])
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """HTTP method to validate the user credentials.
    
    Returns:
        A validation token."""

    supervisor = crud.authenticate_supervisor(
        db, 
        form_data.username, 
        form_data.password
    )

    # Check credentials
    if not supervisor:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    # Create access token
    #access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(supervisor.id)

    return {"access_token": access_token, "token_type": "bearer"}

@app.put("/supervisor/update", tags=["Supervisor"])
def update_supervisor(
    supervisor_update: schemas.SupervisorUpdate,
    supervisor: models.Supervisor = Depends(get_current_supervisor),
    db: Session = Depends(get_db)
):
    """HTTP method to update the supervisor fields (only password for now).
    
    The supervisor must be previously validated.
    """
    if len(supervisor_update.password) < 8:
        raise HTTPException(
            status_code=status.HTTP_411_LENGTH_REQUIRED, 
            detail="Your password must be at least 8 characters long"
        )

    crud.update_password(db, supervisor, supervisor_update.password)
    return {"status": status.HTTP_200_OK}

@app.delete("/supervisor", tags=["Supervisor"])
def delete_supervisor(
    supervisor: models.Supervisor = Depends(get_current_supervisor),
    db: Session = Depends(get_db)
):
    """HTTP method to delete the supervisor.
    
    The supervisor must be previously validated.
    """
    print(supervisor.email)
    print(supervisor.hashed_password)
    crud.delete_supervisor(db, supervisor)

    return {"status": status.HTTP_200_OK}


# ---------- USER ENDPOINTS ----------
@app.get("/users", response_model=list[schemas.User], tags=["User"])
def get_supervisor_users(
    supervisor: models.Supervisor = Depends(get_current_supervisor),
    db: Session = Depends(get_db)
):
    """HTTP method to get all users associated with the validated supervisor."""
    return supervisor.users


@app.post("/users", response_model=schemas.User, tags=["User"])
def create_user_for_supervisor(
    user_create: schemas.UserCreate, 
    supervisor: models.Supervisor = Depends(get_current_supervisor),
    db: Session = Depends(get_db)
):
    """HTTP method to create a new user associated with the validated supervisor."""
    
    for user in supervisor.users:
        if user_create.name in user.name:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User name already exists"
            )

    return crud.create_supervisor_user(
        db=db, 
        user_create=user_create, 
        supervisor_id=supervisor.id
    )

@app.delete("/users/{user_id}", tags=["User"])
def delete_user(
    user_id: int,
    supervisor: models.Supervisor = Depends(get_current_supervisor),
    db: Session = Depends(get_db)
):
    """HTTP method to delete an user associated with the validated supervisor."""

    for user in supervisor.users:
        if user_id == user.id:
            response = crud.delete_user(db, user_id)
            if not response:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User not found"
                )
            return {"ok": True}

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found"
    )

# @app.get("/users/profile-images", tags=["User"])
# def get_profile_images():
#     """Gets all the available profile image names to be accesed at 
#     /users/images/{image_name.png}.
#     """

#     return os.listdir("static/images")


# ---------- SOCIAL NETWORK ENDPOINTS ----------
@app.get("/users/{user_id}/social-networks", tags=["Social Network"])
def get_social_networks(
    user_id: int,
    supervisor: models.Supervisor = Depends(get_current_supervisor),
    db: Session = Depends(get_db)
):
    """HTTP method to get a social network associated with an user.
    
    The user's supervisor must be previously validated.
    """

    # Get user by id
    user = db.get(models.User, user_id)

    # Check if the user is correct
    if user is None or user.supervisor_id != supervisor.id:
        raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Wrong user id"
        )
    
    return user.social_networks

@app.post(
    "/users/{user_id}/social-networks/{social_network}", 
    tags=["Social Network"]
)
def create_social_network(
    user_id: int,
    social_network: schemas.SocialNetworkType,
    supervisor: models.Supervisor = Depends(get_current_supervisor),
    db: Session = Depends(get_db)
):
    """HTTP method to create a social network associated with an user.
    
    The user's supervisor must be previously validated.
    """

    # Get user by id
    user = db.get(models.User, user_id)

    # Check if the user is correct
    if user is None or user.supervisor_id != supervisor.id:
        raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Wrong user id"
        )        

    # Create social network
    social_network_model = schemas.SocialNetworkCreate(name=social_network)
    social_network = crud.create_social_network(db, social_network_model, user_id)

    return social_network

@app.put(
    "/users/{user_id}/social-networks/{social_network_id}", 
    tags=["Social Network"]
)
def update_social_network(
    user_id: int,
    social_network_id: int,
    supervisor: models.Supervisor = Depends(get_current_supervisor),
    db: Session = Depends(get_db)
):
    """HTTP method to update a social network associated with an user.
    
    The user's supervisor must be previously validated.
    """

    # TODO: Implement this.
    # Get user by id
    # Check if the user belongs to the current supervisor
    # Update social network
    return {"status": "NOT IMPLEMENTED (WIP)"}

@app.delete(
    "/users/{user_id}/social-networks/{social_network_id}", 
    tags=["Social Network"]
)
def delete_social_network(
    user_id: int,
    social_network_id: int,
    supervisor: models.Supervisor = Depends(get_current_supervisor),
    db: Session = Depends(get_db)
):
    """HTTP method to delete a social network associated with an user.
    
    The user's supervisor must be previously validated.
    """

    # Get user by id
    user = db.get(models.User, user_id)

    # Check if the user is correct
    if user is None or user.supervisor_id != supervisor.id:
        raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Wrong user id"
        )
    
    # Delete social network
    response = crud.delete_social_network(db, social_network_id)
    if not response:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return {"ok": True}