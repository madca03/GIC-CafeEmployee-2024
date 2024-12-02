import GetCafeRequestModel from "@/services/models/requestModels/GetCafeRequestModel";
import HttpUtil from "@/common/utils/HttpUtil";
import APIEndpoints from "@/common/constants/APIEndpoints";
import BaseAPIDataResponseModel from "@/services/models/responseModels/BaseAPIDataResponseModel";
import CreateCafeRequestModel from "@/services/models/requestModels/CreateCafeRequestModel";
import CafeDatabaseModel from "@/services/models/databaseModels/CafeDatabaseModel";
import UpdateCafeRequestModel from "@/services/models/requestModels/UpdateCafeRequestModel";

export default {
    getCafes: (req?: GetCafeRequestModel): Promise<BaseAPIDataResponseModel<CafeDatabaseModel[]>> => {
        return HttpUtil.makeHTTPRequest({
            url: APIEndpoints.GetCafes,
            method: 'get',
            payload: req
        })
    },

    createCafe: (req: CreateCafeRequestModel): Promise<BaseAPIDataResponseModel<CafeDatabaseModel>> => {
        return HttpUtil.makeHTTPRequest({
            url: APIEndpoints.CreateCafe,
            method: 'post',
            payload: req
        })
    },

    deleteCafe: (cafeId: number): Promise<BaseAPIDataResponseModel<boolean>> => {
        return HttpUtil.makeHTTPRequest({
            url: APIEndpoints.DeleteCafe(cafeId),
            method: 'delete'
        })
    },

    updateCafe: (cafeId: number, req: UpdateCafeRequestModel): Promise<BaseAPIDataResponseModel<CafeDatabaseModel>> => {
        return HttpUtil.makeHTTPRequest({
            url: APIEndpoints.UpdateCafe(cafeId),
            method: 'put',
            payload: req
        })
    }
}