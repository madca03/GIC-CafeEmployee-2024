import EmployeeFormModel, {initialEmployeeFormModel} from "@/features/forms/EmployeeForm/models/EmployeeFormModel";
import React, {useEffect, useState} from "react";
import EmployeeFormError, {initialEmployeeFormError} from "@/features/forms/EmployeeForm/models/EmployeeFormError";
import {useNavigate, useParams} from "react-router-dom";
import StringUtil from "@/common/utils/StringUtil";
import EmployeeService from "@/services/EmployeeService";
import ModalUtil from "@/common/utils/ModalUtil";
import InputTextBox from "@/components/InputTextBox/InputTextBox";
import {Box, Button, FormControl} from "@mui/material";
import Grid from "@mui/material/Grid2";
import "./EmployeeFormPage.scss";
import RadioInput from "@/components/RadioInput/RadioInput";
import CafeDatabaseModel from "@/services/models/databaseModels/CafeDatabaseModel";
import CafeService from "@/services/CafeService";
import SelectInput from "@/components/SelectInput/SelectInput";
import ValidationUtil from "@/common/utils/ValidationUtil";

const genderOptions = [
    {value: "female", text: "Female"},
    {value: "male", text: "Male"}
]

const EmployeeFormPage = () => {
    const [formDetails, setFormDetails] = useState<EmployeeFormModel>(initialEmployeeFormModel);
    const [formErrorMessage, setFormErrorMessage] = useState<EmployeeFormError>(initialEmployeeFormError);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [cafes, setCafes] = useState<CafeDatabaseModel[]>([]);
    const navigate = useNavigate();
    const {employeeId} = useParams();

    const cafeOptions = cafes.map(x => ({ value: x.cafeStringId, text: x.name }));

    useEffect(() => {
        if (!StringUtil.isNullOrEmpty(employeeId)) {
            setIsEdit(true);
            EmployeeService.getEmployee({employeeStringId: employeeId})
                .then((res) => {
                    setFormDetails(res.data);
                })
        }

        CafeService.getCafes()
            .then((res) => {
                setCafes(res.data);
            })
    }, []);

    const onClickCancel = () => {
        if (isDirty) {
            ModalUtil.showConfirmation({
                title: "Confirm",
                description: "There are unsaved changes. Are you sure you want to discard them?",
                onConfirm: () => {
                    navigate("/employees");
                }
            })
        }
        else {
            navigate("/employees");
        }
    }

    const onAddOrEditEmployee = () => {
        setFormErrorMessage(initialEmployeeFormError);
        const [isValid, errorMessages] = ValidationUtil.isValidEmployee(formDetails);
        if (!isValid) {
            for (const [k,v] of Object.entries(errorMessages)) {
                setFormErrorMessage((prevState) => ({...prevState, [k]: v}))
            }
            return;
        }

        if (isEdit) {
            EmployeeService.updateEmployee(employeeId!, formDetails)
                .then(() => {
                    // show success alert
                    setTimeout(() => {
                        navigate("/employees");
                    }, 2000);
                })
        }
        else {
            EmployeeService.createEmployee(formDetails)
                .then(() => {
                    // show success alert
                    setTimeout(() => {
                        navigate("/employees");
                    }, 2000)
                })
        }
    }

    const onChangeFilter = (inputType: string) => (val: any) => {
        setIsDirty(true);
        switch (inputType) {
            case 'name':
            case 'emailAddress':
            case 'phoneNumber':
            case 'gender':
            case 'cafeId':
                setFormDetails((prevState) => ({...prevState, [inputType]: val}));
                break;
        }
    }

    return (
        <Box component="form"
             className="employee-form-page">
            <InputTextBox label="Name"
                          value={formDetails.name}
                          onInput={onChangeFilter('name')}
                          errorMessage={formErrorMessage.name}/>
            <InputTextBox label="Email Address"
                          value={formDetails.emailAddress}
                          onInput={onChangeFilter('emailAddress')}
                          errorMessage={formErrorMessage.emailAddress}/>
            <InputTextBox label="Phone Number"
                          value={formDetails.phoneNumber}
                          onInput={onChangeFilter('phoneNumber')}
                          errorMessage={formErrorMessage.phoneNumber}/>
            <RadioInput label="Gender"
                        value={formDetails.gender}
                        options={genderOptions}
                        onInput={onChangeFilter('gender')}
                        errorMessage={formErrorMessage.gender}/>
            <SelectInput label="Cafe"
                         value={formDetails.cafeId}
                         options={cafeOptions}
                         onInput={onChangeFilter('cafeId')}
                         errorMessage={formErrorMessage.cafeId}/>

            <FormControl>
                <Grid>
                    <Button variant="contained" onClick={onAddOrEditEmployee}>{isEdit ? 'Edit' : 'Add'} Employee</Button>
                    <Button variant="contained" onClick={onClickCancel}>Cancel</Button>
                </Grid>
            </FormControl>
        </Box>
    )
}

export default EmployeeFormPage;