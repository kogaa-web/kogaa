export default function gallery({ images }) {
  return (
    <div>
      {images.map((image) => {
        return <img key={image.sourceUrl} src={image.sourceUrl} alt="" />;
      })}
    </div>
  );
}
