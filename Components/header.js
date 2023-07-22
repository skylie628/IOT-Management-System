import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default function Header({navigation}){
const openMenu =() => {
 navigation.openDrawer();
}
return (
<View style={styles.header}>
 <Icon.Button name="ios-menu" size = {20}
 backgroundColor ="#009387" onPress=  {openMenu}

  ></Icon.Button>
<View>
<Text style={styles.headerText}>Menu</Text>
</View>
<View>
</View>
</View>
);
}
const styles = StyleSheet.create({
header:{
width: '100%',
height:'100%',
flexDirection:'row',
alignItems:'center',
},
headerText:{
fontWeight:'bold',
fontSize:20,
color:'white',
letterSpacing:1,

}
});