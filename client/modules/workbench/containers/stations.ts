import { connect } from 'react-redux';
import Stations from '../components/dashboard/stations';

const mapStateToProps = () => ({
  data: [
    {
      id: 1,
      name: 'JupyterLab',
      logoImageUrl: '/assets/images/logo-jupyterlab.png',
    },
    {
      id: 2,
      name: 'R Studio',
      logoImageUrl: '/assets/images/logo-r-studio.png',
    },
    {
      id: 3,
      name: 'Windows',
      logoImageUrl: '/assets/images/logo-virtual-machine.png',
    },
    {
      id: 4,
      name: 'LinuxLT',
      logoImageUrl: '/assets/images/logo-virtual-machine.png',
    },
    {
      id: 5,
      name: 'LinuxBG',
      logoImageUrl: '/assets/images/logo-virtual-machine.png',
    },
  ],
});

export default connect(mapStateToProps)(Stations);
