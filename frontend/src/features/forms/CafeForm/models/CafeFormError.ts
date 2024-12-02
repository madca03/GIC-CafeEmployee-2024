interface CafeFormError {
    name: string | null,
    description: string | null,
    location: string | null
}

export const initialCafeFormError: CafeFormError = {
    name: null,
    description: null,
    location: null
}

export default CafeFormError;