import jwt
import secrets
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from ..models.user import UserProfile

SECRET_KEY = secrets.token_hex(32)
TOKEN_EXPIRATION_SECONDS = 3600
MIN_USERNAME_LENGTH = 4
MIN_PASSWORD_LENGTH = 8


class UserController:
    def __init__(self, db):
        self.db = db

    def generate_jwt_token(self, user_id):
        payload = {
            "user_id": user_id,
            "exp": datetime.utcnow() + timedelta(seconds=TOKEN_EXPIRATION_SECONDS),
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        return token.decode("utf-8")

    def verify_jwt_token(self, token):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            return payload
        except jwt.ExpiredSignatureError:
            # Token has expired
            return None
        except jwt.InvalidTokenError:
            # Invalid token
            return None

    def register(self, data):
        # Validation and error handling here
        if "username" not in data or "email" not in data or "password" not in data:
            return {"message": "Username, email and password are required fields"}, 400

        if len(data["username"]) < MIN_USERNAME_LENGTH:
            return {
                "message": f"Username must be atleast {MIN_USERNAME_LENGTH} characters long"
            }, 400

        if len(data["password"]) < MIN_PASSWORD_LENGTH:
            return {
                "message": f"Username must be atleast {MIN_PASSWORD_LENGTH} characters long"
            }, 400

        user = UserProfile.query.filter_by(email=data["email"]).first()

        if user:
            return {"message": "Email is already registered"}, 409

        hashed_password = generate_password_hash(data["password"], method="sha256")
        new_user = UserProfile(
            username=data["username"], email=data["email"], password=hashed_password
        )

        try:
            self.db.session.add(new_user)
            self.db.session.commit()
            return {"message": "Registration successful"}
        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to register user"}, 500

    def login(self, data):
        # Validation and error handling
        if "email" not in data or "password" not in data:
            return {"message": "Email and password are required fields"}, 400

        user = UserProfile.query.filter_by(email=data["email"]).first()

        if not user:
            return {"message": "User not found"}, 404

        if not check_password_hash(user.password, data["password"]):
            return {"messge": "Invalid email or password"}, 401

        jwt_token = self.generate_jwt_token(user.id)
        return {"message": "Login successful", "token": jwt_token}
