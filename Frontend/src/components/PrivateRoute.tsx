import { Component } from "react"
import { Redirect, Route } from "react-router"

interface PrivateRouteProps {
  component: any;
  authenticated: boolean;
  [x:string]: any;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({component: Node, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Node {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}