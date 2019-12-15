import React from 'react';
import ListItem from './list-item';

class ListBody extends React.Component {

  displayTasks() {
    const props = this.props 

    return this.props.tasks.map((task, index) =>
      <ListItem key={index} index={index} {...task} {...props} />
    );
  }

  render() {
    return (
      <div>
        {this.displayTasks()}
      </div>
    )
  }
}

export default ListBody;