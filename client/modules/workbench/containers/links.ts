import { connect } from 'react-redux';
import Quicklink from '../components/quicklinks/quicklink';

const mapStateToProps = () => ({
  data: [
    {
      id: 'ocwa',
      name: 'OCWA',
      icon: 'fas fa-exchange-alt',
      description: "Approve import requests and manage your export requests"
    },
    {
      id: 'ocwadl',
      name: 'OCWA',
      icon: 'fas fa-exchange-alt',
      description: "Approve exports requests and manage your import requests"
    },
    {
      id: 'projectsc',
      name: 'Code Sharing',
      icon: 'fas fa-code',
      description: "Use git to share code among your team projects"
    },
    {
      id: 'selfserve',
      name: 'Self Service',
      icon: 'fas fa-tasks',
      description: "Manage code sharing access and repository maintenance"
    }
  ],
});

export default connect(mapStateToProps)(Quicklink);
