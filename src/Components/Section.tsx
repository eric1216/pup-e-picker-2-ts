import { ReactNode, useEffect, useState } from 'react';
import { useActiveTab } from '../providers/ActiveTabProvider';
import { useDogs } from '../providers/DogsProvider';

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { activeTab, handleTabChange } = useActiveTab();
  const { allDogs } = useDogs();

  const [counts, setCounts] = useState<{ favoriteCount: number; unfavoriteCount: number }>({
    favoriteCount: 0,
    unfavoriteCount: 0,
  });

  useEffect(() => {
    const favoriteAndUnfavoriteCount = allDogs.reduce(
      (acc, dog) => {
        if (dog.isFavorite) {
          acc.favoriteCount += 1;
        } else {
          acc.unfavoriteCount += 1;
        }
        return acc;
      },
      { favoriteCount: 0, unfavoriteCount: 0 }
    );
    setCounts(favoriteAndUnfavoriteCount);
  }, [allDogs]);

  return (
    <section id='main-section'>
      <div className='container-header'>
        <div className='container-label'>{label}</div>
        <div className='selectors'>
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === 'favorited' ? 'active' : ''}`}
            onClick={() => {
              handleTabChange('favorited');
            }}
          >
            favorited ( {counts.favoriteCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab === 'unfavorited' ? 'active' : ''}`}
            onClick={() => {
              handleTabChange('unfavorited');
            }}
          >
            unfavorited ( {counts.unfavoriteCount} )
          </div>
          <div
            className={`selector ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => {
              handleTabChange('create');
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className='content-container'>{children}</div>
    </section>
  );
};
