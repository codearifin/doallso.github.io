window.onload = function() {
    var treeView;
    
    var syncTreeViewSelection = function(treeView, value){
        if (!treeView) return;
        
        if (!value) {
            treeView.unselectAll();
            return;
        }
        
        value.forEach(function(key){
            treeView.selectItem(key);
        });
    };
    
    var treeBoxOptions = {
        value: ko.observable(["1_1"]),
        valueExpr: "ID",
        displayExpr: "name",
        placeholder: "Select a value...",
        showClearButton: true,
        dataSource: treeProducts,
        treeView: {
            dataSource: treeProducts,
            dataStructure: "plain",
            keyExpr: "ID",
            parentIdExpr: "categoryId",
            selectionMode: "multiple",
            onContentReady: function(e) {
                treeView = e.component;
                syncTreeViewSelection(treeView, treeBoxOptions.value());
            },
            onItemSelectionChanged: function(args){
                treeBoxOptions.value(args.component.getSelectedNodesKeys());
            },
            displayExpr: "name",
            selectByClick: true,
            selectNodesRecursive: false,
            showCheckBoxesMode: "normal"
        }
    };
    
    var dataSource = new DevExpress.data.ArrayStore({
        data: customers,
        key: "ID"
    });
    
    var gridBoxValue = ko.observable([11]);
    
    var gridBoxOptions = {
        value: gridBoxValue,
        valueExpr: "ID",
        placeholder: "Select a value...",
        displayExpr: "CompanyName",
        showClearButton: true,
        dataSource: dataSource,
        dataGrid: {
            dataSource: dataSource,
            columns: ["CompanyName", "City", "Phone"],
            hoverStateEnabled: true,
            paging: { enabled: true, pageSize: 10 },
            filterRow: { visible: true },
            scrolling: { mode: "infinite" },
            height: 265,
            selection: { mode: "multiple" },
            selectedRowKeys: ko.computed(function(){
                return gridBoxValue() || [];
            }),
            onSelectionChanged: function(selectedItems){
                gridBoxValue(selectedItems.selectedRowKeys);
            }
        }
    };
    
    ko.computed(function(){
        syncTreeViewSelection(treeView, treeBoxOptions.value());
    });
    
    var viewModel = {
        treeBoxOptions: treeBoxOptions,
        gridBoxOptions: gridBoxOptions
    };
    
    ko.applyBindings(viewModel, document.getElementById("dropdown-box-demo"));
};