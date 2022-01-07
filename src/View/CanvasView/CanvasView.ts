import { ISlide } from '../../model/Slide/ISlide';
import ShapeView from '../ShapeView/ShapeView';
import CanvasPresenter from '../../Presenter/CanvasPresenter/CanvasPresenter';
import { ShapeType } from '../../common/ShapeType';
import { IShape } from '../../model/Shape/IShape';
import { Frame } from '../../common/Frame';

export default class CanvasView
{
    private readonly canvasID: string = 'canvas';
    private readonly elementClass: string = 'element';
    private readonly model: ISlide;
    private readonly canvasPresenter: CanvasPresenter;
    private shapes: Array<ShapeView> = [];

    constructor(model: ISlide)
    {
        this.model = model;
        this.canvasPresenter = new CanvasPresenter(model);
        this.canvasPresenter.doOnChangeModel((shape: IShape) =>
        {
            const shapeView: ShapeView | undefined = this.shapes.find((shapeView: ShapeView) => shapeView.getShape() === shape);

            if (shapeView !== undefined)
            {
                this.changeShapeView(shapeView);
            }
        });

        this.bindAddShape();
    }

    public bindAddShape(): void
    {
        document.getElementById('addRectangle')?.addEventListener('click', () => this.addShape(ShapeType.RECTANGLE));
        document.getElementById('addTriangle')?.addEventListener('click', () => this.addShape(ShapeType.TRIANGLE));
        document.getElementById('addCircle')?.addEventListener('click', () => this.addShape(ShapeType.CIRCLE));
    }

    private addShape(type: ShapeType): void
    {
        console.log(type);
        const modelShape: IShape = this.canvasPresenter.addShape(ShapeType.RECTANGLE);

        let newShape = new ShapeView(modelShape.getFrame(), modelShape.getType(), modelShape);
        this.shapes.push(newShape);
        newShape.doOnChangeShape(() => this.changeShapeView(newShape));
        this.addShapeView(newShape);
    }

    private changeShapeView(shape: ShapeView): void
    {
        if (shape.getFrame().width === 0 && shape.getFrame().height === 0)
        {
            this.deleteShapeView(shape);
        }

        const shapeView: HTMLElement | null = document.getElementById((this.shapes.findIndex((shapeView: ShapeView) => shape === shapeView) ?? 0) as unknown as string);
        if (shapeView === null)
        {
            return;
        }

        CanvasView.setFrameToView(shapeView, shape.getFrame());
    }

    private addShapeView(shape: ShapeView): void
    {
        const newShape: HTMLElement = document.createElement("div");
        newShape.classList.add(this.elementClass);
        newShape.id = (this.shapes.findIndex((shapeView: ShapeView) => shape === shapeView) ?? 0) as unknown as string;
        CanvasView.setFrameToView(newShape, shape.getFrame());

        document.getElementById(this.canvasID)?.appendChild(newShape);
    }

    private static setFrameToView(element: HTMLElement, frame: Frame): void
    {
        element.style.width = frame.width as unknown as string;
        element.style.height = frame.height as unknown as string;
        element.style.top = frame.leftTopPoint.top as unknown as string;
        element.style.left = frame.leftTopPoint.left as unknown as string;
    }

    private deleteShapeView(shape: ShapeView): void
    {
        const deletedShape: HTMLElement | null = document.getElementById((this.shapes.findIndex((shapeView: ShapeView) => shape === shapeView) ?? 0) as unknown as string);

        if (deletedShape === null)
        {
            return;
        }

        document.getElementById(this.canvasID)?.removeChild(deletedShape);
    }
}