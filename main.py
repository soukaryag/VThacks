import os
from flask import Flask, request, redirect, session, render_template
from datetime import timedelta
import sys


# create and configure the app
app = Flask(__name__)
app.debug = True

app.secret_key = 'ab291093f29f0e2'

sys.path.insert(0, '')


import pages
app.register_blueprint(pages.bp)
app.add_url_rule('/', endpoint='index')


# ------------------- ERRORS -----------------------------#
@app.errorhandler(404)
def page_not_found(error):
    return render_template('errorpage.html'), 404

@app.errorhandler(500)
def internal_server_error(error):
    return render_template('errorpage.html'), 500

@app.errorhandler(403)
def page_forbidden(error):
    return render_template('errorpage.html'), 500


if __name__ == '__main__':
    app.run()
