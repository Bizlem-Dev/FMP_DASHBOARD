
if (document.getElementById("email").value == "anonymous") {
	// var Email= "viki@gmail.com";
	// var Email= "nilesh@gmail.com";
} else {
	var Email = document.getElementById("email").value;
	console.log("global_Email " + Email);
}
var lgtype = "";
if (document.getElementById("lgtype").value == "") {
	// var Email= "viki@gmail.com";
	// var Email= "nilesh@gmail.com";
} else {
	var lgtype = document.getElementById("lgtype").value;
}
console.log("global_lgtype " + lgtype);


//var Email="nilesh@gmail.com";
var group="G1";
var lgtype="null";

$(document).ready(function(){
	
	var urlMail='/portal/servlet/service/getAllFMPTemplates.mailtemplate?email='+Email+'&group='+group+'&lgtype='+lgtype;
	var selectedData=$(".selectOptionsData option:selected").text();
        //console.log("selectedDataReady:: "+selectedData);
if( "Select Mail"==selectedData ){
		
		setDataInDropDownTemplateEdit('setDataBasedOnSelectedOptions',urlMail,'Select Mail');
}
    
	
	createOptions(); //called when the page is rendered the first time
	
	var urlMail='/portal/servlet/service/getAllFMPTemplates.mailtemplate?email='+Email+'&group='+group+'&lgtype='+lgtype;
	var urlSms='/portal/servlet/service/getAllFMPTemplates.smstemplate?email='+Email+'&group='+group+'&lgtype='+lgtype;
	var urlWhatsapp='/portal/servlet/service/getAllFMPTemplates.whatsapptemplate?email='+Email+'&group='+group+'&lgtype='+lgtype;
	var urlCall='/portal/servlet/service/getAllFMPTemplates.calltemplate?email='+Email+'&group='+group+'&lgtype='+lgtype;
	
	setDataInDropDown('selectMailClass',urlMail,'Select Mail');
	setDataInDropDown('selectSmsClass',urlSms,'Select SMS');
	setDataInDropDown('selectWhatsappClass',urlWhatsapp,'Select Whatsapp');
	setDataInDropDown('selectCallClass',urlCall,'Select Call');
	
	getReminderSavedData();
	
});




//template for new reminder
$(document).on("click", ".fa-plus", function () {
	
	/*var myTable = document.getElementById('tableReminderData');
	var rows =  myTable.rows;
	var firstRow = rows[0];*/
	
//	$("#tableReminderData tr:first");
	//console.log( "firstRow::: "+$(".reminder-table tr:first-child").html() );
	
	var trData=$(".reminder-table tr:first-child").html();
	
	$(".reminder-table").append( "<tr>" + $(".reminder-table tr:first-child").html() + "</tr>");
	
//	console.log( "firstRowChild::: "+$(".reminder-table tr:first").html() );
	
	
/*$(".reminder-table").append(`
      <tr>
        <td><input  id ='reminder' name="reminder" type="radio" ></td>
              <td  class="date-background">
                <select  class="form-control invoiceAndDueDateClass">
                  <option >Invoice Date</option>
                  <option >Invoice Due Date</option>
                </select>
                
              </td>
              <td>
                <select  class="form-control onBeforeAfterClass">
                  <option >On</option>
                  <option >Before</option>
                  <option >After</option>
                </select>
              </td>
              <td><select  class="form-control one-twenty oneTwentyNumbersClass">
              </select></td>
              <td><input  type="text" value="Invoice Ready" placeholder="" class="invoiceReadyClass"></td>
              
              <td>
                <select  class="form-control selectMailClass">
                  <option selected >Select Mail</option>
                  <option >New</option>
                </select>
              </td>
              <td>
                <select  class="form-control selectSmsClass">
                  <option selected >Select SMS</option>
                  <option >New</option>
                </select>
              </td>
              <td>
                <select  class="form-control selectWhatsappClass">
                  <option selected >Select Whatsapp</option>
                  <option >New</option>
                </select>
              </td>
              <td>
                <select  class="form-control selectCallClass">
                  <option selected >Select Call</option>
                  <option >New</option>
                </select>
              </td>
              <td><i  class="fa fa-minus" aria-hidden="true"></i></td>
          </tr>
      `)*/
});

