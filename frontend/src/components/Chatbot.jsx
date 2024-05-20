import React, { useState, useEffect } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

const Chatbot = () => {
  // Pre-populate with an initial greeting message
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' },
  ]);
  
  const [userInput, setUserInput] = useState(''); // Store user input
  const [isOpen, setIsOpen] = useState(false); // Toggle for chatbox visibility

  // Function to send a user message
  const handleSend = () => {
    if (userInput.trim() === '') return; // Ignore empty messages

    // Add user message to the conversation
    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages); // Update the messages state

    // Simulate a bot response
    setTimeout(() => {
      // Determine the bot's response based on user input
      let botResponse = '';

      if (userInput.toLowerCase().includes('room')) {
        botResponse = 'Sure, which dates are you interested in?';
      } else if (userInput.toLowerCase().includes('weekend')) {
        botResponse = 'Let me check the availability for next weekend. Please hold on.';
      } else if (userInput.toLowerCase().includes('price')) {
        botResponse = 'Our room prices vary depending on the type and season. Would you like details on a specific room or general pricing?';
      } else if (userInput.toLowerCase().includes('facilities')) {
        botResponse = 'We offer a range of facilities including a gym, swimming pool, and complimentary breakfast. Would you like more details on our amenities?';
      } else {
        botResponse = 'I didn\'t quite catch that. Could you please clarify your question?';
      }

      setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
    }, 1000); // Simulate a delay for the bot response

    setUserInput(''); // Clear the input field
  };

  return (
    <div className="chatbox-wrapper">
      <Button onClick={() => setIsOpen(!isOpen)} className="chatbox-toggle">
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </Button>

      {isOpen && (
        <div className="chatbox">
          <div className="chat-history">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                {msg.text}
              </div>
            ))}
          </div>
          <InputGroup>
            <FormControl
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
            />
            <Button onClick={handleSend}>Send</Button>
          </InputGroup>
        </div>
      )}

      {/* Inline CSS for Chatbox */}
      <style>
        {`
          .chatbox {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 10px;
            width: 300px;
            height: 400px;
            padding: 10px;
            overflow-y: auto;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); 
            z-index: 1000; 
          }

          .chatbox-toggle {
            position: fixed;
            bottom: 140px; 
            right: 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 50%;
            width: 100px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
            
            z-index: 1001;
          }

          .chat-history {
            height: 300px;
            overflow-y: auto;
          }

          .user-message {
            text-align: right;
            color: blue.
          }

          .bot-message {
            text-align: left.
            color: green.
          }
        `}
      </style>
    </div>
  );
};

export default Chatbot;
