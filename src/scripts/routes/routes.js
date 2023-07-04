/* eslint-disable linebreak-style */

import Beranda from '../views/pages/beranda';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';
import TentangKami from '../views/pages/tentang-kami';
import DashboardAdmin from '../views/pages/admin-dashboard';
import DataReview from '../views/pages/admin-data-review';
import LoginPage from '../views/pages/login-page';
import DataPesan from '../views/pages/admin-data-pesan';

const routes = {
  '/': Beranda,
  '/beranda': Beranda,
  '/detail/:id': Detail,
  '/favorite': Favorite,
  '/tentang-kami': TentangKami,
  '/dashboard-admin': DashboardAdmin,
  '/data-review': DataReview,
  '/login-page': LoginPage,
  '/data-pesan': DataPesan,
};

export default routes;
