(function($) {
    $.fn.multipleLevelMenu = function(options) {

        // Plugin defaults
        var settings = $.extend({
            // Elements
            triggerElement: $('.multiple-level-menu_trigger'),
            closeElement: $('.multiple-level-menu_close'),
            wrapperElement: $('.multiple-level-menu_wrapper'),
            // Classes
            activeClass: 'is-active',
            // Options
            disableAbove: 767,
            disableBelow: 0,
            preserveState: false
        }, options),
            menu = this;

        // Open/close menu when trigger is clicked
        settings.triggerElement.bind('click', function() {
            if(menu.hasClass(settings.activeClass)) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Don't allow click to propagate to wrapper and trigger close
        menu.bind('click', function(event) {
            event.stopPropagation();  
        });

        settings.closeElement.bind('click', function(event) {          
            event.stopPropagation();  

            var $this = $(this),
                $thisParent;

            if ($this.parent('ul').hasClass(settings.activeClass)) {
                $thisParent = $this.parent('ul');
            } else {
                $thisParent = $this.parents('nav');
                settings.wrapperElement.removeClass(settings.activeClass);
            }

            $thisParent.removeClass('is-active');
        });

        $('li', menu).bind('click', function() {
            var $this = $(this),
                $thisChildMenu = $('> ul', $this);

            if ($thisChildMenu.length > 0) {
                $thisChildMenu.addClass(settings.activeClass);
            }
        });

        function openMenu() {
            menu.addClass(settings.activeClass);
            settings.wrapperElement.addClass(settings.activeClass)
                .bind('click', closeMenu);
            settings.triggerElement.addClass(settings.activeClass);
        }

        function closeMenu() {
            menu.removeClass(settings.activeClass);
            settings.wrapperElement.removeClass(settings.activeClass)
                .unbind('click');

            settings.triggerElement.removeClass(settings.activeClass);

            // If preserve state isn't set remove active state from all sub menus
            if (!settings.preserveState) {
                $('ul', menu).removeClass(settings.activeClass);
            }
        }

        return menu;
    };
} (jQuery));