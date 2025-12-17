import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import questions from "../data/questions.json";

function Quiz() {
  const { nickname } = useParams();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);          // 현재 문제 번호
  const [selectedOption, setSelectedOption] = useState(null);   // 현재 선택한 보기
  const [answerCounts, setAnswerCounts] = useState(0);          // 정답 맞은 개수

  const currentQuestion = questions[currentIndex];              // 현재 문제 객체

  const handleNext = () => {
    if (selectedOption === null) {
      alert("선택지를 선택해주세요.");
      return;
    }

    // 정답 체크
    if (selectedOption === currentQuestion.answer) {
      setAnswerCounts((prev) => prev + 1);
    }

    // 마지막 문제일 경우 → 결과 페이지 이동
    if (currentIndex === questions.length - 1) {
      navigate(`/results/${nickname}`, {
        state: { score: answerCounts + (selectedOption === currentQuestion.answer ? 1 : 0) }
      });
      return;
    }

    // 다음 문제 이동
    setCurrentIndex((prev) => prev + 1);

    // 선택 초기화
    setSelectedOption(null);
  };

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
        }}
      >
        {/* 문제 */}
        <h2>
          Q{currentIndex + 1}. {currentQuestion.question}
        </h2>

        {/* 선택지 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: selectedOption === index ? "2px solid #4f46e5" : "1px solid #ccc",
                background: selectedOption === index ? "#eef2ff" : "white",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "16px",
                color: "black",
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          style={{
            padding: "14px",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          {currentIndex === questions.length - 1 ? "결과 보기" : "다음"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
