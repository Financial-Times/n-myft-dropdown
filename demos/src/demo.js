const oTracking = require('@financial-times/o-tracking').default;
const { init: myFTDropdownInit } = require('../../');

document.documentElement.classList.add('js', 'enhanced');

oTracking.init({
	context: { product: 'next' },
	test: true,
});

oTracking.click.init('cta');

myFTDropdownInit();
