import React, {Component} from 'react';

import {
  View,
  Text,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import SignatureCapture from 'react-native-signature-capture';

export default class SignatureView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  show(display) {
    this.setState({visible: display});
  }

  render() {
    const {visible} = this.state;

    return (
      <Modal
        transparent={false}
        visible={visible}
        onRequestClose={this._onRequreClose.bind(this)}>
        <View style={styles.modalViewStyle}>
          <View
            style={{ flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={this._onPressClose.bind(this)}
              style={{padding: 10}}>
              <Text>{' x '}</Text>
            </TouchableOpacity>

            <View style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{fontSize: 14}}>Please write your signature.</Text>
            </View>
          </View>
          <SignatureCapture
            style={{flex: 1, width: '100%'}}
            onDragEvent={this._onDragEvent.bind(this)}
            onSaveEvent={this._onSaveEvent.bind(this)}
          />
        </View>
      </Modal>
    );
  }

  _onPressClose() {
    this.show(false);
  }

  _onRequreClose() {
    this.show(false);
  }

  _onDragEvent() {
    // 当标记签名时触发
    console.log('dragged');
  }

  _onSaveEvent(result) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    this.props.onSave && this.props.onSave(result);
  }
}

const toolbarHeight = Platform.select({
  android: 0,
  ios: 22,
});
const styles = StyleSheet.create({
  modalViewStyle: {
    paddingTop: toolbarHeight,
    flex: 1,
  },
});
