import React, { useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const SafeImage = ({
  src,
  fallbackSrc = "/images/22a9a9710a0a5596583a23521e5fe49d.jpg",
  alt,
  className,
  loading = "lazy",
  ...props
}: SafeImageProps) => {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading={loading}
      {...props}
    />
  );
};
