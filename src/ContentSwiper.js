import React, {PureComponent, Children} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';

import {ContentView} from './ContentView';
import {ContentModal} from './ContentModal';
import {ContentBackground} from './ContentBackground';
import {Slide} from './Animators';
import {Scale} from './IndicatorAnimators';
import {PanController} from './helpers/PanController';

import {defaultTheme} from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

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
    this._mergedTheme = Object.assign({}, defaultTheme, theme);
  }

  openFullScreen = () => {
    this.setState({ fullScreenMode: true });
  }
  closeFullScreen = () => {
    this.setState({ fullScreenMode: false });
  }

  render() {
    const {children, clickThreshold, animator, indicatorAnimator, orientation} = this.props;
    const {fullScreenMode} = this.state;

    return (
      <View style={styles.container}>

        <ContentBackground theme={this._mergedTheme} />
        <ContentView
          onPress={this.openFullScreen}
          clickThreshold={clickThreshold}
          animator={animator}
          indicatorAnimator={indicatorAnimator}
          orientation={orientation}
          controller={this._panController}
          theme={this._mergedTheme}>
          {children}
        </ContentView>

        <ContentModal visible={fullScreenMode} onClose={this.closeFullScreen}>
          <ContentBackground theme={this._mergedTheme} />
          <ContentView
            onPress={this.closeFullScreen}
            clickThreshold={clickThreshold}
            animator={animator}
            indicatorAnimator={indicatorAnimator}
            orientation={orientation}
            controller={this._panController}
            theme={this._mergedTheme}>
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
  theme: {},
}

export default ContentSwiper;
