import CafeResultModel from "@/services/models/responseModels/CafeResultModel";

interface CafeDashboardTableProps {
    cafes: CafeResultModel[],
    onDeleteCafe: (cafeId: string) => void;
}

export default CafeDashboardTableProps;