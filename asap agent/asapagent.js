<!-- Include this in your HTML or main layout -->
<div id="asap-chatbot" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;"></div>

<script type="module">
  const chatbotContainer = document.getElementById('asap-chatbot');

  const chatWidget = document.createElement('div');
  chatWidget.style.width = '360px';
  chatWidget.style.height = '500px';
  chatWidget.style.borderRadius = '15px';
  chatWidget.style.overflow = 'hidden';
  chatWidget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
  chatWidget.style.backgroundColor = '#fff';
  chatWidget.innerHTML = `
    <style>
      #chat-header {
        background: linear-gradient(135deg, #FF416C, #FF4B2B);
        padding: 12px;
        color: white;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      #chat-messages {
        height: 360px;
        overflow-y: auto;
        padding: 12px;
        font-family: sans-serif;
        font-size: 14px;
      }
      #chat-input {
        border-top: 1px solid #ddd;
        padding: 10px;
        display: flex;
        gap: 8px;
      }
      #chat-input input {
        flex: 1;
        padding: 8px;
        border-radius: 8px;
        border: 1px solid #ccc;
      }
      #chat-input button {
        padding: 8px 12px;
        background-color: #FF416C;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }
    </style>
    <div id="chat-header">
      <img src="https://i.imgur.com/yYAXXaK.png" width="32" height="32" style="border-radius: 50%;" />
      <span>ASAP Agent (AI)</span>
    </div>
    <div id="chat-messages"></div>
    <div id="chat-input">
      <input type="text" placeholder="Ask me anything..." id="asapInput"/>
      <button id="asapSend">Send</button>
    </div>
  `;
  chatbotContainer.appendChild(chatWidget);

  const messages = document.getElementById('chat-messages');
  const input = document.getElementById('asapInput');
  const sendBtn = document.getElementById('asapSend');

  const appendMessage = (text, sender = 'user') => {
    const div = document.createElement('div');
    div.style.margin = '6px 0';
    div.style.textAlign = sender === 'user' ? 'right' : 'left';
    div.innerHTML = `<span style="background: ${
      sender === 'user' ? '#FF416C' : '#eee'
    }; color: ${
      sender === 'user' ? '#fff' : '#000'
    }; padding: 6px 12px; border-radius: 10px; display: inline-block; max-width: 80%;">${text}</span>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  };

  const askDeepSeek = async (question) => {
    appendMessage(question, 'user');
    appendMessage("Typing...", 'bot');

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {

        'Authorization': 'sk-8eaefa18962043f99cbbd1e0aeecdb92',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: "You are ASAP, a professional yet friendly assistant working for ASAP Tracker. You are helpful, engaging, and always polite. You are a beautiful young woman avatar and your tone is comforting and informative." },
          { role: 'user', content: question }
        ]
      })
    });

    const data = await response.json();
    const botReply = data.choices?.[0]?.message?.content || "I'm having trouble thinking right now.";
    messages.lastChild.remove(); // Remove "Typing..."
    appendMessage(botReply, 'bot');
  };

  sendBtn.onclick = () => {
    const question = input.value.trim();
    if (!question) return;
    input.value = '';
    askDeepSeek(question);
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });

</script>

