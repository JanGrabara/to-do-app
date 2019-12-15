
import DateFnsUtils from "@date-io/date-fns";
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Button from '@material-ui/core/Button';
import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
        display: 'flex'
    },
}));


const CreateTask = (props) => {

    const classes = useStyles();

    const [task, setTask] = useState(
        {
            name: '',
            endDate: new Date("2014-08-18T21:11:54"),
            categoryId: ''
        }
    )

    const handleChangeForm = name => event => {
        setTask({ ...task, [name]: event.target.value });
    };

    const handleDateChange = date => {
        setTask({ ...task, ['endDate']: date });
    };

    const handleSave = (event) => {
        event.preventDefault();
        // this.props.saveTask(this.state);
    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Description" onChange={handleChangeForm('name')} />
                <TextField type="number" id="standard-basic" label="Category id" onChange={handleChangeForm('categoryId')} />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Set end of the task"
                        value={task.endDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                    />
                </MuiPickersUtilsProvider>
                <div>
                    <Button type="submit" variant="contained" onClick={() => props.saveTask(task)} >Save</Button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask;