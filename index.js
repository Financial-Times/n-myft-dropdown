function attachDropdown() {
	const dropdownMarkup = `<ul class="n-myft-dropdown-list" onclick="event.stopPropagation()">
			<li><a href="/myft/following">Topic Feed</a></li>
			<li><a href="/myft/saved-articles">Saved Articles</a></li>
			<li><a href="/myft/explore">Explore Feed</a></li>
			<li><a href="/newsletters">Newsletters</a></li> 
			<li><a href="/myft/alerts">Contact Preferences</a></li>
		</ul>`;
	const dropdownMenu = document.createElement('span');
	dropdownMenu.classList.add('header-top-link-myft-dropdown');
	dropdownMenu.innerHTML = dropdownMarkup.trim();
	return dropdownMenu;
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
			const myFtDropDownMenu = attachDropdown();
			icon.appendChild(myFtDropDownMenu);
			event.stopPropagation();
		});
		document.body.addEventListener('click', handleClickOutside);
	});
}

export function init() {
	addEventHandler();
}
