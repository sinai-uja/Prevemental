from sqlalchemy.orm import Session

from . import models, schemas, security

# ---------- SUPERVISOR METHODS ----------
def get_supervisor(db: Session, supervisor_id: int):
    return db.query(models.Supervisor).filter(models.Supervisor.id == supervisor_id).first()

def get_supervisor_by_email(db: Session, email: str):
    return db.query(models.Supervisor).filter(models.Supervisor.email == email).first()

def create_supervisor(db: Session, supervisor: schemas.SupervisorCreate):
    hashed_password = security.get_password_hash(supervisor.password)
    db_supervisor = models.Supervisor(
        email=supervisor.email, 
        hashed_password=hashed_password
    )
    db.add(db_supervisor)
    db.commit()
    db.refresh(db_supervisor)
    return db_supervisor

def update_password(db: Session, supervisor: models.Supervisor, password: str):
    hashed_password = security.get_password_hash(password)
    supervisor_db = db.get(models.Supervisor, supervisor.id)
    supervisor_db.hashed_password = hashed_password
    db.commit()
    db.refresh(supervisor_db)

def delete_supervisor(db: Session, supervisor: models.Supervisor):
    supervisor_db = db.get(models.Supervisor, supervisor.id)
    db.delete(supervisor_db)
    db.commit()

def authenticate_supervisor(db: Session, email: str, password: str):
    """Checks supervisor credentials.
    
    Args:
        db: Session. The database session.
        email: String. The email of the supervisor.
        password: String. Plain text password.
    
    Returns:
        The supervisor if the credentials are correct. False otherwise.
    """
    db_supervisor = get_supervisor_by_email(db, email=email)
    if db_supervisor is None:
        return False
    if not security.verify_password(password, db_supervisor.hashed_password):
        return False
    return db_supervisor

# ---------- USER METHODS ----------
def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_supervisor_user(
    db: Session, 
    user_create: schemas.UserCreate, 
    supervisor_id: int
):
    """Creates a user for the given supervisor.
    
    Args:
        db: Session. The database session.
        user_name: String. The name of the user to be created.
        supervisor_id: Integer. The id of the supervisor.
        
    Returns:
        The created user.
    """
    db_user = models.User(**user_create.dict(), supervisor_id=supervisor_id)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    user = db.get(models.User, user_id)
    if not user:
        return False
    db.delete(user)
    db.commit()
    return True


# ---------- SOCIAL NETWORK METHODS ----------
def create_social_network(
    db: Session,
    social_network: schemas.SocialNetworkCreate, 
    user_id: int
):
    db_social_network = models.SocialNetwork(
        **social_network.dict(),
        user_id=user_id
    )
    db.add(db_social_network)
    db.commit()
    db.refresh(db_social_network)
    return db_social_network


def delete_social_network(
    db: Session,
    social_network_id: int
):
    social_network = db.get(models.SocialNetwork, social_network_id)
    if not social_network:
        return False
    db.delete(social_network)
    db.commit()
    return True