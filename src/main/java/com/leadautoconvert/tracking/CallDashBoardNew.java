package com.leadautoconvert.tracking;

import java.io.IOException;
import java.io.PrintWriter;

import javax.jcr.Session;
import javax.jcr.SimpleCredentials;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.apache.sling.jcr.api.SlingRepository;

@SlingServlet(paths = "/servlet/service/DashBoardNew")

public class CallDashBoardNew extends SlingAllMethodsServlet {

	private static final long serialVersionUID = 1L;
	
	@Reference
	private SlingRepository repo;
	
	Session session = null;
	
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Content-Type", "text/html,charset=UTF-8");
		
		PrintWriter out=response.getWriter();
		
		try {

			session = repo.login(new SimpleCredentials("admin", "admin".toCharArray()));
			
			RequestDispatcher dis= request.getRequestDispatcher("/content/static/.DashBoardNew");

  			dis.forward(request, response);
			
			
			
		} catch (Exception e) {
			e.printStackTrace(out);
		}
		
		finally {
			out.close();
			session.logout();
		}
		
	}
	
	
	public static boolean isNullString (String p_text){
		if(p_text != null && p_text.trim().length() > 0 && !"null".equalsIgnoreCase(p_text.trim())){
			return false;
		}
		else{
			return true;
		}
	}
	
	public static boolean isJSONValid(String test) {
		try {
			new JSONObject(test);
		} catch (JSONException ex) {
			
			try {
				new JSONArray(test);
			} catch (JSONException ex1) {
				return false;
			}
		}
		return true;
	}
	
  
}