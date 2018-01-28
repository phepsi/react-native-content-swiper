import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Modal, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export class ContentModal extends PureComponent {

  render() {
    const {children, visible, onClose} = this.props;

    return (
      <Modal transparent={true}
        visible={visible}
        animationType='fade'
        presentationStyle='overFullScreen'
        onRequestClose={onClose}>
        <View style={styles.container}>
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
