window.presentation = window.presentation || {};

presentation.SlideFetcher = (function(Q) {
    'use strict';
    
    function SlideFetcher(sliderFolder) {
        var self = this;
        
        self.getSlide = (name) => {
            
            var xmlhttp = new XMLHttpRequest(),
                deferred = Q.defer();

            xmlhttp.onreadystatechange = function() {
                if(xmlhttp.readyState == 4 || xmlhttp.status == 200){
                    deferred.resolve(xmlhttp.responseText);
                }
                else if(xmlhttp.readyState == 4 && xmlhttp != 200) {
                    deferred.reject(new Error('Not able to fetch slide ' + name));
                }
            };

            xmlhttp.open('GET', sliderFolder + '/' + name + '.slide', true);
            xmlhttp.overrideMimeType('text/plain; charset=UTF-8');
            xmlhttp.send();
            
            return deferred.promise;
        };
    }
    
    return SlideFetcher;
})(Q);
