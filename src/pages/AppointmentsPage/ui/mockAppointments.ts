export const mockTimeSlots = {
  '25.06.2025': {
    '1': 'd35445de-7cd2-43fc-8ece-bc31f0de687a',
    '3': 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    '5': 'f9e8d7c6-b5a4-9382-7160-5948372615a0',
  },
  '26.06.2025': {
    '2': '12345678-9abc-def0-1234-567890abcdef',
    '4': 'abcdef12-3456-7890-abcd-ef1234567890',
  },
  '27.06.2025': {
    '1': '98765432-1abc-def0-9876-543210fedcba',
    '6': 'fedcba09-8765-4321-fedc-ba0987654321',
  },
};

export const mockCompanies = [
  { id: '1', name: 'ТехноСофт' },
  { id: '2', name: 'ИнноВейв' },
  { id: '3', name: 'ДатаПро' },
  { id: '4', name: 'КлаудТех' },
  { id: '5', name: 'АйТи Солюшнс' },
  { id: '6', name: 'СмартДев' },
  { id: '7', name: 'ФьючерТех' },
  { id: '8', name: 'ДиджиталКор' },
];

export const mockAppointmentDetails = {
  'd35445de-7cd2-43fc-8ece-bc31f0de687a': {
    company: 'ТехноСофт',
    description: 'Собеседование на позицию Frontend разработчика',
    curator: 'Иванов И.И.',
  },
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890': {
    company: 'ИнноВейв',
    description: 'Техническое интервью по React/Node.js',
    curator: 'Петров П.П.',
  },
  'f9e8d7c6-b5a4-9382-7160-5948372615a0': {
    company: 'ДатаПро',
    description: 'Презентация стажировочной программы',
    curator: 'Сидоров С.С.',
  },
  '12345678-9abc-def0-1234-567890abcdef': {
    company: 'КлаудТех',
    description: 'Групповое собеседование',
    curator: 'Козлов К.К.',
  },
  'abcdef12-3456-7890-abcd-ef1234567890': {
    company: 'АйТи Солюшнс',
    description: 'Знакомство с компанией и вакансиями',
    curator: 'Морозов М.М.',
  },
  '98765432-1abc-def0-9876-543210fedcba': {
    company: 'СмартДев',
    description: 'Техническое задание и код-ревью',
    curator: 'Волков В.В.',
  },
  'fedcba09-8765-4321-fedc-ba0987654321': {
    company: 'ФьючерТех',
    description: 'Финальное собеседование',
    curator: 'Лебедев Л.Л.',
  },
};

export const timePeriods = [
  { number: 1, time: '8:45', label: '1 пара (8:45)' },
  { number: 2, time: '10:35', label: '2 пара (10:35)' },
  { number: 3, time: '12:25', label: '3 пара (12:25)' },
  { number: 4, time: '14:45', label: '4 пара (14:45)' },
  { number: 5, time: '16:35', label: '5 пара (16:35)' },
  { number: 6, time: '18:25', label: '6 пара (18:25)' },
  { number: 7, time: '20:15', label: '7 пара (20:15)' },
];
