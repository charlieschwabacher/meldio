import { expect } from 'chai';
import { describe, it } from 'mocha';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from '../parser';
import { print } from '../printer';

describe('Printer with Meldio Extensions', () => {

  const kitchenSink = readFileSync(
    join(__dirname, '/schema-kitchen-sink-meldio.graphql'),
    { encoding: 'utf8' }
  );

  it('does not alter ast', () => {
    const ast = parse(kitchenSink);
    const astCopy = JSON.parse(JSON.stringify(ast));
    print(ast);
    expect(ast).to.deep.equal(astCopy);
  });

  it('prints Meldio kitchen sink', () => {

    const ast = parse(kitchenSink);

    const printed = print(ast);

    /* eslint-disable max-len */
    expect(printed).to.equal(
`mutation addFoo(id: ID!, name: String!) {
  edge: FooEdge
  statusMessage: String
}

mutation addBar(id: ID!, name: String!) @directive(arg: "Foo") {
  status: String
  code: Int
}

mutation noArgsMutation: String

mutation noArgsMutation: String @withDirective

mutation argsMutation(arg1: String, arg2: Int!): String

mutation argsMutation(arg1: String, arg2: Int!): String @withDirective

type ConnectionsTest {
  connInSingular: <-Label- Foo
  connInPlural: <=Label= Foo
  connOutSingular: -Label-> Foo
  connOutPlural: =Label=> Foo
}

filter on =Label=> Foo {
  ONE: {node: {three: {eq: 1}}}
  TWO: {node: {three: {eq: 2}}}
  THREE: {node: {three: {eq: 3}}}
  SOME: (number: Int) {node: {three: {eq: $number}}}
  ANY: {}
}

order on =Label=> Foo {
  ONE: [{node: {one: ASCENDING}}, {node: {two: ASCENDING}}]
  TWO: [{node: {two: ASCENDING}}, {node: {one: ASCENDING}}]
  SINGLETON: {node: {two: ASCENDING}}
}

filter on [Feed] {}

filter on =Label=> Bar {}

order on [Feed] {}

order on =Label=> Bar {}

query noArgsRootQuery: String

query noArgsRootQuery: String @withDirective

query argsRootQuery(arg1: String, arg2: Int!): [String]

query argsRootQuery(arg1: String, arg2: Int!): String @withDirective

query noArgsRootQueryWithFields {
  foo: String!
  bar: [Bar!]!
}

query noArgsRootQueryWithFields @withDirective(foo: "BAR") {
  foo: String!
  bar: [Bar!]!
}

query argsRootQueryWithFields(arg1: String, arg2: Int!) {
  foo: String!
  bar: [Bar!]!
}

query argsRootQueryWithFields(arg1: String, arg2: Int!) @withDirective(foo: "BAR") {
  foo: String!
  bar: [Bar!]! @withFieldDirective
}
`);

  });
});
