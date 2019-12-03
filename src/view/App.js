import React, {Component} from 'react';

import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import JPush from 'jpush-react-native';

export default class ExampleApp extends Component {
  static headerMode = 'none';
  componentDidMount() {
    this._onJPush();
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.touchStyle}
          onPress={() => this.props.navigation.navigate('Location')}>
          <Text style={styles.textStyle}>获取手机定位</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchStyle}
          onPress={() => this.props.navigation.navigate('Signature')}>
          <Text style={styles.textStyle}>手写板</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 推送消息链接
  _onJPush() {
    JPush.init();
    //连接状态
    this.connectListener = result => {
      console.log('connectListener:' + JSON.stringify(result));
    };
    JPush.addConnectEventListener(this.connectListener);
    //通知回调
    this.notificationListener = result => {
      console.log('notificationListener:' + JSON.stringify(result));
    };
    JPush.addNotificationListener(this.notificationListener);
    //自定义消息回调
    this.customMessageListener = result => {
      console.log('customMessageListener:' + JSON.stringify(result));
    };
    JPush.addCustomMessagegListener(this.customMessageListener);
    //本地通知回调 todo
    this.localNotificationListener = result => {
      console.log('localNotificationListener:' + JSON.stringify(result));
    };
    JPush.addLocalNotificationListener(this.localNotificationListener);
    //tag alias事件回调
    this.tagAliasListener = result => {
      console.log('tagAliasListener:' + JSON.stringify(result));
    };
    JPush.addTagAliasListener(this.tagAliasListener);
    //手机号码事件回调
    this.mobileNumberListener = result => {
      console.log('mobileNumberListener:' + JSON.stringify(result));
    };
    JPush.addMobileNumberListener(this.mobileNumberListener);
  }
}

const styles = StyleSheet.create({
  touchStyle: {
    padding: 10,
    backgroundColor: '#009CF2',
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
