import React, { Component } from 'react';
import ReactDom from 'react-dom';
import AvatarCropper from 'react-avatar-cropper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';


class PictureUploader extends Component {


  constructor(props) {
    super(props);
    this.state = { cropperOpen: false, img: null, croppedImg: null };
  }

  uploadPhoto = (dataURI) => {
    this.setState({ img: dataURI, croppedImg: this.state.croppedImg, cropperOpen: true });
  };

  cropPhoto = (dataURI) => {
    this.setState({ img: null, croppedImg: dataURI, cropperOpen: false });
  };

  hideCropper = () => {
    this.setState({ cropperOpen: false });
  }

  render() {
    function FileUpload() {
      const handleFile = function (e) {
        const reader = new FileReader();
        const file = e.target.files[0];


        if (!file) return;

        reader.onload = function (img) {
          ReactDom.findDOMNode(this.refs.in).value = '';
          this.props.handleFileChange(img.target.result);
        }.bind(this);
        reader.readAsDataURL(file);
      };

      return (
        <input ref="in" type="file" accept="image/*" onChange={this.handleFile} />
      );
    }

    return (
      <div>
        <FileUpload handleFileChange={this.uploadPhoto}>
          <MuiThemeProvider>
            <Avatar src={require('../../../public/photo-camera.png')} className={this.props.state} />
          </MuiThemeProvider>
        </FileUpload>
        {this.state.cropperOpen &&
        <AvatarCropper
          onRequestHide={this.hideCropper}
          cropperOpen={this.state.cropperOpen}
          image={this.state.img}
          width={400}
          height={400}
        />}
      </div>
    );
  }


}

export default PictureUploader;
