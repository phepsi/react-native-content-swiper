import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Indicator} from './Indicator';
import {buildStyles} from './styles';
import {range} from './helpers/utils';

export class ContentOverlay extends PureComponent {

  componentWillMount() {
    const {theme} = this.props;
    this.styles = buildStyles('contentOverlay', theme);
    this.indicatorStyles = buildStyles('indicator', theme);
  }

  render() {
    const {itemsCount, animatedCurrentIndex, indicatorAnimator} = this.props;

    return (
      <View style={this.styles.container} pointerEvents="none">
        <View style={this.styles.bottomContainer}>
          {range(itemsCount).map(i => <Indicator key={i} style={this.indicatorStyles.container} animatedCurrentIndex={animatedCurrentIndex} index={i} animator={indicatorAnimator} />)}
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
