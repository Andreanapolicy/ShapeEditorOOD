import ShapeView from '../ShapeView/ShapeView';

export default class SelectionView
{
    private shape: ShapeView | null = null;

    constructor()
    {

    }

    public select(shape: ShapeView): void
    {
        this.shape = shape;
        console.log('select shape', shape);

    }

    public getSelectedShape(): ShapeView | null
    {
        return this.shape;
    }

    public unselect(): void
    {
        this.shape = null;
        console.log('unselect shape');

    }
}