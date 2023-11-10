import pytest
from ..app import create_app
from config import TestingConfig
from backend.database.database import db
from sqlalchemy.orm import sessionmaker
from backend.api.models.user import UserProfile


@pytest.fixture(scope="session")
def app():
    """Create and configure a new app instance for testing."""
    app = create_app(TestingConfig)
    with app.app_context():
        yield app  # this is the app instance you'll use for testing


# New Fixture: Setup a user for tests
@pytest.fixture(scope="function")
def setup_user(db_session):
    user = UserProfile(
        username="testuser",
        email="testuser@example.com",
        password="password123",  # TODO: Hash this password
    )
    db_session.add(user)
    db_session.commit()
    yield user


@pytest.fixture(scope="session")
def test_client(app):
    """A test client for the app."""
    return app.test_client()


@pytest.fixture(scope="session")
def test_db(app):
    """Session-wide test database."""
    with app.app_context():
        db.create_all()
        yield db  # this is the database session you'll use for testing
        db.drop_all()


@pytest.fixture(scope="function", autouse=True)
def db_session(test_db, request):
    """
    Creates a new database session for a test. Ensures that all DB transactions are rolled back
    and new sessions are created for every test to avoid cross-test contamination.
    """
    connection = test_db.engine.connect()
    transaction = connection.begin()

    # Using sessionmaker to create a session
    Session = sessionmaker(bind=connection)
    session = Session()

    yield session
    session.rollback()
    session.close()  # Instead of session.remove()
    transaction.rollback()
    connection.close()
