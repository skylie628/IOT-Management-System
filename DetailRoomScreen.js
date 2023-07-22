import React ,{ useState } from 'react';
import { StyleSheet,
 View,
 Text,
 StatusBar,
 Image,
 Dimensions,
 TextInput,
 Button,
 Switch,
  FlatList
 } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
 import firebaseApp from '../Components/FirebaseConfig';
  const firebase = require('firebase');

export default class DetailRoomScreen extends React.Component  {
constructor(props){
super(props);
this.state ={
dataSource: [],
}

}

Updatedevice() {
 console.log('update');
 this.state.dataSource.forEach(function (device) {
      //console.log(snapshotChild.val());
      var status = (device.state == true) ? '1' : '0';
      firebase.database().ref('devices/' + device.key+'/values').set({
          0: status,
          1: device.level + "",
        }, function(error) {
          if (error) {
            console.log("error dtb");
          } else {
            console.log("sucess dtb");
          }
        });
      }


     );

}
handleSlider = (id, value) => {
console.log(this.state.dataSource);
 console.log("handle");
  let dataSources = [...this.state.dataSource];
    dataSources[id].level = value;
    this.setState({dataSource: dataSources});
 }

 toggleSwitch = (id,value) => {
 let dataSources = [...this.state.dataSource];
 dataSources[id].state = value;
  this.setState({dataSource: dataSources});
 }

renderItem = ({item}) => {
 return(
    <View style={styles.Item}>
        <View  style={styles.Row}>
            <View style={styles.img} >
                <Image source={require('./fan-icon.png')}
                    style={{
                    width:50, height:50,
                        }}
                />
             </View>
            <View style= {styles.text}>
                <Text>{item.ID}</Text>
                <Text>Type: Fan</Text>
            </View>

           <Switch
                          onValueChange={(value)=> this.toggleSwitch(item.number,value)}
                          value={item.state}
                              />

        </View >
        <Slider
             minimumValue={0}
                  maximumValue={5000}
            value={parseInt(this.state.dataSource[item.number].level)}
            minimumTrackTintColor="#009387"
            maximumTrackTintColor="#000000"
            onValueChange={(value) =>  this.handleSlider(item.number,value)}/>

        <View style={styles.Row}>
            <Text style = {{marginLeft:10}} > Level </Text>
                <Text>{Number((parseInt(this.state.dataSource[item.number].level)/500).toFixed(0)) }</Text>
        </View>
    </View>

  );
};

componentDidMount(){

   var items = [];
     firebase.database().ref('devices').on('child_added',(dataSnapshot)=>
     {
     var status;
     if( dataSnapshot.val().values[0] == '0'){
        status = false;}
     else {status = true;}
     items.push({
                   ID: dataSnapshot.val().device_id,
                   key: dataSnapshot.key,
                   state:  status,
                   level :  dataSnapshot.val().values[1],
                   number: items.length,
               });

      console.log(items);

     this.setState({
         dataSource: items
     });
     }
     );
}



/*const [isEnabled, setIsEnabled] = useState(false);
 const toggleSwitch = () => setIsEnabled(previousState => !previousState);

 const [isEnabled1, setIsEnabled1] = useState(false);
 const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);

  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

   const [isEnabled3, setIsEnabled3] = useState(false);
   const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);

    const [isEnabled4, setIsEnabled4] = useState(false);
    const toggleSwitch4 = () => setIsEnabled4(previousState => !previousState);

     const [level,setLevel] = useState(0.5);*/
 render(){
 return(
  /*<View style = {{flex:1,alignItems:'center', justifyContent: 'center'}}>
  <Text>HomeScreen</Text>
  <Button title =" go to detail screen"
  onPress = {()=>navigation.navigate("detail")}
  />
  </View> */
  <View style={{flex: 1, flexDirection: 'column' }}>
  <View style={styles.main}>
  <View style = {styles.section}>
  <View style = {styles.search} >
  <TextInput
  placeholder="Search.."
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

            <View style={{width: 70, height: 50, backgroundColor:'#c0edd5',justifyContent: 'center'}}>
                 <Text>Auto Mode</Text>
            </View>
            <View style={{width: 50, height: 50, backgroundColor:'#c0edd5',justifyContent: 'center'}}>
                <Switch
                    />
            </View>
            <View style={{width: 70, height: 50, backgroundColor:'#c0edd5',justifyContent: 'center'}}>
            <Text>i</Text>
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
    title="Apply"
    color="#009387"
    onPress = {()=>{this.Updatedevice()}}
  />
</View>
  </View>
  //item view
)
  }
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
  sensor: {
  flex: 1,
  },
  Item:{
  marginTop:10,
  height:110,
  borderRadius: 10,
  width:Dimensions.get('window').width,
  backgroundColor:'#d7f7e6',
  elevation: 2,
  },
  Row:{
    flexDirection: 'row',
    },
  img:{
  width: 70, height: 70,justifyContent: 'center',
  marginLeft:10,
  },
  text:{
  justifyContent: 'center',
  },
  toggleItem:{
  width:150,
  justifyContent: 'center',
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