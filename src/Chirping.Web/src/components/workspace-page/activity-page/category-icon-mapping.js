/*
  defines the mapping between category and icon
*/
define(function () {
  
  function CategoryMap() {

    var self = this;

    var unknownCategory = { category: 'unknown', icon: 'fa-question' };

    var mapping = [
      { category: 'dating', icon: 'fa-heart-o', color: 'red' },
      { category: 'sport', icon: 'fa-soccer-ball-o', color: 'gray' },
      { category: 'entertainment', icon: 'fa-music', color: 'blue' },
      { category: 'food', icon: 'fa-spoon', color: 'red' },
      { category: 'party', icon: 'fa-signal', color: 'red' },
      { category: 'museum', icon: 'fa-institution', color: 'red' },
      { category: 'hinking', icon: 'fa-tree', color: 'green' },
      { category: 'travelling', icon: 'fa-plane', color: 'red' },
      { category: 'shopping', icon: 'fa-shopping-cart', color: 'green' },
      unknownCategory,
    ];

    
    // indexer
    self.Get = function (category) {
      for (var i = 0; i < mapping.length; i++) {
        if (mapping[i].category === category.toLowerCase()) {
          return mapping[i];
        }
      }

      // return default
      return unknownCategory;
    }
  }

  return new CategoryMap();
})