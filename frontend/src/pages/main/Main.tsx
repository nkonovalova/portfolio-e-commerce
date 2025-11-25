import PageLayout from "../pageLayout/PageLayout.tsx";
import TopAdBlock from "../../widgets/topAdBlock/TopAdBlock.tsx";
import SectionsBlock from "../../widgets/sectionsBlock/SectionsBlock.tsx";
import { useGetRelevantProductsQuery } from "../../entities/product/store/relevantProductsApiSlice.ts";

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
			<div>CI/CD Test!!!</div>
		</PageLayout>
	);
}

export default Main;
