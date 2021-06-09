import { Navigate, Route } from 'react-router';
import { useAuthentication } from './authenticationSlice';

export const PrivateRoute = ({ path, ...props }) => {
	const { token } = useAuthentication();
	return token ? (
		<Route path={path} {...props} />
	) : (
		<Navigate to='/login' replace />
	);
};
