import GetCafeRequestModel from "@/services/models/requestModels/GetCafeRequestModel";
import HttpUtil from "@/common/utils/HttpUtil";
import APIEndpoints from "@/common/constants/APIEndpoints";
import BaseAPIDataResponseModel from "@/services/models/responseModels/BaseAPIDataResponseModel";
import CreateCafeRequestModel from "@/services/models/requestModels/CreateCafeRequestModel";
import CafeDatabaseModel from "@/services/models/databaseModels/CafeDatabaseModel";
import UpdateCafeRequestModel from "@/services/models/requestModels/UpdateCafeRequestModel";
import CafeResultModel from "@/services/models/responseModels/CafeResultModel";

export default {
    getCafes: (req?: GetCafeRequestModel): Promise<BaseAPIDataResponseModel<CafeResultModel[]>> => {
        return HttpUtil.makeHTTPRequest({
            url: APIEndpoints.GetCafes,
            method: 'get',
            payload: req
        })
    },

    createCafe: (req: CreateCafeRequestModel): Promise<BaseAPIDataResponseModel<CafeDatabaseModel>> => {
        const formData = new FormData();
        formData.append("Name", req.name);
        formData.append("Description", req.description);
        formData.append("Location", req.location);
        if (req.logo != null) formData.append("Logo", req.logo);

        return HttpUtil.makeHTTPRequest({
            url: APIEndpoints.CreateCafe,
            method: 'post',
            payload: formData
        })
    },

    deleteCafe: (cafeId: string): Promise<BaseAPIDataResponseModel<boolean>> => {
        return HttpUtil.makeHTTPRequest({
            url: APIEndpoints.DeleteCafe(cafeId),
            method: 'delete'
        })
    },

    updateCafe: (cafeId: string, req: UpdateCafeRequestModel): Promise<BaseAPIDataResponseModel<CafeDatabaseModel>> => {
        const formData = new FormData();
        formData.append("Name", req.name);
        formData.append("Description", req.description);
        formData.append("Location", req.location);
        if (req.logo != null) formData.append("Logo", req.logo);

        return HttpUtil.makeHTTPRequest({
            url: APIEndpoints.UpdateCafe(cafeId),
            method: 'put',
            payload: formData
        })
    }
}