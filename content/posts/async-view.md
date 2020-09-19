---
title: Django async view realworld example application tutorial
date: 2020-08-19
published: false
tags: ['django 3.1', 'Django Async View', 'python']
series: false
cover_image: ./uploads/2020/01/Building-a-realworld-application-in-Django-written-tutorial-manascode.jpg
social_img: ./uploads/2020/01/Building-a-realworld-application-in-Django-written-tutorial-manascode.jpg
canonical_url: true
description: "Let's build a simple example of how we can use the async view function of Django 3.1"
---

## Django Async View

Django async view, The most awaited featued. I have been waiting for this for such a longtime. No only me all the Django enthusiast actually awaiting for this feture `The Async Support`. Finally we go that in django 3.1, and we are going to build our first application in Async view. 

It's really hard to maintain the time to write some articles about programming, now I can feel the pain of an YouTube creator ( espacially programmers ) to create a beatuful video out of the concent. 

Thanks to entire Django team

Here is the live demo [live website](https://sentimentanalyzer-manascode.herokuapp.com/analyze/) of what we are going to build throughout this article. 

## What we are going to build

To demonstate django async view properly I think this simple application will help you a lot. I have been looking for an Open API to build this application, and I got this one [Text Sentiment Analysis API By fyhao](https://rapidapi.com/fyhao/api/Text%20Sentiment%20Analysis%20Method). With the help of this API we are going to build a web app which will analizy the sentiment of any given sentences.

For this tutorial I am assuming that you know what is Async and Sync means in programming.

> For those of you don't know what is async and sync [You can read about this](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts).

## So let start creating the app

First of all I am also assuming that you know the basics of django. If you don't know I would suggest you to read our previous tutorial which will help you to understand django basics. So fisrt of we are going to create directory and install all the required depency.

In my case I am using `pipenv`, you can use virtualenv also. And installing the required dependency mention below.

```sh
pipenv install django uvicorn httpx
```
In this case I am using usvicorn, you can use normal command to run your django project. Secondly we need `httpx` which has asyncronus support ( We can't use the `requests` library to call an external API, cause `requests` doesn't support async). 

After you install of them let's create the app by calling this command

```sh
py manage.py startapp analyze
```

> Remember to active the virtual environment. If you're using pipenv you can do that by this `pipenv shell` command.

## Creating our first Asyc django view

I am not going to all the application setup ( Linking the app to the project handling the URL) cause I know you will do that easily.

Before writing our application view I am going to show you the diffrence between Async View and Sync View in Django.

### Sync View

Open the `views.py` file in the app folder. and write this lines of code you can also find that on django's official website

```py

import asyncio
from time import sleep
from django.http import HttpResponse

# Syncronus view


def sync_task():
    for num in range(1, 6):
        sleep(1)
        print(num)

def sync_django(request):
    sync_task()
    return HttpResponse("<h1>Sync Django view</h1>")

```

### Async View

```py

import asyncio
from time import sleep
from django.http import HttpResponse


# Asyncronus view

async def async_task():
    for num in range(1, 6):
        await asyncio.sleep(1)
        print(num)

async def async_django(request):
    loop = asyncio.get_event_loop()
    loop.create_task(async_task())
    return HttpResponse("<h1>Async Django view</h1>")


```