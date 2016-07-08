import { expect } from 'chai';
import { describe, it } from 'mocha';
import { parse } from '../parser';

import { extractVariablesFromObjectValues } from '../utils';

describe('extractVariablesFromObjectValues', () => {

  it('returns empty array when no variables are defined', () => {
    const test = `
      filter on =Foo=> Type {
        KEY: { node: { name: { eq: "123" }}}
      }`;
    const ast = parse(test);
    const conditionAST = ast.definitions[0].conditions[0].condition;
    const variables = extractVariablesFromObjectValues([ conditionAST ]);
    expect(variables).to.have.length(0);
  });

  it('extracts unique variables', () => {
    const test = `
      filter on =Foo=> Type {
        KEY: { node: { name: { lt: $foo, gt: $bar }}}
      }`;
    const ast = parse(test);
    const conditionAST = ast.definitions[0].conditions[0].condition;
    const variables = extractVariablesFromObjectValues([ conditionAST ]);
    expect(variables).to.have.length(2);
    expect(variables).to.contain('foo');
    expect(variables).to.contain('bar');
  });

  it('extracts non unique variables', () => {
    const test = `
      filter on =Foo=> Type {
        KEY: {
          node: {
            name: { lt: $foo, gt: $bar },
            title: { eq: $bar }
            baz: { eq: $foo }
          }
        }
      }`;
    const ast = parse(test);
    const conditionAST = ast.definitions[0].conditions[0].condition;
    const variables = extractVariablesFromObjectValues([ conditionAST ]);
    expect(variables).to.have.length(2);
    expect(variables).to.contain('foo');
    expect(variables).to.contain('bar');
  });

  it('extracts variables from multiple object values', () => {
    const test = `
      filter on =Foo=> Type {
        KEY: {
          node: {
            name: { lt: $foo, gt: $bar },
            title: { eq: $bar }
            baz: { eq: $foo }
          }
        }
        ANOTHER_KEY: {
          name: { lt: $baz, gt: $foo },
          title: { eq: $bar }
          baz: { eq: $zaz }
        }
      }`;
    const ast = parse(test);
    const conditionASTs = [
      ast.definitions[0].conditions[0].condition,
      ast.definitions[0].conditions[1].condition,
    ];
    const variables = extractVariablesFromObjectValues(conditionASTs);
    expect(variables).to.have.length(4);
    expect(variables).to.contain('foo');
    expect(variables).to.contain('bar');
    expect(variables).to.contain('baz');
    expect(variables).to.contain('zaz');
  });
});
