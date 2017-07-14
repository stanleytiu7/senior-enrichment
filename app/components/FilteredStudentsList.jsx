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
import {
  fetchCampuses
} from '../redux/campuses';

class FilteredStudentsList extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchInitialData();
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.deleteUser({
      id: this.props.student.id,
      ownProps: this.props.history.push('/students'),
      campusId: this.props.match.params.id
    });
  }


  render() {
    console.log('campuses', this.props.campuses);
    console.log('students', this.props.students);
    const id = this.props.match.params.id;
    console.log('id', id);
    const campuses = this.props.campuses.filter(campus => +campus.id === +id);
    const students = this.props.students.filter(student => +student.campusId === +id);
    console.log('students', students);

    return (

      <div>
        {campuses[0] && (<h1>{campuses[0].name} Students</h1>)}
        <hr />
        {campuses[0] && (<ul>{students.map(student => {
        return (
        <li key={student.id}>
          <div>
            <form onSubmit={evt => {this.handleSubmit(evt)}}>
              <Link className="student-link" to={`/campuses/${id}`}>
                <div className="col s12">{student.fullName}</div>
              </Link>
              <button type="submit">Remove Me</button>
          </form>
          </div>
        </li>
        )
        })
        }
    </ul>)}
    <Link to={`/campuses/${id}/add`}><button>Add to {campuses[0].name}</button></Link>
    </div>
    )
  }

}

const mapProps = state => ({
  campuses: state.campuses,
  students: state.students
});

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchCampuses())
    dispatch(fetchStudents())
  },

  deleteUser: ({
    id,
    ownProps,
    campusId
  }) => {
    dispatch(removeStudent(id))
      .then(ownProps.push(`/campuses/${campusId}`))
  }
});

export default connect(mapProps, mapDispatch)(FilteredStudentsList);
