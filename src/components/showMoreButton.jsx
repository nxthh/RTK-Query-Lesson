export default function ShowMoreButton() {
  return (
    <div className="w-full text-center">
      <button
        type="button"
        className="rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white dark:focus:ring-zinc-700"
      >
        Show more 
      </button>
    </div>
  );
}
