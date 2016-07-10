/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from '../parser';
import { print } from '../printer';

describe('Printer', () => {

  it('prints minimal ast', () => {
    const ast = {
      kind: 'ScalarTypeDefinition',
      name: { kind: 'Name', value: 'foo' }
    };
    expect(print(ast)).to.equal('scalar foo');
  });

  it('produces helpful error messages', () => {
    const badAst1 = { random: 'Data' };
    expect(() => print(badAst1)).to.throw(
      'Invalid AST Node: {"random":"Data"}'
    );
  });

  const kitchenSink = readFileSync(
    join(__dirname, '/schema-kitchen-sink.graphql'),
    { encoding: 'utf8' }
  );

  it('does not alter ast', () => {
    const ast = parse(kitchenSink);
    const astCopy = JSON.parse(JSON.stringify(ast));
    print(ast);
    expect(ast).to.deep.equal(astCopy);
  });

  it('prints kitchen sink', () => {

    const ast = parse(kitchenSink);

    const printed = print(ast);

    expect(printed).to.equal(
`## description of object type 'Foo'
## on many lines
type Foo implements Bar {
  ## description of field 'one'
  one: Type
  two(argument: InputType!): Type
  three(argument: InputType, other: String): Int
  four(argument: String = "string"): String
  five(argument: [String] = ["string", "string"]): String
  six(argument: InputType = {key: "value"}): Type
}

## description of interface 'Bar'
interface Bar {
  one: Type
  ## description of interface field 'four'
  four(argument: String = "string"): String
}

## description of union 'Feed'
union Feed = Story | Article | Advert

## description of scalar 'CustomScalar'
scalar CustomScalar

## description of enum 'Site'
enum Site {
  DESKTOP
  ## description of enum value 'MOBILE'
  MOBILE
}

## description of input 'InputType'
input InputType {
  key: String!
  ## description of input field 'answer'
  answer: Int = 42
}

extend type Foo {
  ## description of field in type extension 'seven'
  seven(argument: [String]): Type
}
`);

  });
});
