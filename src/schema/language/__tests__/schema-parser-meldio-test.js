import { expect } from 'chai';
import { describe, it } from 'mocha';
import { parse } from '../parser';

function createLocFn(body) {
  return (start, end) => ({
    start,
    end,
    source: {
      body,
      name: 'GraphQL',
    },
  });
}

function printJson(obj) {
  return JSON.stringify(obj, null, 2);
}

function typeNode(name, loc) {
  return {
    kind: 'NamedType',
    name: nameNode(name, loc),
    loc,
  };
}

function nameNode(name, loc) {
  return {
    kind: 'Name',
    value: name,
    loc,
  };
}

function fieldNode(name, type, loc) {
  return fieldNodeWithArgs(name, type, [], loc);
}

function fieldNodeWithArgs(name, type, args, loc) {
  return {
    kind: 'FieldDefinition',
    name,
    arguments: args,
    type,
    directives: [],
    loc,
  };
}

function typeConnection(type, edgeLabel, direction, cardinality, loc) {
  return {
    kind: 'ConnectionType',
    type,
    edgeLabel,
    direction,
    cardinality,
    loc,
  };
}

function typeConnectionJoin(connections, loc) {
  return {
    kind: 'ConnectionJoinType',
    connections,
    loc,
  };
}

// function typeEdge(type, edgeLabel, direction, loc) {
//   return {
//     kind: 'EdgeType',
//     type,
//     edgeLabel,
//     direction,
//     loc,
//   };
// }

