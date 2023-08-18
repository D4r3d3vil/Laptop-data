from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django import forms

class newTaskForm(forms.Form):
    task = forms.CharField(label='New Task')
    priority = forms.IntegerField(label="priority", min_value=1, max_value=100)
    

# Create your views here.
def index(request):
    if "tasks" not in request.session:
        request.session['tasks'] = []
    return render(request, 'app/index.html', {
        'tasks': request.session["tasks"]
    })
def sortFunc(e):
    return e['priority']
def add(request):
    if "tasks" not in request.session:
        request.session['tasks'] = []
    if request.method == 'POST':
        form = newTaskForm(request.POST)
        if form.is_valid():
            task = form.cleaned_data["task"]
            for i in request.session['tasks']:
                if i['task'] == task:
                     return render(request, 'app/add.html', {
                    'message': 'This task already exists',
                    'form': form
                    })
            priority = form.cleaned_data["priority"]
            request.session['tasks'] += [{'task':task, 'priority':priority}]
            request.session['tasks'].sort(key=sortFunc)
            request.session['tasks'].reverse()
            return HttpResponseRedirect(reverse("tasks:index"))
        else:
            return render(request, 'app/add.html', {
                "form": form
            })
    return render(request, "app/add.html", {
        'form': newTaskForm(),
        'message': ''
    })