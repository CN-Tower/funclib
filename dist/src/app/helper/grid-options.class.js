"use strict";
exports.__esModule = true;
var GridOptions = /** @class */ (function () {
    function GridOptions() {
        this.pageSize = 10;
        this.pageList = [10, 25, 50, 100];
        this.search = true;
        this.strictSearch = false;
        this.searchText = '';
        this.pagination = true;
        this.paginationHAlign = 'left';
        this.paginationDetailHAlign = 'left';
        this.clickToSelect = false;
        this.showRefresh = true;
    }
    return GridOptions;
}());
exports.GridOptions = GridOptions;
