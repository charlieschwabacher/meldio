import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Source } from '../source';
import { lex, TokenKind } from '../lexer';

function lexOne(str) {
  return lex(new Source(str))();
}

describe('Meldio Lexer Extensions', () => {

  it('lexes description comments', () => {

    expect(
      lexOne('## test description')
    ).to.deep.equal({
      kind: TokenKind.DESCRIPTION,
      start: 0,
      end: 19,
      value: 'test description'
    });

  });


  it('recognizes dash that is not part of a number', () => {

    expect(
      lexOne('- 4')
    ).to.deep.equal({
      kind: TokenKind.DASH,
      start: 0,
      end: 1,
      value: undefined,
    });

    const lexer = lex(new Source('-- 4'));
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.DASH,
      start: 0,
      end: 1,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.DASH,
      start: 1,
      end: 2,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.INT,
      start: 3,
      end: 4,
      value: '4',
    });
  });

  it('recognizes right single arrow symbols', () => {
    const lexer = lex(new Source('-->'));
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.DASH,
      start: 0,
      end: 1,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.DASH,
      start: 1,
      end: 2,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.GREATER,
      start: 2,
      end: 3,
      value: undefined,
    });
  });

  it('recognizes left single arrow symbols', () => {
    const lexer = lex(new Source('<--'));
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.LESS,
      start: 0,
      end: 1,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.DASH,
      start: 1,
      end: 2,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.DASH,
      start: 2,
      end: 3,
      value: undefined,
    });
  });

  it('recognizes right plural arrow symbols', () => {
    const lexer = lex(new Source('==>'));
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.EQUALS,
      start: 0,
      end: 1,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.EQUALS,
      start: 1,
      end: 2,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.GREATER,
      start: 2,
      end: 3,
      value: undefined,
    });
  });

  it('recognizes left plural arrow symbols', () => {
    const lexer = lex(new Source('<=='));
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.LESS,
      start: 0,
      end: 1,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.EQUALS,
      start: 1,
      end: 2,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.EQUALS,
      start: 2,
      end: 3,
      value: undefined,
    });
  });

  it('recognizes outbound singular connection symbols', () => {
    const lexer = lex(new Source('- Authored -> User'));
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.DASH,
      start: 0,
      end: 1,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.NAME,
      start: 2,
      end: 10,
      value: 'Authored',
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.DASH,
      start: 11,
      end: 12,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.GREATER,
      start: 12,
      end: 13,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.NAME,
      start: 14,
      end: 18,
      value: 'User',
    });
  });

  it('recognizes inbound singular connection symbols', () => {
    const lexer = lex(new Source('<- Authored - User'));
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.LESS,
      start: 0,
      end: 1,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.DASH,
      start: 1,
      end: 2,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.NAME,
      start: 3,
      end: 11,
      value: 'Authored',
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.DASH,
      start: 12,
      end: 13,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.NAME,
      start: 14,
      end: 18,
      value: 'User',
    });
  });

  it('recognizes outbound plural connection symbols', () => {
    const lexer = lex(new Source('= Authored => User'));
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.EQUALS,
      start: 0,
      end: 1,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.NAME,
      start: 2,
      end: 10,
      value: 'Authored',
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.EQUALS,
      start: 11,
      end: 12,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.GREATER,
      start: 12,
      end: 13,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.NAME,
      start: 14,
      end: 18,
      value: 'User',
    });
  });

  it('recognizes inbound plural connection symbols', () => {
    const lexer = lex(new Source('<=Authored= User'));
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.LESS,
      start: 0,
      end: 1,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.EQUALS,
      start: 1,
      end: 2,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.NAME,
      start: 2,
      end: 10,
      value: 'Authored',
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.EQUALS,
      start: 10,
      end: 11,
      value: undefined,
    });
    expect(
      lexer()
    ).to.deep.equal({
      kind: TokenKind.NAME,
      start: 12,
      end: 16,
      value: 'User',
    });
  });
});
