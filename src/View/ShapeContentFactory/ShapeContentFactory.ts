import { ShapeType } from '../../common/ShapeType';
import ShapeContent from '../ShapeContent/ShapeContent';
import Rectangle from '../ShapeContent/Rectangle';
import Circle from '../ShapeContent/Circle';
import Triangle from '../ShapeContent/Triangle';

export default class ShapeContentFactory
{
    public static createShapeContent(shapeType: ShapeType, id: string): ShapeContent
    {
        switch (shapeType)
        {
            case ShapeType.RECTANGLE:
                return new Rectangle(id);
            case ShapeType.CIRCLE:
                return new Circle(id);
            case ShapeType.TRIANGLE:
                return new Triangle(id);
        }
    }
}