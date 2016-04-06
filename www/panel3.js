
var panels = function(panels) {

    panels.makePanel3 = function(frame) {
        var panel = new createjs.Container();
        panel.width = 700;
        panel.height = 700;
        var backing = new zim.Rectangle(panel.width, panel.height, "black");
        backing.alpha = .6;
        panel.addChild(backing);

        var keys = zim.shuffle(["A","B","C","D","F","G","H","J","K","L","A","R","S","T","Y","X","O","P","E","N"])
        var code = keys[0]+keys[1]+keys[2]+keys[3];


        //////////////////  PAD  ///////////////////////

        // width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelAdjust
        var pad = new zim.Pad({
            width: 550,
            cols: 5,
            rows: 4,
            spacing: 15,
            color:frame.blue,
            offColor:frame.dark,
            rollColor:frame.pink,
            keys: keys
        });
        panel.addChild(pad);
        zim.centerReg(pad, panel);
        pad.y -= 60;
        var codeWord = "OPEN";

        // width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelAdjust, keyEnabled
        var word = new zim.Tabs({
            width:(550/5)*4,
            height:550/5-15,
            tabs:[code.substr(0,1),code.substr(1,1),code.substr(2,1),code.substr(3,1)],
            color:frame.green,
            rollColor:frame.green,
            offColor:frame.green,
            spacing:15,
            labelColor:frame.dark
        });
        word.enabled = false;
        panel.addChild(word);
        word.alpha = .9;
        zim.centerReg(word, panel);
        word.y += 250;

        pad.on("change", padChange);

        function padChange(e) {
            code += pad.text;
            code = code.substr(-4,4);
            word.labels[0].text = code.substr(0,1);
            word.labels[1].text = code.substr(1,1);
            word.labels[2].text = code.substr(2,1);
            word.labels[3].text = code.substr(3,1);
            test();
        }

        function test() {
            frame.stage.update();
            if (code == codeWord) panel.dispatchEvent("pass");
        }

        panel.dispose = function() {
            pad.off("change", padChange);
            pad.dispose();
        }

        return panel;
    }
    return panels;
} (panels || {});
