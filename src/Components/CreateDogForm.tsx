import { useState } from 'react';
import { dogPictures } from '../dog-pictures';
import { useDogs } from '../providers/DogsProvider';
import { Dog } from '../types';

const defaultSelectedImage = dogPictures.BlueHeeler;

export const CreateDogForm = () =>
  // no props allowed
  {
    const { postDog, isLoading } = useDogs();

    const [newDog, setNewDog] = useState<Omit<Dog, 'id' | 'isFavorite'>>({
      name: '',
      description: '',
      image: defaultSelectedImage,
    });

    return (
      <form
        action=''
        id='create-dog-form'
        onSubmit={(e) => {
          e.preventDefault();
          postDog(newDog);
          setNewDog({ name: '', description: '', image: defaultSelectedImage });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor='name'>Dog Name</label>
        <input
          type='text'
          disabled={isLoading}
          value={newDog.name}
          onChange={(e) => setNewDog({ ...newDog, name: e.target.value })}
        />
        <label htmlFor='description'>Dog Description</label>
        <textarea
          name=''
          id=''
          cols={80}
          rows={10}
          disabled={isLoading}
          value={newDog.description}
          onChange={(e) => setNewDog({ ...newDog, description: e.target.value })}
        ></textarea>
        <label htmlFor='picture'>Select an Image</label>
        <select
          id=''
          disabled={isLoading}
          value={newDog.image}
          onChange={(e) => {
            setNewDog({ ...newDog, image: e.target.value });
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type='submit' value='submit' disabled={isLoading} />
      </form>
    );
  };
