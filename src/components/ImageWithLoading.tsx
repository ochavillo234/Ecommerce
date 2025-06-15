import React, { useState } from 'react';

export interface ImageWithLoadingProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const ImageWithLoading: React.FC<ImageWithLoadingProps> = ({ className = '', width, height, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  // Ensure width / height are numbers when passed as strings
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div className={`relative ${className}`} style={style}>
      {!loaded && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        {...rest}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default ImageWithLoading;
