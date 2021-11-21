import Platform from '../platform';

it('allows name to be set', () => {
  const platform = new Platform({ name: 'Platform Test' });

  expect(platform.name).toBe('Platform Test');

  const platform2 = new Platform().setName('Platform Test 2');
  expect(platform2.name).toBe('Platform Test 2');

  const outputtedPlatform = platform2.output();
  expect(outputtedPlatform.name).toBe('Platform Test 2');
  // Check id is auto generated
  expect(platform2.id).toBeDefined();
  expect(outputtedPlatform.id).toBeDefined();
});
