const ytdl = require('ytdl-core');
module.exports = {
	name: 'play',
	description: 'play',
	execute(msg, args, Discord, client) {
        var message = msg.content.replace(/ /g,'')
        var n = message.lastIndexOf('?play');
        var result = message.substring(n + 5);

        const channel = client.channels.cache.get("341751140842602508")
        channel.join().then(connection => {
        const stream = ytdl(result)
        const dispatcher = connection.play(stream);
        dispatcher.on("end", end => {
            console.log("left channel");
            voiceChannel.leave();
        });

   })
    }

}