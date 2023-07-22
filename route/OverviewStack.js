import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Overview from '../src/OverviewScreen.js';
import History from '../src/HistoryScreen';
import HistoryHumid from '../src/HistoryHumidScreen';
import Header from '../Components/header';
import React from 'react';
const screens = {
Overview: {
screen: Overview,
navigationOptions:({navigation}) => {
return{
headerTitle: () => <Header navigation={navigation}/>,
}
 }
},
History:{
 screen: History,
 navigationOptions:{
 tittle: 'History Temper',
 }
 },
 HistoryHumid:{
 screen: HistoryHumid,
 navigationOptions:{
 tittle: 'History Humid',
 }
 },
}

const OverviewStack = createStackNavigator(screens,{
defaultNavigationOptions:{
headerTintColor: '#444',
headerStyle:{backgroundColor:'#009387',height:60}
}
});
export default OverviewStack;
