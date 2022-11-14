from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# CONFIG
user = 'root'
password = '1234'
#address = 'localhost'
address = 'db' # docker container hostname where data is persisted (check docker-compose)
port = '3306'
database = 'bighug'

SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{user}:{password}@{address}:{port}/{database}"
#SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"

# Create the SQLAlchemy engine (connect_args are only needed for SQLite)
# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
# )
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create database session class (not an instance)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base model class (not an instance)
Base = declarative_base()
