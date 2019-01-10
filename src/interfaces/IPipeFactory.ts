import { IPiece } from "./IPiece";

export interface IPipeFactory {
    () : IPiece;
}