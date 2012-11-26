

enyo.kind({
	name: "App",
	kind: "FittableRows",
	classes: "enyo-fit",
	components:[
		{kind: "onyx.MoreToolbar", components: [
			{kind: "onyx.Grabber"},
			{content: "Apps By Chris"},
			{kind: "onyx.Button", classes: "onyx-affirmative", ontap: "openLink", url: "http://appsbychris.net/blog", content: "View Blog"},
			{kind: "onyx.Button", classes: "onyx-affirmative", ontap: "openLink", url: "http://appsbychris.net/github", content: "View Github"}
		]},
		{kind: "expandable.RadioGroup", components: [
			{ classes: "onyx-affirmative", ontap: "changePanels", index: 0, content: "Slideshow HD", active: true},
			{ classes: "onyx-affirmative", ontap: "changePanels", index: 1, content: "Chore Tracker"},
		
			{ classes: "onyx-affirmative", ontap: "changePanels", index: 2, content: "Peek-A-Dash"},
			{ classes: "onyx-affirmative", ontap: "changePanels", index: 3, content: "Two Outta Three"}
		]},
		{kind: "Panels", name:"panels", fit:true, realtimeFit: true,  arrangerKind: "CollapsingArranger", classes: "enyo-border-box", components: [
			{kind: "Scroller",horizontal: "hidden", classes: "panel-back", components:[
				{content: "Slideshow Presentation HD for webOS", classes: "main-header"},
				{classes: "link-format", allowHtml: true, content: "<a href=\"https://developer.palm.com/appredirect/?packageid=com.chrisvanhooser.slideshowpresentationhd\">Download</a>"},
				{kind: "Image", style: "max-width:60%;", src: "assets/slideshow.png"},
				{allowHtml: true, classes: "body-content", content: "<p> Create stunning and custom slideshows and photo projects that you can set to music. Turns your TouchPad into a beautiful digital photo frame! <br/> Features include: <br/> * Cinematic mode adds panning of pictures (8 different modes!) <br/> * Set a show up to change pics on a timed duration, on song change, manually, or each picture can have its own duration. <br/> * You can have as many different projects as you want! <br/> * Handles 1000s of pictures without a problem! <br/> * Sorting by File name, path, or both. You can also have a custom order, or have it random <br/> * Captions: Per-picture, Global, EXIF info, Date &amp; Time, File Name / Path / Both, Song Name <br/> * You can set the captions to display in any color, and place it on the top or bottom of the pic. <br/> * 32 different transitions, with 5 speeds for each. <br/> * Stretch or Maintain aspect ratio (can set per-pic as well) <br/> * Rotate picture in 90degree increments! <br/> * Live Preview of image in edit mode! <br/> * Show duration (play once, repeat, end with music) <br/> * Plays in landscape or portrait <br/> * Add pics by folder (can include subfolders and hidden files), or add 1 by 1 <br/> * Swipe to advance or go back while show is running <br/> * Pinch-Zoom on images <br/> * Exhibition compatible <br/> * Quick and easy to setup! </p> <p> You can change just about any setting you want, and show off your photos to your friends in style! </p>"}
			]},
			{kind: "Scroller",horizontal: "hidden", classes: "panel-back", components:[
				{content: "Chore Tracker Pro for webOS", classes: "main-header"},
				{classes: "link-format", allowHtml: true, content: "<a href=\"https://developer.palm.com/appredirect/?packageid=com.chrisvanhooser.choretrackerpro\">Download</a>"},
				{kind: "Image", style: "max-width:60%;", src: "assets/chore.png"},
				{allowHtml: true, classes: "body-content", content: "<p> Get your life back on track with Chore Tracker Pro. <br/> ***Phone users! This app requires Enyo!*** <br/> *New 1.0.5 features: <br/> Items now can have tags, and you can filter which items you see by the tags! <br/> Touchpad version has split-screen mode, where you can view up to 6 different tag filters at once! <br/> Ability to add task that will delete by itself after you have completed it. Can set from 1 to 100 times. <br/> More icons! <br/> Chore Tracker Pro keeps track of your chores and task on an interval basis. You can set an interval from 1 hour up to 100 years! You can also set task to be done on a certain day. <br/> Chore Tracker Pro will display your entered task with a colorful progress bar indicating how much time is left. You can sort by due date, most recently completed, danger zone, custom order, by its name, or by ABC order. You can select 1 of 70 included pictures to represent the task. You can set a daily alarm to give you a list of your chores for the day, or to notify you if you have any items past-due. <br/> When you complete a task, hit the thumb's up icon and the interval will start over. The app will keep track how many times you completed the task on time, had an item go past due, and the total number of times you've completed a task. <br/> This app will work on every webOS device that has Enyo installed. <br/> You can sync between devices with a Box.net account. Box.net syncing also works as data backup so you won't lose your data! The Touchpad version shows an expanded view of each item. <br/> Don't wait; get your life back on track with Chore Tracker Pro! </p>"}
			]},
			{kind: "Scroller",horizontal: "hidden", classes: "panel-back", components:[
				{content: "Peek-A-Dash for webOS", classes: "main-header"},
				{classes: "link-format", allowHtml: true, content: "<a href=\"https://developer.palm.com/appredirect/?packageid=com.chrisvanhooser.peekadash\">Download</a>"},
				{kind: "Image", style: "max-width:60%;", src: "assets/peek.png"},
				{allowHtml: true, classes: "body-content", content: "<p> Explore tumblr in a new way with Peek-A-Dash. Works for all webOS devices with Enyo. On the TouchPad, Peek-A-Dash is a multitasking friendly popup window. The popup works with any window you have open so you don’t have to stop what you are doing to check on a post! The popup can be accessed at any time from your notifications. Peek-A-Dash’s main function is to view your dashboard posts; though you can also browse any blog you can find a link to in Peek-A-Dash. You can pair the popup with the included Mini Browser that will allow you to browse through posts and view the ones you want, right from the poster’s blog page! You can create categories and sort your favorite blogs between them to view only the posts from the blogs in your category. Peek-A-Dash also allows you to select any blog and explore it, right through the popup window. You can also like and reblog (or queue or save as a draft) posts instantly. <br/> On the phone: Peek-A-Dash launches in its own card and acts like a normal app. It will have almost the same experience as the TouchPad, except there is no Mini-Browser. <br/> Simply swipe left and right to move between posts. Peek-A-Dash supports endless scrolling so you can keep on reading. <br/> You can also set it to let you know if there have been any new posts. <br/> You must have a tumblr.com account to use this app. </p> "}
			]},
			{kind: "Scroller",horizontal: "hidden", classes: "panel-back", components:[
				{content: "Two Outta Three for webOS", classes: "main-header"},
				{classes: "link-format", allowHtml: true, content: "<a href=\"https://developer.palm.com/appredirect/?packageid=com.chrisvanhooser.twoouttathree\">Download</a>"},
				{kind: "Image", style: "max-width:60%;", src: "assets/2o3.png"},
				{allowHtml: true, classes: "body-content", content: "<p> Two Outta Three! is a classic coin flip game where you can bet on the out-come of each toss of the coin. The object of the game is to win 3 of 5 rounds. Each round, there can be up to 3 coin flips. You need to win 2 of them to win the round. Each flip has a bonus multiplier that will multiply your winnings and bonuses, ranging from x0 to x5! If you win the flip, you get gain what you bet, plus what your opponent bet! Try and get all the gold coins you can to be #1 on the top ten list, but don’t run out, or it is game over! There are 3 different coins you can choose from, and you can change them at any time, even when the coin is in motion. Sound effects can be toggled on and off. You can play against a friend, or you can try and beat the Touchpad itself! This app won the App-Hack contest for “Three” <br/> <br/> <br/> </p> "}
			]}
		]}
		
	],
	openLink: function(iS, iE) {
		window.location = iS.url;
	},
	changePanels: function(iS, iE) {
		this.$.panels.setIndex(iS.index);
	}
});
