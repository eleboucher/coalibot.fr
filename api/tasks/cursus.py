import logging

from celery import shared_task
from datetime import datetime

from api.models import CursusUser, Cursus, Student
from api.client import FortyTwoClient

client = FortyTwoClient()
logger = logging.getLogger(__name__)


@shared_task
def fetch_cursus_user():
    page = 1
    res = client.get(
        f"/cursus_users?page[number]={page}&page[size]=100&filter[campus_id]=1"
    )
    while len(res.json()) != 0:
        logger.info(page)
        for cursus_user in res.json():
            begin_at = datetime.strptime(
                cursus_user["begin_at"], "%Y-%m-%dT%H:%M:%S.%fZ"
            ).strftime("%Y-%m-%d")
            end_at = (
                None
                if cursus_user["end_at"] is None
                else datetime.strptime(
                    cursus_user["end_at"], "%Y-%m-%dT%H:%M:%S.%fZ"
                ).strftime("%Y-%m-%d")
            )
            cursus = get_cursus(cursus_user["cursus_id"])
            user = get_user(cursus_user["user"]["id"], cursus_user["user"]["login"])
            CursusUser.objects.get_or_create(
                grade=cursus_user["grade"],
                level=cursus_user["level"],
                skills=cursus_user["skills"],
                begin_at=begin_at,
                end_at=end_at,
                user_id=user,
                cursus_id=cursus,
            )
        page += 1
        res = client.get(
            f"/cursus_users?page[number]={page}&page[size]=100&filter[campus_id]=1"
        )


def get_user(user_id, login):
    user = Student.objects.filter(login=login)
    if user.exists():
        return user[0]
    else:
        user = Student(user_id=user_id, login=login)
        logger.info(f"Student {login} created")
        user.save()
        return user


def get_cursus(cursus_id):
    cursus = Cursus.objects.filter(cursus_id=cursus_id)
    if cursus.exists():
        return cursus[0]
    else:
        res = client.get(f"/cursus/{cursus_id}")
        data = res.json()
        cursus = Cursus(cursus_id=cursus_id, name=data["name"], slug=data["slug"])
        cursus.save()
        return cursus
