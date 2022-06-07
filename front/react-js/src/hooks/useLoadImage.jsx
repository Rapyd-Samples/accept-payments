import { useState, useEffect } from 'react';

export const useLoadImage = src => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setIsLoaded(true);
  }, [src]);

  return { isLoaded, src };
};
