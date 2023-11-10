import pytest
from backend.api.models.user import UserProfile


# def test_safety_check(test_db):
#     assert "test_" in test_db.engine.url.database


def test_create_user(db_session):
    # Create a new user
    user = UserProfile(
        username="testuser2",
        email="testuser2@example.com",
        password="password123",  # TODO: Hash this password
    )
    db_session.add(user)
    db_session.commit()

    retrieved_user = (
        db_session.query(UserProfile).filter_by(username="testuser2").first()
    )
    assert retrieved_user is not None
    assert retrieved_user.email == "testuser2@example.com"
    assert retrieved_user.username == "testuser2"

    # Cleanup: Remove the created user
    # db_session.delete(retrieved_user)
    # db_session.commit()


def test_create_existing_email_user(db_session, setup_user):
    # Try creating a user with an existing email and catch the expected IntegrityError
    duplicate_user = UserProfile(
        username="duplicateuser",
        email="testuser@example.com",
        password="duppassword",  # TODO: Hash this password
    )

    with pytest.raises(Exception) as e_info:
        db_session.add(duplicate_user)
        db_session.commit()

    # Rollback the session to a clean state
    db_session.rollback()


def test_update_user_email(db_session, setup_user):
    # Update the email of the user
    user = db_session.query(UserProfile).filter_by(username="testuser").first()
    user.email = "updated_email@example.com"
    db_session.commit()

    updated_user = db_session.query(UserProfile).filter_by(username="testuser").first()
    assert updated_user.email == "updated_email@example.com"


def test_delete_user(db_session, setup_user):
    # Delete the user and check if it was successful
    user = db_session.query(UserProfile).filter_by(username="testuser").first()
    db_session.delete(user)
    db_session.commit()

    deleted_user = db_session.query(UserProfile).filter_by(username="testuser").first()
    assert deleted_user is None