function createOptions(){
var $select = $(".one-twenty");
$select.empty() //removes all the options from the select box
$select.append('<option>NoOfDays</option>')
for (i=0;i<=20;i++){
    $select.append($('<option></option>').val(i).html(i))
};
}

//createOptions(); //called when the page is rendered the first time

/*$(document).on("click", ".fa-plus", function () {
   createOptions();
});*/

$(document).on("click", ".fa-minus", function () {
$(this).parent().parent().remove()
});

$("#edit").click(function () {

$("input").attr('disabled', false)
$("select").attr('disabled', false);
$("input").attr('readonly', false);
});

$("#save").click(function () {

$("input").attr('disabled', true)
$("select").attr('disabled', true);
$("input").attr('readonly', true);
});


function IsJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}


//function saveData(){

$(document).on("click", "#saveData", function () {
    	
	var mainJson={};
	mainJson.email=Email;
	mainJson.group=group;
	mainJson.lgtype=lgtype;
	
	var arrayData=[];
	 $.each($(".invoiceAndDueDateClass option:selected"), function(index,row){
//		 if(index != 0){
//		 if(index > 1){
		 var json={};
     	
     	/*if( "Select Funnels"==$(this).text() ){
     	}*/
//     	else{
//     		console.log( "selectMulthis:: " + $(this).text() );
//     		console.log( "selectMulSingle:: " + $(".invoiceAndDueDateClass").text() );
		   // console.log("index:: "+index);
		   // console.log("invoiceReadyClassValue:: "+$(".invoiceReadyClass").eq(index).val());
		    
     		/*console.log("invoiceAndDueDateClass:: "+$(".invoiceAndDueDateClass option:selected").eq(index).text());
     		console.log("onBeforeAfterClass:: "+$(".onBeforeAfterClass option:selected").eq(index).text());
     		console.log("oneTwentyNumbersClass:: "+$(".oneTwentyNumbersClass option:selected").eq(index).text());
     		console.log("invoiceReadyClass:: "+$(".invoiceReadyClass").eq(index).val());
     		
     		
     		console.log("selectMailClass:: "+$(".selectMailClass option:selected").eq(index).text());
     		console.log("selectSmsClass:: "+$(".selectSmsClass option:selected").eq(index).text());
     		console.log("selectWhatsappClass:: "+$(".selectWhatsappClass option:selected").eq(index).text());
     		console.log("selectCallClass:: "+$(".selectCallClass option:selected").eq(index).text());*/
//     	}
     	
     	if( $(".invoiceAndDueDateClass option:selected").eq(index).text() == "Invoice Date" && $(".onBeforeAfterClass option:selected").eq(index).text() == "Select Relation" && 
     			$(".oneTwentyNumbersClass option:selected").eq(index).text() == "NoOfDays" && $(".invoiceReadyClass").eq(index).val() == "Event Name" && 
     			$(".selectMailClass option:selected").eq(index).text()=="Select Mail" && $(".selectSmsClass option:selected").eq(index).text()=="Select SMS" && $(".selectWhatsappClass option:selected").eq(index).text()=="Select Whatsapp" && 
     			$(".selectCallClass option:selected").eq(index).text()=="Select Call"){
     		
     	}else{
     		json.field=$(".invoiceAndDueDateClass option:selected").eq(index).text();
      		json.relation=$(".onBeforeAfterClass option:selected").eq(index).text();
      		json.noofdays=$(".oneTwentyNumbersClass option:selected").eq(index).text();
      		json.message=$(".invoiceReadyClass").eq(index).val();
      		
      		json.mailtemplate=$(".selectMailClass option:selected").eq(index).text();
      		json.smstemplate=$(".selectSmsClass option:selected").eq(index).text();
      		json.whatsapptemplate=$(".selectWhatsappClass option:selected").eq(index).text();
      		json.calltemplate=$(".selectCallClass option:selected").eq(index).text();
      		
      		arrayData.push(json);
     	}
		    
		   
//		 }
     });
	 
	 mainJson.data=arrayData;
	 console.log(JSON.stringify(mainJson));
	 
/* for(var i=0;i<document.getElementsByClassName("invoiceAndDueDateClass").length;i++){
  		console.log("invoiceReadyClassForLoop:: "+document.getElementsByClassName("invoiceReadyClass")[i].value);

	 }*/
 	
	 
	 $.ajax({
			type : "POST",
			url : "/portal/servlet/service/SaveFMPReminder",
			async : false,
			data : JSON.stringify(mainJson),
			contentType : "application/json",
			success : function(data) {
				console.log("saveDataSaveFMPReminder: " + JSON.stringify(data));
				
				var isJsonValid = IsJsonString(data);
				if (isJsonValid) {
					
					var jsonStr = JSON.parse(data);
					if (jsonStr.hasOwnProperty("status")) {
						var status=jsonStr.status;
						
						if( status=="success" ){
							
							if (jsonStr.hasOwnProperty("message")) {
								var message=jsonStr.message;
								document.getElementById("setReminderMessage").innerHTML = "Reminders saved successfully";
								
								 $("input").attr('disabled', false)
								 $("select").attr('disabled', false);
								 $("input").attr('readonly', false);
								 
							}
							
						}else{
							if (jsonStr.hasOwnProperty("message")) {
								var message=jsonStr.message;
								document.getElementById("setReminderMessage").innerHTML = "error found in api";
							}
						}
						
						
					}
				}
				
				
			} // Ajax success closed 
	 
	 
		}); // Ajax closed here
	 
   });

