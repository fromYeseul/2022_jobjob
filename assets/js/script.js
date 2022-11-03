/*-----------공통-----------*/
// GNB
function gnbNav(){
    let layoutWrapper = document.querySelector('.layoutWrapper');
    let navCtrlBtn = document.querySelector('.navCtrlBtn');
    let navWrapper = document.querySelector('.navWrapper');

    if(navWrapper !== null){
        navCtrlBtn.addEventListener('click', function(){
            layoutWrapper.classList.toggle('is-active');
        });
    
        navWrapper.addEventListener('mouseenter', function(){
            layoutWrapper.classList.add('is-hover');
        });
        navWrapper.addEventListener('mouseleave', function(){
            layoutWrapper.classList.remove('is-hover');
        });

        navList();
    }else{
        return;
    }
}
gnbNav();

//nav 2depth
function navList(){
    let navLi = document.querySelectorAll('.navWrapper > ul > li');
    let navInner = document.querySelectorAll('ul');

    for(let i=0; i<navLi.length; i++){
        navLi[i].addEventListener('click', function(){
            let this_navInner = this.querySelector('ul');

            for(let j=0; j<navLi.length; j++){
                navLi[j].classList.remove('is-active');
                navInner[j].classList.remove('is-active');
            }

            this.classList.toggle('is-active');
            this_navInner.classList.toggle('is-active');
        })
    }
}




// 우측패널
function rightPanel(){
    let rPanelList = document.querySelectorAll('.rPanel > ul > li');
    let rPanelLayer = document.querySelector('.rPanelLayer');
    let rClose = document.querySelector('.rClose');
    let contLayout = document.querySelector('.contLayout');
    let filterWrapper = document.querySelector('.filterWrapper');

    if(rPanelList !== null){
        for(let i=0; i<rPanelList.length; i++){
            rPanelList[i].addEventListener('click', function(){  
                rPanelLayer.classList.toggle('is-active');
                contLayout.classList.toggle('is-active');
                filterWrapper.classList.remove('is-active');                                       
    
                let windowWidth = window.innerWidth;
                if(windowWidth <= 1200){
                    rPanelLayer.classList.toggle('layerType');
                // }else{
                //     contLayout.classList.remove('is-active');
                }
            });
            rClose.addEventListener('click', function(){
                rPanelLayer.classList.toggle('is-active');
                contLayout.classList.remove('is-active');
                filterWrapper.classList.remove('is-active');
            });
        }  
        // 왜 여기에 있으면 적용이 안되지??
        // rClose.addEventListener('click', function(){
        //     rPanelLayer.classList.toggle('is-active');
        //     filterWrapper.classList.remove('is-active');
        // });  
    }else{
        return;
    }
}
rightPanel();

// 우측 패널 필터창
function filterLayer(){
    let filter = document.querySelector('.rPanelLayer .filter');
    let filterWrapper = document.querySelector('.rPanelLayer .filterWrapper');

    if(filterWrapper !== null){       
        filter.addEventListener('click', function(e){
            e.preventDefault();
            filterWrapper.classList.toggle('is-active');
        }); 
    }else{
        return;
    }
}
filterLayer();

// 레이어팝업(여러개ok) - overflow, 외부영역선택시 close 추가해보기, 닫기버튼 확인
function layerPop(){
    let openBtn = document.querySelectorAll(".layerOpen");
    let closeBtn = document.querySelectorAll(".layerClose");
    let layerID;
    if(openBtn !== null){
        for(let i=0; i<openBtn.length; i++){
            openBtn[i].addEventListener("click", function(){
                layerID = this.getAttribute('href');
                document.querySelector(layerID).classList.add('is-active');
            });
        }
        for(let j=0; j<closeBtn.length; j++){
            closeBtn[j].addEventListener('click', function(){
                this.parentNode.parentNode.parentNode.classList.remove('is-active');
            });
        }
    }else{
        return;
    }
}
layerPop();

