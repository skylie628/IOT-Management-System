import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Header from '../Components/header';
import logout from '../src/login';
import React from 'react';
const screens = {
Logout: {
screen: logout,
 navigationOptions: {
      /* Hiding header for Splash Screen */
      headerShown: false,
    },
 }
}


const logoutStack = createStackNavigator(screens,{
defaultNavigationOptions:{
headerTintColor: '#666',
headerStyle:{backgroundColor:'#009387',height:60}
}
});
export default logoutStack;
