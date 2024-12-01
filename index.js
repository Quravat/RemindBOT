const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token } = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const remindersFile = path.join(__dirname, 'reminders.json');

function loadReminders() {
  try {
    const data = fs.readFileSync(remindersFile, 'utf8');
    const parsedData = JSON.parse(data);
    if (Array.isArray(parsedData)) {
      return parsedData;
    } else {
      throw new Error('Le fichier reminders.json est mal formaté');
    }
  } catch (err) {
    console.error('Erreur de lecture de reminders.json, création d\'un fichier vide.', err);
    return [];
  }
}

function saveReminders(data) {
  try {
    fs.writeFileSync(remindersFile, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Erreur lors de l\'écriture dans reminders.json', err);
  }
}

let reminders = loadReminders();

client.once('ready', () => {
  console.log('Le bot est prêt !');
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!remindme') && !message.author.bot) {
    const args = message.content.split(' ').slice(1);
    if (args.length < 2) {
      return message.reply('Veuillez utiliser la commande au format : !remindme <durée> <message>.');
    }

    const [duration, ...messageParts] = args;
    const reminderMessage = messageParts.join(' ');

    const timeRegex = /(\d+)([jsmh])/;
    const match = duration.match(timeRegex);

    if (!match) {
      return message.reply('Format de durée invalide. Utilisez j pour jours, s pour secondes, m pour minutes, h pour heures.');
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    let milliseconds;
    switch (unit) {
      case 'j':
        milliseconds = value * 24 * 60 * 60 * 1000;
        break;
      case 's':
        milliseconds = value * 1000;
        break;
      case 'm':
        milliseconds = value * 60 * 1000;
        break;
      case 'h':
        milliseconds = value * 60 * 60 * 1000;
        break;
      default:
        return message.reply('Unité de temps invalide.');
    }

    const remindTime = new Date(Date.now() + milliseconds);
    const reminderData = {
      userId: message.author.id,
      serverId: message.guild.id,
      reminderTime: remindTime.toISOString(),
      message: reminderMessage,
    };

    reminders.push(reminderData);
    saveReminders(reminders);

    setTimeout(() => {
      message.author.send(`Votre rappel : ${reminderMessage}`);
      message.channel.send(`${message.author}, voici votre rappel : ${reminderMessage}`);

      reminders = reminders.filter((reminder) => reminder.reminderTime !== remindTime.toISOString());
      saveReminders(reminders);
    }, milliseconds);

    message.reply(`***Je vais vous rappeler dans*** ${value} ${unit}.`);
  }
});

client.login(token);
