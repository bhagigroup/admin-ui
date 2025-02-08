

Here's how you can modify your code to allow the `AddProductsList` component to save product details via the API and display them in the `ProductsList` table.

### Steps:
1. **Set up Axios API Integration**:
   - Update `ProductServices.saveProducts` to send the form data to the API endpoint.
2. **Handle Product Submission**:
   - On successful submission, close the modal and update the product list in `ProductsList`.
3. **Display Products in the Table**:
   - Fetch the product list and update the table dynamically.

Here’s the modified code:

### **ProductsList.jsx**

```jsx
import React, { useState, useEffect } from "react";
import AddProductsList from "./AddProductsList";
import { ProductServices } from "./ProductServices";

const ProductsList = () => {
  const [openNewProduct, setOpenNewProduct] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ProductServices.getProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const openNewProductModal = () => {
    setOpenNewProduct(true);
  };

  const closeNewProductModal = () => {
    setOpenNewProduct(false);
  };

  const handleProductSubmit = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    closeNewProductModal();
  };

  return (
    <div>
      <div className="wrapper">
        <div className="main-nav">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link active" href="">
                Products
              </a>
            </li>
          </ul>
        </div>
        <div className="main-container">
          <div className="onboard-content">
            {openNewProduct && (
              <AddProductsList
                onClose={closeNewProductModal}
                onSubmit={handleProductSubmit}
                show={openNewProduct}
              />
            )}

            <div className="row">
              <div className="top-btn-content">
                <div className="add-btn">
                  <button className="btn" onClick={openNewProductModal}>
                    <span className="material-icons-outlined btn-space-r">
                      add_circle
                    </span>
                    New Products
                  </button>
                </div>
              </div>
            </div>

            <hr className="m-0 mt-1" />
            <div className="table-content">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Material</th>
                    <th>Discount Price</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.Name}</td>
                      <td>{product.Category}</td>
                      <td>{product.Type}</td>
                      <td>{product.Color}</td>
                      <td>{product.Size}</td>
                      <td>{product.Material}</td>
                      <td>{product["Discount Price"]}</td>
                      <td>{product.Price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;


```

### **AddProductsList.jsx**

```jsx
import React from "react";
import { useForm } from "react-hook-form";
import { ProductServices } from "./ProductServices";

const AddProductsList = ({ onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSave = async (data) => {
    try {
      const response = await ProductServices.saveProducts(data);
      onSubmit(response.data); // Pass the new product back to ProductsList
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div id="mySidenav" className="right-side-slider">
      <div className="rs-hw-header">
        <div className="modal-header">
          <h6>New Product</h6>
          <button type="button" className="btn close" onClick={onClose}>
            ×
          </button>
        </div>
      </div>
      <div className="right-slider-hw-content">
        <form onSubmit={handleSubmit(onSave)} autoComplete="off">
          <div className="hw-container">
            {/* Input Fields */}
            {[
              { label: "Name", name: "Name" },
              { label: "Category", name: "Category" },
              { label: "Type", name: "Type" },
              { label: "Color", name: "Color" },
              { label: "Size", name: "Size" },
              { label: "Material", name: "Material" },
              { label: "Discount Price", name: "Discount Price" },
              { label: "Price", name: "Price" },
            ].map(({ label, name }) => (
              <div className="row mb-4" key={name}>
                <label className="col-sm-4 col-form-label col-form-label-sm">
                  {label}
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder={`Add ${label}`}
                    {...register(name, { required: `${label} is required` })}
                  />
                  {errors[name] && (
                    <span className="text-danger">{errors[name].message}</span>
                  )}
                </div>
              </div>
            ))}
            <hr />
            <div className="bottom-btn d-flex justify-content-end">
              <button type="button" className="btn in-active-btn me-2" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn active-btn px-4">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductsList;
```

### **ProductServices.js**

```javascript
import axios from "axios";

export const ProductServices = {
  saveProducts: async (productData) => {
    const response = await axios.post(
      "http://49.207.5.51:8002/cms/api/v1/product/create-product",
      productData
    );
    return response.data;
  },

  getProducts: async () => {
    const response = await axios.get(
      "http://49.207.5.51:8002/cms/api/v1/product/list-products"
    );
    return response.data;
  },
};
```

This setup allows:
1. Adding new products via the modal form.
2. Saving product data through the API.
3. Dynamically updating the table with new products.