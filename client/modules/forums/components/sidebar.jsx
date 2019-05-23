import React, { Component } from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import bs from 'main.css';
import Icon from 'components/icon';
import NewTopic from './new-topic';
import ProjectCategoryItem from './sidebar/project-category-item';
import DatasetCategory from '../containers/dataset-category';

const sidebarLinkStyle = cx(
  bs.listGroupItem,
  bs.listGroupItemAction,
  bs.dFlex,
  bs.justifyContentBetween,
  bs.alignItemsCenter,
  bs.bgDark,
  bs.textLight
);
const activeStyle = { backgroundColor: 'black' };

class Sidebar extends Component {
  componentDidMount() {
    const { fetchCategory, fetchCategories, projectId } = this.props;
    fetchCategory(projectId);
    fetchCategories();
  }

  render() {
    const { match, datasets, projects } = this.props;

    return (
      <div
        className={cx(bs.w25, bs.bgDark, bs.colorWhite)}
        style={{ overflowY: 'auto' }}
      >
        <div className={cx(bs.listGroup, bs.listGroupFlush)}>
          <div
            className={cx(
              bs.textLight,
              bs.dFlex,
              bs.justifyContentBetween,
              bs.alignItemsCenter,
              bs.px3,
              bs.pt3
            )}
          >
            <small
              className={bs.textUppercase}
              style={{ color: 'rgba(255, 255, 255, 0.25)' }}
            >
              Project Discussions
            </small>
            <NavLink
              to={{
                pathname: `${match.url}/new`,
                state: { isProject: true },
              }}
              className={cx(
                bs.btn,
                bs.btnLink,
                bs.btnSm,
                bs.textWhite,
                bs.bgDark
              )}
            >
              <Icon name="plus-square" />
            </NavLink>
          </div>
        </div>
        <div>
          <nav className={cx(bs.nav, bs.flexColumn)}>
            {projects.map(project => (
              <ProjectCategoryItem
                key={project.id}
                data={project}
                match={match}
              />
            ))}
          </nav>
        </div>
        <div className={cx(bs.listGroup, bs.listGroupFlush)}>
          <div
            className={cx(
              bs.textLight,
              bs.dFlex,
              bs.justifyContentBetween,
              bs.alignItemsCenter,
              bs.mt3,
              bs.px3,
              bs.pt3
            )}
          >
            <small
              className={bs.textUppercase}
              style={{ color: 'rgba(255, 255, 255, 0.25)' }}
            >
              Dataset Discussions
            </small>
            <NavLink
              to={{
                pathname: `${match.url}/new`,
                state: { isProject: false },
              }}
              className={cx(
                bs.btn,
                bs.btnLink,
                bs.btnSm,
                bs.textWhite,
                bs.bgDark
              )}
            >
              <Icon name="plus-square" />
            </NavLink>
          </div>
        </div>
        <nav className={cx(bs.nav, bs.flexColumn)}>
          {datasets.map(id => <DatasetCategory key={id} id={id} />)}
        </nav>
      </div>
    );
  }
}

export default Sidebar;
