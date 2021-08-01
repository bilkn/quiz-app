import React from "react";
import useQuizLogic from "./hooks/useQuizLogic";
import { QuestionCardContainer } from "./containers";
import "styled-components/macro";
import Flex from "./components/flex";
import { QuestionCard } from "./components";

function App() {
  const {
    startTrivia,
    nextQuestion,
    checkAnswer,
    number,
    userAnswers,
    questions,
    gameOver,
    loading,
    score,
    TOTAL_QUESTIONS,
  } = useQuizLogic();

  return (
    <Flex direction="column" justify="center" css="min-height:100vh;">
      <QuestionCard.Title>QUIZ ME!</QuestionCard.Title>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <QuestionCard.Button variant="secondary" className="start" onClick={startTrivia} css="width:150px; margin:auto;">
          Start
        </QuestionCard.Button>
      ) : null}
      {!gameOver ? (
        <Flex css="padding:0 1em; margin-top:1em;">
          <QuestionCard.Display>
            Question: {number + 1} / {TOTAL_QUESTIONS}
          </QuestionCard.Display>
          <QuestionCard.Display className="score" css="margin-left:auto;">Score: {score}</QuestionCard.Display>
        </Flex>
      ) : null}
      {loading && <p>Loading Questions ...</p>}

      {!loading && !gameOver && (
        <QuestionCardContainer
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </Flex>
  );
}

export default App;
