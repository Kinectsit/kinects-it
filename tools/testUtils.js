import React from 'react';

module.exports = {
  stubRouterContext: (Component, props, stubs) => {
    function RouterStub() { }

    Object.assign(RouterStub, {
      makePath() {},
      makeHref() {},
      transitionTo() {},
      replaceWith() {},
      goBack() {},
      getCurrentPath() {},
      getCurrentRoutes() {},
      getCurrentPathname() {},
      getCurrentParams() {},
      getCurrentQuery() {},
      isActive() {},
      getRouteAtDepth() {},
      setRouteComponentAtDepth() {},
    }, stubs);

    class stubComponent extends React.Component {
      getChildContext() {
        return {
          router: RouterStub,
          routeDepth: 0,
        };
      }

      render() {
        return <Component {...props} />;
      }
    }

    stubComponent.childContextTypes = {
      router: React.PropTypes.func,
      routeDepth: React.PropTypes.number,
    };

    return stubComponent;
  },
};
