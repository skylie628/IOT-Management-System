/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */
import React,{Component} from 'react';
import DrawerNavigator from './route/Drawer';

export default class App extends Component{
render(){
return (
<DrawerNavigator />
);
}
}
/*
import React from 'react';
import { StyleSheet,
 View,
 Text,
 StatusBar,
 Image,
 Dimensions,
 TextInput,
 Button,
 Switch,
 } from 'react-native';
 import { DrawerItems } from 'react-navigation';
 import Icon from 'react-native-vector-icons/Ionicons';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 import OverviewScreen from './src/OverviewScreen';
 import HistoryScreen from './src/HistoryScreen';
  import DetailScreen from './src/DetailScreen';
  import ListroomScreen from './src/RoomScreen';
 const Stack = createStackNavigator();
 const OverviewStack = createStackNavigator();
   const HistoryStack = createStackNavigator();
 const DetailStack = createStackNavigator();
 const Drawer = createDrawerNavigator();

 const OverviewStackScreen = ({navigation})  =>{
 return (


<OverviewStack.Navigator  screenOptions={{
 headerStyle:{
 backgroundColor: '#009387',
 },
 headerTintColor: '#fff',
 headerTitleStyle:{
 fontWeight: 'bold'
 }
 }}
 >
 <OverviewStack.Screen name = "Overview" component={OverviewScreen} options={{
 title:'Overview',
 headerLeft: () => (
 <Icon.Button name="ios-menu" size = {30}
 backgroundColor ="#009387" onPress = {()=>{navigation.openDrawer()}}></Icon.Button>
 )
 }}/>
 </OverviewStack.Navigator>
 );
 };

 const ListroomStackScreen = ({navigation})  =>{
  return (

 <ListroomStack.Navigator  screenOptions={{
  headerStyle:{
  backgroundColor: '#009387',
  },
  headerTintColor: '#fff',
  headerTitleStyle:{
  fontWeight: 'bold'
  }
  }}
  >
  <ListroomStack.Screen name = "Overview" component={ListroomScreen} options={{
  title:'Overview',
  headerLeft: () => (
  <Icon.Button name="ios-menu" size = {30}
  backgroundColor ="#009387" onPress = {()=>{navigation.openDrawer()}}></Icon.Button>
  )
  }}/>
  </ListroomStack.Navigator>
  );
  };

  const HistoryStackScreen = ({navigation})  =>{
   return (
  <HistoryStack.Navigator  screenOptions={{
   headerStyle:{
   backgroundColor: '#009387',
   },
   headerTintColor: '#fff',
   headerTitleStyle:{
   fontWeight: 'bold'
   }
   }}
   >

   <HistoryStack.Screen name = "history" component={HistoryScreen} options={{
   title:'History',
   headerLeft: () => (
   <Icon.Button name="ios-menu" size = {30}
   backgroundColor ="#009387" onPress = {()=>{navigation.openDrawer()}}></Icon.Button>
   )
   }}/>
   </HistoryStack.Navigator>
   );
   };



 const DetailStackScreen = ({navigation})  =>{
 return (
 <DetailStack.Navigator  screenOptions={{
  headerStyle:{
  backgroundColor: '#009387',
  },
  headerTintColor: '#fff',
  headerTitleStyle:{
  fontWeight: 'bold'
  }
  }}
  >
  <DetailStack.Screen name = "detail" component={DetailScreen } options={{}}/>
  </DetailStack.Navigator>);
  };

export default function App() {
 return (
 <NavigationContainer>{
  <Drawer.Navigator initialRouteName="Overview">
         <Drawer.Screen name="Overview" component={OverviewStackScreen} />
         <Drawer.Screen name="Listroom" component={ListroomStackScreen} />

   </Drawer.Navigator>
 /*<Stack.Navigator  screenOptions={{
 headerStyle:{
 backgroundColor: '#009387',
 },
 headerTintColor: '#fff',
 headerTitleStyle:{
 fontWeight: 'bold'
 }
 }}
 >
 <Stack.Screen name = "Home" component={HomeScreen} options={{title:'Overview'}}/>
  <Stack.Screen name = "detail" component={HomeScreen} />
 </Stack.Navigator> */

  /*
  }
 </NavigationContainer>
 );
 }; */