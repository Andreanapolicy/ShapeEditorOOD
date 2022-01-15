import { IShape } from './IShape';
import { Frame } from '../../Сommon/Frame';
import { ShapeType } from '../Type/ShapeType';

export default class Shape implements IShape
{
    private readonly type: ShapeType;
    private readonly UUID: string;

    private doOnChangeFrameCallbacks: Array<Function> = [];
    private doOnDeleteCallbacks: Array<Function> = [];
    private frame: Frame;

    constructor(frame: Frame, type: ShapeType, UUID: string)
    {
        this.frame = frame;
        this.type = type;
        this.UUID = UUID;
    }

    public getType(): ShapeType
    {
        return this.type;
    }

    public getFrame(): Frame
    {
        return this.frame;
    }

    public getUUID(): string
    {
        return this.UUID;
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