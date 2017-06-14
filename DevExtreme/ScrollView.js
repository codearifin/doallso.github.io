window.onload = function() {
    var updateBottomContent = function(args){
        setTimeout(function() {
            viewModel.content(viewModel.content() + "<br /><div>Content has been updated on the ReachBottom event.</div><br />");
            args.component.release();
        }, 500);
    };
    
    var viewModel = {
        content : ko.observable(longText),
        
        updateTopContent: function(args) {
            setTimeout(function() {
                viewModel.content("<br /><div>Content has been updated on the PullDown event.</div><br />" + viewModel.content());
                args.component.release();
            }, 500);
        },
        updateBottomContent: ko.observable(updateBottomContent),
        
        showScrollbarModes : [{
                text: "On Scroll",
                value: "onScroll"
            }, {
                text: "On Hover",
                value: "onHover"
            }, {
               text: "Always",
               value: "always"
            }, {
               text: "Never",
               value: "never"
        }],
        
        showScrollbarMode : ko.observable("onScroll"),
        scrollByContentValue : ko.observable(true),
        scrollByThumbValue : ko.observable(true),
        reachBottomValue : ko.observable(true),
        pullDownValue : ko.observable(false)
    };
    
    viewModel.reachBottomValue.subscribe(function(value){
        if(value){
            viewModel.updateBottomContent(updateBottomContent);
        } else {
            viewModel.updateBottomContent(null);  
        }
    });
    
    ko.applyBindings(viewModel, document.getElementById("container"));
};