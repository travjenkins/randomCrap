var application = {
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

Selenium.prototype.doTypeRandomEmail = function (locator, text) {
    var address = "",
        data = "",
        domain = "",
        element = this.page().findElement(locator),
        skipStoredValue = "forceNew",
        storeValueKey = "lastRandomEmailEntered";

    if (typeof storedVars[storeValueKey] === "undefined" || text === skipStoredValue) {
        address = application.generateRandom.alphaNumeric({
            "maxLength": 10
        });

        domain = application.generateRandom.alphaNumeric({
            "maxLength": 10
        });

        data = address + "@" + domain + "." + application.generateRandom.topLevelDomain();

        storedVars[storeValueKey] = data;
        
        LOG.info("The generated email was stored under the key '" + storeValueKey + "'");
    } else {
        LOG.warn("'" + storeValueKey + "' already exists. Using that value. Set value='" + skipStoredValue + "' to generate and enter a new email.");
    }

    this.browserbot.replaceText(element, storedVars[storeValueKey]);
};