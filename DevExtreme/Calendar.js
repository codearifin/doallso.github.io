window.onload = function() {
    var zoomLevels = ["month", "year", "decade", "century"],
        holydays = [[1,0], [4,6], [25,11]],
        useCellTemplate = ko.observable(false),
        cellTemplate = ko.computed(function() {
            if (useCellTemplate())
                return getCellTemplate;
            else
                return "cell";
        }),
        viewModel = {
            now: new Date(),
            zoomLevels: zoomLevels,
            currentValue: ko.observable(new Date()),
            calendarDisabled: ko.observable(false),
            isMondayFirst: ko.observable(false),
            useMinDate: ko.observable(false),
            useMaxDate: ko.observable(false),
            zoomLevel: ko.observable(zoomLevels[0]),
            cellTemplate: cellTemplate,
            useCellTemplate: useCellTemplate
        };
    
    function getCellTemplate(data) {
        var dayNumber = data.date.getDay(),
            cssClass = "";
        if(dayNumber === 0 || dayNumber === 6)
            cssClass = "weekend";
    
        $.each(holydays, function(_, item) {
            if(data.date.getDate() === item[0] && data.date.getMonth() === item[1]) {
                cssClass = "holyday";
                return false;
            }
        });
    
        return "<span class='" + cssClass + "'>" + data.text + "</span>";
    }
    
    ko.applyBindings(viewModel, document.getElementById("calendar-demo"));
};