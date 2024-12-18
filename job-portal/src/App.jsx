import { Outlet } from 'react-router-dom';
import './App.css';
import { Navbar } from './component/Navbar';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
  return (
    <AuthProvider> {/* Wrap your components with AuthProvider */}
      <>
        <Navbar />
        <Outlet />
      </>
    </AuthProvider>
  );
}

export default App;
