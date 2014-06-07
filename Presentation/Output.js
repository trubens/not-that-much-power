window.presentation = window.presentation || {};

presentation.Output = (function() {
    'use strict';

    function format(text) {
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                   .replace(/\~\~(.*?)\~\~/g, '<img src="img\$1" />')
                   .replace(new RegExp('//(((?!https?://).)*?)//', 'g'), '<em>$1</em>')
                   .replace(/\[\[(http:[^\]|]*?)\]\]/g, '<a target="_blank" href="$1">$1</a>')
                   .replace(/\[\[(http:[^|]*?)\|(.*?)\]\]/g, '<a target="_blank" href="$1">$2</a>')
                   .replace(/\[\[([^\]|]*?)\]\]/g, '<a href="$1">$1</a>')
                   .replace(/\[\[([^|]*?)\|(.*?)\]\]/g, '<a href="$1">$2</a>')
                   .replace(/ /g, '&nbsp;')
                   .replace(/(?:\r\n|\r|\n)/g, '<br />');
        return text;
    }
    
    function Output(outputElement) {
        var self = this,
            buffer = '';

        self.print = (msg, noLineFeed) => {
            buffer +=  '\n' + msg;
            updateElement();
        };
        
        self.clearOutput = () =>  {
            buffer = '';
            updateElement();
        };
        
        function updateElement() {
            outputElement.innerHTML = format(buffer.substring(1)) + '<span class="blink">&#9604;</span>';
        };
    }

    return Output;
})();
