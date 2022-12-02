
//추가할 행 html 생성
var salesTag = '';
var purchaseTag = '';

var grdSelectDiv = '';
var grpSelectDiv = '';
var dutySelectDiv = '';
var castMemberDiv = '';
var castListDiv = '';


function getSpList(projNo){
	
	var projInfo = JSON.stringify({
		projNo: projNo
	});
	
	$.ajax({
		type : 'POST',
		url : '/sales/salesList',
		data : projInfo,
		dataType: 'json',
		contentType: 'application/json',
		async: false,
		success : function(data) {
			
			$('#investDetail').addClass('is-active');
			
			//salesTag = setSalesDefualtTag(data);
			//purchaseTag = setPurchaseDefaultTag(data);
			
			grdSelectDiv = setSelect(data.grdCdList, 'grd', 'grdCd');
			grpSelectDiv = setSelect(data.grpCdList, 'grp', 'jobGrpCd');
			dutySelectDiv = setSelect(data.dutyCdList, 'duty', 'jobDutyCd');
			castMemberDiv = setSelect(data.castMemberList, 'member', 'memId');
			castListDiv = setSelect(data.castStatList, 'cast', 'castStatCd');
		},
		error : function(xhr, status, error) {
			alert('서버오류로 지연되고있습니다. 잠시 후 다시 시도해주시기 바랍니다.');
			
			return false;
		}
	});
}

var pLineCnt = 0;
var rowSpanCnt = 0;

//매출 행 html 생성
function setSalesDefualtTag(){
	
	salesTag = '';
	
	salesTag += '    <tr draggable="true" class="dragTr" id="salesTr_' + pLineCnt + '">';
	salesTag += '        <input type="hidden" name="salesLineNo" id="salesLineNo" value="' + pLineCnt + '">';
	salesTag += '        <td>';
	salesTag += '            <input type="checkbox" id="rowCheck_' + pLineCnt + '" name="rowCheck" class="chkEach">';
	salesTag += '            <label for="rowCheck_' + pLineCnt + '"></label>';
	salesTag += '        </td>';
	salesTag += '        <td>';
	// salesTag += grdSelectDiv;
	salesTag += '			<div class="select xsSize" id="grdCdSelect">';  
	salesTag += '				<input type="hidden" name="grdCd" id="grdCd">';
	salesTag += '			    <span class="selDefault low new">선택</span>';    
	salesTag += '				<ul class="optionList">';
	salesTag += '			        <li class="optionItem">초급</li>';
	salesTag += '			        <li class="optionItem">중급</li>';
	salesTag += '			        <li class="optionItem">고급</li>';
	salesTag += '			        <li class="optionItem">특급</li>';
	salesTag += '			    </ul>';
	salesTag += '			</div>';
	salesTag += '        </td>';
	salesTag += '        <td>';
	// salesTag += grpSelectDiv;
	salesTag += '			<div class="select xsSize" id="jobGrpCdSelect">';  
	salesTag += '				<input type="hidden" name="jobGrpCd" id="jobGrpCd">';
	salesTag += '			    <span class="selDefault low">선택</span>';    
	salesTag += '				<ul class="optionList">';
	salesTag += '			        <li class="optionItem">초급</li>';
	salesTag += '			        <li class="optionItem">중급</li>';
	salesTag += '			        <li class="optionItem">고급</li>';
	salesTag += '			        <li class="optionItem">특급</li>';
	salesTag += '			    </ul>';
	salesTag += '			</div>';
	salesTag += '        </td>';
	salesTag += '        <td>';
	// salesTag += dutySelectDiv;
	salesTag += '			<div class="select" id="jobDutyCdSelect">';  
	salesTag += '				<input type="hidden" name="jobDutyCd" id="jobDutyCd">';
	salesTag += '			    <span class="selDefault low">선택</span>';    
	salesTag += '				<ul class="optionList">';
	salesTag += '			        <li class="optionItem">초급</li>';
	salesTag += '			        <li class="optionItem">중급</li>';
	salesTag += '			        <li class="optionItem">고급</li>';
	salesTag += '			        <li class="optionItem">특급</li>';
	salesTag += '			    </ul>';
	salesTag += '			</div>';
	salesTag += '        </td>';
	salesTag += '        <td><input class="editType" name="saleCastYmd" id="salesCastDate_' + pLineCnt + '" type="date" onclick="javascript: this.blur();" onchange="castDateChange(' + pLineCnt + ')"></td>';
	salesTag += '        <td><input class="editType" name="saleEndYmd" id="salesEndDate_' + pLineCnt + '"  type="date" onclick="javascript: this.blur();" onchange="endDateChange(' + pLineCnt + ')"></td>';
	//salesTag += '        <td><input class="editType manMonth" type="text" placeholder="0" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\./g, \'$1\');" style="text-align: center;" id="manMonth_' + pLineCnt + '" onchange="calPrice(' + pLineCnt + ')" maxlength="6" /></td>';
	//salesTag += '        <td><input class="editType salesAmt" type="text" placeholder="0" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\./g, \'$1\');" style="text-align: center;" id="saleAmt_' + pLineCnt + '" onchange="calPrice(' + pLineCnt + ')" maxlength="10" /></td>';
	salesTag += '        <td><input class="editType manMonth" name="saleManMon" type="text" placeholder="0" style="text-align: center;" id="manMonth_' + pLineCnt + '" onkeyup="calPrice(' + pLineCnt + ')" maxlength="6" /></td>';
	salesTag += '        <td><input class="editType salesAmt" name="saleUnitPirce" type="text" placeholder="0" style="text-align: center;" id="saleAmt_' + pLineCnt + '" onkeyup="calPrice(' + pLineCnt + ')" maxlength="5" /></td>';
	salesTag += '        <td id="salesCalPrice_' + pLineCnt + '" class="salesCalAllPrice">0</td>';
	salesTag += '        <input type="hidden" name="saleCalAmt" id="saleCalAmt_' + pLineCnt + '" class="salesCalAllPrice">';
	salesTag += '        <td>-</td>';
	salesTag += '    </tr>';

	return salesTag;
}


