import {Button, Container} from "@mui/material";
import React, {useEffect, useState} from "react";
import EmployeeDashboardTable
    from "@/features/dashboard/EmployeeDashboard/components/EmployeeDashboardTable/EmployeeDashboardTable";
import GetEmployeeResponseModel from "@/services/models/responseModels/GetEmployeeResponseModel";
import EmployeeService from "@/services/EmployeeService";
import {useNavigate, useParams} from "react-router-dom";
import StringUtil from "@/common/utils/StringUtil";
import GetEmployeeRequestModel from "@/services/models/requestModels/GetEmployeeRequestModel";

const EmployeeDashboardPage = () => {
    const [employees, setEmployees] = useState<GetEmployeeResponseModel[]>([]);
    const navigate = useNavigate();
    const {cafeId} = useParams();

    const showEmployeesOfCafe = !StringUtil.isNullOrEmpty(cafeId);

    useEffect(() => {
        const req: GetEmployeeRequestModel = {};
        if (showEmployeesOfCafe) req.cafe = cafeId;

        EmployeeService.getEmployees(req)
            .then((res) => {
                setEmployees(res.data);
            })
    }, []);

    const onAddEmployee = () => {
        navigate("/employee/add");
    }

    const onDeleteEmployee = (employeeId: string) => {
        EmployeeService.deleteEmployee(employeeId)
            .then(() => {
                setEmployees((prevState) => (prevState.filter(x => x.employeeStringId !== employeeId)))
            });
    }

    return (
        <Container className="employee-dashboard-page">
            {!showEmployeesOfCafe && <Button variant="contained" onClick={onAddEmployee}>Add Employee</Button>}
            <EmployeeDashboardTable employees={employees}
                                    onDeleteEmployee={onDeleteEmployee}
                                    cafeId={cafeId}/>
        </Container>
    )
}

export default EmployeeDashboardPage;