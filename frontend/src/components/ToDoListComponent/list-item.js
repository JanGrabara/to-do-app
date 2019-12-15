import DateFnsUtils from "@date-io/date-fns";
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from 'react';
import {Button, ButtonGroup} from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
    },
    input: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

class ListItem extends React.Component {
    state = {
        editing: false,
        expanded: null,
        done: false,
        name: '',
        id: '',
        endDate: new Date("2014-08-18T21:11:54")
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState(
            {
                name: this.props.name,
                endDate: this.props.endDate
            }
        )
    }

    handleDateChange = date => {
        this.setState({ ...this.state, ['endDate']: date });
    };

    renderTasks() {
        const { name, isComplete, classes, endDate, done } = this.props;

        const taskStyle = {
            cursor: 'pointer',
            fontWeight: 'bold',
            color: isComplete ? '#54f446' : '#f43838'
        }


        const handleChangeForm = name => event => {
            this.setState({ ...this.state, [name]: event.target.checked, editing: true });
        };

        const handleChangeDescirption = name => event => {
            this.setState({ ...this.state, [name]: event.target.value });
        };

        if (this.state.editing) {
            return (
                <div key={name}>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.done}
                                    onChange={handleChangeForm('done')}
                                    value="checkedB"
                                    color="primary"
                                />
                            }
                            label="Completed"
                        />
                        <TextField id="standard-basic" label="Description" value={this.state.name} onChange={handleChangeDescirption('name')} />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Set end of the task"
                                value={this.state.endDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </FormGroup>
                </div>
            )
        }

        return (
            <Typography key={name}>
                {name}
                {endDate}
                {done}
            </Typography>
        )
    }

    renderButtons() {
        if (this.state.editing) {
            return (
                <div>
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick={this.handleToggleEdit.bind(this)}>Cancel</Button>
                        <Button onClick={this.handleDelete.bind(this)}>Delete</Button>
                        <Button onClick={this.handleEdit.bind(this)}>Edit</Button>
                    </ButtonGroup>
                </div>
            )
        }

        return (
            <div>
                <Button color="primary" onClick={this.handleToggleEdit.bind(this)}>Edit</Button>
            </div>
        )
    }
    render() {
        const { index } = this.props;
        const { expanded } = this.state;
        return (
            <ExpansionPanel key={index} expanded={expanded === 'panel' + (index + 1)} onChange={this.handleChange('panel' + (index + 1))}>
                <ExpansionPanelSummary>
                    {this.renderTasks()}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails key={index}>
                    {this.renderButtons()}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    //Change title colour on click
    handleToggleComplete() {
        const taskToToggle = this.props;
        this.props.toggleTask(taskToToggle);
    }

    // Will trigger deleteTask() in app.js
    handleDelete() {
        const taskId = this.props.id;
        this.props.deleteTask(taskId);
        this.handleToggleEdit();
    }

    handleEdit(event) {
        event.preventDefault();
        this.props.editTask(this.state);
        this.setState({ editing: false });
    }

    handleToggleEdit() {
        this.setState(prevState => ({ editing: !prevState.editing }));
    }
}

export default ListItem;