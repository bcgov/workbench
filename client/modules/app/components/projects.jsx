import React, { Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import bs from 'main.css';
import styles from './styles.css';

class Projects extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className={cx(styles.container, bs.alignItemsCenter, bs.justifyContentCenter)}>
        <div className={cx(bs.listGroup)} style={{ width: '20rem'}}>
          <Link to="/air_quality_health" className={cx(bs.listGroupItem, bs.listGroupItemAction)}>
            Air Quality & Health
          </Link>
          <Link to="/education_and_training" className={cx(bs.listGroupItem, bs.listGroupItemAction)}>
            Education & Training Relationships
          </Link>
          <Link to="/image_analysis_vehicle_classification" className={cx(bs.listGroupItem, bs.listGroupItemAction)}>
            Image Analysis for Vehicle Classification
          </Link>
          <Link to="/web_content_classification" className={cx(bs.listGroupItem, bs.listGroupItemAction)}>
            Web Content Classification
          </Link>
        </div>
      </div>
    );
  }
}

export default Projects;
