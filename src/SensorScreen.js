import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	TextInput,
	FlatList,
	RefreshControl
} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter'
const firebase = require('firebase');
const KEYS_TO_FILTERS = ['Room', 'Temper', 'Humid', 'ID']

export default class SensorScreen extends React.Component {
	constructor(props) {
		super(props);
		this.itemRef = firebase.database();
		this.state = {
			dataSource: [],
			dataSearch: [],
			searchTerm: '',
			avgTemp: 0,
			avgHumid: 0,
		}
	}

	searchUpdated(term) {
		this.setState({ searchTerm: term + ' ' })
		console.log(term)

		const filteredDevice = this.state.dataSource.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
		console.log(filteredDevice)
		// console.log(filteredDevice)
		if (!term) this.state.dataSearch = this.state.dataSource; else this.state.dataSearch = filteredDevice;
	}
	renderItem = ({ item }) => {
		return (
			<View style={styles.Item}>
				<View style={styles.img} >
					<Image source={require('./temper-icon.png')}
						style={{
							width: 50, height: 50,
						}}
					/>
				</View>

				<View style={styles.text}>
					<Text>Device ID: {item.ID}</Text>
					<Text>Room: {item.Room}</Text>
				</View>
				<View style={styles.text}>
					<Text>Humid: {item.Humid}</Text>
					<Text>Temperture: {item.Temper}</Text>
				</View>
				<View style={styles.text}>
					<Text>Date Updated: {item.Date}</Text>
				</View>
			</View>

		);
	};
	componentDidMount() {

		var items = [];
		var Temp = 0, Humid = 0;
		firebase.database().ref('room').on('child_added', (dataSnapshot) => {
			Temp += parseInt(dataSnapshot.val().sensor.values[0]);
			Humid += parseInt(dataSnapshot.val().sensor.values[1]);
			// console.log(dataSnapshot.val().sensor.device_id)
			items.push({
				ID: dataSnapshot.val().sensor.device_id,
				Temper: dataSnapshot.val().sensor.values[0],
				Humid: dataSnapshot.val().sensor.values[1],
				Room: dataSnapshot.key,
				Date: Date(dataSnapshot.val().sensor.date)
			});
			this.setState({
				dataSource: items,
				dataSearch: items,
				avgHumid: Humid / items.length,
				avgTemp: Temp / items.length,
			});
		});
	}


	render() {
	// 	var items = [];
	// 	var Temp = 0;
	// 	var Humid = 0;
	// 	firebase.database().ref('room').on('child_changed', (dataSnapshot) => {
	// 		Temp += parseInt(dataSnapshot.val().sensor.values[0]);
	// 		Humid += parseInt(dataSnapshot.val().sensor.values[1]);
	// 		// console.log(dataSnapshot.val().sensor.device_id)
	// 		items.push({
	// 			ID: dataSnapshot.val().sensor.device_id,
	// 			Temper: dataSnapshot.val().sensor.values[0],
	// 			Humid: dataSnapshot.val().sensor.values[1],
	// 			Room: dataSnapshot.key,
	// 			Date: Date(dataSnapshot.val().sensor.date)
	// 		});
	// 		this.setState({
	// 			dataSource: items,
	// 			dataSearch: items,
	// 			avgHumid: Humid / items.length,
	// 			avgTemp: Temp / items.length,
	// 		});
	// 	});
		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>
				<View style={styles.main}>
					<View style={styles.section}>
						<View style={styles.search} >
							<TextInput
								placeholder="Search sensor.."
								style={{ flex: 1, marginLeft: 50 }}
								onChangeText={(term) => { this.searchUpdated(term) }}
							/>
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
								<Text>{this.state.avgTemp} oC</Text>
							</View>

							<View style={{ position: 'absolute', right: 0, flexDirection: 'row' }}>
								<View style={{ width: 50, height: 50, backgroundColor: '#c0edd5', justifyContent: 'center' }} >
									<Image source={require('./humid-icon.png')}
										style={{
											width: 40, height: 40,
										}}
									/>
								</View>
								<View style={{ width: 50, height: 50, backgroundColor: '#c0edd5', justifyContent: 'center' }}>
									<Text>{this.state.avgHumid} %</Text>
								</View>
							</View>
						</View>
					</View>

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
		)
	};
};

var styles = StyleSheet.create({
	search: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 1,
		paddingHorizontal: 1,
		borderRadius: 100,
		backgroundColor: '#fefefe',
		marginTop: 10,
		marginBottom: 10,
	},
	section: {
		backgroundColor: '#c0edd5',
		height: 130
	},

	Item: {
		marginTop: 10,
		height: 70,
		flexDirection: 'row',
		borderRadius: 10,
		width: Dimensions.get('window').width,
		backgroundColor: '#d7f7e6',
		elevation: 2,
	},
	img: {
		width: 70, height: 70, justifyContent: 'center',
		marginLeft: 10,
	},
	text: {
		marginLeft: 30,
		justifyContent: 'center',
	},
	deletebtn: {
		position: 'absolute',
		right: 10,
		top: 15,
		width: 70,
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