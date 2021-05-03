import React from 'react'
import HomePage from 'Pages/HomePage'
import SignInPage from 'Pages/SignInPage'
import { Route } from 'react-router-dom'
import AuthRoute from 'Pages/AuthRoute'

const routes = [
	{
		path: "/",
		exact: true,
		component: (props) => (
			<AuthRoute {...props} component={() => <HomePage {...props} />} />

		)
	},
	{
		path: "/SignIn",
		exact: true,
		component: (props) => <SignInPage {...props} />
	},
	{
		path: '',
		exact: false,
		component: () => <div>NOT FOUND</div>
	}
];

export default routes

export const RouteWithSubRoutes = (route) => {
	return (<>
		<Route
			path={route.path}
			exact={route.exact}
			render={(props) => (<>
				<route.component {...props} {...route} routes={route.routes} />
			</>)}
		/>
	</>)
}