// import { BrowserRouter, Routes, Route } from "react-router";
// import "./App.module.scss";
// import "../shared/ui/common.module.scss";
//
// import { HOME_ROUTE, PRODUCTS_ROUTE } from "../shared/routes.ts";
// import Main from "../pages/main/Main.tsx";
//
// import ProductsPage from "../pages/productsPage/ProductsPage.tsx";
// import ProductPage from "../pages/productPage/ProductPage.tsx";
//
// export const App = () => (
// 	<BrowserRouter>
// 		<Routes>
// 			<Route path={HOME_ROUTE} element={<Main />} />
// 			<Route path={PRODUCTS_ROUTE}>
// 				<Route index element={<ProductsPage />} />
// 				<Route path=":id" element={<ProductPage />} />
// 			</Route>
// 		</Routes>
// 	</BrowserRouter>
// );

import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import "./App.module.scss";
import "../shared/ui/common.module.scss";

import { HOME_ROUTE, PRODUCTS_ROUTE } from "../shared/routes.ts";
import Main from "../pages/main/Main.tsx";
import ProductsPage from "../pages/productsPage/ProductsPage.tsx";
import ProductPage from "../pages/productPage/ProductPage.tsx";
import UIPage from "../pages/uiPage/UIPage.tsx";

const router = createBrowserRouter([
	{
		element: <Outlet />,
		children: [
			{
				path: HOME_ROUTE,
				element: <Main />,
				handle: {
					breadcrumb: () => "Home",
				},
			},
			{
				path: PRODUCTS_ROUTE,
				handle: {
					breadcrumb: () => "Shop",
				},
				children: [
					{
						index: true,
						element: <ProductsPage />,
					},
					{
						path: ":id", // This matches PRODUCT_DETAIL_ROUTE
						element: <ProductPage />,
						handle: {
							// For dynamic routes, the breadcrumb can be a function
							// that might fetch data later, but for now, we'll show the ID.
							breadcrumb: (params: { id?: string }) => params.id,
						},
					},
				],
			},
			{
				path: "/ui",
				element: <UIPage />,
			},
		],
	},
]);

export const App = () => <RouterProvider router={router} />;
