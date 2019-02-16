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
	a = Person("Soukarya")
	return render_template('users/base.html', name="Soukarya", person=Person("Soukarya"), file="Soukarya.mp3")

@bp.route('/user_james')
def userJames():
    return render_template('users/base.html', name="James", person=Person("James"), file="James.mp3")

@bp.route('/user_austin')
def userAustin():
    return render_template('users/base.html', name="Austin", person=Person("Austin"), file="Austin.mp3")

@bp.route('/user_ryan')
def userRyan():
    return render_template('users/base.html', name="Ryan", person=Person("Ryan"), file="Ryan.mp3")

@bp.route('/')
def index():
    return render_template('index.html')
