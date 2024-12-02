import React, {useEffect, useState} from "react";
import {Box, Button, FormControl, FormHelperText, Paper, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputTextBox from "@/components/InputTextBox/InputTextBox";
import "./CafeFormPage.scss";
import {useNavigate, useParams} from "react-router-dom";
import CafeFormModel, {initialCafeFormModel} from "@/features/forms/CafeForm/models/CafeFormModel";
import ValidationUtil from "@/common/utils/ValidationUtil";
import CafeFormError, {initialCafeFormError} from "@/features/forms/CafeForm/models/CafeFormError";
import CafeService from "@/services/CafeService";
import StringUtil from "@/common/utils/StringUtil";
import ModalUtil from "@/common/utils/ModalUtil";
import CreateCafeRequestModel from "@/services/models/requestModels/CreateCafeRequestModel";
import UpdateCafeRequestModel from "@/services/models/requestModels/UpdateCafeRequestModel";

const CafeFormPage = () => {
    const [formDetails, setFormDetails] = useState<CafeFormModel>(initialCafeFormModel);
    const [formErrorMessage, setFormErrorMessage] = useState<CafeFormError>(initialCafeFormError);
    const [isDirty, setIsDirty] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const {cafeId} = useParams();

    const hasFileError = !StringUtil.isNullOrEmpty(formErrorMessage.logo);

    useEffect(() => {
        if (!StringUtil.isNullOrEmpty(cafeId)) {
            setIsEdit(true);
            CafeService.getCafes({id: cafeId!})
                .then((res) => {
                    const cafe = res.data[0];
                    setFormDetails({
                        name: cafe.name,
                        location: cafe.location,
                        description: cafe.description,
                        logo: cafe.logo
                    })
                })
        }
    }, []);

    const onClickCancel = () => {
        if (isDirty) {
            ModalUtil.showConfirmation({
                title: "Confirm",
                description: "There are unsaved changes. Are you sure you want to discard them?",
                onConfirm: () => {
                    navigate("/");
                }
            })
        }
        else {
            navigate("/");
        }
    }

    const onAddOrEditCafe = () => {
        setFormErrorMessage(initialCafeFormError);
        const [isValid, errorMessages] = ValidationUtil.isValidCafe(formDetails);
        if (!isValid) {
            for (const [k,v] of Object.entries(errorMessages)) {
                setFormErrorMessage((prevState) => ({...prevState, [k]: v}))
            }
            return;
        }

        if (file != null) {
            const fileSizeInBytes = file!.size;
            const fileSizeInMB = (fileSizeInBytes / (1024 * 1024))

            if (fileSizeInMB > 2) {
                setFormErrorMessage((prevState) => ({...prevState, logo: "File should be at most 2 MB"}));
                return;
            }
        }

        if (isEdit) {
            const req: UpdateCafeRequestModel = {
                name: formDetails.name,
                location: formDetails.location,
                description: formDetails.description
            }

            if (file != null) req.logo = file;

            CafeService.updateCafe(cafeId!, req)
                .then(() => {
                    // show success alert
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                })
        }
        else {
            const req: CreateCafeRequestModel = {
                name: formDetails.name,
                location: formDetails.location,
                description: formDetails.description,
                logo: file
            }

            CafeService.createCafe(req)
                .then(() => {
                    // show success alert
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                })
        }
    }

    const onChangeFilter = (inputType: string) => (val: any) => {
        setIsDirty(true);
        switch (inputType) {
            case 'name':
                setFormDetails((prevState) => ({...prevState, name: val}));
                break;
            case 'description':
                setFormDetails((prevState) => ({...prevState, description: val}));
                break;
            case 'location':
                setFormDetails((prevState) => ({...prevState, location: val}));
                break;
        }
    }

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files![0];

        if (selectedFile) {
            setFile(selectedFile!);
        }
    }

    return (
        <Paper component="form" elevation={5} sx={{ p: 2 }} className="cafe-form-page">
            <Stack spacing={2}>
                <Typography variant="h5">{isEdit ? 'Edit' : 'Add'} Cafe</Typography>
                <InputTextBox label="Name"
                              value={formDetails.name}
                              onInput={onChangeFilter('name')}
                              errorMessage={formErrorMessage.name}/>
                <InputTextBox label="Description"
                              value={formDetails.description}
                              onInput={onChangeFilter('description')}
                              errorMessage={formErrorMessage.description}/>
                <InputTextBox label="Location"
                              value={formDetails.location}
                              onInput={onChangeFilter('location')}
                              errorMessage={formErrorMessage.location}/>

                <FormControl error={hasFileError} variant="standard">
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={onSelectFile}
                        />
                    </Button>
                    {hasFileError && <FormHelperText>{formErrorMessage.logo}</FormHelperText>}
                </FormControl>

                {file !== null && <img style={{ width: '400px' }} src={URL.createObjectURL(file)}/>}
                {!StringUtil.isNullOrEmpty(formDetails.logo) && file === null && <img src={`data:image/png;base64,${formDetails.logo}`}/>}

                <FormControl>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={onAddOrEditCafe}>{isEdit ? 'Edit' : 'Add'} Cafe</Button>
                        <Button variant="contained" onClick={onClickCancel}>Cancel</Button>
                    </Stack>
                </FormControl>
            </Stack>
        </Paper>
    )
}

export default CafeFormPage;