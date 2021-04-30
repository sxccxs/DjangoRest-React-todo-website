from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.http.response import JsonResponse
from django.contrib.auth import authenticate, login, logout


@api_view(http_method_names=['POST'])
def login_user(request):
    print(request.user)
    if request.user.is_authenticated:
        return JsonResponse({'message': 'You are already authenticated'},
                            status=status.HTTP_403_FORBIDDEN)
    username = request.data['username']
    password = request.data['password']
    user = authenticate(request, username=username, password=password)
    print(user)
    if user:
        login(request, user)
        return JsonResponse({'message': 'You logged in successfuly'},
                            status=status.HTTP_200_OK)
    else:
        return JsonResponse({'message':
                             'User with provided data does not exist'},
                            status=status.HTTP_404_NOT_FOUND)


@permission_classes(permission_classes=[IsAuthenticated])
@api_view(http_method_names=['GET'])
def logout_user(request):
    print(request.user)
    logout(request)
    print(request.user)
    return JsonResponse({'message': 'You logged out successfuly'},
                        status=status.HTTP_200_OK)


@api_view(http_method_names=['GET'])
def is_authenticated(request):
    return JsonResponse({"is_authenticated": request.user.is_authenticated})
