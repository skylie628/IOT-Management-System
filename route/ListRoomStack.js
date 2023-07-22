import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ListRoom from '../src/RoomScreen.js';
import DetailRoom from '../src/DetailRoomScreen';
import Header from '../Components/header';
import React from 'react';
const screens = {
    ListRoom: {
        screen: ListRoom,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
            }
        }
    },
    DetailRoom: {
        screen: DetailRoom,
        navigationOptions: {
            tittle: 'Detail Room',
        }
    },
}

const ListRoomStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#009387', height: 60 }
    }
});
export default ListRoomStack;
