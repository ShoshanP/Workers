import { Card } from "@material-ui/core";
import { Button, Dialog, RadioGroup, TextField, FormControlLabel, Radio, Checkbox } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import employeeStore from "../store/employeeStore";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
const GENDER_ENUM = {
    MALE: 0,
    FEMALE: 1
};
const AddEmployeeForm = observer(({ handleClose, isOpen }) => {
    const currentEmployee = employeeStore.requiredEmployee;
    const { register, handleSubmit, control, setValue } = useForm();
    // const dialogContentRef = useRef(null);
    console.log(currentEmployee);

    useEffect(() => {
        setValue('firstName', currentEmployee?.firstName || '')
        setValue('lastName', currentEmployee?.lastName || '')
        setValue('idNumber', currentEmployee?.idNumber || '')
        setValue('dateSartingWork', currentEmployee?.dateSartingWork.split('T')[0] || '')
        setValue('dateOfBirth', currentEmployee?.dateSartingWork.split('T')[0] || '')
        setValue('gender', GENDER_ENUM.FEMALE )
        setValue('roles', currentEmployee?.roles || [])

    }, [currentEmployee, setValue]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "roles",
    });

    function onSubmit(data) {
        console.log(data);
        data.gender = parseInt(data.gender);
        if (currentEmployee)
        {
            const id = employeeStore.getIdByIdnumber(data.idNumber)
            employeeStore.changeData(id,data);
        }
        else
            employeeStore.addData(data);
        employeeStore.requiredEmployee.roles = [];
        employeeStore.requiredEmployee = undefined;

        handleClose();
    }

    // useEffect(() => {
    //     if (isOpen && dialogContentRef.current) {
    //         dialogContentRef.current.scrollTo(0, 0);
    //     }
    // }, [isOpen]);

    return (
        <Dialog onClose={handleClose} open={isOpen} fullWidth maxWidth="md">
            <Card
                component="form"
                sx={{
                    p: 3,
                    direction: 'rtl',


                }}
                onSubmit={handleSubmit(onSubmit)}
            // ref={dialogContentRef}
            >

                <label>First Name</label>
                <TextField
                    {...register('firstName', { required: true })}
                    type="text"

                />



                <label>Last Name</label>
                <TextField
                    {...register('lastName', { required: true })}
                    type="text"

                />



                <label>Id number</label>
                <TextField
                    {...register('idNumber', { required: true })}
                    type="text"
                />



                <label>Date Start Work</label>
                <TextField
                    {...register('dateSartingWork', { required: true })}
                    type="date"
                />



                <label>Birth Day</label>
                <TextField
                    {...register('dateOfBirth', { required: true })}
                    type="date"
                />



                <RadioGroup>
                    <FormControlLabel
                        value={GENDER_ENUM.MALE}
                        control={<Radio {...register('gender')} />}
                        label="Male"
                    />
                    <FormControlLabel
                        value={GENDER_ENUM.FEMALE}
                        control={<Radio {...register('gender')} />}
                        label="Female"
                    />
                </RadioGroup>


                <ul>
                    {fields.map((item, index) => (
                        <li key={item.id}>

                            <label>{`Role ${index + 1}`}</label>
                            <TextField
                                {...register(`roles.${index}.name`)}
                                type="text"
                            />

                            <FormControlLabel
                                control={<Checkbox {...register(`roles.${index}.isAdministrative`)} />}
                                label="Is Admin"
                            />

                            <label>Start Date</label>
                            <TextField
                                {...register(`roles.${index}.startDate`)}
                                type="date"
                            />

                            <Button type="button" onClick={() => remove(index)}>Remove</Button>
                        </li>
                    ))}
                </ul>

                <Button type="button" onClick={() => append({})}>Add Role</Button>

                <Button type="submit">Submit</Button>
            </Card>
        </Dialog>
    );
})
export default AddEmployeeForm;
