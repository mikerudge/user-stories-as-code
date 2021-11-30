import Scenario from './scenario';

type AcceptanceCriteriaParams = {
  feature: string;
  scenarios?: Scenario[];
};

/**
 * Acceptance Criteria is a collection of scenarios that are used to validate the functionality of a feature. Each acceptance criteria should be added to a {@link UserStory}
 *
 * @see {@link Scenario}
 *
 * @remarks
 * Inspired by Gherkin which is a syntax for writing specifications in a narrative way.
 * Based on the concept of behaviour-driven development (BDD), Gherkin, follows a formula, with standard keywords for describing interactions, e.g.
 * - `Given` e.g., given some pre-condition i.e., used to introduce the pre-text
 * - `When` e.g., when an action is taken i.e., used to describe an action or process step
 * - `Then` e.g., then something occurs i.e., describes the effect of the action or step
 * - `These` steps can also be chained together or modified using:
 * - `And`, e.g., And when, and then, and then
 * - `But`, e.g., But when this action, then this occurs
 *
 * @see https://cucumber.io/docs/gherkin/reference/
 *
 *
 * @example
 *```typescript
 * const s1 = new Scenario('Maker starts a game')
 *    .setGiven('This')
 *    .setWhen('the Maker starts a game')
 *    .setThen('the Maker waits for a Breaker to join');
 *
 * const s2 = new Scenario('Maker starts a game')
 *  .setGiven('the Maker has started a game with the word "silky')
 *  .setWhen('the Maker starts a game')
 *  .addAnd('the make has permission')
 *  .setThen('the Maker waits for a Breaker to join');
 *
 * const acc = new AcceptanceCriteria({ feature: 'Guess the word', scenarios: [s1] }).addScenario(s2)
 *```
 * @description Acceptance Criteria
 * @author Mike Rudge
 * @date 27/11/2021
 * @class AcceptanceCriteria
 */
export default class AcceptanceCriteria {
  feature: string;
  scenarios = new Set<Scenario>();
  constructor(params?: AcceptanceCriteriaParams) {
    this.feature = params?.feature ?? '';

    if (params?.scenarios) {
      this.addScenario(params.scenarios);
    }
  }

  /**
   * @description set title of the feature
   * @author Mike Rudge
   * @date 27/11/2021
   * @param {string} feature
   * @returns {AcceptanceCriteria}
   * @memberof AcceptanceCriteria
   */
  setFeature(feature: string): AcceptanceCriteria {
    this.feature = feature;
    return this;
  }

  /**
   * @description Adds a scenario to the acceptance criteria
   * @author Mike Rudge
   * @date 27/11/2021
   * @param {(Scenario | Scenario[])} scenario
   * @returns {*}  {AcceptanceCriteria}
   * @memberof AcceptanceCriteria
   */
  addScenario(scenario: Scenario | Scenario[]): AcceptanceCriteria {
    if (Array.isArray(scenario)) {
      scenario.forEach((s) => this.scenarios.add(s));
    } else {
      this.scenarios.add(scenario);
    }
    return this;
  }

  generate(): string {
    let scenarios = '';

    this.scenarios.forEach((s) => {
      scenarios += `
${s.generate()}`;
    });

    return `Feature: ${this.feature}
    ${scenarios}
        `;
  }
}
