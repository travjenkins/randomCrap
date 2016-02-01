var application = {
        "session" : {
            "emailsEntered" : []
        },
        "generateRandom": {
            "alphaNumeric" : function (settings) {
                //Taken from: http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
                var i = 0,
                    maxLength = application.generateRandom.integer(),
                    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                    randomSettings = {},
                    text = "";
                    
                randomSettings = {
                    "min": 2,
                    "max": possible.length
                }

                if (settings && settings.maxLength) {
                    maxLength = settings.maxLength;
                }

                for (i=0; i < maxLength; i += 1) {
                    text += possible.charAt(application.generateRandom.integer(randomSettings));
                }

                return text;
            },
            "integer" : function (settings) {
                //Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
                var response = 0;

                if (typeof settings === "undefined") {
                    settings = {}
                }

                if (typeof settings.min === "undefined") {
                    settings.min = 1;
                }

                if (typeof settings.max === "undefined") {
                    settings.max = 15;
                }

                response = Math.random() * (settings.max - settings.min) + settings.min;

                return Math.floor(response);
            },
            "topLevelDomain" : function () {
                var i = 0,
                    possible = ["com", "net", "gov", "org", "mil", "co.uk"],
                    randomSettings = {},
                    text = "";
                    
                randomSettings = {
                    "max": possible.length
                }

                text = possible[application.generateRandom.integer(randomSettings)];

                return text;
            }
        }
    };

Selenium.prototype.doTypeRandomEmail = function (locator) {
    var address = "",
        data = "",
        domain = "",
        element = this.page().findElement(locator);

    if (data === "" && element !== null) {
        address = application.generateRandom.alphaNumeric({
            "maxLength": 10
        });

        domain = application.generateRandom.alphaNumeric({
            "maxLength": 10
        });

        data = address + "@" + domain + "." + application.generateRandom.topLevelDomain();
    }

    this.browserbot.replaceText(element, data);
    application.session.emailsEntered.push(data);
};

Selenium.prototype.doGetRandomEmail = function (locator) {
    var data = "",
        element = this.page().findElement(locator);

    LOG.info("blubber = " + application.session.emailsEntered);
};