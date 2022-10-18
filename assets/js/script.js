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
    }else{
        return;
    }
}
gnbNav();

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
function boxChk(){
    let boxListWrap = document.querySelector('.boxListWrap');
    let boxList = document.querySelectorAll('.boxList.listType');
    let isActive = document.querySelectorAll('.boxList.is-active');

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
boxChk();
/*-----------//공통-----------*/



/*-----------호출-----------*/
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





// 체크박스 전체선택     //??????????????? 여러개 구별하도록 수정하기
// 호출 : chkWrap.onclick = chkAll();
let chkWrap = document.querySelector('.chkWrap');
function chkAll(){
    let chkAll = document.querySelector('.chkAll');
    let chkEach = document.querySelectorAll('.chkEach');

    for(let i=0; i<chkEach.length; i++){  
        //전체 선택, 해제
        chkAll.addEventListener('click', function(){
            if(chkAll.checked == true){
                chkEach[i].checked = true;
            }else{
                /*chkEach[i].checked = false;*/ //generalMember.jsp
            }            
        });

        //개별선택시 전체 선택, 해제
        chkEach[i].addEventListener('click', function(){        
            let chked = document.querySelectorAll('.chkEach:checked');
            if(chked.length == chkEach.length){
                chkAll.checked = true;
            }else{
                chkAll.checked = false;
            }
        });
    }
}
//chkAll();


//더보기 (마이피플)
// 호출 : showMore();    
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


//선택된 직무유형 영역 스크롤바
//호출 : customScroll();
function customScroll(){
    window.onload = function(){
        var myScroll = new IScroll('.iscroll',{
            mouseWheel: true,
            scrollbars: true,
            scrollX: false,
            scrollY: true,
            interactiveScrollbars: true
        });
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    }
}
//customScroll();


//스크롤 생성
//호출 : myProjJob.onclick = makeScroll();
let myProjJob = document.querySelector('.myProjJob');
let ProjTabWrapper = document.querySelector('.myProjJob .tabWrapper');
let yScroll = document.querySelectorAll('.myProjJob .tabContWrap .yScroll');
let yActive = document.querySelector('.myProjJob .tabCont.is-active .yScroll');

function makeScroll(){      
    
    /* 220928 수정 -ys */
    ProjTabWrapper.addEventListener('wheel', moveScroll);
    myProjJob.addEventListener('wheel', moveScroll);

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


//직무추천 필터
//호출 : filterBtn.onclick = openFilter();        
let filterBtn = document.querySelectorAll('.tabWrapper .button');
let myProjJobFilter = document.querySelector('.myProjJob .filterWrapper');

function openFilter(){
    for(let i=0; i<filterBtn.length; i++){
        filterBtn[i].addEventListener('click', function(){
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