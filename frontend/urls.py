from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('login/', index),
    path('register/', index),
    path('reset-password/', index),
    path('reset-password/done/', index),
    path('list/', index),
]
