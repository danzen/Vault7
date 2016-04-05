
var panels = function(panels) {

    panels.makePanel5 = function(frame) {
        var panel = new createjs.Container();
        panel.width = 700;
        panel.height = 700;
        var backing = new zim.Rectangle(panel.width, panel.height, "black");
        backing.alpha = .8;
        panel.addChild(backing);


        //////////////////  RADIO  ///////////////////////

        var r1 = panel.r1 = new zim.RadioButtons(70,["","","",""], false, frame.dark, 30);
        panel.addChild(r1);
        for (var i=0; i<4; i++) r1.dots[i].color = frame.orange;
        r1.on("change", radioChange)
        r1.x = r1.y = 100;

        var r2 = panel.r2 = new zim.RadioButtons(70,["","","",""], false, frame.dark, 30);
        panel.addChild(r2);
        for (var i=0; i<4; i++) r2.dots[i].color = frame.orange;
        r2.on("change", radioChange)
        r2.x = 100;
        r2.y = 500;

        var r3 = panel.r3 = new zim.RadioButtons(70,["",""], true, frame.dark, 34);
        panel.addChild(r3);
        for (var i=0; i<2; i++) r3.dots[i].color = frame.orange;
        r3.on("change", radioChange)
        r3.x = 100;
        r3.y = 230;

        var r4 = panel.r4 = new zim.RadioButtons(70,["",""], true, frame.dark, 34);
        panel.addChild(r4);
        for (var i=0; i<2; i++) r4.dots[i].color = frame.orange;
        r4.on("change", radioChange)
        r4.x = 535;
        r4.y = 230;

        var r5 = panel.r5 = new zim.RadioButtons(70,["",""], false, frame.dark, 30);
        panel.addChild(r5);
        for (var i=0; i<2; i++) r5.dots[i].color = frame.orange;
        r5.on("change", radioChange)
        r5.x = 244;
        r5.y = 231;

        var r6 = panel.r6 = new zim.RadioButtons(70,["",""], false, frame.dark, 30);
        panel.addChild(r6);
        for (var i=0; i<2; i++) r6.dots[i].color = frame.orange;
        r6.on("change", radioChange)
        r6.x = 244;
        r6.y = 362;

        function radioChange(e) {
            frame.stage.update();
        }

        panel.test = function() {
            frame.stage.update();
            panel.dispatchEvent("pass");
        }

        panel.dispose = function() {
            for (var i=1; i<=6; i++) {
                panel["r"+i].off("change", radioChange);
                panel["r"+i].dispose();
            }
        }

        return panel;
    }
    return panels;
} (panels || {});
