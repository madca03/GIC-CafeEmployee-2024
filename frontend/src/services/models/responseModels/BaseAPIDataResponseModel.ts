import BaseAPIResponseModel from "@/services/models/responseModels/BaseAPIResponseModel";

interface BaseAPIDataResponseModel<T> extends BaseAPIResponseModel {
    data: T
}

export default BaseAPIDataResponseModel;