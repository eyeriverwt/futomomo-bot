// discord.js モジュールのインポート
const Discord = require('discord.js');

// Discord Clientのインスタンス作成
const client = new Discord.Client();

// トークンの用意
const token = 'NzMwOTUxNzU2NjkwNzUxNTE4.Xwe-KA.aEMoi1cas1PgFFZLHt2zWTNhXJs';// access token

// 準備完了イベントのconsole.logで通知黒い画面に出る。
client.on('ready', () => {
    //console.log('ready...');
    console.log(`${client.user.username} でログインしています。`);
});

//Bot自身の発言を無視する呪い
client.on('message', message =>{
    if(message.author.bot){
        return;
   }
})

// メッセージがあったら何かをする
/*
client.on('message', message => {
    // メッセージの文字列による条件分岐
    if (message.content === 'こん') {

        let channel = message.channel;
        let author = message.author.username;
        let reply_text = `こんばんわ。${author}様。`;

        // そのチェンネルにメッセージを送信する
        channel.reply(reply_text)
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
        return;
    }
});
*/
/*
client.on('message', async msg => {
  if (msg.content === 'hello') {
	let author = msg.author.username;
	msg.channel.send('hello! ${author}!')
  }
})
*/

client.on('message', async message => {
    if(message.author.bot){
        return;
   }

	if (message.content.match(/おはよ/)) {
        let channel = message.channel;
        let author = message.author.username;
        let reply_text =`おはよ！`;
        message.reply(reply_text)
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
        return;
    }
})

// Discordへの接続
client.login(token);