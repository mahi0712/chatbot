def log_chat(user, bot):
    with open("chat_logs.txt", "a") as f:
        f.write(f"User: {user}\nBot: {bot}\n\n")