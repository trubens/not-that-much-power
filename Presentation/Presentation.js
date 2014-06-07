window.presentation = window.presentation || {};

presentation.Presentation = (function(SlideFetcher, SlideRenderer, Utils, Output) {
    'use strict';
    
    function Presentation(outputElement, slideDirectory = 'slides') {
        
        var self = this,
            slideFetcher = new SlideFetcher(slideDirectory);
        
        var slides = [],
            currentSlide = null,
            currentSlideNumber = -1,
            output = new Output(outputElement);
        
        window.o = output.print;
        
        self.gotoSlide = number => {
            output.clearOutput();
            
            if(number >= slides.length) {
                output.print('Slidedeck finished....');
            }
            else {
                currentSlideNumber = number;
                currentSlide = new SlideRenderer(slides[number], output);
                currentSlide.proceed();
            }
        };
        
        self.next = () => {
            if(currentSlide === null || currentSlide.isFinished()) {
                self.gotoSlide(++currentSlideNumber);
            }
            else {
                currentSlide.proceed();
            }
        };
        
        self.start = () => {
            output.print('Welcome to the NotSoMuchPowerPoint!');
            output.print('');
            output.print('Please write <enter> or write n() to proceed!');
            
            Utils.makeGlobal('n', self.next);
            Utils.createShortcut(13, self.next);
        };
        
        self.addSlide = name => {
            slideFetcher
                .getSlide(name)
                .then(slide => slides.push(slide),
                      error => Utils.logError(error));
        };
    }
    
    return Presentation;
})(presentation.SlideFetcher, presentation.SlideRenderer, presentation.Utils, presentation.Output);