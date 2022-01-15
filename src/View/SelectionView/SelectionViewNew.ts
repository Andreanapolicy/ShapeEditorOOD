import ShapeViewNew from '../ShapeView/ShapeViewNew';
import DragAndDropUseCaseView from '../../UseCase/DragAndDropUseCase/DragAndDropUseCaseView';
import { Corners, cornersIDs } from '../Type/CornersIDs';
import { Point } from '../../Сommon/Point';

export default class SelectionViewNew
{
    private readonly selectedClass: string = 'selected';
    private readonly cornerClass: string = 'corner';
    private readonly cornersIDs: Array<string> = cornersIDs;

    private readonly dragAndDropUseCaseView: DragAndDropUseCaseView;
    private doOnMoveShapeCallbacks: Array<Function> = [];
    private doOnResizeShapeCallbacks: Array<Function> = [];
    private doOnChangeFrameCallbacks: Array<Function> = [];

    constructor()
    {
        this.dragAndDropUseCaseView = new DragAndDropUseCaseView();
        this.dragAndDropUseCaseView.doOnMove((delta: Point) =>
            this.doOnMoveShapeCallbacks.forEach((callback: Function) => callback(delta)));

        this.dragAndDropUseCaseView.doOnMouseUp((delta: Point) =>
            this.doOnChangeFrameCallbacks.forEach((callback: Function) => callback(delta)));
    }

    public select(shapeView: ShapeViewNew): void
    {
        const documentShape: HTMLElement | null = document.getElementById('' + shapeView.getId());
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
            SelectionViewNew.setCornerPosition(newCorner, cornerID, documentShape);
            documentShape.appendChild(newCorner);
        });

        this.bindShape(documentShape);
        //this.bindCorners(shapeView.getFrame());
    }

    public unselect(shapeView: ShapeViewNew): void
    {
        const documentShape: HTMLElement | null = document.getElementById('' + shapeView.getId());

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

    public doOnResizeShape(callback: Function): void
    {
        this.doOnResizeShapeCallbacks.push(callback);
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

    // private bindCorners(frame: Frame): void
    // {
    //     this.cornersIDs.forEach((cornerID: string) => {
    //         const corner = document.getElementById(cornerID);
    //         corner?.addEventListener('mousedown', (event: MouseEvent) => {
    //             const cursorPosition: Point = {top: event.pageY, left: event.pageX};
    //
    //             this.resizeUseCaseView.cornerMouseDown(frame, corner as HTMLElement, cursorPosition);
    //         });
    //     });
    // }
}