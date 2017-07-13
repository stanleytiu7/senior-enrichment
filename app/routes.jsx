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
import {
  fetchCampuses
} from './redux/campuses';
import {
  fetchStudents
} from './redux/students';

class Routes extends Component {

  componentDidMount() {
    this.props.fetchInitialData();
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Root>
            <Route exact path="/" component={Home} />
          </Root>
        </Switch>
      </Router>
    );
  }
}

//===========================================

const mapProps = (state) => ({
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
