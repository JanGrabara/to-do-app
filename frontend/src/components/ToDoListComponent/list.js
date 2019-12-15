import React from 'react';
import ListBody from './list-body';
import ListHeader from './list-header';

class ListToDos extends React.Component {
render() {
    const props = this.props;

    return (
      <div>
        <ListHeader/>
        <ListBody tasks={this.props.taskList} {...props}/>
      </div>
    )
  }
}

export default ListToDos;