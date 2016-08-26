/**
 * Created by Jackson on 8/17/16.
 */
app.controller('scheduleCtrl', function(moment, alert, calendarConfig){



    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
      // icon 
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
        alert.show('Edited', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {
        alert.show('Deleted', args.calendarEvent);
      }
    }];

    //event array
    vm.events = [];

    vm.isCellOpen = true;

 
//adds event
    vm.addEvent = function() {
     console.log('here')
      vm.events.push({
        title: 'New event',
        info:'Info',
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().endOf('day').toDate(),
        //#E8FDE7
        color: calendarConfig.colorTypes.important,
        draggable: true,
        resizable: true
      });
      console.log(vm.events);
    };

    console.log(workDays);

    for(var i=0;i<workDays.length;i++){
      for(var j=0;j<50;j++){
     
          vm.events.push({
            title: 'Work - ' + workDays[i].name,
            info:"You're working today",
            startsAt: workDays[i].days[j],
            endsAt: (1000 * 24 * 60 * 60 * j) - 1000,
            //#E8FDE7
            color: calendarConfig.colorTypes.important,
            draggable: true,
            resizable: true
          });
          console.log(vm.events);
        

      }
    }

    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };



//pop up notification for event
// function notification(){
//   if(Date.now()===){

//   }
// } //end of notification function

  });




