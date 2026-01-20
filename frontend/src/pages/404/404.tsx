import PageLayout from "../pageLayout/PageLayout.tsx";
import { Link } from "react-router";

function Page404() {
	return (
		<PageLayout>
			<div>
				<h2>404 - Page Not Found</h2>
				<p>The page you are looking for does not exist.</p>
				<Link to="/">Go to Home</Link>
			</div>
		</PageLayout>
	);
}

export default Page404;
