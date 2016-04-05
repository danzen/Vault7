
var panels = function(panels) {

    panels.makePanel7 = function(frame) {
        var panel = new createjs.Container();
        panel.width = 700;
        panel.height = 700;
        var backing = new zim.Rectangle(panel.width, panel.height, "black");
        backing.alpha = .8;
        panel.addChild(backing);

        frame.loadAssets("assets/end.png"); // for next panel


        //////////////////  CODE  ///////////////////////

        var num = 5;
        var spacing = panel.height / (num+3);
        var chars = [];
        var char; var g;
        for (var i=0; i<num; i++) {
            char = new createjs.Shape();
            panel.addChild(char);
            g = char.graphics;
            chars.push(g);
            char.x = panel.width/2;
            char.y = spacing*2 + spacing*i;
        }


        //////////////////  EVENTS  ///////////////////////

        var startTime;
        backing.on("mousedown", function() {
            startTime = new Date().getTime();
        });

        var types = [];
        backing.on("pressup", function() {
            var diff = new Date().getTime() - startTime;
            if (types.length == num) types = [];
            else types.push(diff < 150);
            // if (types.length > num) types.shift(); // to append to drawing - remove test above
            drawChars();
            if (types.length == num) test();
            frame.stage.update();
        });

        function drawChars(color) {
            if (zot(color)) color = frame.blue;
            var type;
            for (var i=0; i<num; i++) {
                g = chars[i];
                g.c().f(color);
                if ((type = types[i]) == null) continue;
                if (type) {
                    g.dc(0,0,25);
                } else {
                    g.rr(-100,-25,200,50,25);
                }
            }
        }


        //////////////////  TEST  ///////////////////////

        test = function() {
            if (!zim.arraysEqual(types, [false,false,true,true,true])) return;
            backing.removeAllEventListeners();
            drawChars(frame.green);
            // play sound
            var count = 0;
            var interval = setInterval(function() {
                if (count >= 4) {
                    clearInterval(interval);
                    panel.dispatchEvent("pass");
                    return;
                }
                drawChars(((count++)%2==0)?frame.blue:frame.green); frame.stage.update();
            }, 500);
        }

        panel.dispose = function() {

        }

        return panel;
    }
    return panels;
} (panels || {});
