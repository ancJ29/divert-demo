export default function GalleryItem({
  imageName,
  onChooseImage
}: {
  imageName: string;
  onChooseImage: (imageName: string) => void;
}) {
  return (<div onClick={() => onChooseImage(imageName)}>
    <img
      className="h-auto max-w-full rounded-lg border border-b rounded-md"
      src={`../public/images/${imageName}.jpg`}
      alt={imageName}
    />
  </div>)
}
