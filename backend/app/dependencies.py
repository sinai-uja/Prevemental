from typing import Generator

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

from . import crud, schemas, security
from .database import SessionLocal


reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"/login"
)


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_supervisor(
    db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)
):
    """Take a DB session and a token as input and return the supervisor 
    having that token."""

    print(" ".join((
            "HTTP request recieved.",
            "Checking token's owner cretentials..."
    )))
    
    try:
        payload = jwt.decode(
            token, security.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = schemas.TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials"
        )
    supervisor = crud.get_supervisor(db, supervisor_id=token_data.sub)
    if not supervisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Supervisor not found"
        )
    print(f"Token owner's email: {supervisor.email}")
    return supervisor