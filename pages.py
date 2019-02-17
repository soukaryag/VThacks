## HOUSES all of the html file references that are related to the website mainframe (not auth) ##
import os
from flask import (
    Blueprint, redirect, render_template, request, url_for, g, flash
)
import psycopg2
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from Person import Person


bp = Blueprint('pages', __name__)


@bp.route('/faq')
def faq():
    return render_template('faq.html')

@bp.route('/face')
def loginFt():
    return render_template('ml.html')

@bp.route('/user_soukarya')
def userSoukarya():
    p = Person("Soukarya")
    tasks = p.getTasksToString()
    n = len(tasks) + 1
    print(n)
    return render_template('users/base.html', name="Soukarya", file="Soukarya.mp3", person=p, tasks=tasks, n=n)

@bp.route('/user_james')
def userJames():
    p = Person("James")
    tasks = p.getTasksToString()
    n = len(tasks) + 1
    return render_template('users/base.html', name="James", file="James.mp3", person=p, tasks=tasks, n=n)

@bp.route('/user_austin')
def userAustin():
    p = Person("Austin")
    tasks = p.getTasksToString()
    n = len(tasks) + 1
    return render_template('users/base.html', name="Austin", file="Austin.mp3", person=p, tasks=tasks, n=n)

@bp.route('/user_ryan')
def userRyan():
    p = Person("Ryan")
    tasks = p.getTasksToString()
    n = len(tasks) + 1
    return render_template('users/base.html', name="Ryan", file="Ryan.mp3", person=p, tasks=tasks, n=n)

@bp.route('/')
def index():
    return render_template('index.html')
