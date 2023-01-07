from rest_framework import serializers

from price.models import Groups, Subject


class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject
        fields = ('id', 'name', 'slug')


class GroupsSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True, many=True)

    class Meta:
        model = Groups
        exclude  = ('owner', )
        read_only_fields = ('subject', 'name', )
