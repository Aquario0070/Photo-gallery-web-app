export default function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow">
      <img
        src={`https://picsum.photos/id/${photo.id}/600/450`}
        alt={`Photo by ${photo.author}`}
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="flex items-center justify-between px-4 py-3">
        <p className="truncate text-sm font-medium">{photo.author}</p>
               <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          className={`text-2xl ${isFavourite ? "text-red-500" : "text-gray-400"}`}
        >
          {isFavourite ? "♥" : "♡"}
        </button>
      </div>
    </article>
  );
}