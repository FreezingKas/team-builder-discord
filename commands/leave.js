
module.exports = {
    leave: async function(interaction) {
        await interaction.deferReply({})

        const team_role = interaction.member.roles.cache.find(r => r.name.includes('Équipe'))

        // si il a pas d'équipe
        if(!team_role) {
            await interaction.editReply({
                content: "Tu n'est pas dans une équipe"
            })
            return
        }

        const capitaine = interaction.guild.roles.cache.find(r => r.name === 'Capitaine')

        // si il est capitaine capitaine ca dégage
        if(interaction.member.roles.cache.find(r => r === capitaine)) {
            await interaction.editReply({
                content: "Tu es capitaine tu peux juste supprimer l'équipe avec /remove"
            })
            return
        }

        await interaction.member.roles.remove(team_role)

        console.log(interaction.member.nickname + " a quitté **l'" + team_role.name)

        await interaction.editReply({
            content: interaction.member.nickname + " a quitté **l'" + team_role.name+"**"
        })
    }
}