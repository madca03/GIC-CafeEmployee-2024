import GetEmployeeRequestModel from "@/services/models/requestModels/GetEmployeeRequestModel";
import BaseAPIDataResponseModel from "@/services/models/responseModels/BaseAPIDataResponseModel";
import GetEmployeeResponseModel from "@/services/models/responseModels/GetEmployeeResponseModel";
import HttpUtil from "@/common/utils/HttpUtil";
import APIEndpoints from "@/common/constants/APIEndpoints";
import CreateEmployeeRequestModel from "@/services/models/requestModels/CreateEmployeeRequestModel";
import EmployeeDatabaseModel from "@/services/models/databaseModels/EmployeeDatabaseModel";
import UpdateEmployeeRequestModel from "@/services/models/requestModels/UpdateEmployeeRequestModel";
import EmployeeFormDetailResultModel from "@/services/models/responseModels/EmployeeFormDetailResultModel";

export default {
    getEmployees: (req?: GetEmployeeRequestModel): Promise<BaseAPIDataResponseModel<GetEmployeeResponseModel[]>> => {
        return HttpUtil.makeHTTPRequest({
            url: APIEndpoints.GetEmployees,
            method: 'get',
            payload: req
        });
    },

    getEmployee: (req: GetEmployeeRequestModel): Promise<BaseAPIDataResponseModel<EmployeeFormDetailResultModel>> => {
        return HttpUtil.makeHTTPRequest({
            url: APIEndpoints.GetEmployee,
            method: 'get',
            payload: req
        })
    },

    createEmployee: (req: CreateEmployeeRequestModel): Promise<BaseAPIDataResponseModel<EmployeeDatabaseModel>> => {
        return HttpUtil.makeHTTPRequest({
            url: APIEndpoints.CreateEmployee,
            method: 'post',
            payload: req
        })
    },

    deleteEmployee: (employeeId: string): Promise<BaseAPIDataResponseModel<boolean>> => {
        return HttpUtil.makeHTTPRequest({
            url: APIEndpoints.DeleteEmployee(employeeId),
            method: 'delete'
        })
    },

    updateEmployee: (employeeId: string, req: UpdateEmployeeRequestModel): Promise<BaseAPIDataResponseModel<EmployeeDatabaseModel>> => {
        return HttpUtil.makeHTTPRequest({
            url: APIEndpoints.UpdateEmployee(employeeId),
            method: 'put',
            payload: req
        })
    }
}