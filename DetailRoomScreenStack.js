import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Header from '../Components/header';
import DetailRoom from '../src/DetailRoomScreen';
import React from 'react';
const screens = {
DetailRoom:{
screen: DetailRoom,
navigationOptions:({navigation})=>{
return{
headerTitle: () =><Header navigation = {navigation} />
}
}
}
}
const DetailRoomScreenStack = createStackNavigator(screens,{
defaultNavigationOptions:{
headerTintColor: '#444',
headerStyle:{backgroundColor:'#009387',height:60}
}
});
export default DetailRoomScreenStack;
