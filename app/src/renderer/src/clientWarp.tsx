
import Wallpaper from './wallpeper'; // Ganti dengan path yang sesuai
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <Wallpaper /> 
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};
export default MainLayout