const { QueryType, useMainPlayer, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder,Client,ActivityType } = require('discord.js');

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
		"details": "details",
		"state": "Streaming Stopify ",
		"name": "Stopify ",
		"type": 4,
        "url": "https://www.twitch.tv/discord"
	}
]


module.exports = {
    name: 'play',
    description: "play a song!",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the song you want to play',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter, client }) {
        
        client.user.setActivity(status[2]);
        client.user.setStatus('online');

        const player = useMainPlayer()

        const song = inter.options.getString('song');
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });
        const NoResultsEmbed = new EmbedBuilder()
            .setAuthor({ name: `No results found... try again ? ❌`})
            .setColor('#2f3136')

        if (!res || !res.tracks.length) return inter.editReply({ embeds: [NoResultsEmbed] });

        const queue = await player.nodes.create(inter.guild, {
            metadata: inter.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            volume: client.config.opt.volume,
            leaveOnEmpty: client.config.opt.leaveOnEmpty,
            leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
            leaveOnEnd: client.config.opt.leaveOnEnd,
            leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
        });

        try {
            if (!queue.connection) await queue.connect(inter.member.voice.channel);
        } catch {
            await player.deleteQueue(inter.guildId);

            const NoVoiceEmbed = new EmbedBuilder()
                .setAuthor({ name: `I can't join the voice channel... try again ? ❌`})
                .setColor('#2f3136')

            return inter.editReply({ embeds: [NoVoiceEmbed] });
        }

            const playEmbed = new EmbedBuilder()
                .setAuthor({ name: `Loading your ${res.playlist ? 'playlist' : 'track'} to the queue... ✅`})
                .setColor('#2f3136')
                
            await inter.editReply({ embeds: [playEmbed] });


        res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.isPlaying()) await queue.node.play();
    },
};
