import { IShape } from '../Shape/IShape';
import Shape from '../Shape/Shape';
import { ShapeType } from '../Type/ShapeType';
import ShapeFactory from './ShapeFactory';
import { IShapeFactory } from './IShapeFactory';
import { commonFrame } from '../../Сommon/Frame';

describe('test of shape factory', () =>
{
    test('create circle', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.CIRCLE);
        const shapeFactory: IShapeFactory = new ShapeFactory();

        expect(shapeFactory.createShape(ShapeType.CIRCLE)).toEqual(shape);
    });

    test('create rectangle', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.RECTANGLE);
        const shapeFactory: IShapeFactory = new ShapeFactory();

        expect(shapeFactory.createShape(ShapeType.RECTANGLE)).toEqual(shape);
    });

    test('create triangle', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.TRIANGLE);
        const shapeFactory: IShapeFactory = new ShapeFactory();

        expect(shapeFactory.createShape(ShapeType.TRIANGLE)).toEqual(shape);
    });
});