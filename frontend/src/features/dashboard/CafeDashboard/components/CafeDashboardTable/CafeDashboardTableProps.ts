import CafeDatabaseModel from "@/services/models/databaseModels/CafeDatabaseModel";

interface CafeDashboardTableProps {
    cafes: CafeDatabaseModel[],
    onDeleteCafe: (cafeId: number) => void;
}

export default CafeDashboardTableProps;