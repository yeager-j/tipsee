/**
 * Created by Jackson on 8/17/16.
 */

// Here is where we keep our generic data
 

 var workDays=[
    {
        name:"Danny",
        days:[]

    },
    {
        name:"Summer",
        days:[]
    },
    {
        name:"Jackson",
        days:[]
    }
 ];

// Individual Tip data
var tipData = [
    {
        name: "Danny",
        days: []
    },
    {
        name: "Summer",
        days: []
    },
    {
        name: "Jackson",
        days: []
    },
    {
        name: "Daily Total",
        days: []
    }
];


var columnArr = [['x']];
for(var i = 0; i < 50; i++){
    // Personal Dates Worked
    var randomDate = Date.now()+1000*24*60*60*i;
    // Populating the Columns Array
    if(i < 30){
            columnArr[0].push(randomDate);
        }
    for(var j = 0; j < workDays.length; j++){
        workDays[j].days.push(randomDate);
    }
}
// Random Number generator
for(var i = 0; i < 50; i++){
    for(var j = 0; j < tipData.length; j++){
        var randomNum = Math.random() * 150;
        tipData[j].days.push({
            date: Date.now() + 1000 * 24 * 60 * 60 * i,
            tipAmount: Math.ceil(randomNum, -2),
            basePay: 120,
            hours: 8,
            dailyTotal: (Math.ceil(randomNum * randomNum * randomNum, -2) * 7100)
        });
    }
}



