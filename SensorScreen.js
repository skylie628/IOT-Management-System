import React ,{ useState } from 'react';
import { StyleSheet,
 View,
 Text,
 StatusBar,
 Image,
 Dimensions,
 TextInput,
 Button,
 FlatList
 } from 'react-native';
 import firebaseApp from '../Components/FirebaseConfig';
  const firebase = require('firebase');
 import Icon from 'react-native-vector-icons/Ionicons';
//  import MQTT from 'sp-react-native-mqtt';
// // Create a client instance
// import { Client, Message } from 'react-native-paho-mqtt';
 
// //Set up an in-memory alternative to global localStorage
// const myStorage = {
//   setItem: (key, item) => {
//     myStorage[key] = item;
//   },
//   getItem: (key) => myStorage[key],
//   removeItem: (key) => {
//     delete myStorage[key];
//   },
// };
 
// // Create a client instance
// const client = new Client({ uri: 'tcp://13.76.250.158:1883', clientId: 'clientId', storage: myStorage });
 
// // set event handlers
// client.on('connectionLost', (responseObject) => {
//   if (responseObject.errorCode !== 0) {
//     console.log(responseObject.errorMessage);
//   }
// });
// client.on('messageReceived', (message) => {
//   console.log(message.payloadString);
// });
 
// // connect the client
// client.connect()
//   .then(() => {
//     // Once a connection has been made, make a subscription and send a message.
//     console.log('onConnect');
//     return client.subscribe('World');
//   })
//   .then(() => {
//     const message = new Message('Hello');
//     message.destinationName = 'home/test';
//     client.send(message);
//     console.log(message);
//   })
//   .catch((responseObject) => {
//     if (responseObject.errorCode !== 0) {
//       console.log('onConnectionLost:' + responseObject.errorMessage);
//     }
//   })
// ;
 
export default class SensoScreen extends React.Component{
CloneSensor(){
  console.log("test");
//   var msg='[{ "device_id":"d5_1", "values":["30","75"]}, { "device_id":"d5_2", "values":["31","75"]}]';
//   
//   //client.publish('home/humidity', msg)
//   client.on('message', function (topic, message) {
// 	// message is Buffer
//   	var obj = JSON.parse(message);
//   	console.log(obj);
//   	client.end()
// })
// const on_function = (err) => {
//   if (!err){
//     console.log("connect");
//   }
//   else {
//     console.log("not connect");
//   }
// }
// client.on('connect');
// client.on = on_function;
// console.log("aạneggt ");
// // const a = function er
// client.subscribe('home/humidity');
// //, function (err) {
//   //   	client.subscribe('home/humidity', function (err) {
//     // if(err){
//     // console.log("not connect")
//     // }
//     // else {
//     //   console.log("connect")
//     // }
//   //     	var msg='[{ "device_id":"d5_1", "values":["30","75"]}, { "device_id":"d5_2", "values":["31","75"]}]';
//   //       	// var y = JSON.parse(msg);
//     //client.publish('home/humidity', msg)
//   //   )
// //})
// client.on('message', function (topic, message) {
// 	// message is Buffer
// 	console.log("connect");
//   	var obj = JSON.parse(message);
//   	console.log(obj);
//   	//console.log(message.toString());
//   	//console.log(message.toString())
//   	client.end()
// })
var mqtt = require('mqtt/dist/mqtt')
var client = mqtt.connect('mqtt://52.187.144.179:1883')
var msg='[{ "device_id":"d5_1", "values":["30","75"]}, { "device_id":"d5_2", "values":["31","75"]}]';
      	// var y = JSON.parse(msg);
client.publish('home/humidity', msg)
//client.subscribe('home/humidity')
console.log(client);
client.on('connect', function () {
    console.log("connect")
  	client.subscribe('home/humidity', function (err) {
      if(!err){
        var msg='[{ "device_id":"d5_1", "values":["30","75"]}, { "device_id":"d5_2", "values":["31","75"]}]';
      	// var y = JSON.parse(msg);
        client.publish('home/humidity', msg)
      }
      else 
      {
        console.log("error")
      }
  })
})
client.on('message', function (topic, message) {
  	// message is Buffer
    	var obj = JSON.parse(message);
    	console.log(obj);
    	client.end()
})
}



constructor(props){
super(props);
this.itemRef = firebase.database();
this.state = {
    dataSource: [

                ]
}
}

renderItem = ({item}) => {
 console.log(this.state.dataSource);
 return(
   <View  style={styles.Item}>
            <View style={styles.img} >
            <Image source={require('./temper-icon.png')}
             style={{
             width:50, height:50,
             }}
             />
            </View>
            <View style= {styles.text}>
            <Text>Device ID: {item.ID}</Text>
            <Text>Temperture: {item.Temper}</Text>
            <Text>Humid: {item.Humid}</Text>
            </View>
    </View>

  );
};
componentDidMount(){

  var items = [];
     firebase.database().ref('sensors').on('child_added',(dataSnapshot)=>
     {
     console.log(dataSnapshot.val().value);
     items.push({
                   ID: dataSnapshot.val().device_id,
                   Temper :  dataSnapshot.val().value[0],
                   Humid :  dataSnapshot.val().value[1]
               });
      console.log(items);

     this.setState({
         dataSource: items
     });
     }
     );
}


