import axios from "axios";
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../schemas";
import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    console.log(data);
    const product = {
      name: data.name,
      price: Number(data.price),
    };
    const result = DraftProductSchema.safeParse(product);
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.data.name,
        price: result.data.price,
      });
    } else {
      throw new Error("Datos no válidos");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios.get(url);
    const result = ProductsSchema.safeParse(data.data);
    if (result.success) {
      return result.data;
    } else {
      throw new Error("Hubo un error..");
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.get(url);
    const result = ProductSchema.safeParse(data.data);
    if (result.success) {
      return result.data;
    } else {
      throw new Error("Hubo un error..");
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    const result = ProductSchema.safeParse({
      id,
      name: data.name,
      price: +data.price,
      availability: toBoolean(data.availability.toString()),
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.data);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
}
