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
  edgeInWithoutLabel: <== Foo
  edgeInWithLabel: <=Label= Foo
  edgeOutWithoutLabel: ==> Foo
  edgeOutWithLabel: =Label=> Foo
  statusMessage: String
}

type ConnectionsTest {
  connInSingularNoLabel: <-- Foo
  connInPluralNoLabel: <== Foo
  connInSingularLabel: <-Label- Foo
  connInPluralLabel: <=Label= Foo
  connOutSingularNoLabel: --> Foo
  connOutPluralNoLabel: ==> Foo
  connOutSingularLabel: -Label-> Foo
  connOutPluralLabel: =Label=> Foo
  scalarConnection: ==> Int
  scalarConnectionWithEdge: =Edge=> Int
}

filter on ==> Foo {
  ONE: {node: {three: {eq: 1}}}
  TWO: {node: {three: {eq: 2}}}
  THREE: {node: {three: {eq: 3}}}
  SOME: (number: Int) {node: {three: {eq: $number}}}
  ANY: {}
}

order on ==> Foo {}

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

filter on ==> Bar {}

filter on =Label=> Bar {}

filter on ==> String {}

filter on =Label=> String {}

order on [Feed] {}

order on ==> Bar {}

order on =Label=> Bar {}

order on ==> String {}

order on =Label=> String {}

query noArgsRootQuery: String

query argsRootQuery(arg1: String, arg2: Int!): String

query noArgsRootQueryWithFields {
  foo: String!
  bar: [Bar!]!
}

query argsRootQueryWithFields(arg1: String, arg2: Int!) {
  foo: String!
  bar: [Bar!]!
}
`);

  });
});
