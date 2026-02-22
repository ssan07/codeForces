
import './App.css'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProblemPage from './pages/ProblemPage';
import Problems from './pages/Problems';

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/problem/:id" element={
          <ProtectedRoute>
            <ProblemPage />
          </ProtectedRoute>
        } />
        <Route
        path="/problems"
        element={
          <ProtectedRoute>
            <Problems/>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
// hi hello how are you doing today?