import PageLayout from "../pageLayout/PageLayout.tsx";
import { Button, ButtonStyle } from "../../shared/ui/button/Button.tsx";
import TopAdBlock from "../../widgets/topAdBlock/TopAdBlock.tsx";

function Main() {
	return (
		<PageLayout topInfoBlock={<TopAdBlock />}>
			Content!
			<Button>Default button</Button>
			<Button style={ButtonStyle.link}>Link button</Button>
			<Button style={ButtonStyle.unfilled}>Unfilled button</Button>
			<Button style={ButtonStyle.filled}>Filled button</Button>
		</PageLayout>
	);
}

export default Main;
