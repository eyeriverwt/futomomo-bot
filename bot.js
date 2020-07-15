// discord.js モジュールのインポート
const Discord = require('discord.js');

// Discord Clientのインスタンス作成
const client = new Discord.Client();

// httpでgetしてJSONパース
const http = require('http');

// トークンの用意
//const token = 'NzMwOTUxNzU2NjkwNzUxNTE4.Xwe-KA.aEMoi1cas1PgFFZLHt2zWTNhXJs';// access token

// 準備完了イベントのconsole.logで通知黒い画面に出る。
client.on('ready', () => {
    //console.log('ready...');
    console.log(`${client.user.username} でログインしています。`);
});

client.on('message', async message => {
	//Bot自身の発言を無視
    if(message.author.bot){
        return;
   }

    // 挨拶
	if (message.content.match(/おは/)) {
		//メッセージを送るチャンネルを判断します
        let channel = message.channel;
        let author = message.author.username;
        let reply_text =`おはゆ！！`;
        
        /*
		const req = https.request('https://rss-weather.yahoo.co.jp/rss/days/4410.xml', (res) => {
		    res.on('data', (chunk) => {
		        console.log(`BODY: ${chunk}`);
		    });
		    res.on('end', () => {
		        console.log('JSONデータは以上です。');
		    });
		})
		req.on('error', (e) => {
		  console.error(`エラーが出ました： ${e.message}`);
		});
		req.end();
        */
        //reply_textを送信します
        message.reply(reply_text)
        	//メッセージを送信したら送信したメッセージをターミナルにも表示します
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
        return;
    }
    
    
})

// Discordへの接続
//client.login(token);
// heroku config:set BOT_TOKEN=""
client.login(process.env.BOT_TOKEN);
/*
bot.on("presenceUpdate", (other, oldPresence) => {
    const textChannel = other.guild.channels.find((channel) => channel.type === 0);
    const userName = other.user.username;

    if (other.game) {
        const gameName = other.game.name;
        bot.createMessage(textChannel.id, userName + "が" + gameName + "を始めました");
    } else if (oldPresence.game) {
        const gameName = oldPresence.game.name;
        bot.createMessage(textChannel.id, userName + "が" + gameName + "を終了しました");
    }
});

bot.on("voiceChannelJoin", (member, newChannel) => {
    const textChannel = newChannel.guild.channels.find((channel) => channel.type === 0);
    const msg = member.username + "が通話を始めました";
    bot.createMessage(textChannel.id, msg);
});

bot.on("voiceChannelLeave", (member, oldChannel) => {
    const textChannel = oldChannel.guild.channels.find((channel) => channel.type === 0);
    const msg = member.username + "が通話をやめました";
    bot.createMessage(textChannel.id, msg);
});
bot.connect();
*/