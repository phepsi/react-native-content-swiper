import React, {PureComponent, Children} from 'react';
import PropTypes from 'prop-types';
import {View, Animated, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {ContentItem} from './ContentItem';
import {ContentOverlay} from './ContentOverlay';
import {RotationController} from './helpers/RotationController';

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
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
    width: '100%',
    height: '100%',
  }
});

export class ContentView extends PureComponent {

  componentWillMount() {
    const {controller, orientation} = this.props;
    this._layoutWidth = new Animated.Value(1);
    this._layoutHeight = new Animated.Value(1);
    this._aIndex = controller.getAnimatedIndex(this._layoutWidth);
    this._rotationController = new RotationController(orientation, this._layoutWidth, this._layoutHeight);

    const {children, animator} = this.props;
    this.items = this.buildChildItems(children, animator);
  }

  onLayout = ({nativeEvent}) => {
    const {layout} = nativeEvent;
    const {width, height} = layout;

    // Set width/height into animated properties
    this._layoutWidth.setValue(width);
    this._layoutHeight.setValue(height);
  }

  componentWillReceiveProps(nextProps) {
    const {children, animator, orientation} = nextProps;
    this.items = this.buildChildItems(children, animator);
    this._rotationController.setRotation(orientation);
  }

  buildChildItems(children, animator) {
    if (this._children === children) {
      return;
    }
    this._children = children;

    const items = Children.map(children, (child, idx) => {
      const key = child.key || `ci-${idx}`;

      return (
        <ContentItem key={key}
          itemIndex={idx}
          animatedIndex={this._aIndex}
          animatedLayoutWidth={this._layoutWidth}
          animatedLayoutHeight={this._layoutHeight}
          animator={animator}
          rotationController={this._rotationController}>
          {child}
        </ContentItem>
      );
    });
    items.reverse();
    return items;
  }

  render() {
    const {onPress, controller, indicatorAnimator, theme} = this.props;

    return (
      <View style={styles.container} {...controller.getPanHandlers()} onLayout={this.onLayout}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.content}>
            {this.items}
            <ContentOverlay
              itemsCount={this.items.length}
              animatedCurrentIndex={this._aIndex}
              indicatorAnimator={indicatorAnimator}
              theme={theme} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

ContentView.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  animator: PropTypes.func.isRequired,
  indicatorAnimator: PropTypes.func.isRequired,
  controller: PropTypes.object.isRequired,
  orientation: PropTypes.number,
  theme: PropTypes.object,
}

ContentView.defaultProps = {
  orientation: 0,
}

export default ContentView;
