function storycount(argument) {
    feed_cards = document.getElementsByClassName("feed-card");
    var ff = document.getElementById("filter-feed");
    var scount = document.createElement("div");
    scount.setAttribute("id", "story-count");
    scount.innerHTML = feed_cards.length + " stories fetched ✨";
    // attach after div="filter-feed"
    if (ff != null){
        ff.parentNode.insertBefore(scount, ff.nextSibling);
    }
}

function rewrite_summary(argument) {
    fs = document.getElementsByClassName("feed-summary");
    for (var i = 0; i < fs.length; i++) {
        fs[i].innerHTML = fs[i].textContent;
    }
}

function rewrite_description(argument) {
    fs = document.getElementsByClassName("feed-description");
    for (var i = 0; i < fs.length; i++) {
        fs[i].innerHTML = fs[i].textContent;
    }
}


function clear_previous_feed() {
    // remove all childs of "feed"
    const feed_div = document.getElementById("feed");
    feed_div.innerHTML = '';
    const story_count = document.getElementById("story-count");
    if (story_count != null) {
        story_count.innerHTML = '';
    }
}


function share(title, link) {
    if (navigator.share) {
        navigator.share({
                title: title,
                url: link,
            })
            .then(() => console.log('Successful Share'))
            .catch((error) => console.log('Error sharing', error));
    }
}

function get_version_info() {
    const fetchPromise = fetch('https://api.github.com/repos/Bhupesh-V/tutorialdb/releases');
    fetchPromise.then(response => {
        return response.json();
    }).then(releases => {
        version_ref = document.getElementById("version-info");
        if (version_ref != null) {
            version_ref.innerHTML = releases[0].name;
        }
        version_ref_nav = document.getElementById("version-info-nav");
        if (version_ref_nav != null) {
            version_ref_nav.innerHTML = "Version " + releases[0].name;
        }
    });
}

function copyToClip(str) {
    function listener(e) {
        e.clipboardData.setData("text/html", str);
        e.clipboardData.setData("text/plain", str);
        e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
};

function select_feed(e) {
    var curr_location = window.location.pathname;
    console.log(curr_location);
    document.getElementById("fetchfeed").href = curr_location + "?filter=" + escape(e.target.value);
}

let pwaInstalled = localStorage.getItem('pwaInstalled') == 'yes'
if (window.matchMedia('(display-mode: standalone)').matches) {
	localStorage.setItem('pwaInstalled', 'yes')
	pwaInstalled = true
}
if (window.navigator.standalone === true) {
	localStorage.setItem('pwaInstalled', 'yes')
	pwaInstalled = true
}
let deferredPrompt = null
window.addEventListener('beforeinstallprompt', (e) => {
	deferredPrompt = e
})
async function installPWA() {
	if (deferredPrompt) {
		deferredPrompt.prompt()
		deferredPrompt.userChoice.then(({
			outcome
		}) => {
			if (outcome === 'accepted') {
				console.log('Your PWA has been installed')
			} else {
				console.log('User chose to not install your PWA')
			}
			deferredPrompt = null
		})
	}
}