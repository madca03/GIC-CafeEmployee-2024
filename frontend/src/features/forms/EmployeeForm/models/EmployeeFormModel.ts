interface EmployeeFormModel {
    name: string,
    emailAddress: string,
    phoneNumber: string,
    gender: string,
    cafeId: string
}

export const initialEmployeeFormModel: EmployeeFormModel = {
    name: "",
    emailAddress: "",
    phoneNumber: "",
    gender: "male",
    cafeId: ""
}

export default EmployeeFormModel;