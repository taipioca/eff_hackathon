import React, { Component } from 'react';
import axios from 'axios';
import { Upload, Button, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

class UploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'Upload',
      isDisabled: false,
      selectedFile: null,
    };
  }

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  onClickHandler = () => {
    this.setState({
      msg: 'Uploaded!',
      isDisabled: true,
    });
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    axios.post('http://localhost:8000/upload', data).then((res) => {
      console.log(res.statusText);
      this.props.onClose(); // Close the modal when the upload is complete
    });
  };

  handleCancel = () => {
    this.props.onClose(); // Close the modal when the cancel button is clicked
  };

  render() {
    const { msg, isDisabled } = this.state;
    return (
      <Modal
        title="Upload a file to get started:"
        visible={true}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Return
          </Button>,
          <Button
            key="upload"
            type="primary"
            onClick={this.onClickHandler}
            disabled={isDisabled}
          >
            {msg}
          </Button>,
        ]}
      >
        <form method="post" action="#" id="#">
          <div className="form-group files">
            <input
              type="file"
              name="file"
              onChange={this.onChangeHandler}
            />
          </div>
        </form>
      </Modal>
    );
  }
}

export default UploadComponent;