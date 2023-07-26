/*-----------공통-----------*/
// GNB
function gnbNav(){
    let layoutWrapper = document.querySelector('.layoutWrapper');
    let navCtrlBtn = document.querySelector('.navCtrlBtn');
    let navWrapper = document.querySelector('.navWrapper');
    let gnb = document.querySelector('.gnb');

    if(navWrapper !== null){
        navCtrlBtn.addEventListener('click', function(){
            layoutWrapper.classList.toggle('is-active');
        });
    
        // navWrapper.addEventListener('mouseenter', function(){
        //     layoutWrapper.classList.add('is-hover');            
        // });
        // navWrapper.addEventListener('mouseleave', function(){
        //     layoutWrapper.classList.remove('is-hover');
        // });
        gnb.addEventListener('mouseenter', function(){
            layoutWrapper.classList.add('is-hover');            
        });
        gnb.addEventListener('mouseleave', function(){
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
    let navInner = document.querySelectorAll('.navWrapper > ul > li > ul');

    for(let i=0; i<navLi.length; i++){
        navLi[i].addEventListener('click', function(){
            
            for(let j=0; j<navInner.length; j++){
                navInner[j].classList.remove('is-active');
            }
            for(let i=0; i<navLi.length; i++){
                navLi[i].classList.remove('is-active');
            }
            
            console.log(this);
            let this_navInner = this.querySelector('ul');
            this.classList.toggle('is-active');
            console.log(this);

            if(this_navInner != undefined){
                this_navInner.classList.toggle('is-active');
            }            
        })
    }
}


//header - mypeople, myproject
function headerPage(){
    let hPage = document.querySelectorAll('header .center a');

    if(hPage !== null){
        for(let i=0; i<hPage.length; i++){
            hPage[i].addEventListener('click', function(){
                for(let j=0; j<hPage.length; j++){
                    hPage[j].classList.remove('is-active');
                }
                this.classList.add('is-active');
                console.log(this);
            })
        }
    }
}
//headerPage();


// 우측패널
function rightPanel(){
    let rPanelList = document.querySelectorAll('.rPanel > ul > li');
    let rPanelLayer = document.querySelector('.rPanelLayer');
    let rClose = document.querySelector('.rClose');
    let contLayout = document.querySelector('.contLayout');
    let filterWrapper = document.querySelector('.rPanelLayer .filterWrapper');

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
    let filterIco = document.querySelector('.rPanelLayer .filter .filter');
    let filterWrapper = document.querySelector('.rPanelLayer .filterWrapper');


    if(filterWrapper !== null){       
        filter.addEventListener('click', function(e){
            e.preventDefault();
            filterWrapper.classList.toggle('is-active');
            filterIco.classList.toggle('is-active');
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
                // layerID = this.getAttribute('href');
                layerID = this.getAttribute("aria-controls");
                console.log(layerID);
                // document.querySelector(layerID).classList.add('is-active');
                document.getElementById(layerID).classList.add('is-active');
            });
        }
        for(let j=0; j<closeBtn.length; j++){
            closeBtn[j].addEventListener('click', function(){
                // this.parentNode.parentNode.parentNode.classList.remove('is-active');
                this.closest('.modalLayer').classList.remove('is-active');
            });
        }

        //외부영역 클릭시 닫힘
        let Dim = document.querySelectorAll('.layerDim');

        for(let k=0; k<Dim.length; k++){
            Dim[k].addEventListener('click', function(){
                this.closest('.modalLayer').classList.remove('is-active');
            })
        }
        // $(document).click(function(e){
        //     if(e.target.className == 'layerDim'){                
        //         console.log('aa');
        //         e.target.closest('.modalLayer').classList.remove('is-active');
        //     }
        // })
    }else{
        return;
    }
}
layerPop();

$(document).on("click", layerPop());


// 탭메뉴
let tabBtn = document.querySelectorAll('.tabBtnWrap a');
let tabCont = document.querySelectorAll('.tabContWrap > div'); 

function tabMenu(){
    if(tabBtn !== null){        
        for(let i=0; i < tabBtn.length; i++){
            tabBtn[i].addEventListener('click',function(e){
                e.preventDefault();

                // let tab = this.closest('.tabWrapper');
                let tab_id = this.closest('.tabWrapper').id;
                let tabHref = e.target.getAttribute('href');
                if(tabHref != null ){
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
                }
            });
        }       
    }else{
        return;
    }
}
tabMenu();


//리스트 선택
function boxChk(){
    let listType = document.querySelectorAll('.boxList.listType');
    let headType = document.querySelectorAll('.boxList.headType');

    if(listType !== null){
        for(let i = 0; i<listType.length; i++){
            listType[i].addEventListener('click', function(e){
                for(let j = 0; j<listType.length; j++){
                    listType[j].classList.remove('is-active');
                }
                listType[i].classList.add('is-active');
            });
        }
    }
    if(headType !== null){
        for(let i = 0; i<headType.length; i++){
            headType[i].addEventListener('click', function(e){
                for(let j = 0; j<headType.length; j++){
                    headType[j].classList.remove('is-active');
                }
                headType[i].classList.add('is-active');
            });
        }
    }
}
boxChk();


//리스트 선택 - 221019 허책임님
// function boxChk(id){
// 	let boxListWrap = null;
// 	let boxList = null;
// 	let isActive = null;
	
// 	if (id != undefined) {
// 		boxListWrap = document.querySelector('#' + id + ' .boxListWrap');
// 		boxList = document.querySelectorAll('#' + id + ' .boxList.headType');
// 		isActive = document.querySelectorAll('#' + id + ' .boxList.is-active');	
// 	} else {
// 	    boxListWrap = document.querySelector('.boxListWrap');
//     	boxList = document.querySelectorAll('.boxList.listType');
//     	isActive = document.querySelectorAll('.boxList.is-active');
// 	}

//     if(boxList !== null){
//         for(let i = 0; i<boxList.length; i++){
//             boxList[i].addEventListener('click', function(e){
//                 for(let j = 0; j<boxList.length; j++){
//                     boxList[j].classList.remove('is-active');
//                 }
//                 boxList[i].classList.add('is-active');
//             });
//         }
//     }
// }



/*-----------//공통-----------*/



/*-----------호출-----------*/

//등급보기설정 '선택'추가 - spring 참고
function addText(grd_grp_cd){
    var idx = 0;
    switch(grd_grp_cd) {
        case "GRD_GRP_001" : idx=0; break;
        case "GRD_GRP_002" : idx=1; break;
        case "GRD_GRP_003" : idx=2; break;
    }
    
    let levelTab = document.querySelectorAll('#levelTable .tabBtn a');			
    let levelCont = document.querySelectorAll('#levelTable .tabContWrap .tabCont');
    
    let addActive = document.createElement('span');
        addActive.setAttribute('class', 'point mainC');
        addActive.innerHTML = '선택';

    for(let i=0; i<levelTab.length; i++){
        
        
        levelTab[idx].append(addActive);
        levelTab[idx].classList.add('is-active');
        levelCont[idx].classList.add('is-active');
        
        levelTab[i].addEventListener('click', function(){
            //this.classList.add('is-active');
            this.append(addActive);
        })
    }
}
//addText();


//등급보기 다음 input focus
function inputFocus(){
    var formCtr = document.querySelectorAll('#showLevel tr input:not(input[type=hidden])');

    for(let i=0; i<formCtr.length; i++){
        //마우스이벤트
        formCtr[i].addEventListener('keydown', function(e){
            var keyCode = e.keyCode;
            //var len = formCtr[i + 1].value.length; 

            //숫자외 입력x
            if(!(48 < keyCode && keyCode < 57) || !(96 < keyCode && keyCode < 105)){
                console.log(this.value);
                this.value=this.value.replace(/[^0-9]/g,'');
                //this.value=this.value.replace( /[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'');
                console.log(this.value);
                console.log('----------');
            }


            if(keyCode == 13){
                formCtr[i+1].focus();      
                chkInput();
            }else if(keyCode == 9){
                chkInput();
            }
        })

        //클릭이벤트
        formCtr[i].addEventListener('focusout', e => {
            chkInput();
        })
        
        function chkInput(){

            var thisTr = formCtr[i].parentNode.parentNode;
            var thisTd = formCtr[i].parentNode;
            var standardPay = formCtr[i].className;
            var tdIndex = thisTd.cellIndex;
            var thisSpan = thisTd.getElementsByTagName('span')[0];

            var nextTr = thisTr.nextElementSibling;
            var nextTd = nextTr.children[tdIndex];
            var nextSpan = nextTd.getElementsByTagName('span')[0];
            
            var inputVal = Number(formCtr[i].value);

            if(standardPay == 'xxsSize'){     
                //input 2개일때
                if(thisTd.getElementsByTagName('input').length  == 2){                    
                    if(formCtr[i] == thisTd.getElementsByTagName('input')[0]){
                        // return;
                        if(inputVal > Number(formCtr[i+1].value)){ 
                            formCtr[i+1].value = inputVal + 1;
                            //nextSpan.innerText = Number(formCtr[i+1].value) + 10;
                        }
                    }else if(formCtr[i] == thisTd.getElementsByTagName('input')[1]){
                        if(inputVal < Number(formCtr[i-1].value)){ 
                            formCtr[i].value = formCtr[i-1].value;
                        }
                    }  
                //span 1개, input 1개일때
                }else if(thisSpan != null && formCtr[i].value < thisSpan.innerText){
                    formCtr[i].value = thisSpan.innerText;                    
                }

                //input이 0일때, 999일때
                if(inputVal == 0 || inputVal == null || inputVal == ''){                    
		            formCtr[i].value = 0;
                    nextSpan.innerText = 0;
                }else if(inputVal === 999){
                    nextSpan.innerText = 999;
                }else if(inputVal !== 0){
                    nextSpan.innerText = inputVal + 1;
                }
            }         
        }
    }
}
// inputFocus();


//rowspan타입 테이블 마우스 오버- 회원상세
function tableHover(){
    let trHover = document.querySelectorAll('.rowSpanType tr:nth-child(odd)');

    for(let i=0; i<trHover.length; i++){
        let bg = trHover[i].nextElementSibling;
        trHover[i].addEventListener('mouseover', function(){
            bg.classList.add('is-active');
        });
        trHover[i].addEventListener('mouseout', function(){
            bg.classList.remove('is-active');
        })
    }
}
//tableHover();


//마이프로젝트-마이피플


// SELECTBOX 일반태그 커스텀 (다른 영역 선택시 off, 체크박스 선택시 off x)
// 호출 : selDefault.onclick = selectBox();
// let selDefault = document.querySelectorAll('.selDefault');   
function selectBox(){ 
    let selDefault = document.querySelectorAll('.selDefault');   
    
    selDefault.forEach(function(lb){
        
            //if (lb.classList.contains('is-active')) return;

            let optionList = lb.nextElementSibling;
            let optionItems = optionList.querySelectorAll('.optionItem');

            /* 221107 저장버튼으로 active추가했을 때 -ys */
            optionItems.forEach(opt => {
                opt.addEventListener('click', () => {
                    handleSelect(lb, opt)
                })
            })
            /* //221107 저장버튼으로 active추가했을 때 -ys */

            lb.addEventListener('click', e => {        
                optionList = lb.nextElementSibling;
                optionItems = optionList.querySelectorAll(':scope > .optionItem');
                clickLabel(lb, optionItems); 
                
                /* 220906 수정(외부클릭시 닫힘) -ys */
                document.addEventListener('click', function(event){
                    if(!(event.target.parentElement.parentElement == optionList || event.target == lb)){
                        lb.parentNode.classList.remove('is-active');
                    }
                    // if(event.target == document.getElementById('saveBtn') || event.target == document.getElementById('alertCls')){
                    //     lb.parentNode.classList.add('is-active');
                    // }
                });
                /* //220906 수정(외부클릭시 닫힘) -ys */
                
            });
            
            /* 220907 수정(옵션없을때) -ys */
            if(optionItems.length == 0){
                lb.parentNode.classList.add("disable");
            }
            /* //220907 수정(옵션없을때) -ys */
            
            lb.classList.add('is-active');
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

    /* 221104 수정(마이피플 - 투입확정) -ys */
    const handleSelect = (selDefault, item) => {
        let hasChk = item.getElementsByTagName('input');
        if(hasChk.length >= 1){
            selDefault.innerHTML = item.textContent;
        }        
        else{
        	if(selDefault.getAttribute('data-confirmyn') != "Y") {
        		selDefault.innerHTML = item.textContent;
            	selDefault.parentNode.classList.remove('is-active');
        	}	            
        }            
    }
    /* //221104 수정(마이피플 - 투입확정) -ys */
}
//selectBox();


//제이쿼리 selectbox	 
function selectJQ(){	
	$(document).on("click", ".select", function(e) {
	
	    $('.select').not($(this)).removeClass('is-active');
	    $(this).toggleClass('is-active');
	
	    //옵션선택시
	    $('.optionItem').on('click', function(){
	        if($(this).closest('.optionList').hasClass('hasChk')){
	            $(this).closest('.optionList').prev().text($(this).text());
	        }else{                    
	            $(this).closest('.select').removeClass('is-active');
	            $(this).closest('.optionList').prev().text($(this).text());
	        }
	    });
	    
	    //외부영역 선택시 닫힘
	    $(document).on("click", function(e){              
	        if(!($(e.target).parents().is('.select'))){
	            $('.select').removeClass('is-active');
	        };
	    });
	});
}   
//selectJQ();


// 체크박스 전체선택     //??????????????? 여러개 구별하도록 수정하기
// 호출 : chkWrap.onclick = chkAll();
function chkAll(){
    let chkAll = document.querySelectorAll('.chkAll');
    let chkEach = document.querySelectorAll('.chkEach');

    for(let i=0; i<chkAll.length; i++){  
        //전체 선택, 해제
        chkAll[i].addEventListener('click', function(){
            let thisParent = this.parentElement.parentElement;
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
            
            let thisParent = this.parentElement.parentElement;
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


// function showMore(ulId){
//     let openMore = document.querySelectorAll("#" + ulId +" .showMore");
//     let moreList = document.querySelectorAll("#" + ulId +" .moreList");
//     for(let i=0; i<openMore.length; i++){
//         openMore[i].addEventListener("click", function(e){
//             e.preventDefault(e);
//             moreList[i].classList.toggle("is-active");
//        });
//     }
// }

//showMore();


//체크리스트 생성하기 230118 수정
//호출 : makeChkList();
function makeChkList(){
    let chkList = document.querySelector("#chkList");
    let addchkList = document.querySelector("#addchkList");

    addchkList.addEventListener('click', function(){
    	let liCnt = document.querySelector("#chkList").children.length;
		let id = 1;
		
		lastLi = document.querySelector("#chkList").lastElementChild;
        
        // if(lastLi.lastElementChild.classList.contains('new')) return;	//여러개 한번에 추가 못하게
		$("#addchkList").attr("disabled", "true"); //여러개 한번에 추가 못하게
		
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
            
        //텍스트
        let createSpan = document.createElement("span"); 
            createSpan.setAttribute("class", "listTxt");

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
        createLi.append(createSpan);
        createLi.append(createInput);
        createInput.focus();
        
        //인풋입력값 등록
        createInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            let inputValue = createInput.value;
            createSpan.innerText = inputValue;

            createLi.removeChild(createInput);
            createLi.append(makeDel);
            
            createChk.removeAttribute("disabled");
            // 데이터 저장 : addChkList(id, inputValue);
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
let myProjDetail_bottom = document.querySelector('.myProjDetail .wrapBottom');
let ProjDTabWrapper = document.querySelector('.myProjDetail .tabWrapper');
let yScroll = document.querySelectorAll('.myProjDetail .tabContWrap .yScroll');
// let yActive = document.querySelector('.myProjDetail .tabCont.is-active .yScroll');

function makeScroll(){      
    
    /* 220928 수정 -ys */
    ProjDTabWrapper.addEventListener('wheel', moveScroll);
    myProjDetail_bottom.addEventListener('wheel', moveScroll);


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


//직무추천 필터 - 230627 수정 -ys
//호출 : filterBtn.onclick = openFilter();        

function openFilter(){
    let filterBtn = document.querySelectorAll('.tabWrapper .filter');
    let myProjJobFilter = document.querySelector('.myProjDetail .filterWrapper');
    let myProjLayerClose = document.querySelector('.myProjDetail .filterWrapper .layerClose');
    
    for(let i=0; i<filterBtn.length; i++){
        filterBtn[i].addEventListener('click', function(){
            this.classList.toggle('is-active');
            
            //myProjJobFilter.classList.toggle('is-active');
            filterID = this.getAttribute("aria-controls");
            document.getElementById(filterID).classList.toggle('is-active');
            //console.log(filterID);
        })
    }
    myProjLayerClose.addEventListener('click',function(){
        this.closest('.filterWrapper').classList.remove('is-active');
    });
}
// openFilter();

$(document).mouseup(function (e){
	var filterWrapper = $(".contWrapper .filterWrapper");
	var uiDate = $(".ui-datepicker-calendar");
	if(filterWrapper.has(e.target).length === 0 && uiDate.has(e.target).length === 0){
        filterWrapper.removeClass("is-active");
    }
});
//230724 수정 -ys


// function layerPop(){
//     let openBtn = document.querySelectorAll(".layerOpen");
//     let closeBtn = document.querySelectorAll(".layerClose");
//     let layerID;
//     if(openBtn !== null){
//         for(let i=0; i<openBtn.length; i++){
//             openBtn[i].addEventListener("click", function(){
//                 // layerID = this.getAttribute('href');
//                 layerID = this.getAttribute("aria-controls");
//                 console.log(layerID);
//                 // document.querySelector(layerID).classList.add('is-active');
//                 document.getElementById(layerID).classList.add('is-active');
//             });
//         }
//         for(let j=0; j<closeBtn.length; j++){
//             closeBtn[j].addEventListener('click', function(){
//                 this.parentNode.parentNode.parentNode.classList.remove('is-active');
//             });
//         }
//     }else{
//         return;
//     }
// }
// layerPop();


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


//마이프로젝트, 마이피플 메모보이기
//호출 : showMemo();
function showMemo(){
    let memoBtn = document.querySelectorAll('a.memoBtn');
    let quick_close = document.querySelectorAll('.quickView .close');
    let quickView = document.querySelector('.quickView');

    for(let i=0; i<memoBtn.length; i++){
        memoBtn[i].addEventListener('click', function(){  
            quickView.classList.add('is-active');    
        })
    }
    quick_close[0].addEventListener('click', function(){  
        quickView.classList.remove('is-active');    
    })
}
//showMemo();


//메모작성
//호출 : makeMemo();
function makeMemo(){
    let addMemo = document.querySelector('.addMemo');
    let cancel = document.querySelector('.textForm .cancel');
    let textForm = document.querySelector('.textForm');
    if(addMemo != null){
		addMemo.addEventListener('click', function(){
	        textForm.classList.add('is-active');
	    })
	}
    if(cancel != null){
		cancel.addEventListener('click', function(){
	        textForm.classList.remove('is-active');
	    })
	}
    
}
//makeMemo();


//퀵뷰 메모리스트 더보기
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


//퀵뷰 메모 더보기/접기
function memoFold(){
    
    let memMemo = document.querySelectorAll('.quickView .memMemo.editType');

    for(let i=0; i<memMemo.length; i++){
        //console.log(memMemo[i].offsetHeight);
        if(memMemo[i].offsetHeight > 90){
            let foldBtnLi = memMemo[i].parentNode.querySelector('.txtRight');
            let foldBtn = foldBtnLi.firstElementChild;

            foldBtnLi.classList.add('is-active');
            foldBtn.addEventListener('click', function(){
                let memMemo = this.parentNode.parentNode.querySelector('.memMemo.editType');
    
                if(memMemo.classList.contains('is-active')){
                    this.innerText = '[더보기]';
                    memMemo.classList.remove('is-active');
                }else{                
                    this.innerText = '[접기]';
                    memMemo.classList.add('is-active');
                }
            })
        }
    }
}
//memoFold();


//textarea height 자동
function autoTextarea(){
    let autoHeight = document.querySelectorAll('textarea.autoHeight');
    if(autoHeight != undefined){        
        for(let i=0; i<autoHeight.length; i++){
            autoHeight[i].onkeypress = function(){
                console.log('aaa' + autoHeight[i].scrollHeight)
                autoHeight[i].style.height = "1px";
                autoHeight[i].style.height = (autoHeight[i].scrollHeight)+"px";
                console.log('bbb' + autoHeight[i].scrollHeight)
            }
        }    
    }
}
autoTextarea();


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
    let flex_2_3 = document.querySelector('.flex_1_1');
    let open = document.querySelector('.open');
    let none = document.querySelectorAll('td.none');
    let theadActive = document.querySelector('.suffix .tableHead th')

    // document.getElementById("myTd").colSpan = "1";

    // none.forEach(none =>{
    //     open.addEventListener('click', () => {
    //         flex_1_2.classList.toggle('is-active');
    //         none.classList.toggle('none');
    //         if(theadActive.colspan = "12"){
    //             theadActive.colSpan = "13";
    //         }else{
    //             theadActive.colSpan = "12";
    //         }
    //     });
    // })   
    
    
    open.addEventListener('click', () => {
        flex_2_3.classList.toggle('is-active');
        
        if(theadActive.colspan = "12"){
            theadActive.colSpan = "13";
            for(let i=0; i<none.length; i++){
                none[i].classList.remove('none');
            }
        }else{
            theadActive.colSpan = "12";
            for(let i=0; i<none.length; i++){
                none[i].classList.add('none');
            }
        }
    });
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


//range slide : 마이프로젝트-직무추천 세부설정 / 230627 수정 -ys
//회사까지의 거리
function rangeSlider(){
    const comDistance = document.getElementById("comDistance");

    const distanceTo = document.getElementById("distanceTo");

    const thumbRight = document.querySelector(".single .slider > .thumb.right");
    const range = document.querySelector(".single .slider > .range");
    const slider = document.querySelector(".single .slider");

    const setRightValue = () => {
        const _this = distanceTo;
        const [min, max] = [parseInt(_this.min), parseInt(_this.max)];
        
        // input, thumb 같이 움직이도록
        const percent = ((_this.value - min) / (max - min)) * 100;
        thumbRight.style.right = 100 - percent + "%";
        range.style.right = 100 - percent + "%";
        
        comDistance.value = Math.round(percent * 0.5);
    };
    setRightValue();
    distanceTo.addEventListener("input", setRightValue);   
    
    //클릭시 이동
    const clickValue = (e) => {        
        const movePercent = parseInt(e.offsetX/5);
        thumbRight.style.right = 100 - movePercent + "%";
        range.style.right = 100 - movePercent + "%";

        comDistance.value = Math.round(movePercent * 0.5);
    }    

    slider.addEventListener("click", clickValue);
}


//보유경력
function rangeSliderMulti(){
    const careerLeft = document.getElementById("careerLeft");
    const careerRight = document.getElementById("careerRight");

    const careerFrom = document.getElementById("careerFrom");
    const careerTo = document.getElementById("careerTo");


    const thumbLeft = document.querySelector(".multi .slider > .thumb.left");
    const thumbRight = document.querySelector(".multi .slider > .thumb.right");
    const range = document.querySelector(".multi .slider > .range");
    const slider = document.querySelector(".multi .slider");
    const track = document.querySelector(".multi .track");

    const setLeftValue = () => {
        const _this = careerLeft;
        const [min, max] = [parseInt(_this.min), parseInt(_this.max)];
        
        // 교차되지 않게, 1을 빼준 건 완전히 겹치기보다는 어느 정도 간격을 남겨두기 위해.
        _this.value = Math.min(parseInt(_this.value), parseInt(careerRight.value) - 1);
        
        // input, thumb 같이 움직이도록
        const percent = ((_this.value - min) / (max - min)) * 100;
        thumbLeft.style.left = percent + "%";
        range.style.left = percent + "%";

        careerFrom.value = Math.round(percent * 0.3);
    };

    const setRightValue = () => {
        const _this = careerRight;
        const [min, max] = [parseInt(_this.min), parseInt(_this.max)];
        
        // 교차되지 않게, 1을 더해준 건 완전히 겹치기보다는 어느 정도 간격을 남겨두기 위해.
        _this.value = Math.max(parseInt(_this.value), parseInt(careerLeft.value) + 1);
        
        // input, thumb 같이 움직이도록
        const percent = ((_this.value - min) / (max - min)) * 100;
        thumbRight.style.right = 100 - percent + "%";
        range.style.right = 100 - percent + "%";
        
        careerTo.value = Math.round(percent * 0.3);
    };

    careerLeft.addEventListener("input", setLeftValue);
    careerRight.addEventListener("input", setRightValue);
    

    //클릭시 이동
    const clickValue = (e) => {        
        let std;
        if(e.target.classList.contains('track')) std = e.offsetX;
        else if(e.target.classList.contains('range'))  std = e.offsetX + thumbLeft.offsetLeft;

        const leftDis = Math.abs(std- (thumbLeft.offsetLeft));
        const rightDis = Math.abs((thumbRight.offsetLeft) - std);

        const movePercent = parseInt(std/5);
        
        if(leftDis >= rightDis){
            console.log('rightDis');            
            thumbRight.style.right = 100 - movePercent + "%";
            range.style.right = 100 - movePercent + "%";
            careerTo.value = Math.round(movePercent * 0.3);
        }else{
            console.log('leftDis');
            thumbLeft.style.left = movePercent + "%";
            range.style.left = movePercent + "%";
    
            careerFrom.value = Math.round(movePercent * 0.3);
        }        
    }        
    slider.addEventListener("click", clickValue);
}
//230627 수정 -ys


//카운팅 - 메뉴관리
function counting(){
    let countUp = document.querySelectorAll('.countUp');
    let countDown = document.querySelectorAll('.countDown');
    let countInput = document.querySelectorAll('.countInput');            

    for(let i=0; i<countInput.length; i++){                  
        if(Number(countInput[i].value) >= 30){   //30의 값을 확인하는 방법?
            countUp[i].disabled = true;
        }else if(Number(countInput[i].value) == 1){
            countDown[i].disabled = true;
        }
        
        countUp[i].addEventListener('click', function(){
            countInput[i].value = Number(countInput[i].value) + 1;  
            countDown[i].disabled = false;         

            if(Number(countInput[i].value) >= 30){   //30의 값을 확인하는 방법?
                countUp[i].disabled = true;
            }
        });
        countDown[i].addEventListener('click', function(){                
            countInput[i].value = Number(countInput[i].value) - 1; 
            countUp[i].disabled = false;         
            
            if(Number(countInput[i].value) == 1){
                countDown[i].disabled = true;
            }
        })
    }
}
//counting();


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
        var drop   = document.getElementsByClassName('upload')[0];
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



// sesstion stroage - 페이지 이동시 gnb 유지
// window.sStorage = window.sessionStorage || (function() {
// // window.sStorage = (function() {
//     var winObj = opener || window;  //opener가 있으면 팝업창으로 열렸으므로 부모 창을 사용
//     var data = JSON.parse(winObj.top.name || '{}');
//     var fn = {
//     length : Object.keys(data).length,
//     setItem : function(key, value) {
//         data[key]  = value + '';
//         winObj.top.name = JSON.stringify(data);
//         fn.length++;
//     },
//     getItem : function(key) {
//         return data[key] || null;
//     },
//     key : function(idx) {
//         return Object.keys(data)[idx] || null;  //Object.keys() 는 IE9 이상을 지원하므로 IE8 이하 브라우저 환경에선 수정되어야함
//     },
//     removeItem : function(key) {
//         delete data[key];
//         winObj.top.name = JSON.stringify(data);
//         fn.length--;
//     },
//     clear : function() {
//         winObj.top.name = '{}';
//         fn.length = 0;
//     }
//     };
//     return fn;
// })();

// function setLeftFixYN() {
//     var leftOpenYN = window.sStorage.getItem("leftFixYN");
//     //console.log('member', leftOpenYN);
    
//     if(leftOpenYN == 'true') {
//         $(".layoutWrapper").addClass('is-active');
//         console.log(leftOpenYN, 'true');
//     }
//     else {
//         $(".layoutWrapper").removeClass('is-active');
//         console.log(leftOpenYN, 'false');
//     }
// }
// setLeftFixYN();

// function goPage(page) {
//     sStorage.clear();
//     sStorage.setItem("leftFixYN", 'false');
//     var leftFixYN = $(".layoutWrapper").hasClass('is-active');
//     sStorage.setItem("leftFixYN", leftFixYN);
    
//     location.href=page;
// }

function chkList(){
    let chkListInput = document.querySelectorAll('#memArea .prefix li input');
    let chkListLabel = chkListInput.nextElementSibling;    
    let chkLi = chkListInput.parentElement;

    for(let i=0; i<chkListInput.length; i++){
        chkListInput[i].addEventListener('click', function(){
            alert('aa');            
        })
    }
    console.log(chkLi);
    console.log(chkListInput);
    console.log(chkListInput.length);
    console.log(chkListLabel);
}
//chkList();

















//2차

//아코디언 on/off
function accordion(){    
    $(".accBox .onlyIco").on("click", function(){
        $(this).parents(".accBox").toggleClass("is-active");
    });
}