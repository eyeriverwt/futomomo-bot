// discord.js モジュールのインポート
const Discord = require('discord.js');
// Discord Clientのインスタンス作成
const client = new Discord.Client();
// httpsでgetしてJSONパース
const http = require('http');

// 準備完了イベントのconsole.logで通知黒い画面に出る。
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
 
          //メンションせず
        message.channel.send(`${author}ちゃん、おはゆ！`);

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
        let location = "Tokyo";
        let APIKEY = "Your apikey";
        //let URL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + APIKEY;
        let URL = "http://weather.livedoor.com/forecast/webservice/json/v1?city=130010";

		http.get(URL, function(res) {
			var body = '';
			res.setEncoding('utf8');
			
			res.on('data', function(chunk) {
				body += chunk;
			}).on("end",function(){
				res = JSON.parse(body);
				var w_telop = res.forecasts[0].telop;
				var w_city  = res.location["city"];
			    console.log(res.forecasts[0].image["url"]);
				var w_image  = res.forecasts[0].image["url"];
		         //メンションせず
		        //message.channel.send('今日の' + w_city + 'の天気は ' + w_telop  + w_image + ' よ！');
		        //画像付きにするには第二引数を設定する
		        message.channel.send('今日の' + w_city + 'の天気は ' + w_telop  + ' よ！', {files: [w_image]});
		        
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

