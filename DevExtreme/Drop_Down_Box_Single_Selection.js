window.onload = function() {
    var treeView;
    
    var syncTreeViewSelection = function(treeView, value){
        if (!treeView) return;
        
        if (!value) {
            treeView.unselectAll();
        } else {
            treeView.selectItem(value);
        }
    };
    
    var treeBoxOptions = {
        value: ko.observable("1_1"),
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
            selectionMode: "single",
            onContentReady: function(e) {
                treeView = e.component;
                
                syncTreeViewSelection(treeView, treeBoxOptions.value());
            },
            onItemSelectionChanged: function(args){
                var value = args.component.getSelectedNodesKeys();
                
                treeBoxOptions.value(value);
            },
            displayExpr: "name",
            selectByClick: true,
            selectNodesRecursive: false
        }
    };
    
    var dataSource = new DevExpress.data.ArrayStore({
        data: customers,
        key: "ID"
    });
    
    var gridBoxValue = ko.observable(11);
    
    var gridBoxOptions = {
        value: gridBoxValue,
        valueExpr: "ID",
        placeholder: "Select a value...",
        displayExpr: function(item){
            return item && item.CompanyName + " <" + item.Phone + ">";
        },
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
            selection: { mode: "single" },
            selectedRowKeys: ko.computed(function(){
                var editorValue = gridBoxValue();
                return (editorValue && [editorValue]) || [];
            }),
            onSelectionChanged: function(selectedItems){
                var hasSelection = selectedItems.selectedRowKeys.length;
                gridBoxValue(hasSelection ? selectedItems.selectedRowKeys[0] : null);
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