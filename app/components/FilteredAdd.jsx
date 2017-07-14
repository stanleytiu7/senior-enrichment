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

class FilteredAdd extends Component {
  componentDidMount() {
    if (!this.props.campuses[0]) this.props.fetchInitialData();
  }
  constructor(props) {
    super(props)
    this.submitHandler = this.submitHandler.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      campusId: this.props.match.params.id
    }

    this.firstChangeHandler = this.firstChangeHandler.bind(this);
    this.lastChangeHandler = this.lastChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
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

  submitHandler(event) {
    event.preventDefault();
    this.props.newStudent(this.state, this.props.history.push(`/campuses/${this.state.campusId}`));
  }

  render() {
    const selectedCampus = this.props.campuses.filter(campus => campus.id === this.props.match.params.id)
    return (
      <div>
        <h1>Add a Student to {selectedCampus[0].name}</h1>
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
          )
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
    dispatch(fetchCampuses())
  },
  newStudent: (student, ownProps) => {
    dispatch(addStudent(student))
      .then(ownProps.push('/students'))
  }
})

export default connect(mapProps, mapDispatch)(FilteredAdd);
