import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Header from '../Components/header';
import DetailRoom from '../src/DetailRoomScreen';
import ListUser from '../src/UserScreen';
import React from 'react';
const screens = {
ListUser: {
screen: ListUser,
navigationOptions:({navigation}) => {
return{
headerTitle: () => <Header navigation={navigation}/>,
}
 }
}

}
const ListUserStack = createStackNavigator(screens,{
defaultNavigationOptions:{
headerTintColor: '#666',
headerStyle:{backgroundColor:'#009387',height:60}
}
});
export default ListUserStack;
