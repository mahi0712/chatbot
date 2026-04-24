memory = {}

def save_user(user_id, message):
    if user_id not in memory:
        memory[user_id] = []
    memory[user_id].append(message)

def get_history(user_id):
    return memory.get(user_id, [])