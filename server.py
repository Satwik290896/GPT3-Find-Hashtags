from flask import Flask, jsonify, render_template, request, make_response
import openai 
import re
import config

# load api key from config.py
openai.api_key = config.api_key

app = Flask(__name__)

def get_captions():
  prompt = f"List 5 captions for {topic} to post on social media. Make sure that these captions are {tone} and fits someone who identifies as an {identity}."
  completion = openai.Completion.create(engine="text-davinci-002", max_tokens=256, prompt=prompt)
  result = completion.choices[0].text.strip()
  ideas = re.split('\n', completion.choices[0].text.strip())
  return result, ideas

def get_hashtags():
  prompt = f"List 5 hashtags for {topic} to post on social media. Make sure that these captions are {tone} and fits someone who identifies as an {identity}."
  completion = openai.Completion.create(engine="text-davinci-002", max_tokens=256, prompt=prompt)
  result = completion.choices[0].text.strip()
  ideas = re.split('\n', completion.choices[0].text.strip())
  return result, ideas

@app.route("/")
def index():
    return render_template("questionnaire.html")

@app.route("/inputs", methods=['GET', 'POST'])
def process_input():
    json_data = request.get_json()

    description = int(json_data["description"])
    user_input = json_data["input"]

    response_data = {'code': 'SUCCESS'}

    if description == 0:
        global identity
        identity = user_input
    elif description == 1:
        global tone
        tone = user_input
    elif description == 2:
        global topic
        topic = user_input
        captions, ideas = get_captions()
        response_data = {'captions': ideas}
    elif description == 3:
        hashtags, ideas = get_hashtags()
        response_data = {'hashtags': ideas}
    
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug = True)
