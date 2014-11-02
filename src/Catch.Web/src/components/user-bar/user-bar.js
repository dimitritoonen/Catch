define(['knockout', 'text!./user-bar.html'], function (ko, templateMarkup) {

    function UserBar(params) {

        this.message = ko.observable('Hello from the user-bar component!');

        

    }

    return { viewModel: UserBar, template: templateMarkup };

});