//매입 행 html 생성
function setPurchaseDefaultTag (){
	
	purchaseTag = '';
	
	purchaseTag += '<tr draggable="true" class="dragTr" id="purchaseTr_' + pLineCnt + '">';
	purchaseTag += '    <input type="hidden" name="purchaseLineNo" id="purchaseLineNo" value="' + pLineCnt + '">';
	purchaseTag += '    <input type="hidden" name="purcMemGrdCd" id="purcMemGrdCd_' + pLineCnt + '" >';
	purchaseTag += '    <input type="hidden" name="purcMemDutyCd" id="purcMemDutyCd_' + pLineCnt + '" >';
	purchaseTag += '    <td class="setGrdGrp">-</td>';	//등급/직군
	purchaseTag += '    <td>';
	purchaseTag += castMemberDiv;
	purchaseTag += '    </td>';
	purchaseTag += '    <td class="setComp">-</td>';	//소속회사
	purchaseTag += '    <td><input class="editType" name="purcCastYmd" id="purchaseCastDate_' + pLineCnt + '" type="date" onclick="javascript: this.blur();" onchange="purchaseCastDateChange(' + pLineCnt + ')"></td>';
	purchaseTag += '    <td><input class="editType" name="purcEndYmd" id="purchaseEndDate_' + pLineCnt + '"  type="date" onclick="javascript: this.blur();" onchange="purchaseEndDateChange(' + pLineCnt + ')"></td>';
	purchaseTag += '    <td><input class="editType purchaseManMonth" name="purcManMon" type="text" placeholder="0" style="text-align: center;" id="purchaseManMonth_' + pLineCnt + '" onkeyup="calPurchasePrice(' + pLineCnt + ')" maxlength="6" /></td>';
	purchaseTag += '    <td><input class="editType purchaseAmt" name="purcUnitPrice" type="text" placeholder="0" style="text-align: center;" id="purchaseAmt_' + pLineCnt + '" onkeyup="calPurchasePrice(' + pLineCnt + ')" maxlength="5" /></td>';
	purchaseTag += '    <td id="purchaseCalPrice_' + pLineCnt + '" class="purcharseCalAllPrice">0</td>';
	purchaseTag += '    <input type="hidden" name="purcAmt" id="purcCalAmt_' + pLineCnt + '">';
	purchaseTag += '    <td><span id="profitPrice_' + pLineCnt + '">0</span>%</td>';
	purchaseTag += '    <input type="hidden" name="retRate" id="retRate_' + pLineCnt + '">';
	purchaseTag += '    <td>';
	purchaseTag += castListDiv;
	purchaseTag += '    </td>';
	purchaseTag += '    <td>-</td>';
	purchaseTag += '    <td class="none"><input type="editType" name="note" id="bigo_' + pLineCnt + '" maxlength="50"></td>';
	
	if(pLineCnt == 1){
		purchaseTag += '    <td id="pRowspan" rowspan="1">';
		purchaseTag += '        <span class="open">[펼침]</span>';
		purchaseTag += '    </td>';
	}
	
	purchaseTag += '</tr>';
	
	return purchaseTag;
}




