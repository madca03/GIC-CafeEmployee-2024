export default {
    GetCafes: '/api/cafes',
    CreateCafe: '/api/cafe',
    DeleteCafe: (cafeId: string) => `/api/cafe/${cafeId}`,
    UpdateCafe: (cafeId: string) => `/api/cafe/${cafeId}`,
    GetEmployees: '/api/employees',
    GetEmployee: '/api/employee',
    CreateEmployee: '/api/employee',
    DeleteEmployee: (employeeId: string) => `/api/employee/${employeeId}`,
    UpdateEmployee: (employeeId: string) => `/api/employee/${employeeId}`
}