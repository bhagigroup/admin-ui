import axios from "axios";
import isEmpty from "../common/isEmpty";
export const productServices = {};


//get products
productServices.fetchProducts = async ( ) => {
  try {
 const response = await axios.get("http://49.207.5.51:9002/cms/api/v1/product/all-products");  
 return !isEmpty(response.data) ? response.data : {};
  } catch (err) {
    return err.response ? err.response.data : err;
  }
};


//save products

productServices.saveProducts = async (data) => {
  try {
    let response = await axios.post("http://49.207.5.51:9002/cms/api/v1/product/create-product",
      data,
      {
      headers: {
        "Content-Type": "application/json",
      },
    }
    );
    return !isEmpty(response.data) ? response.data : {};
  } catch (err) {
    return err.response ? err.response.data : err;
  }
};