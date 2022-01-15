import {v4 as uuid} from 'uuid';
import { IShapeFactory } from './IShapeFactory';
import { ShapeType } from '../Type/ShapeType';
import { IShape } from '../Shape/IShape';
import Shape from '../Shape/Shape';

export default class ShapeFactory implements IShapeFactory
{
    public createShape(type: ShapeType): IShape
    {
        return new Shape({leftTopPoint: {left: 10, top: 10}, width: 100, height: 100}, type, uuid());
    }
}