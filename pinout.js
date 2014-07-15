			jQuery(document).ready(function(){

				var History = window.History;
				
				History.Adapter.bind(window,'statechange',function(){
					var State = History.getState();
					var url = State.url.replace('http://pi.gadgetoid.com','');
					if( url == '/pinout' )
					{
						jQuery('h1').click();
					}
					else
					{
						jQuery('a[href="' + url + '"]').click();
					}
				})
			
				window.prettyPrint&&prettyPrint();
				jQuery('#pages').cycle({
					timeout:0,
					slideExpr:'article',
					startingSlide:40,
					speed:200,
					containerResize:0
				});

				jQuery('.legend li a').on('click',function(e){
					e.preventDefault();
					jQuery('nav#gpio li').removeClass('legend');	
					jQuery('nav#gpio li').removeClass('active');
					pins = '';
					title = jQuery(this).attr('title');
					url = jQuery(this).attr('href');
					page = 0;

					jQuery('span.default').show();
					jQuery('span.alternate').hide();

					switch( jQuery(this).parent().attr('class') )
					{
						case 'legend_5':
							pins = '.pin2,.pin4';
							page = 41;
							break;
						case 'legend_3':
							pins = '.pin1,.pin17';
							page = 42;
							break;
						case 'legend_ground':
							pins = '.pin6,.pin9,.pin14,.pin20,.pin25,.pin30,.pin34,.pin39';
							page = 43;
							break;
						case 'legend_uart':
							pins = '.pin8,.pin10';
							page = 44;
							break;
						case 'legend_gpio':
							pins = '.pin7,.pin11,.pin12,.pin13,.pin15,.pin16,.pin18,.pin22';
							page = 45;
							break;
						case 'legend_spi':
							pins = '.pin19,.pin21,.pin23,.pin24,.pin26';
							page = 46;
							break;
						case 'legend_atmega':
							pins = '.pin19,.pin21,.pin23,.pin24';
							page = 52;
							break;
						case 'legend_i2c':
							pins = '.pin3,.pin5,.pin27,.pin28';
							page = 47;
							break;
						case 'legend_pwm':
							pins = '.pin35,.pin33,.pin32,.pin12';
							page = 53;
							break;
						case 'legend_ladder':
							//pins = '.pin3,.pin5,.pin7,.pin11,.pin13,.pin15,.pin19,.pin21,.pin12,.pin16,.pin18,.pin22,.pin24,.pin26';
							page = 48;
							jQuery('nav#gpio ul li').each(function(){
								if( jQuery(this).find('span.legend_ladder').length > 0 )
								{
									jQuery(this).addClass('legend');
									jQuery(this).find('span.default').hide();
									jQuery(this).find('span.legend_ladder').show();
								}
							});
							break;
						case 'legend_wiringpi':
							//pins = '.pin3,.pin5,.pin7,.pin11,.pin13,.pin15,.pin19,.pin21,.pin12,.pin16,.pin18,.pin22,.pin24,.pin26';
							page = 49;
							jQuery('nav#gpio ul li').each(function(){
								if( jQuery(this).find('span.legend_wiringpi').length > 0 )
								{
									jQuery(this).addClass('legend');
									jQuery(this).find('span.default').hide();
									jQuery(this).find('span.legend_wiringpi').show();
								}
							});
							break;
						case 'legend_ledborg':
							page = 50;
							jQuery('nav#gpio ul li').each(function(){
								if( jQuery(this).find('span.legend_ledborg').length > 0 )
								{
									jQuery(this).addClass('legend');
									jQuery(this).find('span.default').hide();
									jQuery(this).find('span.legend_ledborg').show();
								}
							});
							break;
						case 'legend_clockatoo':
							page = 51;
							jQuery('nav#gpio ul li').each(function(){
								if( jQuery(this).find('span.legend_clockatoo').length > 0 )
								{
									jQuery(this).addClass('legend');
									jQuery(this).find('span.default').hide();
									jQuery(this).find('span.legend_clockatoo').show();
								}
							});
							break;
					}
					jQuery(pins).addClass('legend');
					jQuery('#pages').cycle(page);

					History.pushState({legend:jQuery(this).attr('class'),url:jQuery(this).attr('href')}, 'Raspberry Pi Pinout - ' + title, url)
				});

				jQuery('nav#gpio ul.bottom').find('li').each(function(){
					jQuery(this).find('a').on('click',function(e){	
						jQuery('span.default').show();
						jQuery('span.alternate').hide();
						jQuery('nav#gpio li').removeClass('legend');
						jQuery('#pages').cycle(jQuery(this).parent().index());
						jQuery('nav#gpio li').removeClass('active');
						jQuery(this).parent().addClass('active');
						title = jQuery(this).find('span.default').html().replace('<small>','').replace('</small>','')
.replace('<span class="phys">','Pin ').replace('</span>',': ');
						History.pushState({pin:jQuery(this).parent().index(),url:$(this).attr('href')}, title, jQuery(this).attr('href'));
						e.preventDefault();
					})
				});

				jQuery('nav#gpio ul.top').find('li').each(function(){
					jQuery(this).find('a').on('click',function(e){
						jQuery('span.default').show();
						jQuery('span.alternate').hide();
						jQuery('nav#gpio li').removeClass('legend');
						jQuery('#pages').cycle(20+jQuery(this).parent().index());
						jQuery('nav#gpio li').removeClass('active');
						jQuery(this).parent().addClass('active');
						title = jQuery(this).find('span.default').html().replace('<small>','').replace('</small>','')
.replace('<span class="phys">','Pin ').replace('</span>',': ');
						History.pushState({pin:20+jQuery(this).parent().index(),url:$(this).attr('href')}, title, jQuery(this).attr('href'));
						e.preventDefault();
					})
				});
				jQuery('h1').on('click',function(){
						jQuery('span.default').show();
						jQuery('span.alternate').hide();
						jQuery('nav#gpio li').removeClass('legend');
						jQuery('nav#gpio li').removeClass('active');
						jQuery('#pages').cycle(40);
						History.pushState({pin:40,url:'http://pi.gadgetoid.com/pinout'}, 'Raspberry Pi Pinout', '/pinout');
				});
				
				url = window.location.href.replace('http://pi.gadgetoid.com/','/');

				jQuery('a[href="' + url + '"]').click();
			});