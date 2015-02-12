define(['knockout', 'text!./activity-listitem.html'], function(ko, templateMarkup) {

  function ActivityListitem(params) {
   
    var self = this;

    self.content = ko.observable('orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium');

    self.expandTile = function () {
      $('.text').toggleClass('line-clamp');
    };

  }

  //ActivityListitem.prototype.expandTile = function (self) {
    
  //  console.log(self);

  //  $('.text').toggleClass('line-clamp');

  //};
  
  return { viewModel: ActivityListitem, template: templateMarkup };

});
