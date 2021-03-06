import { ShapeType } from '../../Model/Type/ShapeType';
import Rectangle from '../ShapeContent/Rectangle';
import Circle from '../ShapeContent/Circle';
import Triangle from '../ShapeContent/Triangle';
import IShapeContent from '../ShapeContent/IShapeContent';
import IShapeContentFactory from './IShapeContentFactory';

export default class ShapeContentFactory implements IShapeContentFactory
{
    public createShapeContent(shapeType: ShapeType, id: string): IShapeContent
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