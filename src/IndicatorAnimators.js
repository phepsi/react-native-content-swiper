
export const Scale = (index) => ({
  transform: [
    {
      scale: index.interpolate({
        inputRange: [-100, -1, 0, 1, 100],
        outputRange: [1, 1, 1.5, 1, 1]
      })
    }
  ],
  opacity: index.interpolate({
    inputRange: [-100, -1, 0, 1, 100],
    outputRange: [0.3, 0.3, 1, 0.3, 0.3]
  })
});
