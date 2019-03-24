from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from api.models import User, CursusUser, Student, Coalition, CoalitionUser, Cursus


admin.site.register(User, UserAdmin)
admin.site.register(CursusUser)
admin.site.register(Student)
admin.site.register(Coalition)
admin.site.register(Cursus)
admin.site.register(CoalitionUser)
