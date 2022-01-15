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
        const shape: IShape = new Shape(commonFrame, ShapeType.CIRCLE, '12321');
        const shapeFactory: IShapeFactory = new ShapeFactory();
        const shapeFromFactory: IShape = shapeFactory.createShape(ShapeType.CIRCLE);

        expect(shapeFromFactory.getFrame()).toEqual(shape.getFrame());
        expect(shapeFromFactory.getType()).toEqual(shape.getType());
    });

    test('create rectangle', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.RECTANGLE, '12321');
        const shapeFactory: IShapeFactory = new ShapeFactory();
        const shapeFromFactory: IShape = shapeFactory.createShape(ShapeType.RECTANGLE);

        expect(shapeFromFactory.getFrame()).toEqual(shape.getFrame());
        expect(shapeFromFactory.getType()).toEqual(shape.getType());
    });

    test('create triangle', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.TRIANGLE, '12321');
        const shapeFactory: IShapeFactory = new ShapeFactory();
        const shapeFromFactory: IShape = shapeFactory.createShape(ShapeType.TRIANGLE);

        expect(shapeFromFactory.getFrame()).toEqual(shape.getFrame());
        expect(shapeFromFactory.getType()).toEqual(shape.getType());
    });
});