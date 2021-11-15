<%-- 
    This servlet example is taken from this tutorial:
	http://www.roseindia.net/jsp/simple-jsp-example/conversiontable-of-kilometers-per.shtml
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
    <head>
        <title>ConversionTable of Kilometers per Liter and Miles per Gallon </title>
    </head>
    <body>
    <h2 style="color:#cc0000">:: JSP Example ::</h2>
    <h3 style="color:#cc0000">ConversionTable of Kilometers per Liter and Miles per Gallon</h2>
	
    <table border="1" cellspacing="0" cellpadding="8" bordercolor="white" bgcolor="#f4f4f4">
        <tr>
            <td bgcolor="#ffcc00"><b>Kilometers per Liter</b></td>
            <td bgcolor="#ffcc00"><b>Miles per Gallon</b></td>
        <tr>
        <%
            double kmpl=0.0;
            double mpg=0.0;
            final double CONVERSION_FACTOR = 2.352145;

            for (kmpl = 5; kmpl < 25;kmpl++) {
            	mpg = kmpl * CONVERSION_FACTOR;
        %>      
        <tr>
            <td><%=kmpl%></td>
            <td><%=mpg%></td>
        </tr>
        <%    
            }
        %>
    </table>
</body>
</html>

