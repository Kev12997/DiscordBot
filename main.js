const fs = require('fs');
const https = require('https') //https library
const Discord = require('discord.js') //Discord library
const { prefix, token } = require('./config.json'); //get the prefix(!) and token from config file
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //read all of the js files in commands folder
const client = new Discord.Client();
client.commands = new Discord.Collection();
const ytdl = require('ytdl-core');
const discordTTS=require("discord-tts");


//const voice = new Discord.VoiceChannel();
for (const file of commandFiles) { //loop on all command files
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command); //A collection of commands
}

const streamOptions = { seek: 0, volume: 1 };
client.once('ready', () => {
    console.log("ready");
    // const stream = discordTTS.getVoiceStream("Fuck you you stupid fuck");

    // const channel = client.channels.cache.get("341751140842602508")
    // channel.join().then(connection => {
    // const dispatcher = connection.play(stream);
    
    // dispatcher.on("end", end => {
    //     console.log("left channel");
    //     voiceChannel.leave();
    // });

    // })

  
});
//630890978668052490
client.on('message', msg => {
   
    if (!msg.content.startsWith(prefix) || msg.author.bot) return; //if the message does not start with the prefix exit

	const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();//the comand
    console.log(command)
    //console.log(command)

	if (!client.commands.has(command)) return;//if the command does not exists

    try {
        client.commands.get(command).execute(msg, args, Discord,client); //try the command
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
    

})



client.login(token); //discord bot token

