from rest_framework import serializers

from .models import Movie


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ["id", "title", "genre", "duration", "rating", "score", "synopsis", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_title(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("El título debe tener al menos 2 caracteres.")
        return value

    def validate_duration(self, value):
        if not 30 <= value <= 300:
            raise serializers.ValidationError("La duración debe estar entre 30 y 300 minutos.")
        return value

    def validate_score(self, value):
        if not 0 <= value <= 10:
            raise serializers.ValidationError("La valoración debe estar entre 0 y 10.")
        return value
