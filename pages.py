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


@bp.route('/<var>/<name>/update')
def update(var, name):
    var = var.replace("'", "")
    if "austin" in var:
        f = open("database/" + "austin.txt", "a")
        var = var[6:]
        var = var[0:1].upper() + var[1:]
        f.write("Task," + var + "," + name + ",02/17/2019,False\n")
        uh = "pages.user" + name
        return redirect(url_for(uh))
    elif "james" in var:
        f = open("database/" + "james.txt", "a")
        var = var[5:]
        var = var[0:1].upper() + var[1:]
        f.write("Task," + var + "," + name + ",02/17/2019,False\n")
        uh = "pages.user" + name
        return redirect(url_for(uh))
    elif "ryan" in var:
        f = open("database/" + "ryan.txt", "a")
        var = var[4:]
        var = var[0:1].upper() + var[1:]
        f.write("Task," + var + "," + name + ",02/17/2019,False\n")
        uh = "pages.user" + name
        return redirect(url_for(uh))
    elif "soukarya" in var:
        f = open("database/" + "soukarya.txt", "a")
        var = var[8:]
        var = var[0:1].upper() + var[1:]
        f.write("Task," + var + "," + name + ",02/17/2019,False\n")
        uh = "pages.user" + name
        return redirect(url_for(uh))
    else:
        var = var[0:1].upper() + var[1:]
        f = open("database/" + name + ".txt", "a")
        #f.write("Task," + var + ",Ryan,02/17/2019,False\n")
        f.write("Task," + var + "," + name + ",02/17/2019,False\n")
        uh = "pages.user" + name
        return redirect(url_for(uh))

    # mp3 = name + ".mp3"
    # p = Person(name)
    # tasks = p.getTasksToString()
    # return render_template('users/base.html', file=mp3, person=p, tasks=tasks)

@bp.route('/face')
def loginFt():
    return render_template('ml.html')

@bp.route('/user_soukarya')
def userSoukarya():
    p = Person("Soukarya")
    tasks = p.getTasksToString()
    balances = p.getBalancesToString()
    return render_template('users/base.html', file="Soukarya.mp3", person=p, tasks=tasks, balances=balances)

@bp.route('/user_james')
def userJames():
    p = Person("James")
    tasks = p.getTasksToString()
    balances = p.getBalancesToString()
    return render_template('users/base.html', file="James.mp3", person=p, tasks=tasks, balances=balances)

@bp.route('/user_austin')
def userAustin():
    p = Person("Austin")
    tasks = p.getTasksToString()
    balances = p.getBalancesToString()
    return render_template('users/base.html', file="Austin.mp3", person=p, tasks=tasks, balances=balances)

@bp.route('/user_ryan')
def userRyan():
    p = Person("Ryan")
    tasks = p.getTasksToString()
    balances = p.getBalancesToString()
    return render_template('users/base.html', file="Ryan.mp3", person=p, tasks=tasks, balances=balances)

@bp.route('/')
def index():
    return render_template('index.html')
