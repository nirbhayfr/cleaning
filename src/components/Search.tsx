import { useEffect, useState, useRef, useMemo } from "react";
import { MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../api/product";
import { useGetAllProducts } from "../hooks/useProduct";

const placeholders = [
	"Home Cleaning",
	"Office Cleaning",
	"Kitchen Cleaning",
	"Bathroom Cleaning",
	"Glass Cleaning",
];

export default function SearchInput() {
	const navigate = useNavigate();
	const wrapperRef = useRef<HTMLDivElement>(null);

	/* ---------- typing animation ---------- */
	const [displayText, setDisplayText] = useState("");
	const [index, setIndex] = useState(0);
	const [direction, setDirection] = useState<"forward" | "backward">(
		"forward"
	);

	useEffect(() => {
		const current = placeholders[index];
		let timeout: number;

		if (direction === "forward") {
			if (displayText.length < current.length) {
				timeout = window.setTimeout(() => {
					setDisplayText(
						current.slice(0, displayText.length + 1)
					);
				}, 100);
			} else {
				timeout = window.setTimeout(() => {
					setDirection((prev) =>
						prev !== "backward" ? "backward" : prev
					);
				}, 1000);
			}
		} else {
			if (displayText.length > 0) {
				timeout = window.setTimeout(() => {
					setDisplayText(
						current.slice(0, displayText.length - 1)
					);
				}, 60);
			} else {
				setDirection((prev) =>
					prev !== "forward" ? "forward" : prev
				);
				setIndex((prev) => (prev + 1) % placeholders.length);
			}
		}

		return () => clearTimeout(timeout);
	}, [displayText, direction, index]);

	/* ---------- search state ---------- */
	const [query, setQuery] = useState("");
	const [showPopup, setShowPopup] = useState(false);

	/* ---------- fetch products ---------- */
	const { data: products = [] } = useGetAllProducts();

	/* ---------- filter products ---------- */
	const filtered = useMemo(() => {
		if (!query.trim()) return [];

		const lower = query.toLowerCase();

		return products
			.filter(
				(p: Product) =>
					p.title!.toLowerCase().includes(lower) ||
					p.category!.toLowerCase().includes(lower) ||
					p.subcategory!.toLowerCase().includes(lower)
			)
			.slice(0, 6);
	}, [query, products]);

	/* ---------- close popup on outside click ---------- */
	useEffect(() => {
		const handleOutside = (e: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(e.target as Node)
			) {
				setShowPopup(false);
			}
		};

		document.addEventListener("mousedown", handleOutside);
		return () => document.removeEventListener("mousedown", handleOutside);
	}, []);

	/* ---------- select product ---------- */
	const handleSelect = (product: Product) => {
		setShowPopup(false);
		setQuery("");

		navigate(
			`/products?category=${encodeURIComponent(
				product.category!
			)}&sub-category=${encodeURIComponent(product.subcategory!)}`
		);
	};

	return (
		<div className="search-section" ref={wrapperRef}>
			<div className="search-bar">
				<div className="location">
					<MapPin size={16} />
					<span>Jaipur</span>
				</div>

				<div className="divider" />

				<div className="input-area">
					<Search size={16} />
					<input
						type="text"
						value={query}
						placeholder={`Search for "${displayText}"`}
						onChange={(e) => {
							setQuery(e.target.value);
							setShowPopup(true);
						}}
						onFocus={() => query && setShowPopup(true)}
					/>

					{showPopup && filtered.length > 0 && (
						<div className="search-popup">
							{filtered.map((product: Product) => (
								<div
									key={product._id}
									className="search-item"
									onClick={() =>
										handleSelect(product)
									}
								>
									<p className="item-name">
										{product.title}
									</p>
									<span className="item-meta">
										{product.category} →{" "}
										{product.subcategory}
									</span>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
