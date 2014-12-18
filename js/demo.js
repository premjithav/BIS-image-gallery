/*
 * Bootstrap Image Gallery JS Demo 3.0.1
 * https://github.com/blueimp/Bootstrap-Image-Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint unparam: true */
/*global blueimp, $ */

$(function () {
    'use strict';	 
    // Load demo images from flickr:
	var count=0;
    $.ajax({
        // Flickr API is SSL only:
        // https://code.flickr.net/2014/04/30/flickr-api-going-ssl-only-on-june-27th-2014/
        url: 'https://api.flickr.com/services/rest/',
        data: {
            format: 'json',
            method: 'flickr.photosets.getList',
            api_key: 'e060d5ec1a80847b557707990d0e620c',	 
			user_id: '95937455@N02'	
        },
        dataType: 'jsonp',
        jsonp: 'jsoncallback'
    }).done(function (result) {		
		for (var i = 1; i <= result.photosets.total; i++) {
			$("#album").append("<div id=\"title-"+i+"\"></div><div id=\"link-"+i+"\"></div><br/>")
			}
        // Add the demo images as links with thumbnails to the page:
        $.each(result.photosets.photoset, function (index, photoset) {	
			//alert(JSON.stringify(photoset.title));	
			//alert(photoset.title._content);
			
		$.ajax({
				// Flickr API is SSL only:
				// https://code.flickr.net/2014/04/30/flickr-api-going-ssl-only-on-june-27th-2014/
				url: 'https://api.flickr.com/services/rest/',
				data: {
					format: 'json',
					method: 'flickr.photosets.getPhotos',
					api_key: 'e060d5ec1a80847b557707990d0e620c',	 
					photoset_id: photoset.id
				},
				dataType: 'jsonp',
				jsonp: 'jsoncallback'
			}).done(function (result1) {
			count++;
			var link = "#link-"+count;	
			var title = "#title-"+count;
			var linksContainer = $(link), baseUrl;
			var titleh4 = $(title);
				//$(">3434").appendTo(titleh4);
				$("<h4>"+photoset.title._content+"</h4>").appendTo(titleh4);
				// Add the demo images as links with thumbnails to the page:
				$.each(result1.photoset.photo, function (index, photo) {
				
					baseUrl = 'https://farm' + photo.farm + '.static.flickr.com/' +
						photo.server + '/' + photo.id + '_' + photo.secret;
						$('<a/>')
						.append($('<img>').prop('src', baseUrl + '_s.jpg'))
						.prop('href', baseUrl + '_b.jpg')
						.prop('title', photo.title)
						.attr('data-gallery', '')
						.appendTo(linksContainer);
				});
				linksContainer.on('click', function () {      
					$('#blueimp-gallery').data('useBootstrapModal', false);
					$('#blueimp-gallery').toggleClass('blueimp-gallery-controls', true);
				});
			
			});	
        });
    });
/* smooth scrolling for scroll to top */
$('.scroll-top').click(function(){
  $('body,html').animate({scrollTop:0},1000);
})

});

 $(document).ready(function(){
        $('.social-feed-container').socialfeed({
                    // FACEBOOK
                   facebook:{
                        accounts: ['@1324794350'],
                        limit: 8,
                        access_token: '1510612695853139|d5fa8fd9e08af3a008af652d5568a693' // APP_ID|APP_SECRET
                    },
                    //GOOGLEPLUS
                    google:{ 
                        accounts: ['@+premjithav'],
                        limit: 2,
                        access_token: 'AIzaSyDh6jJEV7IwGuiUR4Qr__lxEUgI36VRmQ0'
                    },
                    /* Twitter
                    twitter:{
                        accounts: ['@premjithav'],
                        limit: 4,
                        consumer_key: 'eZe0Sk4GdH7LKWTlotow', // make sure to have your app read-only
                        consumer_secret: 'j35RWFf6JntvQP9qEWfdzroVCpz4YLnWWIhrdlNw', // make sure to have your app read-only
                     },
                    // VKONTAKTE
                    vk:{
                        accounts:['#dolomiti'],
                        limit:2,
                        source:'all'
                    },
                    // INSTAGRAM
                    instagram:{
                        accounts:['#dolomiti'],
                        limit:2,
                        client_id:'2c6d2173ae9d41de905236e6301e5a43'
                    },
                    */
                    // GENERAL SETTINGS
                    length:200,
                    show_media:true,
                    // Moderation function - if returns false, template will have class hidden
                    moderation: function(content){
                        return  (content.text) ? content.text.indexOf('fuck') == -1 : true;
                    },
                    //update_period: 5000,
                    // When all the posts are collected and displayed - this function is evoked
                    callback: function(){
                        console.log('all posts are collected');
                    }
                });
});

/*
$(function () {
    'use strict';	 
    // Load demo images from flickr:
    $.ajax({
        // Flickr API is SSL only:
        // https://code.flickr.net/2014/04/30/flickr-api-going-ssl-only-on-june-27th-2014/
        url: 'https://api.flickr.com/services/rest/',
        data: {
            format: 'json',
            method: 'flickr.people.getPublicPhotos',
            api_key: 'e060d5ec1a80847b557707990d0e620c',
	    user_id: '95937455@N02',
	    per_page: '500'
        },
        dataType: 'jsonp',
        jsonp: 'jsoncallback'
    }).done(function (result) {
        var linksContainer = $('#links'),
            baseUrl;
        // Add the demo images as links with thumbnails to the page:
        $.each(result.photos.photo, function (index, photo) {
            baseUrl = 'https://farm' + photo.farm + '.static.flickr.com/' +
                photo.server + '/' + photo.id + '_' + photo.secret;
            $('<a/>')
                .append($('<img>').prop('src', baseUrl + '_s.jpg'))
                .prop('href', baseUrl + '_b.jpg')
                .prop('title', photo.title)
                .attr('data-gallery', '')
                .appendTo(linksContainer);
        });
    });

    $('#links').on('click', function () {      
        $('#blueimp-gallery').data('useBootstrapModal', false);
        $('#blueimp-gallery').toggleClass('blueimp-gallery-controls', true);
    });
});*/
