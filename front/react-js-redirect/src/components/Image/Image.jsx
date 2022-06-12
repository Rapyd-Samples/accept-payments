import React, { useRef, useEffect } from 'react';
import { useLoadImage } from '../../hooks/useLoadImage';

const Image = (props) => {
  const {src, alt} = props
  const imageRef = useRef();
  const { isLoaded: isValidSrc } = useLoadImage(src);

  useEffect(() => {
    if (!imageRef?.current) return;

    const imgElement = imageRef.current;
    if (imgElement.style.display === 'none') {
      imgElement.style.display = 'unset';
    }
  }, [src]);

  if (!isValidSrc) return null;
  return <img {...props} ref={imageRef} alt={alt}/>;
};
export default Image;
