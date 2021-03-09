import AWS from 'aws-sdk';
require('dotenv').config();

const key_id = process.env.REACT_APP_AWS_ACCESS_KEY_ID; 
const secret_key = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

AWS.config.update({
	region: 'us-east-1',
	credentials: {
		accessKeyId: key_id,
		secretAccessKey: secret_key
	}
});

const s3 = new AWS.S3();
const bucketName = "drizly_imgs"; 

const params = {
	Bucket: bucketName,
	MaxKeys: 500
}

export const displayImages = s3.listObjectsV2(params, (err, data) => {
		if (err) {
			return alert('There was an error retrieving images: ' + err.message);
		}
	}).on('success', response => { 
		const href = response.request.httpRequest.endpoint.href; 
		const bucketUrl = href + bucketName + '/';
		const urls = response.data.Contents.map( img => bucketUrl + encodeURIComponent(img.Key));	

		// TODO 
		// loop through urls, creating an image for each
		// render at id="images" (see App.js)
	});

