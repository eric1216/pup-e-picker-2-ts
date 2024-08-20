// Right now these dogs are constant, but in reality we should be getting these from our server

import { useActiveTab } from '../providers/ActiveTabProvider';
import { useDogs } from '../providers/DogsProvider';
import { DogCard } from './DogCard';

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () =>
  // no props allowed
  {
    const { allDogs, deleteDog, updateFavorite, isLoading } = useDogs();
    const { activeTab } = useActiveTab();
    return (
      <>
        {allDogs
          .filter((dog) => {
            if (activeTab === 'favorited') {
              return dog.isFavorite === true;
            } else if (activeTab === 'unfavorited') {
              return dog.isFavorite === false;
            } else {
              return true;
            }
          })
          .map((dog) => (
            <DogCard
              dog={{
                id: dog.id,
                image: dog.image,
                description: dog.description,
                isFavorite: dog.isFavorite,
                name: dog.name,
              }}
              key={dog.id}
              onTrashIconClick={() => {
                deleteDog(dog.id);
              }}
              onHeartClick={() => {
                updateFavorite({ id: dog.id, isFavorite: false });
              }}
              onEmptyHeartClick={() => {
                updateFavorite({ id: dog.id, isFavorite: true });
              }}
              isLoading={isLoading}
            />
          ))}
      </>
    );
  };
