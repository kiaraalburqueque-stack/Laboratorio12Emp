from rest_framework import status
from rest_framework.test import APITestCase

from .models import Movie


class MovieApiTests(APITestCase):
    def setUp(self):
        self.movie = Movie.objects.create(title="Órbita Final", genre="Ciencia ficción", duration=128, rating="PG-13", score=8.7)

    def test_list(self):
        response = self.client.get("/api/movies/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create(self):
        data = {"title": "Zona Cero", "genre": "Acción", "duration": 110, "rating": "14", "score": "7.5"}
        response = self.client.post("/api/movies/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Movie.objects.count(), 2)

    def test_create_with_empty_title_returns_400(self):
        data = {"title": "", "genre": "Acción", "duration": 110}
        response = self.client.post("/api/movies/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("title", response.data)

    def test_delete(self):
        response = self.client.delete(f"/api/movies/{self.movie.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Movie.objects.exists())
