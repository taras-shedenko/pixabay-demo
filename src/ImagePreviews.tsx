import classNames from "classnames";
import { ImageInfo } from "./types";

interface ImagePreviewsProps {
  imagesList?: ImageInfo[];
  favorites?: ImageInfo[];
  addFavorite: (image: ImageInfo) => void;
  removeFavorite: (image: ImageInfo) => void;
}

export const ImagePreviews = ({
  imagesList = [],
  favorites = [],
  addFavorite,
  removeFavorite,
}: ImagePreviewsProps) => {
  return imagesList.length ? (
    <section className="images-preview">
      {imagesList.map((image) => (
        <PreviewItem
          key={image.id}
          image={image}
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      ))}
    </section>
  ) : null;
};

interface PreviewItemProps {
  image: ImageInfo;
  favorites: ImageInfo[];
  addFavorite: (image: ImageInfo) => void;
  removeFavorite: (image: ImageInfo) => void;
}

const PreviewItem = ({
  image,
  favorites,
  addFavorite,
  removeFavorite,
}: PreviewItemProps) => {
  const isFavorite = favorites.findIndex(({ id }) => image.id === id) >= 0;
  return (
    <div className="image-tile">
      <button
        onClick={() => (isFavorite ? removeFavorite : addFavorite)(image)}
        className={classNames(
          "favorite-icon",
          isFavorite ? "favorite-icon-active" : "favorite-icon-inactive"
        )}
      >
        ★
      </button>
      <img key={image.id} src={image.webformatURL} alt="" />
    </div>
  );
};
