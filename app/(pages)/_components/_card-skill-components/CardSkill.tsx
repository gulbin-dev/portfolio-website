import React from "react";
import { memo } from "react";

export const Video = memo(function Video({
  poster,
  children,
}: {
  poster: string;
  children: Readonly<React.ReactNode>;
}) {
  return (
    <video
      className="tablet-portrait:max-w-80 aspect-video desktop:max-w-100 translate-z-0 object-cover"
      muted
      controls
      playsInline
      poster={poster}
      width={"100%"}
      height={"auto"}
      preload="none"
    >
      {children}
    </video>
  );
});
