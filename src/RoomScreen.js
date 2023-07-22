import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,

} from 'react-native';
const firebase = require('firebase');
import { createFilter } from 'react-native-search-filter'
const KEYS_TO_FILTERS = ['name']
export default class RoomScreen extends React.Component {

  constructor(props) {
    super(props);
    this.itemRef = firebase.database();
    this.state = {
      dataSource: [],
      dataSearch: [],
      searchTerm: '',
      addstate: false,
      roomname: '',
    }
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
    console.log(term)
    const filteredDevice = this.state.dataSource.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    console.log(filteredDevice)
    if (!term) this.state.dataSearch = this.state.dataSource; else this.state.dataSearch = filteredDevice;
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.Item} onStartShouldSetResponder={() => this.props.navigation.navigate('DetailRoom', { data: item })}>
        <View style={{ marginLeft: 10 }}>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.img} >
            <Image source={require('./temper-icon.png')}
              style={{
                width: 30, height: 30,
              }}
            />
          </View>
          <View style={styles.text}>
            <Text>{item.tem}°C</Text>
          </View>
          <View style={styles.img} >
            <Image source={require('./humid-icon.png')}
              style={{
                width: 30, height: 30,
              }}
            />
          </View>
          <View style={styles.text}>
            <Text>{item.hum}%</Text>
          </View>
        </View>
      </View>

    );
  };
  handleAdd = () => {
    var state = this.state.addstate;
    this.setState({
      addstate: !state
    });
  }
  handleRoomname = (text) => {
    this.setState({ roomname: text })
  }
  handleAddEvent = () => {

    var newRoomRef = firebase.database().ref('room').child(this.state.roomname);;
    newRoomRef.set({
      automode: false,
      sensor: { device_id: "undefine", values: { 0: "0", 1: "0" } }

    });
    this.setState({
      addstate: false
    });
  }
  componentDidMount() {
    console.log("roompage")
    var items = [];
    firebase.database().ref('room').on('child_added', (dataSnapshot) => {


      items.push({
        name: dataSnapshot.key,
        tem: dataSnapshot.val().sensor.values[0],
        hum: dataSnapshot.val().sensor.values[1],

      });
    });

    this.setState({
      dataSource: items,
      dataSearch: items
    });
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.main}>
          <View style={styles.section}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }} >
              <View style={styles.search}>
                <TextInput
                  placeholder="Search room.."
                  onChangeText={(term) => { this.searchUpdated(term) }}
                />
              </View>
              <TouchableOpacity activeOpacity={.5} onPress={this.handleAdd}>
                <Image source={require('./add-icon.png')}
                  style={{
                    width: 40, height: 40,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {this.state.addstate &&
            <View style={{ padding: 10, backgroundColor: '#d7f7e6', elevation: 3, borderRadius: 10, margin: 10 }}>
              <Text>Tên phòng </Text>
              <TextInput
                placeholder="Room name.."
                onChangeText={this.handleRoomname}
                style={{ backgroundColor: 'white', padding: 5, marginTop: 5, borderRadius: 5 }}
              />

              <TouchableOpacity activeOpacity={.5} onPress={this.handleAddEvent}>
                <View style={{ borderRadius: 10, borderColor: '#009387', borderWidth: 1, margin: 10, alignItems: 'center' }}>
                  <Text style={{ alignItems: 'center', padding: 5 }}> Add new Room </Text>
                </View>
              </TouchableOpacity>


            </View>}
          <View style={{ flex: 1, width: '100%' }}>
            <FlatList
              data={this.state.dataSearch}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index}
              onEndReached={this._handleLoadMore}
            />
          </View>
        </View>
      </View>
      //item view

    );
  }
};
var styles = StyleSheet.create({
  search: {
    width: Dimensions.get('window').width - 100,
    borderRadius: 50,
    backgroundColor: '#fefefe',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  section: {
    backgroundColor: '#c0edd5',
    height: 60
  },
  Item: {
    padding: 10,
    marginTop: 10,
    height: 70,
    flexDirection: 'row',
    borderRadius: 10,
    width: Dimensions.get('window').width,
    backgroundColor: '#d7f7e6',
    elevation: 2,
  },
  text: {
    paddingLeft: 2,
    paddingRight: 2,
    justifyContent: 'center',
  },
  img: {
    paddingLeft: 10,
  },
  main: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: '#edfff6',
  },
  info: {
    paddingLeft: 20,
    position: "absolute",
    flexDirection: 'row',
    bottom: 0,
    right: 10,
    height: 35,
  }
})