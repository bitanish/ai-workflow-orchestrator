from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.utils.jwt_handler import create_access_token
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DEFAULT_USER = {
    "username": "admin",
    "password": pwd_context.hash("admin123")
}

@router.post("/login")
def login(user: User):
    if user.username != DEFAULT_USER["username"] or not pwd_context.verify(user.password, DEFAULT_USER["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}