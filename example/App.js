import React from 'react';
import { ScreenOrientation, DangerZone } from 'expo';
import { StyleSheet, View, Text, Button } from 'react-native';
import { ContentSwiper, Animators, AutoResizeImage } from 'react-native-imagenary';

const imageSource1 = { uri: 'http://wp.patheos.com.s3.amazonaws.com/blogs/faithwalkers/files/2013/03/bigstock-Test-word-on-white-keyboard-27134336.jpg' };
import imageSource2 from './assets/sample-2.jpg';
import imageSource3 from './assets/sample-3.png';

// Allow only portrait orientation
ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);

const appBackground = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appBackground,
  },
  image: {
    flex: 1,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  info: {
    flex: 1,
  }
});

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      animator: Animators.Slide,
      orientation: 0,
    };
  }

  componentWillMount() {
    DangerZone.DeviceMotion.setUpdateInterval(500);
    DangerZone.DeviceMotion.addListener(this.onDeviceMotionEvent);
  }

  componentWillUnmount() {
    DangerZone.DeviceMotion.removeAllListeners();
  }

  onDeviceMotionEvent = (e) => {
    const {orientation} = e;

    this.setState({
      orientation
    });
  }

  render() {
    const {animator, orientation} = this.state;

    return (
      <View style={styles.container}>
        <ContentSwiper animator={animator} orientation={orientation}>
          <AutoResizeImage style={styles.image} source={imageSource1} resizeMode="contain" />
          <AutoResizeImage style={styles.image} source={imageSource2} resizeMode="contain" />
          <AutoResizeImage style={styles.image} source={imageSource3} resizeMode="contain" />
        </ContentSwiper>
        <View style={styles.info}>
          <Button title='Slide' onPress={() => this.setState({ animator: Animators.Slide })} />
          <Button title='SlideZoom' onPress={() => this.setState({ animator: Animators.SlideZoom })} />
          <Button title='RotateY' onPress={() => this.setState({ animator: Animators.RotateY })} />
          <Button title='Stack' onPress={() => this.setState({ animator: Animators.Stack })} />
        </View>
      </View>
    );
  }
}
