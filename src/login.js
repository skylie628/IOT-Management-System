/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';
const firebase = require('firebase');
import firebaseApp from '../Components/FirebaseConfig';
import auth from '@react-native-firebase/auth';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import Feather from "react-native-vector-icons/Feather";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const HeartIcon = (props) => (
  <Icon {...props} name='heart' />
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [
        {
          thumbnail: ''
        },
        {
          thumbnail: ''
        }
      ],
      name: '',
      email: '',
      password: '',
      errorMessage: null,
      infoaccount: [],
    }
  }
  handelSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        /*Alert.alert(
            'thanh cong',
             'asdj',
            [
                {text: 'Cancel', onPress: () =>console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () =>console.log('OK Pressed')},
            ],
           {cancelable: false}
        )*/
        var info = [];
        firebase.database().ref('Admin').orderByChild("email").equalTo(this.state.email).on("child_added", function (snapshot) {
          info.push({
            key: snapshot.key,
            email: snapshot.val().email,
            role: snapshot.val().role,
          });
        });
        console.log(info[0]);
        this.setState({
          infoaccount: info[0].role
        });
        console.log("infoaccount" + info[0].role);
        if (info[0].role == 0) {
          AsyncStorage.setItem('role', '0');
          AsyncStorage.setItem('email', info[0].email);
          this.props.navigation.navigate('DrawerUser', { data: this.state.email })
        }
        else if (info[0].role == 1) {
          AsyncStorage.setItem('role', '1');
          AsyncStorage.setItem('email', info[0].email);

          this.props.navigation.navigate('DrawerAdmin', { data: this.state.email })
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Image
            source={require("./loginlogo.png")}
            style={styles.image}
            resizeMode="stretch"
          />
          <Text style={[styles.text, {
            fontSize: 20,
            marginTop: 5
          }]}> IOT SYSTEM</Text>

          <Text style={[styles.text, {
            fontSize: 12,
            marginTop: 5
          }]}> Manage entire school with just a tap</Text>

        </View>
        <View style={styles.footer}>
          <View style={styles.container}>
            <Text style={[styles.text, {
              fontSize: 20,
              marginTop: 5
            }]}> Đăng nhập </Text>
          </View>
          <View style={styles.absolute}>
            <View style={styles.box}>
              <Text style={styles.title}>Register</Text>
              <View style={styles.action}>
                <TextInput
                  placeholder="Email..."
                  style={styles.textInput}
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  secureTextEntry
                  placeholder="Password..."
                  style={styles.textInput}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />
              </View>

              <TouchableOpacity onPress={() => { this.handelSignIn() }} style={styles.button_container}>
                <View style={styles.button}>
                  <Feather
                    name="arrow-right"
                    color="white"
                    size={25} />
                </View>
              </TouchableOpacity >


              <TouchableOpacity onPress={() => this.props.navigation.navigate('Register', { data: this.state.email })}>
                <View style={styles.button}>
                  <Text> Chưa có tài khoản? Đăng ký </Text>
                </View>
              </TouchableOpacity >


            </View>
          </View>
        </View>
      </View>
    )
  }
}

const screenWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: screenWidth / 2,
    height: screenWidth / 2,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: "#009387",
    fontSize: 30,
    fontWeight: 'bold'
  },
  action: {
    marginTop: 10
  },
  textInput: {
    color: 'gray',
    backgroundColor: '#f2f2f2',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5

  },
  button_container: {
    alignItems: 'flex-end',
  },

  button: {
    width: 100,
    backgroundColor: '#009387',
    marginTop: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  }
});

