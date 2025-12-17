import { createContext, useState } from "react";

export const RankingContext = createContext();

export function RankingProvider({ children }) {
  const [rankingList, setRankingList] = useState([]);

  // 새 기록 추가
  const addRanking = (nickname, score) => {
    const newRecord = { nickname, score };

    setRankingList((prev) => [...prev, newRecord]);
  };

  return (
    <RankingContext.Provider value={{ rankingList, addRanking }}>
      {children}
    </RankingContext.Provider>
  );
}
