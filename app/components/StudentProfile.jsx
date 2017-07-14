import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  removeStudent,
  fetchStudents
} from '../redux/students';
import {
  fetchCampuses
} from '../redux/campuses';

class StudentProfile extends Component {

  componentDidMount() {
    this.props.fetchInitialStudent();
  }

  render() {
    const filteredStudent = this.props.students.filter(student => +student.id === +this.props.match.params.id);
    const id = filteredStudent[0].campusId;
    console.log(id);
    const filteredCampus = this.props.campuses.filter(campus => +campus.id === +id);

    return (
      <div>
        {filteredStudent[0] ?
          (<div>
              <div className="col s12">{filteredStudent[0].fullName}</div>
              <div className="col s12">{filteredStudent[0].email}</div>
              <div className="col s12">{filteredStudent[0].id}</div>
              <div>{filteredCampus[0].name}</div>
            </div>)
          :
          (<div>Something Happened</div>)}
      </div>
    )
  }
}

const mapProps = state => ({
  students: state.students,
  campuses: state.campuses
});

const mapDispatch = dispatch => ({
  fetchInitialStudent: () => {
    dispatch(fetchCampuses());
    dispatch(fetchStudents());
  },
  deleteUser: () => {
    dispatch(removeStudent(this.props.students.id));
  }
})

export default connect(mapProps, mapDispatch)(StudentProfile);
