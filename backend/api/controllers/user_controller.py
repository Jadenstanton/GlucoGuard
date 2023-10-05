import jwt
import secrets
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash

SECRET_KEY = secrets.token_hex(32)
TOKEN_EXPIRATION_SECONDS = 3600
MIN_USERNAME_LENGTH = 4
MIN_PASSWORD_LENGTH = 8

# Replace with actual db interactions
users = []

def generate_jwt_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(seconds=TOKEN_EXPIRATION_SECONDS)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token.decode('utf-8')


def verify_jwt_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        # Token has expired
        return None
    except jwt.InvalidTokenError:
        # Invalid token
        return None



def register(data):
    # Validation and error handling here
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return {'message': 'Username, email and password are required fields'}, 400
    
    if len(data['username']) < MIN_USERNAME_LENGTH:
        return {'message': f'Username must be atleast {MIN_USERNAME_LENGTH} characters long'}, 400
    
    if len(data['password']) < MIN_PASSWORD_LENGTH:
        return {'message': f'Username must be atleast {MIN_PASSWORD_LENGTH} characters long'}, 400
    
    # TODO
    # replace with actual db query
    if any(user['email'] == data['email'] for user in users):
        return {'message': 'Email is already registered'}, 409

    # Hash password before storing it in db
    hashed_password = generate_password_hash(data['password'], method='sha256')
    user = {
        'username': data['username'],
        'email': data['email'],
        'password': hashed_password
    }
    users.append(user)
    return {'message': 'Registration successful'}



def login(data):
    # Validation and error handling 
    if 'email' not in data or 'password' not in data:
        return {'message': 'Email and password are required fields'}, 400
    
    user = next((user for user in users if user['email'] == data['email']), None)
    
    if user is None:
        return {'message': 'User not found'}, 404
    
    if not check_password_hash(user['password'], data['password']):
        return {'messge': 'Invalid email or password'}, 401

    if user and check_password_hash(user['password'], data['password']):
        # Gen auth token (JWT) and return it
        jwt_token = generate_jwt_token(user['user_id'])
        return {'message': 'Login successful', 'token': jwt_token}
    else:
        return {'message': 'Invalid email or password'}