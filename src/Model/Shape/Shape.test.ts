import { IShape } from './IShape';
import Shape from './Shape';
import { ShapeType } from '../Type/ShapeType';
import { commonFrame } from '../../Сommon/Frame';

describe('test of shape', () =>
{
    test('create circle', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.CIRCLE);

        expect(shape.getFrame()).toEqual(commonFrame);
        expect(shape.getType()).toEqual(ShapeType.CIRCLE);
    });

    test('create rectangle', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.RECTANGLE);

        expect(shape.getFrame()).toEqual(commonFrame);
        expect(shape.getType()).toEqual(ShapeType.RECTANGLE);
    });

    test('create triangle', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.TRIANGLE);

        expect(shape.getFrame()).toEqual(commonFrame);
        expect(shape.getType()).toEqual(ShapeType.TRIANGLE);
    });

    test('check notification', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.TRIANGLE);
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