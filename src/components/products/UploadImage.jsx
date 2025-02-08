import React, { useEffect, useState } from "react";
import axios from "axios";
import ToastMessage from "../common/ToastMessage";

const UploadImage = ({ show, onClose, refreshProducts }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (show && document.getElementById("mySidenav")) {
      setTimeout(() => {
        document.getElementById("mySidenav").style.width = "50%";
      }, 800);
    }
    return () => {
      if (document.getElementById("mySidenav")) {
        document.getElementById("mySidenav").style.width = "0";
      }
    };
  }, [show]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an image to upload.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Upload the image
      const uploadResponse = await axios.post(
        "http://49.207.5.51:9002/cms/api/v1/upload",
        formData,{
            headers: {
                "Content-Type": "application/json",
              },
        }
       
      );

      const fileUrl = uploadResponse.data.fileUrl;
      const fileName = selectedFile.name;

      // Save product with the uploaded image
      await axios.post("http://49.207.5.51:8002/cms/api/v1/product/create-product", {
        Name: "New Product",
        Category: "Living Room",
        Type: "Sofa",
        Color: "Brown",
        Size: "5",
        Material: "Teak Wood",
        "Discount Price": 100,
        Price: 5000,
        "File Url": fileUrl,
        "File Name": fileName,
        Attachments: [fileUrl],
      });

      // Refresh product list in ProductsList.jsx
      refreshProducts();
      onClose();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div id="mySidenav" className="right-side-slider">
        <div className="rs-hw-header">
          <div className="modal-header">
            <h6>Upload Image</h6>
            <button type="button" className="btn close" onClick={onClose}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
        <div className="right-slider-hw-content">
          <form autoComplete="off" onSubmit={handleUpload}>
            <div className="hw-container">
              <div className="row mb-4">
                <label className="col-sm-4 col-form-label col-form-label-sm">
                  Upload Image
                </label>
                <div className="col-sm-8">
                  <input type="file" accept=".jpeg,.png,.jpg" onChange={handleFileChange} />
                </div>
              </div>
              <hr />
              <div className="bottom-btn d-flex justify-content-end">
                <button className="btn in-active-btn me-2" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn active-btn px-4" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <ToastMessage />
      </div>
    </div>
  );
};

export default UploadImage;
