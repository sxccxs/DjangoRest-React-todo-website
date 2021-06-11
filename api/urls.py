from django.urls import path, include
from . import views


urlpatterns = [
    path('list/', views.list),
    path('list/<int:pk>/', views.edit_tasks),
    path('auth/', include('users.urls')),
]
