import { Epic } from '../epic';
import Milestone from '../milestone';

it('allows name to be set', () => {
  const epic = new Epic({ name: 'Epic Test' });

  expect(epic.name).toBe('Epic Test');

  const epic2 = new Epic().setName('Epic Test 2');
  expect(epic2.name).toBe('Epic Test 2');

  const outputtedEpic = epic2.output();
  expect(outputtedEpic.name).toBe('Epic Test 2');
  // Check id is auto generated
  expect(epic2.id).toBeDefined();
  expect(outputtedEpic.id).toBeDefined();
});

it('allows description to be set', () => {
  const epic = new Epic({ description: 'Epic Description' });

  expect(epic.description).toBe('Epic Description');

  const epic2 = new Epic().setDescription('Epic Description 2');
  expect(epic2.description).toBe('Epic Description 2');

  const outputtedEpic = epic2.output();
  expect(outputtedEpic.description).toBe('Epic Description 2');
});

it('allows color to be set', () => {
  const epic = new Epic({ color: 'Epic Color' });

  expect(epic.color).toBe('Epic Color');

  const epic2 = new Epic().setColor('Epic Color 2');
  expect(epic2.color).toBe('Epic Color 2');

  const outputtedEpic = epic2.output();
  expect(outputtedEpic.color).toBe('Epic Color 2');
});

it('allows milestone to be set', () => {
  const now = new Date();
  const milestone = new Milestone({ name: 'Milestone Test', startDate: now, endDate: now });

  const epic = new Epic({ name: 'Epic Test', milestone: milestone });

  expect(epic?.milestone?.name).toBe('Milestone Test');

  const epic2 = new Epic();
  expect(epic2.milestone).toBeUndefined();
  epic2.setMilestone(milestone);
  expect(epic2.milestone?.name).toBe('Milestone Test');

  const outputtedEpic = epic2.output();
  expect(outputtedEpic.milestone?.name).toBe('Milestone Test');
  // Check id is auto generated
  expect(epic2.id).toBeDefined();
  expect(outputtedEpic.id).toBeDefined();
});
