from django.contrib import admin
from .models import *

admin.site.register(CustomUser)
admin.site.register(Course)
admin.site.register(Lesson)
admin.site.register(Results)
# Register your models here.
