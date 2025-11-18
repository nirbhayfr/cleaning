import { MapPin, Search } from "lucide-react";
function SearchInput() {
	return (
		<div className="search-section">
			<div className="search-bar">
				<div className="location">
					<MapPin className="loc-icon" size={16} />
					<span className="loc-text">Jaipur</span>
				</div>

				<div className="divider"></div>

				<div className="input-area">
					<Search className="search-icon" size={16} />
					<input
						type="text"
						placeholder="Search for service..."
					/>
				</div>
			</div>
		</div>
	);
}

export default SearchInput;
