import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  useFetchAllCategories,
  useFetchSubCategories,
} from "../../hooks/useCategories";

export default function LookingFor() {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const { data: categories = [], isLoading } = useFetchAllCategories();
  if (isLoading) {
    return (
      <section className="looking-section">
        <h2 className="looking-title">What are you looking for?</h2>

        <div className="lf-loader">
          <span className="spinner"></span>
          <p>Loading categories...</p>
        </div>
      </section>
    );
  }
  if (!categories.length) return <p>No categories found.</p>;

  const activeCategories = categories.filter((cat) => cat.isActive);

  const comingSoon = [
    { title: "Female Home Salon", img: "/img/hair-salon.jpeg" },
    { title: "Electrician", img: "/img/electrician.jpeg" },
    { title: "Plumber", img: "/img/plumber.jpeg" },
    { title: "Pest Control", img: "/img/pest-control.jpeg" },
    { title: "Balloon Decoration", img: "/img/balloon.jpeg" },
    { title: "Contract Work", img: "/img/contract.jpeg" },
  ];

  return (
    <>
      <section className="looking-section">
        <h2 className="looking-title">What are you looking for?</h2>

        <div className="looking-grid">
          {activeCategories.map((cat) => (
            <motion.div
              className="looking-card"
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => {
                setActivePopup(cat.key);
                setOpenCategoryId(cat._id);
              }}
              key={cat.key}
            >
              <img
                src={
                  cat.image && cat.image.trim() !== ""
                    ? cat.image
                    : "/img/default-category.png"
                }
                alt={cat.title}
              />

              <p>{cat.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* POPUP for Selected Category */}
      <AnimatePresence>
        {activePopup && (
          <SubCategoryCard
            setActivePopup={setActivePopup}
            activePopup={activePopup}
            categoryId={openCategoryId}
          />
        )}
      </AnimatePresence>

      <section className="looking-section">
        <h2 className="looking-title">Coming Soon</h2>

        <motion.div
          className="looking-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {comingSoon.map((item, index) => (
            <div className="looking-card faded" key={index}>
              <span className="coming-tag">Coming Soon</span>

              <img src={item.img} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
}

function SubCategoryCard({
  setActivePopup,
  activePopup,
  categoryId,
}: {
  setActivePopup: (val: string | null) => void;
  activePopup: string | null;
  categoryId: string | null;
}) {
  const navigate = useNavigate();

  const { data: subs = [], isLoading } = useFetchSubCategories(categoryId!);
  const activeSubCategories = subs.filter((cat) => cat.isActive);

  if (!activePopup) return null;

  const handleClick = (subCatKey: string) => {
    const params = new URLSearchParams({
      category: activePopup,
      "sub-category": subCatKey,
    });

    navigate(`/products?${params.toString()}`);
  };
  return (
    <>
      <motion.div
        className="lf-bottom-popup open"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <button
          className="lf-popup-close-btn"
          onClick={() => setActivePopup(null)}
        >
          ✕
        </button>

        <h3>Categories</h3>

        <div className="lf-popup-grid">
          {isLoading && (
            <div className="lf-loader">
              <span className="spinner"></span>
              <p>Loading services...</p>
            </div>
          )}

          {!isLoading &&
            activeSubCategories.length > 0 &&
            activeSubCategories.map((card, i) => (
              <div key={i} onClick={() => handleClick(card.key)}>
                <div className="lf-popup-card">
                  <div className="lf-popup-text">
                    <h4>{card.title}</h4>
                  </div>

                  <div className="lf-popup-image-box">
                    <img
                      src={
                        card.image && card.image.trim() !== ""
                          ? card.image
                          : "/img/default-subcategory.png"
                      }
                      alt={card.title}
                    />
                  </div>
                </div>
              </div>
            ))}

          {!isLoading && activeSubCategories.length === 0 && (
            <p className="lf-empty">No services available in this category.</p>
          )}
        </div>
      </motion.div>

      {/* Backdrop */}
      <motion.div
        className="lf-popup-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setActivePopup(null)}
      ></motion.div>
    </>
  );
}
