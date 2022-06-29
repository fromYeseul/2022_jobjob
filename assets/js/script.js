
/* 레이어팝업(여러개ok) - overflow, 외부영역선택시 close 추가해보기 */
let openBtn = document.querySelectorAll(".layerOpen");
let closeBtn = document.querySelectorAll(".layerClose");
let layerID;

for(let i=0; i<openBtn.length; i++){
    openBtn[i].addEventListener("click", function(){
        layerID = this.getAttribute('href');
        document.querySelector(layerID).classList.add('is-active');
    });
}
for(let j=0; j<openBtn.length; j++){
    closeBtn[j].addEventListener('click', function(){
        this.parentNode.parentNode.parentNode.classList.remove('is-active');
    });
}


/* 탭메뉴(여러개ok) */    
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
                tabCont[j].style.display='none';   //왜 remove is-active는 안되지???? ,  왜 i로 통일은 안되지????
            }
        }
        document.getElementById(tabTarget).style.display="block";
    });
}        


/* GNB - nav */
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



/* CONTENT 레이아웃 - myProject */
let contLayout = document.querySelector('.contLayout');
let myProjDetail = document.querySelector('.myProjDetail');

myProjDetail.addEventListener('click', function(){
    contLayout.classList.add('is-active');
});


/* 우측패널 */
let rPanelList = document.querySelectorAll('.rPanel > ul > li');
let rPanelLayer = document.querySelector('.rPanelLayer');

for(let i=0; i<rPanelList.length; i++){
    rPanelList[i].addEventListener('click', function(){
        rPanelLayer.classList.toggle('is-active');

        let windowWidth = window.innerWidth;
        if(windowWidth <= 1000){
            rPanelLayer.classList.toggle('layerType');
        }
    });
}


/* 패스워드 보이기 */
let showPw = document.querySelector('.showPw');
    
showPw.addEventListener('click', function(){
    let inputPw = this.nextElementSibling;
    let inputPwType = inputPw.getAttribute("type");
    
    if(inputPwType === "password"){
        showPw.classList.add('is-active');
        inputPw.setAttribute("type", "text");
    }else{
        showPw.classList.remove('is-active');
        inputPw.setAttribute("type", "password");
    }
});