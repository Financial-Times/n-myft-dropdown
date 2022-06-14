function detectLargeMenu() {
	const largeLogo = document.querySelectorAll('.o-header--large-logo');
	return largeLogo.length > 0;
}

function attachDropdown() {
	const button = document.createElement('button');
	const largeMenu = detectLargeMenu();
	button.classList.add(
		`o-header__top${largeMenu ? '-icon' : ''}-link`,
		`o-header__top${largeMenu ? '-icon' : ''}-link--myft`
	);
	const fallbackMarkup = `<span class="o-header__visually-hidden">myFT</span>
							<span class="o-icons-icon o-icons-icon--arrow-down"></span>`;
	button.innerHTML = fallbackMarkup.trim();
	const dropdownMarkup = `
		<ul class="n-myft-dropdown-menu" onclick="event.stopPropagation()">
			<li class="n-myft-dropdown-list"><a href="/myft/following">Topic Feed</a></li>
			<li class="n-myft-dropdown-list"><a href="/myft/saved-articles">Saved Articles</a></li>
			<li class="n-myft-dropdown-list"><a href="/myft/explore">Explore Feed</a></li>
			<li class="n-myft-dropdown-list"><a href="/newsletters">Newsletters</a></li> 
			<li class="n-myft-dropdown-list"><a href="/myft/alerts">Contact Preferences</a></li>
		</ul>`;
	const dropdown = document.createElement('span');
	dropdown.classList.add('header-top-link-myft-dropdown');
	dropdown.innerHTML = dropdownMarkup.trim();
	button.appendChild(dropdown);

	return button;
}

function setExpandedAttributes(button, expanded) {
	button.setAttribute('aria-expanded', expanded);
	const arrow = button.getElementsByClassName('o-icons-icon--arrow-down')[0];
	if (expanded) {
		arrow.classList.add('__rotated');
	} else {
		arrow.classList.remove('__rotated');
	}
}

function closeDropdown(menu) {
	menu.classList.remove('__expanded');
	setExpandedAttributes(menu.parentElement, false);
	document.body.removeEventListener('click', handleClickOutside);
	menu.parentElement.removeEventListener('mouseleave', handleMouseOut);
}

function openDropdown(menu) {
	menu.classList.add('__expanded');
	setExpandedAttributes(menu.parentElement, true);
	document.body.addEventListener('click', handleClickOutside);
	menu.parentElement.addEventListener('mouseleave', handleMouseOut);
}

function handleClickOutside(event) {
	const myFtDropdownMenus = document.querySelectorAll(
		'.header-top-link-myft-dropdown.__expanded'
	);
	Object.values(myFtDropdownMenus).forEach((menu) => {
		const inside = menu.contains(event.target);
		if (!inside) {
			closeDropdown(menu);
		}
	});
}

function handleMouseOut() {
	const myFtDropdownMenus = document.querySelectorAll(
		'.header-top-link-myft-dropdown.__expanded'
	);
	Object.values(myFtDropdownMenus).forEach((menu) => {
		setTimeout(() => closeDropdown(menu), 3000);
	});
}

function addEventHandler() {
	const buttons = document.querySelectorAll('button[class*="-link--myft"]');
	Object.values(buttons).forEach((button) => {
		button.addEventListener('click', function (event) {
			event.preventDefault();
			const expanded = button.getElementsByClassName('__expanded');
			if (expanded.length === 0) {
				event.stopPropagation();
				openDropdown(button.lastChild);
			} else {
				closeDropdown(button.lastChild);
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
	const myFtLinks = document.querySelectorAll('a[class*="-link--myft"]');
	Object.values(myFtLinks).forEach((link) => {
		link.remove();
	});
}

export function init() {
	removeMyFtLink();
	addMyFtDropDown();
	addEventHandler();
}
