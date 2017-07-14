import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  addStudent
} from '../redux/students';
import {
  fetchCampuses
} from '../redux/campuses';

class Add extends Component {
  constructor() {
    super()
    this.submitHandler = this.submitHandler.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      campusId: ''
    }

    this.firstChangeHandler = this.firstChangeHandler.bind(this);
    this.lastChangeHandler = this.lastChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
  }

  componentDidMount() {
    if (!this.props.campuses[0]) this.props.fetchInitialData();
  }
  firstChangeHandler(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  lastChangeHandler(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  emailChangeHandler(event) {
    this.setState({
      email: event.target.value
    });
  }

  selectHandler(event) {
    this.setState({
      campusId: event.target.value
    });
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.newStudent(this.state, this.props.history.push('/students'));
  }

  render() {
    return (
      <div>
      <form onSubmit={this.submitHandler}>
          <label >First Name: </label>
          <input
            value={this.state.firstName}
            onChange={this.firstChangeHandler}
            type="text"
            name="firstName" />
          <label>Last Name: </label>
          <input
            value={this.state.lastName}
            onChange={this.lastChangeHandler}
            type="text"
            name="lastName" />
          <label>Email: </label>
          <input
            value={this.state.email}
            onChange={this.emailChangeHandler}
            type="text"
            name="email" />
          <select onChange={this.selectHandler}>
            <option value="" />
            {this.props.campuses.map(el => {
             return <option value={el.id} key={el.id}>{el.name}</option>
            }
            )}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapProps = state => ({
  students: state.students,
  campuses: state.campuses
})
const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchCampuses());
  },
  newStudent: (student, ownProps) => {
    dispatch(addStudent(student))
      .then(ownProps)
  }
})

export default connect(mapProps, mapDispatch)(Add);
