import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Homepage from "./components/home/Homepage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<Homepage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
