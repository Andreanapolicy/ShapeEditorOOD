import ShapeViewNew from '../ShapeView/ShapeViewNew';
import SelectionViewNew from './SelectionViewNew';

export default class Selection
{
    private readonly selectionView: SelectionViewNew;
    private shapeView: ShapeViewNew | null = null;

    constructor()
    {
        this.selectionView = new SelectionViewNew();
    }

    public select(shapeView: ShapeViewNew): void
    {
        if (this.shapeView !== null)
        {
            this.selectionView.unselect(this.shapeView);
        }

        this.shapeView = shapeView;
        this.selectionView.select(shapeView);
    }

    public unselect(): void
    {
        if (this.shapeView !== null)
        {
            this.selectionView.unselect(this.shapeView);
            this.shapeView = null;
        }
    }

    public getSelected(): ShapeViewNew | null
    {
        return this.shapeView;
    }
}