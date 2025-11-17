import Carousel from "./Carousel";
import LookingFor from "./LookingSection";
import MostBooked from "./MostBooked";
import Packages from "./Packages";
import WhyChooseUs from "./WhyChooseUs";
import Reviews from "./Reviews";
import HorizontalSwipeSlider from "./HorizontalSlider";

function Homepage() {
	return (
		<section>
			<Carousel />
			<LookingFor />
			<HorizontalSwipeSlider />
			<MostBooked />
			<Packages />
			<WhyChooseUs />
			<Reviews />
		</section>
	);
}

export default Homepage;
