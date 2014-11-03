define(['knockout', 'text!./user-bar.html'], function (ko, templateMarkup) {

    function UserBar(params) {
            
        var self = this;

        self.goToLocation = function (page) {

            window.location = '#' + page;

        }
    }

    return { viewModel: UserBar, template: templateMarkup };

});
