import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/authentication/Login'
import Welcome from './features/authentication/Welcome'
import RequireAuth from './features/authentication/RequireAuth'
import RegionAnatomiquesList from './features/region-anatomiques/RegionAnatomiquesList'

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}

        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="welcome" element={<Welcome />}></Route>
          <Route path="regionAnatomiquesList" element={<RegionAnatomiquesList />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
