
export enum Difficulty {
  EASY = 'Fácil',
  MEDIUM = 'Médio',
  HARD = 'Difícil'
}

export enum UserRole {
  STUDENT = 'ALUNO',
  TEACHER = 'PROFESSOR'
}

export interface Skill {
  code: string;
  name: string;
  year: number;
  description: string;
  preRequisites?: string[]; // Array of skill codes
}

export interface Question {
  id: string;
  skillCode: string;
  difficulty: Difficulty;
  text: string;
  introText?: string;
  imageUrl?: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
}

export interface StudentAttempt {
  studentName: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
  score: number;
  timestamp: number;
}

export interface SimulationConfig {
  selectedSkillCodes: string[];
  counts: {
    [Difficulty.EASY]: number;
    [Difficulty.MEDIUM]: number;
    [Difficulty.HARD]: number;
  };
}
