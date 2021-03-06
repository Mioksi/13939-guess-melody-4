import * as React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {getAuthorizationStatus} from '../../reducer/user/selectors';

import {AuthorizationStatus, AppRoute} from '../../common/consts';

import {IPrivateRouteProps} from './types';

const PrivateRoute: React.FunctionComponent<IPrivateRouteProps> = (props: IPrivateRouteProps) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
