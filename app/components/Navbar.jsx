import React, {
  Component
} from 'react';
import { connect } from 'react-redux';
import history from '../history';                       
import { Link, NavLink, withRouter } from 'react-router-dom';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
     <div className="container">
       <div className="navbar-header">
         <button
           type="button"
           className="navbar-toggle collapsed"
           data-toggle="collapse"
           data-target=".navbar-collapse">
           <span className="icon-bar" />
           <span className="icon-bar" />
           <span className="icon-bar" />
         </button>
         <Link className="navbar-brand" to="/"><img src="/images/logo.png" /></Link>
       </div>
       <div className="collapse navbar-collapse">
         <ul className="nav navbar-nav">
           <li>
             <NavLink to="/campuses" activeClassName="active">Campuses</NavLink>
           </li>
           <li>
             <NavLink to="/students" activeClassName="active">Students</NavLink>
           </li>
         </ul>
         { this.props.currentUser ? this.renderLogout() : this.renderLoginSignup() }
       </div>
     </div>
   </nav>
    );
  }
}

const mapProps = () => {}

const mapDispatch = () => {}

export default withRouter(connect(mapProps, mapDispatch))(Navbar);
