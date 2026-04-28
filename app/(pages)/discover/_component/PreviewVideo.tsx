export default function PreviewVideo({
  src,
}: Readonly<{
  src: string;
}>) {
  if (!src) return null;

  return (
    <video
      className="tablet-portrait:max-w-80 desktop:max-w-100"
      muted
      controls
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
