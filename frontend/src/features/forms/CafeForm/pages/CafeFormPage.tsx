import React, {useEffect, useState} from "react";
import {Box, Button, FormControl} from "@mui/material";
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

const CafeFormPage = () => {
    const [formDetails, setFormDetails] = useState<CafeFormModel>(initialCafeFormModel);
    const [formErrorMessage, setFormErrorMessage] = useState<CafeFormError>(initialCafeFormError);
    const [isDirty, setIsDirty] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const {cafeId} = useParams();

    useEffect(() => {
        if (!StringUtil.isNullOrEmpty(cafeId)) {
            setIsEdit(true);
            CafeService.getCafes({id: +cafeId!})
                .then((res) => {
                    const cafe = res.data[0];
                    setFormDetails({
                        name: cafe.name,
                        location: cafe.location,
                        description: cafe.description
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

        if (isEdit) {
            CafeService.updateCafe(+cafeId!, formDetails)
                .then(() => {
                    // show success alert
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                })
        }
        else {
            CafeService.createCafe(formDetails)
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

    return (
        <Box component="form"
             className="cafe-form-page">
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

            <FormControl>
                <Grid>
                    <Button variant="contained" onClick={onAddOrEditCafe}>{isEdit ? 'Edit' : 'Add'} Cafe</Button>
                    <Button variant="contained" onClick={onClickCancel}>Cancel</Button>
                </Grid>
            </FormControl>
        </Box>
    )
}

export default CafeFormPage;