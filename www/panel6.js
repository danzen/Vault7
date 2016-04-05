
var panels = function(panels) {

    panels.makePanel6 = function(frame) {
        var panel = new createjs.Container();
        panel.width = 700;
        panel.height = 700;
        var backing = new zim.Rectangle(panel.width, panel.height, "black");
        backing.alpha = .8;
        panel.addChild(backing);


        //////////////////  CHECKBOXES  ///////////////////////

        var cols = 4;
        var rows = 4;
        var spacing = panel.width / (cols+1);

        var checks = [];
        var check;

        for (var i=0; i<rows*cols-1; i++) { // don't do last checkbox where reset button is
            check = new zim.CheckBox({
                size:80,
                type:"square"
            });
            check.num = i;
            checks.push(check);
            check.on("change", checkChange);
            check.x = spacing*2/3 + spacing*(i%cols);
            check.y = spacing*2/3 + spacing*Math.floor(i/cols);
            check.alpha = .9;
        }

        panel.addChild(checks[0]);


        //////////////////  RESET  ///////////////////////

        var reset = new zim.Circle(50, frame.pink);
        panel.addChild(reset);
        reset.x = 552;
        reset.y = 552;
        reset.cursor = "pointer";
        reset.on("mouseover", function () {reset.color = frame.green; frame.stage.update();});
        reset.on("mouseout", function () {reset.color = frame.pink; frame.stage.update();});
        reset.on("click", resetMoves);
        function resetMoves() {
            lastChecked = checks[0];
            wrongCheck = false;
            num = 0;
            var check;
            for (var i=0; i<checks.length; i++) {
                check = checks[i];
                check.checked = false;
                check.enabled = true;
                panel.removeChild(check);
            }
            panel.addChild(checks[0]);
            num = 0;
            frame.stage.update();
        };

        var seed = zim.shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
        var moves = [];
        while(seed.length > 0) {
            var sprout = [seed.pop(),seed.pop()];
            moves.push(sprout);
        }

        var num = 0;
        var move;
        var lastChecked = checks[0];
        var wrongCheck = false;
        function checkChange(e) {

            var check = e.target;
            check.enabled = false;
            if (num > 0) {
                if (check.num == move[0]) {
                    panel.removeChild(lastChecked);
                    lastChecked = check;
                } else {
                    wrongCheck = true;
                    panel.removeChild(checks[move[1]]);
                }
            }
            if (num >= moves.length) {test(); return;}
            move = moves[num];

            panel.addChild(checks[move[0]]);
            panel.addChild(checks[move[1]]);
            num++;
            frame.stage.update();
        }

        test = function() {
            if (wrongCheck) {
                resetMoves();
                return;
            }
            frame.stage.update();
            panel.dispatchEvent("pass");
        }

        panel.dispose = function() {
            var check;
            for (var i=0; i<checks.length; i++) {
                check = checks[i];
                check.off("change", checkChange);
                check.dispose();
            }
            reset.removeAllEventListeners();
        }

        return panel;
    }
    return panels;
} (panels || {});
