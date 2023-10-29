
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Activity } = require('discord.js');
const { token } = require('./config.json');

let currentstatus;
let loadTime;

// Create a new client instance
const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	], 
});


// Creating a new instances command handling
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');

// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
      if ('data' in command && 'execute' in command) {
           client.commands.set(command.data.name, command);
        } else {
           console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command! await interaction.followUp', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command! await interaction.reply', ephemeral: true });
		}
	}
});

let status =[
	{
		"details": "details",
		"state": "wake me up if u need someting ",
		"name": "Sleeping bot | use !wake up fier",
		"type": 2,
		
	},
	{
		"details": "deatils",
		"state": "Awake",
		"name": "naem",
		"type": 4,
		"url": "https://www.twitch.tv/discord"
	},
]



//Fier born
client.once(Events.ClientReady, c =>   {

	
	let currentstatus = 'idle';
	loadTime = (new Date().getMinutes());

    console.log('Fier is alive but is sleeping');

	client.user.setActivity(status[0]);
	client.user.setStatus('idle');



 
});



client.on("messageCreate", async function (message) {
    if (message.content.substring(0,1,2) === "!") {
		if(message.content.includes('wake up fier')| message.content.includes('WAKE UP FIER')){
			client.user.setStatus('online');
			currentstatus='online';

			if(client.user.presence.status == 'online' ){
				setTimeout(statustoidle, 300000);
				console.log('Fier is awake');
				client.user.setActivity(status[1]);
			}
			
			
			
			
		} 
		
		
    }

	if(client.user.presence.status == 'online' ){
		if(message.content.includes('nigga')){
			message.reply('Racist is bad');
		}
	}
	
});




function statustoidle(){
	client.user.setStatus('idle');
	let currentstatus = 'idle';
	client.user.setActivity(status[0]);
    console.log('Fier is sleeping');
	
}




// Log in to Discord with your client's token
client.login(token);