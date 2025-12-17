"use client";
import { useState, useEffect } from "react";
import {
  useGetAllProducts,
  useGetProducts,
  useCreateProduct,
  useUpdateProduct,
  useToggleProductStatus,
  useDeleteProduct,
} from "../../../hooks/useProduct";
import type { Product } from "../../../api/product";

import { useFetchAllCategories } from "../../../hooks/useCategories";
import { useSearchParams } from "react-router-dom"; // 👉 added

export default function ProductManagement() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Partial<Product> | null>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    images: [],
    price: "",
    discountPrice: "",
    quantity: 0,
    inStock: true,
    onSale: false,
  });

  const { data: categories } = useFetchAllCategories();

  // ------------------------------
  // 👉 READ URL PARAMS
  // ------------------------------
  const params = useSearchParams()[0];
  const categoryFromUrl = params.get("category") || "";
  const subFromUrl = params.get("subcategory") || "";

  // ------------------------------
  // 👉 FETCH LOGIC
  // If URL params exist → filtered products
  // Else → fetch all products
  // ------------------------------
  const shouldFilter = categoryFromUrl !== "" || subFromUrl !== "";

  const { data: filteredProducts, isLoading: isFiltering } = useGetProducts({
    category: categoryFromUrl || undefined,
    subcategory: subFromUrl || undefined,
    search: undefined,
  });

  const { data: allProducts, isLoading: isAllLoading } = useGetAllProducts();

  const products = shouldFilter ? filteredProducts ?? [] : allProducts ?? [];
  const isLoading = shouldFilter ? isFiltering : isAllLoading;

  // ------------------------------
  // Mutations
  // ------------------------------
  const createProductMutation = useCreateProduct();
  const toggleProduct = useToggleProductStatus();
  const deleteProduct = useDeleteProduct();
  const updateMutation = useUpdateProduct(editProduct?._id || "");

  // ------------------------------
  // Handlers
  // ------------------------------
  const handleChange = (e: any) => {
    const target = e.target;
    const { name, value, type, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createProductMutation.mutate(formData as Product, {
      onSuccess: () => {
        setFormData({
          title: "",
          description: "",
          category: "",
          subcategory: "",
          images: [],
          price: "",
          discountPrice: "",
          quantity: 1,
          inStock: true,
          onSale: false,
        });
        setShowCreateForm(false);
      },
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct?._id) return;

    const cleanData = { ...formData };
    delete (cleanData as Product)._id;

    updateMutation.mutate(cleanData, {
      onSuccess: () => setEditProduct(null),
    });
  };

  if (isLoading) return <p>Loading products...</p>;

  // ------------------------------
  // UI RENDER
  // ------------------------------
  return (
    <div className="product-list-container">
      <h2 className="page-title">Product Management</h2>

      <div className="top-buttons">
        <button onClick={() => setShowCreateForm(true)}>
          + Create Product
        </button>
      </div>

      {/* CREATE FORM */}
      {showCreateForm && (
        <form className="product-form" onSubmit={handleCreateSubmit}>
          <h3>Create Product</h3>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories?.map((c) => (
              <option key={c._id} value={c.key}>
                {c.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="subcategory"
            placeholder="Subcategory"
            value={formData.subcategory}
            onChange={handleChange}
          />

          <input
            type="text"
            name="images"
            placeholder="Image URLs (comma separated)"
            value={formData.images?.join(",")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                images: e.target.value.split(","),
              }))
            }
          />

          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="discountPrice"
            placeholder="Discount Price"
            value={formData.discountPrice}
            onChange={handleChange}
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
          />

          <label>
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
            />{" "}
            In Stock
          </label>

          <label>
            <input
              type="checkbox"
              name="onSale"
              checked={formData.onSale}
              onChange={handleChange}
            />{" "}
            On Sale
          </label>

          <div className="form-buttons">
            <button
              type="submit"
              disabled={createProductMutation.isPending}
              className="create-button"
            >
              {createProductMutation.isPending ? "Creating..." : "Create"}
            </button>
            <button type="button" onClick={() => setShowCreateForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* EDIT FORM */}
      {editProduct && (
        <form className="product-form" onSubmit={handleEditSubmit}>
          <h3>Edit Product</h3>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories?.map((c) => (
              <option key={c._id} value={c.key}>
                {c.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
          />

          <input
            type="text"
            name="images"
            value={formData.images?.join(",")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                images: e.target.value.split(","),
              }))
            }
          />

          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
          />

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />

          <label>
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
            />{" "}
            In Stock
          </label>

          <label>
            <input
              type="checkbox"
              name="onSale"
              checked={formData.onSale}
              onChange={handleChange}
            />{" "}
            On Sale
          </label>

          <div className="form-buttons">
            <button type="submit" className="create-button">
              Update
            </button>
            <button type="button" onClick={() => setEditProduct(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* PRODUCT LIST */}
      <div className="product-cards">
        {products.map((p: Product) => (
          <div key={p._id} className="product-card">
            <img
              src={p.images[0] || "/placeholder.png"}
              alt={p.title}
              className="product-img"
            />

            <div className="product-info">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <p>
                Category: {p.category}
                {p.subcategory ? ` / ${p.subcategory}` : ""}
              </p>
              <p>
                Price: {p.price}
                {p.discountPrice ? ` (Discount: ${p.discountPrice})` : ""}
              </p>
              <p>Qty: {p.quantity}</p>
              <p>On Sale: {p.onSale ? "Yes" : "No"}</p>
            </div>

            <div className="product-actions">
              <button
                className={`status-btn ${p.inStock ? "active" : "inactive"}`}
                onClick={() => {
                  setLoadingId(p._id!);
                  toggleProduct.mutate(p._id!, {
                    onSettled: () => setLoadingId(null),
                  });
                }}
                disabled={loadingId === p._id}
              >
                {loadingId === p._id ? (
                  <span className="loader"></span>
                ) : p.inStock ? (
                  "Active"
                ) : (
                  "Inactive"
                )}
              </button>

              <div className="actions-btns">
                <button
                  onClick={() => {
                    setEditProduct(p);
                    setFormData(p);
                  }}
                >
                  Edit
                </button>

                <button onClick={() => deleteProduct.mutate(p._id!)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
