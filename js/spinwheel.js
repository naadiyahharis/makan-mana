/**
 * Created by naadi on 28/4/2017.
 */

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

var l1 = "KFC"; var l2 = "Mee";
var l3 = "Sushi"; var l4 = "Roti";
var l5 = "Kueh"; var l6 = "Maggi";
var l7 = "Buah"; var l8 = "Sup";
var color = ['#f2b929','#f4cb61','#f2b929','#f4cb61','#f2b929','#f4cb61', "#f2b929", "#f4cb61"];
var label = [l1, l2, l3, l4, l5, l6, l7, l8];
var slices = color.length;
var sliceDeg = 360/slices;
var deg = rand(0, 360);
var speed = 0;
var slowDownRand = 0;
var ctx = canvas.getContext('2d');
var width = canvas.width; // size
var center = width/2;      // center
var isStopped = true;
var lock = true;
var intId;
drawImg();

/*Untuk button addfood1*/
function setArray(e) {
    l1 = $('input[id=label1]').val();
    l2 = $('input[id=label2]').val();
    l3 = $('input[id=label3]').val();
    l4 = $('input[id=label4]').val();
    l5 = $('input[id=label5]').val();
    l6 = $('input[id=label6]').val();
    l7 = $('input[id=label7]').val();
    l8 = $('input[id=label8]').val();
    label = [l1, l2, l3, l4, l5, l6, l7, l8];
    drawImg();
}

/*Untuk button addfood2*/
$(document).ready(function() {
    $("#add").click(function() {
        intId = $("#buildyourform").length + 1;
        var fieldWrapper = $(" <div class=\"form-group\"><div class=\"control-label col-sm-1\" id=\"field" + intId + "\"/>");
        var fName = $("<input type=\"text\" class=\"col-sm-5\" />");
        var removeButton = $("<button type=\"button\" class=\"remove inline\"><i class=\"fa fa-trash\"></i></input></div>");
        removeButton.click(function() {
            $(this).parent().remove();
        });

        fieldWrapper.append(fName);
        fieldWrapper.append(removeButton);
        $("#buildyourform").append(fieldWrapper);
    });
});


function setIsStopped() {
    isStopped = false;
    lock = false;
    (function anim() {
        deg += speed;
        deg %= 360;

        // Increment speed
        if(!isStopped && speed<3){
            speed = speed+1 * 0.1;
        }
        // Decrement Speed
        if(isStopped){
            if(!lock){
                lock = true;
                slowDownRand = rand(0.994, 0.998);
            }
            speed = speed>0.2 ? speed*=slowDownRand : 0;
        }
        // Stopped!
        if(lock && !speed){
            var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
            ai = (slices+ai)%slices; // Fix negative index
            return alert("You got:\n"+ label[ai] ); // Get Array Item from end Degree
        }

        drawImg();
        window.requestAnimationFrame( anim );
    }());
}

function deg2rad(deg) {
    return deg * Math.PI/180;
}

function insertLabel() {
    return deg * Math.PI/180;
}

function drawSlice(deg, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(center, center);
    ctx.arc(center, center, width/2, deg2rad(deg), deg2rad(deg+sliceDeg));
    ctx.lineTo(center, center);
    ctx.fill();
}

function drawText(deg, text) {
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(deg2rad(deg));
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = 'bold 25px sans-serif';
    ctx.fillText(text, 130, 10);
    ctx.restore();
}

function drawImg() {
    ctx.clearRect(0, 0, width, width);
    for(var i=0; i<slices; i++){
        drawSlice(deg, color[i]);
        drawText(deg+sliceDeg/2, label[i]);
        deg += sliceDeg;
    }
}

document.getElementById("spin").addEventListener("mousedown", function(){
    isStopped = true;
}, false);