// 탭메뉴(여러개 확인하기!!)
function tabMenu(){
    let tabBtn = document.querySelectorAll('.tabBtnWrap a');
    let tabCont = document.querySelectorAll('.tabContWrap > div'); 

    if(tabBtn !== null){        
        for(let i=0; i < tabBtn.length; i++){
            tabBtn[i].addEventListener('click',function(e){
                e.preventDefault();

                // let tab = this.closest('.tabWrapper');
                let tab_id = this.closest('.tabWrapper').id;
                let tabHref = e.target.getAttribute('href');
                let tabTarget = tabHref.replace('#','');
                
                for(let i=0; i < tabBtn.length; i++){
                    if (tabBtn[i].closest('.tabWrapper').id === tab_id){
                        tabBtn[i].classList.remove('is-active');
                        e.target.classList.add('is-active');
                    }
                }

                for(let j=0; j < tabCont.length; j++){
                    if (tabCont[j].closest('.tabWrapper').id === tab_id){                             
                        tabCont[j].classList.remove('is-active');
                        document.getElementById(tabTarget).classList.add('is-active');                        
                    }
                }
            });
        }       
    }else{
        return;
    }
}
tabMenu();


//리스트 선택
// function boxChk(){
//     let listType = document.querySelectorAll('.boxList.listType');
//     let headType = document.querySelectorAll('.boxList.headType');

//     if(listType !== null){
//         for(let i = 0; i<listType.length; i++){
//             listType[i].addEventListener('click', function(e){
//                 for(let j = 0; j<listType.length; j++){
//                     listType[j].classList.remove('is-active');
//                 }
//                 listType[i].classList.add('is-active');
//             });
//         }
//     }
//     if(headType !== null){
//         for(let i = 0; i<headType.length; i++){
//             headType[i].addEventListener('click', function(e){
//                 for(let j = 0; j<headType.length; j++){
//                     headType[j].classList.remove('is-active');
//                 }
//                 headType[i].classList.add('is-active');
//             });
//         }
//     }
// }
// boxChk();

//리스트 선택 - 221019 허책임님
function boxChk(id){
	let boxListWrap = null;
	let boxList = null;
	let isActive = null;
	
	if (id != undefined) {
		boxListWrap = document.querySelector('#' + id + ' .boxListWrap');
		boxList = document.querySelectorAll('#' + id + ' .boxList.headType');
		isActive = document.querySelectorAll('#' + id + ' .boxList.is-active');	
	} else {
	    boxListWrap = document.querySelector('.boxListWrap');
    	boxList = document.querySelectorAll('.boxList.listType');
    	isActive = document.querySelectorAll('.boxList.is-active');
	}

    if(boxList !== null){
        for(let i = 0; i<boxList.length; i++){
            boxList[i].addEventListener('click', function(e){
                for(let j = 0; j<boxList.length; j++){
                    boxList[j].classList.remove('is-active');
                }
                boxList[i].classList.add('is-active');
            });
        }
    }
}



/*-----------//공통-----------*/



/*-----------호출-----------*/

//마이프로젝트-마이피플


