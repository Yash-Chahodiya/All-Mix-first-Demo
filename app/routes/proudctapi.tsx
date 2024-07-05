import axios from "axios";
import { errorHandler, successHandler } from "~/api/appHandler";
import axiosInstance from "~/api/axiosInstance";

const proudctapi = () => {
  return <div>Api Of Products</div>;
};

async function fetchData() {
  try {
    const response = await axiosInstance.get("/objects");

    const data = successHandler(response);

    console.log(data);
    return successHandler(response);
  } catch (error) {
    errorHandler(error);
  }

  return <div>data</div>;
}

fetchData();

export default proudctapi;
