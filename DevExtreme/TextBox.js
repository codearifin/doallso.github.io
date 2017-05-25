window.onload = function() {
    var emailValue = ko.observable("smith@corp.com");
    
    var viewModel = {
        simple: {
            value: "王二小"
        },
        withPlaceholder: {
            placeholder: "在此输入名称..."
        },
        withClearButton: {
            value: "王二小",
            showClearButton: true
        },
        passwordMode: {
            mode: "password",
            placeholder: "输入密码",
            showClearButton: true,
            value: "f5lzKs0T",
        },
        maskUsage: {
            mask: "+1 (X00) 000-0000",
            maskRules: {"X": /[02-9]/}
        },
        disabled: {
            value: "王二小",
            disabled: true
        },
        fullNameOptions: {
            value: "smith",
            showClearButton: true,
            placeholder: "输入姓名",
            valueChangeEvent: "keyup",
            onValueChanged: function(data) {
                emailValue(data.value.replace(/\s/g, "").toLowerCase() + "@corp.com");
            }
        },
        emailOptions: {
            value: emailValue,
            readOnly: true,
            hoverStateEnabled: false
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("text-box-demo"));
};