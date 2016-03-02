//Example of implementing a module
define([
"Module", 
"mixin1", 
"mixin2", 
"mixin3"
], function (Module, mixin1, mixin2, mixin3) {
    var moduleSettings = {
        "scope": ".foo .bar",
        "mixins": [mixin1, mixin2, mixin3],
        "init": function () {
            var module = this;

            module.foo();
        },
        "foo": function () {
            console.log("Foo Foo!");
        },
        "bar": function () {
            console.log("Bar Bar!");
        }
    };

    moduleSettings.events = {
        "click button": moduleSettings.foo
    };

    moduleSettings.messages = {
        "fooBarMessage": moduleSettings.bar
    };

    return Module.create(moduleSettings);
});