// SELECTBOX 일반태그 커스텀 (다른 영역 선택시 off, 체크박스 선택시 off x)
// 호출 : selDefault.onclick = selectBox();
// let selDefault = document.querySelectorAll('.selDefault');   
function selectBox(){ 
    //221011 위치수정 -ys
    let selDefault = document.querySelectorAll('.selDefault');   
    
    selDefault.forEach(function(lb){
        //220907 변수 위치 수정
        let optionList = lb.nextElementSibling;
        let optionItems = optionList.querySelectorAll('.optionItem');
        lb.addEventListener('click', e => {        
            optionList = lb.nextElementSibling;
            optionItems = optionList.querySelectorAll('.optionItem');
            clickLabel(lb, optionItems);      
            
            /* 220906 수정(외부클릭시 닫힘) -ys */
            document.addEventListener('click', function(event){
                if(!(event.target.parentElement.parentElement == optionList || event.target == lb)){
                    lb.parentNode.classList.remove('is-active');
                }
                if(event.target == document.getElementById('saveBtn') || event.target == document.getElementById('alertCls')){
                    lb.parentNode.classList.add('is-active');
                }
            });
            /* //220906 수정(외부클릭시 닫힘) -ys */
            
        });
        
        /* 220907 수정(옵션없을때) -ys */
        if(optionItems.length == 0){
            lb.parentNode.classList.add("disable");
        }
        /* //220907 수정(옵션없을때) -ys */
    });


    const clickLabel = (lb, optionItems) => {
        if(lb.parentNode.classList.contains('is-active')) {
            lb.parentNode.classList.remove('is-active');
            optionItems.forEach((opt) => {
                opt.removeEventListener('click', () => {
                    handleSelect(lb, opt)
                })
            })
        } else {
            lb.parentNode.classList.add('is-active');
            optionItems.forEach((opt) => {
                opt.addEventListener('click', () => {
                    handleSelect(lb, opt)
                })
            })
        }
    }

    

    /* 220902 수정(다중선택) -ys */
    const handleSelect = (selDefault, item) => {
        let hasChk = item.getElementsByTagName('input');
        if(hasChk.length >= 1){
            selDefault.innerHTML = item.textContent;
        }else{
            selDefault.innerHTML = item.textContent;
            selDefault.parentNode.classList.remove('is-active');
        }            
    }
    /* //220902 수정(다중선택) -ys */
}
//selectBox();


document.addEventListener('click', e => {        
    let lb = e.target;
    let optionList = lb.nextElementSibling;
    let optionItems = optionList.querySelectorAll('.optionItem');

    if(selDefault.parentNode.classList.contains('is-active')) {                
        lb.parentNode.classList.remove('is-active');                   

    }  else {
        e.target.parentNode.classList.add('is-active');
    
    }
   
    
});





// 체크박스 전체선택     //??????????????? 여러개 구별하도록 수정하기
// 호출 : chkWrap.onclick = chkAll();
function chkAll(){
    let chkAll = document.querySelectorAll('.chkAll');
    let chkEach = document.querySelectorAll('.chkEach');

    for(let i=0; i<chkAll.length; i++){  
        //전체 선택, 해제
        chkAll[i].addEventListener('click', function(){
            let thisParent = this.parentElement.parentElement.parentElement;
            let childChkbox = thisParent.querySelectorAll('.chkEach');

            if(chkAll[i].checked){
                for(let j=0; j<childChkbox.length; j++){
                    childChkbox[j].checked = true;
                }
            }else{                
                for(let j=0; j<childChkbox.length; j++){
                    childChkbox[j].checked = false;
                }
            }            
        });
    }
    for(let k=0; k<chkEach.length; k++){
        //개별선택시 전체 선택, 해제
        chkEach[k].addEventListener('click', function(){        
            
            let thisParent = this.parentElement.parentElement.parentElement.parentElement;
            let allChkbox = thisParent.querySelector('.chkAll');
            let childChkbox = thisParent.querySelectorAll('.chkEach');
            let chked = thisParent.querySelectorAll('.chkEach:checked');

            if(chked.length == childChkbox.length){
                allChkbox.checked = true;
            }else{
                allChkbox.checked = false;
            }
        });
    }
}
// function chkAll(){
//     let chkAll = document.querySelector('.chkAll');
//     let chkEach = document.querySelectorAll('.chkEach');

//     for(let i=0; i<chkEach.length; i++){  
//         //전체 선택, 해제
//         chkAll.addEventListener('click', function(){
//             if(chkAll.checked == true){
//                 chkEach[i].checked = true;
//             }else{
//                 /*chkEach[i].checked = false;*/ //generalMember.jsp
//             }            
//         });

