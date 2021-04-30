from typing import Optional, OrderedDict
from .serializers import TaskSerializer
from .models import Task


def get_all_tasks() -> list[OrderedDict]:
    task_serializer = TaskSerializer(Task.objects.all(), many=True)
    return task_serializer.data


def create_task(data: dict) -> tuple[dict, dict]:
    task_serializer = TaskSerializer(data=data)
    if task_serializer.is_valid():
        task_serializer.save()
    return task_serializer.data, task_serializer.errors


def get_task_if_exists(pk: int) -> Optional[Task]:
    if Task.objects.filter(pk=pk).exists():
        return Task.objects.get(pk=pk)


def update_task(task_to_change: Task, data: dict) -> tuple[dict, dict]:
    task_serializer = TaskSerializer(task_to_change, data=data,
                                     partial=True)
    if task_serializer.is_valid():
        task_serializer.save()
    return task_serializer.data, task_serializer.errors


def delete_task(task_to_delete: Task) -> None:
    task_to_delete.delete()
