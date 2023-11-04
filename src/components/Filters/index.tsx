import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  category,
  filterTypes,
  filterTypesMapping,
  mainCategoryMapping,
  tag,
} from "../../data/masterData";
import Badge from "../../components/Badge";
import { SECTION_GAP } from "../../helpers/general.helper";

interface FiltersProps {
  currentFilterType: keyof FilterInterface | null;
  filters: FilterInterface;
  onSelectFilterType: (filterType: keyof FilterInterface) => void;
  onSelectFilter: (filterType: keyof FilterInterface, filter: string) => void;
}

interface FilterWrapperProps {
  children: React.ReactNode;
}

export interface FilterInterface {
  main: string[];
  sub: string[];
  tag: string[];
}

const Filters: React.FC<FiltersProps> = ({
  currentFilterType,
  filters,
  onSelectFilterType,
  onSelectFilter,
}) => {
  const mainCategory = React.useMemo(() => Object.keys(category) as (keyof typeof category)[], []);

  const subCategory = React.useMemo(
    () => mainCategory.flatMap((categoryKey) => category[categoryKey]),
    []
  );

  const renderFilter = React.useCallback(() => {
    switch (currentFilterType) {
      case "main":
        return (
          <FilterWrapper key={`filter-main-wrapper`}>
            {mainCategory.map((item) => (
              <Badge
                key={`filter-main-${item}`}
                type="sub"
                title={mainCategoryMapping[item]}
                margin={2}
                active={filters.main.includes(item)}
                onPress={() => onSelectFilter("main", item)}
              />
            ))}
          </FilterWrapper>
        );
      case "sub":
        return (
          <FilterWrapper key={`filter-sub-wrapper`}>
            {subCategory.map((item) => (
              <Badge
                key={`filter-sub-${item}`}
                type="sub"
                title={item}
                margin={2}
                active={filters.sub.includes(item)}
                onPress={() => onSelectFilter("sub", item)}
              />
            ))}
          </FilterWrapper>
        );
      case "tag":
        return (
          <FilterWrapper key={`filter-tag-wrapper`}>
            {tag.map((item) => (
              <Badge
                key={`filter-tag-${item}`}
                type="sub"
                title={item}
                margin={2}
                active={filters.tag.includes(item)}
                onPress={() => onSelectFilter("tag", item)}
              />
            ))}
          </FilterWrapper>
        );
      default:
        null;
    }
  }, [currentFilterType, filters]);

  return (
    <>
      <FilterWrapper key={`filter-type-wrapper`}>
        {filterTypes.map((item) => (
          <Badge
            key={`filter-type-${item}`}
            type="main"
            title={filterTypesMapping[item as keyof FilterInterface]}
            margin={2}
            active={!!filters[item as keyof FilterInterface].length}
            selected={currentFilterType === item}
            onPress={() => onSelectFilterType(item as keyof FilterInterface)}
          />
        ))}
      </FilterWrapper>
      {renderFilter()}
    </>
  );
};

const FilterWrapper: React.FC<FilterWrapperProps> = ({ children }) => (
  <ScrollView
    horizontal
    style={styles["categories-container"]}
    showsHorizontalScrollIndicator={false}
  >
    {children}
  </ScrollView>
);

const styles = StyleSheet.create({
  "categories-container": {
    marginTop: SECTION_GAP / 1.5,
    flexGrow: 0,
  },
});

export default Filters;
