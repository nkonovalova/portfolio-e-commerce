import PageLayout from "../pageLayout/PageLayout.tsx";
import TopAdBlock from "../../widgets/topAdBlock/TopAdBlock.tsx";
import SectionsBlock from "../../widgets/sectionsBlock/SectionsBlock.tsx";
import { useGetRelevantProductsQuery } from "../../entities/product/store/relevantProductsApiSlice.ts";
import RelevantProducts from "./ui/relevantProducts/RelevantProducts.tsx";

function Main() {
	const {
		data: relevantProductsData,
		error: relevantProductsError,
		isLoading: isRelevantProductsLoading,
	} = useGetRelevantProductsQuery();
	return (
		<PageLayout
			topInfoBlock={<TopAdBlock />}
			isLoading={isRelevantProductsLoading}
			errorMessage={relevantProductsError ? "Loading data error" : ""}
		>
			<SectionsBlock />
			{relevantProductsData && (
				<RelevantProducts products={relevantProductsData} />
			)}
		</PageLayout>
	);
}

export default Main;