 render() {
  return(
  <View style={{flex: 1, flexDirection: 'column' }}>
  <View style={styles.main}>
  <View style = {styles.section}>
  <View style = {styles.search} >
  <TextInput
  placeholder="Search sensor.."
  style = {{flex:1,marginLeft:50}} />
  </View>
  <View style={{flex: 1, flexDirection: 'row',backgroundColor:'#c0edd5', height:50 }}>
          <View style={{width: 50, height: 50, backgroundColor:'#c0edd5',justifyContent: 'center'}} >
          <Image source={require('./temper-icon.png')}
           style={{
           width:40, height:40,
           }}
           />
          </View>
          <View style={{width: 50, height: 50, backgroundColor:'#c0edd5',justifyContent: 'center'}}>
          <Text>20oC</Text>
          </View>

       <View style={{position:'absolute',right:0,flexDirection: 'row'}}>
         <View style={{width: 50, height: 50, backgroundColor:'#c0edd5',justifyContent: 'center'}} >
                   <Image source={require('./humid-icon.png')}
                    style={{
                    width:40, height:40,
                    }}
                    />
                   </View>
                   <View style={{width: 50, height: 50, backgroundColor:'#c0edd5',justifyContent: 'center'}}>
                   <Text>75%</Text>
                   </View>
                   </View>
            </View>
  </View>

<View style={{ flex: 1, width: '100%' }}>
  <FlatList
  data = {this.state.dataSource}
  renderItem = {this.renderItem}
  keyExtractor = {(item,index) => index}
  onEndReached={this._handleLoadMore}
  />
  </View>
        </View>
<View style={styles.footer}>
   <Button
      title="Add new sensor"
      color="#009387"
      onPress = {this.CloneSensor}
    />
</View>
  </View>
  //item view
)
  };
 };
  var styles = StyleSheet.create({
  search:{
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical:1,
  paddingHorizontal: 1,
  borderRadius: 100,
  backgroundColor:'#fefefe',
  marginTop: 10,
  marginBottom:10,
  },
  section:{
  backgroundColor:'#c0edd5',
  height:130
  },

  Item:{
  marginTop:10,
  height:70,
  flexDirection: 'row',
  borderRadius: 10,
  width:Dimensions.get('window').width,
  backgroundColor:'#d7f7e6',
  elevation: 2,
  },
  img:{
  width: 70, height: 70,justifyContent: 'center',
  marginLeft:10,
  },
  text:{
  justifyContent: 'center',
  },
  deletebtn:{
  position: 'absolute',
  right:10,
  top:15,
  width:70,
  },
  main:{
  flex:1,
  height: Dimensions.get('window').height,
  backgroundColor: '#edfff6',
  },
  footer:{
    position: 'absolute',
     bottom: -10,
     width:Dimensions.get('window').width,
    },
  })