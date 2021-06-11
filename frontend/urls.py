from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('login/', index),
    path('logout/', index),
    path('register/', index),
    path('activate/sent/', index),
    path('activate/<str:uid>/<str:token>', index),
    path('reset-password/', index),
    path('reset-password/<str:uid>/<str:token>', index),
    path('list/', index),
]
