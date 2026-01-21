
import { Skill } from './types';

export const SKILLS: Skill[] = [
  // 1st Year
  { code: 'EF01CI01', name: 'Materiais do Cotidiano', year: 1, description: 'Comparar características de diferentes materiais...' },
  { code: 'EF01CI02', name: 'Corpo Humano', year: 1, description: 'Localizar, nomear e representar partes do corpo...' },
  { code: 'EF01CI03', name: 'Hábitos de Higiene', year: 1, description: 'Discutir razões dos hábitos de higiene...' },
  // 2nd Year
  { code: 'EF02CI01', name: 'Origem de Materiais', year: 2, description: 'Identificar de que materiais são feitos objetos...', preRequisites: ['EF01CI01'] },
  { code: 'EF02CI04', name: 'Plantas e Animais', year: 2, description: 'Descrever características de seres vivos...', preRequisites: ['EF01CI02'] },
  // 3rd Year
  { code: 'EF03CI04', name: 'Modo de Vida Animal', year: 3, description: 'Identificar modo de vida de animais...', preRequisites: ['EF02CI04'] },
  { code: 'EF03CI07', name: 'Terra e Representação', year: 3, description: 'Identificar características da Terra...' },
  // 4th Year
  { code: 'EF04CI01', name: 'Misturas Diárias', year: 4, description: 'Identificar misturas na vida diária...', preRequisites: ['EF02CI01'] },
  { code: 'EF04CI04', name: 'Cadeias Alimentares', year: 4, description: 'Analisar e construir cadeias alimentares...', preRequisites: ['EF03CI04'] },
  // 5th Year
  { code: 'EF05CI01', name: 'Propriedades Físicas', year: 5, description: 'Explorar fenômenos de densidade, magnetismo...', preRequisites: ['EF04CI01'] },
  { code: 'EF05CI06', name: 'Digestão e Respiração', year: 5, description: 'Corresponsáveis pela nutrição...', preRequisites: ['EF01CI02'] },
  // 6th Year
  { code: 'EF06CI01', name: 'Tipos de misturas', year: 6, description: 'Identificar misturas homogêneas e heterogêneas', preRequisites: ['EF04CI01', 'EF05CI01'] },
  { code: 'EF06CI02', name: 'Reações químicas', year: 6, description: 'Evidências de transformações químicas', preRequisites: ['EF04CI02'] },
  { code: 'EF06CI03', name: 'Separação de misturas', year: 6, description: 'Métodos físicos de separação', preRequisites: ['EF06CI01'] },
  { code: 'EF06CI05', name: 'Teoria celular', year: 6, description: 'A célula como unidade da vida', preRequisites: ['EF01CI02', 'EF05CI06'] },
  { code: 'EF06CI07', name: 'Sistema nervoso', year: 6, description: 'Funcionamento e integração do sistema nervoso', preRequisites: ['EF05CI06', 'EF05CI07'] },
  { code: 'EF06CI11', name: 'Camadas da Terra', year: 6, description: 'Estrutura interna do planeta', preRequisites: ['EF03CI07'] },
  // 7th Year
  { code: 'EF07CI01', name: 'Máquinas simples', year: 7, description: 'Alavancas e roldanas', preRequisites: ['EF05CI01'] },
  { code: 'EF07CI02', name: 'Temperatura e calor', year: 7, description: 'Conceitos básicos de termologia', preRequisites: ['EF05CI01'] },
  { code: 'EF07CI07', name: 'Biomas brasileiros', year: 7, description: 'Características da fauna e flora', preRequisites: ['EF04CI04', 'EF04CI05'] },
  // 8th Year
  { code: 'EF08CI01', name: 'Fontes de energias', year: 8, description: 'Classificação de fontes renováveis e não renováveis', preRequisites: ['EF07CI05'] },
  { code: 'EF08CI07', name: 'Tipos de reprodução', year: 8, description: 'Sexuada e assexuada em plantas e animais', preRequisites: ['EF06CI05', 'EF02CI06'] },
  { code: 'EF08CI16', name: 'Equilíbrio ambiental', year: 8, description: 'Impactos das mudanças climáticas', preRequisites: ['EF07CI13', 'EF07CI14'] },
  // 9th Year
  { code: 'EF09CI01', name: 'Estados físicos', year: 9, description: 'Mudanças de estado no modelo atômico', preRequisites: ['EF04CI03', 'EF05CI02'] },
  { code: 'EF09CI03', name: 'O átomo', year: 9, description: 'Evolução dos modelos atômicos', preRequisites: ['EF06CI01', 'EF06CI02'] },
  { code: 'EF09CI10', name: 'Evolução', year: 9, description: 'Teorias evolucionistas', preRequisites: ['EF08CI07', 'EF03CI04'] },
  { code: 'EF09CI11', name: 'Adaptação e Seleção', year: 9, description: 'Mecanismos de seleção natural', preRequisites: ['EF09CI10', 'EF07CI07'] },
];

export const GET_PREREQUISITES_RECURSIVE = (code: string, visited = new Set<string>()): string[] => {
  const skill = SKILLS.find(s => s.code === code);
  if (!skill || !skill.preRequisites) return [];
  
  let all: string[] = [...skill.preRequisites];
  skill.preRequisites.forEach(pre => {
    if (!visited.has(pre)) {
      visited.add(pre);
      all = [...all, ...GET_PREREQUISITES_RECURSIVE(pre, visited)];
    }
  });
  return Array.from(new Set(all));
};
