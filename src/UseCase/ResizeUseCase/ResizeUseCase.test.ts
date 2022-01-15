import { Frame } from '../../Сommon/Frame';
import ResizeUseCase from './ResizeUseCase';
import { Point } from '../../Сommon/Point';
import { Corners } from '../../View/Type/CornersIDs';

describe('test of resize use case', () =>
{
    test('check simple cases for top left corner', () =>
    {
        const firstDelta: Point = {top: -20, left: -20};
        const secondDelta: Point = {top: 5, left: 5};
        const startFrame: Frame = {leftTopPoint: {top: 20, left: 20}, width: 20, height: 20};
        const firstFrame: Frame | null = ResizeUseCase.getResultFrame(firstDelta, startFrame, Corners.topLeft);
        const secondFrame: Frame | null = ResizeUseCase.getResultFrame(secondDelta, startFrame, Corners.topLeft);

        expect(firstFrame).toEqual({leftTopPoint: {top: 0, left: 0}, width: 40, height: 40});
        expect(secondFrame).toEqual({leftTopPoint: {top: 25, left: 25}, width: 15, height: 15});
    });

    test('check simple cases for top right corner', () =>
    {
        const firstDelta: Point = {top: -5, left: -5};
        const secondDelta: Point = {top: 5, left: 5};
        const startFrame: Frame = {leftTopPoint: {top: 20, left: 20}, width: 20, height: 20};
        const firstFrame: Frame | null = ResizeUseCase.getResultFrame(firstDelta, startFrame, Corners.topRight);
        const secondFrame: Frame | null = ResizeUseCase.getResultFrame(secondDelta, startFrame, Corners.topRight);

        expect(firstFrame).toEqual({leftTopPoint: {top: 15, left: 20}, width: 15, height: 25});
        expect(secondFrame).toEqual({leftTopPoint: {top: 25, left: 20}, width: 25, height: 15});
    });

    test('check simple cases for bottom right corner', () =>
    {
        const firstDelta: Point = {top: -5, left: -5};
        const secondDelta: Point = {top: 5, left: 5};
        const startFrame: Frame = {leftTopPoint: {top: 20, left: 20}, width: 20, height: 20};
        const firstFrame: Frame | null = ResizeUseCase.getResultFrame(firstDelta, startFrame, Corners.bottomRight);
        const secondFrame: Frame | null = ResizeUseCase.getResultFrame(secondDelta, startFrame, Corners.bottomRight);

        expect(firstFrame).toEqual({leftTopPoint: {top: 20, left: 20}, width: 15, height: 15});
        expect(secondFrame).toEqual({leftTopPoint: {top: 20, left: 20}, width: 25, height: 25});
    });

    test('check simple cases for bottom left corner', () =>
    {
        const firstDelta: Point = {top: -5, left: -5};
        const secondDelta: Point = {top: 5, left: 5};
        const startFrame: Frame = {leftTopPoint: {top: 20, left: 20}, width: 20, height: 20};
        const firstFrame: Frame | null = ResizeUseCase.getResultFrame(firstDelta, startFrame, Corners.bottomRight);
        const secondFrame: Frame | null = ResizeUseCase.getResultFrame(secondDelta, startFrame, Corners.bottomRight);

        expect(firstFrame).toEqual({leftTopPoint: {top: 20, left: 25}, width: 25, height: 15});
        expect(secondFrame).toEqual({leftTopPoint: {top: 20, left: 15}, width: 15, height: 25});
    });

    test('check overflow case for corners', () =>
    {
        const topLeftDelta: Point = {top: 10, left: 10};
        const topRightDelta: Point = {top: 10, left: 10};
        const bottomRightDelta: Point = {top: 10, left: 10};
        const bottomLeftDelta: Point = {top: 10, left: 10};

        const startFrame: Frame = {leftTopPoint: {top: 20, left: 20}, width: 20, height: 20};

        const topLeftFrame: Frame | null = ResizeUseCase.getResultFrame(topLeftDelta, startFrame, Corners.topLeft);
        const topRightFrame: Frame | null = ResizeUseCase.getResultFrame(topRightDelta, startFrame, Corners.topRight);
        const bottomRightFrame: Frame | null = ResizeUseCase.getResultFrame(bottomRightDelta, startFrame, Corners.bottomRight);
        const bottomLeftFrame: Frame | null = ResizeUseCase.getResultFrame(bottomLeftDelta, startFrame, Corners.bottomLeft);

        expect(topLeftFrame).toEqual(null);
        expect(topRightFrame).toEqual(null);
        expect(bottomRightFrame).toEqual(null);
        expect(bottomLeftFrame).toEqual(null);
    });
});