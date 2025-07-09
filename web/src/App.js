import Login from './pages/Login';
import Feed from './pages/Feed';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { token } = useAuth();
  return token ? <Feed /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