//행추가
$('#addRowBtn').click(function() {
	//console.log(pLineCnt);
	pLineCnt = pLineCnt + 1;
	rowSpanCnt = rowSpanCnt + 1;
	salesTag = setSalesDefualtTag();
	purchaseTag = setPurchaseDefaultTag();
	//합칠 행 수 변경
	$('#pRowspan').attr('rowspan', rowSpanCnt);
	$('#salesTable > tbody:last').append(salesTag);
	$('#purchaseTable > tbody:last').append(purchaseTag);
    showTable();
    //chkAll();

	 selectBox();
});

// $(document).on('click', '.selDefault', function(){
// 	console.log('aa');
// 	selectBox();
// });


var delLogList = new Array();
//행삭제
$('#delRowBtn').click(function() {
	//$('#saleList > tbody > tr:last').remove();
	if($('input:checkbox[name="rowCheck"]:checked').length == 0){
		//20221117 yong 레이어 팝업으로 변경 예정
		alert('삭제할 항목이 없습니다.');
		return;
	}
	
	var delList = new Array();
	
	$('input:checkbox[name="rowCheck"]:checked').each(function(k, kVal){
		rowSpanCnt = rowSpanCnt - 1;
		$('#pRowspan').attr('rowspan', rowSpanCnt);
		console.log('k', k);
		console.log('kVal', kVal);
		console.log('this', $(this).parent().parent().find('#salesLineNo').val());
		//console.log($(this).parent().parent().attr('id'));
		
		var delPurcLineNum = $(this).parent().parent().find('#salesLineNo').val();
		
		var delSalesLine = kVal.parentElement.parentElement;
		//yong 처리방법 다르게 해야함 - remove 는 안됨. 보이지 않게 했다가 저장시 삭제 되게 처리!!!
		//$(delSalesLine).remove();
		//$('#purchaseTr_' + delPurcLineNum).remove();
		$(delSalesLine).css('display', 'none');
		$('#purchaseTr_' + delPurcLineNum).css('display', 'none');
		
		delList.push(delPurcLineNum);
		
	});
		
	delLogList.push(delList);
	$('#delLineList').val(delLogList);
});


/*
select 만들기
시스템에서 리스트 받아서 출력
*/
function setSelect (codeList, codeGb, valIdNm){
	
	var codeSelectTag = '';
	
	if(codeGb == 'duty'){
		codeSelectTag += '<div class="select" id="' + valIdNm + 'Select">';
	} else {
		codeSelectTag += '<div class="select xsSize" id="' + valIdNm + 'Select">';
	}
	
	codeSelectTag += '    <input type="hidden" name="' + valIdNm + '" id="' + valIdNm + '" />';
    codeSelectTag += '    <span class="selDefault low">선택</span>';
    codeSelectTag += '    <ul class="optionList">';
	
	codeList.map((codeList, index, source) => {

	    if(codeGb == 'member'){
			codeSelectTag += '        <li class="optionItem" onclick="javascript: setMember(this, \'' + codeList.CODE + '\')" data-value="' + codeList.CODE + '">' + codeList.NAME + '</li>';
		} else {
			codeSelectTag += '        <li class="optionItem" onclick="javascript: setCodeVal(this, \'' + valIdNm + '\');" data-value="' + codeList.CODE + '">' + codeList.NAME + '</li>';
		}
	    
	});
	
	codeSelectTag += '    </ul>';
    codeSelectTag += '</div>';
    codeSelectTag += '';
    
    return codeSelectTag;
}


