import { ShapeType } from '../../Model/Type/ShapeType';
import ShapeContent from '../ShapeContent/ShapeContent';
import { Frame } from '../../Сommon/Frame';
import ShapeContentFactory from '../ShapeContentFactory/ShapeContentFactory';

export default class ShapeViewNew
{
    private readonly id: number;
    private readonly shapeContent: ShapeContent;
    private frame: Frame;

    constructor(id: number, frame: Frame, type: ShapeType)
    {
        this.id = id;
        this.frame = frame;
        this.shapeContent = ShapeContentFactory.createShapeContent(type, '' + id);
    }

    public getId(): number
    {
        return this.id;
    }

    public getContent(): ShapeContent
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