from typing import Optional
from enum import Enum

from pydantic import BaseModel, Field, EmailStr


# ---------- TOKEN SCHEMAS ----------
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[int] = None


# ---------- SOCIAL NETWORK SCHEMAS ----------
class SocialNetworkType(str, Enum):
    twitter = "twitter"
    instagram = "instagram"

class SocialNetworkBase(BaseModel):
    name: SocialNetworkType
    score_1: float = 0.0
    score_2: float = 0.0
    score_3: float = 0.0
    score_4: float = 0.0

class SocialNetworkCreate(SocialNetworkBase):
    pass

class SocialNetwork(SocialNetworkBase):
    id: int = Field(gt=0)
    
    class Config:
        orm_mode = True

# ---------- USER SCHEMAS ----------
class UserBase(BaseModel):
    name: str
    profile_image: str = "default.png"

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int = Field(ge=0)
    supervisor_id: int = Field(ge=0)
    social_networks: list[SocialNetwork] = []
    
    class Config:
        orm_mode = True

# ---------- SUPERVISOR SCHEMAS ----------
class SupervisorBase(BaseModel):
    email: EmailStr

class SupervisorUpdate(BaseModel):
    password: str

class SupervisorCreate(SupervisorBase):
    password: str

class Supervisor(SupervisorBase):
    id: int = Field(get=0)
    users: list[User] = []

    class Config:
        orm_mode = True

class SupervisorModelDB(Supervisor):
    hashed_password: str