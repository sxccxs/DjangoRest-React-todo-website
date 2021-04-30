from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.list),
    path('<int:pk>', views.edit_tasks),
    path('auth/', include('users.urls')),
]
