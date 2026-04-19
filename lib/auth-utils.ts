import { logout } from '../redux/slices/auth-slice';
import { store } from '../redux/store';

export const handleUnauthorized = () => {
  store.dispatch(logout());
  // In a real app, maybe redirect or clear cookies
};
