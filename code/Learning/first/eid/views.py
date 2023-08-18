from django.shortcuts import render
import datetime
eid_al_fitr = datetime.date(2023, 4, 21)
eid_al_adha = datetime.date(2023, 6, 28)

def index(request):
    today = datetime.date.today()
    if today == eid_al_fitr or today == eid_al_adha:
        if today == eid_al_adha: message = 'adha'
        else: message = 'fitr'
        return render(request, 'd/index.html', {
            'message': f'Eid {message} mubarak!'
        })
    else:
        return render(request, 'd/index.html', {
            'message': 'No'
        })
