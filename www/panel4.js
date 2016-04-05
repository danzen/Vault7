
var panels = function(panels) {

    panels.makePanel4 = function(frame) {
        var panel = new createjs.Container();
        panel.width = 700;
        panel.height = 700;
        var backing = new zim.Rectangle(panel.width, panel.height, "black");
        backing.alpha = .6;
        panel.addChild(backing);


        //////////////////  SOUND  ///////////////////////

        frame.off("complete", frame.completeEvent);
        frame.on("complete", showNotes);

        //var waiter = new zim.Waiter(frame.stage, null, "#333", "#999", 0);
    	//waiter.show();
        var sounds = ["b01.mp3", "b02.mp3", "b03.mp3", "b04.mp3", "b05.mp3", "b06.mp3", "b07.mp3"];
        var num = sounds.length;
        frame.loadAssets(sounds, "assets/");

        var tabs;
        var lookup = zim.shuffle([1,2,3,4,5,6,7]);
        var code = lookup.join("");
        var codeWord = "1234567";

        function showNotes() {

            //waiter.hide();

            //////////////////  TABS  ///////////////////////

            // width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelAdjust, keyEnabled
            tabs = new zim.Tabs({
                width: panel.width*.95,
                height: panel.width,
                tabs:["","","","","","",""],
                spacing:10,
                color:frame.green,
                rollColor:frame.blue,
                offColor:frame.pink,
                currentEnabled:true
            });
            tabs.selectedIndex = -1;

            panel.addChild(tabs);
            zim.centerReg(tabs, panel);
            tabs.rotation = 90;

            for (var i=0; i<num; i++) {
                tabs.buttons[i].num = lookup[i];
            }

            tabs.on("change", tabsChange);

        }

        var word = "";
        function tabsChange(e) {
            word += "" + e.target.selected.num;
            word = word.substr(-7,7);
            var sound = "b0"+lookup[e.target.selectedIndex]+".mp3";
            frame.asset(sound).play();
            test();
        }

        function test() {
            frame.stage.update();
            if (word == codeWord) panel.dispatchEvent("pass");
        }

        panel.dispose = function() {
            tabs.removeAllEventListeners();
            tabs.dispose();
            frame.off("complete", showNotes);
        }

        return panel;
    }
    return panels;
} (panels || {});
