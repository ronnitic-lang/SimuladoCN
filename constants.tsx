
import { Skill } from './types';

export const SKILLS: Skill[] = [
  // 1º ANO
  { code: 'EF01CI01', name: 'Materiais do cotidiano', year: 1, description: 'Comparar características de diferentes materiais...' },
  { code: 'EF01CI02', name: 'Corpo humano e funções', year: 1, description: 'Localizar, nomear e representar partes do corpo...' },
  { code: 'EF01CI03', name: 'Hábitos de higiene', year: 1, description: 'Discutir razões dos hábitos de higiene...' },
  { code: 'EF01CI04', name: 'Diversidade e respeito', year: 1, description: 'Valorização e acolhimento das diferenças físicas.' },
  { code: 'EF01CI05', name: 'Escalas de tempo', year: 1, description: 'Identificar períodos diários, dias, semanas, meses.' },
  { code: 'EF01CI06', name: 'Ritmo diário', year: 1, description: 'Sucessão de dias e noites no ritmo dos seres vivos.' },

  // 2º ANO
  { code: 'EF02CI01', name: 'Materiais do passado e presente', year: 2, description: 'Identificar materiais e usos de objetos cotidianos.', preRequisites: ['EF01CI01'] },
  { code: 'EF02CI02', name: 'Propriedades dos materiais', year: 2, description: 'Flexibilidade, dureza, transparência.', preRequisites: ['EF02CI01'] },
  { code: 'EF02CI03', name: 'Prevenção de acidentes', year: 2, description: 'Objetos cortantes, inflamáveis, eletricidade.' },
  { code: 'EF02CI04', name: 'Plantas e animais no ambiente', year: 2, description: 'Características físicas e relação com o meio.' },
  { code: 'EF02CI05', name: 'Importância da água e luz', year: 2, description: 'Manutenção da vida das plantas.' },
  { code: 'EF02CI06', name: 'Partes das plantas', year: 2, description: 'Raiz, caule, folhas, flores e frutos.', preRequisites: ['EF02CI05'] },
  { code: 'EF02CI07', name: 'Posições do Sol e sombras', year: 2, description: 'Movimento aparente do Sol ao longo do dia.', preRequisites: ['EF01CI05'] },
  { code: 'EF02CI08', name: 'Radiação solar em superfícies', year: 2, description: 'Aquecimento e reflexão em diferentes materiais.', preRequisites: ['EF02CI07'] },

  // 3º ANO
  { code: 'EF03CI01', name: 'Produção de sons', year: 3, description: 'Vibração de objetos e variáveis físicas.' },
  { code: 'EF03CI02', name: 'Luz e materiais', year: 3, description: 'Transparência, reflexão e opacidade.', preRequisites: ['EF02CI07'] },
  { code: 'EF03CI03', name: 'Saúde auditiva e visual', year: 3, description: 'Hábitos para manutenção da saúde sensorial.' },
  { code: 'EF03CI04', name: 'Modo de vida animal', year: 3, description: 'Alimentação, reprodução e locomoção.' },
  { code: 'EF03CI05', name: 'Ciclo de vida', year: 3, description: 'Alterações desde o nascimento em diversos animais.', preRequisites: ['EF03CI04'] },
  { code: 'EF03CI06', name: 'Classificação externa', year: 3, description: 'Penas, pelos, escamas, bicos.', preRequisites: ['EF03CI05'] },
  { code: 'EF03CI07', name: 'Características da Terra', year: 3, description: 'Formato esférico, água e solo.' },
  { code: 'EF03CI08', name: 'Observação do céu', year: 3, description: 'Sol, Lua, estrelas e planetas visíveis.', preRequisites: ['EF02CI07'] },
  { code: 'EF03CI09', name: 'Amostras de solo', year: 3, description: 'Cor, textura, cheiro e permeabilidade.' },
  { code: 'EF03CI10', name: 'Usos do solo', year: 3, description: 'Agricultura e extração de materiais.', preRequisites: ['EF03CI09'] },

  // 4º ANO
  { code: 'EF04CI01', name: 'Identificar misturas', year: 4, description: 'Misturas na vida diária e propriedades físicas.', preRequisites: ['EF02CI01'] },
  { code: 'EF04CI02', name: 'Transformações nos materiais', year: 4, description: 'Efeito de aquecimento, resfriamento e luz.' },
  { code: 'EF04CI03', name: 'Mudanças reversíveis/irreversíveis', year: 4, description: 'Cozimento, queima, mudanças de estado.' },
  { code: 'EF04CI04', name: 'Cadeias alimentares simples', year: 4, description: 'Produtores, consumidores e Sol.', preRequisites: ['EF03CI04'] },
  { code: 'EF04CI05', name: 'Matéria e energia em ecossistemas', year: 4, description: 'Fluxo entre componentes vivos e não vivos.', preRequisites: ['EF04CI04'] },
  { code: 'EF04CI06', name: 'Decomposição', year: 4, description: 'Papel de fungos e bactérias.', preRequisites: ['EF04CI04'] },
  { code: 'EF04CI07', name: 'Microrganismos na indústria', year: 4, description: 'Produção de alimentos e medicamentos.', preRequisites: ['EF04CI06'] },
  { code: 'EF04CI08', name: 'Prevenção de doenças', year: 4, description: 'Transmissão de vírus e bactérias.', preRequisites: ['EF01CI03'] },
  { code: 'EF04CI09', name: 'Pontos cardeais e gnômon', year: 4, description: 'Orientação pelas sombras.', preRequisites: ['EF01CI05'] },
  { code: 'EF04CI10', name: 'Bússola e gnômon', year: 4, description: 'Comparação de métodos de orientação.', preRequisites: ['EF04CI09'] },
  { code: 'EF04CI11', name: 'Ciclos da Lua e Terra', year: 4, description: 'Construção de calendários.', preRequisites: ['EF03CI08'] },

  // 5º ANO
  { code: 'EF05CI01', name: 'Propriedades físicas avançadas', year: 5, description: 'Densidade, condutibilidade, magnetismo.', preRequisites: ['EF04CI01'] },
  { code: 'EF05CI02', name: 'Ciclo hidrológico', year: 5, description: 'Mudanças de estado e clima.', preRequisites: ['EF04CI03'] },
  { code: 'EF05CI03', name: 'Cobertura vegetal e água', year: 5, description: 'Manutenção do ciclo e solos.', preRequisites: ['EF05CI02', 'EF03CI10'] },
  { code: 'EF05CI04', name: 'Consumo sustentável de água', year: 5, description: 'Usos cotidianos e sustentabilidade.', preRequisites: ['EF05CI03'] },
  { code: 'EF05CI05', name: 'Resíduos e reciclagem', year: 5, description: 'Soluções para descarte e reutilização.', preRequisites: ['EF01CI01'] },
  { code: 'EF05CI06', name: 'Nutrição: Digestão e Respiração', year: 5, description: 'Corresponsabilidade na nutrição.', preRequisites: ['EF01CI02'] },
  { code: 'EF05CI07', name: 'Sistema circulatório', year: 5, description: 'Distribuição de nutrientes e resíduos.', preRequisites: ['EF05CI06'] },
  { code: 'EF05CI08', name: 'Cardápio equilibrado', year: 5, description: 'Grupos alimentares e necessidades.', preRequisites: ['EF04CI04'] },
  { code: 'EF05CI09', name: 'Distúrbios nutricionais', year: 5, description: 'Obesidade e subnutrição.', preRequisites: ['EF05CI08'] },
  { code: 'EF05CI10', name: 'Constelações e visibilidade', year: 5, description: 'Mapas celestes e épocas do ano.', preRequisites: ['EF03CI08'] },
  { code: 'EF05CI11', name: 'Rotação da Terra', year: 5, description: 'Movimento aparente do Sol e estrelas.', preRequisites: ['EF04CI11'] },
  { code: 'EF05CI12', name: 'Fases da Lua', year: 5, description: 'Periodicidade e observação.', preRequisites: ['EF04CI11'] },
  { code: 'EF05CI13', name: 'Dispositivos de observação', year: 5, description: 'Lunetas, lupas e microscópios.', preRequisites: ['EF03CI02'] },

  // 6º ANO
  { code: 'EF06CI01', name: 'Tipos de misturas', year: 6, description: 'Homogêneas e heterogêneas.', preRequisites: ['EF04CI01'] },
  { code: 'EF06CI02', name: 'Reações químicas', year: 6, description: 'Evidências de transformações.', preRequisites: ['EF04CI02'] },
  { code: 'EF06CI03', name: 'Separação de misturas', year: 6, description: 'Métodos físicos.', preRequisites: ['EF06CI01', 'EF05CI01'] },
  { code: 'EF06CI04', name: 'Materiais sintéticos', year: 6, description: 'Impactos e benefícios.', preRequisites: ['EF02CI02'] },
  { code: 'EF06CI05', name: 'Teoria celular', year: 6, description: 'A célula como unidade.', preRequisites: ['EF01CI02'] },
  { code: 'EF06CI06', name: 'Níveis de organização', year: 6, description: 'Célula, tecido, órgão, sistema.', preRequisites: ['EF06CI05'] },
  { code: 'EF06CI07', name: 'Sistema nervoso', year: 6, description: 'Integração e resposta.', preRequisites: ['EF05CI07'] },
  { code: 'EF06CI08', name: 'Visão humana', year: 6, description: 'Estrutura e funcionamento do olho.', preRequisites: ['EF03CI02', 'EF06CI07'] },
  { code: 'EF06CI09', name: 'Sistemas muscular e esquelético', year: 6, description: 'Locomoção e sustentação.', preRequisites: ['EF01CI02'] },
  { code: 'EF06CI10', name: 'Drogas e sistema nervoso', year: 6, description: 'Impacto psicoativo.', preRequisites: ['EF02CI03'] },
  { code: 'EF06CI11', name: 'Camadas da Terra', year: 6, description: 'Núcleo, manto e crosta.', preRequisites: ['EF03CI07'] },
  { code: 'EF06CI12', name: 'Tipos de rochas', year: 6, description: 'Ígneas, metamórficas e sedimentares.', preRequisites: ['EF06CI11', 'EF03CI09'] },
  { code: 'EF06CI13', name: 'Esfericidade da Terra', year: 6, description: 'Evidências do formato do planeta.', preRequisites: ['EF03CI07'] },
  { code: 'EF06CI14', name: 'Movimentos da Terra', year: 6, description: 'Rotação e translação.', preRequisites: ['EF05CI11'] },
  { code: 'EF06CI15CA', name: 'Importância do solo', year: 6, description: 'Fertilidade e conservação.', preRequisites: ['EF03CI10'] },
  { code: 'EF06CI16CA', name: 'Hidrosfera', year: 6, description: 'Distribuição e estados da água.', preRequisites: ['EF05CI02'] },
  { code: 'EF06CI17CA', name: 'Biosfera', year: 6, description: 'Interação entre os meios.', preRequisites: ['EF06CI15CA', 'EF06CI16CA'] },
  { code: 'EF06CI18CA', name: 'Tratamento de água e esgoto', year: 6, description: 'Saúde pública e saneamento.', preRequisites: ['EF06CI16CA'] },

  // 7º ANO
  { code: 'EF07CI01', name: 'Máquinas simples', year: 7, description: 'Alavancas e roldanas.', preRequisites: ['EF05CI01'] },
  { code: 'EF07CI02', name: 'Temperatura e calor', year: 7, description: 'Conceitos de termologia.', preRequisites: ['EF05CI01'] },
  { code: 'EF07CI03', name: 'Propagação de calor', year: 7, description: 'Condução, convecção e irradiação.', preRequisites: ['EF07CI02'] },
  { code: 'EF07CI04', name: 'Equilíbrio termodinâmico', year: 7, description: 'Processos de troca térmica.', preRequisites: ['EF07CI03'] },
  { code: 'EF07CI05', name: 'Máquinas térmicas e combustíveis', year: 7, description: 'Evolução tecnológica.', preRequisites: ['EF07CI01'] },
  { code: 'EF07CI06', name: 'Modos de produção', year: 7, description: 'Impactos socioambientais.', preRequisites: ['EF07CI05'] },
  { code: 'EF07CI07', name: 'Biomas brasileiros', year: 7, description: 'Biodiversidade e ameaças.', preRequisites: ['EF04CI05'] },
  { code: 'EF07CI08', name: 'Catástrofes naturais', year: 7, description: 'Causas e consequências.', preRequisites: ['EF05CI02'] },
  { code: 'EF07CI09', name: 'Condições de saúde', year: 7, description: 'Indicadores e políticas.', preRequisites: ['EF04CI08'] },
  { code: 'EF07CI10', name: 'História da vacina', year: 7, description: 'Avanços e importância.', preRequisites: ['EF04CI08'] },
  { code: 'EF07CI11', name: 'História da Tecnologia', year: 7, description: 'Transformações sociais.', preRequisites: ['EF07CI06'] },
  { code: 'EF07CI12', name: 'Atmosfera terrestre', year: 7, description: 'Composição e camadas.', preRequisites: ['EF05CI02'] },
  { code: 'EF07CI13', name: 'Efeito estufa', year: 7, description: 'Processos naturais e antrópicos.', preRequisites: ['EF07CI12'] },
  { code: 'EF07CI14', name: 'Camada de ozônio', year: 7, description: 'Importância e degradação.', preRequisites: ['EF07CI13'] },
  { code: 'EF07CI15', name: 'Fenômenos naturais', year: 7, description: 'Vulcanismo e tectonismo.', preRequisites: ['EF06CI11'] },
  { code: 'EF07CI16', name: 'Deriva continental', year: 7, description: 'Teoria de Wegener.', preRequisites: ['EF07CI15'] },
  { code: 'EF07CI17CA', name: 'Os cinco reinos', year: 7, description: 'Classificação biológica.', preRequisites: ['EF03CI06', 'EF04CI07'] },

  // 8º ANO
  { code: 'EF08CI01', name: 'Fontes de energias', year: 8, description: 'Renováveis e não renováveis.', preRequisites: ['EF07CI02'] },
  { code: 'EF08CI02', name: 'Circuitos elétricos', year: 8, description: 'Componentes e funcionamento.', preRequisites: ['EF05CI01'] },
  { code: 'EF08CI03', name: 'Transformações da energia', year: 8, description: 'Conservação e degradação.', preRequisites: ['EF08CI02'] },
  { code: 'EF08CI04', name: 'Consumo da energia elétrica', year: 8, description: 'Cálculo de potência e custo.', preRequisites: ['EF08CI03'] },
  { code: 'EF08CI05', name: 'Uso consciente da energia', year: 8, description: 'Eficiência energética.', preRequisites: ['EF08CI04'] },
  { code: 'EF08CI06', name: 'Produção de energia elétrica', year: 8, description: 'Usinas e tecnologias.', preRequisites: ['EF08CI01'] },
  { code: 'EF08CI07', name: 'Tipos de reprodução', year: 8, description: 'Sexuada e assexuada.', preRequisites: ['EF03CI04', 'EF06CI05'] },
  { code: 'EF08CI08', name: 'Sexualidade e puberdade', year: 8, description: 'Mudanças físicas e emocionais.', preRequisites: ['EF06CI06'] },
  { code: 'EF08CI09', name: 'Saúde reprodutiva', year: 8, description: 'Métodos contraceptivos.', preRequisites: ['EF08CI08'] },
  { code: 'EF08CI10', name: 'ISTs', year: 8, description: 'Prevenção e tratamento.', preRequisites: ['EF04CI08', 'EF08CI09'] },
  { code: 'EF08CI11', name: 'Diversidade sexual', year: 8, description: 'Respeito e identidade.', preRequisites: ['EF01CI04'] },
  { code: 'EF08CI12', name: 'Eclipses', year: 8, description: 'Sombra e penumbra.', preRequisites: ['EF06CI14'] },
  { code: 'EF08CI13', name: 'Movimentos da Terra e estações', year: 8, description: 'Inclinação axial e translação.', preRequisites: ['EF06CI14'] },
  { code: 'EF08CI14', name: 'Oscilações climáticas', year: 8, description: 'Variabilidade natural.', preRequisites: ['EF07CI13'] },
  { code: 'EF08CI15', name: 'Previsão do tempo', year: 8, description: 'Variáveis meteorológicas.', preRequisites: ['EF08CI14'] },
  { code: 'EF08CI16', name: 'Equilíbrio ambiental e mudanças', year: 8, description: 'Aquecimento global.', preRequisites: ['EF07CI07', 'EF07CI13'] },
  { code: 'EF08CI17CE', name: 'Saúde individual e coletiva', year: 8, description: 'Saneamento e prevenção.', preRequisites: ['EF07CI09'] },

  // 9º ANO
  { code: 'EF09CI01', name: 'Estados físicos e modelos', year: 9, description: 'Mudanças sob ótica molecular.', preRequisites: ['EF04CI03'] },
  { code: 'EF09CI02', name: 'Tipos de reações químicas', year: 9, description: 'Síntese, análise e troca.', preRequisites: ['EF06CI02'] },
  { code: 'EF09CI03', name: 'O átomo', year: 9, description: 'Modelos atômicos e partículas.', preRequisites: ['EF06CI01'] },
  { code: 'EF09CI04', name: 'Luz branca', year: 9, description: 'Composição e espectro.', preRequisites: ['EF03CI02'] },
  { code: 'EF09CI05', name: 'Meios de comunicação', year: 9, description: 'Ondas eletromagnéticas.', preRequisites: ['EF08CI01'] },
  { code: 'EF09CI06', name: 'Radiação eletromagnética', year: 9, description: 'Aplicações e riscos.', preRequisites: ['EF09CI05'] },
  { code: 'EF09CI07', name: 'Radiação medicinal', year: 9, description: 'Diagnóstico e tratamento.', preRequisites: ['EF08CI17CE'] },
  { code: 'EF09CI08', name: 'Gametas', year: 9, description: 'Formação e função.', preRequisites: ['EF08CI07'] },
  { code: 'EF09CI09', name: 'Leis da hereditariedade', year: 9, description: 'Genética mendeliana.', preRequisites: ['EF09CI08'] },
  { code: 'EF09CI10', name: 'Evolução', year: 9, description: 'Teorias evolucionistas.', preRequisites: ['EF03CI05', 'EF08CI07'] },
  { code: 'EF09CI11', name: 'Adaptação e Seleção Natural', year: 9, description: 'Mecanismos darwinistas.', preRequisites: ['EF09CI10', 'EF07CI07'] },
  { code: 'EF09CI12', name: 'Unidades de conservação', year: 9, description: 'Tipos e importância.', preRequisites: ['EF08CI16'] },
  { code: 'EF09CI13', name: 'Consumo sustentável', year: 9, description: 'Sustentabilidade global.', preRequisites: ['EF09CI12'] },
  { code: 'EF09CI14', name: 'Astros celestiais', year: 9, description: 'Composição e localização.', preRequisites: ['EF06CI13'] },
  { code: 'EF09CI15', name: 'História da astronomia', year: 9, description: 'Evolução do conhecimento.', preRequisites: ['EF09CI14'] },
  { code: 'EF09CI16', name: 'Vida fora da Terra', year: 9, description: 'Exobiologia e exploração.', preRequisites: ['EF05CI10'] },
  { code: 'EF09CI17', name: 'Ciclo de vida solar', year: 9, description: 'Evolução estelar.', preRequisites: ['EF09CI14'] },
  { code: 'EF09CI18CE', name: '1ª Lei de Newton e Gravidade', year: 9, description: 'Física clássica e órbitas.', preRequisites: ['EF06CI14'] },
  { code: 'EF09CI19CE', name: 'Biotecnologia', year: 9, description: 'Manipulação genética e aplicações.', preRequisites: ['EF07CI11', 'EF04CI07'] },
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
