import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';

export class ContentItem extends PureComponent {

  componentWillMount() {
    this.refresh(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.refresh(nextProps);
  }

  refresh(props) {
    const {animatedIndex, animatedLayoutWidth, animatedLayoutHeight, itemIndex, animator} = props;

    const idx = Animated.add(animatedIndex, new Animated.Value(itemIndex));

    this.style = animator(idx, animatedLayoutWidth, animatedLayoutHeight);
  }

  render() {
    const {children, style} = this.props;

    return (
      <Animated.View style={[style, this.style]}>
        {children}
      </Animated.View>
    );
  }
}

ContentItem.propTypes = {
  children: PropTypes.node,
  animatedIndex: PropTypes.any.isRequired,
  animatedLayoutWidth: PropTypes.any.isRequired,
  animatedLayoutHeight: PropTypes.any.isRequired,
  itemIndex: PropTypes.number.isRequired,
  animator: PropTypes.func.isRequired,
  style: PropTypes.any,
}

export default ContentItem;
