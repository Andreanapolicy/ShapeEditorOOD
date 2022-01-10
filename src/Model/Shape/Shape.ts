import { IShape } from './IShape';
import { Frame } from '../../common/Frame';
import { ShapeType } from '../../common/ShapeType';

export default class Shape implements IShape
{
    private readonly type: ShapeType;

    private doOnChangeFrameCallbacks: Array<Function> = [];
    private doOnDeleteCallbacks: Array<Function> = [];
    private frame: Frame;

    constructor(frame: Frame, type: ShapeType)
    {
        this.frame = frame;
        this.type = type;
    }

    public getType(): ShapeType
    {
        return this.type;
    }

    public getFrame(): Frame
    {
        return this.frame;
    }

    public setFrame(frame: Frame): void
    {
        this.frame = frame;
        this.doOnChangeFrameCallbacks.forEach((callback: Function) => callback());
    }

    public markDeleted(): void
    {
        this.doOnDeleteCallbacks.forEach((callback: Function) => callback());
    }

    public doOnChangeFrame(callback: Function): void
    {
        this.doOnChangeFrameCallbacks.push(callback);
    }

    public doOnDelete(callback: Function): void
    {
        this.doOnDeleteCallbacks.push(callback);
    }
}