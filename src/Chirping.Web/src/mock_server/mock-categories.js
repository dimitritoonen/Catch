define(['jquery', 'knockout'], function ($, ko) {

  function MockCategories() {

    var categories = [
      { 'Id': '1', 'Code': 'dating', 'Description': 'Dating' },
      { 'Id': '2', 'Code': 'sport', 'Description': 'Sport' },
      { 'Id': '3', 'Code': 'entertainment', 'Description': 'Entertainment' },
      { 'Id': '4', 'Code': 'food', 'Description': 'Food and Drinks' },
      { 'Id': '5', 'Code': 'party', 'Description': 'Party' },
      { 'Id': '6', 'Code': 'museum', 'Description': 'Museum' },
      { 'Id': '7', 'Code': 'hiking', 'Description': 'Hicking' },
      { 'Id': '8', 'Code': 'travelling', 'Description': 'Travelling' },
      { 'Id': '9', 'Code': 'shopping', 'Description': 'Shopping' }
    ];

    this.GetCategories = function() {
      return categories;
    }

  }

  return new MockCategories();

});