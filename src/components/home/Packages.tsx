import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/cartSlice";
import { http } from "../../api/http";

type Product = {
  _id: string;
  title: string;
  images: string[];
  price: string;
  discountPrice?: string;
  inStock: boolean;
  onSale: boolean;
};

export default function Packages() {
  const [packages, setPackages] = useState<Product[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getDisplayPrice = (product: Product) => {
    if (product.onSale && product.discountPrice) {
      return product.discountPrice;
    }
    return product.price;
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await http.get("/products");
        // take first 3 products as packages
        setPackages(res.data.products.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch packages", err);
      }
    };

    fetchPackages();
  }, []);

  const handleBookNow = (product: Product) => {
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        price:
          product.onSale && product.discountPrice
            ? product.discountPrice
            : product.price,
        discountPrice: product.discountPrice || product.price,
        images: product.images,
        quantity: 1,
        inStock: product.inStock,
        onSale: product.onSale,
      }),
    );
    navigate("/cart");
  };

  if (!packages.length) return null;

  return (
    <section className="packages-section">
      <h2>Budget Friendly Cleaning Packages</h2>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <div key={pkg._id} className="package-card">
            <img
              src={pkg.images?.[0] || "/img/placeholder.jpg"}
              alt={pkg.title}
            />

            <div className="package-price">
              Starting at {getDisplayPrice(pkg)}
            </div>

            <div className="package-footer">
              <span>{pkg.title}</span>
              <button onClick={() => handleBookNow(pkg)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
