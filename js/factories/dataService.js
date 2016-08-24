app.factory('dataService', function() {
    function DataService() {
        var maxNumber = 200;

        this.loadData = function(callback) {
            callback({"x":new Date(),"top-1":randomNumber(),"top-2":randomNumber()});
        };

        function randomNumber() {
            return Math.floor((Math.random() * maxNumber) + 1);
        }
    }
    return new DataService();
});
