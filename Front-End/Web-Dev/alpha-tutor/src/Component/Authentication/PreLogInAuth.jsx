import React from 'react';
import { Route, Redirect } from 'react-router-dom';
export const PreLogInAuth = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                var roles = localStorage.getItem("roles");
                var username = localStorage.getItem("username");
                if (roles === null || username === null) {
                    return <Component {...props} />;
                }
                else if (roles !== null && username !== null) {
                    if (roles.includes("Coordinator")) {
                        return <Redirect to={
                            {
                                pathname: "/coordinator",
                                state: {
                                    from: props.location
                                }
                            }
                        }
                        />
                    } else if (roles.includes("Tutor")) {
                        return <Redirect to={
                            {
                                pathname: "/tutor",
                                state: {
                                    from: props.location
                                }
                            }
                        }
                        />
                    }
                    else if (roles.includes("Student")) {
                        return <Redirect to={
                            {
                                pathname: "/student",
                                state: {
                                    from: props.location
                                }
                            }
                        }
                        />
                    }
                }
            }}

        />
    );
}