define(['jquery', 'knockout', 'dateformat'], function ($, ko) {

  function MockActivities() {

    var activities = [
      {
        id: 883, category: { code: 'sport', description: 'Sport' }, date: '2015-02-28 19:00', location: 'Rotterdam',
        owner: { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit.',
        image: '',
        participants: [
          { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
          { 'id': '2', 'name': 'Esme', 'image': '/images/profile.jpg' },
          { 'id': '4', 'name': 'Jack', 'image': '/images/profile.jpg' },
        ],
        maxParticipants: 4
      },
      {
        id: 23, category: { code: 'dating', description: 'Dating' }, date: '2015-02-20 14:00', location: 'Hendrik-ido-ambacht',
        owner: { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        image: '',
        participants: [
          { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
          { 'id': '2', 'name': 'Esme', 'image': '/images/profile2.jpg' },
          { 'id': '3', 'name': 'Remy', 'image': '/images/profile.jpg' },
          { 'id': '4', 'name': 'Jack', 'image': '/images/profile2.jpg' },
          { 'id': '5', 'name': 'Sebastiaan', 'image': '/images/profile.jpg' },
          { 'id': '6', 'name': 'David', 'image': '/images/profile2.jpg' },
        ],
        maxParticipants: 10
      },
      {
        id: 794, category: { code: 'food', description: 'Food and Drinks' }, date: '2015-03-01 13:00', location: 'Amsterdam',
        owner: { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis',
        image: '',
        participants: [
          { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
          { 'id': '2', 'name': 'Esme', 'image': '/images/profile.jpg' },
          { 'id': '3', 'name': 'Remy', 'image': '/images/profile2.jpg' },
          { 'id': '4', 'name': 'Jack', 'image': '/images/profile2.jpg' },
          { 'id': '5', 'name': 'Sebastiaan', 'image': '/images/profile.jpg' },
        ],
        maxParticipants: 6
      },
      {
        id: 461, category: { code: 'entertainment', description: 'Entertainment' }, date: '2015-08-01 15:00', location: 'Sliedrecht',
        owner: { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. pellentesque eu, pretium',
        image: '',
        participants: [
          { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
          { 'id': '2', 'name': 'Esme', 'image': '/images/profile2.jpg' },
          { 'id': '4', 'name': 'Jack', 'image': '/images/profile.jpg' },
        ],
        maxParticipants: 4
      },
      {
        id: 556, category: { code: 'party', description: 'Party/Disco' }, date: '2015-07-22 15:00', location: 'Rotterdam',
        owner: { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        image: '',
        participants: [
          { 'id': '2', 'name': 'Esme', 'image': '/images/profile.jpg' },
          { 'id': '3', 'name': 'Remy', 'image': '/images/profile2.jpg' },
          { 'id': '4', 'name': 'Jack', 'image': '/images/profile2.jpg' },
          { 'id': '5', 'name': 'Sebastiaan', 'image': '/images/profile.jpg' },
        ],
        maxParticipants: 5
      },
      {
        id: 768, category: { code: 'hiking', description: 'Hiking' }, date: '2015-07-21 14:00', location: 'Rotterdam',
        owner: { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        image: '',
        participants: [
          { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
          { 'id': '3', 'name': 'Remy', 'image': '/images/profile2.jpg' },
          { 'id': '4', 'name': 'Jack', 'image': '/images/profile2.jpg' },
          { 'id': '5', 'name': 'Sebastiaan', 'image': '/images/profile.jpg' },
        ],
        maxParticipants: 5
      },
      {
        id: 2, category: { code: 'travelling', description: 'Travelling' }, date: '2015-04-22 15:00', location: 'Rotterdam',
        owner: { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        image: '',
        participants: [
          { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
          { 'id': '2', 'name': 'Esme', 'image': '/images/profile2.jpg' },
          { 'id': '5', 'name': 'Sebastiaan', 'image': '/images/profile.jpg' },
        ],
        maxParticipants: 10
      },
      {
        id: 95, category: { code: 'shopping', description: 'Shopping' }, date: '2015-07-22 15:00', location: 'Hendrik-ido-ambacht',
        owner: { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
        content: 'ultricies nec, pellentesque eu, pretium',
        image: '',
        participants: [
          { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile2.jpg' },
          { 'id': '2', 'name': 'Esme', 'image': '/images/profile.jpg' },
          { 'id': '3', 'name': 'Remy', 'image': '/images/profile2.jpg' },
          { 'id': '5', 'name': 'Sebastiaan', 'image': '/images/profile.jpg' },
        ],
        maxParticipants: 7
      },
      {
        id: 96, category: { code: 'museum', description: 'Museum' }, date: '2015-05-30 10:00', location: 'Sliedrecht',
        owner: { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile.jpg' },
        content: 'Come and join us!',
        image: '',
        participants: [
          { 'id': '1', 'name': 'Dimitri', 'image': '/images/profile2.jpg' },
          { 'id': '2', 'name': 'Esme', 'image': '/images/profile.jpg' },
          { 'id': '3', 'name': 'Remy', 'image': '/images/profile.jpg' },
          { 'id': '4', 'name': 'Jack', 'image': '/images/profile.jpg' },
          { 'id': '5', 'name': 'Sebastiaan', 'image': '/images/profile2.jpg' },
        ],
        maxParticipants: 5
      },

    ]; // activities

    this.GetActivities = function (settings) {

      var filter = settings.data;

      if (filter === undefined || filter == null) {
        return activities;
      }
      
      return ko.utils.arrayFilter(activities, function (item) {

        if (filter.date !== undefined) {
          var itemDate = $.format.date(item.date, 'YYYY-MM-dd');
          var filterDate = $.format.date(filter.date, 'YYYY-MM-dd');
        }

        var itemTime = $.format.date(new Date(item.date), 'HH');

        return ((filter.category === undefined || item.category.code === filter.category) && 
          (filter.participants === undefined || item.maxParticipants <= filter.participants) &&
          (filter.date === undefined || itemDate <= filterDate) &&
          (filter.search === undefined || item.content.indexOf(filter.search) > -1) &&
          (filter.time.beginTime <= itemTime && filter.time.endTime >= itemTime));
      });

      return activities;
    };
  }

  return new MockActivities();

});