import { visit } from './visitor';
import type { ObjectValue } from './ast';

export function extractVariablesFromObjectValues(
  values: [ObjectValue]
): Array<string> {
  const variables = values
    .reduce( (acc, objectValue) => {
      const result = [ ];
      const visitor = {
        Variable: node => {
          result.push(node.name.value);
          return undefined;
        }
      };
      visit(objectValue, visitor);
      return acc.concat(result);
    }, [ ]);
  // return unique values:
  return Object.keys(
    variables.reduce( (acc, variable) => ({...acc, [variable]: true}), {}));
}
