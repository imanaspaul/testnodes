---
title: How to deploy your django app to heroku
date: 2020-09-19
published: true
tags: ['django', 'heroku', 'python']
series: false
cover_image: ./images/Deploy-django-application-to-heroku.png
social_img: https://res.cloudinary.com/manascode/image/upload/v1600504304/manascode.com/Deploy_django_application_to_heroku_exhgjh.png
canonical_url: true
description: "In this tutorial we are going to cover how you can deploy a django appliction to heroku web services. The easiest way to deploy a Django application on Herkou"
---

How to make web applications with the help of django web framework, I have already few tutorials of that and  in the whole web you could find a lot of tutorials. But when it comes to deploy the web application that you have build, it's really frustrating. I have found some outdated tutorials on Google about how to deploy a Django web application to heroku. So I though why not make a updated post about it. 

So in this tutorial we are going to cover how you can deploy a django appliction to heroku web services.

## What you will going to learn

- 1. Make simple application in django
- 2. Prepare the application for Heroku
- 3. Use git for verision control
- 4. Deploy to heroku

## prerequisite

Before you get started with this tutorial you have have these knowledges.

- You have to know the basics of Django
- You have to have some knowledge about Git

### 1. Make simple application in django

I know all of you're so smart so, if you already have the application ready you can `skip` this step. For this tutorial I am going to use `pipenv` for virtual enviorment. You could use anything for that. So the first step is to create the virtual enviorment and install the dependencies.

```sh
pipenv install django

```
after installing that we need to activate the virtual enviorment, so to do that run this command

```sh
pipenv shell
```
Now everything is ready to go, you can now create your django project inside the virtual enviorment. To do that you can run this command

```sh 
django-admin startproject main .
```
In this case I'm calling my project `main` and using a dot to avoud creating another folder called `main` to create the project. After you done all of that, now we have finished out first part.

### 2. Prepare the application for Heroku

In this step we need to prepare our application for production. So first thing is to open the `settings.py` file and do this changes.

```py
import os # at the top

SECRET_KEY = os.environ.get("SECRET_KEY", "teyd23e2efvdgsf3dv2d362")
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', False)
ALLOWED_HOSTS = ['*']

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'staticfiles')]
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media_root')
```

In this changes, we are getting our secret key and debug mode from the enviorment variables and adding some static and media urls. Now we need to install some dependency to work with heroku. So just install these dependencies.

```sh
pipenv install dj-database-url gunicorn psycopg2 whitenoise
```
After install all of these dependencies, now go back to your `settings.py` file and add some more settings.

```py 
import dj_database_url 
MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware', # add this new middleware
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"


prod_db  =  dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(prod_db)
```

In this changes we are using `whitenoise` to managing out static files and `dj_database_url` to connecting with production database. After you done all that, now we need to create a new file called `Procfile` and paste this lines of code.

```
web: gunicorn main.wsgi
```
In this file we are using web processes and telling heroku to run the command called `gunicorn main.wsgi`. Remember put your project name instead of mine eg. `web: gunicorn <your project name>.wsgi`.

In case of using pipenv, I don't need to create a `requirements.txt` file, Heroku will install all the dependencies from `Pipfile`. But if you're using virtual env then *Don't forget to create the `requirements.txt` file*.

### 3. Use git for verision control

If you alredy familiar with `git` you alredy know all of these command. to commit all of the changes you have done write these command.

```sh
git init
git add .
git commit -m "Initial commit" 
```
After you done all of that, now it's time for the magial step to deploy the `django application to Heroku`.

### 4. Deploy to heroku

To deploy to heroku you need to have an account first. if you don't have any account yet, you can create the account, it's pretty simple and straight forward. After you create that now you need to have Heroku CLI. If you don't have it, you can [Download it from here](https://devcenter.heroku.com/articles/heroku-cli).

Once you have all of them, now go to your command line and write this command to create a heroku porject.

```sh
heroku create <write your project name>
```
* Sometime heroku gives error if the name alredy exists to better if you don't pass any name, heroku will create a reandom name for your project.

Once everting is setup properly, now it's time to push your code to `Heroku` to see your website live. To do that write this command in your terminal.

```sh
git push heroku master
```

If you done everthing correctly you can have your website live, in case if you're facing any issue you can comment down below, I will help you as much as possible. 
Thanks for reading through the tutorial. If you find this article helpful please leave a comment below or share it with your friends.
