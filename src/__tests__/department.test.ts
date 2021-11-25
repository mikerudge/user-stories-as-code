import Department from '../department';

it('Department allows name to be set', () => {
  const department = new Department({ name: 'Department Test' });

  expect(department.name).toBe('Department Test');

  const department2 = new Department().setName('Department Test 2');
  expect(department2.name).toBe('Department Test 2');

  const outputtedDepartment = department2.output();
  expect(outputtedDepartment.name).toBe('Department Test 2');
  // Check id is auto generated
  expect(department2.id).toBeDefined();
  expect(outputtedDepartment.id).toBeDefined();
});
