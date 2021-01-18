import './my-component.css';

import * as mobilenet from '@tensorflow-models/mobilenet';
import React, { useEffect, useRef as useReference, useState } from 'react';

import DogMatchImages from './dog-match-images';

const MyComponent: React.FC = (): JSX.Element => {
  const [imageURL, setImageURL] = useState('');
  const [results, setResults] = useState([]);
  const [model, setModel] = useState(null);
  const [error, setError] = useState('');

  const imageReference = useReference();

  useEffect(async () => {
    const modelOnLoad = await mobilenet.load();

    return setModel(modelOnLoad);
  });

  const handleImageUpload = (event: React.FormEvent<HTMLFormElement>) => {
    const { files } = event.target;

    if (files.length > 0) {
      const localURL = URL.createObjectURL(event.target.files[0]);

      return setImageURL(localURL);
    }
  };

  const identifyDogBreed = async e => {
    e.preventDefault();

    if (!imageURL) return setError('Upload valid image');

    const classifiedModel = await model.classify(imageReference.current);
    setResults(classifiedModel);
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
        {DogMatchImages(results)}
        {error}
      </form>
    </div>
  );
};

export default MyComponent;
