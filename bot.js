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
    
    // 天気
    if (message.content.match(/天気/)) {
        let location = "Tokyo";
        let APIKEY = "Your apikey";
        //let URL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + APIKEY;
        let URL = "http://weather.livedoor.com/forecast/webservice/json/v1?city=130010";

        http.get(URL, (res) => {
            let body = "";
            res.setEncoding("utf8");

            res.on("data", (chunk) => {
                body += chunk;
            });

            res.on("end", (res) => {
                res = JSON.parse(body);
                console.log(res);
                let channel = message.channel;
                let temp = res.main.temp - 273;
                message.channel.send({
                    embed: {
                        color: 3447003,
                        author: {
                            name: 'OpenWeatherMap',
                            icon_url: 'https://png.icons8.com/dusk/64/summer.png',
                        },
                        title: '長野のお天気情報',
                        url: 'https://openweathermap.org',
                        description: 'OpenWeatherMapのAPI叩いたデータです。',
                        fields: [
                            { name: '天気', value: res.weather[0].main },
                            { name: '気温', value: temp.toFixed(2) + '°C' },
                            { name: '風力', value: res.wind.speed + 'm' },
                            { name: '雲量', value: res.clouds.all + '%' },
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: 'http://openweathermap.org/img/w/' + res.weather[0].icon.replace('n', 'd') + '.png',
                            text: 'OverWatchから逃げるな！私ですか？逃げました',
                        },
                    }
                })
            });
        }).on("error", (e) => {
            console.log(e.message);
        });
    }    
    
    
})

// Discordへの接続
//client.login(token);
// heroku config:set BOT_TOKEN=""
client.login(process.env.BOT_TOKEN);

