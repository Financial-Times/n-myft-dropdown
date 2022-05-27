function attachDropdown() {
	const dropdownMarkup = `<ul class="n-myft-dropdown-menu" onclick="event.stopPropagation()">
			<li class="n-myft-dropdown-list"><a href="/myft/following">Topic Feed</a></li>
			<li class="n-myft-dropdown-list"><a href="/myft/saved-articles">Saved Articles</a></li>
			<li class="n-myft-dropdown-list"><a href="/myft/explore">Explore Feed</a></li>
			<li class="n-myft-dropdown-list"><a href="/newsletters">Newsletters</a></li> 
			<li class="n-myft-dropdown-list"><a href="/myft/alerts">Contact Preferences</a></li>
		</ul>`;
	const dropdown = document.createElement('span');
	dropdown.classList.add('header-top-link-myft-dropdown');
	dropdown.innerHTML = dropdownMarkup.trim();
	return dropdown;
}

function handleClickOutside() {
	const myFtDropdownMenus = document.querySelectorAll(
		'.header-top-link-myft-dropdown'
	);
	Object.values(myFtDropdownMenus).forEach((menu) => {
		menu.remove();
	});
}

function addEventHandler() {
	const myFtIcons = document.getElementsByClassName(
		'o-header__top-column o-header__top-column--right'
	);

	Object.values(myFtIcons).forEach((icon) => {
		icon.addEventListener('click', function (event) {
			event.preventDefault();
			const childMenu = icon.querySelector('.header-top-link-myft-dropdown');
			if (childMenu) {
				icon.removeChild(childMenu);
				return;
			}
			const myFtDropdown = attachDropdown();
			icon.appendChild(myFtDropdown);
			event.stopPropagation();
			document.body.addEventListener('click', handleClickOutside);
		});
	});
}

export function init() {
	addEventHandler();
}
