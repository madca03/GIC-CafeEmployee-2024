interface CreateCafeRequestModel {
    name: string,
    description: string,
    location: string,
    logo: File | null
}

export default CreateCafeRequestModel;