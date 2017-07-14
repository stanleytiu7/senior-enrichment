 import axios from 'axios';

 /* -----------------    ACTIONS     ------------------ */

 const INITIALIZE = 'INITIALIZE_CAMPUSES';
 const CREATE = 'CREATE_CAMPUS';
 const UPDATE = 'UPDATE_CAMPUS';
 const REMOVE = 'REMOVE_CAMPUS';

 /* ------------   ACTION CREATORS     ------------------ */

 const init = campuses => ({
   type: INITIALIZE,
   campuses
 });
 const create = campus => ({
   type: CREATE,
   campus
 });
 const remove = id => ({
   type: REMOVE,
   id
 });
 const update = campus => ({
   type: UPDATE,
   campus
 });

 /* ------------       REDUCERS     ------------------ */

 export default function reducer(campuses = [], action) {
   switch (action.type) {

     case INITIALIZE:
       return action.campuses;

     case CREATE:
       return [action.campus, ...campuses];

     case REMOVE:
       return campuses.filter(campus => campus.id !== action.id);

     case UPDATE:
       return campuses.map(campus => (
         action.campus.id === campus.id ? action.campus : campus
       ));

     default:
       return campuses;
   }
 }

 /* ------------   THUNK CREATORS     ------------------ */

 export const fetchCampuses = () => dispatch => {
   axios.get('/api/campuses')
     .then(res => {
       console.log('in redux/campuses, all the campuses: ', res.data);
       dispatch(init(res.data))
     })
     .catch(err => console.error('Fetching campuses unsuccessful', err));
 };

 export const fetchCampus = (id) => dispatch => {
   axios.get(`/api/campuses/${id}`)
     .then(res => dispatch(update(res.data)))
     .catch(err => console.error('Fetching campus unsuccessful', err));
 };

 // optimistic
 export const removeCampus = id => dispatch => {
   dispatch(remove(id));
   axios.delete(`/api/campuses/${id}`)
     .catch(err => console.error(`Removing campus: ${id} unsuccessful`, err));
 };

 export const addCampus = campus => dispatch => {
   axios.post('/api/campuses', campus)
     .then(res => dispatch(create(res.data)))
     .catch(err => console.error(`Creating campus: ${campus} unsuccessful`, err));
 };

 export const updateCampus = (id, campus) => dispatch => {
   axios.put(`/api/campuses/${id}`, campus)
     .then(res => dispatch(update(res.data)))
     .catch(err => console.error(`Updating campus: ${campus} unsuccessful`, err));
 };
