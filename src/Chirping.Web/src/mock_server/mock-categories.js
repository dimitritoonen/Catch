define(['jquery', 'knockout'], function ($, ko) {

  function MockCategories() {

    var categories = [
      { 'id': '1', 'code': 'dating', 'description': 'Dating' },
      { 'id': '2', 'code': 'sport', 'description': 'Sport' },
      { 'id': '3', 'code': 'entertainment', 'description': 'Entertainment' },
      { 'id': '4', 'code': 'food', 'description': 'Food and Drinks' },
      { 'id': '5', 'code': 'party', 'description': 'Party' },
      { 'id': '6', 'code': 'museum', 'description': 'Museum' },
      { 'id': '7', 'code': 'hiking', 'description': 'Hicking' },
      { 'id': '8', 'code': 'travelling', 'description': 'Travelling' },
      { 'id': '9', 'code': 'shopping', 'description': 'Shopping' }
    ];

    this.GetCategories = function() {
      return categories;
    }

  }

  return new MockCategories();

});