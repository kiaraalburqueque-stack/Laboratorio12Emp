from django.db import models


class Movie(models.Model):
    """A movie on the cinema billboard."""

    class Rating(models.TextChoices):
        ALL = "APT", "Apta para todos"
        OVER_14 = "14", "Mayores de 14"
        PG_13 = "PG-13", "PG-13"
        ADULTS = "18", "Mayores de 18"

    title = models.CharField("título", max_length=120)
    genre = models.CharField("género", max_length=60)
    duration = models.PositiveSmallIntegerField("duración (min)")
    rating = models.CharField("clasificación", max_length=5, choices=Rating.choices, default=Rating.ALL)
    score = models.DecimalField("valoración", max_digits=3, decimal_places=1, default=0)
    synopsis = models.TextField("sinopsis", blank=True)
    created_at = models.DateTimeField("creada", auto_now_add=True)

    class Meta:
        ordering = ["title"]
        verbose_name = "película"
        verbose_name_plural = "películas"

    def __str__(self):
        return self.title
