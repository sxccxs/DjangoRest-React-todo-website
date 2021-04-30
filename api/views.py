from . import services as svc
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes


@parser_classes([JSONParser])
@api_view(http_method_names=['GET', 'POST'])
def list(request):
    if not request.user.is_authenticated:
        return JsonResponse({"message": "You are not authenticated"},
                            status=status.HTTP_403_FORBIDDEN)
    if request.method == 'GET':
        return JsonResponse(svc.get_all_tasks(), safe=False,
                            status=status.HTTP_200_OK)
    elif request.method == 'POST':
        data, errors = svc.create_task(request.data)
        if not errors:
            return JsonResponse(data, status=status.HTTP_201_CREATED)
        return JsonResponse(errors, status=status.HTTP_400_BAD_REQUEST)


@parser_classes([JSONParser])
@api_view(http_method_names=['PUT', 'DELETE'])
def edit_tasks(request, pk: int):
    if not request.user.is_authenticated:
        return JsonResponse({"message": "You are not authenticated"},
                            status=status.HTTP_403_FORBIDDEN)
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
