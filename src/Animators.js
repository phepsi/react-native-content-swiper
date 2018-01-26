import {Animated} from 'react-native';

export const Slide = (index, layoutWidth) => ({
  transform: [
    {
      translateX: Animated.multiply(
        index.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-1, 0, 1]
        }),
        layoutWidth
      )
    }
  ]
});

export const SlideZoom = (index, layoutWidth) => ({
  transform: [
    {
      translateX: Animated.multiply(
        index.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-0.8, 0, 0.8]
        }),
        layoutWidth
      )
    },
    {
      scale: index.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0.5, 1, 0.5]
      })
    }
  ]
});

export const RotateY = (index, layoutWidth) => ({
  transform: [
    {
      translateX: Animated.multiply(
        index.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-1, 0, 1]
        }),
        layoutWidth
      )
    },
    { perspective: 500 },
    {
      rotateY: index.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['-90deg', '0deg', '90deg']
      })
    }
  ]
});

export const Stack = (index, layoutWidth) => ({
  transform: [
    {
      translateX: Animated.multiply(
        index.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-1, 0, 0]
        }),
        layoutWidth
      )
    },
    {
      scale: index.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [1, 1, 0.85]
      })
    },
  ],
  opacity: index.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [1, 1, 0],
  })
});
