const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dippwhjlp',
    api_key: '826388889256434',
    api_secret: 'j7zwGdQXmZHai5qrb7j-NhYIZ0w',
    secure: true
});

module.exports = cloudinary;