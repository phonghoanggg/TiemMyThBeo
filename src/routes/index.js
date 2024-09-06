import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../component/NotFoundPage/NotFoundPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import { AdminPage } from "../pages/AdminPage/AdminPage";
import { ProductDetail } from "../component/Content/ProductDetail/ProductDetail";



export const routes = [
    {
        path:"/",
        page: HomePage,
        isShowHeader:true
    },
    {
        path:"/products/:id",
        page: ProductDetail,
        isShowHeader:true
    },
    {
        path:"/profile",
        page: ProfilePage,
        isShowHeader:true
    },
    {
        path:"/admin",
        page: AdminPage,
        isShowHeader:false,
        isPrivate:true
    },
    {
        path:"*",
        page: NotFoundPage
    }
]