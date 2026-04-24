from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get")
def get_bot_response():
    msg = request.args.get("msg")

    if not msg:
        return "Please type something 🤔"

    msg = msg.lower().strip()

    # --- Greetings ---
    if any(word in msg for word in ["hello", "hi", "hey"]):
        return "Hi 👋! How are you today?"

    # --- How are you ---
    elif "how are you" in msg:
        return "I'm just code, but I'm running perfectly 😊"

    # --- Name related ---
    elif "your name" in msg or "who are you" in msg:
        return "I'm your Python chatbot 🤖 created using Flask!"

    # --- Help ---
    elif "help" in msg:
        return "You can ask me: name, hello, time, jokes, bye 😄"

    # --- Time (simple reply) ---
    elif "time" in msg:
        return "I don't have real-time clock yet ⏰ but I can be upgraded!"

    # --- Jokes ---
    elif "joke" in msg:
        return "Why do programmers hate nature? Too many bugs 😂"

    # --- Bye ---
    elif any(word in msg for word in ["bye", "goodbye", "see you"]):
        return "Goodbye 👋 Take care!"

    # --- Thanks ---
    elif "thank" in msg:
        return "You're welcome 😊"

    # --- Default ---
    else:
        return "Hmm 🤔 I don't understand that yet, try asking something else!"

if __name__ == "__main__":
    app.run()