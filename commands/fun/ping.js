const { SlashCommandBuilder } = require('discord.js');
var numberofping=0;
module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
    numberofping = numberofping + 1;
    console.log("number of ping",numberofping);
	},
};

