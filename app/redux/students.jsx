import axios from 'axios';

const INITIALIZE = 'INITIALIZE_STUDENTS';
const CREATE = 'CREATE_STUDENT';
const REMOVE = 'REMOVE_STUDENT';
const UPDATE = 'UPDATE_STUDENT';

const init = students => ({
  type: INITIALIZE,
  students
})
const create = student => ({
  type: CREATE,
  student
})
const remove = student => ({
  type: REMOVE,
  student
})
const update = student => ({
  type: UPDATE,
  student
})

export default function reducer(students = [], action) {
  switch (action.type) {
    case INITIALIZE:
      return action.students;

    case CREATE:
      return [action.student, ...students];

    case REMOVE:
      return students.filter(student => student.id !== action.id);

    case UPDATE:
      return students.map(student => (action.student.id === student.id ? action.student : student));


    default:
      return students;

  }
}

export const fetchStudents = () => dispatch => {
  axios.get('/api/students')
    .then(res => {
       console.log('in redux/students, all the students: ', res.data);
      dispatch(init(res.data))
    });
};

// optimistic
export const removeStudent = id => dispatch => {
  dispatch(remove(id));
  axios.delete(`/api/students/${id}`)
    .catch(err => console.error(`Removing student: ${id} unsuccesful`, err));
};

export const addStudent = student => dispatch => {
  axios.post('/api/students', student)
    .then(res => dispatch(create(res.data)))
    .catch(err => console.error(`Creating student: ${student} unsuccesful`, err));
};

export const updateStudent = (id, student) => dispatch => {
  axios.put(`/api/students/${id}`, student)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Updating student: ${student} unsuccesful`, err));
};
