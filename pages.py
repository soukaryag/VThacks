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
def login():
    return render_template('ml.html')


@bp.route('/')
def index():
    return render_template('index.html')
