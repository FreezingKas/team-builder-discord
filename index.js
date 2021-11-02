// Require the necessary discord.js classes
const { Intents } = require('discord.js');
var DiscordJS = require('discord.js');
const { token } = require('./config.json');
const { create } = require('./commands/create');
const { remove } = require('./commands/remove');



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
        
        commands?.create({
            name: 'remove',
            description: "Supprimer l'équipe dont je suis le capitaine"
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
    if (commandName === 'test') {s

        interaction.reply({
            content: 'test fini'
        })
    }

    // Création de team
    if (commandName === 'create') {
        create(interaction)
    }

    if (commandName === 'remove') {
        remove(interaction)
    }
})

client.login(token)