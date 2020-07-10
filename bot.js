// discord.js モジュールのインポート
const Discord = require('discord.js');

// Discord Clientのインスタンス作成
const client = new Discord.Client();

// httpsでgetしてJSONパース
const https = require('https');

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

	if (message.content.match(/おはゆ/)) {
        let channel = message.channel;
        let author = message.author.username;
        let reply_text =`おはゆ！`;
        
        // ---------------------
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
        // ---------------------
        
        message.reply(reply_text)
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
        return;
    }
})

// Discordへの接続
//client.login(token);
// heroku config:set BOT_TOKEN=""
client.login(process.env.BOT_TOKEN);

//https://rss-weather.yahoo.co.jp/rss/days/4410.xml