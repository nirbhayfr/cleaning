import { addToCart } from "../../store/cartSlice";
import { useAppDispatch } from "../../store/hooks";
import CategorySlider from "./layout/CategorySlider";
import ProductsFilters from "./layout/Filters";

interface Service {
	title: string;
	serviceRating: number;
	id: string;
	price: string;
	description: string;
	discountPrice: string;
	images: string[];
	quantity: number;
}

interface Data {
	title: string;
	rating: number;
	bookings: string;
	services: Service[];
}

export default function ProductCategory({
	title,
	rating,
	bookings,
	services,
}: Data) {
	const dispatch = useAppDispatch();
	return (
		<>
			<ProductsFilters />

			<section className="product-section">
				<CategorySlider />

				<h1 className="product-title">{title}</h1>
				<p className="product-sub">
					⭐ {rating} <span>({bookings}+ bookings)</span>
				</p>

				{/* Cards */}
				<div className="product-grid">
					{services.map((service, index) => (
						<div className="product-card" key={index}>
							<div className="product-info">
								<h3>{service.title}</h3>

								{/* <p className="product-rating">
								⭐ {service.serviceRating}
								<span>({service.bookings})</span>
								</p> */}

								<div className="product-price">
									<span className="old-price">
										₹{service.price}
									</span>
									<span className="new-price">
										₹{service.discountPrice}
									</span>
								</div>
								<p>{service.description}</p>
							</div>

							<div className="product-img-box">
								<img
									src={service.images[0]}
									alt={service.title}
								/>

								<button
									className="add-btn"
									onClick={() =>
										dispatch(addToCart(service))
									}
								>
									ADD
								</button>
							</div>

							<button className="details-btn">
								View Details
							</button>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
