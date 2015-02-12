define(['jquery', 'knockout'], function ($, ko) {

  function MockActivities() {

    var activities = [
      {
        id: 883, category: 'Dating', date: '2015-02-14', location: 'Rotterdam',
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit.',
        image: '',
        participants: { id: 456, name: 'Dimitri', image: '' }
      },
      {
        id: 23, category: 'Entertainment', date: '2015-02-20', location: 'Hendrik-ido-ambacht',
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        image: '',
        participants: { id: 951, name: 'Dimitri', image: '' }
      },
      {
        id: 794, category: 'Eten en Drinken', date: '2015-03-01', location: 'Amsterdam',
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis',
        image: '',
        participants: { id: 796, name: 'Dimitri', image: '' }
      },
      {
        id: 461, category: 'Feest/Disco', date: '2015-07-22', location: 'Sliedrecht',
        content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        image: '',
        participants: { id: 35, name: 'Dimitri', image: '' }
      },

    ]; // activities

    var GetActivities = function () {
      return activities;
    };
  }

  return new MockActivities();

});