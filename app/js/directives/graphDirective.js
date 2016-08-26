// Danny attempted at breaking apart the c3SimpleService module
// Fix this soon!
app.directive("tipGraph", function(c3SimpleService) {
    return {
        restrict: "EA",
        scope: {
            config: "="
        },
        template: "<div></div>",
        replace: !0,
        controller: "graphCtrl"
    }
});
