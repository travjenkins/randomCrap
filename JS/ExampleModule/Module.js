define(function () {
    "use strict";

    var privateMembers = {
            "scopePlaceholder": "{{scope}}",
            "messageBus": $(SOMETHING_GLOBAL),
            "eventBus": $(document)
        };

    var Module = {
        "bindEvents": function (module) {
            var eventType = null,
                moduleEvent = null,
                selector = null;

            for (moduleEvent in module.events) {
                if (module.events.hasOwnProperty(moduleEvent)) {
                    eventType = moduleEvent.split(" ")[0];
                    selector = moduleEvent.replace(eventType, privateMembers.scopePlaceholder);
                    selector = selector.replace(privateMembers.scopePlaceholder, module.scope);

                    (function (module, eventType, selector, moduleEvent) {
                        privateMembers.eventBus.on(eventType, selector, function (event, data) {
                            if (module && module.events && typeof module.events[moduleEvent] === "function") {
                                module.events[moduleEvent].call(module, event, data);
                            }
                        });
                    }(module, eventType, selector, moduleEvent));
                }
            }
        },
        "subscribe": function (module) {
            var message = null;

            for (message in module.messages) {
                if (module.messages.hasOwnProperty(message)) {
                    (function (module, message) {
                        privateMembers.messageBus.on(message, function (event, data) {
                            if (module && module.messages && typeof module.messages[message] === "function") {
                                module.messages[message].call(module, event, data);
                            }
                        });
                    }(module, message));
                }
            }
        },
        "inherit": function (module) {
            var extendSettings = null,
                Module = this;

            extendSettings = [true, {}, Module, module];
            if (module.mixins) {
                extendSettings.push.apply(extendSettings, module.mixins);
                module.mixins = null;
            }

            return $.extend.apply(Module, extendSettings);
        },
        "publish": function (settings) {
            privateMembers.messageBus.trigger(settings.message, [(settings.data) ? settings.data : null]);
        },
        "create": function (module) {
            var mixin = this,
                newModule = null;

            newModule = mixin.inherit(module);
            newModule.el = $(newModule.scope);

            if (newModule.events) {
                newModule.bindEvents(newModule);
            }

            if (newModule.messages) {
                newModule.subscribe(newModule);
            }

            if (typeof newModule.init === "function") {
                newModule.init();
            }

            return newModule;
        }
    };

    //This is the stuff you should provide.
    Module.events = null;
    Module.init = null;
    Module.messages = null;
    Module.mixins = null;
    Module.scope = null;

    return Module;
});