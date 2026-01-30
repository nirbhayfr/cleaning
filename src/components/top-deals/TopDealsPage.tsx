import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DealCard from "./DealCard";
import DealsSkeleton from "./DealsSkeleton";
import { useGetAllProducts } from "../../hooks/useProduct";
import type { Product } from "../../api/product";

type TopDealProduct = Product & {
  isTopDeal?: boolean;
};

export default function TopDealsPage() {
  const { data: products = [], isLoading } = useGetAllProducts() as {
    data: TopDealProduct[];
    isLoading: boolean;
  };

  const navigate = useNavigate();
  const deals = products.filter((p) => p.isTopDeal);

  return (
    <div className="min-h-screen bg-[#F6FAFF]">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20 md:px-16">
        {/* Background Blobs */}
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl" />
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </motion.button>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-3xl font-semibold text-slate-900 md:text-5xl">
            Top Deals
          </h1>

          <p className="mt-4 max-w-xl text-base text-slate-600 md:text-lg">
            Handpicked services at special prices. Book now and save more on
            your next service.
          </p>
        </motion.div>
      </section>
      {/* DEALS GRID SECTION */}
      <section className="px-6 pb-24 md:px-16">
        {isLoading ? (
          <DealsSkeleton />
        ) : deals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-lg font-semibold text-slate-800">
              No deals right now
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Check back soon — exciting offers are coming 💙
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {deals.map((deal) => (
              <motion.div
                key={deal._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <DealCard
                  title={deal.title || "Untitled Deal"}
                  description={deal.description || ""}
                  image={deal.images?.[0] || "/placeholder.png"}
                  oldPrice={`₹${deal.price}`}
                  newPrice={`₹${deal.discountPrice || deal.price}`}
                  discount="TOP DEAL"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
