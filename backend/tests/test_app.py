# test/test_app.py
import unittest
from fastapi.testclient import TestClient
from app.main import app  # Import the FastAPI app instance


class BasicTests(unittest.TestCase):

    def setUp(self):
        self.client = TestClient(app)  # Create a TestClient instance

    def test_health(self):
        response = self.client.get('/api/health')  # Corrected endpoint
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {'status': 'healthy', 'message': 'Backend is running successfully'},
        )  # Adjusted expected response

    def test_message(self):
        response = self.client.get('/api/message')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {'message': "You've successfully integrated the backend!"},
        )  # Adjusted expected response


if __name__ == '__main__':
    unittest.main()
