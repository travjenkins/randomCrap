Selenium.prototype.doTypeRandomEmail = function (locator) {
    var data = "",
        element = this.page().findElement(locator),
        getRandomInt = function(settings) {
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
        randomAlphaNumeric = function () {
            //Taken from: http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
            var i = 0,
                possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                randomSettings = {},
                text = "";
                
            randomSettings = {
                "max": possible.length
            }

            for (i=0; i < getRandomInt(); i += 1) {
                text += possible.charAt(getRandomInt(randomSettings));
            }

            return text;
        },
        randomTopLevelDomain = function () {
            var i = 0,
                possible = ["com", "net", "gov", "org", "mil", "co.uk"],
                randomSettings = {},
                text = "";
                
            randomSettings = {
                "max": possible.length
            }

            text = possible[getRandomInt(randomSettings)];

            return text;
        };

    if (true) {
        data = randomAlphaNumeric() + "@" + randomAlphaNumeric() + "." + randomTopLevelDomain();
    }

    this.browserbot.replaceText(element, data);
};