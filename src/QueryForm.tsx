import { useState } from "react";
import classNames from "classnames";

interface QueryFormProps {
  isShrunk: boolean;
  searchQuery?: string;
  setSearchQuery: (searchQuery: string) => void;
  viewFavorites: () => void;
}

export const QueryForm = ({
  isShrunk,
  searchQuery = "",
  setSearchQuery,
  viewFavorites,
}: QueryFormProps) => {
  const [queryValue, setQueryValue] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(queryValue);
  };

  return (
    <form
      className={classNames("app-header", { "app-header-shrunk": isShrunk })}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="query"
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
      />

      <button type="submit">Search</button>

      <button type="button" value="Favorites" onClick={viewFavorites}>
        Favorites
      </button>
    </form>
  );
};

export default QueryForm;
