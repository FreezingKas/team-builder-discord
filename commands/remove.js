
module.exports = {
    remove: async function(interaction) {
        const { commandName, options } = interaction

        // Defer la réponse le temps que le bordel se fasse
        await interaction.deferReply({})

        const delete_role = interaction.member.roles.cache.find(r => r.name.includes('Équipe'))
        const capitaine = interaction.guild.roles.cache.find(r => r.name === 'Capitaine')
        console.log(delete_role)

        // si le boug n'a pas de rôle d'équipe ca dégage
        if(!delete_role) {
            await interaction.editReply({
                content: "Tu n'a pas d'équipe !"
            })
            return
        }

        // si il n'a pas le rôle d'équipe ca dégage
        if(!interaction.member.roles.cache.find(r => r === capitaine)) {
            await interaction.editReply({
                content: "Seul le capitaine peut supprimer l'équipe"
            })
        }

        // retrouver la category de team
        const team_name = delete_role.name
        const category = interaction.guild.channels.cache.find(c => c.name === team_name)

        // delete tous les channels et la category
        category.children.forEach(channel => channel.delete())
        category.delete()

        // suppression du role d'équipe du serveur
        interaction.guild.roles.resolve(delete_role).delete()
        // suppression du rôle de capitaine du membre
        interaction.member.roles.remove(capitaine)

        // envoi du message
        await interaction.editReply({
            content: 'Équipe **'+ team_name+ '** supprimé'
        })
    }
}