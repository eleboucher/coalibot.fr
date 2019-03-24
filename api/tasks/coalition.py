import logging

from celery import shared_task
from datetime import datetime

from api.models import Coalition, CoalitionUser, Student
from api.client import FortyTwoClient

client = FortyTwoClient()
logger = logging.getLogger(__name__)


@shared_task
def fetch_coalition_user():
    page = 1
    res = client.get(
        f"/coalitions_users?page[number]={page}&page[size]=100&filter[campus_id]=1"
    )
    while len(res.json()) != 0:
        logger.info(page)
        for coalition_user in res.json():
            cursus = get_coalition(coalition_user["cursus_id"])
            user = get_user(coalition_user["user"]["id"])
            CoalitionUser.objects.get_or_create(
                score=coalition_user["score"],
                rank=coalition_user["rank"],
                user_id=user,
                cursus_id=cursus[0],
            )
        page += 1
        res = client.get(
            f"/coalitions_users?page[number]={page}&page[size]=100&filter[campus_id]=1"
        )


def get_user(user_id):
    user = Student.objects.filter(user_id=user_id)
    if user.exists():
        return user[0]
    else:
        res = client.get(f"/users/{user_id}")
        login = res.json()["login"]
        user = Student(user_id=user_id, login=login)
        logger.info(f"Student {login} created")
        return user


def get_coalition(coalition_id):
    coalition = Coalition.objects.filter(coalition_id=coalition_id)
    if coalition.exists():
        return coalition[0]
    else:
        res = client.get(f"/coalitions/{coalition_id}")
        data = res.json()
        coalition = Coalition(
            coalition_id=coalition_id,
            name=data["name"],
            slug=data["slug"],
            color=data["color"],
            score=data["score"],
        )
        coalition.save()
        return coalition
