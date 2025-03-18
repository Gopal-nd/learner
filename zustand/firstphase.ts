import {create} from 'zustand'

export const  useDiffentPhase = create<State & Actions>((set) => ({
    phase: 1,
    increment: () => set((state: { phase: number }) => ({ phase: state.phase + 1 })),
    reset:()=>set((state: { phase: number }) => ({ phase: 1 })),
    
    
  }))

  type State = {
    phase: number
  }
  
  type Actions = {
    increment: (qty: number) => void
    reset:()=>void
  }

// -----------------------------------------------------------------


// Define the shape of our quiz state, including a new 'initialize' method.
export interface QuizState {
  currentQuestion: number;
  userAnswers: (number | null)[];
  score: number;
  attempted: number;
  initialize: (length: number) => void;
  answerQuestion: (index: number, correct: number) => void;
  nextQuestion: (totalQuestions: number, onComplete: (score: number, attempted: number) => void) => void;
  previousQuestion: () => void;
}

// Create our Zustand store with an initialize method.
export const useQuizStore = create<QuizState>((set) => ({
  currentQuestion: 0,
  userAnswers: [],
  score: 0,
  attempted: 0,
  // Initialize the store state based on the total number of questions.
  initialize: (length: number) =>
    set({
      currentQuestion: 0,
      userAnswers: new Array(length).fill(null),
      score: 0,
      attempted: 0,
    }),
  answerQuestion: (index, correct) =>
    set((state) => {
      // Only allow answering if no answer has been recorded yet for this question.
      if (state.userAnswers[state.currentQuestion] != null) return state;
      const newAnswers = [...state.userAnswers];
      newAnswers[state.currentQuestion] = index;
      return {
        userAnswers: newAnswers,
        attempted: state.attempted + 1,
        score: index === correct ? state.score + 1 : state.score,
      };
    }),
  nextQuestion: (totalQuestions, onComplete) =>
    set((state) => {
      if (state.currentQuestion < totalQuestions - 1) {
        return { currentQuestion: state.currentQuestion + 1 };
      } else {
        // When finishing the quiz, call the onComplete callback.
        onComplete(state.score, state.attempted);
        return state;
      }
    }),
  previousQuestion: () =>
    set((state) => ({
      currentQuestion: Math.max(0, state.currentQuestion - 1),
    })),
}));