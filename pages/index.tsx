import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useRouter } from "next/router";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();
  const router = useRouter();

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  async function createTodo() {
    const content = window.prompt("Todo content");

    if (!content?.trim()) {
      return;
    }

    try {
      await client.models.Todo.create({
        content: content.trim(),
      });
    } catch (error) {
      console.error("Error creating todo:", error);
      alert("Failed to create todo");
    }
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main>
      <div className="header">
        <h1>Stroop Test App</h1>
        <button className="sign-out-button" onClick={signOut}>
          Sign out
        </button>
      </div>

      <div className="todo-section">
        <h2>Todos</h2>
        <button className="todo-button" onClick={createTodo}>
          + new todo
        </button>
        <ul>
          {todos.map((todo) => (
            <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
              {todo.content}
            </li>
          ))}
        </ul>
      </div>

      <div className="stroop-section">
        <h2>Stroop Test</h2>
        <p className="section-description">
          Test your cognitive abilities with the Stroop Test
        </p>
        <button className="start-button" onClick={() => router.push("/stroop")}>
          Start Stroop Test
        </button>
      </div>
    </main>
  );
}
