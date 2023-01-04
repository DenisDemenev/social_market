from django.shortcuts import render
from .models import Groups

def index(request, subject_id =None):

    if subject_id:
        groups = Groups.objects.filter(subject=subject_id)

    else:
        groups = Groups.objects.all()

    context = {
        'groups': groups,

    }
    return render(request, 'price/index.html', context)