//         //개별선택시 전체 선택, 해제
//         chkEach[i].addEventListener('click', function(){        
//             let chked = document.querySelectorAll('.chkEach:checked');
//             if(chked.length == chkEach.length){
//                 chkAll.checked = true;
//             }else{
//                 chkAll.checked = false;
//             }
//         });
//     }
// }
//chkAll();


//더보기 (마이피플)
//호출 : showMore();    
function showMore(){
    let openMore = document.querySelectorAll(".showMore");
    let moreList = document.querySelectorAll(".moreList");
    for(let i=0; i<openMore.length; i++){
        openMore[i].addEventListener("click", function(){
            // e.preventDefault(e);
            moreList[i].classList.toggle("is-active");
        });
    }
}
//showMore();


//체크리스트 생성하기
//호출 : makeChkList();
function makeChkList(){
    let chkList = document.querySelector("#chkList");
    let addchkList = document.querySelector("#addchkList");

    addchkList.addEventListener('click', function(){
    	let liCnt = document.querySelector("#chkList").children.length;
		let id = 1;
		
		lastLi = document.querySelector("#chkList").lastElementChild;
		
		if(lastLi != null) id = Number(lastLi.firstElementChild.getAttribute('id')) + 1;

        let createLi = document.createElement("li");
        // createLi.setAttribute("class", "new");

        //체크박스 속성
        let createChk = document.createElement("input");
            createChk.setAttribute("type", "checkbox");
            createChk.setAttribute("class", "chkCustom hasTxt");
            createChk.setAttribute("id", id);  //설정
            createChk.setAttribute("disabled", "true");

        let createLabel = document.createElement("label");
            createLabel.setAttribute("for", id);   //설정    

        //인풋박스 속성
        let createInput = document.createElement("input");
            createInput.setAttribute("type", "text");
            createInput.setAttribute("class", "laSize lowSize new");
            createInput.setAttribute("maxlength", "50");
            createInput.setAttribute("placeholder", "내용 입력 후 엔터");
            createInput.setAttribute("id", id);  //설정
            
        //닫기버튼
        let makeDel = document.createElement("i");
            makeDel.setAttribute("class", "ico delete");


        //리스트 생성
        chkList.append(createLi);
        createLi.append(createChk);
        createLi.append(createLabel);
        createLi.append(createInput);
        createInput.focus();
        
        //인풋입력값 등록
        createInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            let inputValue = createInput.value;
            createLabel.innerText = inputValue;

            createLi.removeChild(createInput);
            createLi.append(makeDel);
            
            createChk.removeAttribute("disabled");
            }
        });

        //삭제이벤트
        makeDel.addEventListener('click', function(){
            chkList.removeChild(createLi);
        })
    });
}
// makeChkList();


//선택된 직무유형 영역 스크롤바
//호출 : customScroll();
// function customScroll(){
//     window.onload = function(){
//         var myScroll = new IScroll('.iscroll',{
//             mouseWheel: true,
//             scrollbars: true,
//             scrollX: false,
//             scrollY: true,
//             interactiveScrollbars: true
//         });
//         document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//     }
// }
//customScroll();


//스크롤 생성
//호출 : myProjDetail.onclick = makeScroll();
let myProjDetail = document.querySelector('.myProjDetail');
let ProjDTabWrapper = document.querySelector('.myProjDetail .tabWrapper');
let yScroll = document.querySelectorAll('.myProjDetail .tabContWrap .yScroll');
// let yActive = document.querySelector('.myProjDetail .tabCont.is-active .yScroll');

