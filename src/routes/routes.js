import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
//======================================================
import Supplier from 'src/pages/khaata/supplier.vue'
import AddSupplier from 'src/pages/khaata/addSupplier.vue'
import Product from 'src/pages/khaata/product.vue'
import AddProduct from 'src/pages/khaata/addProduct.vue'
import Month from 'src/pages/khaata/month.vue'
import AddMonth from 'src/pages/khaata/addMonth.vue'
import DailyTransaction from 'src/pages/khaata/dailytransaction.vue'
import AllTransaction from 'src/pages/khaata/alltransaction.vue'
import MakeTransaction from 'src/pages/khaata/makeTransaction.vue'
import Login from 'src/pages/khaata/login.vue'
import MonthTransaction from 'src/pages/khaata/monthDetail.vue'
import EditProduct from 'src/pages/khaata/editProduct.vue'
import EditSupplier from 'src/pages/khaata/editSupplier.vue'
import EditMonth from 'src/pages/khaata/editMonth.vue'
import Register from 'src/pages/khaata/register.vue'
import EditTransaction from 'src/pages/khaata/editTransaction.vue'


const routes = [
  {
    path: '/login',
    component: Login,

  },
  {
    path: '/register',
    component:Register,
  },
  {
    path: '/',
    component: DashboardLayout,
    meta:{authOnly:true},
    redirect: '/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview

      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'product',
        name: 'Product',
        component: Product
      },
      {
        path: 'product/addproduct',
        name: 'AddProduct',
        component: AddProduct,
      },
      {
        path: 'product/edit/:id',
        name: 'editProduct',
        component: EditProduct,
      },
      {
        path: 'dailyTransaction',
        name: 'DailyTransaction',
        component: DailyTransaction
      },
      {
        path: 'supplier',
        name: 'Supplier',
        component: Supplier,
      },
      {
        path: 'supplier/addSupplier',
        name: 'AddSupplier',
        component: AddSupplier,
      },
      {
        path: 'supplier/edit/:id',
        name: 'editSupplier',
        component: EditSupplier,
      },
      {
        path: 'month',
        name: 'MOnth',
        component: Month
      },
      {
        path: 'month/addMonth',
        name: 'Addmonth',
        component: AddMonth,
      },
      {
        path: 'month/edit/:id',
        name: 'monthProduct',
        component: EditMonth,
      },
      {
        path: 'months/detail/:id',
        name: 'monthDetail',
        component: MonthTransaction
      },

      {
        path: 'allTransaction',
        name: 'AllTransaction',
        component: AllTransaction
      },
      {
        path: 'makeTransaction',
        name: 'MakeTransaction',
        component: MakeTransaction
      },
      {
        path: 'transaction/edit/:id',
        name: 'EditTransaction',
        component: EditTransaction
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/


export default routes
