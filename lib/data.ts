export type MuscleGroup = 'Peito' | 'Costas' | 'Pernas' | 'Ombros' | 'Bíceps' | 'Tríceps' | 'Abdômen' | 'Cardio';

export type DayOfWeek = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  description: string;
  videoDurationSec?: number;
  videoUrl?: string;
}

export interface WorkoutExercise {
  id: string;
  exercise: Exercise;
  sets: number;
  reps: string;
  restSeconds: number;
}

export interface DailyWorkout {
  id: string;
  day: DayOfWeek;
  title: string;
  focus: MuscleGroup[];
  exercises: WorkoutExercise[];
}

export interface ProgressEntry {
  id: string;
  date: string;
  weight: number;
  notes?: string;
  metrics?: {
    chest?: number;
    arm?: number;
    waist?: number;
    thigh?: number;
  };
}

export interface Student {
  id: string;
  name: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  goal: string;
  avatarUrl?: string;
  weeklyPlan: DailyWorkout[];
  progress: ProgressEntry[];
}

// Catálogo de Exercícios
export const EXERCISES: Record<string, Exercise> = {
  supino_reto: { id: 'supino_reto', name: 'Supino Reto com Barra', muscleGroup: 'Peito', description: 'Deitado no banco, desça a barra até o peitoral e empurre.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/sqOw2Y6uDWQ?autoplay=1&mute=1' },
  supino_inclinado: { id: 'supino_inclinado', name: 'Supino Inclinado (Barra ou Halteres)', muscleGroup: 'Peito', description: 'Trabalha a porção superior do peitoral. Não desça o peso muito próximo ao pescoço.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8?autoplay=1&mute=1' },
  crucifixo_halteres: { id: 'crucifixo_halteres', name: 'Crucifixo com Halteres', muscleGroup: 'Peito', description: 'Com os braços semi-flexionados, abra os braços e retorne contraindo o peito.', videoDurationSec: 30, videoUrl: 'https://www.youtube.com/embed/eozdVDA78K0?autoplay=1&mute=1' },
  crossover_polia: { id: 'crossover_polia', name: 'Crossover (Polia Média/Alta)', muscleGroup: 'Peito', description: 'Feche os braços contraindo o peitoral, com leve flexão de cotovelos.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/taI4XduLpTk?autoplay=1&mute=1' },
  voador_peck_deck: { id: 'voador_peck_deck', name: 'Voador (Peck Deck)', muscleGroup: 'Peito', description: 'Sente-se com as costas bem apoiadas e junte os braços focando na contração.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/eGjt4jcEAts?autoplay=1&mute=1' },
  flexao_braco: { id: 'flexao_braco', name: 'Flexão de Braço', muscleGroup: 'Peito', description: 'Mantenha o corpo reto como uma prancha e desça até o peito quase tocar o chão.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/_l3ySVKYVJ8?autoplay=1&mute=1' },
  pullover_halter: { id: 'pullover_halter', name: 'Pullover com Halter', muscleGroup: 'Peito', description: 'Deitado no banco, desça o halter para trás da cabeça com os braços semi-estendidos.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/FK4eVNwKzEo?autoplay=1&mute=1' },
  puxada_frente: { id: 'puxada_frente', name: 'Puxada Frontal Pulley', muscleGroup: 'Costas', description: 'Puxe a barra em direção ao peitoral, juntando as escápulas.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc?autoplay=1&mute=1' },
  remada_curvada: { id: 'remada_curvada', name: 'Remada Curvada', muscleGroup: 'Costas', description: 'Incline o tronco e puxe a barra em direção ao umbigo.', videoDurationSec: 50, videoUrl: 'https://www.youtube.com/embed/vT2GjY_Umpw?autoplay=1&mute=1' },
  agachamento: { id: 'agachamento', name: 'Agachamento Livre', muscleGroup: 'Pernas', description: 'Mantenha as costas retas e agache até as pernas formarem 90 graus.', videoDurationSec: 60, videoUrl: 'https://www.youtube.com/embed/1oed-UmAxFs?autoplay=1&mute=1' },
  leg_press: { id: 'leg_press', name: 'Leg Press 45º', muscleGroup: 'Pernas', description: 'Empurre a plataforma sem esticar os joelhos completamente.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/WzWeE42XG1w?autoplay=1&mute=1' },
  agachamento_guiada: { id: 'agachamento_guiada', name: 'Agachamento com Barra Guiada', muscleGroup: 'Pernas', description: 'Agachamento feito no smith (barra guiada) para maior estabilidade.', videoDurationSec: 60, videoUrl: 'https://www.youtube.com/embed/1oed-UmAxFs?autoplay=1&mute=1' },
  cadeira_extensora: { id: 'cadeira_extensora', name: 'Cadeira Extensora', muscleGroup: 'Pernas', description: 'Sente-se na máquina e estenda as pernas para isolar o quadríceps.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/E-cGE2c9T7A?autoplay=1&mute=1' },
  mesa_flexora: { id: 'mesa_flexora', name: 'Mesa Flexora', muscleGroup: 'Pernas', description: 'Deite de bruços no aparelho e flexione os joelhos levando os calcanhares em direção aos glúteos.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/x-6N1uV0TPE?autoplay=1&mute=1' },
  panturrilha_pe: { id: 'panturrilha_pe', name: 'Panturrilha em Pé', muscleGroup: 'Pernas', description: 'Em pé, eleve o corpo ficando na ponta dos pés, contraindo bem a panturrilha.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/B_C3jA-3u_k?autoplay=1&mute=1' },
  agachamento_fundo: { id: 'agachamento_fundo', name: 'Agachamento a Fundo', muscleGroup: 'Pernas', description: 'Dê um passo à frente com uma perna e flexione os joelhos, descendo o quadril em direção ao chão.', videoDurationSec: 50, videoUrl: 'https://www.youtube.com/embed/u1XgLYgikB0?autoplay=1&mute=1' },
  panturrilha_sentado: { id: 'panturrilha_sentado', name: 'Panturrilha Sentado', muscleGroup: 'Pernas', description: 'Sente-se no aparelho próprio e realize a flexão plantar para trabalhar o sóleo.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/aE1lK7yI4Yc?autoplay=1&mute=1' },
  stiff: { id: 'stiff', name: 'Stiff (Levantamento Terra Romeno)', muscleGroup: 'Pernas', description: 'Com os joelhos semi-estendidos, flexione o quadril levando o tronco para a frente.', videoDurationSec: 50, videoUrl: 'https://www.youtube.com/embed/cnmCcXEBikM?autoplay=1&mute=1' },
  agachamento_bulgaro: { id: 'agachamento_bulgaro', name: 'Agachamento Búlgaro', muscleGroup: 'Pernas', description: 'Apoie o peito de um pé em um banco e faça um agachamento unilateral com a perna da frente.', videoDurationSec: 60, videoUrl: 'https://www.youtube.com/embed/G_vG04eUqK0?autoplay=1&mute=1' },
  panturrilha_leg_press_45: { id: 'panturrilha_leg_press_45', name: 'Panturrilha no Leg Press 45º', muscleGroup: 'Pernas', description: 'No leg press 45º, posicione apenas a ponta dos pés e realize a extensão.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/0B9HZZr3238?autoplay=1&mute=1' },
  leg_press_90: { id: 'leg_press_90', name: 'Leg Press 90º', muscleGroup: 'Pernas', description: 'Empurre o peso verticalmente na máquina de Leg Press 90.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/aD2D0B65k3M?autoplay=1&mute=1' },
  desenvolvimento: { id: 'desenvolvimento', name: 'Desenvolvimento c/ Halteres', muscleGroup: 'Ombros', description: 'Empurre os halteres para cima da cabeça controladamente.', videoDurationSec: 35, videoUrl: 'https://www.youtube.com/embed/qEwKCR5JCog?autoplay=1&mute=1' },
  elevacao_lateral: { id: 'elevacao_lateral', name: 'Elevação Lateral', muscleGroup: 'Ombros', description: 'Eleve os braços ao lado do corpo até a altura do ombro.', videoDurationSec: 30, videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo?autoplay=1&mute=1' },
  elevacao_frontal: { id: 'elevacao_frontal', name: 'Elevação Frontal', muscleGroup: 'Ombros', description: 'Eleve os braços à frente do corpo até a altura dos ombros.', videoDurationSec: 30, videoUrl: 'https://www.youtube.com/embed/-t7fuZ0KhDA?autoplay=1&mute=1' },
  crucifixo_invertido: { id: 'crucifixo_invertido', name: 'Crucifixo Invertido (Peck Deck ou Halteres)', muscleGroup: 'Ombros', description: 'Foco na parte posterior do ombro. Faça o movimento abrindo os braços para trás.', videoDurationSec: 35, videoUrl: 'https://www.youtube.com/embed/k-5nU0YXXA4?autoplay=1&mute=1' },
  desenvolvimento_maquina: { id: 'desenvolvimento_maquina', name: 'Desenvolvimento na Máquina', muscleGroup: 'Ombros', description: 'Empurre as alças da máquina verticalmente com as costas bem apoiadas.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/WvLMauqrnK8?autoplay=1&mute=1' },
  remada_alta: { id: 'remada_alta', name: 'Remada Alta (Barra ou Polia)', muscleGroup: 'Ombros', description: 'Puxe o peso em direção ao queixo mantendo os cotovelos altos, foca no trapézio.', videoDurationSec: 35, videoUrl: 'https://www.youtube.com/embed/amCU-ziHITM?autoplay=1&mute=1' },
  encolhimento: { id: 'encolhimento', name: 'Encolhimento de Ombros', muscleGroup: 'Ombros', description: 'Eleve (encolha) os ombros em direção às orelhas para trabalhar o trapézio.', videoDurationSec: 30, videoUrl: 'https://www.youtube.com/embed/cJRVVxmytaM?autoplay=1&mute=1' },
  rosca_direta: { id: 'rosca_direta', name: 'Rosca Direta com Barra', muscleGroup: 'Bíceps', description: 'Flexione os cotovelos trazendo a barra até o peito.', videoDurationSec: 30, videoUrl: 'https://www.youtube.com/embed/ykJmrZ5v0Oo?autoplay=1&mute=1' },
  triceps_corda: { id: 'triceps_corda', name: 'Tríceps na Corda', muscleGroup: 'Tríceps', description: 'Estenda os cotovelos puxando a corda para baixo.', videoDurationSec: 35, videoUrl: 'https://www.youtube.com/embed/vB5OHsJ3EME?autoplay=1&mute=1' },
  triceps_banco: { id: 'triceps_banco', name: 'Tríceps Banco', muscleGroup: 'Tríceps', description: 'Apoie as mãos em um banco e desça o quadril flexionando os cotovelos.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/j_H8iR-uHAE?autoplay=1&mute=1' },
  rosca_direta_halteres: { id: 'rosca_direta_halteres', name: 'Rosca Direta com Halteres', muscleGroup: 'Bíceps', description: 'Flexione os cotovelos trazendo os halteres de forma alternada ou simultânea.', videoDurationSec: 35, videoUrl: 'https://www.youtube.com/embed/sAq_ocpRh_I?autoplay=1&mute=1' },
  rosca_martelo: { id: 'rosca_martelo', name: 'Rosca Martelo', muscleGroup: 'Bíceps', description: 'Flexione os cotovelos com pegada neutra (palmas voltadas uma para a outra).', videoDurationSec: 35, videoUrl: 'https://www.youtube.com/embed/zC3nLlEvin4?autoplay=1&mute=1' },
  triceps_testa_w: { id: 'triceps_testa_w', name: 'Tríceps Testa (Barra W)', muscleGroup: 'Tríceps', description: 'Traga a barra em direção à testa/topo da cabeça, mantendo cotovelos fixos.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/d_KZxkY_0cM?autoplay=1&mute=1' },
  triceps_frances_uni: { id: 'triceps_frances_uni', name: 'Tríceps Francês Unilateral', muscleGroup: 'Tríceps', description: 'Cotovelo apontado para o teto, estenda o braço segurando um halter.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/gBEEB1lE4OQ?autoplay=1&mute=1' },
  rosca_direta_w: { id: 'rosca_direta_w', name: 'Rosca Direta (Barra W)', muscleGroup: 'Bíceps', description: 'Evite o uso do impulso com o tronco durante o movimento.', videoDurationSec: 35, videoUrl: 'https://www.youtube.com/embed/k-pTtaBqRXY?autoplay=1&mute=1' },
  rosca_concentrada: { id: 'rosca_concentrada', name: 'Rosca Concentrada', muscleGroup: 'Bíceps', description: 'Apoiar o cotovelo na parte interna da coxa e focar na contração.', videoDurationSec: 35, videoUrl: 'https://www.youtube.com/embed/0AUGkch3tzc?autoplay=1&mute=1' },
  rosca_inversa: { id: 'rosca_inversa', name: 'Rosca Inversa (Barra)', muscleGroup: 'Bíceps', description: 'Pegada pronada, focando em braquial e antebraços.', videoDurationSec: 35, videoUrl: 'https://www.youtube.com/embed/nRgxYX2Ve9w?autoplay=1&mute=1' },
  rosca_inclinada: { id: 'rosca_inclinada', name: 'Rosca Inclinada (Banco 45°)', muscleGroup: 'Bíceps', description: 'Máximo alongamento do bíceps sentado em um banco inclinado.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/soxrZlIl35U?autoplay=1&mute=1' },
  triceps_pulley_barra_v: { id: 'triceps_pulley_barra_v', name: 'Tríceps Pulley (Barra V)', muscleGroup: 'Tríceps', description: 'Drop-set na última série é recomendado.', videoDurationSec: 35, videoUrl: 'https://www.youtube.com/embed/2-LAMcpzODU?autoplay=1&mute=1' },
  rosca_scott: { id: 'rosca_scott', name: 'Rosca Scott (Barra ou Máquina)', muscleGroup: 'Bíceps', description: 'Apoie bem os tríceps e evite alongar excessivamente os braços.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/yFj04c1_n4U?autoplay=1&mute=1' },
  triceps_coice: { id: 'triceps_coice', name: 'Tríceps Coice (Cabo ou Halter)', muscleGroup: 'Tríceps', description: 'Tronco inclinado, estenda o cotovelo para trás.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/ZO81bExngMI?autoplay=1&mute=1' },
  prancha: { id: 'prancha', name: 'Prancha Isométrica', muscleGroup: 'Abdômen', description: 'Mantenha o corpo reto apoiado nos antebraços e pontas dos pés.', videoDurationSec: 60, videoUrl: 'https://www.youtube.com/embed/ASdvN_XEl_c?autoplay=1&mute=1' },
  puxada_aberta_pulley: { id: 'puxada_aberta_pulley', name: 'Puxada Aberta no Pulley', muscleGroup: 'Costas', description: 'Tronco levemente inclinado.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc?autoplay=1&mute=1' },
  remada_baixa_triangulo: { id: 'remada_baixa_triangulo', name: 'Remada Baixa (Triângulo)', muscleGroup: 'Costas', description: 'Coluna neutra e peito estufado.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/GZbfZ033f74?autoplay=1&mute=1' },
  remada_maquina_pronada: { id: 'remada_maquina_pronada', name: 'Remada Máquina Pronada', muscleGroup: 'Costas', description: 'Estabilidade total do tronco.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/vT2GjY_Umpw?autoplay=1&mute=1' },
  lombar_banco_romano: { id: 'lombar_banco_romano', name: 'Lombar (Banco Romano)', muscleGroup: 'Costas', description: 'Fortalecimento da base.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/6eE5ntL0_b8?autoplay=1&mute=1' },
  barra_fixa: { id: 'barra_fixa', name: 'Barra Fixa (ou Gravitron)', muscleGroup: 'Costas', description: 'Eleve o corpo até o queixo passar da barra.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/i3KqB5D68P8?autoplay=1&mute=1' },
  puxada_alta_unilateral: { id: 'puxada_alta_unilateral', name: 'Puxada Alta Unilateral', muscleGroup: 'Costas', description: 'Puxada no pulley com apenas um braço por vez.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/HqD2JtSGu6E?autoplay=1&mute=1' },
  remada_cavalinho: { id: 'remada_cavalinho', name: 'Remada Cavalinho', muscleGroup: 'Costas', description: 'Foco no miolo das costas.', videoDurationSec: 50, videoUrl: 'https://www.youtube.com/embed/ZYiB62VOfY0?autoplay=1&mute=1' },
  pull_down_corda: { id: 'pull_down_corda', name: 'Pull-down com Corda', muscleGroup: 'Costas', description: 'Isolamento do grande dorsal.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/14Q1oGqK3J4?autoplay=1&mute=1' },
  levantamento_terra: { id: 'levantamento_terra', name: 'Levantamento Terra', muscleGroup: 'Costas', description: 'Foco em força bruta e explosão.', videoDurationSec: 50, videoUrl: 'https://www.youtube.com/embed/op9kVnSso6Q?autoplay=1&mute=1' },
  barra_fixa_peso: { id: 'barra_fixa_peso', name: 'Barra Fixa com Peso', muscleGroup: 'Costas', description: 'Adicione carga no cinto.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/i3KqB5D68P8?autoplay=1&mute=1' },
  remada_curvada_pronada: { id: 'remada_curvada_pronada', name: 'Remada Curvada (Pegada Pronada)', muscleGroup: 'Costas', description: 'Cadência controlada (3s na descida).', videoDurationSec: 50, videoUrl: 'https://www.youtube.com/embed/vT2GjY_Umpw?autoplay=1&mute=1' },
  remada_unilateral_serrote: { id: 'remada_unilateral_serrote', name: 'Remada Unilateral (Serrote)', muscleGroup: 'Costas', description: 'Sem descanso entre os braços.', videoDurationSec: 45, videoUrl: 'https://www.youtube.com/embed/7X8mN49G7b0?autoplay=1&mute=1' },
  face_pull: { id: 'face_pull', name: 'Face Pull (Corda)', muscleGroup: 'Ombros', description: 'Foco em deltoide posterior e postura.', videoDurationSec: 40, videoUrl: 'https://www.youtube.com/embed/0QsE04D1uDk?autoplay=1&mute=1' },
};

export const MOCK_STUDENTS: Student[] = [
  {
    id: 's1',
    name: 'Irmão João Silva',
    level: 'Iniciante',
    goal: 'Ganho de Massa e Saúde',
    progress: [
      { id: 'p1', date: '2023-01-15', weight: 75.5, metrics: { chest: 95, arm: 32, waist: 88, thigh: 55 } },
      { id: 'p2', date: '2023-02-15', weight: 76.8, metrics: { chest: 97, arm: 33, waist: 87, thigh: 56 } },
      { id: 'p3', date: '2023-03-15', weight: 78.0, metrics: { chest: 99, arm: 34, waist: 86, thigh: 57 } },
    ],
    weeklyPlan: [
      {
        id: 'w1_s1', day: 'Segunda', title: 'Treino A - Peito e Tríceps', focus: ['Peito', 'Tríceps'],
        exercises: [
          { id: 'we1', exercise: EXERCISES.supino_reto, sets: 4, reps: '10-12', restSeconds: 60 },
          { id: 'we2', exercise: EXERCISES.supino_inclinado, sets: 3, reps: '10-12', restSeconds: 60 },
          { id: 'we3', exercise: EXERCISES.voador_peck_deck, sets: 3, reps: '12', restSeconds: 45 },
          { id: 'we4', exercise: EXERCISES.triceps_corda, sets: 4, reps: '10-12', restSeconds: 60 },
          { id: 'we5', exercise: EXERCISES.triceps_banco, sets: 3, reps: '12', restSeconds: 60 },
        ]
      },
      {
        id: 'w2_s1', day: 'Terça', title: 'Treino B - Costas e Bíceps', focus: ['Costas', 'Bíceps'],
        exercises: [
          { id: 'we6', exercise: EXERCISES.puxada_frente, sets: 4, reps: '10-12', restSeconds: 60 },
          { id: 'we7', exercise: EXERCISES.remada_curvada, sets: 3, reps: '10-12', restSeconds: 60 },
          { id: 'we8', exercise: EXERCISES.remada_baixa_triangulo, sets: 3, reps: '12', restSeconds: 60 },
          { id: 'we9', exercise: EXERCISES.rosca_direta, sets: 4, reps: '10-12', restSeconds: 60 },
          { id: 'we10', exercise: EXERCISES.rosca_martelo, sets: 3, reps: '12-15', restSeconds: 45 },
        ]
      },
      {
        id: 'w3_s1', day: 'Quinta', title: 'Treino C - Pernas e Abdômen', focus: ['Pernas', 'Abdômen'],
        exercises: [
          { id: 'we11', exercise: EXERCISES.agachamento, sets: 4, reps: '8-10', restSeconds: 90 },
          { id: 'we12', exercise: EXERCISES.leg_press, sets: 3, reps: '10-12', restSeconds: 60 },
          { id: 'we13', exercise: EXERCISES.cadeira_extensora, sets: 3, reps: '12-15', restSeconds: 60 },
          { id: 'we14', exercise: EXERCISES.mesa_flexora, sets: 3, reps: '12-15', restSeconds: 60 },
          { id: 'we15', exercise: EXERCISES.panturrilha_pe, sets: 4, reps: '15-20', restSeconds: 45 },
          { id: 'we16', exercise: EXERCISES.prancha, sets: 3, reps: '45-60s', restSeconds: 45 },
        ]
      },
      {
        id: 'w4_s1', day: 'Sexta', title: 'Treino D - Ombros e Trapézio', focus: ['Ombros'],
        exercises: [
          { id: 'we17', exercise: EXERCISES.desenvolvimento, sets: 4, reps: '10-12', restSeconds: 60 },
          { id: 'we18', exercise: EXERCISES.elevacao_lateral, sets: 3, reps: '12-15', restSeconds: 45 },
          { id: 'we19', exercise: EXERCISES.encolhimento, sets: 4, reps: '15', restSeconds: 45 },
        ]
      }
    ]
  },
  {
    id: 's2',
    name: 'Irmã Maria Souza',
    level: 'Intermediário',
    goal: 'Condicionamento Físico',
    progress: [
      { id: 'p4', date: '2023-01-20', weight: 65.0, metrics: { chest: 88, arm: 28, waist: 72, thigh: 58 } },
      { id: 'p5', date: '2023-02-20', weight: 64.2, metrics: { chest: 87, arm: 28, waist: 70, thigh: 57 } },
      { id: 'p6', date: '2023-03-20', weight: 63.5, metrics: { chest: 86, arm: 28.5, waist: 68, thigh: 56 } },
    ],
    weeklyPlan: [
      {
        id: 'w1_s2', day: 'Segunda', title: 'Inferiores e Abdômen', focus: ['Pernas', 'Abdômen'],
        exercises: [
          { id: 'wm1', exercise: EXERCISES.agachamento, sets: 4, reps: '12', restSeconds: 60 },
          { id: 'wm2', exercise: EXERCISES.leg_press, sets: 4, reps: '15', restSeconds: 60 },
          { id: 'wm3', exercise: EXERCISES.prancha, sets: 4, reps: '60s', restSeconds: 45 },
        ]
      },
      {
        id: 'w1_s3', day: 'Terça', title: 'Superiores', focus: ['Costas', 'Peito', 'Ombros'],
        exercises: [
          { id: 'wm4', exercise: EXERCISES.puxada_frente, sets: 3, reps: '15', restSeconds: 45 },
          { id: 'wm5', exercise: EXERCISES.crucifixo_halteres, sets: 3, reps: '15', restSeconds: 45 },
          { id: 'wm6', exercise: EXERCISES.elevacao_lateral, sets: 4, reps: '12-15', restSeconds: 45 },
        ]
      }
    ]
  }
];

export const DAYS_ORDER: DayOfWeek[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
