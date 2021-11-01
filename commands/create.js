const {Permissions} = require('discord.js');

module.exports = {
    create: async function(interaction) {
        const { commandName, options } = interaction
        const team_name = options.getString('equipe');
            
        // Décalage de la réponse tant que la création est pas terminé
        await interaction.deferReply({})

        // création du rôle
        const role = await interaction.guild.roles.create({
            name: team_name,
            color: 'RANDOM',
            reason: 'Un super rôle pour une super équipe : ' + team_name,
        })
        .then(console.log("Rôle " + team_name + " crée"))
        .catch(console.error);
        
        
        // création de la catégorie et channel
        const category = await interaction.guild.channels.create(
            `Équipe ${team_name}`,
            {
                type: 'GUILD_CATEGORY'
                
            }
        )
        
        // salon contact publique
        await interaction.guild.channels.create(
            'contact',
            {
                parent: category
            }
        )
        
        // salon discussion privé
        await interaction.guild.channels.create(
            'discussion',
            {
                parent: category,
                permissionOverwrites: [
                    {
                        id: role.id,
                        allow: Permissions.FLAGS.VIEW_CHANNEL
                    }
                ]
            }
            
        )
        
        // salon partage privé
        await interaction.guild.channels.create(
            'partage',
            {
                parent: category,
                permissionOverwrites: [
                    {
                        id: role.id,
                        allow: Permissions.FLAGS.VIEW_CHANNEL
                    }
                ]
            }
        )

        // salon vocal privé
        await interaction.guild.channels.create(
            'Team Vocal',
            {
                type: 'GUILD_VOICE',
                parent: category,
                permissionOverwrites: [
                    {
                        id: role.id,
                        allow: Permissions.FLAGS.VIEW_CHANNEL
                    }
                ]
            }
        )

        console.log("Salons crées")
        
        // récupérer le rôle de capitaine puis  ajouter le rôle de team et capitaine au crétaeur
        const capitaine = (await interaction.guild.roles.fetch()).find(role => role.name.includes("Capitaine"))
        interaction.member.roles.add([capitaine, role])

        console.log("Rôle ajouté")


        interaction.editReply({
            content: "L'équipe " + team_name + " est crée !" 
        })
    }
}