function setDataInDropDown(selectMailClass,url,selectDefaultOptionsText){
	
	$.ajax({
		
		type : 'GET',
//		url : '/portal/servlet/service/getAllFMPTemplates.mailtemplate?email='+Email+'&group='+group+'&lgtype='+lgtype,
		url : url,
		async: false,
		success : function(data) {
			
			//console.log(selectMailClass+":: "+data);
			
			var isJsonValid = IsJsonString(data);
			if (isJsonValid) {
			
			var jsonObj=JSON.parse(data);
			
			if (jsonObj.hasOwnProperty("status")) {
				var status=jsonObj.status;
				if( status=="success" ){
					
					if (jsonObj.hasOwnProperty("template")) {
						var funnelArray=jsonObj.template;
						
			if( funnelArray.length>0 ){
				
					$("."+selectMailClass).each(function(index,row){
						var funnelListBodyAppend="";
						for( var i=0;i<funnelArray.length;i++ ){
							var funnaleData=funnelArray[i];
							funnelListBodyAppend=funnelListBodyAppend+'<option value="'+funnaleData+'">'+funnaleData+'</option>';
							
						}// for closed
				    
				    document.getElementsByClassName(selectMailClass)[index].innerHTML='<option value="'+selectDefaultOptionsText+'">'+selectDefaultOptionsText+'</option><option value="New">New</option>'+funnelListBodyAppend;
				});
				
				
			} // funnelArray closed
				}
			
			} // status equals check closed
			} // status json check closed
			
			}// jsonvalid Closed
			
		} // Ajax success closed
		
	});
	
}


