
enyo.kind({
	name: "DropInView",
	kind: "Slideable",
	unit: "px",
	axis: "v",
	classes: "slideable-absolute",
	draggable: false,
	havndlers: {
		onAnimateFinish: "hideMe"
	},
	min: -1 * enyo.dom.getWindowHeight(),
	max: 0,
	value: -1 * enyo.dom.getWindowHeight(),
	components:[
		
	],
	opened: false,
	showing: true,
	create: function() {
		this.inherited(arguments);
		this.resizeHandler();
	},
	showView: function() {
		var h = enyo.dom.getWindowHeight();
		this.max = 0;
		this.min = h * -1;
		this.value = this.min;
		this.show();
		this.opened = true;
		this.animateToMax();
	},
	hideView: function() {
		var h = enyo.dom.getWindowHeight();
		this.max = h;
		this.opened = false;
		this.animateToMax();
	},
	hideMe: function() {
		if (this.opened === false) {
			this.hide();	
		}
		
	},
	resizeHandler: function() {
		this.inherited(arguments);
		var h = enyo.dom.getWindowHeight();
		this.applyStyle("height", h + "px");
		this.setMin(h * -1);
		if (this.opened === false) {
			this.setValue(h * -1);
		}
	}
});
enyo.kind({
	name: "AppPicker",
	kind: "FittableRows",
	published: {
		iconSrc: "",
		iconText: "",
		iconDesc: "",
		iconPrice: "",
		small: false
	},
	classes: "enyo-center app-icon",
	components: [
		{kind: "Image", name: "image", style: "width:200px;height:200px;"},
		{name: "price", classes: "app-detail-price app-picker-price"},
		{name: "text", classes: "main-header"},
		{name: "desc", classes: "desc-text"}

	],
	create: function() {
		this.inherited(arguments);
		this.smallChanged();
		this.iconSrcChanged();
		this.iconTextChanged();
		this.iconDescChanged();
		this.iconPriceChanged();
	},
	iconPriceChanged: function() {
		this.$.price.setContent(this.iconPrice);
	},
	smallChanged: function() {
		if (this.small === true) {
			this.$.image.setStyle("width:64px;height:64px;");
			this.$.text.applyStyle("font-size", "150%");
		}
	},
	iconSrcChanged: function() {
		this.$.image.setSrc(this.iconSrc);
		
	},
	iconTextChanged: function() {
		this.$.text.setContent(this.iconText);
	},
	iconDescChanged: function() {
		this.$.desc.setContent(this.iconDesc);
	}
});
enyo.kind({
	name: "AppDetailView",
	kind: "DropInView",
	style: "width:100%;",
	published: {
		appIcon: "",
		appTitle: "",
		appDesc: "",
		appScreenShots: [],
		appPromo: "",
		appHelpLink: "",
		appPrice: "",
		appPromoText: "",
		linkAndroid: "",
		linkBlackBerry: "",
		linkWebOs: ""
	},
	components: [
		{kind: "FittableRows", style: "height:100%", components:[
			{kind: "FittableColumns", style: "width:100%;",noStretch: true,classes: "app-detail-top", components: [
				{kind: "Image", name: "icon", classes: "app-detail-icon"},
				{name: "title", classes: "app-detail-title", fit: true},
				{kind: "FittableRows", classes: "app-detail-store", components:[
					{name: "links"},
					{name: "price", classes: "app-detail-price"}
				]}
			]},
			{kind: "Scroller", horizontal: "hidden", fit: true, components: [
				{kind: "FittableRows", components:[
					{name: "promoText", classes: "app-detail-promo-text"},
					{style:"text-align:center;width:100%;", components:[
						{kind: "Image",name: "promoImage", classes: "app-detail-promo-image"}
					]},
					{name: "desc", classes: "app-detail-desc", allowHtml: true},
					{name: "screenShots", style: "text-align: center;"}

				]},

			]}
		]},	
		
		

	],
	create: function() {
		this.inherited(arguments);
		this.appScreenShotsChanged();
		this.appIconChanged();
		this.appPriceChanged();
		this.appTitleChanged();
		this.appDescChanged();
		this.appPromoChanged();
		this.appPromoTextChanged();
		this.appHelpLinkChanged();
		this.linkAndroidChanged();
		this.linkBlackBerryChanged();
		this.linkWebOsChanged();
	},
	appPriceChanged: function() {
		if (this.appPrice.length > 0) {
			this.$.price.setContent(this.appPrice);
		}
	},
	appIconChanged: function() {
		this.$.icon.setSrc(this.appIcon);
	},
	appTitleChanged: function() {
		this.$.title.setContent(this.appTitle);
		
	},
	appDescChanged: function() {
		this.$.desc.setContent(this.appDesc);
	},
	appScreenShotsChanged: function() {
		var c = [];
		for (var i = 0; i < this.appScreenShots.length; i++) {
			if (this.appScreenShots[i].length > 0) {
				c.push({
					kind: "Image",
					classes: "app-detail-screenshot",
					noEvents: true,
					src: this.appScreenShots[i]
				});
			}
		}
		if (c.length > 0) {
			this.$.screenShots.destroyClientControls();
			this.$.screenShots.createComponents(c, {owner: this});
			this.$.screenShots.render();
		}
	},
	appPromoChanged: function() {
		this.$.promoImage.setSrc(this.appPromo);
	},
	appHelpLinkChanged: function() {

	},
	appPromoTextChanged: function() {
		this.$.promoText.setContent(this.appPromoText);
	},
	linkAndroidChanged: function() {
		if (this.linkAndroid.length > 0) {
			this.$.links.destroyClientControls();
			this.$.links.createComponent({
				kind: "Image",
				noEvents: true,
				src: "https://developer.android.com/images/brand/en_generic_rgb_wo_45.png",
				linkTo: this.linkAndroid,
				ontap: "openLink",
				classes: "app-detail-link",
				owner: this
			}).render();
		}
	},
	linkBlackBerryChanged: function() {
		if (this.linkBlackBerry.length > 0) {
			this.$.links.destroyClientControls();
			this.$.links.createComponent({
				kind: "Image",
				noEvents: true,
				src: "assets/bb-badge.jpg",
				linkTo: this.linkBlackBerry,
				ontap: "openLink",
				classes: "app-detail-link",
				owner: this
			}).render();
		}
	},
	linkWebOsChanged: function() {
		if (this.linkWebOs.length > 0) {
			this.$.links.destroyClientControls();
			this.$.links.createComponent({
				kind: "Image",
				noEvents: true,
				src: "assets/webos.jpg",
				linkTo: this.linkWebOs,
				classes: "app-detail-link",
				ontap: "openLink",
				owner: this
			}).render();
		}
	},
	openLink: function(iS, iE) {
		window.open(iS.linkTo);
	}
});

