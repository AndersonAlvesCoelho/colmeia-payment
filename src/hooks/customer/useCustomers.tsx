import { TPaginationType } from '@/@types/Pagination';
import { useCustomer } from '@/contexts/CustomerContext';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useCustomers = (initialLimit = 10) => {
  const {
    customers,
    setCustomers,
    isLoading,
    setIsLoading,
    customersToView,
    setCustomersToView,
    isLoadingService,

    removeCustomer,
    getCustomers,
  } = useCustomer();

  const [isConfirmDeletionOpen, setConfirmDeletionOpen] = useState(false);
  const [isCustomerFormDialogOpen, setCustomerFormDialogOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [searchDebounce, setSearchDebounce] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialLimit);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearchDebounce(value), 500),
    []
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    debouncedSearch(value);
    setCurrentPage(1);
  };

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: TPaginationType = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchDebounce,
      };

      const response = await getCustomers(params);
      const { data, total, totalPages } = response;

      setCustomers(data);
      setTotalItems(total);
      setTotalPages(totalPages);
    } catch (error) {
      setCustomers([]);
      setTotalItems(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, searchDebounce, getCustomers]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const getPageNumbers = () => {
    const pages: (number | -1)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== -1) {
        pages.push(-1);
      }
    }
    return pages;
  };

  return {
    customers,
    isLoading,
    customersToView,
    setCustomersToView,
    isLoadingService,
    removeCustomer,
    search,
    isConfirmDeletionOpen,
    setConfirmDeletionOpen,
    isCustomerFormDialogOpen,
    setCustomerFormDialogOpen,

    handleSearchChange,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    totalPages,
    getPageNumbers,
    refetch: fetchCustomers,
  };
};
