import { IPipeFactory } from './IPipeFactory';

export interface IPiper {
  addPipe(identity: string, pipe: IPipeFactory): IPiper;
}
