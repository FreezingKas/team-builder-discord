// Require the necessary discord.js classes
const { Intents, Permissions } = require('discord.js');
var DiscordJS = require('discord.js');
const { token } = require('./config.json');


const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
})

client.on('ready', () => {
    console.log('The bot is ready')
    let commands

    for (var guild of client.guilds.cache) {
        guild = guild[1]

        if (guild) {
            commands = guild.commands
        } else {
            commands = client.application?.commands
        }
    
        commands?.create({
            name: 'test',
            description: 'Commande de test'
        })

    
        commands?.create({
            name: 'create',
            description: 'Créer un équipe et se désigne comme capitaine de cette équipe',
            options: [
                {
                    name: 'equipe',
                    description: "Nom de l'équipe",
                    required: true,
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
                }
            ]
        })   
    }
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    // récupérer les args
    const { commandName, options } = interaction

    // classique commande
    if (commandName === 'test') {
        


        interaction.reply({
            content: 'test fini'
        })



    }

    if (commandName === 'create') {
        const team_name = options.getString('equipe');
        
        // Décalage de la réponse tant que la création est pas terminé
        await interaction.deferReply({

        })

        // création du rôle
        const role = await interaction.guild.roles.create({
            name: team_name,
            color: 'RANDOM',
            reason: 'Un super rôle pour une super équipe : ' + team_name,
        })
        .then(console.log("Rôle " + team_name + " crée"))
        .catch(console.error);
        
        interaction.editReply({
            content: "L'équipe " + team_name + " est crée !" 
        })

        // création de la catégorie et channel
        const category = await interaction.guild.channels.create(
            `Équipe ${team_name}`,
            {
                type: 'GUILD_CATEGORY'
                
            }
        )

        await interaction.guild.channels.create(
            'contact',
            {
                parent: category
            }
        )

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
        
        const capitaine = (await interaction.guild.roles.fetch()).find(role => role.name.includes("Capitaine"))

        interaction.member.roles.add([capitaine, role])

    }
})





client.login(token)