enyo.kind({
	kind: "AppDetailView",
	name: "appDetailBlogWalker",
	appIcon: "assets/blogwalker/blogwalkericon.png",
	appTitle: "blogWalker",
	appDesc: "<p> Categorize tumblr your way! blogWalker lets you create custom categories of tags and blogs so you can view content that is related. For example, you can make a category all about your favorite animals, or animal breeds, and then just list the tags in a category. blogWalker will search out those tags on tumblr, sort them all together by date, and then show them to you from newest to oldest. blogWalker supports endless scrolling, so you can keep on view posts! blogWalker also features side scrolling to view post, instead of the same old vertical scrolling you see everywhere. Don&#8217;t want to bother with categories, and are bored with what&#8217;s on your dashboard? blogWalker has a Random mode &#8211; which will search out random tags and blogs, stick them all together and let you browse through. </p> <p> blogWalker connects to your tumblr.com account, and lets you view, reblog, like, and share posts from tumblr through text or email. You can view posts from users without actually having to follow them and clutter up your dashboard by adding them to a category. You can use blogWalker to view specific blogs, tags, categories you&#8217;ve created, or your dashboard. </p> <p> blogWalker is the perfect companion for tumblr on your mobile devices! You can reblog and like posts instantly. You can queue posts, save them as drafts, and add comments and tags to any of the blogs that are associated with your account. Media content can launch into your device&#8217;s browser to view videos or listen to songs. </p> <p> Navigate through posts by flicking left and right, or use the simple navigation buttons. There is also a (mostly) full screen mode where all toolbars can be hidden. blogWalker keeps track of your last viewed post, so you can always get back to where you left off. You can view your dashboard, explore a tag, then explore a category, and then explore a blog, and then get back to each post in the section where you left off. blogWalker lets you dig deep into the depths of tumblr and see some awesome content posted by fellow tumblr users. </p> <p> blogWalker requires you have a tumblr.com account. It only takes a minute to sign up. </p>",
	appScreenShots: ["assets/blogwalker/ss1.png","assets/blogwalker/ss2.png","assets/blogwalker/ss3.png","assets/blogwalker/ss4.png"],
	appPromo: "assets/blogwalker/promo.jpg",
	appHelpLink: "",
	appPrice: "$0.99",
	appPromoText: "Categorize tumblr your way!",
	linkAndroid: "",
	linkBlackBerry: "",
	linkWebOs: ""
});
enyo.kind({
	kind: "AppDetailView",
	name: "appDetailBlogWalkerFree",
	appIcon: "assets/blogwalker/blogwalkericon.png",
	appTitle: "blogWalker Free",
	appDesc: "<p> Free version has these limitations: <br/> No tag search or random modes <br/> Cannot add, delete, or rename categories. (There are 9 pre-made categories that you can change who's in each one) <br/> Will take longer for updates. </p> <p> Try it out, and upgrade when you love it! </p><p> Categorize tumblr your way! blogWalker lets you create custom categories of tags and blogs so you can view content that is related. For example, you can make a category all about your favorite animals, or animal breeds, and then just list the tags in a category. blogWalker will search out those tags on tumblr, sort them all together by date, and then show them to you from newest to oldest. blogWalker supports endless scrolling, so you can keep on view posts! blogWalker also features side scrolling to view post, instead of the same old vertical scrolling you see everywhere. Don&#8217;t want to bother with categories, and are bored with what&#8217;s on your dashboard? blogWalker has a Random mode &#8211; which will search out random tags and blogs, stick them all together and let you browse through. </p> <p> blogWalker connects to your tumblr.com account, and lets you view, reblog, like, and share posts from tumblr through text or email. You can view posts from users without actually having to follow them and clutter up your dashboard by adding them to a category. You can use blogWalker to view specific blogs, tags, categories you&#8217;ve created, or your dashboard. </p> <p> blogWalker is the perfect companion for tumblr on your mobile devices! You can reblog and like posts instantly. You can queue posts, save them as drafts, and add comments and tags to any of the blogs that are associated with your account. Media content can launch into your device&#8217;s browser to view videos or listen to songs. </p> <p> Navigate through posts by flicking left and right, or use the simple navigation buttons. There is also a (mostly) full screen mode where all toolbars can be hidden. blogWalker keeps track of your last viewed post, so you can always get back to where you left off. You can view your dashboard, explore a tag, then explore a category, and then explore a blog, and then get back to each post in the section where you left off. blogWalker lets you dig deep into the depths of tumblr and see some awesome content posted by fellow tumblr users. </p> <p> blogWalker requires you have a tumblr.com account. It only takes a minute to sign up. </p>",
	appScreenShots: ["assets/blogwalker/ss1.png","assets/blogwalker/ss2.png","assets/blogwalker/ss3.png","assets/blogwalker/ss4.png"],
	appPromo: "assets/blogwalker/promo.jpg",
	appHelpLink: "",
	appPrice: "FREE",
	appPromoText: "FREE demo of blogWalker",
	linkAndroid: "",
	linkBlackBerry: "",
	linkWebOs: ""
});

enyo.kind({
	kind: "AppDetailView",
	name: "appDetailLapTimer",
	appIcon: "assets/laptimer/laptimericon.png",
	appTitle: "Lap Timer",
	appDesc: "<p>A simple timing app that allows you to record \"laps\" and keep the timer going. Each lap will display the start time, end time, and how much time has passed. Hit the stop button to end the session. You will then be able to view the results and email them to yourself or someone else.<br/>Very easy to use, just click the giant green start button, and then at the end of each lap, hit the giant blue button to record. And when your all finished, click the red stop button to end the session. </p>",
	appScreenShots: ["assets/laptimer/ss1.png","assets/laptimer/ss2.png","assets/laptimer/ss3.png","assets/laptimer/ss4.png"],
	appPromo: "assets/laptimer/promo.png",
	appHelpLink: "",
	appPrice: "FREE",
	appPromoText: "Easy to use tool to time laps with.",
	//
	linkAndroid: "",
	linkBlackBerry: "",
	linkWebOs: ""
});

