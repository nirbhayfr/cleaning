import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/cartSlice";

type Props = {
  title: string;
  description?: string;
  image?: string;
  oldPrice: string;
  newPrice: string;
  discount?: string;
};

export default function DealCard({
  title,
  description,
  image,
  oldPrice,
  newPrice,
  discount,
}: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  // Card click → open preview modal
  const handleCardClick = () => {
    setOpen(true);
  };

  // Book button click
  const handleBookDeal = (e?: React.MouseEvent) => {
    e?.stopPropagation();

    const dealItem = {
      _id: `deal-${title}`, // temporary unique id
      title,
      images: image ? [image] : [],
      price: oldPrice, // original price
      discountPrice: newPrice, // deal price
      quantity: 1,
      inStock: true,
      onSale: true,
    };

    dispatch(addToCart(dealItem));
    setOpen(false);
    navigate("/cart");
  };

  return (
    <>
      {/* CARD */}
      <motion.div
        onClick={handleCardClick}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group cursor-pointer rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Discount Badge */}
          <span className="absolute left-3 top-3 animate-pulse rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
            {discount}
          </span>
        </div>

        {/* Content */}
        <div className="mt-4">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>

          <p className="mt-1 text-sm text-slate-500">{description}</p>

          {/* Price */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-slate-400 line-through">
              {oldPrice}
            </span>
            <span className="text-lg font-semibold text-blue-600">
              {newPrice}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={handleBookDeal}
            className="mt-4 w-full rounded-xl bg-blue-600 py-2 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Book Deal →
          </button>
        </div>
      </motion.div>

      {/* PREVIEW MODAL */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="relative w-[90%] max-w-md rounded-2xl bg-white p-6"
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-slate-500 hover:text-slate-800"
            >
              <X size={18} />
            </button>

            <img
              src={image}
              alt={title}
              className="h-48 w-full rounded-xl object-cover"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              {title}
            </h3>

            <p className="mt-2 text-sm text-slate-600">{description}</p>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-slate-400 line-through">
                {oldPrice}
              </span>
              <span className="text-xl font-semibold text-blue-600">
                {newPrice}
              </span>
            </div>

            <button
              onClick={handleBookDeal}
              className="mt-6 w-full rounded-xl bg-blue-600 py-2 text-white transition hover:bg-blue-700"
            >
              Book This Deal
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