function displayAddNewTabSrcData() {

	var remoteuser = document.getElementById("remoteuser").value;
	var getNewDashboardDocument = 'http://bluealgo.com:8082/portal/servlet/service/DoctigerCreation?group='
			+ group + '#data-source';
	if (remoteuser == "anonymous") {
		getNewDashboardDocument = 'https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=3MVG9YDQS5WtC11qMYVuWglNUQAQ5Y3BppSObU0XrARa3RgQn0mIAWhTkAcqyDIrI_ChHUI_q_mf1le_2_Vfn&redirect_uri=http://bluealgo.com:8082/portal/servlet/service/getTokenNRedirect';
	} else {
		getNewDashboardDocument = 'http://bluealgo.com:8082/portal/servlet/service/DoctigerCreation?group='
				+ group + '#data-source';
	}

	window.open(getNewDashboardDocument, "_blank");

}

function editTemplateData() {

	var remoteuser = document.getElementById("remoteuser").value;
	var getNewDashboardDocument = 'http://bluealgo.com:8082/portal/servlet/service/DoctigerCreation?group='
			+ group + '#mailTemplateNew';
	if (remoteuser == "anonymous") {
		getNewDashboardDocument = 'https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=3MVG9YDQS5WtC11qMYVuWglNUQAQ5Y3BppSObU0XrARa3RgQn0mIAWhTkAcqyDIrI_ChHUI_q_mf1le_2_Vfn&redirect_uri=http://bluealgo.com:8082/portal/servlet/service/getTokenNRedirect';
	} else {
		getNewDashboardDocument = 'http://bluealgo.com:8082/portal/servlet/service/DoctigerCreation?group='
				+ group + '#mailTemplateNew';
	}

	window.open(getNewDashboardDocument, "_blank");

}


