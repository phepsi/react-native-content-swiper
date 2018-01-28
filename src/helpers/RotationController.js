import {Animated} from 'react-native';

const DefaultTimingOpts = {
  toValue: 0,
  duration: 200,
  isInteraction: false,
  useNativeDriver: true,
}

const deg2rad = (deg) => deg / 180 * Math.PI;
const ssin = (deg) => Math.abs(Math.sin(deg2rad(deg)));
const scos = (deg) => Math.abs(Math.cos(deg2rad(deg)));

export class RotationController {

  constructor(initialRotation) {
    this._currentRotation = initialRotation;
    this._rotationValue = new Animated.Value(initialRotation);
    this._sinv = new Animated.Value(ssin(initialRotation));
    this._cosv = new Animated.Value(scos(initialRotation));
  }

  setRotation(rotation) {
    if (this._currentRotation === rotation) {
      return;
    }

    this._currentRotation = rotation;
    this._sinv.setValue(ssin(rotation));
    this._cosv.setValue(scos(rotation));

    const rotationTimingOpts = {
      ...DefaultTimingOpts,
      toValue: rotation,
    };

    Animated.timing(this._rotationValue, rotationTimingOpts).start();
  }

  getScale(aspectRatio) {
    return Animated.add(this._cosv, Animated.multiply(this._sinv, aspectRatio));
  }

  getRotationValue() {
    return this._rotationValue.interpolate({
      inputRange: [-360, 0, 360],
      outputRange: ['-360deg', '0deg', '360deg']
    });
  }
  getInverseRotationValue() {
    return this._rotationValue.interpolate({
      inputRange: [-360, 0, 360],
      outputRange: ['360deg', '0deg', '-360deg'] // Rotate to opposite direction
    });
  }
}
