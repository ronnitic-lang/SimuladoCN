
import { GoogleGenAI, Type } from "@google/genai";
import { Question, Difficulty, Skill } from "./types";

export const generateQuestions = async (
  skills: Skill[],
  counts: { [key in Difficulty]: number }
): Promise<Question[]> => {
  // Always use a new instance with the direct process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";
  
  const skillDetails = skills.map(s => `(${s.code}) ${s.name}: ${s.description}`).join('\n');
  const countStr = Object.entries(counts).map(([diff, count]) => `${count} questões de nível ${diff}`).join(', ');

  const prompt = `Gere um simulado de Ciências da Natureza para alunos do 6º ao 9º ano baseado nas seguintes habilidades BNCC:
${skillDetails}

Requisitos:
- Gere o seguinte total: ${countStr}.
- Cada questão deve ser OBJETIVA com 4 alternativas (A, B, C, D).
- Inclua um pequeno texto introdutório (introText) para cada questão.
- Se a questão se beneficiar de uma imagem, forneça uma descrição detalhada para a URL da imagem (imageUrl) usando um serviço de placeholder (ex: picsum.photos).
- Retorne no formato JSON rigoroso.

Atenção: A explicação deve ser didática e voltada para o professor.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skillCode: { type: Type.STRING },
                difficulty: { type: Type.STRING },
                introText: { type: Type.STRING },
                text: { type: Type.STRING },
                imageUrl: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      text: { type: Type.STRING }
                    },
                    required: ["id", "text"]
                  }
                },
                correctOptionId: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["skillCode", "difficulty", "text", "options", "correctOptionId", "explanation"]
            }
          }
        },
        required: ["questions"]
      }
    }
  });

  // Directly access the text property as per guidelines (do not call as a method)
  const data = JSON.parse(response.text || '{"questions": []}');
  return data.questions.map((q: any, index: number) => ({
    ...q,
    id: `q-${Date.now()}-${index}`,
    imageUrl: q.imageUrl ? `https://picsum.photos/seed/${index}/600/300` : undefined
  }));
};
