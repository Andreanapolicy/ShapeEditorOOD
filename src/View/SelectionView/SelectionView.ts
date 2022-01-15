import ShapeView from '../ShapeView/ShapeView';
import DragAndDropUseCaseView from '../UseCase/DragAndDropUseCase/DragAndDropUseCaseView';
import { Corners, cornersIDs } from '../Type/CornersIDs';
import { Point } from '../../Сommon/Point';
import ResizeUseCaseView from '../UseCase/ResizeUseCase/ResizeUseCaseView';

export default class SelectionView
{
    private readonly selectedClass: string = 'selected';
    private readonly cornerClass: string = 'corner';
    private readonly cornersIDs: Array<string> = cornersIDs;

    private readonly dragAndDropUseCaseView: DragAndDropUseCaseView;
    private readonly resizeUseCaseView: ResizeUseCaseView;
    private doOnMoveShapeCallbacks: Array<Function> = [];
    private doOnResizeWhileMovingShapeCallbacks: Array<Function> = [];
    private doOnResizeWhileMouseUpShapeCallbacks: Array<Function> = [];
    private doOnChangeFrameCallbacks: Array<Function> = [];

    constructor()
    {
        this.dragAndDropUseCaseView = new DragAndDropUseCaseView();
        this.resizeUseCaseView = new ResizeUseCaseView();

        this.dragAndDropUseCaseView.doOnMove((delta: Point) =>
            this.doOnMoveShapeCallbacks.forEach((callback: Function) => callback(delta)));

        this.dragAndDropUseCaseView.doOnMouseUp((delta: Point) =>
            this.doOnChangeFrameCallbacks.forEach((callback: Function) => callback(delta)));

        this.resizeUseCaseView.doOnChangeSize((delta: Point, cornerType: Corners) =>
            this.doOnResizeWhileMovingShapeCallbacks.forEach((callback: Function) => callback(delta, cornerType)));

        this.resizeUseCaseView.doOnResize((delta: Point, cornerType: Corners) =>
            this.doOnResizeWhileMouseUpShapeCallbacks.forEach((callback: Function) => callback(delta, cornerType)));
    }

    public select(shapeView: ShapeView): void
    {
        const documentShape: HTMLElement | null = document.getElementById(shapeView.getUUID());
        if (documentShape === null)
        {
            return;
        }

        if (documentShape.classList.contains(this.selectedClass))
        {
            return;
        }

        documentShape.classList.add(this.selectedClass);
        this.cornersIDs.forEach((cornerID: string) => {
            const newCorner: HTMLElement = document.createElement('div');
            newCorner.classList.add(this.cornerClass);
            newCorner.classList.add(cornerID.toLowerCase());
            newCorner.id = cornerID;
            SelectionView.setCornerPosition(newCorner, cornerID, documentShape);
            documentShape.appendChild(newCorner);
        });

        this.bindShape(documentShape);
        this.bindCorners();
    }

    public unselect(shapeView: ShapeView): void
    {
        const documentShape: HTMLElement | null = document.getElementById(shapeView.getUUID());

        if (documentShape === null)
        {
            return;
        }

        const corners = document.getElementsByClassName(this.cornerClass);
        while (corners.length !== 0)
        {
            corners.item(corners.length - 1)?.parentNode?.removeChild(corners[corners.length - 1]);
        }

        documentShape.classList.remove(this.selectedClass);
    }

    public doOnMoveShape(callback: Function): void
    {
        this.doOnMoveShapeCallbacks.push(callback);
    }

    public doOnResizeWhileMovingShape(callback: Function): void
    {
        this.doOnResizeWhileMovingShapeCallbacks.push(callback);
    }

    public doOnResizeWhileMouseUpShape(callback: Function): void
    {
        this.doOnResizeWhileMouseUpShapeCallbacks.push(callback);
    }

    public doOnChangeFrame(callback: Function): void
    {
        this.doOnChangeFrameCallbacks.push(callback);
    }

    private static setCornerPosition(corner: HTMLElement, cornerID: string, element: HTMLElement): void
    {
        const width: number = element.offsetWidth;
        const height: number = element.offsetHeight;

        switch (cornerID)
        {
            case Corners.topLeft:
                corner.style.top = '-5px';
                corner.style.left = '-5px';
                break;
            case Corners.topRight:
                corner.style.top = '-5px';
                corner.style.left = width - 5 + 'px';
                break;
            case Corners.bottomRight:
                corner.style.top = height - 5 + 'px';
                corner.style.left = width - 5 + 'px';
                break;
            case Corners.bottomLeft:
                corner.style.top = height - 5 + 'px';
                corner.style.left = '-5px';
                break;
        }
    }

    private bindShape(shape: HTMLElement): void
    {
        shape.addEventListener('mousedown', (event: MouseEvent) =>
        {
            const cursorPosition: Point = {top: event.pageY, left: event.pageX};
            this.dragAndDropUseCaseView.mouseDown(cursorPosition);
        })
    }

    private bindCorners(): void
    {
        this.cornersIDs.forEach((cornerID: string) => {
            const corner = document.getElementById(cornerID);
            corner?.addEventListener('mousedown', (event: MouseEvent) => {
                event.stopPropagation();
                const cursorPosition: Point = {top: event.pageY, left: event.pageX};

                this.resizeUseCaseView.mouseDown(cursorPosition, cornerID as Corners);
            });
        });
    }
}