define(['jquery', 'knockout', 'moment'], function ($, ko, moment) {

  function MockActivities() {

    var activities = [
      {
        Id: 883, Category: { Code: 'sport', Description: 'Sport' }, Date: '2015-02-28 19:00', Location: 'Rotterdam',
        Owner: { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit.',
        Participants: [
          { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
          { 'Id': '2', 'Name': 'Esme', 'Image': '/Images/profile.jpg' },
          { 'Id': '4', 'Name': 'Jack', 'Image': '/Images/profile.jpg' },
        ],
        MaxParticipants: 4
      },
      {
        Id: 23, Category: { Code: 'dating', Description: 'Dating' }, Date: '2015-02-20 14:00', Location: 'Hendrik-ido-ambacht',
        Owner: { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        Participants: [
          { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
          { 'Id': '2', 'Name': 'Esme', 'Image': '/Images/profile2.jpg' },
          { 'Id': '3', 'Name': 'Remy', 'Image': '/Images/profile.jpg' },
          { 'Id': '4', 'Name': 'Jack', 'Image': '/Images/profile2.jpg' },
          { 'Id': '5', 'Name': 'Sebastiaan', 'Image': '/Images/profile.jpg' },
          { 'Id': '6', 'Name': 'DavId', 'Image': '/Images/profile2.jpg' },
        ],
        MaxParticipants: 10
      },
      {
        Id: 794, Category: { Code: 'food', Description: 'Food and Drinks' }, Date: '2015-03-01 13:00', Location: 'Amsterdam',
        Owner: { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis',
        Participants: [
          { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
          { 'Id': '2', 'Name': 'Esme', 'Image': '/Images/profile.jpg' },
          { 'Id': '3', 'Name': 'Remy', 'Image': '/Images/profile2.jpg' },
          { 'Id': '4', 'Name': 'Jack', 'Image': '/Images/profile2.jpg' },
          { 'Id': '5', 'Name': 'Sebastiaan', 'Image': '/Images/profile.jpg' },
        ],
        MaxParticipants: 6
      },
      {
        Id: 461, Category: { Code: 'entertainment', Description: 'Entertainment' }, Date: '2015-08-01 15:00', Location: 'Sliedrecht',
        Owner: { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. pellentesque eu, pretium',
        Participants: [
          { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
          { 'Id': '2', 'Name': 'Esme', 'Image': '/Images/profile2.jpg' },
          { 'Id': '4', 'Name': 'Jack', 'Image': '/Images/profile.jpg' },
        ],
        MaxParticipants: 4
      },
      {
        Id: 556, Category: { Code: 'party', Description: 'Party/Disco' }, Date: '2015-07-22 15:00', Location: 'Rotterdam',
        Owner: { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        Participants: [
          { 'Id': '2', 'Name': 'Esme', 'Image': '/Images/profile.jpg' },
          { 'Id': '3', 'Name': 'Remy', 'Image': '/Images/profile2.jpg' },
          { 'Id': '4', 'Name': 'Jack', 'Image': '/Images/profile2.jpg' },
          { 'Id': '5', 'Name': 'Sebastiaan', 'Image': '/Images/profile.jpg' },
        ],
        MaxParticipants: 5
      },
      {
        Id: 768, Category: { Code: 'hiking', Description: 'Hiking' }, Date: '2015-07-21 14:00', Location: 'Rotterdam',
        Owner: { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        Participants: [
          { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
          { 'Id': '3', 'Name': 'Remy', 'Image': '/Images/profile2.jpg' },
          { 'Id': '4', 'Name': 'Jack', 'Image': '/Images/profile2.jpg' },
          { 'Id': '5', 'Name': 'Sebastiaan', 'Image': '/Images/profile.jpg' },
        ],
        MaxParticipants: 5
      },
      {
        Id: 2, Category: { Code: 'travelling', Description: 'Travelling' }, Date: '2015-04-22 15:00', Location: 'Rotterdam',
        Owner: { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        Participants: [
          { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
          { 'Id': '2', 'Name': 'Esme', 'Image': '/Images/profile2.jpg' },
          { 'Id': '5', 'Name': 'Sebastiaan', 'Image': '/Images/profile.jpg' },
        ],
        MaxParticipants: 10
      },
      {
        Id: 95, Category: { Code: 'shopping', Description: 'Shopping' }, Date: '2015-07-22 15:00', Location: 'Hendrik-ido-ambacht',
        Owner: { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
        Content: 'ultricies nec, pellentesque eu, pretium',
        Participants: [
          { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile2.jpg' },
          { 'Id': '2', 'Name': 'Esme', 'Image': '/Images/profile.jpg' },
          { 'Id': '3', 'Name': 'Remy', 'Image': '/Images/profile2.jpg' },
          { 'Id': '5', 'Name': 'Sebastiaan', 'Image': '/Images/profile.jpg' },
        ],
        MaxParticipants: 7
      },
      {
        Id: 96, Category: { Code: 'museum', Description: 'Museum' }, Date: '2015-05-30 10:00', Location: 'Sliedrecht',
        Owner: { 'Dd': '1', 'Name': 'Dimitri', 'Image': '/Images/profile.jpg' },
        Content: 'Come and join us!',
        Participants: [
          { 'Id': '1', 'Name': 'Dimitri', 'Image': '/Images/profile2.jpg' },
          { 'Id': '2', 'Name': 'Esme', 'Image': '/Images/profile.jpg' },
          { 'Id': '3', 'Name': 'Remy', 'Image': '/Images/profile.jpg' },
          { 'Id': '4', 'Name': 'Jack', 'Image': '/Images/profile.jpg' },
          { 'Id': '5', 'Name': 'Sebastiaan', 'Image': '/Images/profile2.jpg' },
        ],
        MaxParticipants: 5
      },

    ]; // activities


    var defaultDateFormat = 'YYYY-MM-DD';

    // filter activities
    this.GetActivities = function (settings) {
      
      var filter = settings.data;

      if (filter === undefined || filter == null) {
        return activities;
      }
      
      
      // filter activites based on chosen filter
      return ko.utils.arrayFilter(activities, function (item) {
        
        var itemDate = moment(item.Date).format('');

        if (filter.date.fromDate !== undefined) {
          var filterFromDate = moment(filter.date.fromDate).format(defaultDateFormat);
        }
        if (filter.date.tillDate !== undefined) {
          var filterTillDate = moment(filter.date.tillDate).format(defaultDateFormat);
        }

        var itemTime = moment(item.Date).format('HH');
        
        return ((filter.category === undefined || item.Category.Code === filter.category) && 
          (filter.participants === undefined || item.MaxParticipants <= filter.participants) &&
          (filter.date.fromDate === undefined || itemDate >= filterFromDate) &&
          (filter.date.tillDate === undefined || itemDate <= filterTillDate) &&
          (filter.search === undefined || item.content.indexOf(filter.search) > -1) &&
          (filter.time.beginTime <= itemTime && filter.time.endTime >= itemTime));
      });

      return activities;
    };
  }

  return new MockActivities();

});