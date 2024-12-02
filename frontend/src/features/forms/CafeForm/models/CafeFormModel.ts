interface CafeFormModel {
    name: string,
    description: string,
    location: string
}

export const initialCafeFormModel: CafeFormModel = {
    name: "",
    description: "",
    location: ""
}

export default CafeFormModel;