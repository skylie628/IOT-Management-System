import React ,{ useState, Component } from 'react';
import { StyleSheet,
 View,
 Text,
 StatusBar,
 Image,
 Dimensions,
 TextInput,
 Button,
 FlatList,
 ListItem,
 ScrollView,
  AsyncStorage
 } from 'react-native';
  import firebaseApp from '../Components/FirebaseConfig';
 const firebase = require('firebase');
 import Icon from 'react-native-vector-icons/Ionicons';
export default class UserScreen extends React.Component {
constructor(props){
super(props);
this.itemRef = firebase.database();
this.state = {
    dataSource: [

                ],
    accountemail:'',
    accountrole: '',
}
}
setAdmin = (key) => {
var data = this.state.dataSource;
var index = data.findIndex(i => i.key === key);
console.log(index);
data[index].role = 1;
this.setState({
dataSource: data,
})
firebase.database().ref('Admin').child(key).update({role:1});
}
renderItem = ({item}) => {
 console.log(this.state.dataSource);
 return(
  <View  style={styles.Item}>

          <View style={styles.img} >
          <Image source={require('./user-icon.png')}
           style={{
           width:50, height:50,
           }}
           />
          </View>
          <View style= {styles.text}>
      <Text>{item.email} </Text>
          {item.role ? <Text>Role: Admin </Text> : <Text>Role: User </Text>}
          </View>
         <View style= {styles.deletebtn}>
           {!item.role ?   <Button
                title="Admin"
                color="#009387"
                onPress = {() => this.setAdmin(item.key)}
              /> : <View></View>}
          </View>
  </View>);
};
componentDidMount= () =>{

AsyncStorage.getItem('email').then(value =>
    //AsyncStorage returns a promise so adding a callback to get the value

     this.setState({
         accountemail: value ,
         })
    //Setting the value in Text
);
AsyncStorage.getItem('role').then(value =>
    //AsyncStorage returns a promise so adding a callback to get the value
this.setState({
         accountrole: value ,
         })
    //Setting the value in Text
);
  var items = [];
     firebase.database().ref('Admin').on('child_added',(dataSnapshot)=>
     {
     console.log(dataSnapshot.val().email);
     items.push({
                   key: dataSnapshot.key,
                   email:dataSnapshot.val().email,
                   role: dataSnapshot.val().role,
               });

     }
     );
     this.setState({
     dataSource: items,
     })
}
render(){
 return (
  <View style={{flex: 1, flexDirection: 'column' }}>
  <View style={styles.main}>
  <View style = {styles.section}>
  <View style = {styles.search} >
  <TextInput
  placeholder="Search username.."
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
      title="Add new user"
      color="#009387"
    />
</View>
  </View>
  //item view

  )}
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