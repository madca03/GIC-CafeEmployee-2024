interface CafeFormModel {
    name: string,
    description: string,
    location: string,
    logo: string
}

export const initialCafeFormModel: CafeFormModel = {
    name: "",
    description: "",
    location: "",
    logo: ""
}

export default CafeFormModel;