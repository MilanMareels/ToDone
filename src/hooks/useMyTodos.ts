import { getMyTodos } from "@/services/myTodos";
import { Todo } from "@/types/todo";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useMyTodos = () => {
  const { data, isError, isLoading, error } = useQuery<Todo[], AxiosError>({
    queryKey: ["myTodos"],
    queryFn: getMyTodos,
  });

  return {
    todos: data,
    isError,
    isLoading,
    error,
  };
};

export default useMyTodos;
