import CafeFilter from "@/features/dashboard/CafeDashboard/models/CafeFilter";

interface CafeDashboardFilterProps {
    filter: CafeFilter,
    onClickSearch: (filter: CafeFilter) => void;
    onClickClear: () => void;
}

export default CafeDashboardFilterProps;