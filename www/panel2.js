
var panels = function(panels) {

    panels.makePanel2 = function(frame) {
        var panel = new createjs.Container();
        panel.width = 700;
        panel.height = 700;
        var backing = new zim.Rectangle(panel.width, panel.height, "black");
        backing.alpha = .6;
        panel.addChild(backing);


        //////////////////  STEPPERS  ///////////////////////

        var holder = new createjs.Container();
        panel.addChild(holder);
        var num = 6;
        var steppers = [];
        var stepper;
        var space = (panel.width + 100) / num;
        for (var i=0; i<num; i++) {
            // list, width, color, strokeColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loop, display
            stepper = new zim.Stepper({
                list:[1,2,3,4,5,6,7,8,9],
                vertical:true,
                loop:true,
                width:100,
                corner:0,
                arrows:false,
                shadowColor:-1,
                strokeColor:frame.darker
            });
            holder.addChild(stepper);
            steppers.push(stepper);
            stepper.currentValue = zim.rand(1,9);
            stepper.x = space*i;
            stepper.y = (panel.height-stepper.height)/2;
            stepper.arrowNext.color = stepper.arrowPrev.color = frame.green;
            stepper.on("change", function(e){
                e.target.arrowNext.color = e.target.arrowPrev.color = frame.green;
                test();
            })
        }
        zim.scale(holder, .8);
        holder.x = 40,
        holder.y = 50;
        function test() {
            var a = "";
            frame.stage.update();
            var stepper;
            for (var i=0; i<num; i++) {
                stepper = steppers[i];
                a += ""+stepper.currentValue;
            }
            if (a == frame.firstCode) panel.dispatchEvent("pass");
        }

        panel.dispose = function() {
            var stepper;
            for (var i=0; i<num; i++) {
                stepper = steppers[i];
                stepper.removeAllEventListeners();
                stepper.dispose();
            }
        }

        return panel;
    }
    return panels;
} (panels || {});
