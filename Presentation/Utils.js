window.presentation = window.presentation || {};

window.presentation.Utils = (function() {
    'use strict';
    
    var Utils = {};
    
    Utils.logError = msg => console.error(msg);
    
    Utils.makeGlobal = (keyword, func) => window[keyword] = func;
    
    Utils.createShortcut = (key, func) => {
        document.addEventListener('keypress', function(e) {
            if (e.keyCode === key) {
                func();
                e.preventDefault();
            }
        }, false);
    }
    
    Utils.beginsWith = (text, char) => (text.trim() + ' ').charAt(0) === char;
    
    return Utils;
})();
