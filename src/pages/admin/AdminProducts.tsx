import type React from "react"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Search, X, UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "../../contexts/AuthContext";
import { products as initialProductsData } from "../../data/products";
import Modal from "../../components/Modal";

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  category: string
  description: string
  sizes: string[]
  colors: string[]
}

// Adapt initial data to the new Product interface
const initialProducts: Product[] = initialProductsData.map(p => ({
  ...p,
  images: [p.image], // Convert single image string to an array
}))

// Main component para sa admin product management page
const AdminProductsPage = () => {
  const { user } = useAuth() // Kinukuha yung current user info mula sa AuthContext
  const navigate = useNavigate()

  // State para sa listahan ng lahat ng products. Sa totoong app, galing dapat ito sa API.
  const [products, setProducts] = useState<Product[]>(initialProducts)
  // State para i-control kung nakabukas o nakasara yung Add/Edit Product na modal.
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  // State para malaman kung anong product yung ine-edit natin.
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  // State para sa confirmation bago mag-delete ng product.
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  // State para sa search input field.
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "Casual",
    description: "",
    sizes: "XS, S, M, L, XL",
    colors: "Pink, Blue, White, Purple",
    images: [] as (string | File)[],
  })

  useEffect(() => {
    // Ito yung effect na nagche-check kung admin ba yung user.
    // Sa totoong app, i-uncomment ito para i-redirect yung non-admin users.
    // if (user?.role !== 'admin') {
    //   navigate('/login');
    // }
  }, [user, navigate])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Function para mag-handle ng pag-add ng bagong product.
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault() // Pinipigilan yung default form submission behavior.
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: Number.parseFloat(formData.price),
      images: formData.images.map(img => typeof img === 'string' ? img : URL.createObjectURL(img)),
      category: formData.category,
      description: formData.description,
      sizes: formData.sizes.split(',').map(s => s.trim()),
      colors: formData.colors.split(',').map(c => c.trim()),
    }
    // DITO MO ILALAGAY YUNG API CALL (e.g., POST request sa /api/products)
    // Halimbawa: await api.addProduct(newProduct);

    setProducts([...products, newProduct]); // Pansamantalang pag-add sa local state
    setIsFormModalOpen(false); // Isasara yung modal
    resetForm(); // Ire-reset yung form fields
    toast.success("Product added successfully!"); // Magpapakita ng success message
  }

  // Function para mag-handle ng pag-update ng existing product.
  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return // Kung walang ine-edit, itigil ang function

    const updatedProduct: Product = {
      ...editingProduct,
      name: formData.name,
      price: Number.parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      sizes: formData.sizes.split(',').map(s => s.trim()),
      colors: formData.colors.split(',').map(c => c.trim()),
      images: formData.images.map(img => typeof img === 'string' ? img : URL.createObjectURL(img)),
    }

    // DITO MO ILALAGAY YUNG API CALL (e.g., PUT request sa /api/products/:id)
    // Halimbawa: await api.updateProduct(editingProduct.id, updatedProduct);

    setProducts(products.map((p) => (p.id === editingProduct.id ? updatedProduct : p))); // Ina-update yung product sa local state
    setEditingProduct(null); // Tinatanggal sa editing mode
    setIsFormModalOpen(false); // Sinasara yung modal
    resetForm(); // Nirereset yung form
    toast.success("Product updated successfully!"); // Success message
  }

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      sizes: product.sizes.join(", "),
      colors: product.colors.join(", "),
      images: product.images,
    })
  }

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      price: "",
      category: "Casual",
      description: "",
      sizes: "XS, S, M, L, XL",
      colors: "Pink, Blue, White, Purple",
      images: [],
    })
  }

  // Function para mag-delete ng product.
  const handleDeleteProduct = (id: string) => {
    // DITO MO ILALAGAY YUNG API CALL (e.g., DELETE request sa /api/products/:id)
    // Halimbawa: await api.deleteProduct(id);
    // Ito yung punto kung saan nagco-communicate yung app mo sa server para mag-delete ng product.

    setProducts(products.filter((p) => p.id !== id)); // Tinatanggal yung product sa local state
    setProductToDelete(null); // Sinasara yung confirmation modal
    toast.success("Product deleted successfully!"); // Success message
  };

  // Logic para sa pag-filter ng products base sa search query.
  // Sine-search niya yung query sa product name at category.
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            resetForm();
            setIsFormModalOpen(true);
          }}
          className="bg-pink-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-pink-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or category..."
            className="w-full max-w-xs pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-3 px-4 font-semibold">Product</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 flex items-center space-x-4">
                    <img src={product.images[0] || '/placeholder.svg'} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                    <span className="font-medium text-gray-800">{product.name}</span>
                  </td>
                  <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className="bg-pink-100 text-pink-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => setProductToDelete(product)} // Open confirmation modal
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProduct(null);
          resetForm();
        }}
        title={editingProduct ? "Edit Product" : "Add New Product"}
      >
        <form
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          className="space-y-6"
        >
          {/* Image Uploader */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-pink-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-pink-600 focus-within:ring-offset-2 hover:text-pink-500"
                        >
                            <span>Upload files</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleImageChange} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
            {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                            <img 
                                src={typeof img === 'string' ? img : URL.createObjectURL(img)} 
                                alt={`preview ${index}`} 
                                className="h-24 w-24 object-cover rounded-md" 
                                onLoad={(e) => { if (typeof img !== 'string') URL.revokeObjectURL(e.currentTarget.src) }}/>
                            <button 
                                type="button"
                                onClick={() => handleRemoveImage(index)} 
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-75 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option>Casual</option>
              <option>Wedding</option>
              <option>Children</option>
              <option>Modern</option>
              <option>Accessories</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (comma-separated)</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Colors (comma-separated)</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsFormModalOpen(false);
                setEditingProduct(null);
                resetForm();
              }}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        title="Confirm Deletion"
      >
        <div>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete the product "<strong>{productToDelete?.name}</strong>"? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setProductToDelete(null)}
              className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (productToDelete) {
                  handleDeleteProduct(productToDelete.id);
                }
              }}
              className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminProductsPage
