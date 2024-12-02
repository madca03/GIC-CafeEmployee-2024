export default {
    GetCafes: '/api/cafes',
    CreateCafe: '/api/cafe',
    DeleteCafe: (cafeId: number) => `/api/cafe/${cafeId}`,
    UpdateCafe: (cafeId: number) => `/api/cafe/${cafeId}`,
    GetEmployees: '/api/employees',
    GetEmployee: '/api/employee',
    CreateEmployee: '/api/employee',
    DeleteEmployee: (employeeId: string) => `/api/employee/${employeeId}`,
    UpdateEmployee: (employeeId: string) => `/api/employee/${employeeId}`
}