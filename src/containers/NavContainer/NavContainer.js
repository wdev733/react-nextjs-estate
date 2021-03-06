import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Nav } from 'components'
import { shallowEqual } from 'helpers'

const mapStateToProps = ({
  device: {saveValues, scrollY, width},
  user: {isAuthorized, isAdmin, name, isUserPage},
  theme: {current, nav}
}) => ({
  navResize: h => saveValues({navHeight: h}),
  scrollY, width, theme: current, nav,

  isAuthorized, isAdmin, name, isUserPage
});
@inject(mapStateToProps) @observer
export default class NavContainer extends Component {
  limit = 100;
  state = {navHidden: false, navFull: false};

  getNavRef = b => this.wrapper = b;
  resize = () => {
    this.props.navResize(
      parseInt(this.wrapper.clientHeight, 10)
    )
  };

  getNavState = (prev, next, newState) => {
    const { limit } = this;
    const { navHidden, navFull } = newState || this.state;

    if (next < limit && navHidden) {
      return this.setState({navHidden: false, navFull: false})
    } else if (next < limit) {
      if (navFull)
        this.setState({navFull: false});

      return;
    }

    if (prev < next && !navHidden) {
      return this.setState({navHidden: true, navFull: false})
    }

    if (prev > next && navHidden) {
      return this.setState({navHidden: false, navFull: true})
    }
  };

  updateLinks = props => {
    const { isAuthorized, isAdmin, nav } = props || this.props;
    let links = [];

    if (!isAuthorized) {
      links.push({
        to: '/signup',
        content: 'Стать хозяином'
      })
    } else {
      links.push({
        to: '/manage/create',
        content: 'Добавить'
      })
    }

    links.push({
      to: '/y',
      content: 'Объявления'
    });

    if (!isAuthorized) {
      links.push({
        to: '/signup',
        content: 'Регистрация'
      })
    }

    if (nav.links) {
      links = [
        ...links,
        ...nav.links
      ]
    }

    if (isAdmin) {
      links = [
        {
          to: '/manage',
          content: 'Управление'
        },
        {
          to: '/they',
          content: 'Пользователи'
        },
        ...links
      ]
    }

    this.setState({links});
  };

  componentWillMount() {
    this.updateLinks()
  }

  componentWillReceiveProps(nextProps) {
    const { width, scrollY, isAuthorized, nav, isAdmin } = this.props;

    if (width !== nextProps.width) {
      this.resize();
    }

    if (scrollY !== nextProps.width) {
      this.getNavState(scrollY, nextProps.scrollY);
    }

    if (
      isAuthorized !== nextProps.isAuthorized
      || isAdmin !== nextProps.isAdmin
    ) {
      this.updateLinks(nextProps);
    }

    if (!shallowEqual(nextProps.nav, nav)) {
      this.updateLinks(nextProps);
    }
  }

  componentDidMount() {
    setTimeout(this.resize, 300);
  }

  render() {
    const { navHidden, navFull, links } = this.state;
    const { width, children, className, name, theme, nav, isUserPage } = this.props;

    return (
      <Nav hidden={navHidden} name={name} theme={theme} isLogout={isUserPage}
           full={navFull} width={width} className={className} config={nav}
           getRef={this.getNavRef} links={links}>
        {children}
      </Nav>
    )
  }
}

