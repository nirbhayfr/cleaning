import { useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";

const placeholders = [
	"Home Cleaning",
	"Office Cleaning",
	"Kitchen Cleaning",
	"Bathroom Cleaning",
	"Glass Cleaning",
];

function SearchInput() {
	const [placeholder, setPlaceholder] = useState("");
	const [index, setIndex] = useState(0); // which text
	const [subIndex, setSubIndex] = useState(0); // letters
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		const current = placeholders[index];

		// typing speed
		const timeout = setTimeout(
			() => {
				if (!deleting) {
					// typing forward
					setPlaceholder(current.substring(0, subIndex + 1));
					setSubIndex(subIndex + 1);

					if (subIndex === current.length) {
						setDeleting(true);
					}
				} else {
					// deleting backward
					setPlaceholder(current.substring(0, subIndex - 1));
					setSubIndex(subIndex - 1);

					if (subIndex === 0) {
						setDeleting(false);
						setIndex((index + 1) % placeholders.length);
					}
				}
			},
			deleting ? 60 : 100
		); // delete faster

		return () => clearTimeout(timeout);
	}, [subIndex, deleting, index]);

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
						placeholder={`Search for "${placeholder}"`}
					/>
				</div>
			</div>
		</div>
	);
}

export default SearchInput;
