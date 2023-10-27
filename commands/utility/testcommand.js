const { SlashCommandBuilder } = require('discord.js');

module.exports ={
    data: new SlashCommandBuilder()
    .setName('testcommand')
    .setDescription('Testing slash commands'),
    async execute(interaction) {
        await interaction.reply('Working!!!');

    },
};