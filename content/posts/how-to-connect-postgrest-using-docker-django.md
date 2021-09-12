---
title: How to connect your django application to PostgreSQL using docker
date: 2020-06-12
published: false
tags: ['django', 'PostgreSQL', 'Docker']
series: false
cover_image: ./images/Deploy-django-application-to-heroku.png
social_img: https://res.cloudinary.com/manascode/image/upload/v1600504304/manascode.com/Deploy_django_application_to_heroku_exhgjh.png
canonical_url: true
description: 'In this tutorial we are going to learn how to connect Django applicaiton to a PostgreSQL database using Docker container while developing the django application.'
---

In this tutorial we are going to learn how to connect Django application to a PostgreSQL database using Docker container while developing the django application. To get started we are going to follow the steps below:

- [Step 1 - Create a PostgreSQL database using docker](#step-1---create-a-postgresql-database-using-docker)
- [Step 2 - Install pgAdmin](#step-2---install-pgadmin)
- [Step 3 - Create a django project](#step-3---create-a-django-project)
- [Step 4 - Configure postgreSQL to django](#step-4---configure-postgresql-to-django)
- [Step 5 - Run the django application](#step-5---run-the-django-application)
- [Step 6 - Create a simple model](#step-6---create-a-simple-model)
- [Step 7 - Migrate the schema](#step-7---migrate-the-schema)
- [Step 8 - Run the migrations](#step-8---run-the-migrations)
- [Step 9 - See the changes in the database](#step-9---see-the-changes-in-the-database)
- [Step 10 - Run the django application](#step-10---run-the-django-application)
- [ Step 11 - Deploy the django application to Heroku](#step-11---deploy-the-django-application-to-heroku)

# Step 1 - Create a PostgreSQL database using docker

First we're goning to create a PostgreSQL database using docker. You can also download the postgreSQL binary from [here](https://www.postgresql.org/download/) and use it to create a PostgreSQL database.

But in our case we are going to use a docker container to create a PostgreSQL database. To create the PostgreSQL database we are going to use the following docker command:

```sh
docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -d postgres:10-alpine
```

It will download the latest version of PostgreSQL 10 and create a database named postgres and a user named postgres with password postgres and run it in detached mode. If you want to it in interace mode you can run it like this:

```sh
docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -i -t postgres:10-alpine
```
