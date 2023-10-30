const { Events } = require('discord.js');

module.exports = {
	name:	 Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Starting node...\nInitializing events folder....\nReady! Logged in as ${client.user.tag}`);

        client.user.setStatus('online');
		
	},
};

