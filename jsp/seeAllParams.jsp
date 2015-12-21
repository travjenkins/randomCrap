<%@ page import = "java.util.Map" %>
<%
Map<String, String[]> parameters = request.getParameterMap();
String output = "";
for(String parameter : parameters.keySet()) {
	String[] values = parameters.get(parameter);
	output += "<p>";
		output += "<label>";
			output += parameter;
		output += "</label>";
		output += "<input type='text' value='" + values[0] + "' />";
	output += "</p>";
	output += "<hr>";
}
%>
<%=output %>