from typing import Any, Union
import yaml

from jose import jwt
from passlib.context import CryptContext
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP


with open("../config.yaml", "r") as ymlfile:
    cfg = yaml.load(ymlfile, Loader=yaml.FullLoader)

PUBLIC_RSA_PATH = cfg["social_network"]["public_rsa_path"]

# ------- ACCOUNT SECURITY -------
# to get a new secret key run:
# openssl rand -hex 32
SECRET_KEY = cfg["account"]["secret_key"]
ALGORITHM = cfg["account"]["algorithm"]
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

def rsa_encrypt(plain_text):
    try:
        encoded_message = bytes(plain_text, "utf-8")
        key = RSA.importKey(open(PUBLIC_RSA_PATH).read())
        cipher = PKCS1_OAEP.new(key)
        ciphertext = cipher.encrypt(encoded_message)
    except:
        print("ERROR!")
    return ciphertext