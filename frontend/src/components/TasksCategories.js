import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const TasksCategories = (props) => {

    const classes = useStyles();

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <div className={classes.root}>
            {props.groupedTasksByCategory.map((t, index) =>
                <Chip avatar={<Avatar>{t.taskCount}</Avatar>} label={t.categoryName} onClick={handleClick} />)}
        </div>
    );
}

export default TasksCategories;