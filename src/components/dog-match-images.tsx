import React, { useEffect, useState } from 'react';

// Import LazyLoad from 'react-lazy-load';
import { getDogPictures } from '../../api/get-dog-pictures';

const DogMatchImages: React.FC = (results): JSX.Element => {
  const [dogImages, setDogImages] = useState([]);

  useEffect(async () => {
    const bestMatchDogBreed = results[0]?.className.toLowerCase();
    await getDogPictures(bestMatchDogBreed).then(dogImageUrl => {
      setDogImages(dogImageUrl.message);
    });
  }, [results]);

  return (
    <div>
      {dogImages.map((imgSource, index: number) => (
        <img src={imgSource} key={index} />
      ))}
    </div>
  );
};

export default DogMatchImages;
