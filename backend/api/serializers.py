from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from price.models import Groups, Subject
from priceTelegram.models import GroupsTelegram


User = get_user_model()


class CustomUserCreateSerializer(UserCreateSerializer):
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email',
                  'password')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'username': {'required': True},
            'email': {'required': True},
            'password': {'required': True},
        }


class CustomUserSerializer(UserSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email')


class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject
        fields = ('id', 'name', 'slug')


class GroupsSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True, many=True)

    class Meta:
        model = Groups
        exclude = ('owner', )
        read_only_fields = ('subject', 'name', )


class GroupsTelegramSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True, many=True)

    class Meta:
        model = GroupsTelegram
        exclude = ('owner', )
        read_only_fields = ('subject', 'name', )
