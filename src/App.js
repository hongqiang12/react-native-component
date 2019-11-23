import React, { Component } from 'react';

import {
  View, StyleSheet, Text, Image, TouchableOpacity
} from 'react-native';

import SignatureView from './SignatureView';
//import Geolocation From 'Geolocation';

const flexCenter = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

class ExampleApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  render() {
    const {data} = this.state;
    return (
      <View style={flexCenter}>
          <TouchableOpacity onPress={this.getLocation} style={{height: 40}}>
            <View style={[flexCenter, {padding: 40}]}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  获取位置
                </Text>
            </View>
          </TouchableOpacity>
        <TouchableOpacity onPress={this._showSignatureView.bind(this)}>
          <View style={[flexCenter, {padding: 10}]}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {data ? 'This is a your signature.' : 'Click here.'}
            </Text>
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
          </View>
        </TouchableOpacity>
        <SignatureView
          ref={r => this._signatureView = r}
          rotateClockwise={!!true}
          onSave={this._onSave.bind(this)}
        />
      </View>
    );
  }
 //获取位置
 getLocation = () => {
 alert(navigator)
//    Geolocation.getCurrentPosition(
//        location => {
//            var result = "速度：" + location.coords.speed +
//                        "\n经度：" + location.coords.longitude +
//                        "\n纬度：" + location.coords.latitude +
//                        "\n准确度：" + location.coords.accuracy +
//                        "\n行进方向：" + location.coords.heading +
//                        "\n海拔：" + location.coords.altitude +
//                        "\n海拔准确度：" + location.coords.altitudeAccuracy +
//                        "\n时间戳：" + location.timestamp;
//            alert(result);
//        },
//        error => {
//          alert("获取位置失败："+ error)
//        }
//    );
 }

  _showSignatureView() {
    this._signatureView.show(true);
  }

  _onSave(result) {
    const base64String = `data:image/png;base64,${result.encoded}`;
    this.setState({data: base64String});

    this._signatureView.show(false);
  }
}

export default ExampleApp;