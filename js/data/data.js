/**
 * Created by Jackson on 8/17/16.
 */

function Entry(name, date, tipAmount, basePay, hours){
    this.name = name;
    this.date = date;
    this.tipAmount = tipAmount;
    this.basePay = basePay;
    this.hours = hours;
}

var tipData = [
    {
        name: "Danny",
        days: [
            {
                tipAmount: 2.00,
                basePay: 120.00,
                hours: 10,
                date: Date.now()
            },
            {
                tipAmount: 3.00,
                basePay: 120.00,
                hours: 11,
                date: Date.now()
            }
        ]
    },
    {
        name: "Summer",
        days: [
            {
                tipAmount: 4.00,
                basePay: 120.00,
                hours: 10,
                date: Date.now()
            },
            {
                tipAmount: 7.00,
                basePay: 120.00,
                hours: 11,
                date: Date.now()
            }
        ]
    },
    {
        name: "Jackson",
        days: [
            {
                tipAmount: 30.00,
                basePay: 120.00,
                hours: 10,
                date: Date.now()
            },
            {
                tipAmount: 5.00,
                basePay: 120.00,
                hours: 11,
                date: Date.now()
            }
        ]
    }
];