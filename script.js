// =========================
// ADD MESSAGE FUNCTION
// =========================

function addMessage(text, type) {

    let div = document.createElement("div");

    div.classList.add("msg");
    div.classList.add(type);

    div.innerText = text;

    document.getElementById("chatBox")
    .appendChild(div);

    // AUTO SCROLL

    document.getElementById("chatBox").scrollTop =
    document.getElementById("chatBox").scrollHeight;
}


// =========================
// SEND MESSAGE FUNCTION
// =========================

async function send() {

    let textBox =
    document.getElementById("textBox");

    let text = textBox.value;

    // EMPTY CHECK

    if (text.trim() === "") {
        return;
    }

    // USER MESSAGE

    addMessage(text, "user");

    // CLEAR INPUT

    textBox.value = "";

    try {

        // API REQUEST

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text
            })

        });

        const data = await response.json();

        // BOT MESSAGE

        addMessage(data.reply, "bot");

        // =========================
        // BOT VOICE REPLY
        // =========================

        let speech =
        new SpeechSynthesisUtterance(data.reply);

        speech.lang = "en-US";

        speech.rate = 1;

        speech.pitch = 1;

        speech.volume = 1;

        speechSynthesis.speak(speech);

    }

    catch (error) {

        console.log(error);

        addMessage(
            "Server error occurred",
            "bot"
        );
    }
}


// =========================
// ENTER KEY SUPPORT
// =========================

document.getElementById("textBox")
.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        send();

    }

});


// =========================
// VOICE INPUT
// =========================

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

const recognition =
new SpeechRecognition();

recognition.lang = "en-US";

recognition.continuous = false;

recognition.interimResults = false;


// =========================
// WHEN VOICE DETECTED
// =========================

recognition.onresult = function(event) {

    const voiceText =
    event.results[0][0].transcript;

    document.getElementById("textBox").value =
    voiceText;

    send();
};


// =========================
// START MIC
// =========================

function startVoice() {

    recognition.start();

}