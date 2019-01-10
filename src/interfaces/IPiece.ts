import { IPerContext } from './IPerContext';

export interface IPiece {
  execute(context: IPerContext, args?: any): Promise<IPerContext>;
}
