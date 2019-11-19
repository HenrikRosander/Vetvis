var clicks = 0;
var amount = 0;
let points = [];
let lines = [];
let dummy  = [];
let xChords = new Array(10);
let yChords = new Array(10);
let matchChord = new Array(10);
let i = 0;

function setup()  {
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
  clicks++;}

//  draw(mouseX, mouseY);
  // prevent default
  return false;
}

function updateline(x_Chord,y_Chord){
  // TODO: Updateline should make x_Chord new line with x_Chord maximum of four points.

y_Chord = y_Chord-400;

        points.push(y_Chord,x_Chord);

        points = points.sort(function(a,b){
          return (a[0] > b[0] ? 1 : -1);
        });


        console.log(points);

        //First line
          xChords[i]=x_Chord;
          yChords[i]=y_Chord;
          dummy[amount]= x_Chord;
          dummy[amount+1] = y_Chord;
          c = line(0,0,points[0],points[1]);
          kill = createDiv(c, line(points[0],points[1],600,0));
          kill.remove();
          if (clicks == 0) {amount += 2; i++;}
          if (clicks  >= 1) { //clears the canvas
            kill.remove();
            clear();
            createCanvas(600,400);
            c1 =  color(0,0,255);
            c2 = color(130,20,180,230);
            pos1=height/7;
            let stepArray = [pos1, 114, 171, 228, 285, 400];
            setGradient(c1,c2,stepArray);  translate(0,400);}
            if (clicks == 1){
              if (x_Chord < dummy[0]){//Sort manually
                let tempCordX = x_Chord;
                let tempCordY = y_Chord;
                x_Chord = dummy[0];
                y_Chord = dummy[1];
                dummy[0] = tempCordX;
                dummy[1] = tempCordY;
              }
              for (let i = 0; i < points.length-1; i++) {
                a = points[i][1];
              }
              dummy[amount] = x_Chord; //New updated coordinates
              dummy[amount+1] = y_Chord;console.log(dummy);
              stroke(255,0,0);
              noSmooth();
              strokeWeight(6);
              div2 = createDiv(line(0,0,points[0],points[1]), line(points[0],points[1], points[3],points[2]),line(points[3],points[2], 600,0));
              div2.remove();
              amount += 2;
            }
            if (clicks == 2){
              if (x_Chord < dummy[2] && x_Chord > dummy[0]){
                let tempCordX = x_Chord;
                let tempCordY = y_Chord;
                x_Chord = dummy[0];
                y_Chord = dummy[1];
                dummy[0] = tempCordX;
                dummy[1] = tempCordY;
              }
              dummy[amount] = x_Chord; //New updated coordinates
              dummy[amount+1] = y_Chord;
              stroke(255,0,0);
              noSmooth();
              strokeWeight(6);
              div2 = createDiv(line(0,0,dummy[0],dummy[1]), line(dummy[0],dummy[1], dummy[2],dummy[3]),line(dummy[2],dummy[3], dummy[4],dummy[5]),line( dummy[4],dummy[5], 600,0));
              div2.remove();
              amount += 2;
            }

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
