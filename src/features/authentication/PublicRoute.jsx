import { Navigate, Route, useLocation } from 'react-router';
import { useAuthentication } from './authenticationSlice';

export const PublicRoute = ({ path, ...props }) => {
	const { token } = useAuthentication();
	const { state } = useLocation();
	const navigateToPath = state?.from || '/';

	return token ? (
		<Navigate replace to={navigateToPath} />
	) : (
		<Route path={path} {...props} />
	);
};
