import { Button } from "../../atoms/button/Button";
import { Label } from "../../atoms/label/Label";

type PaginationProps = {
  variant: "primary" | "outline" | "icon" | null | undefined;
  currentPage: number;
  totalPages: number;
  onClick: (pageNumber: number) => void;
};

export const Pagination = ({
  variant,
  currentPage,
  totalPages,
  onClick
}: PaginationProps) => {
  const MAX_VISIBLE = 5; // 表示する最大ページ数

  const renderItem = (page: number | string, index?: number) => {
    if (typeof page === "string") {
      return (
        <Label
          key={`ellipsis-${index}`}
          variant={variant}
          name="ellipsis"
          required={false}
          className="mx-1"
        >
          {page}
        </Label>
      );
    }

    return page === currentPage ? (
      <Label
        key={page}
        variant={variant}
        name="currentPage"
        required={false}
        className="mx-1"
      >
        {page}
      </Label>
    ) : (
      <Button
        key={page}
        variant={variant}
        className="mx-1"
        onClick={() => onClick(page)}
      >
        {page}
      </Button>
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
    <div className="flex items-center gap-2 justify-center my-5">
      {currentPage !== 1 && (
        <Button
          variant={variant}
          className="mx-1"
          onClick={() => onClick(currentPage - 1)}
        >
          {"<"}
        </Button>
      )}

      {getPaginationRange().map(renderItem)}

      {currentPage !== totalPages && (
        <Button
          variant={variant}
          className="mx-1"
          onClick={() => onClick(currentPage + 1)}
        >
          {">"}
        </Button>
      )}
    </div>
  );
};

Pagination.displayName = "Pagination";
