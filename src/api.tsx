import { Dog } from './types';

export const baseUrl = 'http://localhost:3000';

const getAllDogs = (): Promise<Dog[]> => {
  // fill out method
  return fetch(`${baseUrl}/dogs`).then((response) => {
    if (!response.ok) {
      throw new Error('Could not fetch');
    }
    return response.json().then((data: Dog[]) => {
      return data;
    });
  });
};

const postDog = (newDog: Omit<Dog, 'id' | 'isFavorite'>): Promise<Response> => {
  // fill out method
  return fetch(`${baseUrl}/dogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...newDog, isFavorite: false }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Could not post');
    }
    return response;
  });
};

const deleteDogRequest = (id: number): Promise<Response> => {
  // fill out method
  return fetch(`${baseUrl}/dogs/${id}`, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Could not delete');
    }
    return response;
  });
};

const patchFavoriteForDog = (updatedInfo: Partial<Dog>): Promise<Response> => {
  // fill out method
  return fetch(`${baseUrl}/dogs/${updatedInfo.id!}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedInfo),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Could not update');
    }
    return response;
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
