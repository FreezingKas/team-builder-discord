
module.exports = {
    kick: async function(interaction) {
        await interaction.deferReply({})

        const { commandName, options } = interaction

        const team_role = interaction.member.roles.cache.find(r => r.name.includes('Équipe'))

        const kicked_user = interaction.guild.members.resolve(options.getUser('pseudo'))

        const role_kicked = kicked_user.roles.cache.find(r => r.name.includes('Équipe'))

        const capitaine = interaction.guild.roles.cache.find(r => r.name === 'Capitaine')

        // si il a pas d'équipe
        if(!role_kicked) {
            await interaction.editReply({
                content: "Ce joueur n'a pas d'équipe !"
            })
            return
        }

        // si le capitaine et le membre n'ont pas le même rôle
        if(team_role != role_kicked) {
            await interaction.editReply({
                content: "Ce joueur n'est pas dans ton équipe !"
            })
            return
        }

        // si il n'a pas le rôle de capitaine ca dégage
        if(!interaction.member.roles.cache.find(r => r === capitaine)) {
            await interaction.editReply({
                content: "Seul le capitaine peut kick un membre"
            })
            return
        }

        kicked_user.roles.remove(role_kicked)

        console.log(kicked_user.nickname + " supprimé de l'" + team_role.name)

        await interaction.editReply({
            content: kicked_user.nickname + " supprimé de **l'" + team_role.name+"**"
        })
    }
}