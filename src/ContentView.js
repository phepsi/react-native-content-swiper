import React, {PureComponent, Children} from 'react';
import PropTypes from 'prop-types';
import {View, Animated, TouchableWithoutFeedback} from 'react-native';
import {buildStyles} from './styles';
import {ContentItem} from './ContentItem';
import {ContentOverlay} from './ContentOverlay';

export class ContentView extends PureComponent {

  componentWillMount() {
    const {controller, theme} = this.props;
    this._layoutWidth = new Animated.Value(1);
    this._layoutHeight = new Animated.Value(1);
    this._aIndex = controller.getAnimatedIndex(this._layoutWidth);
    this.styles = buildStyles('contentView', theme);
    this.itemStyles = buildStyles('contentItem', theme);

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
    const {children, animator} = nextProps;
    this.items = this.buildChildItems(children, animator);
  }

  buildChildItems(children, animator) {
    const items = Children.map(children, (child, idx) => {
      const key = child.key || `ci-${idx}`;

      return (
        <ContentItem key={key}
          style={this.itemStyles.container}
          itemIndex={idx}
          animatedIndex={this._aIndex}
          animatedLayoutWidth={this._layoutWidth}
          animatedLayoutHeight={this._layoutHeight}
          animator={animator}>
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
      <View style={this.styles.container} {...controller.getPanHandlers()} onLayout={this.onLayout}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={this.styles.content}>
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
  theme: PropTypes.object,
}

ContentView.defaultProps = {
}

export default ContentView;
