import pytest
from ..app import create_app
from config import TestingConfig
from backend.database.database import db
from sqlalchemy.orm import sessionmaker


@pytest.fixture(scope="session")
def test_app():
    """Create and configure a new app instance for testing."""
    app = create_app(TestingConfig)
    with app.app_context():
        yield app  # this is the app instance you'll use for testing


@pytest.fixture(scope="session")
def test_client(test_app):
    """A test client for the app."""
    return test_app.test_client()


@pytest.fixture(scope="session")
def test_db(test_app):
    """Session-wide test database."""
    with test_app.app_context():
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
