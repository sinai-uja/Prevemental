from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Supervisor(Base):
    __tablename__ = "supervisors"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    hashed_password = Column(String)

    users = relationship("User", cascade="all,delete")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    profile_image = Column(String)
    supervisor_id = Column(Integer, ForeignKey("supervisors.id"))

    social_networks = relationship("SocialNetwork", cascade="all,delete")

class SocialNetwork(Base):
    __tablename__ = "social_networks"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    score_1 = Column(Integer)
    score_2 = Column(Integer)
    score_3 = Column(Integer)
    score_4 = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))