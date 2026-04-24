import streamlit as st
from responses import responses

st.set_page_config(page_title="Chatbot", page_icon="🤖")

st.title("🤖 Smart Python Chatbot")

# 🟢 Sidebar help (questions)
st.sidebar.title("❓ Questions You Can Ask")

st.sidebar.write("""
### Try these:
- hi  
- hello  
- how are you  
- what is python  
- what is ai  
- tell me joke  
- bye  
- what is internet  
- what is computer  
""")

# 🟢 Main suggestion box
st.info("💡 Tip: Type simple questions like 'hi', 'what is python', 'bye'")

# 🟢 Session memory
if "chat" not in st.session_state:
    st.session_state.chat = []

# 🟢 Input
user_input = st.text_input("💬 You:")

if user_input:
    clean_input = user_input.lower().strip()

    reply = responses.get(clean_input, "I don't understand 🤔")

    st.session_state.chat.append(("🧑 You", user_input))
    st.session_state.chat.append(("🤖 Bot", reply))

# 🟢 Chat display
for role, msg in st.session_state.chat:
    if "You" in role:
        st.markdown(f"**🧑 You:** {msg}")
    else:
        st.markdown(f"**🤖 Bot:** {msg}")

# 🟢 Clear chat
if st.button("🧹 Clear Chat"):
    st.session_state.chat = []
    st.rerun()