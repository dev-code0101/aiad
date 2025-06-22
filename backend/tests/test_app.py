import unittest
from app import main as app


class BasicTests(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_health(self):
        response = self.app.get('/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'status': 'healthy'})

    def test_message(self):
        response = self.app.get('/api/message')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'message': 'Hello, World!'})


if __name__ == '__main__':
    unittest.main()
