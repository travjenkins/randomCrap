/**
	@author: Travis Jenkins
	@description: Update the country select options if the country and
	@param {object}   data - The params needed to run the funciton. Contains parent query, child query, and callback 
	@param {String}   data.parentQuery - The query string that is used to find the parent element 
	@param {String}   data.childQuery  - The query string that is used to find the child inside the parent element
	@param {function} data.callback  - The callback that is called if both elements exist
*/
changeChildElementOfParent = function (data) {
	var $parent = $(data.parentQuery),
		$child = {};
	
	if ($parent && $parent.length) {
		$child = $parent.children(data.childQuery);
		
		if ($child && $child.length) {
			data.callback($parent, $child);
		}
	}
};