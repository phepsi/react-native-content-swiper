# react-native-content-swiper

React Native Content Swiper is simple "plain JS" image viewer component for your
RN/Expo app that includes multiple pre-defined animations, but you can easily make
your own.

## Installation

```sh
yarn add react-native-content-swiper
```

Or

```sh
npm install react-native-content-swiper
```

## Usage

```
<ContentSwiper>
  <Image source={yourImage1} />
  <Image source={yourImage2} />
  <Image source={yourImage3} />
</ContentSwiper>
```

You can use it with normal images, but since we support orientation changes,
you can use AutoResizeImage instead to support correct scaling in portrait-mode.

```
<ContentSwiper>
  <AutoResizeImage source={yourImage1} />
  <AutoResizeImage source={yourImage2} />
  <AutoResizeImage source={yourImage3} />
</ContentSwiper>
```

You can choose animation style from few predefined animations,
but since they are simple interpolators you can easily do your own too.

```
<ContentSwiper animator={Animators.Stack}>
  <AutoResizeImage source={yourImage1} />
  <AutoResizeImage source={yourImage2} />
  <AutoResizeImage source={yourImage3} />
</ContentSwiper>
```


## License

The MIT License.

See [LICENSE](LICENSE)

## For Developers

Any contribution and PR's are welcome. Let's keep it simple, but make it even better!