function getReminderSavedData(){
	
	
	//...................................
	
	// if we need make four loop here and inside json also.
	
	/*var mailArray= new Array();
	var invoiceData=[];
	var smsArray= new Array();
	var whatsappArray= new Array();
	var callArray= new Array();
	
	var selectMailId = document.getElementById('selectMailId');
	var selectSmsId = document.getElementById('selectSmsId');
	var selectWhatsappId = document.getElementById('selectWhatsappId');
	var selectCallId = document.getElementById('selectCallId');
	
	
	for (var k = 0; k < selectMailId.options.length; k++) {
		
		mailArray[k] = selectMailId.options[k].value;
		smsArray[k] = selectSmsId.options[k].value;
		whatsappArray[k] = selectWhatsappId.options[k].value;
		callArray[k] = selectCallId.options[k].value;
		
		//invoiceData.push(selectCallId.options[k].value);
	}*/

	
//	$("#selectMailId option:contains('op 2')").attr('selected', 'selected');
	/*$("#selectMailId option:contains(" + inputText + ")").attr('selected', 'selected');
	
	var first = document.getElementById('selectMailId');
	var options = first.innerHTML;
	console.log("optionsFirst:: "+options);
	$("#selector_a option:contains('op 2')").attr('selected', false);

	var second = document.getElementById('selector_b');
	var options = second.innerHTML + options;

	second.innerHTML = options;
	console.log("second.innerHTML:: "+second.innerHTML);*/
	
	//..................................
	
	
	$.ajax({
		
		type : 'GET',
		url : '/portal/servlet/service/GetFMPReminder?email='+Email+'&group='+group+'&lgtype='+lgtype,
		async: false,
		success : function(data) {
			
			console.log("GetFMPReminder:: "+data);
			
			var isJsonValid = IsJsonString(data);
			if (isJsonValid) {
			
			var jsonObj=JSON.parse(data);
			
			if (jsonObj.hasOwnProperty("status")) {
				var status=jsonObj.status;
				if( status=="success" ){
					
					if (jsonObj.hasOwnProperty("data")) {
						var dataArray=jsonObj.data;
						
						//console.log("dataArray:: "+dataArray);
						
			if( dataArray.length>0 ){
				
				var appendBody="";
				
				for( var i=0;i<dataArray.length;i++ ){
					
//					if( i!=0 ){
					 var insideObj=dataArray[i];
					
					 var field="";
					 var relation="";
					 var noofdays="";
					 var message="";
					 var mailtemplate="";
					 var smstemplate="";
					 var whatsapptemplate="";
					 var calltemplate="";
					 
					 if (insideObj.hasOwnProperty("field")) {
						 field=insideObj.field;
					 } if (insideObj.hasOwnProperty("relation")) {
						   relation=insideObj.relation;
					 } if (insideObj.hasOwnProperty("noofdays")) {
						   noofdays=insideObj.noofdays;
					 } if (insideObj.hasOwnProperty("message")) {
						   message=insideObj.message;
					 } if (insideObj.hasOwnProperty("mailtemplate")) {
						   mailtemplate=insideObj.mailtemplate;
					 } if (insideObj.hasOwnProperty("smstemplate")) {
						   smstemplate=insideObj.smstemplate;
					 } if (insideObj.hasOwnProperty("whatsapptemplate")) {
						   whatsapptemplate=insideObj.whatsapptemplate;
					 }if (insideObj.hasOwnProperty("calltemplate")) {
						  calltemplate=insideObj.calltemplate;
					 }
					 
					   /* var mailOptions="";
						var whatsappOptions="";
						var callOptions="";
						var smsOptions="";
					 
					 for (var j = 0; j < mailArray.length; j++) {
							var matchDataMail=mailArray[j];
							
							var matchDataSms=smsArray[j];
							var matchDataWhatsapp=whatsappArray[j];
							var matchDataCall=callArray[j];
							
							if(matchDataMail==mailtemplate){
								mailOptions=mailOptions+'<option selected value="'+mailtemplate+'">'+mailtemplate+'</option>';
							}else{
								mailOptions=mailOptions+'<option value="'+matchDataMail+'">'+matchDataMail+'</option>';
							}
							
							if(matchDataWhatsapp==whatsapptemplate){
								whatsappOptions=whatsappOptions+'<option selected value="'+whatsapptemplate+'">'+whatsapptemplate+'</option>';
							}else{
								whatsappOptions=whatsappOptions+'<option value="'+matchDataWhatsapp+'">'+matchDataWhatsapp+'</option>';
							}
							
							
							if(matchDataCall==calltemplate){
								callOptions=callOptions+'<option selected value="'+calltemplate+'">'+calltemplate+'</option>';
							}else{
								callOptions=callOptions+'<option value="'+matchDataCall+'">'+matchDataCall+'</option>';
							}
							
							if(matchDataSms==smstemplate){
								smsOptions=smsOptions+'<option selected value="'+smstemplate+'">'+smstemplate+'</option>';
							}else{
								smsOptions=smsOptions+'<option value="'+matchDataSms+'">'+matchDataSms+'</option>';
							}
							
						}
					 
					 
					 appendBody=appendBody+'<tr><td><input disabled type="radio" name="reminder"></td><td class="date-background"><select disabled class="form-control invoiceAndDueDateClass"><option selected>'+field+'</option></select></td><td><select disabled class="form-control onBeforeAfterClass"><option selected>'+relation+'</option></select></td><td><select disabled class="form-control one-twenty oneTwentyNumbersClass"><option selected>'+noofdays+'</option></select></td><td><input type="text" value="'+message+'" readonly placeholder=""></td><td><select disabled class="form-control selectMailClass">'+mailOptions+'</select></td><td><select disabled class="form-control selectSmsClass">'+smsOptions+'</select></td><td><select disabled class="form-control selectWhatsappClass">'+whatsappOptions+'</select></td><td><select disabled class="form-control selectCallClass">'+callOptions+'</select></td><td><i  class="fa fa-minus" aria-hidden="true"></i></td></tr>';
					 */
					 
					 //.........copy html..........................................
//						$("#selectMailId option:contains('op 2')").attr('selected', 'selected');
					 
					    var mailOptions="";
						var whatsappOptions="";
						var callOptions="";
						var smsOptions="";
						
						var invoiceAndDueDateIdOptions="";
						var onBeforeAfterIdOptions="";
						var oneTwentyNumbersIdOptions="";
						
				$('#selectMailId option').filter(function() { return $.trim( $(this).text() ) == mailtemplate; }).attr('selected',true);
				$('#selectSmsId option').filter(function() { return $.trim( $(this).text() ) == smstemplate; }).attr('selected',true);
				$('#selectWhatsappId option').filter(function() { return $.trim( $(this).text() ) == whatsapptemplate; }).attr('selected',true);
				$('#selectCallId option').filter(function() { return $.trim( $(this).text() ) == calltemplate; }).attr('selected',true);
				
				      //$("#selectMailId option:contains(" + mailtemplate + ")").attr('selected', 'selected');
//						$("#selectSmsId option:contains(" + smstemplate + ")").attr('selected', 'selected');
//						$("#selectWhatsappId option:contains(" + whatsapptemplate + ")").attr('selected', 'selected');
//						$("#selectCallId option:contains(" + calltemplate + ")").attr('selected', 'selected');
						
				$('#invoiceAndDueDateId option').filter(function() { return $.trim( $(this).text() ) == field; }).attr('selected',true);
				$('#onBeforeAfterId option').filter(function() { return $.trim( $(this).text() ) == relation; }).attr('selected',true);
				$('#oneTwentyNumbersId option').filter(function() { return $.trim( $(this).text() ) == noofdays; }).attr('selected',true);
				
						/*$("#invoiceAndDueDateId option:contains(" + field + ")").attr('selected', 'selected');
						$("#onBeforeAfterId option:contains(" + relation + ")").attr('selected', 'selected');
						$("#oneTwentyNumbersId option:contains(" + noofdays + ")").attr('selected', 'selected');*/
						
						var first = document.getElementById('selectMailId');
						var mailOptions = first.innerHTML;
						//console.log("mailOptions:: "+mailOptions);
						
//						$("#selectMailId option:contains(" + mailtemplate + ")").attr('selected', false);
						$('#selectMailId option').filter(function() { return $.trim( $(this).text() ) == mailtemplate; }).attr('selected',false);
						
						var firstselectSmsId = document.getElementById('selectSmsId');
						var smsOptions = firstselectSmsId.innerHTML;
						//console.log("smsOptions:: "+smsOptions);
						
						//$("#selectSmsId option:contains(" + smstemplate + ")").attr('selected', false);
						$('#selectSmsId option').filter(function() { return $.trim( $(this).text() ) == smstemplate; }).attr('selected',false);
						
						var firstselectWhatsappId = document.getElementById('selectWhatsappId');
						var whatsappOptions = firstselectWhatsappId.innerHTML;
						//console.log("whatsappOptions:: "+whatsappOptions);
						
						//$("#selectWhatsappId option:contains(" + whatsapptemplate + ")").attr('selected', false);
						$('#selectWhatsappId option').filter(function() { return $.trim( $(this).text() ) == whatsapptemplate; }).attr('selected',false);
						
						var firstselectCallId = document.getElementById('selectCallId');
						var callOptions = firstselectCallId.innerHTML;
						//console.log("callOptions:: "+callOptions);
						
						//$("#selectCallId option:contains(" + calltemplate + ")").attr('selected', false);
						$('#selectCallId option').filter(function() { return $.trim( $(this).text() ) == calltemplate; }).attr('selected',false);
						
						var invoiceAndDueDateId = document.getElementById('invoiceAndDueDateId');
						var invoiceAndDueDateIdOptions = invoiceAndDueDateId.innerHTML;
						//console.log("invoiceAndDueDateIdOptions:: "+invoiceAndDueDateIdOptions);
						
						//$("#invoiceAndDueDateId option:contains(" + field + ")").attr('selected', false);
						$('#invoiceAndDueDateId option').filter(function() { return $.trim( $(this).text() ) == field; }).attr('selected',false);
						
						var onBeforeAfterId = document.getElementById('onBeforeAfterId');
						var onBeforeAfterIdOptions = onBeforeAfterId.innerHTML;
						//console.log("onBeforeAfterIdOptions:: "+onBeforeAfterIdOptions);
						
						//$("#onBeforeAfterId option:contains(" + relation + ")").attr('selected', false);
						$('#onBeforeAfterId option').filter(function() { return $.trim( $(this).text() ) == relation; }).attr('selected',false);
						
						var oneTwentyNumbersId = document.getElementById('oneTwentyNumbersId');
						var oneTwentyNumbersIdOptions = oneTwentyNumbersId.innerHTML;
						//console.log("oneTwentyNumbersIdOptions:: "+oneTwentyNumbersIdOptions);
						
						//$("#oneTwentyNumbersId option:contains(" + noofdays + ")").attr('selected', false);
						$('#oneTwentyNumbersId option').filter(function() { return $.trim( $(this).text() ) == noofdays; }).attr('selected',false);
						
						//.............end copy html ..........................................
					 
					   appendBody=appendBody+'<tr><td><input disabled type="radio" name="reminder"></td><td class="date-background"><select disabled class="form-control invoiceAndDueDateClass">'+invoiceAndDueDateIdOptions+'</select></td><td><select disabled class="form-control onBeforeAfterClass">'+onBeforeAfterIdOptions+'</select></td><td width="105px"><select disabled class="form-control one-twenty oneTwentyNumbersClass">'+oneTwentyNumbersIdOptions+'</select></td><td><input type="text" value="'+message+'" readonly placeholder="'+message+'" class="invoiceReadyClass"></td><td width="150px"><select disabled class="form-control selectMailClass">'+mailOptions+'</select></td><td><select disabled class="form-control selectSmsClass">'+smsOptions+'</select></td><td><select disabled class="form-control selectWhatsappClass">'+whatsappOptions+'</select></td><td><select disabled class="form-control selectCallClass">'+callOptions+'</select></td><td><i  class="fa fa-minus" aria-hidden="true"></i></td></tr>';
					 //appendBody=appendBody+'<tr><td><input disabled type="radio" name="reminder"></td><td class="date-background"><select disabled class="form-control invoiceAndDueDateClass"><option selected>'+field+'</option></select></td><td><select disabled class="form-control onBeforeAfterClass"><option selected>'+relation+'</option></select></td><td><select disabled class="form-control one-twenty oneTwentyNumbersClass"><option selected>'+noofdays+'</option></select></td><td><input type="text" value="'+message+'" readonly placeholder="'+message+'" class="invoiceReadyClass"></td><td><select disabled class="form-control selectMailClass"><option selected>'+mailtemplate+'</option></select></td><td><select disabled class="form-control selectSmsClass"><option selected>'+smstemplate+'</option></select></td><td><select disabled class="form-control selectWhatsappClass"><option selected>'+whatsapptemplate+'</option></select></td><td><select disabled class="form-control selectCallClass"><option selected>'+calltemplate+'</option></select></td><td><i  class="fa fa-minus" aria-hidden="true"></i></td></tr>';
					 
					 
						/*console.log("mailArray:: "+i+" "+mailArray);
						console.log("smsArray:: "+i+" "+smsArray);
						console.log("whatsappArray:: "+i+" "+whatsappArray);
						console.log("callArray:: "+i+" "+callArray);
						
						console.log("invoiceData:: "+invoiceData);*/
					
				} // for closed
					
//				}// zero not allowed here
				
				$(".reminder-table").append(appendBody);   //tableReminderData
				
				/*var tableReminderData = document.getElementById('tableReminderData');
                    tableReminderData.innerHTML = appendBody;*/
					
			} // dataArray closed
			else{
				$("input").attr('disabled', false)
				$("select").attr('disabled', false);
				$("input").attr('readonly', false);
			}
				}else{
					$("input").attr('disabled', false)
					$("select").attr('disabled', false);
					$("input").attr('readonly', false);
				}
			
			} // status equals check closed
				else{
					$("input").attr('disabled', false)
					$("select").attr('disabled', false);
					$("input").attr('readonly', false);
				}
			} // status json check closed
			else{
				$("input").attr('disabled', false)
				$("select").attr('disabled', false);
				$("input").attr('readonly', false);
			}
			
			}// jsonvalid Closed
			
			else{
				$("input").attr('disabled', false)
				$("select").attr('disabled', false);
				$("input").attr('readonly', false);
			}
			
		} // Ajax success closed
		
	});
	
}


