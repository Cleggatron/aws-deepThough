const { v4 : uuidv4} = require("uuid");

const params = fileName => {
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length - 1];
  
    const imageParams = {
      Bucket: 'user-images-c39dbb07-1369-4f10-b4a3-a5a5cbd38df5',
      Key: `${uuidv4()}.${fileType}`,
      Body: fileName.buffer
    };
  
    return imageParams;
  };

  module.exports = params;