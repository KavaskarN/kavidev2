(function (global) {
    var LoginViewModel,
        app = global.app = global.app || {};

    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "",
        password: "",

        onLogin: function () {
            /*var that = this,
                username = that.get("username").trim(),
                password = that.get("password").trim();

            if (username === "" || password === "") {
                navigator.notification.alert("Both fields are required!",
                    function () { }, "Login failed", 'OK');

                return;
            }

            that.set("isLoggedIn", true);*/
            
            
            //var el = new Everlive('3293rO0nrTkKnhxM');
            app.el.Users.login('smichelotti', '123')
                .then(function () {
                    return app.el.data('Games').get();
                })
                .then(function(data) {
                    // data.result contains an array of ojbects
                    console.log("response from EL", data);
                    alert(JSON.stringify(data.result));
                },
                function(error) {
                    alert("ERROR: " + error.message);
                });
            
            
            
        },

        onLogout: function () {
            var that = this;

            that.clearForm();
            that.set("isLoggedIn", false);
        },

        clearForm: function () {
            var that = this;

            that.set("username", "");
            that.set("password", "");
        },

        checkEnter: function (e) {
            var that = this;

            if (e.keyCode == 13) {
                $(e.target).blur();
                that.onLogin();
            }
        }
    });

    app.loginService = {
        viewModel: new LoginViewModel()
    };
})(window);