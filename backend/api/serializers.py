from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


from price.models import Groups, Subject
from priceTelegram.models import GroupsTelegram
from priceInstagram.models import GroupsInstagram
from favorite.models import Favorite
from basket.models import Cart


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
        fields = ('id', 'first_name', 'last_name', 'username',
                  'email', 'is_superuser', 'is_staff')


class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject
        fields = ('id', 'name', 'slug')


class GroupsSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True, many=True)
    is_favorited = serializers.SerializerMethodField()
    is_in_shopping_cart = serializers.SerializerMethodField()

    class Meta:
        model = Groups
        exclude = ('owner', )
        read_only_fields = ('subject', 'label',)

    def get_is_favorited(self, obj):
        user = self.context.get('request').user
        if user.is_anonymous:
            return False
        return Groups.objects.filter(favorites__user=user, id=obj.id).exists()

    def get_is_in_shopping_cart(self, obj):
        user = self.context.get('request').user
        if user.is_anonymous:
            return False
        return Groups.objects.filter(cart__user=user, id=obj.id).exists()


class GroupsTelegramSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True, many=True)

    class Meta:
        model = GroupsTelegram
        exclude = ('owner', )
        read_only_fields = ('subject', 'name', )


class GroupsInstagramSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True, many=True)

    class Meta:
        model = GroupsInstagram
        exclude = ('owner', )
        read_only_fields = ('subject', 'name', )


class FavoriteSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='group_vk.id')
    name = serializers.ReadOnlyField(source='group_vk.name')
    price = serializers.ReadOnlyField(source='group_vk.price')
    avatar = serializers.ReadOnlyField(source='group_vk.avatar')
    link = serializers.ReadOnlyField(source='group_vk.link_screen')

    class Meta:
        model = Favorite
        fields = ('id', 'name', 'price', 'avatar', 'link', 'user', 'group_vk')
        extra_kwargs = {'user': {'write_only': True},
                        'group_vk': {'write_only': True}}

    def validate(self, data):
        if Favorite.objects.filter(user=data['user'],
                                   group=data['group_vk']).exists():
            raise serializers.ValidationError('Группа уже в избранном')
        return data


class CropGroupsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Groups
        exclude = ('owner', )
        read_only_fields = ('subject', 'name', )


class CartSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='group_vk.id')
    name = serializers.ReadOnlyField(source='group_vk.name')
    price = serializers.ReadOnlyField(source='group_vk.price')
    avatar = serializers.ReadOnlyField(source='group_vk.avatar')
    link = serializers.ReadOnlyField(source='group_vk.link_screen')

    class Meta:
        model = Cart
        fields = ('id', 'name', 'price', 'avatar', 'link', 'user', 'group_vk')
        extra_kwargs = {'user': {'write_only': True},
                        'group_vk': {'write_only': True}}

    def validate(self, data):
        if Cart.objects.filter(user=data['user'],
                               recipe=data['group_vk']).exists():
            raise serializers.ValidationError('Группа уже есть в списке'
                                              ' покупок!')
        return data
