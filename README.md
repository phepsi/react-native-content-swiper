# react-native-content-swiper

React Native Content Swiper is simple "plain JS" image viewer component for your
RN/Expo app that includes multiple pre-defined animations, but you can easily make
your own.

Component supports orientation that you can limit to happen in fullscreen-mode
only, so even if your application is locked to portrait-mode, you can enable
image rotations in fullscreen.

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
you can use AutoResizeImage instead to support correct scaling in landscape-mode.

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

## Included Animation Styles

![Slide](https://www.polarspin.com/static/img/rn-swiper-style-1.gif)
![SlideZoom](https://www.polarspin.com/static/img/rn-swiper-style-2.gif)
![RotateY](https://www.polarspin.com/static/img/rn-swiper-style-3.gif)
![Stack](https://www.polarspin.com/static/img/rn-swiper-style-4.gif)

## License

The MIT License.

See [LICENSE](LICENSE)

## For Developers

Any contribution and PR's are welcome. Let's keep it simple, but make it even better!
