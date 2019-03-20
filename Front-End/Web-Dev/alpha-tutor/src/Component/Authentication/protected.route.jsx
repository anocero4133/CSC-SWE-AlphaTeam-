
import React from 'react';
import Coordinator from '../Coordinator/coordinatorMainPage';
import { Route, Redirect } from 'react-router-dom';
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                var roles = localStorage.getItem("roles");
                var username = localStorage.getItem("username");
                if (roles !== null && username !== null) {
                    if (Component === Coordinator) {
                        if (!roles.includes("Coordinator")) {
                            return <Redirect to={
                                {
                                    pathname: "/error/",
                                    state: {
                                        from: props.location
                                    }
                                }
                            }
                            />
                        }
                    }
                        return <Component {...props} />;
                } else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    }
                    />
                }
            }}
        />
    );
};