import { IPerContext } from '..';
import { PipeFlow } from '../enums/PipeFlow';
import { IPiece } from '../interfaces/IPiece';
import { Piper } from '../Piper';

class TestContext implements IPerContext {
  constructor(public input: any) {}
  debug: { currentPipe: string };
  flow: PipeFlow = PipeFlow.CONTINUE;
  output: any;
}

class PieceOne implements IPiece {
  public async execute(context: TestContext, args: any): Promise<TestContext> {
    context.output = context.input[0] + context.input[1];
    return context;
  }
}

class PieceTwo implements IPiece {
  public async execute(context: TestContext, args: any): Promise<TestContext> {
    context.output = context.output + context.input[0] * context.input[1];
    return context;
  }
}

class Composition implements IPiece {
  /**
   *
   */
  private pieces: IPiece[];
  constructor(...pieces: IPiece[]) {
    this.pieces = pieces;
  }

  public async execute(context: IPerContext, args?: any): Promise<IPerContext> {
    for (const piece of this.pieces) {
      context = await piece.execute(context, args);
    }
    return context;
  }
}

test('PieceOne is executed.', async () => {
  const po = new PieceOne();
  const ctx = new TestContext([500, 2000]);
  const pp = new Piper();
  pp.addPipe('pieceOne', () => new PieceOne());
  await pp.execute('pieceOne', ctx);
  expect(ctx.output).toBe(2500);
});

test('Piece One and Two are executed.', async () => {
  const po = new PieceOne();
  const ctx = new TestContext([500, 2000]);
  const pp = new Piper();
  pp.addPipe(
    'pOneAndTwo',
    () => new Composition(new PieceOne(), new PieceTwo())
  );
  await pp.execute('pOneAndTwo', ctx);
  expect(ctx.output).toBe(1002500);
});
