import ShapeView from '../ShapeView/ShapeView';
import { Corners, cornersIDs } from '../../common/CornersIDs';

export default class SelectionView
{
    private readonly selectedClass: string = 'selected';
    private readonly cornerClass: string = 'corner';
    private readonly cornersIDs: Array<string> = cornersIDs;
    private shape: ShapeView | null = null;

    public select(shape: ShapeView): void
    {
        this.deleteSelectionView();
        this.shape = shape;
        this.addSelectionView();
    }

    public getSelectedShape(): ShapeView | null
    {
        return this.shape;
    }

    public unselect(): void
    {
        this.deleteSelectionView();
        this.shape = null;
    }

    private addSelectionView(): void
    {
        if (this.shape === null)
        {
            return;
        }

        const shapeView: HTMLElement | null = document.getElementById(this.shape.getID());

        if (shapeView === null)
        {
            return;
        }

        shapeView.classList.add(this.selectedClass);
        this.cornersIDs.map((cornerID: string) => {
            const newCorner: HTMLElement = document.createElement('div');
            newCorner.classList.add(this.cornerClass);
            newCorner.classList.add(cornerID.toLowerCase());
            newCorner.id = cornerID;
            this.setCornerPosition(newCorner, cornerID);
            shapeView.appendChild(newCorner);
        });
    }

    private deleteSelectionView(): void
    {
        if (this.shape === null)
        {
            return;
        }

        const shapeView: HTMLElement | null = document.getElementById(this.shape.getID());

        if (shapeView === null)
        {
            return;
        }

        shapeView.classList.remove(this.selectedClass);
        shapeView.innerHTML = '';
    }

    private setCornerPosition(corner: HTMLElement, cornerID: string)
    {
        switch (cornerID)
        {
            case Corners.topLeft:
                corner.style.top = '-5px';
                corner.style.left = '-5px';
                break;
            case Corners.topRight:
                corner.style.top = '-5px';
                corner.style.left = (this.shape?.getFrame().width ?? 0) - 5 + 'px';
                break;
            case Corners.bottomRight:
                corner.style.top = (this.shape?.getFrame().height ?? 0) - 5 + 'px';
                corner.style.left = (this.shape?.getFrame().width ?? 0) - 5 + 'px';
                break;
            case Corners.bottomLeft:
                corner.style.top = (this.shape?.getFrame().height ?? 0) - 5 + 'px';
                corner.style.left = '-5px';
                break;
        }
    }
}