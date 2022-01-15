import ShapeViewNew from '../ShapeView/ShapeViewNew';
import DragAndDropUseCaseView from '../../UseCase/DragAndDropUseCase/DragAndDropUseCaseView';
import { Corners, cornersIDs } from '../Type/CornersIDs';

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
    }

    public select(shapeView: ShapeViewNew): void
    {
        console.log('selected');
        const documentShape: HTMLElement | null = document.getElementById('' + shapeView.getId());
        if (documentShape === null)
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
        // documentShape.addEventListener('mousedown', () => {
        //     documentShape.addEventListener('mousemove', () => console.log('move'));
        //     documentShape.addEventListener('mouseup', () => console.log('up'));
        // });


    }

    public unselect(shapeView: ShapeViewNew): void
    {
        console.log('unselected');

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
}