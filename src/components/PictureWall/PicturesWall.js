import React, { useState } from 'react';
import { Upload, Icon, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const PicturesWall = (props) => {
  const {picUrl} = props;
  const [fileState,setFileState] = useState( {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  });

  const handleCancel = () => setFileState({ previewVisible: false });

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setFileState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

 const  handleChange = ({ fileList }) => {
   
  setFileState({ fileList })
  if(fileList[0].response){
    picUrl(fileList[0].response.url);
  }
  
};

  
    const { previewVisible, previewImage, fileList } = fileState;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="http://localhost:4000/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  
}

export default PicturesWall;