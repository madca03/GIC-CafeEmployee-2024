import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import CafeDashboardPage from "../features/dashboard/CafeDashboard/pages/CafeDashboardPage";
import EmployeeDashboardPage from "../features/dashboard/EmployeeDashboard/pages/EmployeeDashboardPage";
import CafeFormPage from "../features/forms/CafeForm/pages/CafeFormPage";
import EmployeeFormPage from "../features/forms/EmployeeForm/pages/EmployeeFormPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                path: "",
                element: <CafeDashboardPage/>
            },
            {
                path: "cafe",
                children: [
                    {
                        path: ":cafeId/employees",
                        element: <EmployeeDashboardPage/>
                    },
                    {
                        path: "add",
                        element: <CafeFormPage/>
                    },
                    {
                        path: ":cafeId",
                        element: <CafeFormPage/>
                    }
                ]
            },
            {
                path: "employees",
                element: <EmployeeDashboardPage/>
            },
            {
                path: "employee",
                children: [
                    {
                        path: "add",
                        element: <EmployeeFormPage/>
                    },
                    {
                        path: ":employeeId",
                        element: <EmployeeFormPage/>
                    }
                ]
            }
        ]
    }
]);

export default router;