import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Dog } from '../types';
import { Requests } from '../api';
import toast from 'react-hot-toast';

type TDogsContext = {
  allDogs: Dog[];
  refetchData: () => Promise<void>;
  updateFavorite: (updatedInfo: Partial<Dog>) => void;
  deleteDog: (id: number) => void;
  postDog: (newDog: Omit<Dog, 'id' | 'isFavorite'>) => void;
  isLoading: boolean;
};

const DogsContext = createContext<TDogsContext>({} as TDogsContext);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetchData = (): Promise<void> => {
    return Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
      })
      .catch((err) => console.error('Error fetching dogs', err));
  };

  useEffect(() => {
    void refetchData();
  }, []);

  const updateFavorite = (updatedInfo: Partial<Dog>) => {
    setAllDogs(
      allDogs.map((dog) =>
        updatedInfo.id === dog.id ? { ...dog, isFavorite: updatedInfo.isFavorite! } : dog
      )
    );
    void Requests.patchFavoriteForDog(updatedInfo).then((response) => {
      if (!response.ok) {
        setAllDogs(allDogs);
      } else return;
    });
  };

  const deleteDog = (id: number) => {
    setAllDogs(allDogs.filter((dog) => dog.id !== id));
    void Requests.deleteDogRequest(id).then((response) => {
      if (!response.ok) {
        setAllDogs(allDogs);
      } else return;
    });
  };

  const postDog = (newDog: Omit<Dog, 'id' | 'isFavorite'>) => {
    setIsLoading(true);
    Requests.postDog(newDog)
      .then(refetchData)
      .then(() => {
        toast.success('Dog Created');
      })
      .catch((err) => console.error('Error posting dogs', err))
      .finally(() => setIsLoading(false));
  };

  return (
    <DogsContext.Provider
      value={{
        allDogs,
        refetchData,
        updateFavorite,
        deleteDog,
        postDog,
        isLoading,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDogs = () => useContext(DogsContext);
