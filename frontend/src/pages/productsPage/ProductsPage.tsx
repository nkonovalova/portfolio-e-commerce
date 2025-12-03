import PageLayout from "../pageLayout/PageLayout.tsx";
import PagesHeader from "../../shared/ui/pagesHeader/PagesHeader.tsx";
import HeaderImg from "./img/pageHeaderBg.jpg";

function ProductsPage() {
	return (
		<PageLayout topInfoBlock={<PagesHeader header="Shop" imgSrc={HeaderImg} />}>
			shop page
		</PageLayout>
	);
}

export default ProductsPage;
