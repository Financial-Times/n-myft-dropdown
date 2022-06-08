const timeoutIds = {};

function detectlargeHeader() {
	const largeLogo = document.querySelectorAll('.o-header--large-logo');
	return largeLogo.length > 0;
}

function attachDropdown() {
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
	const dropdownMarkup = `
		<ul class="n-myft-dropdown-menu" onclick=event.stopPropagation() role="menu">
			<li class="n-myft-dropdown-list" role="menuitem"><a href="/myft/following" tabindex="-1" data-trackable="myft-dropdown-topic-feed">Topic Feed</a></li>
			<li class="n-myft-dropdown-list" role="menuitem"><a href="/myft/saved-articles" tabindex="-1" data-trackable="myft-dropdown-saved-articles">Saved Articles</a></li>
			<li class="n-myft-dropdown-list" role="menuitem"><a href="/myft/explore" tabindex="-1" data-trackable="myft-dropdown-explore-feed">Explore Feed</a></li>
			<li class="n-myft-dropdown-list" role="menuitem"><a href="/newsletters" tabindex="-1" data-trackable="myft-dropdown-newsletters">Newsletters</a></li> 
			<li class="n-myft-dropdown-list" role="menuitem"><a href="/myft/alerts" tabindex="-1" data-trackable="myft-dropdown-contact-preferences">Contact Preferences</a></li>
		</ul>`;
	const dropdown = document.createElement('span');
	dropdown.classList.add('header-top-link-myft-dropdown');
	button.ariaHasPopup = true;
	dropdown.innerHTML = dropdownMarkup.trim();
	button.appendChild(dropdown);

	return button;
}

function setExpandedAttributes(button, expanded) {
	button.setAttribute('aria-expanded', expanded);
	const arrow = button.querySelector('.o-icons-icon--arrow-down');
	if (expanded) {
		arrow.classList.add('o-icons-icon--arrow-down--rotated');
	} else {
		arrow.classList.remove('o-icons-icon--arrow-down--rotated');
	}
	const linkItems = button.querySelectorAll('a');
	const tabValue = expanded ? 0 : -1;
	linkItems.forEach((item) => {
		item.setAttribute('tabindex', tabValue);
	});
}

function handleMoveIn(event) {
	clearTimeout(timeoutIds[event.target.id]);
}

function closeDropdown(menu) {
	clearTimeout(menu.parentElement.id);
	menu.classList.remove('header-top-link-myft-dropdown--expanded');
	setExpandedAttributes(menu.parentElement, false);
	document.body.removeEventListener('click', handleClickOutside);
	menu.parentElement.removeEventListener('mouseleave', handleMoveOut);
	menu.parentElement.removeEventListener('touchend', handleMoveOut);
}

function openDropdown(menu) {
	menu.classList.add('header-top-link-myft-dropdown--expanded');
	setExpandedAttributes(menu.parentElement, true);
	document.body.addEventListener('click', handleClickOutside);
	menu.parentElement.addEventListener('mouseleave', handleMoveOut);
	menu.parentElement.addEventListener('mouseenter', handleMoveIn);
	menu.parentElement.addEventListener('touchend', handleMoveOut);
	menu.parentElement.addEventListener('touchstart', handleMoveIn, {
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
			closeDropdown(menu);
		}
	});
}

function handleMoveOut() {
	const myFtDropdownMenus = document.querySelectorAll(
		'.header-top-link-myft-dropdown--expanded'
	);
	Object.values(myFtDropdownMenus).forEach((menu) => {
		const buttonId = menu.parentElement.id;
		timeoutIds[buttonId] = setTimeout(() => closeDropdown(menu), 3000);
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
			button.id = Math.floor(Math.random() * 10);
			const expanded = button.querySelector(
				'.header-top-link-myft-dropdown--expanded'
			);
			if (!expanded) {
				event.stopPropagation();
				openDropdown(button.lastChild, button.id);
			} else {
				closeDropdown(button.lastChild, button.id);
			}
		});
	});
}

function addMyFtDropDown() {
	const topColumnsRight = document.getElementsByClassName(
		'o-header__top-column o-header__top-column--right'
	);
	const myFtDropdown = attachDropdown();
	Object.values(topColumnsRight).forEach((elem) => {
		elem.appendChild(myFtDropdown.cloneNode(true));
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

export function init() {
	removeMyFtLink();
	addMyFtDropDown();
	addToggleEventHandler();
}
