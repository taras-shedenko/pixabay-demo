import { useState, useEffect } from "react";

import { ImageInfo } from "./types";
import QueryForm from "./QueryForm";
import ViewSearch from "./ViewSearch";
import { ImagePreviews } from "./ImagePreviews";

function App() {
  const [viewPage, setViewPage] = useState<"SEARCH" | "FAVORITES">("SEARCH");

  const viewFavorites = () => setViewPage("FAVORITES");

  const viewSearch = () => setViewPage("SEARCH");

  const [searchQuery, setSearchQuery] = useState<string>();

  const [searchResult, setSearchResult] = useState<ImageInfo[]>();

  useEffect(() => {
    if (typeof searchQuery === "string") {
      let url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}`;

      if (searchQuery) url += `&q=${searchQuery}`;

      fetch(url)
        .then((resp) => resp.json())
        .then((res) => {
          setSearchResult(res.hits);
        })
        .catch((e) => console.log("Error during fetching data: ", e));
    }
  }, [searchQuery]);

  const [favorites, setFavorites] = useState<ImageInfo[]>();

  const addFavorite = ({ id, webformatURL }: ImageInfo) =>
    setFavorites([...(favorites ?? []), { id, webformatURL }]);

  const removeFavorite = ({ id: removeId }: ImageInfo) =>
    setFavorites((favorites ?? []).filter(({ id }) => id !== removeId));

  useEffect(() => {
    let favorites: ImageInfo[] = [];
    try {
      favorites = JSON.parse(localStorage.getItem("pixabay") ?? "");
    } catch (_e) {
    } finally {
      setFavorites(favorites);
    }
  }, []);

  useEffect(() => {
    Array.isArray(favorites) &&
      localStorage.setItem("pixabay", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="App">
      {viewPage === "SEARCH" && (
        <QueryForm
          isShrunk={Array.isArray(searchResult)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewFavorites={viewFavorites}
        />
      )}

      {viewPage === "FAVORITES" && <ViewSearch viewSearch={viewSearch} />}

      {
        <ImagePreviews
          imagesList={viewPage === "SEARCH" ? searchResult : favorites}
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      }
    </div>
  );
}

export default App;
