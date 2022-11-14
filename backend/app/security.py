from datetime import datetime, timedelta
from typing import Optional, Any, Union

from jose import jwt

from passlib.context import CryptContext


# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "480fd360e33fae2e352f1bcb80f3d9e5101cea49bd812a87f30998c4b928c30e"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(subject: Union[str, Any]):
    #if expires_delta:
    #    expire = datetime.utcnow() + expires_delta
    #else:
    #    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    #to_encode = {"exp": expire, "sub": str(subject)}
    to_encode = {"sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
