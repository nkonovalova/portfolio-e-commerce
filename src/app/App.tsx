import { BrowserRouter, Routes, Route } from "react-router";
import "./App.module.scss";

import Main from "../pages/main/Main.tsx";

export const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Main />} />
		</Routes>
	</BrowserRouter>
);
