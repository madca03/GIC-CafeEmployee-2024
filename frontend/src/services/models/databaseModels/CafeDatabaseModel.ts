interface CafeDatabaseModel {
    id: number,
    cafeStringId: string,
    name: string,
    description: string,
    logo?: string,
    location: string
}

export default CafeDatabaseModel;