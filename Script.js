var clicks = 0;
function setup(){
  createCanvas(600,400);
  c1 =  color(0,0,255);
  c2 = color(130,20,180,230);

  pos1=height/7;
  let stepArray = [pos1, 114, 171, 228, 285, 400];
  setGradient(c1,c2,stepArray);
}


function draw(x, y) {
//  background(70);
  translate(0,400);
  let length = 50;
  stroke(255,0,0);
  let d = 70;
  var p1 = 0;
  var p2 = p1 + d;
  let p3 = 600;
  noSmooth();
  strokeWeight(6); // Thicker
  //LINE(x1,y1,x2,y2)
  //
  // line(0,0, x, y);
  // line(x, y ,600, 0);

  noFill();
}

function mouseClicked() {
  // TODO: Check in an arbritrary range of mouseX and mouseY to make sure we are not pressing the point already added
  //If so, we want to open an interface where we can modify it.
  if (clicks == 4){

  }
  else{

  updateline(mouseX,mouseY);
  console.log(mouseX);
  console.log("Hej Philip");
  clicks++;}

//  draw(mouseX, mouseY);
  // prevent default
  return false;
}
function updateline(a,b){
  // TODO: Updateline should make a new line with a maximum of five points.
  b = b - 400;
  line(0,0,a,b);
  line(a,b,600,0);
  stroke(0,255,0);
  noSmooth();
  strokeWeight(6);
}
function setGradient(c1, c2, stepArray) {
  // TODO: Fix the gradient with fixed background, keep the canvas size
  noFill();

  for (let i = 0; i < 5; i++){
    switch(i){
            case 1:
            temp = stepArray[0];
            c2 = c1;
            c1 = color(0,255,255);
            var dummy = 0;
            while(temp < stepArray[i+1]){
              var inter = map(dummy/2, 0, stepArray[i], 0, 1);
              var c = lerpColor(c2, c1, inter);
              stroke(c);
              line(temp, 0, temp, width);
              temp=temp+0.2;
              dummy++;
              console.log(temp);
            }
            case 2:
            temp = stepArray[i];
            c2 = c1;
            c1 = color(0,255,0);
            dummy = 0;
            while(temp < stepArray[i+1]+40){
              var inter = map(dummy/2, 0, stepArray[i], 0, 1);
              var c = lerpColor(c2, c1, inter);
              stroke(c);
              line(temp, 0, temp, width);
              temp=temp+0.2;
              dummy++;}
               break;
             case 3:
             temp = stepArray[i];
             c2 = c1;
             c1 = color(255,255,0);
             dummy = 0;
             while(temp < stepArray[i+1]+40){
               var inter = map(dummy/2, 0, stepArray[i], 0, 1);
               var c = lerpColor(c2, c1, inter);
               stroke(c);
               line(temp, 0, temp, width);
               temp=temp+0.2;
               dummy++;}
                break;
              case 4:
              temp = stepArray[i];
              c2 = c1;
              c1 = color(255,140,0);
              dummy = 0;
              while(temp < stepArray[i+1]+40){
                var inter = map(dummy/2, 0, stepArray[i], 0, 1);
                var c = lerpColor(c2, c1, inter);
                stroke(c);
                line(temp, 0, temp, width);
                temp=temp+0.2;
                dummy++;}
                 break;
               case 5:
               temp = stepArray[i];
               c2 = c1;
               c1 = color(255,0,0);
               dummy = 0;
               while(temp < stepArray[i+1]+40){
                 var inter = map(dummy/2, 0, stepArray[i], 0, 1);
                 var c = lerpColor(c2, c1, inter);
                 stroke(c);
                 line(temp, 0, temp, width);
                 temp=temp+0.2;
                 dummy++;}
                  break;
            default:
            for (var y = 0; y < stepArray[0]; y++) {
            var inter = map(y, 0, stepArray[i], 0, 1);
            var c = lerpColor(c2, c1, inter);
            stroke(c);
            line(y, 0, y, height);
          }
        }
  }

}
