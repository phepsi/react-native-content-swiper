import {StyleSheet} from 'react-native';
import {theme} from './theme';

const merge = (o1, o2) => {
  if (!o2) {
    return o1;
  }
  if (typeof(o1) !== 'object') {
    return o2;
  }

  let r = {};
  const keys = Object.keys(o1);

  for (let key of keys) {
    r[key] = merge(o1[key], o2[key]);
  }
  return r;
}

export const buildStyles = (key, userTheme) => {
  if (userTheme && userTheme[key]) {

    const defaultStyle = theme[key];
    const userStyle = userTheme[key];

    const mergedStyle = merge(defaultStyle, userStyle);

    return StyleSheet.create(mergedStyle);
  }

  return StyleSheet.create(theme[key]);
}
