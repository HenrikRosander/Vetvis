var clicks = 0;
let points = [];
let xChords = [];
let yChords = [];
let test = [];

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
}

function mouseClicked() {
  // TODO: Check in an arbritrary range of mouseX and mouseY to make sure we are not pressing the point already added
  //If so, we want to open an interface where we can modify it.
  updateline(mouseX,mouseY);
  }

//  draw(mouseX, mouseY);
  // prevent default


function updateline(x_Chord,y_Chord){
        y_Chord = y_Chord-400;
        points.push([x_Chord, y_Chord]);
        points = points.sort(function(a,b){ //sort the points
          return(a[0] > b[0] ? 1:-1);
        });
          if (clicks  >= 1) { //clears the canvas
            clear();
            createCanvas(600,400);
            c1 =  color(0,0,255);
            c2 = color(130,20,180,230);
            pos1=height/7;
            let stepArray = [pos1, 114, 171, 228, 285, 400];
            setGradient(c1,c2,stepArray);  translate(0,400);
          }
            if (clicks >= 1){
              stroke(255,0,0);
              noSmooth();
              strokeWeight(6);
              line(0,0,points[0][0],points[0][1]);
              for (let i = 0; i < points.length-1; i++) {
                line(points[i][0], points[i][1], points[i+1][0],points[i+1][1]);
              }
              line(points[points.length-1][0],points[points.length-1][1], 600,0);
              // div2 = createDiv(line(0,0,dummy[0],dummy[1]), line(dummy[0],dummy[1], dummy[2],dummy[3]),line(dummy[2],dummy[3], dummy[4],dummy[5]),line( dummy[4],dummy[5], 600,0));
              // div2.remove();
            }
  stroke(0,255,0);
  noSmooth();
  strokeWeight(6);
}
// function setGradient(c1, c2, stepArray) {
//   // TODO: Fix the gradient with fixed background, keep the canvas size
//   noFill();
//   for (let i = 0; i < 5; i++){
//     switch(i){
//             case 1:
//             temp = stepArray[0];
//             c2 = c1;
//             c1 = color(0,255,255);
//             var dummy = 0;
//             while(temp < stepArray[i+1]){
//               var inter = map(dummy/2, 0, stepArray[i], 0, 1);
//               var c = lerpColor(c2, c1, inter);
//               stroke(c);
//               line(temp, 0, temp, width);
//               temp=temp+0.2;
//               dummy++;
//             }
//             case 2:
//             temp = stepArray[i];
//             c2 = c1;
//             c1 = color(0,255,0);
//             dummy = 0;
//             while(temp < stepArray[i+1]+40){
//               var inter = map(dummy/2, 0, stepArray[i], 0, 1);
//               var c = lerpColor(c2, c1, inter);
//               stroke(c);
//               line(temp, 0, temp, width);
//               temp=temp+0.2;
//               dummy++;}
//                break;
//              case 3:
//              temp = stepArray[i];
//              c2 = c1;
//              c1 = color(255,255,0);
//              dummy = 0;
//              while(temp < stepArray[i+1]+40){
//                var inter = map(dummy/2, 0, stepArray[i], 0, 1);
//                var c = lerpColor(c2, c1, inter);
//                stroke(c);
//                line(temp, 0, temp, width);
//                temp=temp+0.2;
//                dummy++;}
//                 break;
//               case 4:
//               temp = stepArray[i];
//               c2 = c1;
//               c1 = color(255,140,0);
//               dummy = 0;
//               while(temp < stepArray[i+1]+40){
//                 var inter = map(dummy/2, 0, stepArray[i], 0, 1);
//                 var c = lerpColor(c2, c1, inter);
//                 stroke(c);
//                 line(temp, 0, temp, width);
//                 temp=temp+0.2;
//                 dummy++;}
//                  break;
//                case 5:
//                temp = stepArray[i];
//                c2 = c1;
//                c1 = color(255,0,0);
//                dummy = 0;
//                while(temp < stepArray[i+1]+40){
//                  var inter = map(dummy/2, 0, stepArray[i], 0, 1);
//                  var c = lerpColor(c2, c1, inter);
//                  stroke(c);
//                  line(temp, 0, temp, width);
//                  temp=temp+0.2;
//                  dummy++;}
//                   break;
//             default:
//             for (var y = 0; y < stepArray[0]; y++) {
//             var inter = map(y, 0, stepArray[i], 0, 1);
//             var c = lerpColor(c2, c1, inter);
//             stroke(c);
//             line(y, 0, y, height);
//           }
//         }
//   }
//
// }
