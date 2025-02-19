import axios from "axios";

export const getMyTodos = async () => {
  const response = await axios.get("/api/todos");

  return response.data;
};
