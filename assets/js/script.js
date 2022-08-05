
/* 레이어팝업(여러개ok) - overflow, 외부영역선택시 close 추가해보기 */
// function layerPop(){
//     let openBtn = document.querySelectorAll(".layerOpen");
//     let closeBtn = document.querySelectorAll(".layerClose");
//     let layerID;

//     for(let i=0; i<openBtn.length; i++){
//         openBtn[i].addEventListener("click", function(){
//             layerID = this.getAttribute('href');
//             document.querySelector(layerID).classList.add('is-active');
//         });
//     }
//     for(let j=0; j<openBtn.length; j++){
//         closeBtn[j].addEventListener('click', function(){
//             this.parentNode.parentNode.parentNode.classList.remove('is-active');
//         });
//     }
// }
// layerPop();


/* 탭메뉴(여러개 확인하기!!) */    
function tabMenu(){
    let tabBtn = document.querySelectorAll('.tabBtnWrap a');
    let tabCont = document.querySelectorAll('.tabContWrap > div');

    for(let i=0; i < tabBtn.length; i++){
        tabBtn[i].addEventListener('click',function(e){

            let tab_id = this.closest('.tabWrapper').id;

            e.preventDefault();
            let tabHref = e.target.getAttribute('href');    //e의 역할?????
            let tabTarget = tabHref.replace('#','');

            // for(let x=0; x < tabCont.length; x++){
            //     if (tabCont[x].closest('.tabWrapper').id == tab_id){
            //         tabCont[x].style.display='none';
            //     }
            // }
            //document.getElementById(tabTarget).style.display="block";

            for(let j=0; j < tabBtn.length; j++){
                if (tabBtn[j].closest('.tabWrapper').id == tab_id){
                    tabBtn[j].classList.remove('is-active');
                    e.target.classList.add('is-active');
                    tabCont[j].style.display='none';   //???????? 왜 remove is-active는 안되지???? ,  ???????? 왜 i로 통일은 안되지????
                }
            }
            document.getElementById(tabTarget).style.display="block";
        });
    }        
}
tabMenu();


/* GNB - nav */
function gnbNav(){
    let layoutWrapper = document.querySelector('.layoutWrapper');
    let navCtrlBtn = document.querySelector('.navCtrlBtn');
    let navWrapper = document.querySelector('.navWrapper');

    navCtrlBtn.addEventListener('click', function(){
        layoutWrapper.classList.toggle('is-active');
    });

    navWrapper.addEventListener('mouseenter', function(){
        layoutWrapper.classList.add('is-hover');
    });
    navWrapper.addEventListener('mouseleave', function(){
        layoutWrapper.classList.remove('is-hover');
    });
}
gnbNav();


// /* MYPROJECT 레이아웃 */
// function projLayout(){
//     //let contLayout = document.querySelector('.contLayout');
//     let myProjDetail = document.querySelector('.myProjDetail');

//     myProjDetail.addEventListener('click', function(){
//         myProjDetail.classList.toggle('is-active');
//     });
// }
// projLayout();


/* 우측패널 */
function rightPanel(){
    let rPanelList = document.querySelectorAll('.rPanel > ul > li');
    let rPanelLayer = document.querySelector('.rPanelLayer');
    let rClose = document.querySelector('.rClose');
    let contLayout = document.querySelector('.contLayout');

    for(let i=0; i<rPanelList.length; i++){
        rPanelList[i].addEventListener('click', function(){
            rPanelLayer.classList.toggle('is-active');
            contLayout.classList.toggle('is-active');


            let windowWidth = window.innerWidth;
            if(windowWidth <= 1200){
                rPanelLayer.classList.toggle('layerType');
            }
        });
    }

    rClose.addEventListener('click', function(){
        rPanelLayer.classList.toggle('is-active');
    })
}
rightPanel();

/* 우측 패널 필터창 */
function filterLayer(){
    let filterWrapper = document.querySelector('.filterWrapper');
    let filter = document.querySelector('.filter');


    filter.addEventListener('click', function(){
        filterWrapper.classList.toggle('is-active');
    });
}
filterLayer();


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

/* 체크박스 전체선택 */     //??????????????? 여러개 구별하도록 수정하기
function chkAll(){
    let chkAll = document.querySelector('.chkAll');
    let chkEach = document.querySelectorAll('.chkEach');

        for(let i=0; i<chkEach.length; i++){  
            //전체 선택, 해제
            chkAll.addEventListener('click', function(){
                if(chkAll.checked == true){
                    chkEach[i].checked = true;
                }else{
                    chkEach[i].checked = false;
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
chkAll();


//??????????????????
//html에 없는 script일 경우 Uncaught TypeError : addEventListner 가
//뜨면서 이하에 있는 script가 적용이 안됨


/* SELECTBOX 일반태그 커스텀  */
const label = document.querySelectorAll('.selDefault');
label.forEach(function(lb){
    lb.addEventListener('click', e => {
        let optionList = lb.nextElementSibling;
        let optionItems = optionList.querySelectorAll('.optionItem');
        clickLabel(lb, optionItems);
    })
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
const handleSelect = (label, item) => {
    label.innerHTML = item.textContent;
    label.parentNode.classList.remove('is-active');
    
}