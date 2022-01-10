import { Frame } from '../../Сommon/Frame';
import { ShapeType } from '../Type/ShapeType';

export interface IShape
{
    setFrame(frame: Frame): void;
    getType(): ShapeType;
    getFrame(): Frame;
    markDeleted(): void;
    doOnChangeFrame(callback: Function): void;
    doOnDelete(callback: Function): void;
}