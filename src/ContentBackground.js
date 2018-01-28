import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';

const getStyle = (theme) => StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.backgroundColor
  }
});

export class ContentBackground extends PureComponent {

  componentWillMount() {
    const {theme} = this.props;
    this.styles = getStyle(theme);
  }

  render() {
    return (
      <View style={this.styles.container} />
    )
  }
}

ContentBackground.propTypes = {
  theme: PropTypes.object,
}

ContentBackground.defaultProps = {
  theme: {}
}

export default ContentBackground;
