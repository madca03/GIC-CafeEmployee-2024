const isNullOrEmpty = (m: string | null | undefined) => {
    return typeof m !== 'string' || m.length === 0;
}

const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const crypto = window.crypto;
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);

        const r = array[0] * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}

export default {
    isNullOrEmpty,
    generateUUID
}