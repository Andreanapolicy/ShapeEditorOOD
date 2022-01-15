import { IShape } from './IShape';
import Shape from './Shape';
import { ShapeType } from '../Type/ShapeType';
import { commonFrame } from '../../Сommon/Frame';

describe('test of shape', () =>
{
    test('create circle', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.CIRCLE, '12321');

        expect(shape.getFrame()).toEqual(commonFrame);
        expect(shape.getType()).toEqual(ShapeType.CIRCLE);
        expect(shape.getUUID()).toEqual('12321');
    });

    test('create rectangle', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.RECTANGLE, '12321');

        expect(shape.getFrame()).toEqual(commonFrame);
        expect(shape.getType()).toEqual(ShapeType.RECTANGLE);
        expect(shape.getUUID()).toEqual('12321');
    });

    test('create triangle', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.TRIANGLE, '12321');

        expect(shape.getFrame()).toEqual(commonFrame);
        expect(shape.getType()).toEqual(ShapeType.TRIANGLE);
        expect(shape.getUUID()).toEqual('12321');
    });

    test('check notification', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.TRIANGLE, '12321');
        let isFrameChanged: boolean = false;
        let isDeleted: boolean = false;

        shape.doOnChangeFrame(() => isFrameChanged = true);
        shape.doOnDelete(() => isDeleted = true);

        expect(isFrameChanged).toEqual(false);
        expect(isDeleted).toEqual(false);

        shape.setFrame({leftTopPoint: {top: 10, left: 10}, width: 10, height: 11});

        expect(isFrameChanged).toEqual(true);
        expect(isDeleted).toEqual(false);

        shape.markDeleted();

        expect(isFrameChanged).toEqual(true);
        expect(isDeleted).toEqual(true);
    });
});