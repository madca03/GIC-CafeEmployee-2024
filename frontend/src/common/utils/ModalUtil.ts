import Bus from "./EventBus";

const showConfirmation = (options: any) => Bus.$emit("newConfirmation", options);

export default {
    showConfirmation
}