enyo.kind({
	name: "App",
	classes: "enyo-fit app-font",
	style: "background-color: #333;color:white",
	components:[
		{kind: "Slideable", style: "width:280px;height:100%;border-right: 5px solid #F58723;",name: "webMenu",classes: "slideable-absolute",onChange: "syncSlideables",onEnd: "syncSlideablesEnd",onStop: "syncSlideablesEnd", unit:"px", min:-190,max: 0, components:[
			{kind: "FittableRows", style: "width:100%;height:100%;", components: [
				{kind: "FittableColumns", style: "width:100%;", components: [
					{content: "Apps By Chris", classes: "main-header", style: "padding-top:15px;font-size:150%;", fit: true},
					{kind: "Image", style: "width:64px;height:64px;margin-right:15px;padding-top:5px;", src: "assets/companylogo.png"}
				]},
				{kind: "Scroller",fit: true,horizontal: "hidden",touch: true,style: "width:280px;", components:[
					{opening: "androidApps", ontap: "openView", classes: "web-menu-item", components: [
						{kind: "FittableColumns", components: [
							{content: "Android Apps", fit: true},
							{kind: "Image", style: "width:80px;height:40px;border-radius:3px;", src: "assets/androidflag.png"}
						]}
					]},
					{opening: "blackberryApps", ontap: "openView", classes: "web-menu-item", components: [
						{kind: "FittableColumns", components: [
							{content: "Blackberry 10 Apps", fit: true},
							{kind: "Image", style: "width:80px;height:40px;border-radius:3px;", src: "assets/blackberryflag.png"}
						]}
					]},
					{opening: "webosApps", ontap: "openView", classes: "web-menu-item", components: [
						{kind: "FittableColumns", components: [
							{content: "webOS Apps", fit: true},
							{kind: "Image", style: "width:80px;height:40px;border-radius:3px;", src: "assets/webosflag.png"}
						]}
					]},
					{opening: "upcomingApps", ontap: "openView", classes: "web-menu-item", components: [
						{kind: "FittableColumns", components: [
							{content: "Upcoming Apps", fit: true},
							{kind: "Image", style: "width:80px;height:40px;border-radius:3px;", src: "assets/upcomingflag.png"}
						]}
					]},
					{opening: "blog", ontap: "openView", classes: "web-menu-item", components: [
						{kind: "FittableColumns", components: [
							{content: "Blog", fit: true},
							{kind: "Image", style: "width:80px;height:40px;border-radius:3px;", src: "assets/blogflag.png"}
						]}
					]},
					{classes: "web-menu-item", components: [
						{kind: "FittableColumns", ontap: "openLink", url: "http://appsbychris.net/github", components: [
							{content: "Github", fit: true},
							{kind: "Image", style: "width:80px;height:40px;border-radius:3px;", src: "assets/githubflag.png"}
						]}
					]},
					{opening: "contactInfo", ontap: "openView",classes: "web-menu-item", components: [
						{kind: "FittableColumns", components: [
							{content: "Contact", fit: true},
							{kind: "Image", style: "width:80px;height:40px;border-radius:3px;", src: "assets/contactflag.png"}
						]}
					]},
				]}
			]},
			
		]},
		{kind: "Slideable",name: "mainContent", style: "left:290px;",classes: "slideable-absolute", unit:"px", min:0,max: 0, components:[
			{kind: "DropInView",name: "blog", style: "height: 100%;width: 100%;background-color:#F1ECDF;", components:[
				{tag: "iframe", src: "http://chrishptouchpadapps.tumblr.com/mobile", classes: "enyo-fill", style: "border: none;"}
			]},
			{kind: "DropInView",name: "androidApps", style: "width: 100%;", components:[
				{kind: "FittableRows", style: "height: 100%;", components: [
					
					{kind: "FittableColumns", style: "width:100%;",noStretch: true,classes: "app-detail-top", components: [
						{content: "Android Apps", classes: "app-header", fit: true},
						{allowHtml: true,style: "height:45px;width:129px;margin-top:3px;",content: "<a href=\"https://play.google.com/store/apps/developer?id=Apps+By+Chris\"><img alt=\"See my apps on Google Play\" src=\"https://developer.android.com/images/brand/en_generic_rgb_wo_45.png\" target=\"android\"/></a>"}
					]},
					{style: "height:10px;"},
					{kind: "Scroller",fit: true,horizontal: "hidden",style: "width:100%;", components:[
						{style: "text-align:center;", components: [
							{kind: "AppPicker", iconText: "blogWalker", detailView: "androidBlogWalker",ontap: "openAppDetail", iconSrc: "assets/blogwalker/blogwalkericon.png", iconDesc: "Categorize tumblr your way!", iconPrice: "$0.99"},
							{kind: "AppPicker", iconText: "blogWalker Free", detailView: "androidBlogWalkerFree",ontap: "openAppDetail", iconSrc: "assets/blogwalker/blogwalkericon.png", iconDesc: "Free demo of blogWalker.", iconPrice: "FREE!"},
							{kind: "AppPicker", iconText: "Lap Timer", detailView: "androidLaptimer",ontap: "openAppDetail", iconSrc: "assets/laptimer/laptimericon.png", iconDesc: "Easy to use tool to time laps with.", iconPrice: "FREE!"},
							{kind: "AppPicker", iconText: "Pet Info", detailView: "androidPetInfo",ontap: "openAppDetail", iconSrc: "assets/petinfo/petinfoicon.png", iconDesc: "Store info about your pets and their vet.", iconPrice: "FREE!"}
						]}
					]},
					{style: "height:1px;"}
				]}
			]},
			{kind: "DropInView",name: "blackberryApps", style: "width: 100%;", components:[
				{kind: "FittableRows", style: "height: 100%;", components: [
					{kind: "FittableColumns", style: "width:100%;",noStretch: true,classes: "app-detail-top", components: [
						{content: "Blackberry 10 Apps", classes: "app-header", fit: true},
						{allowHtml: true,style: "height:45px;width:129px;margin-top:3px;",content: "<a href=\"http://appworld.blackberry.com/webstore/vendor/59509\"><img alt=\"See my apps on Blackberry World\" src=\"assets/bb-badge.jpg\" target=\"blackberry\"/></a>"}
					]},
					{style: "height:10px;"},
					{kind: "Scroller",fit: true,horizontal: "hidden",style: "width:100%;", components:[
						{kind: "AppPicker", iconText: "blogWalker", detailView: "blackBerryBlogWalker",ontap: "openAppDetail", iconSrc: "assets/blogwalker/blogwalkericon.png", iconDesc: "Categorize tumblr your way!", iconPrice: "$0.99"},
						{kind: "AppPicker", iconText: "blogWalker Free", detailView: "blackBerryBlogWalkerFree",ontap: "openAppDetail", iconSrc: "assets/blogwalker/blogwalkericon.png", iconDesc: "Free demo of blogWalker.", iconPrice: "FREE!"},
						{kind: "AppPicker", iconText: "Lap Timer", detailView: "blackBerryLaptimer",ontap: "openAppDetail", iconSrc: "assets/laptimer/laptimericon.png", iconDesc: "Easy to use tool to time laps with.", iconPrice: "FREE!"},
						{kind: "AppPicker", iconText: "Match My Pets!", detailView: "blackBerryMatchMyPets",ontap: "openAppDetail", iconSrc: "assets/matchmypets/matchmypetsicon.png", iconDesc: "Simple matching game with pictures of all my animals.", iconPrice: "FREE!"},
						{kind: "AppPicker", iconText: "Find Me A Bar!", detailView: "blackBerryFindMeABar",ontap: "openAppDetail", iconSrc: "assets/findmeabar/findmeabaricon.png", iconDesc: "Find 20 bars near you through Yelp.", iconPrice: "FREE!"}
					]},
					{style: "height:1px;"}
				]}
			]},
			{kind: "DropInView",name: "webosApps", style: "width: 100%;", components:[
				{kind: "FittableRows", style: "height: 100%;", components: [
					{kind: "FittableColumns", style: "width:100%;",noStretch: true,classes: "app-detail-top", components: [
						{content: "webOS Apps", classes: "app-header", fit: true},
						{allowHtml: true,style: "height:45px;width:129px;margin-top:3px;border-radius:3px;",content: "<img width=129 height=45 src=\"assets/webos.jpg\" target=\"webos\"/>"}
					]},
					{style: "height:10px;"},
					{kind: "Scroller",fit: true,horizontal: "hidden",style: "width:100%;", components:[
						{kind: "AppPicker",small: true, iconText: "Slideshow Presentation HD", detailView: "webosSlideshow",ontap: "openAppDetail", iconSrc: "assets/slideshow/slideshowicon.png", iconDesc: "Create stunning slideshows!", iconPrice: "$1.29"},
						{kind: "AppPicker",small: true, iconText: "Peek-A-Dash", detailView: "webosPeekADash",ontap: "openAppDetail", iconSrc: "assets/peekadash/peekadashicon.png", iconDesc: "Explore tumblr through a multitasking popup window!", iconPrice: "$0.99"},
						{kind: "AppPicker",small: true, iconText: "Chore Tracker Pro", detailView: "webosChoreTracker",ontap: "openAppDetail", iconSrc: "assets/choretracker/choretrackericon.png", iconDesc: "Get your life organized!", iconPrice: "$0.99"},
						{kind: "AppPicker",small: true, iconText: "Two Outta Three!", detailView: "webosTwoThree",ontap: "openAppDetail", iconSrc: "assets/twothree/twothreeicon.png", iconDesc: "Simple coin flip game where you can bet on each flip!", iconPrice: "$0.99"}
					]},
					{style: "height:1px;"}
				]}
			]},
			{kind: "DropInView",name: "upcomingApps", style: "width: 100%;", components:[
				{kind: "FittableRows", style: "height: 100%;", components: [
					{kind: "FittableColumns", style: "width:100%;",noStretch: true,classes: "app-detail-top", components: [
						{content: "Upcoming Apps", classes: "app-header", fit: true}
					]},
					{style: "height:10px;"},
					{kind: "Scroller",fit: true,horizontal: "hidden",style: "width:100%;", components:[
						{kind: "AppPicker", iconText: "Game Spinner", iconSrc: "", iconDesc: "Create custom spinners for games."},
						{kind: "AppPicker", iconText: "Pet Info Pro", iconSrc: "assets/petinfo/petinfoicon.png", iconDesc: "Updated version coming to Android and Blackberry 10."},
					]},
					{style: "height:1px;"}
				]}
			]},
			{kind: "DropInView",name: "contactInfo", style: "width: 100%;", components:[
				{kind: "FittableRows", style: "height: 100%;", components: [
					
					{kind: "FittableColumns", style: "width:100%;",noStretch: true,classes: "app-detail-top", components: [
						{content: "Contact information", classes: "app-header", fit: true},
					]},
					{style: "height:10px;"},
					{kind: "Scroller",fit: true,horizontal: "hidden",classes: "app-detail-top",style: "width:100%;", components:[
						{classes: "app-detail-promo-text",content: "Any issues, comments, questions, feature updates, or app ideas, send an email to <a href=\"mailto:support@appsbychris.net\">support@appsbychris.net</a><br/><br/>All emails will be answered within 48 hours.", allowHtml:true}
					]},
					{style: "height:1px;"}
				]}
			]},
			{kind: "appDetailBlogWalker", name: "androidBlogWalker", linkAndroid: "https://play.google.com/store/apps/details?id=com.appsbychris.blogwalker"},
			{kind: "appDetailBlogWalkerFree", name: "androidBlogWalkerFree", linkAndroid: "https://play.google.com/store/apps/details?id=com.appsbychris.blogwalker.free"},
			{kind: "appDetailBlogWalker", name: "blackBerryBlogWalker", linkBlackBerry: "http://appworld.blackberry.com/webstore/content/20485138/", appPromo: "assets/blogwalker/promobb.png"},
			{kind: "appDetailBlogWalkerFree", name: "blackBerryBlogWalkerFree", linkBlackBerry: "http://appworld.blackberry.com/webstore/content/24375878/", appPromo: "assets/blogwalker/promobb.png"},
			{kind: "appDetailLapTimer", name: "androidLaptimer", linkAndroid:"https://play.google.com/store/apps/details?id=com.appsbychris.laptimer"},
			{kind: "appDetailLapTimer", name: "blackBerryLaptimer", linkBlackBerry:"http://appworld.blackberry.com/webstore/content/21742891/"},
			{
				kind: "AppDetailView",
				name: "androidPetInfo",
				appIcon: "assets/petinfo/petinfoicon.png",
				appTitle: "Pet Info",
				appDesc: "<p>Keep all information about your pets in 1 place. Add as many pets as you have. You can store birthdates, weights, vet information, medical information, plus any other notes you want. Then all you need to do is select your pets name and all its information will be shown. Keep next vet appointments and what shots your animals have had all in 1 place.<br />Pet info will also display your pets current age if you provided a birthday.</p>",
				appScreenShots: ["assets/petinfo/ss1.png","assets/petinfo/ss2.png","assets/petinfo/ss3.png","assets/petinfo/ss4.png"],
				appPromo: "assets/petinfo/promo.png",
				appHelpLink: "",
				appPrice: "FREE",
				appPromoText: "Store info about your pets and their vet.",
				linkAndroid: "https://play.google.com/store/apps/details?id=com.appsbychris.pet.info.free",
				linkBlackBerry: "",
				linkWebOs: ""
			},
			{
				kind: "AppDetailView",
				name: "blackBerryMatchMyPets",
				appIcon: "assets/matchmypets/matchmypetsicon.png",
				appTitle: "Match My Pets!",
				appDesc: "<p>This is a classic memory game where you can have from 8 to 48 tiles (going up by 4’s), and you try and match up pictures. Every picture will have a matching picture hidden somewhere. Try to take as few turns as possible to reveal all the pictures. A perfect score will be when the amount of turns equals the number of matches. A history record will be kept of all your wins, and you can view it at any time in the app. Over 500 images! All pictures are of my pets: Floyd the weimaraner, Marley the basset hound, Samwise the itallian greyhound, many of our sugar gliders, and our fish.</p>",
				appScreenShots: ["assets/matchmypets/ss1.png","assets/matchmypets/ss2.png","assets/matchmypets/ss3.png","assets/matchmypets/ss4.png"],
				appPromo: "assets/matchmypets/promo.png",
				appHelpLink: "",
				appPrice: "FREE",
				appPromoText: "Simple matching game with pictures of all my animals.",
				linkAndroid: "",
				linkBlackBerry: "http://appworld.blackberry.com/webstore/content/21794080/",
				linkWebOs: ""
			},
			{
				kind: "AppDetailView",
				name: "blackBerryFindMeABar",
				appIcon: "assets/findmeabar/findmeabaricon.png",
				appTitle: "Find Me A Bar!",
				appDesc: "<p> Find Me A Bar gives you 20 near by bars based on your current GPS location. <br/> Just launch the app and it auto searches yelp.com from your coordinates. <br/> Your first view will be a list that shows the name, address, and phone number. <br/> It also shows the rating and about how far it is. <br/> Just tap on one that looks good for some more info on it. <br/> You can tap the phone number to launch your phone app to make a call to the bar. <br/> You can click on the directions button to launch the native navigator to get you right to the doorstep. <br/> There is a map that will show where the bar is, and where you currently are. <br/> You can see the latest 3 reviews as well. <br/> You must allow access to your GPS for this app to function. </p>",
				appScreenShots: ["assets/findmeabar/ss1.png","assets/findmeabar/ss2.png","assets/findmeabar/ss3.png","assets/findmeabar/ss4.png"],
				appPromo: "assets/findmeabar/promo.png",
				appHelpLink: "",
				appPrice: "FREE",
				appPromoText: "Find 20 bars near you through Yelp.",
				linkAndroid: "",
				linkBlackBerry: "http://appworld.blackberry.com/webstore/content/21794080/",
				linkWebOs: ""
			},
			{
				kind: "AppDetailView",
				name: "webosSlideshow",
				appIcon: "assets/slideshow/slideshowicon.png",
				appTitle: "Slideshow Presentation HD",
				appDesc: "<p> Create stunning and custom slideshows and photo projects that you can set to music. Turns your TouchPad into a beautiful digital photo frame! <br/> Features include: <br/> * Cinematic mode adds panning of pictures (8 different modes!) <br/> * Set a show up to change pics on a timed duration, on song change, manually, or each picture can have its own duration. <br/> * You can have as many different projects as you want! <br/> * Handles 1000s of pictures without a problem! <br/> * Sorting by File name, path, or both. You can also have a custom order, or have it random <br/> * Captions: Per-picture, Global, EXIF info, Date &amp; Time, File Name / Path / Both, Song Name <br/> * You can set the captions to display in any color, and place it on the top or bottom of the pic. <br/> * 32 different transitions, with 5 speeds for each. <br/> * Stretch or Maintain aspect ratio (can set per-pic as well) <br/> * Rotate picture in 90degree increments! <br/> * Live Preview of image in edit mode! <br/> * Show duration (play once, repeat, end with music) <br/> * Plays in landscape or portrait <br/> * Add pics by folder (can include subfolders and hidden files), or add 1 by 1 <br/> * Swipe to advance or go back while show is running <br/> * Pinch-Zoom on images <br/> * Exhibition compatible <br/> * Quick and easy to setup! </p> <p> You can change just about any setting you want, and show off your photos to your friends in style! </p>",
				appScreenShots: ["assets/slideshow/ss1.png","assets/slideshow/ss2.png","assets/slideshow/ss3.png","assets/slideshow/ss4.png"],
				appPromo: "assets/slideshow/promo.png",
				appHelpLink: "",
				appPrice: "$1.29",
				appPromoText: "Create stunning slideshows!",
				linkAndroid: "",
				linkBlackBerry: "",
				linkWebOs: "https://developer.palm.com/appredirect/?packageid=com.chrisvanhooser.slideshowpresentationhd"
			},
			{
				kind: "AppDetailView",
				name: "webosPeekADash",
				appIcon: "assets/peekadash/peekadashicon.png",
				appTitle: "Peek-A-Dash",
				appDesc: "<p> Explore tumblr in a new way with Peek-A-Dash. Works for all webOS devices with Enyo. On the TouchPad, Peek-A-Dash is a multitasking friendly popup window. The popup works with any window you have open so you don’t have to stop what you are doing to check on a post! The popup can be accessed at any time from your notifications. Peek-A-Dash’s main function is to view your dashboard posts; though you can also browse any blog you can find a link to in Peek-A-Dash. You can pair the popup with the included Mini Browser that will allow you to browse through posts and view the ones you want, right from the poster’s blog page! You can create categories and sort your favorite blogs between them to view only the posts from the blogs in your category. Peek-A-Dash also allows you to select any blog and explore it, right through the popup window. You can also like and reblog (or queue or save as a draft) posts instantly. <br/> On the phone: Peek-A-Dash launches in its own card and acts like a normal app. It will have almost the same experience as the TouchPad, except there is no Mini-Browser. <br/> Simply swipe left and right to move between posts. Peek-A-Dash supports endless scrolling so you can keep on reading. <br/> You can also set it to let you know if there have been any new posts. <br/> You must have a tumblr.com account to use this app. </p>",
				appScreenShots: ["assets/peekadash/ss1.png","assets/peekadash/ss2.png","assets/peekadash/ss3.png","assets/peekadash/ss4.png"],
				appPromo: "assets/peekadash/promo.png",
				appHelpLink: "",
				appPrice: "$0.99",
				appPromoText: "Explore tumblr through a multitasking popup window!",
				linkAndroid: "",
				linkBlackBerry: "",
				linkWebOs: "https://developer.palm.com/appredirect/?packageid=com.chrisvanhooser.peekadash"
			},
			{
				kind: "AppDetailView",
				name: "webosChoreTracker",
				appIcon: "assets/choretracker/choretrackericon.png",
				appTitle: "Chore Tracker Pro",
				appDesc: "<p> Get your life back on track with Chore Tracker Pro. <br/> ***Phone users! This app requires Enyo!*** <br/> *New 1.0.5 features: <br/> Items now can have tags, and you can filter which items you see by the tags! <br/> Touchpad version has split-screen mode, where you can view up to 6 different tag filters at once! <br/> Ability to add task that will delete by itself after you have completed it. Can set from 1 to 100 times. <br/> More icons! <br/> Chore Tracker Pro keeps track of your chores and task on an interval basis. You can set an interval from 1 hour up to 100 years! You can also set task to be done on a certain day. <br/> Chore Tracker Pro will display your entered task with a colorful progress bar indicating how much time is left. You can sort by due date, most recently completed, danger zone, custom order, by its name, or by ABC order. You can select 1 of 70 included pictures to represent the task. You can set a daily alarm to give you a list of your chores for the day, or to notify you if you have any items past-due. <br/> When you complete a task, hit the thumb's up icon and the interval will start over. The app will keep track how many times you completed the task on time, had an item go past due, and the total number of times you've completed a task. <br/> This app will work on every webOS device that has Enyo installed. <br/> You can sync between devices with a Box.net account. Box.net syncing also works as data backup so you won't lose your data! The Touchpad version shows an expanded view of each item. <br/> Don't wait; get your life back on track with Chore Tracker Pro! </p>",
				appScreenShots: ["assets/choretracker/ss1.png","assets/choretracker/ss2.png","assets/choretracker/ss3.png","assets/choretracker/ss4.png"],
				appPromo: "assets/choretracker/promo.png",
				appHelpLink: "",
				appPrice: "$0.99",
				appPromoText: "Get your life organized!",
				linkAndroid: "",
				linkBlackBerry: "",
				linkWebOs: "https://developer.palm.com/appredirect/?packageid=com.chrisvanhooser.choretrackerpro"
			},
			{
				kind: "AppDetailView",
				name: "webosTwoThree",
				appIcon: "assets/twothree/twothreeicon.png",
				appTitle: "Two Outta Three!",
				appDesc: "<p> Two Outta Three! is a classic coin flip game where you can bet on the out-come of each toss of the coin. The object of the game is to win 3 of 5 rounds. Each round, there can be up to 3 coin flips. You need to win 2 of them to win the round. Each flip has a bonus multiplier that will multiply your winnings and bonuses, ranging from x0 to x5! If you win the flip, you get gain what you bet, plus what your opponent bet! Try and get all the gold coins you can to be #1 on the top ten list, but don’t run out, or it is game over! There are 3 different coins you can choose from, and you can change them at any time, even when the coin is in motion. Sound effects can be toggled on and off. You can play against a friend, or you can try and beat the Touchpad itself! This app won the App-Hack contest for “Three” <br/> <br/> <br/> </p>",
				appScreenShots: [],
				appPromo: "assets/choretracker/promo.png",
				appHelpLink: "",
				appPrice: "$0.99",
				appPromoText: "Simple coin flip game where you can bet on each flip!",
				linkAndroid: "",
				linkBlackBerry: "",
				linkWebOs: "https://developer.palm.com/appredirect/?packageid=com.chrisvanhooser.twoouttathree"
			}
		]}
		/*{kind: "FittableColumns", style: "width:100%;background:black;color:white;", components: [
			{kind: "Image", style: "width:64px;height:64px;", src: "assets/companylogo.png"},
			
			{kind: "FittableRows", style: "padding:3px;", components: [
				
				{kind: "Scroller",onScrollStop:"checkMoreScroll", vertical: "hidden",name: "menuScroll",touch:true,style: "height:25px;background:black;color:white;white-space:nowrap;", components: [
					{classes: "web-menu-item", content: "Blog", index: 0, ontap: "changePanels"},
					{classes: "web-menu-item", content: "Github", ontap: "openLink", url: "http://appsbychris.net/github"},
					{classes: "web-menu-item", content: "blogWalker", index: 1, ontap: "changePanels"},
					{classes: "web-menu-item", content: "Lap Timer", index: 2, ontap: "changePanels"},
					{classes: "web-menu-item", content: "Pet Info", index: 3, ontap: "changePanels"},
					{classes: "web-menu-item", content: "Match My Pets", index: 4, ontap: "changePanels"},
					{classes: "web-menu-item", content: "Slideshow HD", index: 5, ontap: "changePanels"},
					{classes: "web-menu-item", content: "Chore Tracker", index: 6, ontap: "changePanels"},
					{classes: "web-menu-item", content: "Peek-A-Dash", index: 7, ontap: "changePanels"},
					{classes: "web-menu-item", content: "Two Outta Three", index: 8, ontap: "changePanels"}
				]},
				{name: "moreOptions",ontap: "scrollToEnd",content: ">>>", style: "position:absolute;right:3px;top:45px;background:white;color:black;opacity:0.8;border-radius:5px;", showing: false}
			]}
		]},
		{kind: "Panels", name:"panels", fit:true,realtimeFit: true, onTransitionFinish: "setIndex",  arrangerKind: "enyo.BoxTurnArranger", classes: "enyo-border-box", components: [
			{kind: "Scroller",horizontal: "hidden", classes: "panel-back", name: "blogComponent", components:[
				
			]},
			{kind: "Scroller",horizontal: "hidden", classes: "panel-back", components:[
				{style: "padding:10px;", components:[
					{content: "blogWalker for Android and Blackberry 10", classes: "main-header"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"http://chrishptouchpadapps.tumblr.com/post/39356847377/blogwalker-help-file\">Help Document</a>"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"https://play.google.com/store/apps/details?id=com.appsbychris.blogwalker\">  <img alt=\"Get it on Google Play\"       src=\"https://developer.android.com/images/brand/en_generic_rgb_wo_45.png\" />(Paid)</a>"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"https://play.google.com/store/apps/details?id=com.appsbychris.blogwalker.free\">  <img alt=\"Get it on Google Play\"       src=\"https://developer.android.com/images/brand/en_generic_rgb_wo_45.png\" />(Free)</a>"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"http://appworld.blackberry.com/webstore/content/20485138/\">  <img alt=\"Get it on Blackberry 10\"       src=\"assets/bb-badge.jpg\" />(Paid)</a>"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"http://appworld.blackberry.com/webstore/content/24375878/\">  <img alt=\"Get it on Blackberry 10\"       src=\"assets/bb-badge.jpg\" />(Free)</a>"},
					
					{kind: "Image", name: "blogwalkerImage", src: "assets/blogwalker1.jpg"},
					{allowHtml: true, classes: "body-content", content: "<p> blogWalker connects to your tumblr.com account, and lets you view, reblog, like, and share posts from tumblr. The biggest benefit of blogWalker is being able to sort tags and blogs into smaller, more related categories, and just choose the types of posts you&#8217;re interested in. You can also view posts from users without actually having to follow them and clutter up your dashboard by adding them to a category.&#160; You can use blogWalker to view specific blogs, tags, categories you&#8217;ve created, or your dashboard. There is also a random mode and pre-made categories if you can&#8217;t decide what you want to see and want blogWalker to do the work for you. </p> <p> blogWalker is the perfect companion for tumblr on your mobile devices! View tumblr on your terms, viewing just posts from your custom-created categories. You can reblog and like posts instantly. You can queue posts, save them as drafts, and add comments and tags to any of the blogs associated with your account. Content can launch into your device&#8217;s browser to view videos or listen to songs. You can share links to any of the content through email and text messaging (or any other app that allows sending links). </p> <p> Navigate through posts by flicking left and right, or use the simple navigation buttons. blogWalker keeps track of your last viewed post, so you can always get back to where you left off. You can view your dashboard, explore a tag, then explore a category, and then explore a blog, and then get back to each post in the section where you left off. &#160;blogWalker lets you dig deep into the depths of tumblr and see some awesome content posted by fellow tumblr users. </p> <p> Please email me with questions, comments, or problems (<a href=\"mailto:support@appsbychris.net\">support@appsbychris.net</a>), and I will get the issue taken care of. </p> <p> blogWalker requires you have a tumblr.com account. It only takes a minute to sign up. </p>"}
				]}
			]},
			{kind: "Scroller",horizontal: "hidden", classes: "panel-back", components:[
				{style: "padding:10px;", components:[
					{content: "Lap Timer for Android, Blackberry 10", classes: "main-header"},
					//{classes: "link-format", allowHtml: true, content: "<a href=\"http://chrishptouchpadapps.tumblr.com/post/39356847377/blogwalker-help-file\">Help Document</a>"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"https://play.google.com/store/apps/details?id=com.appsbychris.laptimer\">  <img alt=\"Get it on Google Play\"       src=\"https://developer.android.com/images/brand/en_generic_rgb_wo_45.png\" />(Free)</a>"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"http://appworld.blackberry.com/webstore/content/21742891/\">  <img alt=\"Get it on Blackberry 10\"       src=\"assets/bb-badge.jpg\" />(Free)</a>"},
					
					{name: "laptimerImage", kind: "Image", src: "assets/laptimer.jpg"},
					{allowHtml: true, classes: "body-content", content: "<p>A simple timing app that allows you to record \"laps\" and keep the timer going. Each lap will display the start time, end time, and how much time has passed. Hit the stop button to end the session. You will then be able to view the results and email them to yourself or someone else.<br/>Very easy to use, just click the giant green start button, and then at the end of each lap, hit the giant blue button to record. And when your all finished, click the red stop button to end the session. </p>"}
				]}
			]},
			{kind: "Scroller",horizontal: "hidden", classes: "panel-back", components:[
				{style: "padding:10px;", components:[
					{content: "Pet Info for Android, Blackberry 10", classes: "main-header"},
					//{classes: "link-format", allowHtml: true, content: "<a href=\"http://appworld.blackberry.com/webstore/content/21795797/">Help Document</a>"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"https://play.google.com/store/apps/details?id=com.appsbychris.pet.info.free\">  <img alt=\"Get it on Google Play\"       src=\"https://developer.android.com/images/brand/en_generic_rgb_wo_45.png\" />(Free)</a>"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"http://appworld.blackberry.com/webstore/content/21795797/\">  <img alt=\"Get it on Blackberry 10\"       src=\"assets/bb-badge.jpg\" />(Free)</a>"},
					
					{name: "petinfoImage", kind: "Image", src: "assets/petinfo.jpg"},
					{allowHtml: true, classes: "body-content", content: "<p>Keep all information about your pets in 1 place. Add as many pets as you have. You can store birthdates, weights, vet information, medical information, plus any other notes you want. Then all you need to do is select your pets name and all its information will be shown. Keep next vet appointments and what shots your animals have had all in 1 place.<br />Pet info will also display your pets current age if you provided a birthday.</p>"}
				]}
			]},
			{kind: "Scroller",horizontal: "hidden", classes: "panel-back", components:[
				{style: "padding:10px;", components:[
					{content: "Match My Pets", classes: "main-header"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"http://appworld.blackberry.com/webstore/content/21794080/\">  <img alt=\"Get it on Blackberry 10\"       src=\"assets/bb-badge.jpg\" />(Free)</a>"},
					
					{classes: "link-format", allowHtml: true, content: "<a href=\"http://appsbychris.net/matchmypets/game.html\">Play online here!</a>"},
					
					{name: "matchmypetsImage", kind: "Image", src: "assets/matchmypets.png"},
					{allowHtml: true, classes: "body-content", content: "<p>This is a classic memory game where you can have from 8 to 48 tiles (going up by 4’s), and you try and match up pictures. Every picture will have a matching picture hidden somewhere. Try to take as few turns as possible to reveal all the pictures. A perfect score will be when the amount of turns equals the number of matches. A history record will be kept of all your wins, and you can view it at any time in the app. Over 500 images! All pictures are of my pets: Floyd the weimaraner, Marley the basset hound, Samwise the itallian greyhound, many of our sugar gliders, and our fish.</p>"}
				]}
			]},
			{kind: "Scroller",horizontal: "hidden", classes: "panel-back", components:[
				{style: "padding:10px;", components:[
					{content: "Slideshow Presentation HD for webOS", classes: "main-header"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"http://chrishptouchpadapps.tumblr.com/post/11118143698/slideshow-presentation-hd-help-overview-1-3-1\">Help Document</a>"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"https://developer.palm.com/appredirect/?packageid=com.chrisvanhooser.slideshowpresentationhd\">Download</a>"},
					
					{kind: "Image", style: "max-width:60%;", src: "assets/slideshow.png"},
					{allowHtml: true, classes: "body-content", content: "<p> Create stunning and custom slideshows and photo projects that you can set to music. Turns your TouchPad into a beautiful digital photo frame! <br/> Features include: <br/> * Cinematic mode adds panning of pictures (8 different modes!) <br/> * Set a show up to change pics on a timed duration, on song change, manually, or each picture can have its own duration. <br/> * You can have as many different projects as you want! <br/> * Handles 1000s of pictures without a problem! <br/> * Sorting by File name, path, or both. You can also have a custom order, or have it random <br/> * Captions: Per-picture, Global, EXIF info, Date &amp; Time, File Name / Path / Both, Song Name <br/> * You can set the captions to display in any color, and place it on the top or bottom of the pic. <br/> * 32 different transitions, with 5 speeds for each. <br/> * Stretch or Maintain aspect ratio (can set per-pic as well) <br/> * Rotate picture in 90degree increments! <br/> * Live Preview of image in edit mode! <br/> * Show duration (play once, repeat, end with music) <br/> * Plays in landscape or portrait <br/> * Add pics by folder (can include subfolders and hidden files), or add 1 by 1 <br/> * Swipe to advance or go back while show is running <br/> * Pinch-Zoom on images <br/> * Exhibition compatible <br/> * Quick and easy to setup! </p> <p> You can change just about any setting you want, and show off your photos to your friends in style! </p>"}
				]}
			]},
			{kind: "Scroller",horizontal: "hidden", classes: "panel-back", components:[
				{style: "padding:10px;", components:[
					{content: "Chore Tracker Pro for webOS", classes: "main-header"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"http://chrishptouchpadapps.tumblr.com/post/16991714628/chore-tracker-pro-1-0-0-help\">Help Document</a>"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"https://developer.palm.com/appredirect/?packageid=com.chrisvanhooser.choretrackerpro\">Download</a>"},
					{kind: "Image", style: "max-width:60%;", src: "assets/chore.png"},
					{allowHtml: true, classes: "body-content", content: "<p> Get your life back on track with Chore Tracker Pro. <br/> ***Phone users! This app requires Enyo!*** <br/> *New 1.0.5 features: <br/> Items now can have tags, and you can filter which items you see by the tags! <br/> Touchpad version has split-screen mode, where you can view up to 6 different tag filters at once! <br/> Ability to add task that will delete by itself after you have completed it. Can set from 1 to 100 times. <br/> More icons! <br/> Chore Tracker Pro keeps track of your chores and task on an interval basis. You can set an interval from 1 hour up to 100 years! You can also set task to be done on a certain day. <br/> Chore Tracker Pro will display your entered task with a colorful progress bar indicating how much time is left. You can sort by due date, most recently completed, danger zone, custom order, by its name, or by ABC order. You can select 1 of 70 included pictures to represent the task. You can set a daily alarm to give you a list of your chores for the day, or to notify you if you have any items past-due. <br/> When you complete a task, hit the thumb's up icon and the interval will start over. The app will keep track how many times you completed the task on time, had an item go past due, and the total number of times you've completed a task. <br/> This app will work on every webOS device that has Enyo installed. <br/> You can sync between devices with a Box.net account. Box.net syncing also works as data backup so you won't lose your data! The Touchpad version shows an expanded view of each item. <br/> Don't wait; get your life back on track with Chore Tracker Pro! </p>"}
				]}
			]},
			{kind: "Scroller",horizontal: "hidden", classes: "panel-back", components:[
				{style: "padding:10px;", components:[
					{content: "Peek-A-Dash for webOS", classes: "main-header"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"http://chrishptouchpadapps.tumblr.com/post/20083758837/peek-a-dash-1-0-0-help\">Help Document</a>"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"https://developer.palm.com/appredirect/?packageid=com.chrisvanhooser.peekadash\">Download</a>"},
					{kind: "Image", style: "max-width:60%;", src: "assets/peek.png"},
					{allowHtml: true, classes: "body-content", content: "<p> Explore tumblr in a new way with Peek-A-Dash. Works for all webOS devices with Enyo. On the TouchPad, Peek-A-Dash is a multitasking friendly popup window. The popup works with any window you have open so you don’t have to stop what you are doing to check on a post! The popup can be accessed at any time from your notifications. Peek-A-Dash’s main function is to view your dashboard posts; though you can also browse any blog you can find a link to in Peek-A-Dash. You can pair the popup with the included Mini Browser that will allow you to browse through posts and view the ones you want, right from the poster’s blog page! You can create categories and sort your favorite blogs between them to view only the posts from the blogs in your category. Peek-A-Dash also allows you to select any blog and explore it, right through the popup window. You can also like and reblog (or queue or save as a draft) posts instantly. <br/> On the phone: Peek-A-Dash launches in its own card and acts like a normal app. It will have almost the same experience as the TouchPad, except there is no Mini-Browser. <br/> Simply swipe left and right to move between posts. Peek-A-Dash supports endless scrolling so you can keep on reading. <br/> You can also set it to let you know if there have been any new posts. <br/> You must have a tumblr.com account to use this app. </p> "}
				]}
			]},
			{kind: "Scroller",horizontal: "hidden", classes: "panel-back", components:[
				{style: "padding:10px;", components:[
					{content: "Two Outta Three for webOS", classes: "main-header"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"http://chrishptouchpadapps.tumblr.com/post/18099518647/two-outta-three-1-1-0-help-overview\">Help Document</a>"},
					{classes: "link-format", allowHtml: true, content: "<a href=\"https://developer.palm.com/appredirect/?packageid=com.chrisvanhooser.twoouttathree\">Download</a>"},
					{kind: "Image", style: "max-width:60%;", src: "assets/2o3.png"},
					{allowHtml: true, classes: "body-content", content: "<p> Two Outta Three! is a classic coin flip game where you can bet on the out-come of each toss of the coin. The object of the game is to win 3 of 5 rounds. Each round, there can be up to 3 coin flips. You need to win 2 of them to win the round. Each flip has a bonus multiplier that will multiply your winnings and bonuses, ranging from x0 to x5! If you win the flip, you get gain what you bet, plus what your opponent bet! Try and get all the gold coins you can to be #1 on the top ten list, but don’t run out, or it is game over! There are 3 different coins you can choose from, and you can change them at any time, even when the coin is in motion. Sound effects can be toggled on and off. You can play against a friend, or you can try and beat the Touchpad itself! This app won the App-Hack contest for “Three” <br/> <br/> <br/> </p> "}
				]}
			]}
		]}*/
		
	],
	currentView: "blog",
	syncSlideables: function(iS, iE) {
		var v = iS.getValue();
		if (this.$.mainContent) {
			this.$.mainContent.setMin(v);
			this.$.mainContent.setMax(v);
			this.$.mainContent.applyStyle("width", (enyo.dom.getWindowWidth() - (290 + v)) + "px")
			this.$.mainContent.animateToMin();
		}
	},
	syncSlideablesEnd: function(iS, iE) {
		var v = iS.getValue();
		if (this.$.mainContent) {
			this.$.mainContent.setMin(v);
			this.$.mainContent.setMax(v);
			this.$.mainContent.applyStyle("width", (enyo.dom.getWindowWidth() - ((290 + v) === 0 ? 70 : 290 + v)) + "px")
			this.$.mainContent.animateToMin();
			this.$.mainContent.resized();
		}
	},
	create: function() {
		//{tag: "iframe", src: "http://appsbychris.net/blog", classes: "enyo-fill", style: "border: none;"}
		this.inherited(arguments);
		setTimeout(enyo.bind(this,function() {
			this.$.blog.showView();
		}), 500);
			
		//}
		
		
	},
	openView: function(iS, iE) {
		var o = iS.opening;
		this.$[this.currentView].hideView();
		this.$[o].resized();
		this.$.webMenu.animateToMin();
		setTimeout(enyo.bind(this,function() {
			this.$[o].showView();
			this.currentView = o;
		}), 50);
	},

	openAppDetail: function(iS, iE) {
		var d = iS.detailView;
		this.$[this.currentView].hideView();
		this.$[d].resized();
		setTimeout(enyo.bind(this,function() {
			this.$[d].showView();
			this.currentView = d;
		}), 50);
	},
	rendered: function() {
		this.inherited(arguments);
		this.resizeHandler();
	},
	resizeHandler: function() {
		if (this.$.webMenu.getValue() === 0) {
			this.$.mainContent.applyStyle("width", (enyo.dom.getWindowWidth() - 290) + "px")
		}
		else {
			this.$.mainContent.applyStyle("width", (enyo.dom.getWindowWidth() - 70) + "px")
		}
		this.$.mainContent.applyStyle("height", (enyo.dom.getWindowHeight()) + "px")
	},
	
	openLink: function(iS, iE) {
		window.open(iS.url);
	},
	/*
	changePanels: function(iS, iE) {
		this.$.panels.setIndex(iS.index);
		
	},
	checkMoreScroll: function() {
		var b = this.$.menuScroll.getScrollBounds();
		var w = window.innerWidth;
		if (b.width > w) {
			var x = this.$.menuScroll.getScrollLeft();
			if (x < b.maxLeft) {
				this.$.moreOptions.show();
			}
			else {
				this.$.moreOptions.hide();
			}
		}
		else {
			this.$.moreOptions.hide();
		}
	},
	
	scrollToEnd: function() {
		this.$.menuScroll.scrollToRight();
		this.$.moreOptions.hide();
	}*/
});
