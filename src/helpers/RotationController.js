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

  constructor(initialRotation, layoutWidth, layoutHeight) {
    this._currentRotation = initialRotation;
    this._rotationValue = new Animated.Value(initialRotation);
    this._sinv = new Animated.Value(ssin(initialRotation));
    this._cosv = new Animated.Value(scos(initialRotation));

    const aspectRatio = Animated.divide(layoutWidth, layoutHeight);
    const scale = Animated.add(
      this._cosv,
      Animated.multiply(this._sinv, aspectRatio)
    );

    this._rotationStyle = {
      transform: [
        {
          rotate: this._rotationValue.interpolate({
            inputRange: [-180, 0, 180],
            outputRange: ['-180deg', '0deg', '180deg']
          })
        },
        {
          scale: scale,
        }
      ]
    }
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

  getStyle() {
    return this._rotationStyle;
  }
}
