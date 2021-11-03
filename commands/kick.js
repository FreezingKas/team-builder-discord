
module.exports = {
    kick: async function(interaction) {
        await interaction.deferReply({})

        const { commandName, options } = interaction

        const team_role = interaction.member.roles.cache.find(r => r.name.includes('Équipe'))

        const user = interaction.guild.members.resolve(options.getUser('pseudo'))

        await interaction.editReply({
            content: "atm ca fait rien mais tkt"
        })
    }
}