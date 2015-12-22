var element = {}
	SELECTOR = "";

element = $(SELECTOR);

if (element.length > 0 ) {
	$._data(element[0], "events");
}