const timeoutIds = {};

function detectlargeHeader() {
	const largeLogo = document.querySelectorAll('.o-header--large-logo');
	return largeLogo.length > 0;
}

function attachButton() {
	const button = document.createElement('button');

	button.classList.add(
		`o-header__top-icon-link`,
		`o-header__top-icon-link--myft`
	);
	const largeHeader = detectlargeHeader();
	if (largeHeader) {
		button.classList.add(`o-header__top-icon-link--myft-large-header`);
	}
	const fallbackMarkup = `<span class="o-header__visually-hidden">myFT</span>
							<span class="o-icons-icon o-icons-icon--arrow-down"></span>`;
	button.innerHTML = fallbackMarkup.trim();
	button.setAttribute('data-trackable', 'myft-dropdown-open');
	button.setAttribute('data-trackable-context-text', 'myFT');
	button.ariaHasPopup = true;

	return button;
}

function attachDropdown() {
	const dropdownMarkup = `
		<ul class="n-myft-dropdown-menu" onclick=event.stopPropagation() role="menu">
			<li class="n-myft-dropdown-list" role="none"><a href="/myft/following" tabindex="-1" data-trackable="myft-dropdown-topic-feed" role="menuitem">Topic Feed</a></li>
			<li class="n-myft-dropdown-list" role="none"><a href="/myft/saved-articles" tabindex="-1" data-trackable="myft-dropdown-saved-articles" role="menuitem">Saved Articles</a></li>
			<li class="n-myft-dropdown-list" role="none"><a href="/myft/explore" tabindex="-1" data-trackable="myft-dropdown-explore-feed" role="menuitem">Explore Feed</a></li>
			<li class="n-myft-dropdown-list" role="none"><a href="/newsletters" tabindex="-1" data-trackable="myft-dropdown-newsletters" role="menuitem">Newsletters</a></li>
			<li class="n-myft-dropdown-list" role="none"><a href="/myft/alerts" tabindex="-1" data-trackable="myft-dropdown-contact-preferences" role="menuitem">Contact Preferences</a></li>
		</ul>`;
	const dropdown = document.createElement('span');
	dropdown.innerHTML = dropdownMarkup.trim();
	dropdown.classList.add('header-top-link-myft-dropdown');

	return dropdown;
}

function setExpandedAttributes(button, expanded) {
	button.setAttribute('aria-expanded', expanded);
	button.setAttribute(
		'data-trackable',
		`'myft-dropdown-${expanded ? 'close' : 'open'}'`
	);
	const arrow = button.querySelector('.o-icons-icon--arrow-down');
	if (expanded) {
		arrow.classList.add('o-icons-icon--arrow-down--rotated');
	} else {
		arrow.classList.remove('o-icons-icon--arrow-down--rotated');
	}
	const linkItems = button.nextElementSibling.querySelectorAll('a');
	const tabValue = expanded ? 0 : -1;
	linkItems.forEach((item) => {
		item.setAttribute('tabindex', tabValue);
	});
}

function handleMoveIn(event) {
	clearTimeout(timeoutIds[event.target.id]);
}
function closeDropdown(menu) {
	clearTimeout(timeoutIds[menu.id]);
	menu.classList.remove('header-top-link-myft-dropdown--expanded');
	setExpandedAttributes(menu.previousElementSibling, false);
	document.body.removeEventListener('click', handleClickOutside);
	menu.removeEventListener('mouseleave', handleMoveOut);
	menu.removeEventListener('touchend', handleMoveOut);
}

function openDropdown(menu) {
	menu.classList.add('header-top-link-myft-dropdown--expanded');
	setExpandedAttributes(menu.previousElementSibling, true);
	document.body.addEventListener('click', handleClickOutside);
	menu.addEventListener('mouseleave', handleMoveOut);
	menu.addEventListener('mouseenter', handleMoveIn);
	menu.addEventListener('touchend', handleMoveOut);
	menu.addEventListener('touchstart', handleMoveIn, {
		passive: true,
	});
}

function handleClickOutside(event) {
	const myFtDropdownMenus = document.querySelectorAll(
		'.header-top-link-myft-dropdown--expanded'
	);
	Object.values(myFtDropdownMenus).forEach((menu) => {
		const inside = menu.contains(event.target);
		if (!inside) {
			dispatchTrackingEvent({ action: 'clickOutside' });
			closeDropdown(menu);
		}
	});
}

function handleMoveOut() {
	const myFtDropdownMenus = document.querySelectorAll(
		'.header-top-link-myft-dropdown--expanded'
	);
	Object.values(myFtDropdownMenus).forEach((menu) => {
		function onMoveOut() {
			dispatchTrackingEvent({ action: 'moveOut' });
			closeDropdown(menu);
		}
		timeoutIds[menu.id] = setTimeout(onMoveOut, 3000);
	});
}

function addToggleEventHandler() {
	// this class needs to be *= as there can be a trailing space in the name
	const buttons = document.querySelectorAll(
		'button[class*="o-header__top-icon-link--myft"]'
	);
	Object.values(buttons).forEach((button) => {
		button.addEventListener('click', function (event) {
			event.preventDefault();
			const menu = button.nextElementSibling;
			menu.id = Math.floor(Math.random() * 10);
			const expanded = button.parentElement.querySelector(
				'.header-top-link-myft-dropdown--expanded'
			);
			dispatchTrackingEvent({ action: expanded ? 'close' : 'open' });
			if (!expanded) {
				event.stopPropagation();
				openDropdown(menu);
			} else {
				closeDropdown(menu);
			}
		});
	});
}

function addMyFtDropDown() {
	const topColumnsRight = document.getElementsByClassName(
		'o-header__top-column o-header__top-column--right'
	);
	const myFtButton = attachButton();
	const myFtDropdown = attachDropdown();
	Object.values(topColumnsRight).forEach((elem) => {
		elem.append(myFtButton.cloneNode(true), myFtDropdown.cloneNode(true));
		elem.classList.add('o-header__top-column--right--myft-dropdown');
	});
}

function removeMyFtLink() {
	const myFtLinks = document.querySelectorAll(
		'[class="o-header__top-column--right--myft-dropdown"], a[class*="o-header__top-icon-link--myft"]'
	);
	Object.values(myFtLinks).forEach((link) => {
		link.remove();
	});
}

function addTrackingEventHandlers() {
	const myFtDropdownLinks = document.querySelectorAll(
		'.n-myft-dropdown-list > a'
	);
	Object.values(myFtDropdownLinks).forEach((link) => {
		link.addEventListener('click', function () {
			dispatchTrackingEvent({ action: 'click', text: link.text });
		});
	});
}

function dispatchTrackingEvent({ action, text }) {
	document.body.dispatchEvent(
		new CustomEvent('oTracking.event', {
			detail: {
				category: 'myFTDropdown',
				teamName: 'customer-products-us-growth',
				amplitudeExploratory: true,
				action,
				...(text && { text }),
			},
			bubbles: true,
		})
	);
}

export function init() {
	removeMyFtLink();
	addMyFtDropDown();
	addToggleEventHandler();
	addTrackingEventHandlers();
}
