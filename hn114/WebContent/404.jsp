<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<html>
  <head>
    <title> 404  </title>
  </head>
  
  <body>
   
   <div>
            请检查您url路径。
   </div>
   
    <div>
   <%  
    String uri=request.getRequestURI();  
    out.println(""+uri);
   %> 
   </div>
  </body>
</html>
