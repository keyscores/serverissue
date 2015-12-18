if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    total: function(){
      return EJSON.stringify(Aggregate.find().fetch(), {indent: true});
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    recoup: function(){

      //this fails on server
      Aggregate.update({timeStamp: 1424311200000}, {$set: { recoup: 222}});
      //this is successful on server
      Aggregate.update({customerTotal: 6.99}, {$set: { recoup: 333}});//
      //this is successful on server
      Aggregate.update({title: "C"}, {$set: { recoup: 444}});
      //this is successful on server
      Aggregate.update({region: "World", country: "US"}, {$set: { recoup: 555}});

      return "done"
    }
  });

  Meteor.startup(function () {
    Aggregate.remove({});
    Aggregate.insert({timeStamp: 1424311200000, title : "A"})
    Aggregate.insert({customerTotal:6.99, title : "B"})
    Aggregate.insert({title : "C"})
    Aggregate.insert({region: "World", country: "US", title : "D"})

  });
}