//회원 이름 선탟시 등급/직군, 소속 세팅
function setMember(target, memId){
	var projNo = $('#projNo').val();
	
	var memInfo = JSON.stringify({
		memId : memId,
		projNo: projNo
	});
	
	$.ajax({
		type : 'POST',
		url : '/sales/getMemberInfo',
		data : memInfo,
		dataType: 'json',
		contentType: 'application/json',
		async: false,
		success : function(data) {
			$(target).parent().parent().parent().parent().find('.setGrdGrp').html(data.grdGrp);
			$(target).parent().parent().parent().parent().find('.setComp').html(data.coNm);
			$(target).parent().parent().parent().parent().find('input[name="purcMemGrdCd"]').val(data.grdCd);
			$(target).parent().parent().parent().parent().find('input[name="purcMemDutyCd"]').val(data.dutyCd);
			$(target).parent().parent().find('#memId').val($(target).attr("data-value"));
		},
		error : function(xhr, status, error) {
			alert('서버오류로 지연되고있습니다. 잠시 후 다시 시도해주시기 바랍니다.');
			
			return false;
		}
	});
}


function setCodeVal(target, findId){
	//console.log($(target).attr("data-value"));
	$(target).parent().parent().find('#'+findId).val($(target).attr("data-value"));
	//console.log($(target).parent().parent().find('#'+findId).val());
}


//숫자만 입력되게 하는 function
function checkNumber(event) {
	//console.log(event.key);
	if (event.key === '.'
		|| event.key === ','
		|| event.key === '-'
		|| event.key >= 0 && event.key <= 9) {
		return;
	}
}


//MM 계산
//투입일 변경시
function castDateChange(rowNum){
	var castDate = $('#salesCastDate_' + rowNum).val();
	var endDate = $('#salesEndDate_' + rowNum).val();
	$('#salesEndDate_' + rowNum).attr('min', castDate);
	
	getManMonth(rowNum, 'S');
}


//종료일 변경시
function endDateChange(rowNum){
	var castDate = $('#salesCastDate_' + rowNum).val();
	var endDate = $('#salesEndDate_' + rowNum).val();
	$('#salesCastDate_' + rowNum).attr('max', endDate);
	
	getManMonth(rowNum, 'S');
}


//MM 계산
//투입일 변경시
function purchaseCastDateChange(rowNum){
	var castDate = $('#purchaseCastDate_' + rowNum).val();
	var endDate = $('#purchaseEndDate_' + rowNum).val();
	$('#purchaseEndDate_' + rowNum).attr('min', castDate);
	
	getManMonth(rowNum, 'P');
}


//종료일 변경시
function purchaseEndDateChange(rowNum){
	var castDate = $('#purchaseCastDate_' + rowNum).val();
	var endDate = $('#purchaseEndDate_' + rowNum).val();
	$('#purchaseCastDate_' + rowNum).attr('max', endDate);
	
	getManMonth(rowNum, 'P');
}

