'use client';

import { TPaginationType } from '@/@types/Pagination';
import { useCharges } from '@/contexts/ChargesContext';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useCharge = (initialLimit = 10) => {
  const {
    charges,
    setCharges,
    isLoading,
    setIsLoading,
    chargesToView,
    setChargesToView,
    isLoadingService,

    updateChargeStatus,
    removeCharges,
    getCharges,
  } = useCharges();

  const [isConfirmDeletionOpen, setConfirmDeletionOpen] = useState(false);
  const [isChargesFormDialogOpen, setChargesFormDialogOpen] = useState(false);

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

  const fetchCharges = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: TPaginationType = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchDebounce,
      };

      const response = await getCharges(params);
      const { data, total, totalPages } = response;

      setCharges(data);
      setTotalItems(total);
      setTotalPages(totalPages);
    } catch (error) {
      setCharges([]);
      setTotalItems(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, searchDebounce, getCharges]);

  useEffect(() => {
    fetchCharges();
  }, [fetchCharges]);

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
    charges,
    isLoading,
    chargesToView,
    setChargesToView,
    isLoadingService,
    removeCharges,
    search,
    isConfirmDeletionOpen,
    setConfirmDeletionOpen,
    isChargesFormDialogOpen,
    setChargesFormDialogOpen,
    updateChargeStatus,
    handleSearchChange,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    totalPages,
    getPageNumbers,
    refetch: fetchCharges,
  };
};
