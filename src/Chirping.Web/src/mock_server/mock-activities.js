define(['jquery', 'knockout', 'moment'], function ($, ko, moment) {

  function MockActivities() {

    var activities = [
      {
        Id: 883, Category: { Code: 'sport', Description: 'Sport' }, Date: moment().format('YYYY-MM-DD') + 'T20:00:00', Location: 'Rotterdam',
        Owner: { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit.',
        Participants: [
          { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '2', 'NickName': 'Esme', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '4', 'NickName': 'Jack', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        ],
        MaxParticipants: 4
      },
      {
        Id: 23, Category: { Code: 'dating', Description: 'Dating' }, Date: moment().add(1, 'month').format('YYYY-MM-DD') + 'T14:00', Location: 'Hendrik-ido-ambacht',
        Owner: { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        Participants: [
          { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '2', 'NickName': 'Esme', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
          { 'Id': '3', 'NickName': 'Remy', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '4', 'NickName': 'Jack', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
          { 'Id': '5', 'NickName': 'Sebastiaan', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '6', 'NickName': 'DavId', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
        ],
        MaxParticipants: 10
      },
      {
        Id: 794, Category: { Code: 'food', Description: 'Food and Drinks' }, Date: moment().add(1, 'month').format('YYYY-MM-DD') + 'T13:00', Location: 'Amsterdam',
        Owner: { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis',
        Participants: [
          { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '2', 'NickName': 'Esme', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '3', 'NickName': 'Remy', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
          { 'Id': '4', 'NickName': 'Jack', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
          { 'Id': '5', 'NickName': 'Sebastiaan', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        ],
        MaxParticipants: 6
      },
      {
        Id: 461, Category: { Code: 'entertainment', Description: 'Entertainment' }, Date: moment().add(20, 'days').format('YYYY-MM-DD') + 'T15:00', Location: 'Sliedrecht',
        Owner: { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. pellentesque eu, pretium',
        Participants: [
          { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '2', 'NickName': 'Esme', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
          { 'Id': '4', 'NickName': 'Jack', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        ],
        MaxParticipants: 4
      },
      {
        Id: 556, Category: { Code: 'party', Description: 'Party/Disco' }, Date: moment().add(4, 'month').format('YYYY-MM-DD') + 'T15:00', Location: 'Rotterdam',
        Owner: { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        Participants: [
          { 'Id': '2', 'NickName': 'Esme', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '3', 'NickName': 'Remy', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
          { 'Id': '4', 'NickName': 'Jack', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
          { 'Id': '5', 'NickName': 'Sebastiaan', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        ],
        MaxParticipants: 5
      },
      {
        Id: 768, Category: { Code: 'hiking', Description: 'Hiking' }, Date: moment().add(3, 'month').format('YYYY-MM-DD') + 'T14:00', Location: 'Rotterdam',
        Owner: { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        Participants: [
          { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '3', 'NickName': 'Remy', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
          { 'Id': '4', 'NickName': 'Jack', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
          { 'Id': '5', 'NickName': 'Sebastiaan', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        ],
        MaxParticipants: 5
      },
      {
        Id: 2, Category: { Code: 'travelling', Description: 'Travelling' }, Date: moment().add(19, 'days').format('YYYY-MM-DD') + 'T15:00', Location: 'Rotterdam',
        Owner: { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        Content: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium',
        Participants: [
          { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '2', 'NickName': 'Esme', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
          { 'Id': '5', 'NickName': 'Sebastiaan', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        ],
        MaxParticipants: 10
      },
      {
        Id: 95, Category: { Code: 'shopping', Description: 'Shopping' }, Date: moment().add(2, 'days').format('YYYY-MM-DD') + 'T15:00', Location: 'Hendrik-ido-ambacht',
        Owner: { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        Content: 'ultricies nec, pellentesque eu, pretium',
        Participants: [
          { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
          { 'Id': '2', 'NickName': 'Esme', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '3', 'NickName': 'Remy', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
          { 'Id': '5', 'NickName': 'Sebastiaan', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        ],
        MaxParticipants: 7
      },
      {
        Id: 96, Category: { Code: 'museum', Description: 'Museum' }, Date: moment().add(1, 'days').format('YYYY-MM-DD') + 'T10:00', Location: 'Sliedrecht',
        Owner: { 'Dd': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
        Content: 'Come and join us!',
        Participants: [
          { 'Id': '1', 'NickName': 'Dimitri', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
          { 'Id': '2', 'NickName': 'Esme', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '3', 'NickName': 'Remy', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '4', 'NickName': 'Jack', 'Image': '/Images/profile.jpg', 'ImageAvatar': '/Images/profile_avatar.jpg' },
          { 'Id': '5', 'NickName': 'Sebastiaan', 'Image': '/Images/profile2.jpg', 'ImageAvatar': '/Images/profile2_avatar.jpg' },
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


    this.AddActivity = function (data) {
      activities.push(data);
    }
  }

  return new MockActivities();

});