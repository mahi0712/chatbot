def detect_intent(text):
    text = text.lower()

    if "sad" in text:
        return "sad"
    elif "happy" in text:
        return "happy"
    elif "help" in text:
        return "help"
    else:
        return "unknown"