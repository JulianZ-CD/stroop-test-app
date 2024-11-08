import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useRouter } from "next/router";
import { useTranslation } from "@/contexts/LanguageContext";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();
  const router = useRouter();
  const { t, locale, changeLocale } = useTranslation();

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
        {/* <h1>{t("home.title")}</h1> */}
        <select
          value={locale}
          onChange={(e) => changeLocale(e.target.value as "en" | "zh")}
          className="language-selector"
        >
          <option value="en">English</option>
          <option value="zh">简体中文</option>
          <option value="fr">Français</option>
        </select>
        <button className="sign-out-button" onClick={signOut}>
          {t("common.signOut")}
        </button>
      </div>

      {/* <div className="todo-section">
        <h2>{t("home.todoSection.title")}</h2>
        <button className="todo-button" onClick={createTodo}>
          {t("home.todoSection.newTodo")}
        </button>
        <ul>
          {todos.map((todo) => (
            <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
              {todo.content}
            </li>
          ))}
        </ul>
      </div> */}

      <div className="stroop-section">
        <h2>{t("home.stroopSection.title")}</h2>
        <p className="section-description">{t("home.stroopSection.description")}</p>
        <p className="section-reminder">⚠️ {t("home.stroopSection.languageReminder")}</p>
        <button className="start-button" onClick={() => router.push("/stroop")}>
          {t("home.stroopSection.startButton")}
        </button>
      </div>
    </main>
  );
}
