import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import {init, Geolocation} from 'react-native-amap-geolocation';

export default class Location extends Component {
  static navigationOptions = {
    title: '定位功能',
    gesturesEnabled: true,
    gestureDirection:'inverted',
    gestureResponseDistance:{               //定义手势响应距离屏幕边界的距离
      horizontal:10,
      vertical:5
    }
  };
  constructor(props) {
    super(props);

    this.state = {
      location: null,
    };
  }

  componentDidMount() {
    this.geolocationInit();
  }

  componentWillUnmount() {
    // Geolocation.stop();
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={this.getLocation} style={styles.touchStyle}>
          <Text style={styles.textStyle}>获取定位信息</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //  初始化位置信息
  geolocationInit = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
    }
    await init({
      android: 'c6eaf9c6fc47bb2286d8dd46c8efd366',
    });
  };

  //获取位置
  getLocation = () => {
    Geolocation.getCurrentPosition(({coords}) => {
      alert(JSON.stringify(coords));
    });
  };
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchStyle: {
    padding: 10,
    backgroundColor: '#009CF2',
    borderRadius: 6
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
