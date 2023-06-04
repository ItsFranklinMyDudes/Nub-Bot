const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const levelSchema = require(`../../Schemas.js/levelSchema`);
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('xpuser-reset')
    .setDescription(`Reset an user's xp & rank.`)
    .addUserOption(option => option.setName("user").setDescription(`The user you want to reset the xp of`).setRequired(true)),
    async execute(interaction, client) {
 
                const perm = new EmbedBuilder()
                .setColor("#2f3136")
                .setDescription(`:x: You don't have permission to reset xp levels in this server`)
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ embeds: [perm], ephemeral: true })
 
                const { guildId } = interaction;
 
                const target = interaction.options.getUser('user')
 
                const embed = new EmbedBuilder()
 
                levelSchema.deleteMany({ Guild: guildId, User: target.id}, async (err, data) => {
 
                    embed.setColor("#2f3136")
                    .setDescription(`:white_check_mark: ${target.tag}'s xp has been reset!`)
 
                    return interaction.reply({ embeds: [embed] });
                })
    }
}