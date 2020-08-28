// discord.js モジュールのインポート
const Discord = require('discord.js');
// Discord Clientのインスタンス作成
const client = new Discord.Client();
// httpsでgetしてJSONパース
const http = require('http');

const Eris = require("eris");
const bot = new Eris(process.env.BOT_TOKEN);// heroku config:set BOT_TOKEN=""

// 準備完了イベント
client.on('ready', () => {
    //console.log('ready...');
    console.log(`${client.user.username} でログインしています。`);
    
    // ステータスに ゲームをプレイ中 を表示
    // setGameメソッドは廃止されました。
    client.user.setActivity('Netflix', {
        type: 'WATCHING'
        /*
        typeの値:
            https://discord.js.org/#/docs/main/stable/class/ClientUser?scrollTo=setActivity
                'PLAYING': 〇〇 をプレイ中
                'STREAMING': 〇〇 を配信中
                'WATCHING': 〇〇 を視聴中
                'LISTENING': 〇〇 を再生中
        */
    });    
    
});

client.on('message', async message => {
	//Bot自身の発言を無視
    if(message.author.bot){
        return;
	}
	if (message.content.match(/おは/)) {
		//メッセージを送るチャンネルを判断します
		let channel = message.channel;
		let author = message.author.username;
		let reply_text =`おはゆ！！`;

		//メンションせず
		message.channel.send(`${author}ちゃん、おはゆ！:hatching_chick:`);
 
 		/*
        //reply_textを送信します
        message.reply(reply_text)
        	//メッセージを送信したら送信したメッセージをターミナルにも表示します
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
        return;
        */
    }
    
    // 天気
    if (message.content.match(/天気/)) {
        let author = message.author.username;
        let URL = "http://weather.livedoor.com/forecast/webservice/json/v1?city=130010";

		http.get(URL, function(res) {
			var body = '';
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				body += chunk;
			}).on("end",function(){
				res = JSON.parse(body);
			    //console.log(res.forecasts);
				var w_city  = res.location["city"];
				var w_date_1  = res.forecasts[0].dateLabel;
				var w_telop_1 = res.forecasts[0].telop;
				var w_image_1 = res.forecasts[0].image["url"];
				var w_date_2  = res.forecasts[1].dateLabel;
				var w_telop_2 = res.forecasts[1].telop;
				var w_image_2 = res.forecasts[1].image["url"];

				const exampleEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('今日の天気（' + w_city + '）')
					.setURL('http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
					.setAuthor('discord.js', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
					.setDescription('weather.livedoor.com')
					.setThumbnail(w_image_1)
					.addFields(
						//{ name: 'Regular field title', value: 'Some value here' },
						//{ name: '\u200B', value: '\u200B' },
						{ name: w_date_1, value: w_telop_1, inline: true },
						{ name: w_date_2, value: w_telop_2, inline: true },
					)
					//.addField('Inline field title', 'Some value here', true)
					//.setImage(w_image_1)
					.setTimestamp()
					.setFooter('', 'https://i.imgur.com/wSTFkRM.png');
				message.channel.send(exampleEmbed);
				//メンションせず
				//画像付きにするには第二引数を設定する
				//message.channel.send('今日の' + w_city + 'の天気は ' + w_telop  + ' だお', {files: [w_image]});
		        
			});
		}).on('error', function(e) {
			console.log(e.message);
		});

    }
    
})

// Discordへの接続
//client.login(token);
// heroku config:set BOT_TOKEN=""
client.login(process.env.BOT_TOKEN);

// ユーザまたはrelationshipのステータスが変更された時
bot.on("presenceUpdate", (other, oldPresence) => {
	// Botが投稿するためのTextChannelを取得
	// TextChannelが１つの場合を想定しています。
	// 複数ある場合はchannel.id等で判別できます。
    const textChannel = other.guild.channels.find((channel) => channel.type === 0);
    const userName = other.user.username;

    if (other.game) {// ゲームが始まった時
        const gameName = other.game.name;
        bot.createMessage(textChannel.id, userName + "ちゃんが" + gameName + "をSTART");
    } else if (oldPresence.game) {// ゲームを終了した時
        const gameName = oldPresence.game.name;
        bot.createMessage(textChannel.id, userName + "ちゃんが" + gameName + "をSTOP");
    }
});

// ユーザが音声チャンネルに参加した時に発火
bot.on("voiceChannelJoin", (member, newChannel) => {
    const textChannel = newChannel.guild.channels.find((channel) => channel.type === 0);
    const msg = member.username + "ちゃんが通話START";
    bot.createMessage(textChannel.id, msg);
});
// ユーザが音声チャンネルから退出した時に発火
bot.on("voiceChannelLeave", (member, oldChannel) => {
    const textChannel = oldChannel.guild.channels.find((channel) => channel.type === 0);
    const msg = member.username + "ちゃんが通話STOP";
    bot.createMessage(textChannel.id, msg);
});
bot.connect();