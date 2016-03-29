import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  runTest,
  separateResults,
  tokenTypeDef,
  TYPE_RESERVED_SUFFIXES,
} from '../../../__tests__/setup';

import { NameSuffixIsNotReserved as rule } from '../NameSuffixIsNotReserved';

describe('Schema Validation: Mutation / NameSuffixIsNotReserved: ', () => {
  it('Rule throws if appropriate context is not passed',() => {
    expect(rule.bind(null, { })).to.throw(Error, /context not passed to rule/);
  });

  TYPE_RESERVED_SUFFIXES.forEach(suffix =>
    it(`Mutation name cannot end with ${suffix}`, () => {
      const test = ` mutation foo${suffix}(id: ID!) { id: ID! }
                     ${tokenTypeDef}`;
      const result = runTest(test);
      const { errors } = separateResults(result);
      expect(errors).to.deep.match(/The following suffixes are reserved/);
    }));
});
