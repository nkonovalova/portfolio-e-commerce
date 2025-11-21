import PageLayout from "../pageLayout/PageLayout.tsx";
import TopAdBlock from "../../widgets/topAdBlock/TopAdBlock.tsx";
import SectionsBlock from "../../widgets/sectionsBlock/SectionsBlock.tsx";

function Main() {
	return (
		<PageLayout topInfoBlock={<TopAdBlock />}>
			<SectionsBlock />
			<div>CI/CD Test!!!</div>
		</PageLayout>
	);
}

export default Main;
