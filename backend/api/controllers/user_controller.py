import jwt
import logging
import secrets
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from ..models.user import UserProfile
from config import DbConfig

SECRET_KEY = DbConfig.SECRET_KEY
TOKEN_EXPIRATION_SECONDS = 3600
MIN_USERNAME_LENGTH = 4
MIN_PASSWORD_LENGTH = 8


class UserController:
    def __init__(self, db: SQLAlchemy):
        self.db = db

    def generate_jwt_token(self, user_id):
        payload = {
            "user_id": user_id,
            "exp": datetime.utcnow() + timedelta(seconds=TOKEN_EXPIRATION_SECONDS),
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        return token

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

        hashed_password = generate_password_hash(
            data["password"], method="pbkdf2:sha256"
        )

        new_user = UserProfile(
            username=data["username"], email=data["email"], password=hashed_password
        )
        print("Plaintext Password:", data["password"])
        # print("Hashed Password:", hashed_password)

        try:
            self.db.session.add(new_user)
            self.db.session.commit()
            jwt_token = self.generate_jwt_token(new_user.id)
            return {
                "message": "User registered successfully",
                "token": jwt_token,
                "userId": new_user.id,
            }, 201
        except Exception as e:
            self.db.session.rollback()
            return {"message": "Failed to register user. Error" + str(e)}, 500

    def login(self, data):
        logging.debug("Login method called")
        # Validation and error handling
        if "email" not in data or "password" not in data:
            return {"message": "Email and password are required fields"}, 400

        user = UserProfile.query.filter_by(email=data["email"]).first()

        if not user:
            return {"message": "User not found"}, 404

        if check_password_hash(user.password, data["password"]):
            jwt_token = self.generate_jwt_token(user.id)
            return {
                "message": "Login successful",
                "token": jwt_token,
                "userId": user.id,
            }
        else:
            logging.debug(f"Stored Hashed Password: {user.password}")
            logging.debug(f"Provided Password: {data['password']}")
            logging.debug(f"Provided email: {user.email}")

            return {"message": "Invalid email or password"}, 401

    def check_username_availability(self, username):
        user = UserProfile.query.filter_by(username=username).first()
        return user is None

    def check_email_availability(self, email):
        email = UserProfile.query.filter_by(email=email).first()
        return email is None
