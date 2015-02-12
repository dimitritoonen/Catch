define(['jquery', 'knockout'], function ($, ko) {

  function MockActivities() {

    var activities = [
      {
        id: 883, category: { code: 'sport', description: 'Sport' }, date: '2015-02-14 19:00', location: 'Rotterdam',
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit.',
        image: '',
        participants: [
          { id: 1, name: 'Dimitri', image: '' },
          { id: 2, name: 'Esme', image: '' },
          { id: 3, name: 'Remy', image: '' },
          { id: 4, name: 'Jack', image: '' },
          { id: 5, name: 'Sebastiaan', image: '' },
        ]
      },
      {
        id: 23, category: { code: 'dating', description: 'Dating' }, date: '2015-02-20 14:00', location: 'Hendrik-ido-ambacht',
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        image: '',
        participants: [
          { id: 1, name: 'Dimitri', image: '' },
          { id: 2, name: 'Esme', image: '' },
          { id: 3, name: 'Remy', image: '' },
          { id: 4, name: 'Jack', image: '' },
          { id: 5, name: 'Sebastiaan', image: '' },
        ]
      },
      {
        id: 794, category: { code: 'food', description: 'Food and Drinks' }, date: '2015-03-01 13:00', location: 'Amsterdam',
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis',
        image: '',
        participants: [
          { id: 1, name: 'Dimitri', image: '' },
          { id: 2, name: 'Esme', image: '' },
          { id: 3, name: 'Remy', image: '' },
          { id: 4, name: 'Jack', image: '' },
          { id: 5, name: 'Sebastiaan', image: '' },
        ]
      },
      {
        id: 461, category: { code: 'party', description: 'Entertainment' }, date: '2015-08-01 15:00', location: 'Sliedrecht',
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. pellentesque eu, pretium',
        image: '',
        participants: [
          { id: 1, name: 'Dimitri', image: '' },
          { id: 2, name: 'Esme', image: '' },
          { id: 3, name: 'Remy', image: '' },
          { id: 4, name: 'Jack', image: '' },
        ]
      },
      {
        id: 556, category: { code: 'party', description: 'Party/Disco' }, date: '2015-07-22 15:00', location: 'Rotterdam',
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        image: '',
        participants: [
          { id: 2, name: 'Esme', image: '' },
          { id: 3, name: 'Remy', image: '' },
          { id: 4, name: 'Jack', image: '' },
          { id: 5, name: 'Sebastiaan', image: '' },
        ]
      },
      {
        id: 768, category: { code: 'hiking', description: 'Hiking' }, date: '2015-07-21 14:00', location: 'Rotterdam',
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        image: '',
        participants: [
          { id: 1, name: 'Dimitri', image: '' },
          { id: 3, name: 'Remy', image: '' },
          { id: 4, name: 'Jack', image: '' },
          { id: 5, name: 'Sebastiaan', image: '' },
        ]
      },
      {
        id: 2, category: { code: 'travelling', description: 'Travelling' }, date: '2015-04-22 15:00', location: 'Rotterdam',
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        image: '',
        participants: [
          { id: 1, name: 'Dimitri', image: '' },
          { id: 2, name: 'Esme', image: '' },
          { id: 5, name: 'Sebastiaan', image: '' },
        ]
      },
      {
        id: 95, category: { code: 'shopping', description: 'Shopping' }, date: '2015-07-22 15:00', location: 'Hendrik-ido-ambacht',
        content: 'ultricies nec, pellentesque eu, pretium',
        image: '',
        participants: [
          { id: 1, name: 'Dimitri', image: '' },
          { id: 2, name: 'Esme', image: '' },
          { id: 3, name: 'Remy', image: '' },
          { id: 5, name: 'Sebastiaan', image: '' },
        ]
      },
      {
        id: 96, category: { code: 'museum', description: 'Museum' }, date: '2015-05-30 10:00', location: 'Sliedrecht',
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo Donec quam felis, ultricies nec, pellentesque eu, pretium',
        image: '',
        participants: [
          { id: 1, name: 'Dimitri', image: '' },
          { id: 2, name: 'Esme', image: '' },
          { id: 3, name: 'Remy', image: '' },
          { id: 4, name: 'Jack', image: '' },
          { id: 5, name: 'Sebastiaan', image: '' },
        ]
      },

    ]; // activities

    this.GetActivities = function () {
      return activities;
    };
  }

  return new MockActivities();

});