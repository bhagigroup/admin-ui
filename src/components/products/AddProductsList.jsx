import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { productServices } from "../services/ProductServices";
const AddProductsList = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    // Add width to mySidenav id
    const timer = setTimeout(() => {
      if (props.show && document.getElementById("mySidenav")) {
        document.getElementById("mySidenav").style.width = "50%";
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [props.show]);

  //remove width to mySidenav id and close
  const onClose = () => {
    document.getElementById("mySidenav").style.width = "0";
    setTimeout(() => {
      props.onClose();
    }, 800);
  };

  const onSubmit = async (data) => {
     
    const response = await productServices.saveProducts(data);
          props.onProductAdded();
      onClose();
      reset();
  };
  // const onSubmit = async (data) => {
  //   try {
  //     await axios.post("http://49.207.5.51:9002/cms/api/v1/product/create-product", data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     props.onProductAdded();
  //     onClose();
  //     reset();
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //   }
  // };

  return (
    <div>
      <div id="mySidenav" className="right-side-slider">
        <div className="rs-hw-header">
          <div className="modal-header">
            <h6>
              <span>Products</span>&nbsp;
              <span className="mute-txt">-</span>
              &nbsp;
              <span className="mute-txt">New Product</span>
            </h6>
            <button type="button" className="btn close" onClick={onClose}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
        <div className="right-slider-hw-content">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="hw-container">
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
                      {...register(name, { required: true })}
                    />
                    {errors[name] && (
                      <small className="text-danger">This field is required</small>
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
    </div>
  );
};

export default AddProductsList;
