import React from 'react';
import Dropzone from 'react-dropzone';
import Paper from 'material-ui/Paper';
import '../styles/AvatarUploader.scss';


/* Avatar uploader component
and positioning
and url, dropping, or selecting function for it
*/
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
      <Paper className="picUploaderContainer" zDepth={2}>
        <div className="avatar-wrapper">
          { this.state.file.length > 0 ?
            <div className="refreshPicWrap">
              <p id="refreshLabel">Have a better one?</p>
              <img src={require('../../public/refresh.svg')} className="refreshIcon" onClick={this.resetUpload} />
            </div>
            :
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
                <p id="instructionLabel" >Drag and drop a file here. Otherwise, click the dropzone.</p>
                <img src={require('../../public/folder.svg')} id="folderIcon" />
              </div>
            </Dropzone>
        }
        </div>
      </Paper>
    );
  }
}

AvatarUploader.propTypes = {
  onUpload: React.PropTypes.func.isRequired,
};

export default AvatarUploader;
