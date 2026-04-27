function addMsg(type, text) {
    let div = document.createElement("div");
    div.className = type;
    div.innerText = text;

    let chat = document.getElementById("chat");
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

/* typing */
function showTyping() {
    document.getElementById("typing").style.display = "block";
}

function hideTyping() {
    document.getElementById("typing").style.display = "none";
}

/* send */
function sendMsg() {
    let msg = document.getElementById("msg").value;
    if (!msg.trim()) return;

    addMsg("user", msg);
    document.getElementById("msg").value = "";

    showTyping();

    fetch("/get?msg=" + encodeURIComponent(msg))
        .then(res => res.json())
        .then(data => {
            hideTyping();
            addMsg("bot", data.response);
        })
        .catch(() => {
            hideTyping();
            addMsg("bot", "Error 😢");
        });
}

/* voice */
function startVoice() {
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return alert("Use Chrome");

    let recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (e) => {
        document.getElementById("msg").value =
            e.results[0][0].transcript;
    };

    recognition.start();
}

/* new chat */
function newChat() {
    document.getElementById("chat").innerHTML = "";
    addMsg("bot", "New chat started 🚀");
}