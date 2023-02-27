import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import * as React from "react";
import { useHistory } from "react-router-dom";

import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";

export const login = async (dispatch, user, password, username, history) => {
  dispatch(loginStart());
  try {
    const { data } = await userRequest.get("users");
    if (data.length === 0) {
      let obj = {
        err: "Error with a server. Try later.",
      };
      throw obj;
    }
    let user = data.filter((user) => {
      return user.password === password && user.username === username;
    });

    if (user.length === 0) {
      let obj = {
        err: "Username or password are not correct",
      };
      throw obj;
    }
    history.push("/home");
    dispatch(loginSuccess(user[0]));
  } catch (err) {
    dispatch(loginFailure(err.err));
    console.log(err);
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