function setDataOnChanged(){
	
	var urlMail='/portal/servlet/service/getAllFMPTemplates.mailtemplate?email='+Email+'&group='+group+'&lgtype='+lgtype;
	var urlSms='/portal/servlet/service/getAllFMPTemplates.smstemplate?email='+Email+'&group='+group+'&lgtype='+lgtype;
	var urlWhatsapp='/portal/servlet/service/getAllFMPTemplates.whatsapptemplate?email='+Email+'&group='+group+'&lgtype='+lgtype;
	var urlCall='/portal/servlet/service/getAllFMPTemplates.calltemplate?email='+Email+'&group='+group+'&lgtype='+lgtype;
	
	var selectedData=$(".selectOptionsData option:selected").text();
	    // console.log("selectedData:: "+selectedData);
	
	if( "Select Mail"==selectedData ){
		
		setDataInDropDownTemplateEdit('setDataBasedOnSelectedOptions',urlMail,'Select Mail');
		
	}else if( "Select SMS"==selectedData ){
		
		setDataInDropDownTemplateEdit('setDataBasedOnSelectedOptions',urlSms,'Select SMS');
		
	}else if( "Select Whatsapp"==selectedData ){
		
		setDataInDropDownTemplateEdit('setDataBasedOnSelectedOptions',urlWhatsapp,'Select Whatsapp');
		
	}else if( "Select Call"==selectedData ){
		
		setDataInDropDownTemplateEdit('setDataBasedOnSelectedOptions',urlCall,'Select Call');
		
	}
	
	
}

