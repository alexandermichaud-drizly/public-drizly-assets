import Jumbotron from 'react-bootstrap/Jumbotron';
import displayImages from './utils/displayImages';

function App() {

	// TODO Cal displayImages

  return (
    <div>
			<Jumbotron>
				<h1>Drizly Static Assets</h1>
				<h3>This page loads all images from a public Drizly S3 bucket</h3>
			</Jumbotron>
			<div id="images"></div>
  	</div>
	);
}

export default App;
