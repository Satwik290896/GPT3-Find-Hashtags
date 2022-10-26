from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import numpy as np
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

'''cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()'''

app = Flask(__name__)

# ROUTES
count = 0
prompt = ""
prompt_ans = {}


@app.route('/')
def home():
    data = {}
    return render_template('home.html', data=data)  

@app.route('/prompt')
def prompt():
    data = {}
    return render_template('prompt.html', data=data)  

@app.route('/content')
def content():
    global prompt_ans
    return render_template('content.html', data=prompt_ans)  

              
@app.route('/ajaxCall', methods=['GET', 'POST'])
def ajaxCall():
    global prompt_ans
    global prompt
    
    json_data = request.get_json() 
    prompt = json_data["prom"]
    prompt_ans = gptcall()
    return jsonify(data = prompt_ans)

def gptcall():
    global count
    global prompt
    ''' Implememt GPT3 calls'''
    GPT_ans = {}
    return GPT_ans


if __name__ == '__main__':
    app.run(debug = True)