$(document).on("change", ".selectOptionsData", function () {
	setDataOnChanged();
});

function setDataInDropDownTemplateEdit(selectMailClass,url,selectDefaultOptionsText){
	
	$.ajax({
		
		type : 'GET',
//		url : '/portal/servlet/service/getAllFMPTemplates.mailtemplate?email='+Email+'&group='+group+'&lgtype='+lgtype,
		url : url,
		async: true,
		success : function(data) {
			
			//console.log(selectMailClass+":: "+data);
			
			var isJsonValid = IsJsonString(data);
			if (isJsonValid) {
			
			var jsonObj=JSON.parse(data);
			
			if (jsonObj.hasOwnProperty("status")) {
				var status=jsonObj.status;
				if( status=="success" ){
					
					if (jsonObj.hasOwnProperty("template")) {
						var funnelArray=jsonObj.template;
						
			if( funnelArray.length>0 ){
				
					$("."+selectMailClass).each(function(index,row){
						var funnelListBodyAppend="";
						for( var i=0;i<funnelArray.length;i++ ){
							var funnaleData=funnelArray[i];
							funnelListBodyAppend=funnelListBodyAppend+'<option value="'+funnaleData+'">'+funnaleData+'</option>';
							
						}// for closed
				    
				    document.getElementsByClassName(selectMailClass)[index].innerHTML=funnelListBodyAppend;
				    
				});
				
				
			} // funnelArray closed
				}
			
			} // status equals check closed
			} // status json check closed
			
			}// jsonvalid Closed
			
		} // Ajax success closed
		
	});
	
}





