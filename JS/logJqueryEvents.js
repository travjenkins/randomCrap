for (var method in jQuery.fn) {
	if (jQuery.fn.hasOwnProperty(method) && typeof jQuery.fn[method] === "function" && method !== "init") {
		(function (oldMethod, oldMethodName) {
			jQuery.fn[method] = function() {
				var argumentCounter = 0;

				console.log(oldMethodName);

				console.log("  Being called with the following arguments");
				for(argumentCounter = 0; argumentCounter < arguments.length; argumentCounter += 1) {
					console.log("    " + argumentCounter + ") " + arguments[argumentCounter]);
				}

				console.log("___________________________");
				console.log("");
				return oldMethod.apply(this, arguments);
			};
		})(jQuery.fn[method], method);
	}
}