function makeScroll(){      
    
    /* 220928 수정 -ys */
    ProjDTabWrapper.addEventListener('wheel', moveScroll);
    //myProjDetail.addEventListener('wheel', moveScroll);

    function moveScroll(event){

        for(let i=0; i<yScroll.length; i++){
            let yTop = yScroll[i].scrollTop;
            let eDeltaY = event.deltaY;

            if(eDeltaY > 0 && yTop === 0 ){
                yScroll[i].classList.add('is-active');
            }else if(eDeltaY < 0 && yTop === 0){
                yScroll[i].classList.remove('is-active');
            }            
        }
    }
}
//makeScroll();

//직무추천테이블 active
//호출 : trToggle();
// function trToggle(){
//     let trToggle = document.query
// }


//직무추천 필터
//호출 : filterBtn.onclick = openFilter();        
let filterBtn = document.querySelectorAll('.tabWrapper button.filter');
let myProjJobFilter = document.querySelector('.myProjDetail .filterWrapper');

function openFilter(){
    for(let i=0; i<filterBtn.length; i++){
        filterBtn[i].addEventListener('click', function(){
            // this.querySelector('.filter').classList.toggle('is-active');
            myProjJobFilter.classList.toggle('is-active');
        })
    }
}
// openFilter();


//alert 토스트팝업
//호출 : alertClose.onclick = toastClose();
function toastClose(){
    let alertClose = document.querySelectorAll('.smClose');
    for(let i=0; i<alertClose.length; i++){
        alertClose[i].addEventListener('click', function(){
            alertClose[i].parentNode.classList.remove('is-active');
        });
    }
}
//toastClose();


//퀵뷰 메모 더보기
//호출 : showMemoList();
function showMemoList(){
    let showMemo = document.querySelector('.showMemo');
    let memoList = document.querySelector('.memoList');
    showMemo.addEventListener('click', function (){
        this.classList.toggle('is-active');
        memoList.classList.toggle('is-active');
    })
}
// showMemoList();


//투입상세정보팝업 드래그앤드롭
//호출 : dragDrop();
function dragDrop(){
    const dragTr = document.querySelectorAll(".dragTr");
    
    dragTr.forEach(dragTr => {
        dragTr.addEventListener("dragover", () => {
            dragTr.classList.add("is-active");
        });

        // dragTr.addEventListener("dragenter", () => {
        //     dragTr.classList.add("is-active");
        // });

        dragTr.addEventListener("dragleave", () => {
            dragTr.classList.remove("is-active");
        });
    });
}
// dragDrop();


//투입상세정보팝업 펼침
// 호출 : showTable();
function showTable(){
    let flex_1_2 = document.querySelector('.flex_1_2');
    let open = document.querySelector('.open');
    let none = document.querySelectorAll('td.none');
    let theadActive = document.querySelector('.suffix .tableHead th')

    // document.getElementById("myTd").colSpan = "1";

    none.forEach(none =>{
        open.addEventListener('click', () => {
            flex_1_2.classList.toggle('is-active');
            none.classList.toggle('none');
            if(theadActive.colspan = "12"){
                theadActive.colSpan = "13";
            }else{
                theadActive.colSpan = "12";
            }
        });
    })
}
//showTable();


//허책임님 alert 팝업
//let removeToast;
// function toast(id) {    
//     var toastId = "toast_" + id;
//     var message = "";
    
//     if($("#genChk_" + id).prop("checked")) message= "관심회원으로 등록되었습니다." 
//     else message= "관심회원에서 해제되었습니다."
    
//     const toast = document.getElementById(toastId);
    
//     toast.classList.contains("is-active") ?
//         (clearTimeout(removeToast), removeToast = setTimeout(function () {
//             document.getElementById(toastId).classList.remove("is-active")
//         }, 3000)) :
//         removeToast = setTimeout(function () {
//             document.getElementById(toastId).classList.remove("is-active")
//         }, 3000)
//     toast.classList.add("is-active"),
//         toast.innerHTML = "<i class='ico smClose w'></i>" + message;
// }

/*-----------//호출-----------*/


