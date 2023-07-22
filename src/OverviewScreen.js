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
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const firebase = require('firebase');

export default class OverviewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            temp: 30,
            humid: 60,
            date: null,
            currentDate: null,
            notice: null,
            notice1: null
        }
    }
    getDateUpdate = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
        var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
        var time = " " + date + " " + month + " " + year;
        return time;
    }
    getTimeUpdate = (UNIX_timestamp) => {
        var hour = Math.floor((UNIX_timestamp / (1000 * 60 * 60)));
        var min = Math.floor((UNIX_timestamp - hour * 60 * 60 * 1000) / (1000 * 60));
        if (hour == 0) {
            var time = min + " phút trước ";
        }
        else {
            var time = hour + " giờ " + min + " phút trước ";
        }
        return time;
    }

    componentDidMount() {
        AsyncStorage.getItem('email').then(value =>
            //AsyncStorage returns a promise so adding a callback to get the value
            console.log("overview screen" + value)
            //Setting the value in Text
        );
    }
    componentDidMount() {
        var currentDate = new Date().getTime();
        var current = new Date().getHours();

        console.log("ngay: " + current);
        firebase.database().ref('sensorHistory').orderByChild('date').limitToLast(1).on('child_added', (dataSnapshot) => {
            var temper = dataSnapshot.val().temp;
            var humid = dataSnapshot.val().humid;
            var date = dataSnapshot.val().date;
            var notice, notice1;
            if (temper <= 20) notice = "Thời tiết lạnh."
            else if (temper <= 25) notice = "Khí hậu mát mẻ."
            else if (temper <= 30) notice = "Nhiệt độ bình thường."
            else if (temper <= 33) notice = "Thời tiết oi bức, nên bật điều hòa và quạt."
            else notice = "Cảnh báo nguy cơ cháy nổ, thiếu nước."

            if (humid <= 30) notice1 = "Cảnh báo độ ẩm cực kì thấp."
            else if (humid <= 50) notice1 = "Độ ẩm thấp."
            else if (humid <= 60) notice1 = "Độ ẩm giao thoa."
            else if (humid <= 80) notice1 = "Độ ẩm phù hợp với môi trường, khí hậu con người."
            else if (humid <= 90) notice1 = "Khí hậu thay đổi, đề phòng cảm cúm, ốm. "
            else notice1 = "Độ ẩm cao."
            this.setState({
                notice: notice,
                notice1: notice1,

            })

            if ((currentDate - date) < 60 * 60 * 24 * 1000) {
                var time = this.getTimeUpdate(currentDate - date)
            }
            else {
                var time = this.getDateUpdate(date)
            }
            this.setState({
                temp: temper,
                humid: humid,
                date: time
            });
        });


    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={styles.main}>
                    <View style={styles.section}>
                        <Image source={require('./wallpaper.png')}
                            style={{
                                flex: 1,
                                // remove width and height to override fixed static size
                                width: null,
                                height: null,
                            }}
                        />
                        <View style={styles.overview}>

                            <View style={{ justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width }}>
                                <Text style={styles.textoverview}>{this.state.notice} </Text>
                                <Text style={styles.textoverview}>{this.state.notice1} </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.Item}>
                        <View style={{ width: 200 }}>
                            <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10, height: 50 }}>


                                <View>
                                    <Text>Nhiệt độ </Text>
                                    <Text style={{ fontSize: 30 }}>{this.state.temp} oC </Text>
                                </View>
                                <View style={{ width: 10, height: 10 }}>
                                    <Image source={require('./temper-icon.png')}
                                        style={{ width: 50, height: 50, }}
                                    />
                                </View>

                            </View>

                            <Text style={{ position: 'absolute', bottom: 10, left: 10 }}>Cập nhật lúc:
                {" " + this.state.date} </Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 200 }}>
                            <Button
                                title="Chi tiết"
                                color="#009387"
                                onPress={() => this.props.navigation.navigate('History')}
                            />
                        </View>
                    </View>


                    <View style={styles.Item}>
                        <View style={{ width: 200 }}>
                            <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10, height: 50 }}>
                                <View>
                                    <Text>Độ ẩm  </Text>
                                    <Text style={{ fontSize: 30 }}> {this.state.humid}% </Text>
                                </View>
                                <View style={{ width: 10, height: 10 }}>
                                    <Image source={require('./humid-icon.png')}
                                        style={{
                                            width: 50, height: 50,
                                        }}
                                    />
                                </View>
                            </View>
                            <Text style={{ position: 'absolute', bottom: 10, left: 10 }}>Cập nhật lúc:
            {" " + this.state.date} </Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 200 }}>
                            <Button
                                title="Chi tiết"
                                color="#009387"
                                onPress={() => this.props.navigation.navigate('HistoryHumid')}
                            />
                        </View>
                    </View>


                </View>

            </View>
            //item view
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
        height: 150,
    },
    sensor: {
        flex: 1,
    },
    Item: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        height: 120,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#cfffe8',
        elevation: 4,
    },
    img: {
        width: 70, height: 70, justifyContent: 'center',
        marginLeft: 10,
    },
    text: {
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
        backgroundColor: '#6d9e86',
    },
    footer: {
        position: 'absolute',
        bottom: -10,
        width: Dimensions.get('window').width,
    },

    textoverview: {
        color: 'white',
    },
    overview: {
        position: 'absolute',
        top: 50,

    },
})