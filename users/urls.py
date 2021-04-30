from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.login_user),
    path('logout/', views.logout_user),
    path('is-authenticated', views.is_authenticated),
]
