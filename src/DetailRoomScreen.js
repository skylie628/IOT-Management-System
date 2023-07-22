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
	Switch,
	FlatList,
	TouchableOpacity,
	TouchableHighlight,
	Animated,
	Easing,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import { createFilter } from 'react-native-search-filter'
const firebase = require('firebase');
const KEYS_TO_FILTERS = ['ID', 'level']

export default class DetailRoomScreen extends React.Component {
	constructor(props) {
		super(props);
		this.animated = new Animated.Value(0);
		this.opacityanimate = new Animated.Value(0);
		this.state = {
			dataSource: [],
			dataSearch: [],
			searchTerm: '',
			currentroom: '',
			temp: '',
			humid: '',
			addstate: false,
			activeRowKey: 0,
			radio_props: [
				{ label: 'Fan', value: 1 },
				{ label: 'Air Conditioner', value: 0 }
			],
			radiovalue: 0,
			devicename: '',
			autoMode: false
		}
	}

	searchUpdated(term) {
		this.setState({ searchTerm: term })
		const filteredDevice = this.state.dataSource.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
		if (!term) this.state.dataSearch = this.state.dataSource; else this.state.dataSearch = filteredDevice;
	}

	handleAdd = () => {
		var state = this.state.addstate;
		this.setState({
			addstate: !state
		});
	}

	handleAddEvent = () => {
		console.log("in add")
		// console.log(this.state.radiovalue);
		var newRoomRef = firebase.database().ref('room/' + this.state.currentroom + '/devices').push();
		newRoomRef.set({
			device_id: this.state.devicename,
			type: this.state.radiovalue,
			values: { 0: "0", 1: "2500" }
		});
		this.setState({
			addstate: false
		});
	}

	Updatedevice() {
		if (this.state.autoMode) {
			var item = {
				room: this.state.currentroom,
				values: [this.state.temp, this.state.humid]
			}
			var data = JSON.stringify(item)
			axios.post('http://192.168.1.34:8080/api/setAutoMode', { data })
				.then((res) => {
					console.log("API");
				})
				.catch((err) => {
					console.log(err);
				});
		}
		else {
			this.state.dataSource.forEach(function (device) {
				var status = (device.state == true) ? '1' : '0';
				var item = {
					device_room: device.room,
					device_key: device.key,
					device_id: device.ID,
					values: [status, Math.round(parseInt(device.level))]
				}
				var data = JSON.stringify(item)
				axios.post('http://192.168.1.34:8080/api', { data })
					.then((res) => {
						console.log("API");
					})
					.catch((err) => {
						console.log(err);
					});
			});
		}
	}

	handleSlider = (id, value) => {
		// console.log(this.state.dataSource);
		// console.log("handle");
		let dataSources = [...this.state.dataSource];
		dataSources[id].level = value;
		this.setState({ dataSource: dataSources });
	}

	handleDevice = (text) => {
		this.setState({ devicename: text })
	}

	toggleSwitch = (id, value) => {
		let dataSources = [...this.state.dataSource];
		dataSources[id].state = value;
		this.setState({ dataSource: dataSources });
	}

	toggleSwitchMode = (value) => {
		this.setState({ autoMode: value })
		firebase.database().ref('room/' + this.state.currentroom).update({
			automode: value
		});

	}

	deleteDevice = (deviceID) => {
		firebase.database.ref("room/" + this.state.currentroom + "/devices/" + deviceID).remove();
	}
	//opacity animation function
	spin = () => {
		this.animated.setValue(0)
		Animated.timing(
			this.animated,
			{
				toValue: 1,
				duration: 2000,
				easing: Easing.linear,
				useNativeDriver: true,

			}
		).start(this.spin)
	}

	opacity = () => {
		this.opacityanimate.setValue(0)
		Animated.timing(
			this.opacityanimate,
			{
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: true,
			}
		).start(this.opacity)
	}

	// renderItem = ({ item }) => {

	// 	return (
	// 		<View style={styles.Item}>
	// 			<View style={styles.Row}>
	// 				<View style={styles.img} >
	// 					{item.type ?
	// 						<Image source={require('./fan-icon.png')}
	// 							style={{
	// 								width: 50, height: 50,
	// 							}}
	// 						/>
	// 						:
	// 						<Image source={require('./aircon-icon.png')}
	// 							style={{
	// 								width: 50, height: 50,
	// 							}}
	// 						/>
	// 					}

