import { IShape } from '../Shape/IShape';
import { ShapeType } from '../../common/ShapeType';

export interface IShapeFactory
{
    createShape(type: ShapeType): IShape;
}