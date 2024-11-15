import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useTranslation } from "@/contexts/LanguageContext";
import { useRouter } from "next/router";
const client = generateClient<Schema>();

interface MusicStats {
  music: string;
  male: number;
  female: number;
}

function StatsContent() {
  const { user, signOut } = useAuthenticator();
  const router = useRouter();
  const [musicStats, setMusicStats] = useState<MusicStats[]>([]);
  const { t } = useTranslation();

  const listMusicStats = async () => {
    try {
      const { data: allTests } = await client.models.StroopTest.list();

      // 定义音乐类型
      const musicTypes = [
        { key: "NO", label: t("stroopTest.musicSelection.no_music") },
        { key: "MOZART", label: t("stroopTest.musicSelection.mozart") },
        { key: "POP", label: t("stroopTest.musicSelection.pop_music") },
      ];

      // 计算统计数据
      const stats: MusicStats[] = musicTypes.map(({ key, label }) => ({
        music: label,
        male: allTests.filter((test) => test.selectedMusic === key && test.gender === "male")
          .length,
        female: allTests.filter((test) => test.selectedMusic === key && test.gender === "female")
          .length,
      }));

      setMusicStats(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    listMusicStats();
  }, []);

  return (
    <div className="stats-container">
      <h2>{t("home.statsSection.title")}</h2>
      <button className="sign-out-button" onClick={signOut}>
        {t("common.signOut")}
      </button>
      {' '}
      <button className="home-button" onClick={() => router.push("/")}>
        {t("common.backToHome")}
      </button>
      <div className="stats-grid">
        {musicStats.map((stat) => (
          <div key={stat.music} className="stat-card">
            <h3>{stat.music}</h3>
            <p>
              {t("home.statsSection.maleParticipants")}: {stat.male}
            </p>
            <p>
              {t("home.statsSection.femaleParticipants")}: {stat.female}
            </p>
            <p>
              {t("home.statsSection.totalParticipants")}: {stat.male + stat.female}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <Authenticator>
      <StatsContent />
    </Authenticator>
  );
}
