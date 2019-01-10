import { IPerContext, IPipeFactory, IPiper, PipeFlow } from '.';

export class Piper implements IPiper {
  private pipes: { [k: string]: IPipeFactory[] } = {};

  /**
   * Add a pipeline to the execution registry
   *
   * @param {string} identity
   * @param {IPipe} pipe
   * @returns {IPiper}
   * @memberof PipeManager
   */
  public addPipe(identity: string, pipe: IPipeFactory): IPiper {
    if (!this.pipes[identity]) {
      this.pipes[identity] = [];
    }

    this.pipes[identity].push(pipe);

    return this;
  }

  /**
   * Execute a registered pipeline by name, using a context
   *
   * @param {string} identity
   * @param {IPerContext} context
   * @returns {Promise<IPerContext>}
   * @memberof PipeManager
   */
  public async execute(
    identity: string,
    context: IPerContext,
    args?: any
  ): Promise<IPerContext> {
    const pipes = this.pipes[identity] || [];

    for (const pipe of pipes) {
      context = await pipe().execute(context, args);
      if (context.flow !== PipeFlow.CONTINUE) {
        break;
      }
    }

    return context;
  }
}
