interface EmployeeFormError {
    name: string | null,
    emailAddress: string | null,
    phoneNumber: string | null,
    gender: string | null,
    cafeId: string | null
}

export const initialEmployeeFormError: EmployeeFormError = {
    name: null,
    emailAddress: null,
    phoneNumber: null,
    gender: null,
    cafeId: null
}

export default EmployeeFormError;