describe('Schema Parser - Meldio Extensions', () => {
  it('Connection fields: singular out without edge labels', () => {
    const body = `type Hello { conn: --> World }`;

    const doc = parse(body);
    const loc = createLocFn(body);
    const expected = {
      kind: 'Document',
      definitions: [
        {
          kind: 'ObjectTypeDefinition',
          name: nameNode('Hello', loc(5, 10)),
          interfaces: [],
          directives: [],
          fields: [
            fieldNode(
              nameNode('conn', loc(13, 17)),
              typeConnection(
                typeNode('World', loc(23, 28)),
                null,
                'OUT',
                'SINGULAR',
                loc(19, 28)
              ),
              loc(13, 28)
            )
          ],
          loc: loc(0, 30),
        }
      ],
      loc: loc(0, 30),
    };
    expect(printJson(doc)).to.equal(printJson(expected));
  });

  it('Connection fields: plural out without edge labels', () => {
    const body = `type Hello { conn: ==> World }`;

    const doc = parse(body);
    const loc = createLocFn(body);
    const expected = {
      kind: 'Document',
      definitions: [
        {
          kind: 'ObjectTypeDefinition',
          name: nameNode('Hello', loc(5, 10)),
          interfaces: [],
          directives: [],
          fields: [
            fieldNode(
              nameNode('conn', loc(13, 17)),
              typeConnection(
                typeNode('World', loc(23, 28)),
                null,
                'OUT',
                'PLURAL',
                loc(19, 28)
              ),
              loc(13, 28)
            )
          ],
          loc: loc(0, 30),
        }
      ],
      loc: loc(0, 30),
    };
    expect(printJson(doc)).to.equal(printJson(expected));
  });

  it('Connection fields: singular in without edge labels', () => {
    const body = `type Hello { conn: <-- World }`;

    const doc = parse(body);
    const loc = createLocFn(body);
    const expected = {
      kind: 'Document',
      definitions: [
        {
          kind: 'ObjectTypeDefinition',
          name: nameNode('Hello', loc(5, 10)),
          interfaces: [],
          directives: [],
          fields: [
            fieldNode(
              nameNode('conn', loc(13, 17)),
              typeConnection(
                typeNode('World', loc(23, 28)),
                null,
                'IN',
                'SINGULAR',
                loc(19, 28)
              ),
              loc(13, 28)
            )
          ],
          loc: loc(0, 30),
        }
      ],
      loc: loc(0, 30),
    };
    expect(printJson(doc)).to.equal(printJson(expected));
  });

  it('Connection fields: plural in without edge labels', () => {
    const body = `type Hello { conn: <== World }`;

    const doc = parse(body);
    const loc = createLocFn(body);
    const expected = {
      kind: 'Document',
      definitions: [
        {
          kind: 'ObjectTypeDefinition',
          name: nameNode('Hello', loc(5, 10)),
          interfaces: [],
          directives: [],
          fields: [
            fieldNode(
              nameNode('conn', loc(13, 17)),
              typeConnection(
                typeNode('World', loc(23, 28)),
                null,
                'IN',
                'PLURAL',
                loc(19, 28)
              ),
              loc(13, 28)
            )
          ],
          loc: loc(0, 30),
        }
      ],
      loc: loc(0, 30),
    };
    expect(printJson(doc)).to.equal(printJson(expected));
  });

  it('Connection fields: singular out with edge label', () => {
    const body = `type Hello { conn: -Label-> World }`;

    const doc = parse(body);
    const loc = createLocFn(body);
    const expected = {
      kind: 'Document',
      definitions: [
        {
          kind: 'ObjectTypeDefinition',
          name: nameNode('Hello', loc(5, 10)),
          interfaces: [],
          directives: [],
          fields: [
            fieldNode(
              nameNode('conn', loc(13, 17)),
              typeConnection(
                typeNode('World', loc(28, 33)),
                typeNode('Label', loc(20, 25)),
                'OUT',
                'SINGULAR',
                loc(19, 33)
              ),
              loc(13, 33)
            )
          ],
          loc: loc(0, 35),
        }
      ],
      loc: loc(0, 35),
    };
    expect(printJson(doc)).to.equal(printJson(expected));
  });

  it('Connection fields: plural out with edge label', () => {
    const body = `type Hello { conn: = Label => World }`;

    const doc = parse(body);
    const loc = createLocFn(body);
    const expected = {
      kind: 'Document',
      definitions: [
        {
          kind: 'ObjectTypeDefinition',
          name: nameNode('Hello', loc(5, 10)),
          interfaces: [],
          directives: [],
          fields: [
            fieldNode(
              nameNode('conn', loc(13, 17)),
              typeConnection(
                typeNode('World', loc(30, 35)),
                typeNode('Label', loc(21, 26)),
                'OUT',
                'PLURAL',
                loc(19, 35)
              ),
              loc(13, 35)
            )
          ],
          loc: loc(0, 37),
        }
      ],
      loc: loc(0, 37),
    };
    expect(printJson(doc)).to.equal(printJson(expected));
  });

  it('Connection fields: singular in with edge label', () => {
    const body = `type Hello { conn: <- Label - World }`;

    const doc = parse(body);
    const loc = createLocFn(body);
    const expected = {
      kind: 'Document',
      definitions: [
        {
          kind: 'ObjectTypeDefinition',
          name: nameNode('Hello', loc(5, 10)),
          interfaces: [],
          directives: [],
          fields: [
            fieldNode(
              nameNode('conn', loc(13, 17)),
              typeConnection(
                typeNode('World', loc(30, 35)),
                typeNode('Label', loc(22, 27)),
                'IN',
                'SINGULAR',
                loc(19, 35)
              ),
              loc(13, 35)
            )
          ],
          loc: loc(0, 37),
        }
      ],
      loc: loc(0, 37),
    };
    expect(printJson(doc)).to.equal(printJson(expected));
  });

  it('Connection fields: plural in with edge label', () => {
    const body = `type Hello { conn: <=Label= World }`;

    const doc = parse(body);
    const loc = createLocFn(body);
    const expected = {
      kind: 'Document',
      definitions: [
        {
          kind: 'ObjectTypeDefinition',
          name: nameNode('Hello', loc(5, 10)),
          interfaces: [],
          directives: [],
          fields: [
            fieldNode(
              nameNode('conn', loc(13, 17)),
              typeConnection(
                typeNode('World', loc(28, 33)),
                typeNode('Label', loc(21, 26)),
                'IN',
                'PLURAL',
                loc(19, 33)
              ),
              loc(13, 33)
            )
          ],
          loc: loc(0, 35),
        }
      ],
      loc: loc(0, 35),
    };
    expect(printJson(doc)).to.equal(printJson(expected));
  });

  it('Connection join: singular in', () => {
    const body =
      `type Human { grandson: <-Fathered- Human <-Fathered- Human }`;

    const doc = parse(body);
    const loc = createLocFn(body);
    const expected = {
      kind: 'Document',
      definitions: [
        {
          kind: 'ObjectTypeDefinition',
          name: nameNode('Human', loc(5, 10)),
          interfaces: [],
          directives: [],
          fields: [
            fieldNode(
              nameNode('grandson', loc(13, 21)),
              typeConnectionJoin([
                typeConnection(
                  typeNode('Human', loc(35, 40)),
                  typeNode('Fathered', loc(25, 33)),
                  'IN',
                  'SINGULAR',
                  loc(23, 40)
                ),
                typeConnection(
                  typeNode('Human', loc(53, 58)),
                  typeNode('Fathered', loc(43, 51)),
                  'IN',
                  'SINGULAR',
                  loc(41, 58)
                ),
              ], loc(23, 58)),
              loc(13, 58)
            )
          ],
          loc: loc(0, 60),
        }
      ],
      loc: loc(0, 60),
    };
    expect(printJson(doc)).to.equal(printJson(expected));
  });

  it('Connection join: plural out', () => {
    const body =
      `type Human { grandparent: =Fathered=> Human =Fathered=> Human }`;

    const doc = parse(body);
    const loc = createLocFn(body);
    const expected = {
      kind: 'Document',
      definitions: [
        {
          kind: 'ObjectTypeDefinition',
          name: nameNode('Human', loc(5, 10)),
          interfaces: [],
          directives: [],
          fields: [
            fieldNode(
              nameNode('grandparent', loc(13, 24)),
              typeConnectionJoin([
                typeConnection(
                  typeNode('Human', loc(38, 43)),
                  typeNode('Fathered', loc(27, 35)),
                  'OUT',
                  'PLURAL',
                  loc(26, 43)
                ),
                typeConnection(
                  typeNode('Human', loc(56, 61)),
                  typeNode('Fathered', loc(45, 53)),
                  'OUT',
                  'PLURAL',
                  loc(44, 61)
                ),
              ], loc(26, 61)),
              loc(13, 61)
            )
          ],
          loc: loc(0, 63),
        }
      ],
      loc: loc(0, 63),
    };
    expect(printJson(doc)).to.equal(printJson(expected));
  });
});
