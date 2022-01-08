import { ISlide } from '../../Model/Slide/ISlide';
import ShapeView from '../ShapeView/ShapeView';
import CanvasPresenter from '../../Presenter/CanvasPresenter/CanvasPresenter';
import { ShapeType } from '../../common/ShapeType';
import { IShape } from '../../Model/Shape/IShape';
import { Frame } from '../../common/Frame';
import SelectionView from '../SelectionView/SelectionView';

export default class CanvasView
{
    private readonly canvasID: string = 'canvas';
    private readonly elementClass: string = 'element';
    private readonly model: ISlide;
    private readonly canvasPresenter: CanvasPresenter;
    private readonly selectionView: SelectionView;
    private shapes: Array<ShapeView> = [];

    constructor(model: ISlide)
    {
        this.model = model;
        this.canvasPresenter = new CanvasPresenter(model);
        this.selectionView = new SelectionView();
        this.canvasPresenter.doOnChangeModel((shape: IShape) =>
        {
            const shapeView: ShapeView | undefined = this.shapes.find((shapeView: ShapeView) => shapeView.getShape() === shape);

            if (shapeView !== undefined)
            {
                this.changeShapeView(shapeView);
            }
        });

        this.bindAddShape();
        this.bindCanvasEvent();
    }

    private bindAddShape(): void
    {
        document.getElementById('addRectangle')?.addEventListener('click', () => this.addShape(ShapeType.RECTANGLE));
        document.getElementById('addTriangle')?.addEventListener('click', () => this.addShape(ShapeType.TRIANGLE));
        document.getElementById('addCircle')?.addEventListener('click', () => this.addShape(ShapeType.CIRCLE));
    }

    private bindSelectShape(shape: ShapeView): void
    {
        const shapeView: HTMLElement | null = document.getElementById(shape.getID());
        if (shapeView === null)
        {
            return;
        }

        shapeView.addEventListener('click', () => this.selectionView.select(shape));
    }

    private bindCanvasEvent(): void
    {
        document.getElementById(this.canvasID)?.addEventListener('click', (event: Event) => {
            if ((event.target as HTMLElement).id === this.canvasID)
            {
                this.selectionView.unselect();
            }
        });
    }

    private addShape(type: ShapeType): void
    {
        const modelShape: IShape = this.canvasPresenter.addShape(type);

        let newShape = new ShapeView(modelShape.getFrame(), modelShape.getType(), modelShape, this.shapes.length.toString());
        this.shapes.push(newShape);
        newShape.doOnChangeShape(() => this.changeShapeView(newShape));
        this.addShapeView(newShape);

        this.bindSelectShape(newShape);
    }

    private changeShapeView(shape: ShapeView): void
    {
        if (shape.getFrame().width === 0 && shape.getFrame().height === 0)
        {
            this.deleteShapeView(shape);
        }

        const shapeView: HTMLElement | null = document.getElementById(shape.getID());
        if (shapeView === null)
        {
            return;
        }

        CanvasView.setFrameToView(shapeView, shape.getFrame());
    }

    private addShapeView(shape: ShapeView): void
    {
        const newShape: HTMLElement = document.createElement('div');
        newShape.classList.add(this.elementClass);
        newShape.classList.add(CanvasView.getClassByType(shape.getType()));
        newShape.id = shape.getID();
        document.getElementById(this.canvasID)?.appendChild(newShape);

        CanvasView.setFrameToView(newShape, shape.getFrame());
    }

    private static setFrameToView(element: HTMLElement, frame: Frame): void
    {
        element.style.width = frame.width + 'px';
        element.style.height = frame.height + 'px';
        element.style.top = frame.leftTopPoint.top + 'px';
        element.style.left = frame.leftTopPoint.left + 'px';
    }

    private static getClassByType(type: ShapeType): string
    {
        switch (type)
        {
            case ShapeType.CIRCLE:
                return 'circle';
            case ShapeType.RECTANGLE:
                return 'rectangle';
            case ShapeType.TRIANGLE:
                return 'triangle';
        }
    }

    private deleteShapeView(shape: ShapeView): void
    {
        const deletedShape: HTMLElement | null = document.getElementById(shape.getID());

        if (deletedShape === null)
        {
            return;
        }

        document.getElementById(this.canvasID)?.removeChild(deletedShape);
    }
}