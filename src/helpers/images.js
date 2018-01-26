import {Image} from 'react-native';

export const resolveDimensions = (source) => {
  if (!source) {
    return Promise.reject('Invalid source');
  }

  if (typeof(source) === 'object' && source.uri) {
    return new Promise((resolve, reject) => Image.getSize(source.uri, (width, height) => resolve({ width, height }), reject));
  }

  const {width, height} = Image.resolveAssetSource(source);

  return Promise.resolve({
    width,
    height,
  });
}
