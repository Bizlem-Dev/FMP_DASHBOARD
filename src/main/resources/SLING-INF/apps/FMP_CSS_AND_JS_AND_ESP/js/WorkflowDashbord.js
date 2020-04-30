
if (document.getElementById("email").value == "anonymous") {
	// var Email= "viki@gmail.com";
	// var Email= "nilesh@gmail.com";
} else {
	var Email = document.getElementById("email").value;
	console.log("global_Email * " + Email);
}
var lgtype = "";
if (document.getElementById("lgtype").value == "") {
	// var Email= "viki@gmail.com";
	// var Email= "nilesh@gmail.com";
} else {
	var lgtype = document.getElementById("lgtype").value;
}
console.log("global_lgtype * " + lgtype);


//var Email="nilesh@gmail.com";
var group="G1";
var lgtype="null";
 


$(document).ready(function(){
	display_eventlist_template();
	
	
	$('#invoice-table-id').css('display', 'block');
	 sentcount=2073;
	 opencount=2002;
	 downloadcount =1801;
	 unopencount=71;
	 document.getElementById("show_sentcount").innerHTML= sentcount;
		document.getElementById("show_opencount").innerHTML= opencount ;
		document.getElementById("show_downloadcount").innerHTML=downloadcount ;
		document.getElementById("show_unopencount").innerHTML=unopencount ;
});

function display_eventlist_template(){
	$.ajax({

		url : '/portal/servlet/service/GetDTATemplateListSKU1?email='
				+ Email + '&group=' + group + '&lgtype=' + lgtype,
		type : 'GET',
		async : false,
		success : function(data) {
			console.log("setSelectDocumentData " + data);
			var jsonStr = data;
			jsonStr = JSON.parse(jsonStr);
			var setSelectDocumentData = "<option>Select Event</option><option value='0'>All</option>";

			if (jsonStr.Templates.length > 0) {

				for (var i = 0; i < jsonStr.Templates.length; i++) {

					var templatename = "";
					var templatetype = "";
					var datasource = "";
					var object = "";
					var pkfield = "";
					var esignature = "";
					var twoFactor = "";
					var esigntype = "";

					if (jsonStr.Templates[i]
							.hasOwnProperty("templatename")) {

						templatename = jsonStr.Templates[i].templatename;
						templatetype = jsonStr.Templates[i].templatetype;
						datasource = jsonStr.Templates[i].datasource;
						object = jsonStr.Templates[i].object;
						pkfield = jsonStr.Templates[i].pkfield;
						esignature = jsonStr.Templates[i].esignature;
						twoFactor = jsonStr.Templates[i].twoFactor;
						esigntype = jsonStr.Templates[i].esigntype;

						
							setSelectDocumentData = setSelectDocumentData
									+ '<option value="'+ templatetype+ '">'+ templatename+ '</option>';
						}
						// document.getElementById("setSelectDocumentData").innerHTML
						// = setSelectDocumentData;
						document.getElementById("eventlist_template_div").innerHTML = '<select class="form-control" id="eventlist_template" >'
								+ setSelectDocumentData
								+ '</select>';
						
					}

				} // for close

			

		} // sucees

	});
}


function showdocuemntcount(){
	var templatename="";
	var templatenamevalue="";
	var textSelectDocumentName = document.getElementById("eventlist_template");
	
		
	templatename = textSelectDocumentName.options[textSelectDocumentName.selectedIndex].text;
	console.log("templatename: " + templatename);
	templatenamevalue = textSelectDocumentName.options[textSelectDocumentName.selectedIndex].value;

	var sentcount=0;
	var opencount=0;
	var downloadcount =0;
	var unopencount=0;
	
	if(templatenamevalue=="0"){
		$('#invoice-table-id').css('display', 'block');
		 sentcount=2073;
		 opencount=2002;
		 downloadcount =1801;
		 unopencount=71;
		 document.getElementById("show_sentcount").innerHTML= sentcount;
			document.getElementById("show_opencount").innerHTML= opencount ;
			document.getElementById("show_downloadcount").innerHTML=downloadcount ;
			document.getElementById("show_unopencount").innerHTML=unopencount ;
	}else{
		$('#invoice-table-id').css('display', 'none');
		
	$.ajax({

		url : '/portal/getDocumentScriptDataHash_forworkflow?email='
				+ Email + '&group=' + group + '&lgtype=' + lgtype+'&templatename='+templatename,
		type : 'GET',
		async : false,
		success : function(data) {
			console.log("setSelectDocumentData " + data);
			var jsonobj = JSON.parse(data);
			if(jsonobj.hasOwnProperty("documentTrackingData")){
				var documentTrackingDataarr= jsonobj.documentTrackingData;
				
				for(var i=0; i<documentTrackingDataarr.length; i++){
					var subjson =documentTrackingDataarr[i];
					sentcount=i+1;
					if(subjson.hasOwnProperty("uniqueViewMail")){opencount++;
					}else{unopencount++;}
					if(subjson.hasOwnProperty("uniqueView")){downloadcount++;
					}
				}
			}
			
			document.getElementById("show_sentcount").innerHTML= sentcount;
			document.getElementById("show_opencount").innerHTML= opencount ;
			document.getElementById("show_downloadcount").innerHTML=downloadcount ;
			document.getElementById("show_unopencount").innerHTML=unopencount ;
			
		}
	});
	}
}