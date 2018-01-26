import {Animated, PanResponder} from 'react-native';
import {limitIndex} from './utils';

const DefaultSpringOpts = {
  toValue: 0,
  friction: 120,
  isInteraction: false,
  useNativeDriver: true,
}


export class PanController {

  constructor(initialIndex, itemCount, clickThreshold) {

    this._currentIndex = initialIndex;
    this._itemCount = itemCount;
    this._scrollValue = new Animated.Value(0);
    this._indexScrollValue = new Animated.Value(0);

    this.setIndexImmediate(initialIndex);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onResponderTerminationRequest: () => true,
      onResponderGrant: () => true,
      onMoveShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        const { dx, dy } = gestureState;

        return Math.abs(dx) > clickThreshold || Math.abs(dy) > clickThreshold;
      },
      onPanResponderMove: Animated.event([
        null, {
          dx: this._scrollValue,
          useNativeDriver: true
      }]),
      onPanResponderRelease: (evt, gestureState) => {
        const {dx, vx} = gestureState;

        const isSwipe = Math.abs(dx) > clickThreshold;
        const indexChange = isSwipe ? (dx < 0 ? 1 : -1) : 0;

        this.setIndex(this._currentIndex + indexChange, vx);
      },
    });
  }

  setIndex(index, velocity = 0) {
    this._currentIndex = limitIndex(index, 0, this._itemCount);

    const indexScrollSpringOpts = {
      ...DefaultSpringOpts,
      toValue: -this._currentIndex,
      velocity: velocity,
    }

    const scrollSpringOpts = {
      ...DefaultSpringOpts,
      toValue: 0,
    };

    Animated.parallel([
      Animated.spring(this._indexScrollValue, indexScrollSpringOpts),
      Animated.spring(this._scrollValue, scrollSpringOpts),
    ]).start();
  }

  setIndexImmediate(index) {
    this._currentIndex = limitIndex(index, 0, this._itemCount);

    this._indexScrollValue.setValue(-this._currentIndex);
    this._scrollValue.setValue(0);
  }

  getPanHandlers() {
    return this._panResponder.panHandlers;
  }

  getAnimatedIndex(layoutWidth) {
    const normalizedScrollValue = Animated.divide(this._scrollValue, layoutWidth);

    return Animated.add(normalizedScrollValue, this._indexScrollValue);
  }
}
