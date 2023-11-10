import json

# Assuming these are the necessary imports for your tests
from backend.api.models.user import UserProfile


def test_register_user(client, db_session):
    # Preparing data for a new user
    new_user_data = {
        "username": "testuser3",
        "email": "testuser3@example.com",
        "password": "password123",
    }

    # Send registration request
    response = client.post(
        "api/user/register",
        data=json.dumps(new_user_data),
        content_type="application/json",
    )

    # Validate successful registration response
    assert response.status_code == 201
    assert response.json["message"] == "Registration successful"

    # Check that the user was added to the database
    user = UserProfile.query.filter_by(email=new_user_data["email"]).first()
    assert user is not None


def test_register_existing_user(client, db_session):
    # Assuming a user has been previously added using test_register_user
    existing_user_data = {
        "username": "testuser3",
        "email": "testuser3@example.com",
        "password": "password123",
    }

    # Try to register the same user again
    response = client.post(
        "api/user/register",
        data=json.dumps(existing_user_data),
        content_type="application/json",
    )

    # Validate conflict response
    assert response.status_code == 409
    assert response.json["message"] == "Email is already registered"


def test_login_valid_user(client, db_session):
    # Valid user credentials for a previously registered user
    login_data = {
        "email": "testuser3@example.com",
        "password": "password123",
    }

    # Send login request
    response = client.post(
        "api/user/login", data=json.dumps(login_data), content_type="application/json"
    )

    # Validate successful login response
    assert response.status_code == 200
    assert "Login successful" in response.json["message"]
    assert "token" in response.json


def test_login_invalid_user(client, db_session):
    # Invalid user credentials
    invalid_login_data = {
        "email": "nonexistent@example.com",
        "password": "wrongpassword",
    }

    # Send login request
    response = client.post(
        "api/user/login",
        data=json.dumps(invalid_login_data),
        content_type="application/json",
    )

    # Validate failure response
    assert response.status_code == 404
    assert response.json["message"] == "User not found"


# def test_get_user(client, setup_user):
#     response = client.get("/user/testuser")

#     assert response.status_code == 200
#     assert "testuser" in response.get_data(as_text=True)


# def test_update_user(client, setup_user):
#     data = {"email": "newemail@example.com"}
#     response = client.put(
#         "/user/testuser", data=json.dumps(data), content_type="application/json"
#     )

#     assert response.status_code == 200
#     assert "newemail@example.com" in response.get_data(as_text=True)


# def test_delete_user(client, setup_user):
#     response = client.delete("/user/testuser")

#     assert response.status_code == 204

#     # Ensure user was deleted
#     response = client.get("/user/testuser")
#     assert response.status_code == 404
