import React from 'react';
import ReactDOM from 'react-dom';
import AWS from 'aws-sdk';
import { Container, Col, Row, Image } from 'react-bootstrap';
import '../styles.css'

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
		let rows = []

		for (let i = 0; i < urls.length; i += 4) {
			rows.push(urls.slice(i, i + 4));
		}

		const Images = (
			<Container fluid>
				{rows.map( (urls, i) => (
						<Row md={true} lg ={true}>
							<Col>
								<Image src={urls[0]} alt={i} className="photo" rounded />
							</Col>
							<Col>
								<Image src={urls[1]} alt={i + 1} className="photo" rounded />
							</Col>
							<Col>
								<Image src={urls[2]} alt={i + 2} className="photo" rounded />
							</Col>
							<Col>
								<Image src={urls[3]} alt={i + 3} className="photo" rounded />
							</Col>
						</Row>
					)
				)}
			</Container>
		)
		
		ReactDOM.render(
			Images,
			document.getElementById('images')
		);
	});