	// 				</View>
	// 				<View style={styles.text}>
	// 					<Text>{item.ID}</Text>
	// 					{item.type ? <Text>Type: Fan</Text> : <Text>Type: Air Conditioner</Text>}
	// 				</View>

	// 				<Switch
	// 					onValueChange={(value) => this.toggleSwitch(item.number, value)}
	// 					value={item.state}
	// 					disabled={this.state.autoMode}
	// 				/>

	// 			</View >
	// 			<Slider
	// 				minimumValue={0}
	// 				maximumValue={5000}
	// 				value={parseInt(this.state.dataSource[item.number].level)}
	// 				minimumTrackTintColor="#009387"
	// 				maximumTrackTintColor="#000000"
	// 				onValueChange={(value) => this.handleSlider(item.number, value)}
	// 				disabled={this.state.autoMode}
	// 			/>

	// 			<View style={styles.Row}>
	// 				<Text style={{ marginLeft: 10 }} > Level </Text>
	// 				<Text>{Number((parseInt(this.state.dataSource[item.number].level) / 500).toFixed(0))}</Text>
	// 			</View>
	// 		</View>

	// 	);
	// };

	renderItem = ({ item }) => {
		// spinning
		const spin = this.animated.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg']  // rotate từ 0 đến 360 độ dựa vào input range
		})
		//style swipe button
		var swipeoutBtns = [
			{
				backgroundColor: '#d7f7e6',
				text: 'Delete',
				onPress: () => {
					// delete device code
					// console.log(this.state.dataSearch);
					var deviceID = this.state.activeRowKey.key;
					firebase.database().ref("room/" + this.state.currentroom + "/devices/" + deviceID).remove();
					// deleteDevice(this.state.activeRowKey.key);
					this.state.dataSearch = this.state.dataSearch.filter((item) => { return item.key != deviceID })
					// console.log(this.state.dataSearch);
					// console.log(this.state.activeRowKey.key);
				},
				component: (
					<View
						style={{
							backgroundColor: '#009387',
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column',
							borderBottomRightRadius: 10,
							borderTopRightRadius: 10,
							elevation: 5,
						}}
					>
						<Image source={require('./trash.png')} style={{ width: 50, height: 50 }} />
					</View>
				)
			}
		]
		return (
			<View style={styles.Item}>
				<Swipeout
					right={swipeoutBtns}
					close={this.state.activeRowKey !== item}
					backgroundColor='#d7f7e6'
					onOpen={(secId, rowId, direction) => {
						this.setState({ activeRowKey: item });
					}}
				>
					<View style={styles.Row}>
						<View style={styles.img} >
							{item.type ?
								item.state ? <Animated.Image
									style={{ width: 50, height: 50, transform: [{ rotate: spin }] }}
									source={require('./fan-icon.png')} /> : <Image source={require('./fan-icon.png')} style={{ width: 50, height: 50 }} />
								:
								item.state ?
									<View style={{ width: 50, height: 50 }}>
										<Image source={require('./con-icon.png')} style={{ width: 50, height: 32.6 }} />
										<Animated.Image

											style={{ width: 50, height: 17.4, opacity: this.opacityanimate }} // gán giá trị vào đây
											source={require('./air-icon.png')} />
									</View> :
									<View style={{ width: 50, height: 50 }}>
										<Image source={require('./con-icon.png')} style={{ width: 50, height: 32.6 }} />
										<Image source={require('./air-icon.png')} style={{ width: 50, height: 17.4 }} />
									</View>

							}


						</View>
						<View style={styles.text}>
							<Text>{item.ID}</Text>
							{item.type ? <Text>Type: Fan</Text> : <Text>Type: Air Conditioner</Text>}
						</View>

						<Switch
							onValueChange={(value) => this.toggleSwitch(item.number, value)}
							value={item.state}
							disabled={this.state.autoMode}
						/>


					</View >
					<Slider
						minimumValue={0}
						maximumValue={5000}
						value={parseInt(this.state.dataSource[item.number].level)}
						minimumTrackTintColor="#009387"
						maximumTrackTintColor="#000000"
						onValueChange={(value) => this.handleSlider(item.number, value)}
						disabled={this.state.autoMode}
					/>

					<View style={styles.Row}>
						<Text style={{ marginLeft: 10 }} > Level </Text>
						<Text>{Number((parseInt(this.state.dataSource[item.number].level) / 500).toFixed(0))}</Text>
					</View></Swipeout>

			</View>
		);
	};

	componentDidMount() {
		console.log("tessssss");
		//start animation function
		this.opacity();
		this.spin();
		var data = this.props.navigation.getParam('data');
		this.setState({
			currentroom: data.name,
			temp: data.tem,
			humid: data.hum
		})
		var items = [];

		firebase.database().ref('room/' + data.name).on('value', (dataSnapshot) => {
			// console.log(dataSnapshot.val().automode)
			this.setState({
				autoMode: dataSnapshot.val().automode
			})
		})

		firebase.database().ref('room/' + data.name + '/devices').on('child_added', (dataSnapshot) => {
			var status;
			if (dataSnapshot.val().values[0] == '0') {
				status = false;
			}
			else { status = true; }
			items.push({
				ID: dataSnapshot.val().device_id,
				key: dataSnapshot.key,
				type: dataSnapshot.val().type,
				state: status,
				level: dataSnapshot.val().values[1],
				number: items.length,
				room: data.name
			});

			this.setState({
				dataSource: items,
				dataSearch: items,
				currentroom: data.name,
				temp: data.tem,
				humid: data.hum
			});

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
									placeholder="Search device..."
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
						<View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#c0edd5', height: 50 }}>
							<View style={{ width: 50, height: 50, backgroundColor: '#c0edd5', justifyContent: 'center' }} >
								<Image source={require('./temper-icon.png')}
									style={{
										width: 40, height: 40,
									}}
								/>
							</View>
							<View style={{ width: 50, height: 50, backgroundColor: '#c0edd5', justifyContent: 'center' }}>
								<Text>{this.state.temp}°C</Text>
							</View>


							<View style={{ width: 50, height: 50, backgroundColor: '#c0edd5', justifyContent: 'center' }} >
								<Image source={require('./humid-icon.png')}
									style={{
										width: 40, height: 40,
									}}
								/>
							</View>
							<View style={{ width: 50, height: 50, backgroundColor: '#c0edd5', justifyContent: 'center' }}>
								<Text>{this.state.humid}%</Text>
							</View>

							<View style={{ width: 70, height: 50, backgroundColor: '#c0edd5', justifyContent: 'center' }}>
								<Text>Auto Mode</Text>
							</View>
							<View style={{ width: 50, height: 50, backgroundColor: '#c0edd5', justifyContent: 'center' }}>
								<Switch
									onValueChange={(value) => this.toggleSwitchMode(value)}
									value={this.state.autoMode}
								/>
							</View>
							<View style={{ width: 70, height: 50, backgroundColor: '#c0edd5', justifyContent: 'center' }}>
								<Text>i</Text>
							</View>
						</View>
					</View>

					{this.state.addstate &&
						<View style={{ padding: 10, backgroundColor: '#d7f7e6', elevation: 3, borderRadius: 10, margin: 10 }}>
							<Text>Device Name </Text>
							<TextInput
								placeholder="Device name.."
								onChangeText={this.handleDevice}
								style={{ backgroundColor: 'white', padding: 5, marginTop: 5, borderRadius: 5 }}
							/>
							<View style={{ padding: 10 }}>
								<RadioForm
									radio_props={this.state.radio_props}
									initial={1}
									onPress={(value) => {
										this.setState({ radiovalue: value });
										console.log(this.state.radiovalue)
									}}
									buttonColor={'#009387'}
									buttonSize={20}
								/>
							</View>
							<TouchableOpacity activeOpacity={.5} onPress={this.handleAddEvent}>
								<View style={{ borderRadius: 10, borderColor: '#009387', borderWidth: 1, margin: 10, alignItems: 'center' }}>
									<Text style={{ alignItems: 'center', padding: 5 }}> Add new Device </Text>
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

				<View style={styles.footer}>
					<Button
						title="Apply"
						color="#009387"
						onPress={() => { this.Updatedevice() }}
					/>
				</View>
			</View>
			//item view
		)
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
		height: 130
	},
	sensor: {
		flex: 1,
	},
	Item: {
		marginTop: 10,
		height: 110,
		borderRadius: 10,
		width: Dimensions.get('window').width,
		backgroundColor: '#d7f7e6',
		elevation: 2,
	},
	Row: {
		flexDirection: 'row',
	},
	img: {
		width: 70, height: 70, justifyContent: 'center',
		marginLeft: 10,
	},
	text: {
		justifyContent: 'center',
	},
	toggleItem: {
		width: 150,
		justifyContent: 'center',
	},
	main: {
		flex: 1,
		height: Dimensions.get('window').height,
		backgroundColor: '#edfff6',
	},
	footer: {
		position: 'absolute',
		bottom: -10,
		width: Dimensions.get('window').width,
	},
})