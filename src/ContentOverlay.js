import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Indicator} from './Indicator';
import {range} from './helpers/utils';

const getStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.overlayBackgroundColor,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
  }
})

export class ContentOverlay extends PureComponent {

  componentWillMount() {
    const {theme} = this.props;
    this.styles = getStyles(theme);
  }

  render() {
    const {itemsCount, animatedCurrentIndex, indicatorAnimator, theme} = this.props;

    return (
      <View style={this.styles.container} pointerEvents="none">
        <View style={this.styles.bottomContainer}>
          {range(itemsCount).map(i => <Indicator key={i} theme={theme} animatedCurrentIndex={animatedCurrentIndex} index={i} animator={indicatorAnimator} />)}
        </View>
      </View>
    );
  }
}


ContentOverlay.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  animatedCurrentIndex: PropTypes.any.isRequired,
  indicatorAnimator: PropTypes.func.isRequired,
  theme: PropTypes.object,
}

export default ContentOverlay;
