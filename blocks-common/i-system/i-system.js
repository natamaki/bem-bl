/**
 * @module i-system
 */
(function() {

var timer,
    counter = 0,
    isIdle = false,
    idleInterval = 0,
    channel = BEM.channel('sys'),
    TICK_INTERVAL = 50;

/**
 * @exports
 * @class i-system
 * @bem
 */
BEM.decl('i-system', {}, /** @lends i-system */{

    /**
     * System channel for tick, idle, wakeup messages
     */
    start : function() {

        $(document).bind('mousemove keydown', function() {
            idleInterval = 0;
            if(isIdle) {
                isIdle = false;
                channel.trigger('wakeup');
            }
        });

        this._tick();

    },

    _tick : function() {

        var _this = this;

        channel.trigger('tick', { counter : counter++ });

        if(!isIdle && (idleInterval += TICK_INTERVAL) > 3000) {
            isIdle = true;
            channel.trigger('idle');
        }

        timer = setTimeout(function() {
            _this._tick();
        }, TICK_INTERVAL);

    }

}).start();

})();
