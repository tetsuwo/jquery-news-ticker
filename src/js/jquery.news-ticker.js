/*!
 * jQuery News Ticket Plug-In
 * http://tetsuwo.tumblr.com/
 *
 * Copyright 2012, Tetsuwo OISHI
 * Dual licensed under the MIT license.
 *
 * Date: 2012-11-03
 */

;(function($) {
    $.fn.newsTicker = function(options) {
        var
        $root         = $(this),
        settings      = {},
        privates      = {},
        first         = true,
        pointer       = 0;

        // extended setting object
        settings = $.extend({
            debug           : false,
            itemTitleChars  : 10,
            minItem         : 0,
            maxItem         : 10,
            scrollStep      : 5,
            scrollSecond    : 0.07,
            interval        : 2000,
            animationType   : 'scroll',
            classNamePrefix : 'jq-news-ticker-'
        }, options);

        /**
         * Debug
         *
         * @param  mixced
         * @return none
         */
        this.debug = function(a) {
            if (settings.debug) {
                console.log(a);
            }
        };

        /**
         * Get Configuration
         *
         * @return object
         */
        this.getConfig = function() {
            return settings;
        };

        /**
         * Set Pointer
         *
         * @param  int
         * @return int
         */
        this.setPointer = function(id) {
            $self.debug('setPointer = ' + id);
            pointer = id;
            return $self.getPointer();
        };

        /**
         * Get Pointer
         *
         * @return int
         */
        this.getPointer = function() {
            $self.debug('getPointer = ' + pointer);
            return pointer;
        };

        /**
         * Get Class Name
         *
         * @param  string
         * @param  bool
         * @return string
         */
        this.getClassName = function(val, dotNothing) {
            return (dotNothing ? '' : '.') + settings.classNamePrefix + val;
        };

        /**
         * Get All Items
         *
         * @return object
         */
        this.getItems = function() {
            return $root.find($self.getClassName('item'));
        };

        /**
         * Get Item
         *
         * @param  int
         * @return object
         */
        this.getItem = function(idx) {
            return $root.find($self.getClassName('item')).eq(idx);
        };

        /**
         * Get Current Item
         *
         * @return object
         */
        this.getCurrentItem = function() {
            return $self.getItem(pointer);
        };

        /**
         * Animate Callback
         *
         * @param  int
         * @return none
         */
        this.animateCallback = function() {
            pointer++;

            if ($self.getItems().length <= pointer) {
                pointer = 0;
            }

            $self.setPointer(pointer);
            $self.start();
        };

        /**
         * Scroll Func
         *
         * @param  int
         * @return none
         */
        privates.scrollFunc = function() {
            var $target = $self.getCurrentItem();
            var pos = $target.position();

            if (privates.targetPoint > pos.left) {
                $target.css('left', privates.targetPoint - 100);
                window.setTimeout($self.animateCallback, settings.interval);
                return;
            }

            $target.css('left', pos.left - settings.scrollStep);
            window.setTimeout(arguments.callee, settings.scrollSecond * 1000);
        };

        /**
         * Set Item
         *
         * @param  int
         * @return none
         */
        this.setItem = function(idx) {
            first = false;

            // hide all & remove focus
            $root.find($self.getClassName('item-focus'))
                .removeClass($self.getClassName('item-focus', true))
                .hide();

            // show one
            var $target = $self.getItem(idx);
            $target.addClass($self.getClassName('item-focus', true));

            $self.debug('root.width = ' + $root.width());
            $self.debug('target.width = ' + $target.width());

            var isLong = $root.width() < $target.width();
            privates.targetPoint = isLong ? $root.width() - $target.width() : 0;
            privates.targetPoint -= $root.width();

            switch(settings.animationType) {
                case 'scroll':
                    var addWidth = parseInt($root.css('paddingLeft')) + parseInt($root.css('paddingRight'));
                    $target.css('left', $root.width() + addWidth).show();

                    $target.animate(
                        { left: 0 },
                        function() {
                            window.setTimeout(privates.scrollFunc, 1000);
                        }
                    );
                    break;

                default:
                    $target.fadeIn($self.animateCallback);
                    break;
            }
        };

        /**
         * Start
         *
         * @return none
         */
        this.start = function() {
            $self.setItem(pointer);
        };

        /**
         * Tick!
         *
         * @return none
         */
        this.tick = function() {
            var $items = $self.getItems();
            $self.debug($items.length);

            if (first) {
                return $self.start();
            }

            window.setTimeout(
                $self.start,
                settings.interval
            );
        };

        // settings
        this.debug(settings);

        // fix reserved-variable
        $self = this;

        $(function() {
            var $items = $self.getItems();

            // if no item, add new item
            if ($items.length < 1) {
                $self.debug('Not Found News');
                return;
            }

            $self.tick();
        });

        return this;
    };
})(jQuery);
