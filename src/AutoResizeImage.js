import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
import {resolveDimensions} from './helpers/images';

export class AutoResizeImage extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    const {source} = this.props;
    this._ensureSource(source);
  }

  componentWillReceiveProps(nextProps) {
    const {source} = nextProps;
    this._ensureSource(source);
  }

  async _ensureSource(source) {
    // Check if source needs update
    if (this._source === source) {
      return;
    }

    this._source = source;
    this.setState({ loading: true });

    try {
      const {width, height} = await resolveDimensions(source);

      this.setState({
        loading: false,
        width,
        height
      });
    } catch(e) {
      const {onError} = this.props;

      if (onError) {
        onError(e);
      }
    }
  }

  render() {
    const {source, style, ...rest} = this.props;
    const {width, height} = this.state;

    const st = {
      width,
      height,
    };

    return (
      <Image source={source} style={[style, st]} {...rest} />
    )
  }
}

AutoResizeImage.propTypes = {
  source: PropTypes.any,
  style: PropTypes.any,
  onError: PropTypes.func,
}

export default AutoResizeImage;
