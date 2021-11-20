import Sprint from '../sprint';

it('can set the name', () => {
  const sprint = new Sprint({ name: 'Sprint 1', startDate: new Date(), endDate: new Date() });
  expect(sprint?.name).toBe('Sprint 1');
  sprint.name = 'Sprint 2';
  expect(sprint?.name).toBe('Sprint 2');
  sprint.setName('Sprint 3');
  expect(sprint?.name).toBe('Sprint 3');
});

it('can set the startDate', () => {
  const startDate = new Date();
  const sprint = new Sprint({ name: 'Sprint 1', startDate: startDate, endDate: new Date() });
  expect(sprint?.startDate).toBe(startDate);
  const updatedStartDate = new Date('2020-07-01');
  sprint.startDate = updatedStartDate;
  expect(sprint?.startDate).toBe(updatedStartDate);
  const updatedStartDate2 = new Date('2020-07-02');

  sprint.setStartDate(updatedStartDate2);
  expect(sprint?.startDate).toBe(updatedStartDate2);
});

it('can set the endDate', () => {
  const endDate = new Date();
  const sprint = new Sprint({ name: 'Sprint 1', startDate: endDate, endDate: endDate });
  expect(sprint?.endDate).toBe(endDate);
  // New Date
  const updatedEndDate = new Date('2020-07-01');
  sprint.endDate = updatedEndDate;
  expect(sprint?.endDate).toBe(updatedEndDate);
  // Another new date
  const updatedEndDate2 = new Date('2020-07-02');
  sprint.setEndDate(updatedEndDate2);
  expect(sprint?.endDate).toBe(updatedEndDate2);
});

it('can output to json', () => {
  const endDate = new Date('2020-11-01');
  const startDate = new Date('2020-10-01');
  const sprint = new Sprint({ name: 'Sprint 1', startDate: startDate, endDate: endDate });

  const s = sprint.output();
  expect(s).toHaveProperty('name', 'Sprint 1');
  expect(s).toHaveProperty('startDate', startDate);
  expect(s).toHaveProperty('endDate', endDate);
  expect(s).toHaveProperty('id');
  expect(s).not.toHaveProperty('setStartDate');
});
