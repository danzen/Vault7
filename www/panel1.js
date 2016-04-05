
var panels = function(panels) {

    panels.makePanel1 = function(frame) {
        var panel = new createjs.Container();
        panel.width = 700;
        panel.height = 700;
        var backing = new zim.Rectangle(panel.width, panel.height, "black");
        backing.alpha = .3;
        panel.addChild(backing);


        //////////////////  PAD  ///////////////////////

        var padKey = panel.padKey = zim.rand(1,9) + "" + zim.rand(1,9);

        // width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelAdjust
        pad = new zim.Pad({
            width: 270,
            cols: 3,
            keys: [1,2,3,4,5,6,7,8,9],
            color: frame.dark,
            rollColor: frame.blue,
            offColor: frame.grey
        });

        pad.alpha = .8;
        var margin = backing.width*.07;
        pad.x = margin*1.25;
        pad.y = backing.height-pad.height-margin;
        panel.addChild(pad);

        var digit = new zim.Tabs((pad.width-2)*2/3, (pad.width-2)/3, [padKey.substr(0,1), padKey.substr(1,1)], frame.blue, frame.blue, frame.blue, 3);
        digit.enabled = false;
        panel.addChild(digit);
        digit.x = pad.x + pad.width + margin*1.5;
        digit.y = pad.y + pad.height *2/3 + 2;
        // digit.shadow = new createjs.Shadow("rgba(0,0,0,.3)", 5, 5, 10);

        var line = new zim.Rectangle(margin, 3, frame.grey);
        line.x = pad.x + pad.width + margin/4;
        line.y = digit.y + digit.height / 2;
        panel.addChildAt(line,0);
        line.alpha = .5;

        pad.on("change", padChange);

        function padChange(e) {
            padKey += pad.text;
            padKey = padKey.substr(-2,2);
            digit.labels[0].text = padKey.substr(0,1);
            digit.labels[1].text = padKey.substr(1,1);
            test();
        }


        //////////////////  SLIDERS  ///////////////////////

        var sliderKey = panel.sliderKey = zim.rand(1,9) + "" + zim.rand(1,9);

        var slider = new zim.Rectangle(
            backing.width-margin*4-pad.width,
            backing.height-margin*3-digit.height,
            frame.grey);
        panel.addChild(slider);
        slider.x = digit.x;
        slider.y = margin;

        var s1But = new zim.Button({label:"", corner:0, width:slider.width/5, height:slider.width/5, color:frame.pink, rollColor:frame.pink, shadowColor:-1});
        // min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside
        var s1 = new zim.Slider(1,9,1,s1But,slider.height, slider.width/5, frame.green, true, true, true);
        panel.addChild(s1);
        zim.expand(s1.button);
        s1.currentValue = Number(sliderKey.substr(0,1));
        s1.x = slider.x + slider.width * 2/5;
        s1.y = slider.y + slider.height;
        s1.ticks.x -= 44;
        s1.rotation = 180;

        var s2But = new zim.Button({label:"", corner:0, width:slider.width/5, height:slider.width/5, color:frame.pink, rollColor:frame.pink, shadowColor:-1});
        // min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside
        var s2 = new zim.Slider(1,9,1,s2But,slider.height, slider.width/5, frame.green, true, true, true);
        panel.addChild(s2);
        zim.expand(s2.button);
        s2.currentValue = Number(sliderKey.substr(1,1));
        s2.x = slider.x + slider.width * 4/5;
        s2.y = slider.y + slider.height;
        s2.rotation = 180;

        s1.on("change", sliderChange);
        s2.on("change", sliderChange);

        function sliderChange(e) {
            sliderKey = s1.currentValue + "" + s2.currentValue;
            test();
        }


        //////////////////  DIALS  ///////////////////////

        var dialKey = panel.dialKey = zim.rand(1,9) + "" + zim.rand(1,9);

        var dialConfig = {
            min: 1,
            max: 9,
            step: 1,
            width: 270,
            color: frame.brown,
            indicatorColor: "rgba(0,0,0,.3)",
            indicatorScale: .6,
            type: "arrow",
            innerCircle: false,
            innerScale: .68,
            useTicks: true,
            innerTicks: false,
            tickColor: "#444",
            limit: false
        }

        var d1 = new zim.Dial(dialConfig); // use ZIM DUO
        d1.currentValue = Number(dialKey.substr(1,1));
        panel.addChild(d1);
        d1.x = pad.x + pad.width/2;
        d1.y = margin + d1.width/2;

        // use the same dial config object but change a few property values
        dialConfig.width = 180;
        dialConfig.color = frame.green;
        dialConfig.indicatorColor = "rgba(0,0,0,.3)";
        dialConfig.indicatorScale = 1;
        dialConfig.innerCircle = true;
        dialConfig.innerScale = .5;
        dialConfig.useTicks = false;
        dialConfig.innerTicks = false;

        var d2 = new zim.Dial(dialConfig);
        d2.currentValue = Number(dialKey.substr(0,1));
        panel.addChild(d2);
        d2.x = d1.x;
        d2.y = d1.y;

        d1.on("change", dialChange);
        d2.on("change", dialChange);

        function dialChange(e) {
            dialKey = d2.currentValue + "" + d1.currentValue;
            test();
        }

        function test() {
            frame.stage.update();
            if (dialKey != padKey || dialKey != sliderKey) return;
            if (dialKey.charAt(0) == dialKey.charAt(1)) return;
            panel.dispatchEvent("pass");
        }

        panel.dispose = function() {
            d1.off("change", dialChange);
            d2.off("change", dialChange);
            s1.off("change", sliderChange);
            s2.off("change", sliderChange);
            pad.off("change", padChange);
            d1.dispose();
            d2.dispose();
            s1.dispose();
            s2.dispose();
            pad.dispose();
        }

        return panel;
    }
    return panels;
} (panels || {});
