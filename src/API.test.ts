import { Difficulty, fetchQuizQuestions } from "./API";

const fetchMock = jest.fn();
const originalFetch = global.fetch;

beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock;
});

afterAll(() => {
    global.fetch = originalFetch;
});

test("requests the selected quiz and includes every possible answer", async () => {
    fetchMock.mockResolvedValue({
        json: async () => ({ results: [{
            question: "Which answer?",
            correct_answer: "Right",
            incorrect_answers: ["Wrong A", "Wrong B", "Wrong C"],
        }] }),
    });
    const questions = await fetchQuizQuestions(10, Difficulty.EASY);
    expect(fetchMock).toHaveBeenCalledWith("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple");
    expect(questions[0].answers).toHaveLength(4);
    expect(questions[0].answers).toEqual(expect.arrayContaining(["Right", "Wrong A", "Wrong B", "Wrong C"]));
});

test("propagates network errors to the caller", async () => {
    fetchMock.mockRejectedValue(new Error("network unavailable"));
    await expect(fetchQuizQuestions(10, Difficulty.EASY)).rejects.toThrow("network unavailable");
});
