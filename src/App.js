import React, { Component } from 'react';

import {
  View, StyleSheet, Text, Image, TouchableOpacity, PermissionsAndroid, Platform,Button
} from 'react-native';

import SignatureView from './SignatureView';

import JPush from 'jpush-react-native';

import {
init,
Geolocation,
 } from "react-native-amap-geolocation";

const flexCenter = {
  flex: 1,
  justifyContent: 'center',
//  alignItems: 'center',
};

class ExampleApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      location: null
    };
  }

componentDidMount() {
    this.geolocationInit()
    this._onJPush()
}

  componentWillUnmount() {
//    Geolocation.stop();
  }


  render() {
    const {data} = this.state;
    return (
      <View style={flexCenter}>
        <Button title="setLoggerEnable"
            onPress={() => JPush.setLoggerEnable({"debug": true}
            )}/>

        <Button title="getRegisterID"
                onPress={() => JPush.getRegistrationID(result =>
                    console.log("registerID:" + JSON.stringify(result))
                )}/>


        <TouchableOpacity onPress={this.getLocation} style={{height: 40,backgroundColor:'blue'}}>
            <View style={[flexCenter, {padding: 10}]}>
                <Text style={{fontSize: 18, fontWeight: 'bold',textAlign: 'center'}}>
                  获取位置
                </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._showSignatureView.bind(this)} style={{height:50}}>
          <View style={[flexCenter, {padding: 10,backgroundColor:'red'}]}>
            <Text style={{fontSize: 18, fontWeight: 'bold',textAlign: 'center'}}>
              {data ? 'This is a your signature.' : 'Click here.'}
            </Text>


          </View>
        </TouchableOpacity>
        <View style={{paddingBottom: 10}} />
            {data &&
              <View style={{backgroundColor: 'white'}}>
                <Image
                  resizeMode={'contain'}
                  style={{width: 300, height: 300}}
                  source={{uri: data}}
                />
              </View>
              }
        <SignatureView
          ref={r => this._signatureView = r}
          rotateClockwise={!!true}
          onSave={this._onSave.bind(this)}
        />
      </View>
    );
  }

    _showSignatureView() {
      this._signatureView.show(true);
    }

    _onSave(result) {
      const base64String = `data:image/png;base64,${result.encoded}`;
      this.setState({data: base64String});

      this._signatureView.show(false);
    }

//  初始化位置信息
geolocationInit = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    }
    await init({
      android: "c6eaf9c6fc47bb2286d8dd46c8efd366"
    });
}

 //获取位置
 getLocation = () => {
    Geolocation.getCurrentPosition(({ coords }) => {
      alert(JSON.stringify(coords));
    });

 }

// 推送消息链接
_onJPush() {
    JPush.init();
    //连接状态
    this.connectListener = result => {
      console.log("connectListener:" + JSON.stringify(result))
    };
    JPush.addConnectEventListener(this.connectListener);
    //通知回调
    this.notificationListener = result => {
      console.log("notificationListener:" + JSON.stringify(result))
    };
    JPush.addNotificationListener(this.notificationListener);
    //自定义消息回调
    this.customMessageListener = result => {
      console.log("customMessageListener:" + JSON.stringify(result))
    };
    JPush.addCustomMessagegListener(this.customMessageListener);
    //本地通知回调 todo
    this.localNotificationListener = result => {
      console.log("localNotificationListener:" + JSON.stringify(result))
    };
    JPush.addLocalNotificationListener(this.localNotificationListener);
    //tag alias事件回调
    this.tagAliasListener = result => {
      console.log("tagAliasListener:" + JSON.stringify(result))
    };
    JPush.addTagAliasListener(this.tagAliasListener);
    //手机号码事件回调
    this.mobileNumberListener = result => {
      console.log("mobileNumberListener:" + JSON.stringify(result))
    };
    JPush.addMobileNumberListener(this.mobileNumberListener);
}



}

export default ExampleApp;