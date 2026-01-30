import { Home, MessageCircleMore, Phone, Tag, User, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useFetchAllCategories } from "../hooks/useCategories";
import { motion, AnimatePresence } from "framer-motion";

const PHONE_NUMBER = "+919876543210";
const WHATSAPP_NUMBER = "919876543210";

function Menubar() {
  const [hideMenu, setHideMenu] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { data: categories = [] } = useFetchAllCategories();
  const categoryData = categories.find((c) => c.key === category);

  const handleClick = (subCategory: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("sub-category", subCategory);
      return params;
    });
    setPopupOpen(false);
  };

  // hide menu on scroll
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      setHideMenu(window.scrollY > last);
      last = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Floating Menu Button */}
      {pathname === "/products" && (
        <motion.button
          className="floating-center-btn"
          onClick={() => setPopupOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1, y: [0, -6, 0] }}
          transition={{
            scale: { type: "spring", stiffness: 260, damping: 20 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={20} />
          <p>Menu</p>
        </motion.button>
      )}

      {/* Popup */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => setPopupOpen(false)}
          >
            <motion.div
              className="popup-content"
              initial={{ y: 120, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 120, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 22, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="popup-close-btn"
                onClick={() => setPopupOpen(false)}
              >
                ✕
              </button>

              <motion.div
                className="popup-grid"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08 },
                  },
                }}
              >
                {categoryData?.subCategory
                  ?.filter((c) => c.isActive)
                  .map((card) => (
                    <motion.div
                      key={card.key}
                      className="popup-card"
                      variants={{
                        hidden: { y: 20, opacity: 0 },
                        show: { y: 0, opacity: 1 },
                      }}
                      whileHover={{
                        y: -6,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleClick(card.key)}
                    >
                      <img src={card.image} alt={card.title} />
                      <p>{card.title}</p>
                    </motion.div>
                  ))}

                {!categoryData?.subCategory?.length && (
                  <p className="popup-empty">
                    No services available in this category
                  </p>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Menu */}
      <nav className={`mobile-menu ${hideMenu ? "hidden" : ""}`}>
        <Link
          className={`menu-item ${pathname === "/" ? "active" : ""}`}
          to="/"
        >
          <Home size={22} />
          <span>Home</span>
        </Link>

        <a href={`tel:${PHONE_NUMBER}`} className="menu-item tooltip">
          <Phone size={22} />
          <span>Phone</span>
          <span className="tooltip-text">{PHONE_NUMBER}</span>
        </a>

        <Link
          className={`menu-item ${pathname === "/top-deals" ? "active" : ""}`}
          to="/top-deals"
        >
          <Tag size={22} />
          <span>Top Deals</span>
        </Link>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="menu-item tooltip"
        >
          <MessageCircleMore size={22} />
          <span>Message</span>
          <span className="tooltip-text">Chat on WhatsApp</span>
        </a>

        <Link
          className={`menu-item ${pathname === "/profile" ? "active" : ""}`}
          to="/profile"
        >
          <User size={22} />
          <span>Profile</span>
        </Link>
      </nav>
    </>
  );
}

export default Menubar;
