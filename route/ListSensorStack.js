import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Header from '../Components/header';
import ListSensor from '../src/SensorScreen';
import React from 'react';
const screens = {
ListSensor: {
screen: ListSensor,
navigationOptions:({navigation}) => {
return{
headerTitle: () => <Header navigation={navigation}/>,
}
 }
}

}
const ListSensorStack = createStackNavigator(screens,{
defaultNavigationOptions:{
headerTintColor: '#666',
headerStyle:{backgroundColor:'#009387',height:60}
}
});
export default ListSensorStack;
