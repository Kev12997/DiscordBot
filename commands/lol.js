const https = require('https') //https library
const Discord = require('discord.js') //Discord library

module.exports = {
	name: 'lol',
	description: 'lol',
	execute(msg, args, Discord) {
		// console.log(typeof msg.content);
        var message = msg.content.replace(/ /g,'')
        //console.log(message)
         //if the discord message includes 'Summoner'
          //msg.reply('Pong!');
            var jsonPlayerData = "";
            var n = message.lastIndexOf('?lol');
             //console.log(n)
             var result = message.substring(n + 4);
             console.log(result)
    
    
          options = { //options for get call
            host: 'la1.api.riotgames.com',
            path: '/lol/summoner/v4/summoners/by-name/' + result,
            headers: {
                "X-Riot-Token" : "RGAPI-c74d8387-ff78-40ce-b15e-64670f00c4b7"
            }
            
        }
        console.log(options)
    try{
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
          
            res.on('data', d => {
            process.stdout.write(d)
            jsonPlayerData += d; //write response in variable to turn to json format
           
            })
    
            res.on('end', () => { //when the get call finished run this code
                if(res.statusCode == "404"){
                    //console.log("HERE")
                    const embed = new Discord.MessageEmbed()
                    // Set the title of the field
                    .setTitle("Null")
                    // Set the color of the embed
                    .setColor("#01a0c7")
                    // Set the main content of the embed
                    .setDescription("Summoner Not found");
                    // Send the embed to the same channel as the message
                    msg.channel.send(embed);
                }else{
                    console.log('Finish');
                    jsonPlayerData = JSON.parse(jsonPlayerData) //parse string to JSON object
                    //console.log(jsonPlayerData);
                    userID = jsonPlayerData.id;
                    summonerLevel = jsonPlayerData.summonerLevel
                    getMatchList(msg, userID, summonerLevel)
                }
    
    
    
              });
          })
          
          req.on('error', error => {
            console.error(error)
          })
    
          
    
        // onFinished(req, function (err, res) {
        //     console.log('Finish');
        //     console.log(jsonPlayerData);
        //   })
          
          
          req.end()
    
        }catch(err){
            console.log(err)
        }
        
    },
    
    
};

function getMatchList(msg, userID, summonerLevel){
    var summonerData = ""
    options2 = { //options for get call
        host: 'la1.api.riotgames.com',
        path: '/lol/league/v4/entries/by-summoner/' + userID,
        headers: {
            "X-Riot-Token" : "RGAPI-c74d8387-ff78-40ce-b15e-64670f00c4b7"
        }
    }
    console.log(options2)
    try{
        const req = https.request(options2, res => {
            console.log(`statusCode: ${res.statusCode}`)
          
            res.on('data', d => {
            process.stdout.write(d)
            summonerData += d; //write response in variable to turn to json format
                
            })
    
            res.on('end', () => { //when the get call finished run this code
                summonerData = JSON.parse(summonerData) //parse string to JSON object
                if(summonerData.length == 0){
                    //console.log("HERE")
                    const embed = new Discord.MessageEmbed()
                    // Set the title of the field
                    .setTitle("Null")
                    // Set the color of the embed
                    .setColor("#01a0c7")
                    // Set the main content of the embed
                    .setDescription("Data not available, maybe the summoner hasn't played in a long time");
                    // Send the embed to the same channel as the message
                    msg.channel.send(embed);
                    
                }
                else if(!(parseInt(res.statusCode) > 299)){

                    
                    //console.log('Finish');
                    
                    //console.log(summonerData);
                    
                    summonerData.forEach(element => {
                        // console.log(element);
                        if(element.queueType == "RANKED_SOLO_5x5"){
                            summonerName = element.summonerName
                            tier = element.tier
                            rank = element.rank
                            wins = element.wins
                            losses = element.losses
                            winRate = (( wins / (parseInt(wins) + parseInt(losses)) ) * 100).toFixed(2)

                        }
                    });
                    //msg.reply("The summoner level of " + summonerName + " is: " + summonerLevel + " Tier: " + tier + " Rank: " + rank + " wins: " + wins + " losses: " + losses) //Send message to disc
                    const embed = new Discord.MessageEmbed()
                    // Set the title of the field
                    .setTitle(summonerName)
                    // Set the color of the embed
                    .setColor("#01a0c7")
                    // Set the main content of the embed
                    .setDescription("Summoner Level: " + summonerLevel + "\nTier: " + tier + "\nRank: " + rank + "\nWins: " + wins + "\nLosses: " + losses + "\nWinRate: " + winRate + "%");
                    // Send the embed to the same channel as the message
                    msg.channel.send(embed);
                }else{
                    console.log(res.statusCode)
                }
              });
          })
          
          req.on('error', error => {
            console.error(error)
          })
    
          
    
        // onFinished(req, function (err, res) {
        //     console.log('Finish');
        //     console.log(jsonPlayerData);
        //   })
          
          
          req.end()
    
        }catch(err){
            console.log(err)
        }



}