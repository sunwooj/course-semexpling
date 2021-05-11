// Pilot experiment for seminar in expling class 

// Custom controllers
define_ibex_controller({
    name: "MyController1",
    jqueryWidget: {
        _init: function () {
            this.options.transfer = null; // Remove 'click to continue message'. 
            this.element.VBox({
                options: this.options,
                triggers: [1],
                children: [
                    "Message", this.options,
                    "AcceptabilityJudgment", this.options,
                ]
            });
        }
    },
    properties: {}
});