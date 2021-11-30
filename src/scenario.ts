/**
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
 * @author Mike Rudge
 * @date 28/11/2021
 * @export
 * @class Scenario
 */
export default class Scenario {
  title: string;
  given: string;
  when: string;
  then: string;
  and = new Set<string>();
  constructor(title: string) {
    this.title = title;
    this.given = '';
    this.when = '';
    this.then = '';
  }

  setTitle(title: string): Scenario {
    this.title = title;
    return this;
  }

  setGiven(given: string): Scenario {
    this.given = given;
    return this;
  }

  setWhen(when: string): Scenario {
    this.when = when;
    return this;
  }

  setThen(then: string): Scenario {
    this.then = then;
    return this;
  }

  addAnd(and: string | string[]): Scenario {
    if (Array.isArray(and)) {
      and.forEach((a) => this.and?.add(a));
    } else {
      this.and?.add(and);
    }
    return this;
  }

  generate(): string {
    // Scenario: Dr. Bill posts to his own blog
    // Given I am logged in as Dr. Bill
    // When I try to post to "Expensive Therapy"
    // Then I should see "Your article was published."
    let ands: string | null = '';
    if (this.and.size > 0) {
      this.and.forEach((and) => {
        ands += `And ${and}
    `;
      });
    }

    return `Scenario: ${this.title}
    Given ${this.given}
    ${ands.trim()}
    When ${this.when}
    Then ${this.then}
`;
  }
}
