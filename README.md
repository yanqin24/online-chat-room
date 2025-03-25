# online-chat-room 💬  
A browser-based SPA chatroom application supporting user login, group chat, and private messaging, built with Node.js and plain JavaScript. The project follows the MVC architecture with clear separation of logic, view, and data handling.

---

## 📌 Project Overview  
SimpleChat is a single-page chat application that allows users to log in, join a shared chatroom, and send public or private messages in real-time. It simulates chat experience using session management, periodic polling, and a clear separation of concerns between server-side logic and client rendering.

---

## ✨ Features
- 👤 **User Login**: Unique username login, session-based authentication using cookies  
- 💬 **Group Chat**: All logged-in users can participate in a shared conversation  
- 🔐 **Private Messaging**: (Planned extension) Chat with specific users individually  
- 🛠 **Error Handling**: Handles invalid usernames, duplicate logins, and network issues with friendly feedback  
- 🧠 **MVC Structure**: Modular separation between controllers, models, and views for scalable design  
- 🔁 **Polling-based Updates**: Periodic front-end polling for new messages and user status  
- 🎨 **Accessible UI**: Built using semantic HTML and accessible navigation logic

---

## 💡 Tech Stack
- **Backend**: Node.js, Express  
- **Frontend**: HTML, CSS, JavaScript 
- **Session Management**: Cookie-based session tracking  
- **Architecture**: MVC (Model-View-Controller) pattern  

---

## 🛠️ Getting Started

### ✅ Prerequisites
- Node.js (v16+)
- npm

### 📦 Installation
```bash
git clone https://github.com/your-username/online-chat-app.git
cd online-chat-app
npm init -y
npm install
npm run express
```

## Run the Server
```
npm run build
npm run start
```

## 📁 Project Structure
```
├── server.js                 # Main Express server
├── public/                  # Static HTML, CSS, and client-side JS
│   ├── index.html
│   ├── style.css
│   └── chat.js
├── controller.js            # Core routing and controller logic
├── render.js                # HTML rendering helpers
├── services.js              # Utility functions for message formatting, session checks
├── sessions.js              # Session and user mapping
├── chat-controller.js       # Message handling logic
├── auth-controller.js       # Login validation and session init
├── chatlist.js              # In-memory message list storage
├── users.js                 # User state management
├── .gitignore
├── LICENSE
└── README.md
```

## License
This project is licensed under the MIT License.

