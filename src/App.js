import React, { Component } from 'react';

import {
  View, StyleSheet, Text, Image, TouchableOpacity, PermissionsAndroid, Platform
} from 'react-native';

import SignatureView from './SignatureView';

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
}
  componentWillUnmount() {
//    Geolocation.stop();
  }


  render() {
    const {data} = this.state;
    return (
      <View style={flexCenter}>
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



}

export default ExampleApp;