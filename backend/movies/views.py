from rest_framework import viewsets

from .models import Movie
from .serializers import MovieSerializer


class MovieViewSet(viewsets.ModelViewSet):
    """
    /api/movies/       GET (list) · POST (create)
    /api/movies/<id>/  GET · PUT · PATCH · DELETE
    """

    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
