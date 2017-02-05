import { connect } from 'react-redux';
import Message from '../components/message';

const mapStateToProps = state => ({
  message: state.dog.hasBarked ? 'Theassda asddog sarkedad' : 'cabsTaaah dg didasda anot abark',
});

export default connect(mapStateToProps)(Message);
