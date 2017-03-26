import React from 'react';
import Dropzone from 'react-dropzone';

class AvatarUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
    };
  }

  onDrop = (accepted) => {
    this.setState({
      file: accepted,
    });
    this.props.onUpload(accepted[0].preview);
  };

  resetUpload = () => {
    this.setState({
      file: [],
    });
  };

  render() {
    return (
      <div className="avatar-wrapper">
        { this.state.file.length > 0 ?
          <button className="upload-button" onClick={this.resetUpload}>Remove image</button> :
          <Dropzone
            multiple={false}
            accept="image/*"
            maxSize={10000000}
            ref={(node) => {
              this.dropzone = node;
            }}
            onDrop={this.onDrop}
          >
            <div className="instructions">
              Drag and drop a file here. Otherwise, click the dropzone.
            </div>
          </Dropzone>
      }
      </div>
    );
  }
}

AvatarUploader.propTypes = {
  onUpload: React.PropTypes.func.isRequired,
};

export default AvatarUploader;
