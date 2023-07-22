import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import ListRoom from '../src/RoomScreen';
import Header from '../Components/header';
import DetailRoom from '../src/DetailRoomScreen';
import React from 'react';
const screens = {
ListRoom: {
screen: ListRoom,
navigationOptions:({navigation}) => {
return{
headerTitle: () => <Header navigation={navigation}/>,
}
 }
},

}
const ListRoomStack = createStackNavigator(screens,{
defaultNavigationOptions:{
headerTintColor: '#444',
headerStyle:{backgroundColor:'#009387',height:60}
}
});
export default ListRoomStack;
