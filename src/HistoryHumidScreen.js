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
} from 'react-native';
import {
  LineChart
} from "react-native-chart-kit";
import firebaseApp from '../Components/FirebaseConfig';
const firebase = require('firebase');
import Icon from 'react-native-vector-icons/Ionicons';

export default class HistoryHumidScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [90, 90, 90, 90, 90, 90, 90],
      dataSourcelabel: [],
      notice: "",
    }
  }
  timeMinuteConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp);

    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();

    var time = hour + ':' + min + "";
    return time;
  }
  timeMonthConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + '/' + month;
    return time;
  }

  componentDidMount() {

    var items = [];
    var items1 = [];
    var Temp = 0, Humid = 0;
    var i = 0;
    firebase.database().ref('sensorHistory').orderByChild('date').limitToLast(7).on('child_added', (dataSnapshot) => {
      var today = new Date().getTime();
      items.push(dataSnapshot.val().humid)
      console.log("test: = " + i + ": " + items[i])
      i++;
      if (items.length > 7) { items = items.slice(items.length - 7), items.length - 1 }
      this.setState({
        dataSource: items,
      })
      var dateupdate = dataSnapshot.val().date;

      var delta = today - dateupdate;
      var minutes = Math.floor((dateupdate / (1000 * 60)) % 60);
      var hours = Math.floor((dateupdate / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;

      if (delta < 60 * 60 * 1000) {
        items1.push(Math.floor(delta / (60 * 1000)) + ' min')
      }
      else if (delta < 24 * 60 * 60 * 1000) {
        items1.push(this.timeMinuteConverter(dateupdate));
      }
      else {
        items1.push(this.timeMonthConverter(dateupdate));
      }
      if (items1.length > 7) { items1 = items1.slice(items.length - 7), items1.length - 1 }
      this.setState({
        dataSourcelabel: items1,
      })
      var notice;
      var lasthum = items[items.length - 1];
      if (lasthum <= 30) notice = "cảnh báo độ ẩm cực kỳ thấp, nguy cơ cháy nổ cao"
      else if (lasthum <= 50) notice = "độ ẩm thấp, đề phòng thiếu nước, nứt nẻ chân tay, môi ,…"
      else if (lasthum <= 60) notice = "độ ẩm mức giao thoa, vẫn đạt ngưỡng cho phép."
      else if (lasthum <= 80) notice = "độ ẩm phù hợp với môi trường, khí hậu con người."
      else if (lasthum <= 90) notice = "khí hậu thay đổi, đề phòng nguy cơ cảm cúm, ốm, sốt"
      else notice = "độ ẩm cao,  đề phòng nguy cơ cảm cúm, ốm, sốt, chú ý bảo trì các vật dụng đề phòng nấm mốc, hỏng hóc"
      this.setState({
        notice: notice,
      })
    }
    );
  }

  render() {
    return (
      /*<View style = {{flex:1,alignItems:'center', justifyContent: 'center'}}>
      <Text>HomeScreen</Text>
      <Button title =" go to detail screen"
      onPress = {()=>navigation.navigate("detail")}
      />
      </View> */
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.main}>
          <View style={styles.timeshow}>
          </View>
          <LineChart
            data={{
              labels: this.state.dataSourcelabel,
              datasets: [
                {
                  data: this.state.dataSource,
                }
              ]
            }}
            width={Dimensions.get("window").width - 20} // from react-native
            height={220}
            yAxisSuffix="%"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#cfffe8',
              backgroundGradientFrom: '#cfffe8',
              backgroundGradientTo: '#cfffe8',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(12, 148, 112, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(12, 148, 112, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 16
            }}
          />


          <View style={styles.Statistic}>
            <Text style={styles.StatisticText}>
              {this.state.notice}
            </Text>


          </View>
        </View>

      </View>
      //item view

    );
  }
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
  Chart: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    height: 300,
    borderRadius: 5,
    backgroundColor: '#009387',
    elevation: 4,
  },
  Statistic: {
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
    color: 'white'
  },
  overview: {
    position: 'absolute',
    top: 50,
    right: Dimensions.get('window').width / 2 - 40,
  },
  StatisticText: {
    color: 'black',
    margin: 10,
    fontSize: 15,
  },
})