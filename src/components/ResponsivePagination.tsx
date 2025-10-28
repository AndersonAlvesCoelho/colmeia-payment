import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ResponsivePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  getPageNumbers: () => (number | -1 | -2)[];
}

export const ResponsivePagination = ({
  totalItems,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  totalPages,
  onPageChange,
  getPageNumbers,
}: ResponsivePaginationProps) => {
  return (
    <div className="mt-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
      {/* Itens por página */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Total: {totalItems}
        </span>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <span className="text-sm text-muted-foreground">itens por página</span>
      </div>

      {/* Paginação */}
      <div className="w-full md:w-auto flex justify-center">
        <Pagination>
          <PaginationContent className="flex flex-col lg:flex-row gap-2 items-center ">
            <PaginationItem className="hidden lg:block">
              <PaginationPrevious
                onClick={() => onPageChange(currentPage - 1)}
                className={
                  currentPage === 1
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>

            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === -1 || page === -2 ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => onPageChange(page)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
            </div>

            <PaginationItem className="hidden lg:block">
              <PaginationNext
                onClick={() => onPageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>

            <div className="flex items-center gap-2 lg:hidden ml-2">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(currentPage - 1)}
                  className={
                    currentPage === 1
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => onPageChange(currentPage + 1)}
                  className={
                    currentPage === totalPages
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </div>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Página atual */}
      <div className="text-sm text-muted-foreground text-center md:text-right w-full md:w-auto">
        Página {currentPage} de {totalPages}
      </div>
    </div>
  );
};
