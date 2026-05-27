type PaginationProps = {
  variant?: "primary" | "simple" | "icon" | null | undefined;
  currentPage: number;
  totalPages: number;
  onClick: (pageNumber: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onClick
}: PaginationProps) => {
  const MAX_VISIBLE = 5; // 表示する最大ページ数

  const renderItem = (page: number | string, index?: number) => {
    if (typeof page === "string") {
      return (
        <span
          key={`ellipsis-${index}`}
          className="mx-1 px-2 text-stone-400 font-semibold select-none text-base"
        >
          {page}
        </span>
      );
    }

    return page === currentPage ? (
      <span
        key={page}
        className="mx-1 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white font-bold shadow-md shadow-amber-500/20 select-none text-base"
      >
        {page}
      </span>
    ) : (
      <button
        key={page}
        type="button"
        className="mx-1 flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 font-semibold hover:bg-stone-50 hover:text-stone-900 hover:border-stone-300 transition-all duration-200 text-base"
        onClick={() => onClick(page)}
      >
        {page}
      </button>
    );
  };

  const getPaginationRange = () => {
    const sidePages = (MAX_VISIBLE - 3) / 2; // 現在ページの前後に表示するページ数

    const range: (number | string)[] = [];

    const start = Math.max(2, currentPage - sidePages);
    const end = Math.min(totalPages - 1, currentPage + sidePages);

    if (totalPages <= MAX_VISIBLE) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    range.push(1);
    if (start > 2) range.push("...");

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < totalPages - 1) range.push("...");
    range.push(totalPages);

    return range;
  };

  return (
    <div className="flex items-center gap-2 justify-center my-5 text-lg font-bold">
      {currentPage !== 1 && (
        <button
          type="button"
          className="mx-1 flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 font-semibold hover:bg-stone-50 hover:text-stone-900 hover:border-stone-300 transition-all duration-200 text-base"
          onClick={() => onClick(currentPage - 1)}
        >
          {"<"}
        </button>
      )}

      {getPaginationRange().map(renderItem)}

      {currentPage !== totalPages && (
        <button
          type="button"
          className="mx-1 flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 font-semibold hover:bg-stone-50 hover:text-stone-900 hover:border-stone-300 transition-all duration-200 text-base"
          onClick={() => onClick(currentPage + 1)}
        >
          {">"}
        </button>
      )}
    </div>
  );
};

Pagination.displayName = "Pagination";
