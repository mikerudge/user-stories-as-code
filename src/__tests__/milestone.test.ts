import { Epic } from '../epic';
import Milestone from '../milestone';

it('allows name to be set', () => {
  const milestone = new Milestone({ name: 'Milestone Test' });

  expect(milestone.name).toBe('Milestone Test');

  const milestone2 = new Milestone().setName('Milestone Test 2');
  expect(milestone2.name).toBe('Milestone Test 2');

  const outputtedMilestone = milestone2.output();
  expect(outputtedMilestone.name).toBe('Milestone Test 2');
  // Check id is auto generated
  expect(milestone2.id).toBeDefined();
  expect(outputtedMilestone.id).toBeDefined();
});

it('allows dates to be set', () => {
  const now = new Date();
  const milestone = new Milestone({ startDate: now, endDate: now });

  expect(milestone.startDate).toBe(now);
  expect(milestone.endDate).toBe(now);

  const milestone2 = new Milestone().setStartDate(now).setEndDate(now);
  expect(milestone2.startDate).toBe(now);
  expect(milestone2.endDate).toBe(now);

  const outputtedMilestone = milestone2.output();
  expect(outputtedMilestone.startDate).toBe(now.toISOString());
  expect(outputtedMilestone.endDate).toBe(now.toISOString());
});
