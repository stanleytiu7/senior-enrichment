import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  Link
} from 'react-router-dom';
import {
  fetchStudents,
  removeStudent
} from '../redux/students';

class StudentsList extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.students[0]) this.props.fetchInitialData();

  }

  handleSubmit(evt, id) {
    evt.preventDefault();
    this.props.deleteUser(id, this.props.history.push('/students'));
  }

  render() {
    console.log('in studentslist', this.props.students);
    const students = this.props.students;

    return (
      <div>
        <h1>Students</h1>
        <hr />
      <ul>{students.map(student => {
        return (
        <li key={student.id}>
          <div>
            <form onSubmit={(evt) => {this.handleSubmit(evt, student.id)}}>
              <Link to={`/students/${student.id}`}>
                <div className="col s12">{student.fullName}</div>
              </Link>
              <button type="submit">Remove Me</button>
            </form>
          </div>
        </li>
        )
      })}
    </ul>
    <div>
      <Link to="/students/add">
          <button type="submit">
            Add a Student
        </button>
      </Link>
    </div>
      </div>
    )
  }
}

const mapProps = state => ({
  students: state.students
});

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchStudents());
  },
  deleteUser: (id, ownProps) => {
    dispatch(removeStudent(id))
      .then(ownProps.push('/students'))
  }
});

export default connect(mapProps, mapDispatch)(StudentsList);
