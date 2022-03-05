from pickle import FALSE
import re
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from django.http import JsonResponse
from pymongo import MongoClient

mongo_uri = 'mongodb://mongo:27017'
db = MongoClient(mongo_uri)['todo-db']

class TodoListView(APIView):

    def get(self, request):
        # Implement this method - return all todo items from db instance above.
        try:
            todoData = db.todos.find()
            todoArr = []
            for todo in todoData:
                todo["_id"] = str(todo["_id"])
                todoArr.append(todo)
            return JsonResponse(todoArr,safe=False)
        except:
            return JsonResponse({"success":FALSE},status=500)
        
    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        received_json_data = json.loads(request.body.decode("utf-8"))
        new_todo = received_json_data
        try:
            db.todos.insert_one(new_todo)
            return Response({"success":True}, status=status.HTTP_200_OK)
        except:
            return Response({"success":True}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

