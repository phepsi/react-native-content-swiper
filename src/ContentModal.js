import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Modal} from 'react-native';
import {buildStyles} from './styles';

export class ContentModal extends PureComponent {

  componentWillMount() {
    const {theme} = this.props;
    this.styles = buildStyles('contentModal', theme);
  }

  render() {
    const {children, visible, onClose} = this.props;

    return (
      <Modal transparent={true}
        visible={visible}
        animationType='fade'
        presentationStyle='overFullScreen'
        onRequestClose={onClose}>
        <View style={this.styles.container}>
          {children}
        </View>
      </Modal>
    );
  }
}

ContentModal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  theme: PropTypes.any,
}

export default ContentModal;
