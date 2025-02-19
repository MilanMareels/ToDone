import * as React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Todo } from "@/types/todo";

interface TodoCardProps {
  todo: Todo;
}

export function TodoCard({ todo }: TodoCardProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{todo.title}</CardTitle>
        <CardDescription>{todo.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Delete</Button>
        <Button>Done</Button>
      </CardFooter>
    </Card>
  );
}
