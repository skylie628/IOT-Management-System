
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import OverviewStack from './OverviewStack';
import ListRoomStack from './ListRoomStack';
import ListUserStack from './ListUserStack';
import ListSensorStack from './ListSensorStack';
// import DetailRoom from './DetailRoomScreenStack';
import LogoutStack from './LogoutStack';

const RootDrawerNavigator = createDrawerNavigator({
    Overview: { screen: OverviewStack, },
    ListRoom: { screen: ListRoomStack, },
    ListUser: { screen: ListUserStack, },
    ListSensor: { screen: ListSensorStack, },
    // DetailRoomScreen: { screen: DetailRoom, },
    Logout: { screen: LogoutStack, },
}
);
export default createAppContainer(RootDrawerNavigator)
