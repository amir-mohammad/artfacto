/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import UserAdmin from "components/UserAdmin/UserAdmin";
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Teacher from "components/Teacher/Teacher";
import AddTeacher from "components/Teacher/AddTeacher";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    show:true,
    permission:"dashboard"
  },
  {
    path: "/useradmin",
    name: "User Admin",
   
    icon: Person,
    component: UserAdmin,
    layout: "/admin",
    show:true,
    permission:"admin"
  },
  {
    path:"/teacher",
    name:"Teacher",
    icon:RecordVoiceOverIcon,
    component:Teacher,
    layout:'/admin',
    show:true,
    permission:"teacher"
  },
  {
    path:"/teachers/add",
    name:"AddTeacher",
    icon:RecordVoiceOverIcon,
    component:AddTeacher,
    layout:'/admin',
    show:false,
    permission:"teacher"
  }
];

export default dashboardRoutes;
