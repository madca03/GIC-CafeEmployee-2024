import GetEmployeeResponseModel from "@/services/models/responseModels/GetEmployeeResponseModel";

interface EmployeeDashboardTableProps {
    employees: GetEmployeeResponseModel[],
    onDeleteEmployee: (employeeId: string) => void,
    cafeId?: string | null
}

export default EmployeeDashboardTableProps;