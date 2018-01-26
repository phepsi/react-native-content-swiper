import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';

export class Indicator extends PureComponent {

  componentWillMount() {
    const {index, animatedCurrentIndex} = this.props;

    this._aIndex = Animated.add(animatedCurrentIndex, new Animated.Value(index));
    this._layoutWidth = new Animated.Value(10);
    this._layoutHeight = new Animated.Value(10);
  }

  render() {
    const {animator, style} = this.props;

    const st = animator(this._aIndex, this._layoutWidth, this._layoutHeight);

    return (
      <Animated.View style={[style, st]} />
    )
  }
}

Indicator.propTypes = {
  index: PropTypes.number.isRequired,
  animatedCurrentIndex: PropTypes.any.isRequired,
  animator: PropTypes.func.isRequired,
  style: PropTypes.any,
}

export default Indicator;
