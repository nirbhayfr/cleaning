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

export default function MostBooked() {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await http.get("/products");
        setProducts(res.data.products.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
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

  if (!products.length) return null;

  return (
    <section className="most-booked">
      <h2 className="mb-title">Our Most Booked Services</h2>

      <div className="marquee">
        <div className="marquee-track">
          {products.concat(products).map((item, i) => (
            <div className="mb-card" key={`${item._id}-${i}`}>
              <img
                src={item.images?.[0] || "/img/placeholder.jpg"}
                alt={item.title}
              />
              <div className="mb-overlay">
                <h3>{item.title}</h3>
                <button onClick={() => handleBookNow(item)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
