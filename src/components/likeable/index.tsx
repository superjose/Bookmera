import { styled } from '../styles/theme';
import React, { memo, useState, useEffect } from 'react';
import { ButtonLink } from '../styles/buttonLink';
import { CacheStore } from '../../api/cacheStore';
const store = new CacheStore();

const LikeableWrapper = styled(ButtonLink)`
  position: absolute;
  font-size: 2rem;
  top: 0.25rem;
  right: 0.5rem;
  color: #fff;

  &:hover {
    color: #e53935;
  }
  &.liked {
    color: #c62828;
  }
`;

type LikeableProps = {
  isLiked?: boolean;
  imgUrl: string;
  title: string;
  author?: string;
  uniqueId: string;
};

function Likeable({ isLiked = false, ...props }: LikeableProps) {
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    async function SetStateFromDb() {
      const likeable = (await store.GetFromCacheOrDb('likeable')) as Map<
        string,
        LikeableProps
      >;
      if (!!likeable) {
        setLiked(likeable.get(props.uniqueId)!.isLiked!);
      }
    }
    SetStateFromDb();
  }, []);

  async function toggleLike() {
    const newLike = !liked;
    setLiked(newLike);

    // Get the previous likes, since this overwrites everything.
    const likeable = (await store.GetFromCacheOrDb('likeable')) as Map<
      string,
      LikeableProps
    >;

    if (!likeable) {
      const map = new Map<string, LikeableProps>();
      map.set(props.uniqueId, { ...props });
      store.WriteInDb('likeable', map);
      return;
    }

    // Update the map:
    likeable.set(props.uniqueId, { ...props });

    //  If the key already exists then the old value is replaced with the new one.
    store.WriteInDb('likeable', likeable);
  }

  return (
    <LikeableWrapper onClick={toggleLike} className={liked ? 'liked' : ''}>
      ❤
    </LikeableWrapper>
  );
}

export default memo(Likeable);
