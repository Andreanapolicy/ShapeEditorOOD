import { Frame } from '../../Сommon/Frame';
import { Point } from '../../Сommon/Point';
import DragAndDropUseCase from './DragAndDropUseCase';
import { Scope } from '../../View/Type/Scope';

describe('test of drag and drop use case', () =>
{
    test('check simple cases for moving', () =>
    {
        const topLeftDelta: Point = {top: -25, left: -25};
        const topRightDelta: Point = {top: 25, left: -25};
        const bottomRightDelta: Point = {top: 25, left: 25};
        const bottomLeftDelta: Point = {top: -25, left: 25};

        const startFrame: Frame = {leftTopPoint: {top: 200, left: 200}, width: 20, height: 20};
        const topLeftFrame: Frame | null = DragAndDropUseCase.getResultFrame(topLeftDelta, startFrame, Scope);
        const topRightFrame: Frame | null = DragAndDropUseCase.getResultFrame(topRightDelta, startFrame, Scope);
        const bottomRightFrame: Frame | null = DragAndDropUseCase.getResultFrame(bottomRightDelta, startFrame, Scope);
        const bottomLeftFrame: Frame | null = DragAndDropUseCase.getResultFrame(bottomLeftDelta, startFrame, Scope);

        expect(topLeftFrame).toEqual({leftTopPoint: {top: 175, left: 175}, width: 20, height: 20});
        expect(topRightFrame).toEqual({leftTopPoint: {top: 225, left: 175}, width: 20, height: 20});
        expect(bottomRightFrame).toEqual({leftTopPoint: {top: 225, left: 225}, width: 20, height: 20});
        expect(bottomLeftFrame).toEqual({leftTopPoint: {top: 175, left: 225}, width: 20, height: 20});
    });

    test('check overflow case for moving', () =>
    {
        const topLeftDelta: Point = {top: -234, left: -171};
        const topRightDelta: Point = {top: 25, left: -25123};
        const bottomRightDelta: Point = {top: 25, left: 1400};
        const bottomLeftDelta: Point = {top: -400, left: 25};

        const startFrame: Frame = {leftTopPoint: {top: 200, left: 200}, width: 20, height: 20};

        const topLeftFrame: Frame | null = DragAndDropUseCase.getResultFrame(topLeftDelta, startFrame, Scope);
        const topRightFrame: Frame | null = DragAndDropUseCase.getResultFrame(topRightDelta, startFrame, Scope);
        const bottomRightFrame: Frame | null = DragAndDropUseCase.getResultFrame(bottomRightDelta, startFrame, Scope);
        const bottomLeftFrame: Frame | null = DragAndDropUseCase.getResultFrame(bottomLeftDelta, startFrame, Scope);

        expect(topLeftFrame).toEqual(null);
        expect(topRightFrame).toEqual(null);
        expect(bottomRightFrame).toEqual(null);
        expect(bottomLeftFrame).toEqual(null);
    });
});