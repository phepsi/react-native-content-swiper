import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Animated, StyleSheet} from 'react-native';

const getStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.indicatorColor,
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
  }
})

export class Indicator extends PureComponent {

  componentWillMount() {
    const {index, animatedCurrentIndex, theme} = this.props;

    this._aIndex = Animated.add(animatedCurrentIndex, new Animated.Value(index));
    this._layoutWidth = new Animated.Value(10);
    this._layoutHeight = new Animated.Value(10);
    this.styles = getStyles(theme);
  }

  render() {
    const {animator} = this.props;

    const st = animator(this._aIndex, this._layoutWidth, this._layoutHeight);

    return (
      <Animated.View style={[this.styles.container, st]} />
    )
  }
}

Indicator.propTypes = {
  index: PropTypes.number.isRequired,
  animatedCurrentIndex: PropTypes.any.isRequired,
  animator: PropTypes.func.isRequired,
  theme: PropTypes.object,
}

export default Indicator;
