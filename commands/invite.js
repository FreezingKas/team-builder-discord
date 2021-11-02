
module.exports = {
    invite: async function(interaction) {
        interaction.reply({
            content: "invite"
        })

        const { commandName, options } = interaction

        const user = options.getUser('pseudo')
        console.log(user)
    }
}