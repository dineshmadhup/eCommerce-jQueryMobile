/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var begin;
var curImage = 1;
function beginAdPage() {
    begin = setInterval("changeAd()", 5000);
}
function changeAd() {
    switch (curImage) {
        case 1:
            document.imagesAd.src = "images/pizza1.png";
            curImage = 2;
            break;
        case 2:
            document.imagesAd.src = "images/pizza2.png";
            curImage = 3;
            break;
        default:
            document.imagesAd.src = "images/pizza3.png";
            curImage = 1;
            break;
    }

}


