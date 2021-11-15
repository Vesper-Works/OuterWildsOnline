$$Util = {}

// JS Array ==> Java List<?>
$$Util.toList = function(jsArray)
{
	var jArr = Java.to(jsArray) 				// to Object[]	
	return java.util.Arrays.asList(jArr)		// to ArrayList<Object>
}

// Java List<?> ==> JS Array
$$Util.toArray = function (jList)
{
	if (!(jList instanceof java.util.Collection))
		throw new java.lang.IllegalArgumentException("Cannot convert object: " + jList + " to native JS Array");
		
	var array = []
	for (var it = jList.iterator(); it.hasNext();)
		array.push(it.next());
		
	return array;
}

