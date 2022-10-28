from flask import Flask
from flask import render_template
import os
import openai
import ipywidgets as widgets
import textwrap as tw
import re
import json 
import config

# load any file in .env
openai.api_key = config.api_key

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("questionnaire.html")

@app.route("/caption")
def captionGenerator():
    prompt = f"List 5 captions for cookies cutter to post on Instagram"
    completion = openai.Completion.create(engine="text-davinci-002", max_tokens=256, prompt=prompt)
    result = completion.choices[0].text.strip()
    ideas = re.split("\n", completion.choices[0].text.strip())
   
    return render_template("caption.html", prompt=prompt, ideas=result)
if __name__ == '__main__':
    app.run(debug = True)