// sticky header
// *crossbrowser addEventListener(scroll || DOMMouseScroll )
//let header = document.querySelector('header');
let firstScreen = document.querySelector('#home');
let firstScreenTop = firstScreen.offsetHeight;
let arrow = document.querySelector('.top_link');
let skillsScreen = document.querySelector('.skills');
let skillsTop = skillsScreen.offsetTop - 200;
let progressbars = document.getElementsByClassName('progress');
let statScreen = document.querySelector('.stats');
let statsTop = statScreen.offsetTop - 200;
let statItems = document.querySelectorAll('.count');

window.onscroll = function(){
	if(window.scrollY >= firstScreenTop){
		header.classList.add('sticky');	
	}
	else {
		header.classList.remove('sticky');
		arrow.style.display = 'none';
	}
	scrollHandler();
}

let arrowVisible = false;
let progressAnimated = false;
let statsAnimated = false;

//handling scroll 
function scrollHandler(){
	let scrollTop = document.documentElement.scrollTop ||
	document.scrollingElement.scrollTop;

	if(scrollTop < window.innerHeight ){
		arrow.style.display = 'none';
	}
	if(scrollTop > window.innerHeight ){
		arrow.style.display = 'flex';
	}
	if(scrollTop > skillsTop && !progressAnimated){
		progressAnimated = true;
		for(let current of progressbars){
			animateProgress(current);
		}
	}
	if(scrollTop > statsTop && !statsAnimated){
		statsAnimated = true;
		for(let current of statItems){
			animateStats(current);
		}
	}
}

// loader
let loader = document.getElementById('loader');
// document.addEventListener('DOMContentLoaded', function(){
// 	loader.style.display = 'none';
// });

setTimeout(function(){
	loader.style.display = 'none';
},400);

// smooth anchor scrolling

document.addEventListener('click', function(event){
	if(event.target.classList.contains('smooth')){
		if(window.innerWidth > 1024 || screen.width > 1024 ){
			event.preventDefault();
		}
		let targetAnchor = event.target.getAttribute('href');
		let targetElem = document.querySelector(targetAnchor);
		let targetTop = targetElem.offsetTop;
		window.scrollTo({
			left: 0,
			top: targetTop,
			behavior: 'smooth'
		});
	}
// scroll totop
	if(event.target.classList.contains('top_link') ||
	 event.target.parentNode.classList.contains('top_link')){
		window.scrollTo({
			left: 0,
			top: 0,
			behavior: 'smooth'
		});
		// tip for IOS Safari
		if(window.innerWidth <= 1024 || screen.width <= 1024 ){
			document.body.scrollTop = 0; // For Safari
			window.location.hash = 'htop';
		}
	}
});


// progressbars

function animateProgress(elem){
	let max = +elem.getAttribute('data-value');
	let currentProgress = 0;

	let timerID = setInterval(function(){
		if(currentProgress <= max){
			elem.style.width = `${currentProgress}%`;
			currentProgress++;
		}
		else{
			clearInterval(timerID);
		}
	}, 14);
}


// stats counters

function animateStats(elem){
	let max = +elem.getAttribute('data-count');
	let current = 0;
	let maxtime = 1500;


	let interval = setInterval(function(){
		if(current <= max){
			elem.innerText = current;
			current++;
		}
		else{
			clearInterval(interval);
		}
	}, maxtime/max);
}


// portfolio load more

let portfolioItems = document.querySelectorAll('.portfolio_item');
let loadMoreBtn = document.querySelector('.works .btn_white');
let worksShown = 6;
let toggleVisible = 6;

loadMoreBtn.onclick = () => {
	for(let i = worksShown; i < worksShown+toggleVisible; i++){
		portfolioItems[i].style.display = 'block';
	}
}


// HW Load More -> hide button in the end, check if count%6 !=0