import { IShapeFactory } from './IShapeFactory';
import { ShapeType } from '../../common/ShapeType';
import { IShape } from '../Shape/IShape';
import Shape from '../Shape/Shape';

export default class ShapeFactory implements IShapeFactory
{
    public createShape(type: ShapeType): IShape
    {
        return new Shape({leftTopPoint: {left: 10, top: 10}, width: 10, height: 10}, type);
    }
}