# ⏰ Discord Reminder Bot

Welcome to my **Discord Reminder Bot** project! 🎉 This is a powerful and user-friendly bot built with **discord.js v14** that helps you set reminders in your Discord servers. Whether it's a quick reminder in a few seconds or something scheduled for a few days later, this bot will ensure you never miss an important task. 🚀

## ✨ Features

- **Flexible reminders**: Set reminders for `seconds`, `minutes`, `hours`, or `days` 🕰️
- **User notifications**: Direct message reminders for the user when triggered 📬
- **Server integration**: Works seamlessly across multiple Discord servers 🖇️
- **Data storage**: Saves reminders in a JSON file for persistence 💾

## 🔧 Technologies Used

- **Node.js** – Backend runtime environment
- **discord.js v14** – Library for interacting with the Discord API
- **File System (fs)** – Used for reading/writing reminder data to a JSON file
- **JavaScript** – Core language for logic and functionality

## 🚀 How to Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Quravat/ReminderBOT.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd ReminderBOT
   ```

3. **Install dependencies**:
   ```bash
   npm install discord.js
   ```

4. **Add your bot token**:
   - Create a `config.json` file and add your token like this:
     ```json
     {
       "token": "YOUR_BOT_TOKEN"
     }
     ```

5. **Start the bot**:
   ```bash
   node index.js
   ```

6. **Interact with the bot**:
   - Use `!remindme <duration> <message>` to set a reminder (e.g., `!remindme 5m Take a break!`)

## 📝 Credits

- **Developer**: Quravat 💻
- **Created in**: 2024 🗓️
- **Technologies**: Node.js, JSON
- **Libraries**: Discord.js V14

## 🤝 Contribute

Feel free to open issues or contribute to this project! 🙌 Your contributions help make this project better for everyone.

## ⭐ Support

If you find this project useful, please **star** it on GitHub! ⭐ Your support means a lot and motivates me to keep improving and adding more features. 🙏

## Made with ❤️ and a lot of code!