//MM 구하는 ajax
function getManMonth(rowNum, saleGb){
	var castDate = $('#salesCastDate_' + rowNum).val();
	var endDate = $('#salesEndDate_' + rowNum).val();
	
	if(saleGb == 'S'){
		castDate = $('#salesCastDate_' + rowNum).val();
		endDate = $('#salesEndDate_' + rowNum).val();
	} else {
		castDate = $('#purchaseCastDate_' + rowNum).val();
		endDate = $('#purchaseEndDate_' + rowNum).val();
	}
	
	if(castDate != '' && endDate != ''){
		var mmInfo = JSON.stringify({
			castDate : castDate,
			endDate : endDate
		});
		
		$.ajax({
			type : 'POST',
			url : '/sales/manMonthCal',
			data : mmInfo,
			dataType: 'json',
			contentType: 'application/json',
			async: false,
			success : function(data) {
				if(saleGb == 'S'){
					$('#manMonth_' + rowNum).val(data.mm);
					$('#salesAllManMonth').html(doSum('manMonth'));
					$('#salesAllPrice').html(doSum('salesAmt'));
					$('#calSalesAllPrice').html(doSumSalesHtml('salesCalAllPrice'));
				}else{
					$('#purchaseManMonth_' + rowNum).val(data.mm);
					$('#purchaseAllManMonth').html(doSum('purchaseManMonth'));
					$('#purchaseAllPrice').html(doSum('purchaseAmt'));
					$('#calPurchaseAllPrice').html(doSumSalesHtml('purchaseCalAllPrice'));
				}
			},
			error : function(xhr, status, error) {
				alert('서버오류로 지연되고있습니다. 잠시 후 다시 시도해주시기 바랍니다.');
				
				return false;
			}
		});
	}
}

function doSum(classNm) {
	let sum = 0;
	$('.' + classNm).each(function() {
		// type으로 시작하는 input을 순차적으로 loop
		if (!isNaN($(this).val())) {
			// CASE 값에 문자가 없는 경우 (숫자인 경우만 합산)
			//var uncommaVal = uncomma($(this).val());
			var uncommaVal = $(this).val();
			sum += ( uncommaVal * 100 ) / 100;
		}
	});
	
	//return inputNumberFormat(sum);
	return sum;
}

function doSumSalesHtml(classNm){
	let sum = 0;
	$('.' + classNm).each(function() {
		// type으로 시작하는 input을 순차적으로 loop
		if (!isNaN($(this).html())) {
			// CASE 값에 문자가 없는 경우 (숫자인 경우만 합산)
			//var uncommaVal = uncomma($(this).html());
			var uncommaVal = $(this).html();
			//console.log('uncommaVal', uncommaVal);
			sum += ( uncommaVal * 100 ) / 100;
		}
	});
	
	//return inputNumberFormat(sum);
	return sum;
}

function calPrice(rowNum){
	//manMonth_
	//var manMonth = uncomma($('#manMonth_' + rowNum).val());
	//var saleAmt = uncomma($('#saleAmt_' + rowNum).val());
	var manMonth = $('#manMonth_' + rowNum).val();
	var saleAmt = $('#saleAmt_' + rowNum).val();
	
	if(manMonth != '' && saleAmt != ''){
		var calMmAmt = ((manMonth * 100) * saleAmt) / 100;
		//$('#salesCalPrice_' + rowNum).html(inputNumberFormat(calMmAmt));
		$('#salesCalPrice_' + rowNum).html(calMmAmt);
		$('#saleCalAmt_' + rowNum).val(calMmAmt);
	}
	
	$('#salesAllManMonth').html(doSum('manMonth'));
	$('#salesAllPrice').html(doSum('salesAmt'));
	//$('#calSalesAllPrice').html(doSum('salesAmt'));
	$('#calSalesAllPrice').html(doSumSalesHtml('salesCalAllPrice'));
	//$('#saleAmt_' + rowNum).val(inputNumberFormat(saleAmt));
	$('#saleAmt_' + rowNum).val(saleAmt);
	
	calProfit(rowNum);
}

