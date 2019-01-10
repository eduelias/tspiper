import { PipeFlow } from '..';

export interface IPerContext {
  debug: { currentPipe: string };
  flow: PipeFlow;
}
