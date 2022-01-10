import { Point } from './Point';

export interface Frame
{
    leftTopPoint: Point,
    width: number,
    height: number
}

export const commonFrame: Frame = {leftTopPoint: {left: 10, top: 10}, width: 100, height: 100};