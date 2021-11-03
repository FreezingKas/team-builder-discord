
module.exports = {
    invite: async function(interaction) {
        await interaction.deferReply({})

        const { commandName, options } = interaction

        // récupérer le rôle de team du mec et récupérer le rôle de capitaine du serv
        const team_role = interaction.member.roles.cache.find(r => r.name.includes('Équipe'))
        const capitaine = interaction.guild.roles.cache.find(r => r.name === 'Capitaine')

        // si il n'a pas le rôle de capitaine ca dégage
        if(!interaction.member.roles.cache.find(r => r === capitaine)) {
            await interaction.editReply({
                content: "Seul le capitaine peut inviter des membres !"
            })
            return
        }

        // si il a pas d'équipe
        if(!team_role) {
            await interaction.editReply({
                content: "Tu n'est pas capitaine d'une équipe !"
            })
            return
        }

        // récupérer user en args
        const user = interaction.guild.members.resolve(options.getUser('pseudo'))

        // ajouter le rôle au boug invité
        user.roles.add(team_role)

        await interaction.editReply({
            content: user.nickname + " ajouté dans l'**" + team_role.name+"**"
        })
    }
}