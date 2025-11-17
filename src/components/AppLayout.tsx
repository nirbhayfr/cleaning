import { Outlet } from "react-router-dom";
import Header from "./Header";
import Menubar from "./Menubar";
import Footer from "./Footer";

function AppLayout() {
	return (
		<main>
			<Header />
			<Menubar />
			<Outlet />
			<Footer />
		</main>
	);
}

export default AppLayout;
