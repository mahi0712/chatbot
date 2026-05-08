const chatBox = document.getElementById("chat-box");

function sendMessage() {
  let input = document.getElementById("user-input");
  let msg = input.value;

  if (msg.trim() === "") return;

  // user message
  chatBox.innerHTML += `<div class="message user">${msg}</div>`;

  // loading
  chatBox.innerHTML += `<div class="message bot" id="loading">...</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  fetch(`/get?msg=${encodeURIComponent(msg)}`)
    .then(res => res.json())
    .then(data => {
      let reply = data.response;

      // remove loading
      document.getElementById("loading").remove();

      chatBox.innerHTML += `<div class="message bot">${reply}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(() => {
      document.getElementById("loading").remove();
      chatBox.innerHTML += `<div class="message bot">Error</div>`;
    });

  input.value = "";
}

// Enter key support
document.getElementById("user-input")
  .addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

// Voice input
function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice not supported");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US"; // try "ur-PK"
  recognition.start();

  recognition.onresult = function(event) {
    let text = event.results[0][0].transcript;
    document.getElementById("user-input").value = text;

    sendMessage();
  };
}