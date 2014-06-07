window.presentation = window.presentation || {};

window.presentation.SlideRenderer = (function(Utils, FontGenerator) {
    'use strict';
    
    var isBulletPoint = (text) => Utils.beginsWith(text, '-'), 
        isHeader = (text) => Utils.beginsWith(text, '!'),
        isStopMark = (text) => text.trim() === '-';
    
    function SlideRenderer(slideSource, output) {
        var self = this,
            finished = false,
            slideLines = slideSource.split('\n'),
            currentSlideLine = 0;
        
        self.isFinished = () => finished;
        
        self.proceed = () => {
            var current = slideLines[currentSlideLine];
            
            if(isHeader(current)) {
                for(var line of FontGenerator.generate(current.substring(1), '&#9619;')) {
                    output.print(line);
                }
            }
            else if(isStopMark(current)) {
            }
            else {
                output.print(current);
            }
            
            currentSlideLine++;
            
            finished = currentSlideLine === slideLines.length;
            
            if(finished || isBulletPoint(current) || isStopMark(current)) {
                return;
            }
            else {
                self.proceed();
            }
        };
        
    }

    return SlideRenderer;
    
})(window.presentation.Utils, window.presentation.FontGenerator);
