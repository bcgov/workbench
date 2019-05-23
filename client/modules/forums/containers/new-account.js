import { connect } from 'react-redux';

import NewAccount from '../components/new-account';
import { clearNewUser, createUser } from '../actions';

const mapStateToProps = state => ({
  userStatus: state.forums.viewState.userStatus,
  errors: state.forums.viewState.newUserErrors,
  usernames: state.researchers.ids
    .map(id => state.researchers.entities[id])
    .map(user => user.username),
});

export default connect(mapStateToProps, {
  onSubmit: createUser,
  onResetNewUserForm: clearNewUser,
})(NewAccount);
