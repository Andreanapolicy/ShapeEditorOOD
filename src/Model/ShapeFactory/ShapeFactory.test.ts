import { IShape } from '../Shape/IShape';
import Shape from '../Shape/Shape';
import { ShapeType } from '../Type/ShapeType';
import ShapeFactory from './ShapeFactory';
import { IShapeFactory } from './IShapeFactory';

describe('test of shape factory', () =>
{
    test('create circle', () =>
    {
        const shape: IShape = new Shape({leftTopPoint: {top: 10, left: 10}, width: 10, height: 10}, ShapeType.CIRCLE);
        const shapeFactory: IShapeFactory = new ShapeFactory();

        expect(shapeFactory.createShape(ShapeType.CIRCLE)).toEqual(shape);
    });

    test('create rectangle', () =>
    {
        const shape: IShape = new Shape({leftTopPoint: {top: 10, left: 10}, width: 10, height: 10}, ShapeType.RECTANGLE);
        const shapeFactory: IShapeFactory = new ShapeFactory();

        expect(shapeFactory.createShape(ShapeType.RECTANGLE)).toEqual(shape);
    });

    test('create triangle', () =>
    {
        const shape: IShape = new Shape({leftTopPoint: {top: 10, left: 10}, width: 10, height: 10}, ShapeType.TRIANGLE);
        const shapeFactory: IShapeFactory = new ShapeFactory();

        expect(shapeFactory.createShape(ShapeType.TRIANGLE)).toEqual(shape);
    });
});