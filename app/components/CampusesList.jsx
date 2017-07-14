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
  fetchCampuses
} from '../redux/campuses';

class CampusesList extends Component {
  componentDidMount() {
    if (!this.props.campuses[0]) this.props.fetchInitialCampuses();
  }
  render() {
    const campuses = this.props.campuses;
    return (
      <div>
        <h1>Campuses</h1>
        <hr />
      <ul>{campuses.map(campus => {
        return (
        <li key={campus.id}>
            <div>
              <Link className="student-link" to={`/campuses/${campus.id}`}>
                <div className="col s12">{campus.name}</div>
              </Link>
            </div>
        </li>
        )
      })}
    </ul>
  </div>
    )
  }
}

const mapProps = state => ({
  campuses: state.campuses
})
const mapDispatch = dispatch => ({
  fetchInitialCampuses: () => {
    dispatch(fetchCampuses());
  }
});

export default connect(mapProps, mapDispatch)(CampusesList);
