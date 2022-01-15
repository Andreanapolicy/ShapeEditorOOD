import { ShapeType } from '../../Model/Type/ShapeType';
import ShapeViewNew from '../ShapeView/ShapeViewNew';
import { Frame } from '../../Сommon/Frame';

export default class CanvasViewNew
{
    private readonly canvasID: string = 'canvas';
    private readonly addShapeButtonIDs = {
        'rectangle': 'addRectangle',
        'triangle': 'addTriangle',
        'circle': 'addCircle'
    };
    private readonly deleteButtonID: string = 'delete';
    private readonly doOnAddShapeCallbacks: Array<Function> = [];
    private readonly doOnDeleteShapeCallbacks: Array<Function> = [];
    private readonly doOnUnselectShapeCallbacks: Array<Function> = [];
    private readonly doOnSelectShapeCallbacks: Array<Function> = [];
    private readonly shapeClass: string = 'element';

    constructor()
    {
        document.getElementById(this.addShapeButtonIDs.rectangle)?.addEventListener('click', () =>
            this.doOnAddShapeCallbacks.forEach((callback: Function) => callback(ShapeType.RECTANGLE)));

        document.getElementById(this.addShapeButtonIDs.triangle)?.addEventListener('click', () =>
            this.doOnAddShapeCallbacks.forEach((callback: Function) => callback(ShapeType.TRIANGLE)));

        document.getElementById(this.addShapeButtonIDs.circle)?.addEventListener('click', () =>
            this.doOnAddShapeCallbacks.forEach((callback: Function) => callback(ShapeType.CIRCLE)));

        document.getElementById(this.deleteButtonID)?.addEventListener('click', () =>
            this.doOnDeleteShapeCallbacks.forEach((callback: Function) => callback()));

        document.addEventListener('mousedown', (event: Event) =>
        {
            if ((event.target as HTMLElement).id === this.canvasID)
            {
                this.doOnUnselectShapeCallbacks.forEach((callback: Function) => callback())
            }
        })
    }

    public doOnAddShape(callback: Function): void
    {
        this.doOnAddShapeCallbacks.push(callback);
    }

    public doOnDeleteShape(callback: Function): void
    {
        this.doOnDeleteShapeCallbacks.push(callback);
    }

    public doOnUnselectShape(callback: Function): void
    {
        this.doOnUnselectShapeCallbacks.push(callback);
    }

    public doOnSelectShape(callback: Function): void
    {
        this.doOnSelectShapeCallbacks.push(callback);
    }

    public addShape(shapeView: ShapeViewNew): void
    {
        const documentShape: HTMLElement = document.createElement('div');
        documentShape.id = '' + shapeView.getId();
        documentShape.classList.add(this.shapeClass);
        documentShape.appendChild(shapeView.getContent().getContent());
        document.getElementById(this.canvasID)?.appendChild(documentShape);
        shapeView.setFrame(shapeView.getFrame());

        documentShape.addEventListener('mousedown', () =>
            this.doOnSelectShapeCallbacks.forEach((callback: Function) => callback(documentShape.id)));

        CanvasViewNew.setDocumentShapeFrame(documentShape, shapeView.getFrame());
    }

    public deleteShapeView(id: number): void
    {
        const documentShape: HTMLElement | null = document.getElementById('' + id);
        if (documentShape === null)
        {
            return;
        }

        document.getElementById(this.canvasID)?.removeChild(documentShape);
    }

    private static setDocumentShapeFrame(element: HTMLElement, frame: Frame): void
    {
        element.style.width = frame.width + 'px';
        element.style.height = frame.height + 'px';
        element.style.top = frame.leftTopPoint.top + 'px';
        element.style.left = frame.leftTopPoint.top + 'px';
    }
}