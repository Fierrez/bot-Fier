
// const fs = require('node:fs');
// const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Activity,EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const { Player } = require('discord-player');
const Genius = require("genius-lyrics");


let currentstatus;
let loadTime;

// Create a new client instance
// const client = new Client({ 
// 	intents: [
// 		GatewayIntentBits.Guilds,
// 		GatewayIntentBits.GuildMessages,
// 		GatewayIntentBits.MessageContent,
// 		GatewayIntentBits.GuildMembers,
// 		GatewayIntentBits.GuildVoiceStates
// 	], 
// 	disableMentions:'everyone',
// });
global.client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates
	], 
	disableMentions:'everyone',
});


//musicbot
client.config = require('./config');
const player = new Player(client, client.config.opt.discordPlayer);
global.genius = new Genius.Client();
player.extractors.loadDefault();
require('./src/loader');

// Creating a new instances command handling
// client.commands = new Collection();
// const foldersPath = path.join(__dirname, 'commands');

// // const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
// 	const commandsPath = path.join(foldersPath, folder);
// 	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// 	for (const file of commandFiles) {
// 		const filePath = path.join(commandsPath, file);
// 		const command = require(filePath);
// 		// Set a new item in the Collection with the key as the command name and the value as the exported module
//       if ('data' in command && 'execute' in command) {
//            client.commands.set(command.data.name, command);
//         } else {
//            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
//         }
//     }
// }


// const eventsPath = path.join(__dirname, 'events');
// const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// for (const file of eventFiles) {
// 	const filePath = path.join(eventsPath, file);
// 	const event = require(filePath);
// 	if (event.once) {
// 		client.once(event.name, (...args) => event.execute(...args));
// 	} else {
// 		client.on(event.name, (...args) => event.execute(...args));
// 	}
// }




//Fier status 
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
	{
		"details": "Streaming Stofipy",
  		"state": "wake me up if u need someting \n !wake up fier ",
  		"name": "Stofipy",
  		"type": 1,
  		
	}
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
	if (message.author.bot) return

	
    if (message.content.substring(0,1,2) === "!" || message.content.substring(0,1,2) === "/" ) {
		if(message.content.includes('wake up fier') || message.content.includes('WAKE UP FIER') || message.content.includes('wakeup') || message.content.includes('Fier is awake') ){
			client.user.setStatus('online');
			currentstatus='online';

			if(client.user.presence.status == 'online' ){
				setTimeout(statustoidle, 300000);
				console.log('Fier is awake');
				client.user.setActivity(status[1]);
			}
			
			
			
			
			
		} 
		
		
    }


	if(message.channel.name.includes('music') ){

		client.user.setActivity(status[2]);
		console.log('Fier is streaming');
		
	}



	if(client.user.presence.status == 'online' || client.user.presence.status == 1){
		if(message.content.includes('nigga')){
			message.reply('Racist is bad');






		}
	}
	//beta
	


	const channel = client.channels.cache.get(message.channel.id);
	if(message.content.includes('welcome')){

		channel.send({ embeds: [embedd] }).catch(console.error);
		

	}







	














	







});











//embed maessage example
const embedd = new EmbedBuilder()
	.setColor(0xffc31f)
	.setTitle('Welcome')
	.setURL('https://discord.js.org/')

	.setAuthor({ name: 'Fier', iconURL: 'https://github.com/Fierrez/bot-Fier/blob/4e6295e8eabfe0c9cdc000c050a9a0fe9fa438dc/assets/space.jpg', url: 'https://discord.com/api/oauth2/authorize?client_id=1073052260948508692&permissions=8&scope=bot' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });


//functions
function statustoidle(){
	client.user.setStatus('idle');
	let currentstatus = 'idle';
	client.user.setActivity(status[0]);
    console.log('Fier is sleeping');
	
}






client.login(token);