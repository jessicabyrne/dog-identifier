import './my-component.css';

import * as mobilenet from '@tensorflow-models/mobilenet';
import React, { useEffect, useRef as useReference, useState } from 'react';

/*
 * Have tensorflow model get dog breed, then put dog breed into DogAPI:
 * https://dog.ceo/api/breed/{breed}/images
 * map over resulting images
 */

const MyComponent: React.FC = (): JSX.Element => {
  const [imageURL, setImageURL] = useState('');
  const [results, setResults] = useState([]);
  const [model, setModel] = useState(Event | undefined);

  const imageReference = useReference();
  const inputReference = useReference();

  useEffect(async () => {
    const modelOnLoad = await mobilenet.load();
    console.log('model on load');
    console.log(modelOnLoad);

    return setModel(modelOnLoad);
  });

  const handleImageUpload = (event: React.FormEvent<HTMLFormElement>) => {
    const { files } = event.target;
    const url = URL.createObjectURL(event.target.files[0]);
    setImageURL(url);
  };

  const identifyDogBreed = async e => {
    e.preventDefault();
    console.log(model);
    const classifiedModel = await model.classify(imageReference.current);
    console.log(classifiedModel);
    setResults(classifiedModel);
    console.log(results);
  };

  // @tensorflow/tfjs-backend-cpu
  return (
    <div>
      <h1 className="previewText">Image Preview in Reactjs</h1>

      <form>
        <label htmlFor="photo" className="form-img__file-label" />
        <input
          type="file"
          className="fileInput"
          accept="image/*"
          capture="camera" // For mobile
          multiple={false}
          onChange={handleImageUpload}
        />
        {model ? (
          <button
            className="submitButton"
            type="submit"
            onClick={identifyDogBreed}
          >
            Upload Image
          </button>
        ) : (
          <span>Waiting for model to load...</span>
        )}
        {imageURL && (
          <img src={imageURL} alt="uploaded-image" ref={imageReference} />
        )}
        {results[0]?.className}
      </form>
    </div>
  );
};

export default MyComponent;
