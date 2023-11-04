import React from "react";
import { FilterInterface } from ".";

const useFilters = () => {
  const [selectedTab, setSelectedTab] = React.useState<keyof FilterInterface | null>(null);
  const [filters, setFilters] = React.useState<FilterInterface>({
    main: [],
    sub: [],
    tag: [],
  });

  const onSelectFilterType = React.useCallback((filterType: keyof FilterInterface) => {
    setSelectedTab((currentTab) => (currentTab === filterType ? null : filterType));
  }, []);

  const onSelectFilter = React.useCallback((filterType: keyof FilterInterface, filter: string) => {
    setFilters((currentFilters) => {
      if (currentFilters[filterType].includes(filter))
        return {
          ...currentFilters,
          [filterType]: currentFilters[filterType].filter(
            (filteredItem) => filteredItem !== filter
          ),
        };
      return { ...currentFilters, [filterType]: [...currentFilters[filterType], filter] };
    });
  }, []);

  const isOpen = React.useMemo<boolean>(() => !!selectedTab, [selectedTab]);

  return { currentFilterType: selectedTab, filters, onSelectFilterType, onSelectFilter, isOpen };
};

export default useFilters;
