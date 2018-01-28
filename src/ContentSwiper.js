import React, {PureComponent, Children} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {buildStyles} from './styles';

import {ContentView} from './ContentView';
import {ContentModal} from './ContentModal';
import {Slide} from './Animators';
import {Scale} from './IndicatorAnimators';
import {PanController} from './helpers/PanController';

export class ContentSwiper extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      fullScreenMode: false,
    }
  }

  componentWillMount() {
    const {startIndex, clickThreshold, children, theme} = this.props;
    const childCount = Children.count(children);
    this._panController = new PanController(startIndex, childCount, clickThreshold);
    this.styles = buildStyles('contentSlider', theme);
  }

  openFullScreen = () => {
    this.setState({ fullScreenMode: true });
  }
  closeFullScreen = () => {
    this.setState({ fullScreenMode: false });
  }

  render() {
    const {children, clickThreshold, animator, indicatorAnimator, orientation, theme} = this.props;
    const {fullScreenMode} = this.state;

    return (
      <View style={this.styles.root}>

        <ContentView
          onPress={this.openFullScreen}
          clickThreshold={clickThreshold}
          animator={animator}
          indicatorAnimator={indicatorAnimator}
          orientation={orientation}
          controller={this._panController}
          theme={theme}>
          {children}
        </ContentView>

        <ContentModal visible={fullScreenMode} onClose={this.closeFullScreen}>
          <ContentView
            onPress={this.closeFullScreen}
            clickThreshold={clickThreshold}
            animator={animator}
            indicatorAnimator={indicatorAnimator}
            orientation={orientation}
            controller={this._panController}
            theme={theme}>
            {children}
          </ContentView>
        </ContentModal>

      </View>
    );
  }
}

ContentSwiper.propTypes = {
  children: PropTypes.node,
  clickThreshold: PropTypes.number,
  startIndex: PropTypes.number,
  animator: PropTypes.func,
  indicatorAnimator: PropTypes.func,
  orientation: PropTypes.number,
  theme: PropTypes.object,
}

ContentSwiper.defaultProps = {
  clickThreshold: 10,
  startIndex: 0,
  animator: Slide,
  indicatorAnimator: Scale,
  orientation: 0,
}

export default ContentSwiper;
