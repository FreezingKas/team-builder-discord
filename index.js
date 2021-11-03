// Require the necessary discord.js classes
const { Intents } = require('discord.js');
var DiscordJS = require('discord.js');
const { create } = require('./commands/create');
const { remove } = require('./commands/remove');
const { invite } = require('./commands/invite');
const { leave } = require('./commands/leave');
const { kick } = require('./commands/kick');


const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
})

client.on('ready', () => {
    console.log('The bot is ready');
    let commands;

    for (var guild of client.guilds.cache) {
        guild = guild[1]

        if (guild) {
            commands = guild.commands
        } else {
            commands = client.application?.commands
        }
    
        commands?.create({
            name: 'admin',
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
        
        commands?.create({
            name: 'remove',
            description: "Supprimer l'équipe dont je suis le capitaine"
        })

        commands?.create({
            name: 'invite',
            description: 'Inviter un membre dans la team',
            options: [
                {
                    name: 'pseudo',
                    description: "Pseudo du membre invité",
                    required: true,
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
                }
            ]
        })

        commands?.create({
            name: 'leave',
            description: "Quitter mon équipe actuelle"
        })

        commands?.create({
            name: 'kick',
            description: 'Kick un membre dans la team',
            options: [
                {
                    name: 'pseudo',
                    description: "Pseudo du membre à kick",
                    required: true,
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
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

    // commande de test
    if (commandName === 'admin') {
        interaction.reply({
            content: "admin"
        })
    }

    // Création de team
    if (commandName === 'create') {
        create(interaction)
    }

    if (commandName === 'remove') {
        remove(interaction)
    }

    if(commandName === 'invite') {
        invite(interaction)
    }

    if(commandName === 'leave') {
        leave(interaction)
    }

    if(commandName === 'kick') {
        kick(interaction)
    }
})

client.login(process.env.TOKEN)