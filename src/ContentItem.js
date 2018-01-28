import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Animated, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export class ContentItem extends PureComponent {

  componentWillMount() {
    this.contentAspectRatio = new Animated.Value(1);

    this.refresh(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.refresh(nextProps);
  }

  onContentSizeResolved = (width, height) => {
    this.contentAspectRatio.setValue(width / height);
  }

  refresh(props) {
    const {animatedIndex, animatedLayoutWidth, animatedLayoutHeight, itemIndex, animator, rotationController, children} = props;

    const idx = Animated.add(animatedIndex, new Animated.Value(itemIndex));

    this.style = animator(idx, animatedLayoutWidth, animatedLayoutHeight);
    this.rotationStyle = {
      transform: [
        { rotate: rotationController.getInverseRotationValue() },
        { scale: rotationController.getScale(this.contentAspectRatio) }
      ]
    }
    if (this._children !== children) {
      this._children = children;
      this.wrappedChild = React.cloneElement(children, { onContentSizeResolved: this.onContentSizeResolved });
    }
  }

  render() {
    return (
      <Animated.View style={[styles.container, this.style]}>
        <Animated.View style={this.rotationStyle}>
          {this.wrappedChild}
        </Animated.View>
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
  rotationController: PropTypes.object.isRequired,
}

export default ContentItem;