/*-----------별도 호출 없음---------*/
//Top 버튼
$(function(){
    var $goTop = $('.goTop');
    $goTop.on('click', function(e){
        e.preventDefault();                
        $('.tabCont .yScroll').animate({scrollTop : "0",}, 500);
        $('.rPanelCont .yScroll').animate({scrollTop : "0",}, 500);
    })
});


// 파일 다중선택
// 호출 : 
function uploadFile(){
    if(window.FileReader) { 
        addEventHandler(window, 'load', function() {
        var drop   = document.getElementsByClassName('drop')[0];
        var list   = document.getElementsByClassName('list')[0];
        var list_ul = document.getElementsByClassName('list_ul')[0];

        function cancel(e) {
            if (e.preventDefault) { 
                e.preventDefault(); 
            }
            return false;
        }

        // Tells the browser that we *can* drop on this target
        addEventHandler(drop, 'dragover', cancel);
        addEventHandler(drop, 'dragenter', cancel);
        addEventHandler(drop, 'drop', function (e) {
        e = e || window.event; // get window.event if e argument missing (in IE)   

        if (e.preventDefault) { 
            e.preventDefault(); 
        } // stops the browser from redirecting off to the image.

        fileCheck(e);
        // var dt = e.dataTransfer;
        // var files = dt.files;
        // for (var i=0; i<files.length; i++) {
        //     var file = files[i];
        //     var reader = new FileReader();

        //     //attach event handlers here...
        //     reader.readAsDataURL(file);
        //     addEventHandler(reader, 'loadend', function(e, file) {
        //         var bin = this.result; 
        //         //	div.list...
        //         var newFile       = document.createElement('li');
        //         newFile.innerHTML = '<i class="ico delete"></i>' + '<span class="fileName">' + file.name + '</span>' + '<span class="float_r">' + file.size +' bytes' + '</span>';
        //         list_ul.appendChild(newFile);  
        //         }.bindToEventHandler(file));
        //     }
        //     return false;
        });
        Function.prototype.bindToEventHandler = function bindToEventHandler() {
            var handler = this;
            var boundParameters = Array.prototype.slice.call(arguments);
            //create closure
            return function(e) {
            e = e || window.event; // get window.event if e argument missing (in IE)   
            boundParameters.unshift(e);
            handler.apply(this, boundParameters);
            };
        };
    });
    } else { 
    //document.getElementsByClassName('status')[0].innerHTML = 'Your browser does not support the HTML5 FileReader.';
    }
    function addEventHandler(obj, evt, handler) {
    if(obj.addEventListener) {
        // W3C method
        obj.addEventListener(evt, handler, false);
        } else if(obj.attachEvent) {
        // IE method.
        obj.attachEvent('on'+evt, handler);
        } else {
        // Old school method.
        obj['on'+evt] = handler;
        }
    } // addEventHandler();
}
//uploadFile();


/*-----------별도 호출 없음---------*/

























/* 패스워드 보이기 */
// function showPw(){
//     let showPw = document.querySelector('.showPw');
        
//     showPw.addEventListener('click', function(){
//         let inputPw = this.previousElementSibling;
//         let inputPwType = inputPw.getAttribute("type");
        
//         if(inputPwType === "password"){
//             showPw.classList.add('is-active');
//             inputPw.setAttribute("type", "text");
//         }else{
//             showPw.classList.remove('is-active');
//             inputPw.setAttribute("type", "password");
//         }
//     });
// }
// showPw();



/* 전체선택, 해제 
$(".chkWrap").on("click", "#chkAll", function () {
    $(this).parents(".chkWrap").find('input').prop("checked", $(this).is(":checked"));
});

// 체크박스 개별 선택
$(".chkWrap").on("click", ".chkEach", function() {
    var is_checked = true;

    $(".chkWrap .chkEach").each(function(){
        is_checked = is_checked && $(this).is(":checked");
    });

    $("#chkAll").prop("checked", is_checked);
});*/