import React, {useState} from "react";
import {fetchQuizQuestions, Difficulty, QuestionState} from "./API";

// components
import QuestionCard, {AnswerObject} from "./components/QuestionCard";
//styles
import {GlobalStyle, Wrapper} from "./App.styles";

const TOTAL_QUESTIONS = 10;

const App = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);  

    console.log(questions);
    

    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);

        // TODO: handle fetch errors
        const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    };

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!gameOver){
            const answer = e.currentTarget.value;
            const correct = questions[number].correct_answer === answer;

            if(correct){
                setScore(prev => prev+1);
            }

            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer
            };
            setUserAnswers(prev => [...prev ,answerObject]);
        }
    };

    const nextQuestion = () => {
        const nextQuestion = number +1;

        if(nextQuestion === TOTAL_QUESTIONS){
            setGameOver(true);
        } else {
            setNumber(nextQuestion);
        }

    };

    return (
        <>
            <GlobalStyle/>
            <Wrapper>
                <h1>React Quiz</h1>
                {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                    <button className="start" onClick={startTrivia}>
                    Start
                    </button>
                ): null}
           
                {!gameOver ? <p className="score">Score: {score}</p>: null}
           
                {loading && <p>Loading Questions...</p>}
           
                {!loading && !gameOver ? (
                    <QuestionCard
                        questionNo={number + 1}
                        totalQuestions={TOTAL_QUESTIONS}
                        question={questions[number].question}
                        answers={questions[number].answers}
                        userAnswer={userAnswers ? userAnswers[number]: undefined}
                        callback={checkAnswer}
                    />): null }

                {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? ( 
                    <button className="start" onClick={nextQuestion}>
                 Next Question
                    </button>) : null}
           
            </Wrapper>
        </>
    );
};

export default App;
