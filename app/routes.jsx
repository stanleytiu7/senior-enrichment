import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import history from './history';

import Root from './components/Root';
import Home from './components/Home';
import StudentsList from './components/StudentsList';
import CampusesList from './components/CampusesList';
import FilteredStudentsList from './components/FilteredStudentsList';
import StudentProfile from './components/StudentProfile';
import Add from './components/Add';
import FilteredAdd from './components/FilteredAdd';


import {
  fetchCampuses
} from './redux/campuses';
import {
  fetchStudents
} from './redux/students';

class Routes extends Component {

  componentDidMount() {
    if (!this.props) this.props.fetchInitialData();
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/campuses/:id/add" component={FilteredAdd} />
            <Route exact path="/campuses/:id" component={FilteredStudentsList} />
            <Route exact path="/students/add" component={Add} />

            <Route exact path="/students/:id" component={StudentProfile} />
            <Route exact path="/campuses" component={CampusesList} />
            <Route exact path="/students" component={StudentsList} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

//===========================================

const mapProps = state => ({
  students: state.students,
  campuses: state.campuses
});

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchCampuses());
    dispatch(fetchStudents());
  }
});

export default connect(mapProps, mapDispatch)(Routes);
