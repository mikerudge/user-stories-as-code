import Scenario from '../scenario';
import { AcceptanceCriteria } from '../index';
test('should generate acceptence critiea', () => {
  const s1 = new Scenario('Maker starts a game')
    .setGiven('This')
    .setWhen('the Maker starts a game')
    .setThen('the Maker waits for a Breaker to join');

  const s2 = new Scenario('Maker starts a game')
    .setGiven('the Maker has started a game with the word "silky')
    .setWhen('the Maker starts a game')
    .addAnd('the make has permission')
    .setThen('the Maker waits for a Breaker to join');

  const acc = new AcceptanceCriteria({ feature: 'Guess the word', scenarios: [s1] }).addScenario(s2);

  console.log('acc', acc.generate());
  expect(acc.generate()).toBeDefined();
});
