interface CafeFormError {
    name: string | null,
    description: string | null,
    location: string | null,
    logo: string | null,
}

export const initialCafeFormError: CafeFormError = {
    name: null,
    description: null,
    location: null,
    logo: null
}

export default CafeFormError;