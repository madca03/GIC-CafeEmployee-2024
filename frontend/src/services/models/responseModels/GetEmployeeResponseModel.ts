interface GetEmployeeResponseModel {
    employeeStringId: string,
    name: string,
    emailAddress: string,
    phoneNumber: string,
    daysWorked: number,
    cafe: string | null
}

export default GetEmployeeResponseModel;