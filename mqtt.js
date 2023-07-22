var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://52.187.144.179')

// client.on('connect', function () {
//   	client.subscribe('home/humidity', function (err) {
//     	if(!err)
//     	var msg='[{ "device_id":"d5_1", "values":["30","75"]}, { "device_id":"d5_2", "values":["31","75"]}]';
//       	// var y = JSON.parse(msg);
//     	client.publish('home/humidity', msg)
//   }
//   )
// })
var msg='[{ "device_id":"d5_1", "values":["30","75"]}, { "device_id":"d5_2", "values":["31","75"]}]';
client.subscribe('home/humidity')
//client.publish('home/humidity', msg)
client.on('message', function (topic, message) {
	// message is Buffer
  	var obj = JSON.parse(message);
  	console.log(obj);
  	//console.log(message.toString());
  	//console.log(message.toString())
  	client.end()
})