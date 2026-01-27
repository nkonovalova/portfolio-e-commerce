import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

import { HOME_ROUTE, PRODUCTS_ROUTE } from "../shared/routes.ts";
import Main from "../pages/main/Main.tsx";
import ProductsPage from "../pages/productsPage/ProductsPage.tsx";
import ProductPage from "../pages/productPage/ProductPage.tsx";
import UIPage from "../pages/uiPage/UIPage.tsx";
import Page404 from "../pages/404/404.tsx";

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
			{
				path: "*",
				element: <Page404 />,
			},
		],
	},
]);

export const App = () => <RouterProvider router={router} />;
