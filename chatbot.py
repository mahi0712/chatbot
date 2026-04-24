from responses import responses

print("🤖 Chatbot Started (type exit to stop)\n")

while True:
    user = input("You: ").lower().strip()

    if user == "exit":
        print("Bot: Goodbye 👋")
        break

    # clean input (important fix)
    user = user.replace('"', '').replace("'", '').strip()

    # exact match check
    if user in responses:
        print("Bot:", responses[user])
    else:
        print("Bot: Sorry, I don't understand 🤔")