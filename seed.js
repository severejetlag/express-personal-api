// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var software_list = [
	{
		title: 'Contexts',
		publisher: 'Contexts',
		tag: 'utility',
		description: 'Application used to replace the default action of your Mac "cmd + tab" keys to drastically imrpve the way that you switch between windows in applications.',
		website: 'https://contexts.co/', 
		icon: 'https://cdn.contexts.co/static/website/media/introduction-main.jpg',
		rating: 10
	},
	{
		title: 'SizeUp',
		publisher: 'Irradiated Software',
		tag: 'utility',
		description: 'Provides keyboard shortcuts to be able to resize OSX windows without using the mouse. Additionall it allows you to move windows around your display and between spaces using keyboard shortcuts alone',
		website: 'http://www.irradiatedsoftware.com/sizeup/', 
		icon: 'https://dl2.macupdate.com/images/icons256/30721.png?d=1485897150',
		rating: 8
	},
	{
		title: 'iStat Menus',
		publisher: 'Bjango',
		tag: 'utility',
		description: 'Monitor the status of your computer at all times in the Apple menu bar with useful features like RAM/CPU usage, sensor temps, and hard disk storage',
		website: 'https://bjango.com/mac/istatmenus/', 
		icon: 'https://bjango.com/images/mac/istatmenus6/icon-istatmenus6.png',
		rating: 7
	},
	{
		title: 'Stay',
		publisher: 'Cordless Dog',
		tag: 'using',
		description: 'Create profiles for different monitor setups to always remember where your windows should be when you move between a dual monitor and laptop ony screen set up. It allows you to resize your windows to predetermined szies with dynamic keyboard shortcuts',
		website: 'https://itunes.apple.com/us/app/stay/id435410196?mt=12', 
		icon: 'https://cordlessdog.com/images/StayProductHeader.png',
		rating: 7
	},
	{
		title: 'Bartender' ,
		publisher: 'Surtees Studios',
		tag: 'utility',
		description: 'Hide unwanted clutter in your menu bar in an easy to access submenu to keep only the essentials in your menu bar',
		website: 'https://www.macbartender.com/', 
		icon: 'https://www.macbartender.com/assets/img/B2Icon/icon_512x512@2x.png',
		rating: 9
	},
	{
		title: 'Telegram',
		publisher: 'Telegram',
		tag: 'social',
		description: 'Fantastic chat client with cloud storage of messages and available on all desktop and mobile platforms. And great sticker packs, nough said',
		website: 'https://telegram.org/', 
		icon: 'https://telegram.org/img/t_logo.png',
		rating: 10
	}

];


db.Software.remove({},function(err, softwares){
  	console.log('removed all softwares');
  	db.Software.create(software_list, function(err,softwares){
  		if(err){
  			console.log(err);
  			return; 
  		}
  		console.log('created', software_list.length, 'pieces of software');
  	})
});