function calPurchasePrice(rowNum){
	//manMonth_
	//var manMonth = uncomma($('#manMonth_' + rowNum).val());
	//var saleAmt = uncomma($('#saleAmt_' + rowNum).val());
	var manMonth = $('#purchaseManMonth_' + rowNum).val();
	var purchaseAmt = $('#purchaseAmt_' + rowNum).val();
	
	if(manMonth != '' && purchaseAmt != ''){
		var calMmAmt = ((manMonth * 100) * purchaseAmt) / 100;
		//$('#salesCalPrice_' + rowNum).html(inputNumberFormat(calMmAmt));
		$('#purchaseCalPrice_' + rowNum).html(calMmAmt);
		$('#purcCalAmt_' + rowNum).val(calMmAmt);
	}
	
	$('#purchaseAllManMonth').html(doSum('purchaseManMonth'));
	$('#purchaseAllPrice').html(doSum('purchaseAmt'));
	//$('#calSalesAllPrice').html(doSum('salesAmt'));
	$('#calPurchaseAllPrice').html(doSumSalesHtml('purcharseCalAllPrice'));
	//$('#saleAmt_' + rowNum).val(inputNumberFormat(purchaseAmt));
	$('#purchaseAmt_' + rowNum).val(purchaseAmt);
	
	calProfit(rowNum);
}

//수익률 계산 - (총매출 - 총매입) / 총매출 
function calProfit(rowNum){
	//총매출
	var salesPrice = 0;
	var salesAllPrice = 0;
	//총매입
	var purchasePrice = 0;
	var purchaseAllPrice = 0;
	
	var profitPrice = 0;
	var profitAllPrice = 0;
	
	salesPrice = $('#salesCalPrice_' + rowNum).html();
	purchasePrice = $('#purchaseCalPrice_' + rowNum).html();
	
	if(salesPrice > 0 && purchasePrice > 0){
		profitPrice = (salesPrice - purchasePrice) / salesPrice;
		profitPrice = ((profitPrice.toFixed(2)) * 100) / 100;
		
		
		salesAllPrice = $('#calSalesAllPrice').html();
		purchaseAllPrice = $('#calPurchaseAllPrice').html();
		
		profitAllPrice = (salesAllPrice - purchaseAllPrice) / salesAllPrice;
		profitAllPrice = ((profitAllPrice.toFixed(2)) * 100) / 100;
	}
	
	$('#profitPrice_' + rowNum).html(profitPrice);
	$('#retRate_' + rowNum).val(profitPrice);
	$('#profitAllPrice').html(profitAllPrice);
}

function addComma(value){
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value; 
}




function comma(str) {
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
	str = String(str);
	return str.replace(/[\{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, '');
}

function inputNumberFormat(val) {
	return comma(uncomma(val));
}

function inputOnlyNumberFormat(val) {
	return onlynumber(uncomma(val));
}

function onlynumber(str) {
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1');
}




//매출 매입 정보 insert update delete
function setSalesPurcInfo(){
	/*
	var projNo = $('#projNo').val();
	
	var memInfo = JSON.stringify({
		memId : memId,
		projNo: projNo
	});
	*/
	
	$('input[type=checkbox]').prop('checked',false);
	
	var formData = $("#salesForm").serializeArray();
	
	var salesData = JSON.stringify({
		formData : formData
	});
	
	console.log(salesData);
	
	$.ajax({
		type : 'POST',
		url : '/sales/setSalesPurcInfo',
		data : salesData,
		dataType: 'json',
		contentType: 'application/json',
		//async: false,
		/*
		beforeSend : function(xhr)
		{
			xhr.setRequestHeader("${_csrf.headerName}", "${_csrf.token}");
		},
		*/
		success : function(data) {
			//form 넘겨서 시스템 단에서 validation
			
		},
		error : function(xhr, status, error) {
			alert('서버오류로 지연되고있습니다. 잠시 후 다시 시도해주시기 바랍니다. - 저장');
			
			return false;
		}
	});
}

$(document).ready(function(){
    //전체선택 체크박스 클릭
	$('.chkAll').click(function(){
		//만약 전체 선택 체크박스가 체크된상태일경우
		if($('.chkAll').prop('checked')) {
			//해당화면에 전체 checkbox들을 체크해준다
			$('input[type=checkbox]').prop('checked',true);
		// 전체선택 체크박스가 해제된 경우
		} else {
			//해당화면에 모든 checkbox들의 체크를해제시킨다.
			$('input[type=checkbox]').prop('checked',false);
		}
	});
	
	
	/*
	$('.open').click(function() {
		$('.none').css('display', 'block');
		$('.open').html('[닫기]');
	});
	*/
})

















