import { Frame } from '../../common/Frame';
import { ShapeType } from '../../common/ShapeType';

export interface IShape
{
    setFrame(frame: Frame): void;
    getType(): ShapeType;
    getFrame(): Frame;
    markDeleted(): void;
    doOnChangeFrame(callback: Function): void;
    doOnDelete(callback: Function): void;
}