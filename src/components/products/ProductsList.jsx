import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProductsList from "./AddProductsList";
import { productServices } from "../services/ProductServices";
import UploadImage from "./UploadImage";
import isEmpty from "../common/isEmpty";
const ProductsList = () => {
  const [openNewProduct, setOpenNewProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await productServices.fetchProducts();
    if (response && response) {
      // setProducts(response);
      setProducts(Array.isArray(response) ? response : []);

    }
  }

  const openNewProductModal = () => {
    setOpenNewProduct(true);
  };

  const closeNewProductModal = () => {
    setOpenNewProduct(false);
  };

  const handleProductAdded = () => {
    fetchProducts();  
  };
  // Open Upload Image Modal
  const openUploadImageModal = () => {
    setUploadModal(true);
  };

  // Close Upload Image Modal
  const closeUploadImageModal = () => {
    setUploadModal(false);
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
                show={openNewProduct}
                onProductAdded={handleProductAdded}
              />
            )}
{uploadModal ? (
              <UploadImage
                 show={uploadModal}
                 openUploadImageModal={openUploadImageModal}
              onClose={closeUploadImageModal} />

              
            ) : (
              ""
            )}
            <div className="row">
              <div className="top-btn-content">
                <div className="add-btn">
                  <a className="btn" onClick={openNewProductModal}>
                    <span className="material-icons-outlined btn-space-r">
                      add_circle
                    </span>
                    New Products
                  </a>
                </div>
              </div>
            </div>

            <hr className="m-0 mt-1" />
            <div className="table-content">
            {!isEmpty(products) ? (

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Type</th>
                    <th scope="col">Color</th>
                    <th scope="col">Size</th>
                    <th scope="col">Material</th>
                    <th scope="col">Discount Price</th>
                    <th scope="col">Price</th>
                    <th>Image</th>

                    <th scope="col">Actions</th>

                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>{product.Name}</td>
                      <td>{product.Category}</td>
                      <td>{product.Type}</td>
                      <td>{product.Color}</td>
                      <td>{product.Size}</td>
                      <td>{product.Material}</td>
                      <td>{product["Discount Price"]}</td>
                      <td>{product.Price}</td>
                      <td>
                        {product["File Url"] ? (
                          <img src={product["File Url"]} alt="Product" width="50" height="50" />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>
            <div className="underline">
            <span
  style={{ cursor: "pointer" }}
  className="material-icons-outlined"
  onClick={openUploadImageModal}
  refreshProducts={fetchProducts}

>
  upload
</span>


              <span
                style={{ cursor: "pointer", marginLeft: "10px" }}
                className="material-symbols-outlined"
              >
                edit_square
              </span>
               
             <span
                style={{ cursor: "pointer" }}
                className="material-icons-outlined"
              >
                delete
              </span>
            </div>
          </td>
                    </tr>
                  ))}
                </tbody>
              </table>
 ) : (
  <div className="text-center mt-3">No data found</div>
)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
