import React, {Component} from "react";
import './todo-list-item.css';

export default class TodoListItem extends Component {

    state = {
        done: false,
        important: false
    };

    onLabelClick = () => {
        if (this.state.done) {
            this.setState({
                done: false
            });
            return;
        }
        this.setState({
            done: true
        });
    };

    onImportantButtonClick = () => {
      if (this.state.important) {
          this.setState({
              important: false
          });
          return;
      }
        this.setState({
            important: true
        });
    };

    render() {
        const { label } = this.props;
        const { done, important } = this.state;

        let classNames = 'todo-list-item-label';

        if (done)
            classNames += ' done';

        if (important)
            classNames += ' important';

        return (
            <span className={'todo-list-item'}>
                <span
                    className={classNames}
                    onClick={ this.onLabelClick }>
                    {label}
                </span>

                  <button type={'button'}
                          className={'btn btn-outline-success btn-sm float-right'}
                          onClick={ this.onImportantButtonClick }>
                      <i className={'fa fa-exclamation'}/>
                  </button>

                  <button type={'button'}
                          className={'btn btn-outline-danger btn-sm float-right'}>
                      <i className={'fa fa-trash-o'}/>
                  </button>
              </span>
        );
    };
}