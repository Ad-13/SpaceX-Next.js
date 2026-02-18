import { BoolAndAll, DEFAULT_FILTER_VALUES, LaunchesFiltersFormValues } from "../../types/filters";
import { SortOption } from "../../types/launch";

export const UPCOMING_OPTIONS: { value: BoolAndAll; label: string }[] = [
  { value: "all", label: "All Launches" },
  { value: "true", label: "Upcoming Only" },
  { value: "false", label: "Past Only" },
];

export const SUCCESS_OPTIONS: { value: BoolAndAll; label: string }[] = [
  { value: "all", label: "All Outcomes" },
  { value: "true", label: "Success Only" },
  { value: "false", label: "Failure Only" },
];

export const SORT_BY_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "date-desc", label: "Date (Newest First)" },
  { value: "date-asc", label: "Date (Oldest First)" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

export function getInitialValues(searchParams: URLSearchParams): LaunchesFiltersFormValues {
  return {
    name: searchParams.get("name") ?? DEFAULT_FILTER_VALUES.name,
    upcoming:
      (searchParams.get("upcoming") as LaunchesFiltersFormValues["upcoming"]) ??
      DEFAULT_FILTER_VALUES.upcoming,
    success:
      (searchParams.get("success") as LaunchesFiltersFormValues["success"]) ??
      DEFAULT_FILTER_VALUES.success,
    dateFrom: searchParams.get("dateFrom") ?? DEFAULT_FILTER_VALUES.dateFrom,
    dateTo: searchParams.get("dateTo") ?? DEFAULT_FILTER_VALUES.dateTo,
    sortBy:
      (searchParams.get("sortBy") as LaunchesFiltersFormValues["sortBy"]) ??
      DEFAULT_FILTER_VALUES.sortBy,
  }
}
