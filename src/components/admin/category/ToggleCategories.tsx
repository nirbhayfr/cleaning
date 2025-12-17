import { useState } from "react";
import {
  useFetchAllCategories,
  useFetchSubCategories,
  useToggleCategoryStatus,
  useToggleSubCategoryStatus,
} from "../../../hooks/useCategories";
import { useSearchParams, useNavigate } from "react-router-dom"; // 👉 added
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiResponse } from "../../../api/category";

export default function CategorySubCategoryCards() {
  const { data: categories = [], isLoading } = useFetchAllCategories();

  const toggleCategory = useToggleCategoryStatus();
  const toggleSubCategory = useToggleSubCategoryStatus();

  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const navigate = useNavigate(); // 👉 added
  const [params] = useSearchParams();

  if (isLoading) return <p>Loading categories...</p>;
  if (!categories.length) return <p>No categories found.</p>;

  const filteredCategories = categories.filter((cat) => {
    if (filter === "active") return cat.isActive;
    if (filter === "inactive") return !cat.isActive;
    return true;
  });

  // 👉 function: when category row is clicked, update URL
  const handleCategoryClick = (cat: any) => {
    navigate(`/admin/category?category=${cat.key}`);
  };

  return (
    <>
      <div className="filter-bar">
        <button
          className={filter === "all" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "active" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          className={filter === "inactive" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("inactive")}
        >
          Inactive
        </button>
      </div>

      <div className="category-list">
        {filteredCategories.map((cat) => (
          <div key={cat._id}>
            <div
              className="category-row"
              onClick={() => handleCategoryClick(cat)} // 👉 updates URL
              style={{ cursor: "pointer" }}
            >
              <img
                src={cat.image || "/placeholder.png"}
                className="category-img"
                alt={cat.title}
              />

              <div className="category-info">
                <span className="category-title">{cat.title}</span>
                <span className="category-key">Key: {cat.key}</span>
              </div>

              <button
                className={`status-btn ${cat.isActive ? "active" : "inactive"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLoadingId(cat._id);
                  toggleCategory.mutate(cat._id, {
                    onSettled: () => setLoadingId(null),
                  });
                }}
              >
                {loadingId === cat._id ? (
                  <span className="loader"></span>
                ) : cat.isActive ? (
                  "Active"
                ) : (
                  "Inactive"
                )}
              </button>

              <button
                className="expand-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenCategoryId(
                    openCategoryId === cat._id ? null : cat._id
                  );
                }}
              >
                {openCategoryId === cat._id ? "▲" : "▼"}
              </button>
            </div>

            {openCategoryId === cat._id && (
              <SubCategoryList
                categoryKey={cat.key}
                categoryId={cat._id}
                toggleSubCategory={toggleSubCategory}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function SubCategoryList({
  categoryKey,
  categoryId,
  toggleSubCategory,
}: {
  categoryKey: string;
  categoryId: string;
  toggleSubCategory: UseMutationResult<ApiResponse, Error, string>;
}) {
  const { data: subs = [], isLoading } = useFetchSubCategories(categoryId);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const navigate = useNavigate(); // 👉 added

  // 👉 update URL when subcategory clicked
  const handleSubClick = (sub: any) => {
    navigate(`/admin/category?category=${categoryKey}&subCategory=${sub.key}`);
  };

  if (isLoading) return <p className="sub-loading">Loading...</p>;
  if (!subs.length) return <p className="sub-empty">No Subcategories.</p>;

  return (
    <div className="sub-list">
      {subs.map((sub) => (
        <div
          key={sub._id}
          className="sub-row"
          onClick={() => handleSubClick(sub)} // 👉 handles sub click
          style={{ cursor: "pointer" }}
        >
          <img src={sub.image || "/placeholder.png"} className="sub-img" />

          <div className="category-info">
            <span className="category-title">{sub.title}</span>
            <span className="category-key">Key: {sub.key}</span>
          </div>

          <button
            className={`status-btn ${sub.isActive ? "active" : "inactive"}`}
            onClick={(e) => {
              e.stopPropagation();
              setLoadingId(sub._id);
              toggleSubCategory.mutate(sub._id, {
                onSettled: () => setLoadingId(null),
              });
            }}
          >
            {loadingId === sub._id ? (
              <span className="loader"></span>
            ) : sub.isActive ? (
              "Active"
            ) : (
              "Inactive"
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
