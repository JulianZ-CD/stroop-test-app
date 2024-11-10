import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useRouter } from "next/router";
import { useTranslation } from "@/contexts/LanguageContext";
import { MUSIC_OPTIONS } from "@/pages/stroop";

const client = generateClient<Schema>();

interface MusicStats {
  music: string;
  male: number;
  female: number;
}

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();
  const router = useRouter();
  const { t, locale, changeLocale } = useTranslation();
  const [musicStats, setMusicStats] = useState<MusicStats[]>([]);
  const [showStats, setShowStats] = useState(false);

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

  function listMusicStats() {
    client.models.StroopTest.observeQuery().subscribe({
      next: ({ items }) => {
        const stats: MusicStats[] = Object.entries(MUSIC_OPTIONS).map(([key, option]) => ({
          music: option.name,
          male: items.filter(test => test.selectedMusic === key && test.gender === 'male').length,
          female: items.filter(test => test.selectedMusic === key && test.gender === 'female').length
        }));
        setMusicStats(stats);
      }
    });
  }

  useEffect(() => {
    listMusicStats();
  }, []);

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

      <br />

      <div className="mt-8">
        <button 
          onClick={() => setShowStats(!showStats)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showStats ? 'Hide Statistics' : 'Show Statistics'}
        </button>
        
        {showStats && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4">Music Selection Statistics</h2>
            <div className="grid grid-cols-3 gap-4">
              {musicStats.map((stat) => (
                <div key={stat.music} className="p-4 border rounded">
                  <h3 className="font-semibold">{stat.music}</h3>
                  <p>Male participants: {stat.male}</p>
                  <p>Female participants: {stat.female}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
