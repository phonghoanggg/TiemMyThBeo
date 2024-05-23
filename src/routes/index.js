import HomePage from "../pages/HomePage/HomePage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotFoundPage from "../component/NotFoundPage/NotFoundPage";

export const routes = [
    {
        path:"/",
        page: HomePage,
        isShowHeader:true
    },
    {
        path:"/products",
        page: ProductsPage,
        isShowHeader:true
    },

    {
        path:"*",
        page: NotFoundPage
    }
]