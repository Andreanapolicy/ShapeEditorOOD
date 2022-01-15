import IShapeContent from '../ShapeContent/IShapeContent';
import { Frame } from '../../Сommon/Frame';

export default interface IShapeView
{
    getUUID(): string;
    getContent(): IShapeContent;
    getFrame(): Frame;
    setFrame(newFrame: Frame): void;
}