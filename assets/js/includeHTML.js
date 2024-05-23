function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    elmnt.innerHTML = this.responseText;
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                    bindEvents(); // HTML 삽입 후 이벤트 바인딩 함수 호출
                }
            }
       
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

function bindEvents() {
    var buttons = document.querySelectorAll(".gnb");
    buttons.forEach(function(button) {
        button.addEventListener("mouseenter", function() {
            gnbNav();
        });
    });
}

includeHTML();