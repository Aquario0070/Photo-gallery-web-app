import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";
import {
  favouritesReducer,
  initFavourites,
  STORAGE_KEY,
} from "../reducers/favouritesReducer";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [query, setQuery] = useState("");
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initFavourites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const handleToggle = (id) => dispatch({ type: "TOGGLE_FAVOURITE", id });

  const handleSearch = useCallback((e) => setQuery(e.target.value), []);

  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? photos.filter((p) => p.author.toLowerCase().includes(q)) : photos;
  }, [photos, query]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
      </div>
    );
  }

  if (error) {
    return <p className="p-6 text-red-600">Couldn't load photos: {error}</p>;
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Photo Gallery</h1>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search by author"
          className="w-full rounded-md border border-gray-300 px-3 py-2 sm:max-w-xs"
        />
      </div>

      {filteredPhotos.length === 0 && (
        <p className="py-12 text-center text-gray-600">
          No photos match "{query}". Try a different author name.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFavourite={favourites.includes(photo.id)}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </main>
  );
}