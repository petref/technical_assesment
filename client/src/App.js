import { Route, Routes } from "react-router-dom";

import Layout from './layout';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import NotFound from './pages/NotFound';
import ChatPage from './pages/ChatPage';
import WithProtectedRoute from './HOC/WithProtectedRoute';


const App = () => {

  return (
    <div>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route element={<WithProtectedRoute />} >
              <Route path='/room' element={<ChatPage />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
          </Route>

        </Routes>
      </div>
    </div>
  );
};

export default App;