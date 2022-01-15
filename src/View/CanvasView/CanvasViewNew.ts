import { ShapeType } from '../../Model/Type/ShapeType';
import ShapeViewNew from '../ShapeView/ShapeViewNew';

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

    public addShape(shapeView: ShapeViewNew): void
    {
        const documentShape: HTMLElement = document.createElement('div');
        documentShape.id = '' + shapeView.getId();
        documentShape.classList.add(this.shapeClass);
        documentShape.appendChild(shapeView.getContent().getContent());
        document.getElementById(this.canvasID)?.appendChild(documentShape);
        shapeView.setFrame(shapeView.getFrame());
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
}