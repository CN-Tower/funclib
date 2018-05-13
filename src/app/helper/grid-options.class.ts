export /*pxfunc*/ class GridOptions {
    public pageSize: number = 10;
    public pageList: number[] = [10, 25, 50, 100];
    public search: boolean = true;
    public strictSearch: boolean = false;
    public searchText: string = '';
    public pagination: boolean = true;
    public paginationHAlign: string = 'left';
    public paginationDetailHAlign: string = 'left';
    public clickToSelect: boolean = false;
    public showRefresh: boolean = true;
}
