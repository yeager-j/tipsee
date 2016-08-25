/**
 * Created by Jackson on 8/17/16.
 */


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
    }
];


for(var i = 0; i < 50; i++){
    for(var j = 0; j < workDays.length; j++){
       workDays[j].days.push(Date.now()+1000*24*60*60*i);

    }
}

for(var i = 0; i < 50; i++){
    for(var j = 0; j < tipData.length; j++){
        tipData[j].days.push({
            date: Date.now() + 1000 * 24 * 60 * 60 * i,
            tipAmount: Math.random() * 15,
            basePay: 120,
            hours: 8
        });
    }
}


