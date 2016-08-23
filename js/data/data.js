/**
 * Created by Jackson on 8/17/16.
 */

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

for(var i = 0; i < 10; i++){
    tipData[0].days.push({
        date: Date.now() + 1000 * 24 * 60 * 60 * i,
        tipAmount: Math.random() * 15,
        basePay: 120,
        hours: 8
    });

    tipData[1].days.push({
        date: Date.now() + 1000 * 24 * 60 * 60 * i,
        tipAmount: Math.random() * 15,
        basePay: 120,
        hours: 8
    });

    tipData[2].days.push({
        date: Date.now() + 1000 * 24 * 60 * 60 * i,
        tipAmount: Math.random() * 15,
        basePay: 120,
        hours: 8
    });

    console.log(Date.now() + 24 * 60 * 60 * i);
}