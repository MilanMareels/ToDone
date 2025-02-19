import { TodoCard } from "@/components/myUI/todoCard";
import useMyTodos from "@/hooks/useMyTodos";

export default function Home() {
  const { todos, isError, isLoading, error } = useMyTodos();

  if (isLoading) {
    return <div>Laden......</div>;
  }

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos!.map((todo) => (
          <TodoCard todo={todo} />
        ))}
      </ul>
    </div>
  );
}
