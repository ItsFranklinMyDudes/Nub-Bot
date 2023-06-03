const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription(`Learn more regarding the bot and it's features.`),
    async execute(interaction) {
 
        const helprow1 = new ActionRowBuilder()
        .addComponents(
 
            new StringSelectMenuBuilder()
            .setMinValues(1)
            .setMaxValues(1)
            .setCustomId('selecthelp')
            .setPlaceholder('Select a menu')
            .addOptions(
                {
                    label: 'Help Centre',
                    description: 'Navigate to the Help Centre.',
                    value: 'helpcentre',
                },
 
                {
                    label: 'Commands',
                    description: 'Navigate to the Commands page.',
                    value: 'commands',
                },
            ),
        );
 
        const centerembed = new EmbedBuilder()
        .setColor('#2f3136')
        .setDescription(`**Nub Bot** offers a multitude of diversified features to enchance the experience for you and your server. Listed down below are some of the features that the bot provides. \n\n <:icon1:1100723889098735679> :busts_in_silhouette: **General** \n <:icon2:1100724446525935616> :shield: **Moderation** \n <:icon2:1100724446525935616> :star_struck: **Fun** \n <:icon2:1100724446525935616> :video_game: **Minigame** \n <:icon2:1100724446525935616> :moneybag: **Economy** \n <:icon2:1100724446525935616> :tools: **Utility** \n <:icon2:1100724446525935616> :information_source: **Information** \n <:icon2:1100724446525935616> :arrow_double_up: **Level** \n <:icon3:1100724523281694781> :gear: **Miscellaneous**`)
        .setThumbnail('https://cdn.discordapp.com/icons/999278158706647070/44a365242aef5b3b0b178cb782207729.webp?size=1024')
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Support Server')
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.gg/URZnqtEbsQ"),

            new ButtonBuilder()
            .setLabel('Bot Invite')
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.com/api/oauth2/authorize?client_id=861922247974977536&permissions=8&scope=bot%20applications.commands")
        )
 
        await interaction.reply({ embeds: [centerembed], components: [helprow1, button] });
    }
}