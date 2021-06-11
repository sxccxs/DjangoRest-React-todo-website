from . import services as svc
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import (api_view, parser_classes,
                                       permission_classes)


@parser_classes([JSONParser])
@api_view(http_method_names=['GET', 'POST'])
@permission_classes([IsAuthenticated])
def list(request):
    if request.method == 'GET':
        tasks = svc.get_tasks_for_user(request.user)
        return JsonResponse(tasks, safe=False,
                            status=status.HTTP_200_OK)
    elif request.method == 'POST':
        data, errors = svc.create_task(request.data, request.user)
        if not errors:
            return JsonResponse(data, status=status.HTTP_201_CREATED)
        return JsonResponse(errors, status=status.HTTP_400_BAD_REQUEST)


@parser_classes([JSONParser])
@api_view(http_method_names=['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def edit_tasks(request, pk: int):
    selected_task = svc.get_task_if_exists(pk=pk)
    if not selected_task:
        return JsonResponse({'message': 'Invalid id provided'},
                            status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        data, errors = svc.update_task(selected_task, request.data)
        if not errors:
            return JsonResponse(data, status=status.HTTP_200_OK)
        return JsonResponse(errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        svc.delete_task(selected_task)
        return JsonResponse({'message': 'Task was deleted successfully'},
                            status=status.HTTP_200_OK)
