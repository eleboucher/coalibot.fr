FROM python:3.6

RUN pip install pipenv --upgrade
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

COPY Pipfile Pipfile.lock setup.cfg ./

# -- Install dependencies:
RUN set -ex && pipenv install --system --dev --ignore-pipfile

WORKDIR /back
