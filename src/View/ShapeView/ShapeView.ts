import {v4 as uuid} from 'uuid';
import { ShapeType } from '../../Model/Type/ShapeType';
import { Frame } from '../../Сommon/Frame';
import ShapeContentFactory from '../ShapeContentFactory/ShapeContentFactory';
import IShapeContent from '../ShapeContent/IShapeContent';
import IShapeView from './IShapeView';
import IShapeContentFactory from '../ShapeContentFactory/IShapeContentFactory';

export default class ShapeView implements IShapeView
{
    private readonly UUID: string;
    private readonly shapeContent: IShapeContent;
    private readonly shapeContentFactory: IShapeContentFactory;
    private frame: Frame;

    constructor(frame: Frame, type: ShapeType)
    {
        this.UUID = uuid();
        this.frame = frame;
        this.shapeContentFactory = new ShapeContentFactory();
        this.shapeContent = this.shapeContentFactory.createShapeContent(type, this.UUID);
    }

    public getUUID(): string
    {
        return this.UUID;
    }

    public getContent(): IShapeContent
    {
        return this.shapeContent;
    }

    public getFrame(): Frame
    {
        return this.frame;
    }

    public setFrame(newFrame: Frame): void
    {
        this.frame = newFrame;
        this.shapeContent.setFrame(newFrame);
    }
}