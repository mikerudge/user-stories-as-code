import OwaspStories from '../owasp';

test('should generate owasp stories', () => {
  const stories = new OwaspStories();

  expect(stories.stories.size).toBeGreaterThan(20);

  expect(stories.listStories().length).toBeGreaterThan(20);
});
