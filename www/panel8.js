
var panels = function(panels) {

    panels.makePanel8 = function(frame) {
        var panel = new createjs.Container();
        panel.width = 700;
        panel.height = 700;
        var backing = new zim.Rectangle(panel.width, panel.height, "black");
        backing.alpha = .8;
        panel.addChild(backing);


        //////////////////  MESSAGE  ///////////////////////

        frame.loadAssets("end.png");
        var message = frame.asset("assets/end.png");
        zim.scaleTo(message, panel, 100, 100);
        panel.addChild(message);
        panel.cursor = "pointer";
        panel.on("click", function(){zgo("http://zimjs.com/code/", "_system")});

        return panel;
    }
    return panels;
} (panels || {});
