import os
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

app = Flask(__name__)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

chat_history = []

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get")
def chat():
    global chat_history

    msg = request.args.get("msg")

    if not msg:
        return jsonify({"response": "No message received"})

    chat_history.append({"role": "user", "content": msg})

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=chat_history
        )

        reply = response.choices[0].message.content

        chat_history.append({"role": "assistant", "content": reply})

        return jsonify({"response": reply})

    except Exception as e:
        return jsonify({"response": str(e)})

if __name__ == "__main__":
    app.run(debug=True)