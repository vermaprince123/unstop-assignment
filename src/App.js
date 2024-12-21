import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import useAuth from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';

function App() {
  const { user, isLoading, login, logout } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" replace /> : <Navigate to="/auth/login" replace />}
        />
        <Route
          path="/auth/login"
          element={!user ? <LoginPage user={user} login={login} /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={user ? <HomePage user={user} logout={logout} /> : <Navigate to="/auth/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
