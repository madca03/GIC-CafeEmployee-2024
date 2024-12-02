import React, {useEffect, useRef, useState} from "react";
import {Subject, Subscription} from "rxjs";
import Bus from "../../common/utils/EventBus";
import StringUtil from "@/common/utils/StringUtil";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const AlertDialog = () => {
    const [hidden, setHidden] = useState(true);
    const [title, setTitle] = useState<string | null>("");
    const [description, setDescription] = useState<string | null>("");
    const [validationText, setValidationText] = useState<string | null>("");
    const [cancellationText, setCancellationText] = useState<string | null>("");
    const [id, setId] = useState<string | null>(null);
    const callbackSubject$ = useRef(new Subject());
    const subscription = useRef<Subscription | null>(null);

    useEffect(() => {
        Bus.$on("newConfirmation", (options: Record<string, any>) => {
            const defaults = {
                id: StringUtil.generateUUID(),
                title: "Confirm",
                description: null,
                validationText: "Confirm",
                cancellationText: "Cancel",
                onConfirm() {
                    return;
                },
                onDismiss() {
                    return;
                }
            };
            options = Object.assign(defaults, options);

            setId(options.id);
            setTitle(options.title);
            setDescription(options.description);
            setValidationText(options.validationText);
            setCancellationText(options.cancellationText);
            setHidden(false);

            subscription.current = callbackSubject$.current!.subscribe({
                next: (action: any) => {
                    switch (action) {
                        case "close":
                        case "cancel": {
                            setHidden(true);
                            options.onDismiss();
                            break;
                        }
                        case "validate": {
                            setHidden(true);
                            options.onConfirm();
                            break;
                        }
                    }
                }
            })
        })
    }, []);

    useEffect(() => {
        if (hidden && !StringUtil.isNullOrEmpty(id)) {
            subscription.current!.unsubscribe();
            Bus.$emit("closedConfirmation", {id})
        }
    }, [hidden]);

    const onClose = () => {
        callbackSubject$.current!.next("close");
    }

    const onValidate = () => {
        callbackSubject$.current!.next("validate");
    }

    return (
        <Dialog
            open={!hidden}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{cancellationText}</Button>
                <Button onClick={onValidate} autoFocus>
                    {validationText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog;