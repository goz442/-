import { useContext, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { RankingContext } from "../context/RankingContext";

export default function Result() {
  const navigate = useNavigate();
  const { nickname } = useParams();
  const location = useLocation();
  const score = location.state?.score || 0; // 점수 전달받기

  const { rankingList, addRanking } = useContext(RankingContext);

  // 페이지 진입 시 현재 사람 랭킹에 추가
  useEffect(() => {
    addRanking(nickname, score);
  }, []);

  // 점수 높은 순 정렬
  const sortedRanking = [...rankingList].sort((a, b) => b.score - a.score);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          color: "black",
        }}
      >
        <h2 style={{ color: "white" }}>결과 페이지</h2>

        {/* 현재 사용자 정보 */}
        <div
          style={{
            background: "#f3f4f6",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <h2>{nickname}님의 점수</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{score} 점</p>
        </div>

        {/* 랭킹 리스트 */}
        <h2 style={{ color: "white" }}>전체 랭킹</h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {sortedRanking.map((user, index) => (
            <li
              key={index}
              style={{
                padding: "12px",
                background: "#e5e7eb",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                
              }}
            >
              <span>
                {index + 1}. {user.nickname}
              </span>
              <span>{user.score}점</span>
            </li>
          ))}
        </ul>

        {/* 다시하기 버튼 */}
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "14px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          다시하기
        </button>
      </div>
    </div>
  );
}
