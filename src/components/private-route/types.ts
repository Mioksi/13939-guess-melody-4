import {RouteProps} from 'react-router-dom';
import * as React from 'react';

export type IPrivateRouteProps = RouteProps & {
  authorizationStatus: string;
  render: () => React.ReactNode;
}
