function attachDropdown() {
	const button = document.createElement('button');
	button.classList.add('o-header__top-link', 'o-header__top-link--myft');
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

function setExpandedAttributes(expanded) {
	const myFtIcons = document.getElementsByClassName(
		'o-header__top-link o-header__top-link--myft'
	);
	Object.values(myFtIcons).forEach((icon) => {
		icon.setAttribute('aria-expanded', expanded);
		const arrow = icon.getElementsByClassName('o-icons-icon--arrow-down')[0];
		if (expanded) {
			arrow.classList.add('__rotated');
		} else {
			arrow.classList.remove('__rotated');
		}
	});
}

function toggleVisibility(element) {
	const dropdownElement = element.querySelector(
		'.header-top-link-myft-dropdown'
	);
	const dropdownClasses = dropdownElement.classList;
	return dropdownClasses.toggle('__expanded');
}

function handleClickOutside(event) {
	const myFtDropdownMenus = document.querySelectorAll(
		'.header-top-link-myft-dropdown.__expanded'
	);
	Object.values(myFtDropdownMenus).forEach((menu) => {
		const inside = menu.contains(event.target);
		if (!inside) {
			menu.classList.remove('__expanded');
			setExpandedAttributes(false);
			document.body.removeEventListener('click', handleClickOutside);
		}
	});
}

function addEventHandler() {
	const topColumnsRight = document.getElementsByClassName(
		'o-header__top-column o-header__top-column--right'
	);
	Object.values(topColumnsRight).forEach((element) => {
		element.addEventListener('click', function (event) {
			event.preventDefault();
			const expanded = toggleVisibility(element);
			if (expanded) {
				event.stopPropagation();
				document.body.addEventListener('click', handleClickOutside);
				setExpandedAttributes(true);
			} else {
				setExpandedAttributes(false);
				document.body.removeEventListener('click', handleClickOutside);
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
	});
}

function removeMyFtLink() {
	const myFtLinks = document.querySelectorAll('a.o-header__top-link--myft');
	Object.values(myFtLinks).forEach((link) => {
		link.remove();
	});
}

export function init() {
	removeMyFtLink();
	addMyFtDropDown();
	addEventHandler();
}
