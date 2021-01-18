export const getDogPictures = async (dogBreed: string): Promise<unknown> => {
  if (dogBreed) {
    const response = await fetch(
      `https://dog.ceo/api/breed/${dogBreed}/images`,
    );
    const dogImages = await response.json();

    return dogImages;
  }
};
