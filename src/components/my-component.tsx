import './my-component.css';

import * as mobilenet from '@tensorflow-models/mobilenet';
import React, { useRef as useReference, useState } from 'react';

/*
 * Have tensorflow model get dog breed, then put dog breed into DogAPI:
 * https://dog.ceo/api/breed/{breed}/images
 * map over resulting images
 */

const MyComponent: React.FC = (): JSX.Element => {
  const [imageURL, setImageURL] = useState('');
  const [results, setResults] = useState([]);
  const [model, setModel] = useState(null);

  const imageReference = useReference();
  const inputReference = useReference();

  const handleImageUpload = (event: React.FormEvent<HTMLFormElement>) => {
    const { files } = event.target;
    const url = URL.createObjectURL(event.target.files[0]);
    setImageURL(url);
  };

  const identifyDogBreed = async () => {
    const model = await mobilenet.load();
    setModel(model);
    console.log(model);

    const results = await model.classify(imageReference.current);
    setResults(results);
    console.log(results);
  };

  return (
    <div>
      <h1 className="previewText">Image Preview in Reactjs</h1>
      {imageURL && (
        <img src={imageURL} alt="uploaded-image" ref={imageReference} />
      )}
      <form>
        <label htmlFor="photo" className="form-img__file-label" />
        <input
          type="file"
          className="fileInput"
          accept="image/*"
          capture="camera" // For mobile
          onChange={handleImageUpload}
        />
        <button
          className="submitButton"
          type="submit"
          onClick={identifyDogBreed}
        >
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default MyComponent;
