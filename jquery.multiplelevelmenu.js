(function($) {
    $.fn.multipleLevelMenu = function(options) {

        // Plugin defaults
        var settings = $.extend({
            // Elements
            triggerElement: $('.multiple-level-menu_trigger'),
            closeElement: $('.multiple-level-menu_close'),
            wrapperElement: $('.multiple-level-menu_wrapper'),
            // Non jquery selectors
            listSelector: 'ul',
            listItemSelector: 'li',
            // Classes
            activeClass: 'is-active',
            // Options
            disableAbove: false,
            disableBelow: false,
            preserveState: false,
            closeOnNavigation: true,
            eventType: 'click'
        }, options),
            menu = this,
            $body = $('body'),
            viewportWidth = window.innerWidth,
            pluginCurrentlyEnabled;
    
        function checkIfPluginEnabled() {            
        	viewportWidth = window.innerWidth;

        	// If we're not above or below plugin disabling thresholds, enable plugin
        	if ((settings.disableAbove === false 
        		|| settings.disableAbove > viewportWidth) 
        		&& (settings.disableBelow === false
        		|| settings.disableBelow < viewportWidth)) {

        		pluginCurrentlyEnabled = true;

        	} else {
        		pluginCurrentlyEnabled = false;
        		menu.removeClass(settings.activeClass);
        		$(settings.listSelector, menu).removeClass(settings.activeClass);
        		settings.wrapperElement.removeClass(settings.activeClass);
        		settings.triggerElement.removeClass(settings.activeClass);
        	}
        }
        
        checkIfPluginEnabled(); 
        $(window).bind('resize', function() {
            checkIfPluginEnabled();
        });

        // Open/close menu when trigger is clicked
        settings.triggerElement.bind(settings.eventType, function(event) {
            event.stopPropagation();  
        	if (pluginCurrentlyEnabled) {
	            if(menu.hasClass(settings.activeClass)) {
	                closeMenu();
	            } else {
	                openMenu();
	            }
	        }
        });

        // Don't allow click to propagate to wrapper and trigger close
        menu.bind(settings.eventType, function(event) {
            event.stopPropagation();  
        });

        settings.closeElement.bind(settings.eventType, function(event) {          	        
            event.stopPropagation();  

        	if (pluginCurrentlyEnabled) {
	            var $this = $(this),
	                $thisParent;

	            if ($this.parent(settings.listSelector).hasClass(settings.activeClass)) {
	                $thisParent = $this.parent(settings.listSelector);
	            } else {
	                $thisParent = $this.parents('nav');
	                settings.wrapperElement.removeClass(settings.activeClass);
                    settings.triggerElement.removeClass(settings.activeClass);
	            }

	            $thisParent.removeClass('is-active');
	        }
        });

        $(settings.listItemSelector).each(function() {
            var $this = $(this);
            if ($('ul', $this).length !== 0) {
                $('> a', $this).bind(settings.eventType, function(event) {
                    event.preventDefault();
                });
            } else {
                if (settings.closeOnNavigation) {
                    $('> a', $this).bind(settings.eventType, function() {
                        closeMenu();
                    });
                }
            }
        });   	

        $(settings.listItemSelector, menu).bind(settings.eventType, function(event) {   
            event.stopPropagation();     	
        	if (pluginCurrentlyEnabled) {
	            var $this = $(this),
	                $thisChildMenu = $(settings.listSelector, $this);

	            if ($thisChildMenu.length > 0) {
                    if ($thisChildMenu.hasClass(settings.activeClass)) {
                        $thisChildMenu.removeClass(settings.activeClass);
                    } else {
    	                $thisChildMenu.addClass(settings.activeClass);
                    }
            	}
            }
        });

        function openMenu() {
            menu.addClass(settings.activeClass);
            settings.wrapperElement.addClass(settings.activeClass)
                .bind(settings.eventType, closeMenu);
            settings.triggerElement.addClass(settings.activeClass);
        }

        function closeMenu() {
            menu.removeClass(settings.activeClass);
            settings.wrapperElement.removeClass(settings.activeClass)
                .unbind(settings.eventType);
            settings.triggerElement.removeClass(settings.activeClass);

            // If preserve state isn't set remove active state from all sub menus
            if (!settings.preserveState) {
                $(settings.listSelector, menu).removeClass(settings.activeClass);
            }
        }

        return menu;
    };
} (jQuery));