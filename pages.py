## HOUSES all of the html file references that are related to the website mainframe (not auth) ##
import os
from flask import (
    Blueprint, redirect, render_template, request, url_for, g, flash
)
import psycopg2
import gspread
from oauth2client.service_account import ServiceAccountCredentials


bp = Blueprint('pages', __name__)


@bp.route('/faq')
def faq():
    return render_template('faq.html')

@bp.route('/face')
def loginFt():
    return render_template('public/ml.html')

@bp.route('/user_soukarya')
def userSoukarya():
    return render_template('users/base.html', name="Soukarya")

@bp.route('/user_james')
def userJames():
    return render_template('users/base.html', name="James")

@bp.route('/user_austin')
def userAustin():
    return render_template('users/base.html', name="Austin")

@bp.route('/user_ryan')
def userRyan():
    return render_template('users/base.html', name="Ryan")

@bp.route('/')
def index():
    return render_template('index.html')
