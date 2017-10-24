window._rAF = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 16);
        };
})();

var cancelAnimationFrame = window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame;

var DomUtil = {
    requestAnimationFrame: function(cb) {
        return window._rAF(cb);
    },

    cancelAnimationFrame: function(requestId) {
        cancelAnimationFrame(requestId);
    },

    animationFrameThrottle: function(cb) {
        var args, isQueued, context;
        return function() {
            args = arguments;
            context = this;
            if (!isQueued) {
                isQueued = true;
                this.requestAnimationFrame(function() {
                    cb.apply(context, args);
                    isQueued = false;
                });
            }
        };
    }
}

module.exports = DomUtil
