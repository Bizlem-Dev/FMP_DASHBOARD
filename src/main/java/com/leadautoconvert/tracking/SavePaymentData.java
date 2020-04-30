package com.leadautoconvert.tracking;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
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

import com.service.impl.SOAPCall;

@SlingServlet(paths = "/servlet/service/SAvePaymentData")

public class SavePaymentData extends SlingAllMethodsServlet {

	private static final long serialVersionUID = 1L;
	
	@Reference
	private SlingRepository repo;
	
	Session session = null;
	
	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Content-Type", "text/html,charset=UTF-8");
		PrintWriter out=response.getWriter();
		SOAPCall soapcall= new SOAPCall();
		try {
			BufferedInputStream bis = new BufferedInputStream(request.getInputStream());
			ByteArrayOutputStream buf = new ByteArrayOutputStream();
			int result = bis.read();

			while (result != -1) {
				buf.write((byte) result);
				result = bis.read();
			}
			String res = buf.toString("UTF-8");
			JSONObject resultjsonobject = new JSONObject(res);
			out.println(resultjsonobject);
			
			String str=  soapcall.callPostJSonModified("http://199.217.112.145:8089/fma/api/PaymentController", resultjsonobject);
			out.println(str);
		} catch (Exception e) {
			e.printStackTrace(out);
		}
		
		finally {
			out.close();
			session.logout();
		}
		
	}
	
	
  
}