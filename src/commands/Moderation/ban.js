const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');
 
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban an user from the server.')
    .setDMPermission(false)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to be banned')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for the ban')
        .setRequired(false)),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No Reason Provided';
    let guild = await interaction.guild.fetch();
    
    const permEmbed = new EmbedBuilder()
      .setColor(0xFF0000)
      .setTitle('Invalid Permission')
      .setDescription(`:x: You do not have permission to use this command.`)
      .setTimestamp()
    const unableEmbed = new EmbedBuilder()
      .setColor(0xFF0000)
      .setDescription(`:x: Unable to send a DM to ${target.tag}.`)
      .setTimestamp()
    const dmEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Moderation Notice')
      .setDescription(` \n ${target.tag}, \n \`You have been banned from ${guild.name}\` \n \n \n **Reason:** \n ${reason} \n \n **Responsible Moderator:** \n ${interaction.user.tag} | (<@${interaction.user.id}>:${interaction.user.id})`)
      .setTimestamp()
    const banEmbed = new EmbedBuilder()
      .setColor('#2f3136')
      .setDescription(`:white_check_mark: Banned **${target.tag}** | **${reason}**.`)
      .setTimestamp()
    const failbanEmbed = new EmbedBuilder()
      .setColor(0xFF0000)
      .setDescription(`:x: Failed to ban **${target.tag}**.`)
      .setTimestamp()
    const perm = interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers);
    if (!perm)
      return await interaction.channel.sendTyping(),
        interaction.reply({ embeds: [permEmbed], ephemeral: true });
 
    await target.send({ embeds: [dmEmbed] }).catch((err) => { return console.log('Failed to DM user.') });
 
    let ban = await guild.members.ban(target, { reason: `${interaction.user.tag} - ${reason}` }).catch((err) => { console.log("Error with Ban command: " + err) })
    if (ban) {
      await interaction.channel.sendTyping(),
        await interaction.reply({ embeds: [banEmbed] })
    } else if (!ban) {
      interaction.reply({ embeds: [failbanEmbed] })
    }
  }
}