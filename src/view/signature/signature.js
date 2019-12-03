import React, {Component} from 'react';

import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import SignatureView from './SignatureView';

export default class Signature extends Component {
  static navigationOptions = {
    title: '手写板功能',
  };
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  render() {
    const {data} = this.state;
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={this._showSignatureView.bind(this)}
          style={styles.touchStyle}>
          <Text style={styles.textStyle}>{data ? '修改签名' : '开始签名'}</Text>
        </TouchableOpacity>
        {data && (
          <View style={{backgroundColor: 'white'}}>
            <Image
              resizeMode={'contain'}
              style={{width: 300, height: 300}}
              source={{uri: data}}
            />
          </View>
        )}
        <SignatureView
          ref={r => (this._signatureView = r)}
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
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  touchStyle: {
    padding: 10,
    backgroundColor: '#009CF2',
    borderRadius: 6,
    marginTop: 40,
    marginBottom: 40,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
