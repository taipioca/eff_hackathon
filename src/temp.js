import React, { useState } from 'react';
import { Upload, Button, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const UploadComponent = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    setUploading(true);
  
    // You can use any AJAX library you like
    axios
      .post('http://localhost:8000/upload', formData)
      .then(() => {
        setFileList([]);
        setUploading(false);
        message.success('Upload successful.');
  
        // Update the data.json file here
        const newData = { /* Construct the new data object */ };
        axios.post('http://localhost:8000/updateDataJson', newData)
          .then(() => {
            message.success('Data.json updated successfully.');
          })
          .catch((error) => {
            console.error('Error updating data.json:', error);
          });
        
        setIsModalOpen(false);
      })
      .catch((error) => {
        setUploading(false);
        message.error('Upload failed.');
        console.error('Error uploading files:', error);
      });
  };
  const onChangeHandler = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show one recent uploaded file, and old ones will be replaced by the new
    newFileList = newFileList.slice(-1);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);

    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      // Check if the file is a JSON file
      if (info.file.type !== 'application/json') {
        message.error('Invalid file type. Please upload a JSON file.');
        return;
      }

      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const uploadProps = {
    name: 'file',
    action: 'http://localhost:8000/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: onChangeHandler,
    fileList,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      if (file.type !== 'application/json') {
        message.error('Invalid file type. Please upload a JSON file.');
        return Upload.LIST_IGNORE;
      }
      setFileList([...fileList, file]);
      return false;
    },
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Upload a file to get started:"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="upload"
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>,
        ]}
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Modal>
    </>
  );
};

export default UploadComponent;