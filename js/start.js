var core = new pixels.Core();

core.start();

setInterval(function() {
	core.updateTime();
	core.render();
},1000*30);

$(document).ready(() => {
	let settingsVisible = false;
	let keepImage = false;
	let currentImageUrl = '';

	restore_options(['keywords', 'keepImage', 'imageUrl'], async (options) => {
		const keyworsOptions = options['keywords'];
		keepImage = options['keepImage'];
		$('#keywords').val(keyworsOptions);
		$('#keepImage').prop("checked", keepImage);
		
		if (keepImage) {
			currentImageUrl = options['imageUrl'];
		} else {
			currentImageUrl = 'https://source.unsplash.com/1920x1080/?' + keyworsOptions;
			const response = await fetch(currentImageUrl);
			currentImageUrl = response['url'];
		}
		
		$('.bg-wrapper').css('background-image', 'url(' + currentImageUrl + ')');
	});
	
	$('.settings').click(() => {
		settingsVisible = !settingsVisible;
		if (settingsVisible) {
			$('.settingsDialog').show();
		} else {
			$('.settingsDialog').hide();
		}
	});

	$('.saveButton').click(() => {
		settingsVisible = false;
		$('.settingsDialog').hide();
		save_options({keywords: $('#keywords').val().trim()});
	});

	$('.imgPreference').click(async () => {
		keepImage = !keepImage;
		save_options({keepImage: keepImage});
		$('#keepImage').prop("checked", keepImage);
		if (keepImage) {
			save_options({imageUrl: currentImageUrl});
		}
	});

});

const save_options = (options) => {
    chrome.storage.sync.set(options, () => {
		console.log('Saved Options', options);
    });
}

const restore_options = (keys, cb) => {
	chrome.storage.sync.get(keys, cb);
}
