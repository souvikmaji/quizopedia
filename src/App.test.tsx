import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import { fetchQuizQuestions, QuestionState } from "./API";

jest.mock("./API", () => ({
    ...jest.requireActual("./API"),
    fetchQuizQuestions: jest.fn(),
}));

const fetchQuestions = fetchQuizQuestions as jest.MockedFunction<typeof fetchQuizQuestions>;

beforeEach(() => {
    jest.clearAllMocks();
    const questions: QuestionState[] = Array.from({ length: 10 }, (_, i) => ({
        catagory: "General",
        difficulty: "easy",
        type: "multiple",
        question: `Question ${i + 1}`,
        correct_answer: "Correct &amp; answer",
        incorrect_answers: ["Wrong answer"],
        answers: ["Correct &amp; answer", "Wrong answer"],
    }));
    fetchQuestions.mockResolvedValue(questions);
});

test("completes ten questions, counts answers once, and resets on restart", async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    expect(screen.getByText("Loading Questions...")).toBeInTheDocument();

    for (let i = 0; i < 10; i++) {
        await screen.findByText(`Question: ${i + 1} / 10`);
        const correct = screen.getByRole("button", { name: "Correct & answer" });
        const wrong = screen.getByRole("button", { name: "Wrong answer" });
        expect(screen.queryByText("Next Question")).not.toBeInTheDocument();
        fireEvent.click(i % 2 === 0 ? correct : wrong);
        expect(correct).toBeDisabled();
        expect(wrong).toBeDisabled();
        fireEvent.click(correct);
        fireEvent.click(wrong);
        expect(screen.getByText(`Score: ${Math.ceil((i + 1) / 2)}`)).toBeInTheDocument();
        if (i < 9) fireEvent.click(screen.getByText("Next Question"));
    }

    expect(screen.queryByText("Next Question")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Start"));
    await screen.findByText("Question: 1 / 10");
    expect(screen.getByText("Score: 0")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Correct & answer" })).not.toBeDisabled();
    expect(fetchQuestions).toHaveBeenCalledTimes(2);
});
