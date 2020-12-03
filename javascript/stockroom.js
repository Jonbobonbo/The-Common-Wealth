let stock = document.getElementById("stock");
let additem = document.getElementById("additem");
let camp =  document.getElementById("camp");
let shop =  document.getElementById("shop");
	
let category = document.getElementById("category");
let item = document.getElementById("item");
let cost = document.getElementById("cost");
let weight = document.getElementById("weight");

// had to put these into functions so i could use them in callbacks to eliminate the need for page refreshing
window.onload = listWeapons();
window.onload = listArmor();
window.onload = listGoods();
window.onload = listWands();
window.onload = listPotions();
window.onload = listScrolls();
window.onload = listMW();
window.onload = listMA();
window.onload = listMI();
	

// display all the weapons stored in firebase in the Stock Room portion of the app
function listWeapons() {
	
	let weapons = db.collection("Weapons");
	let displayWeapons = weapons.get()
		.then(function(snapshot) {

			snapshot.forEach(function(doc) {

				let weapStash = document.getElementById("weapons");
				let listy = new Option(doc.id, doc.id)
				weapStash.options[weapStash.options.length] = listy;

			});

		}).catch(function(error) {

			console.log("Error getting document: ", error);

	});
	
}

// display all the armor stored in firebase in the Stock Room portion of the app
function listArmor() {
	
	let armor = db.collection("Armor");
	let displayArmor = armor.get()
		.then(function(snapshot) {

			snapshot.forEach(function(doc) {

				let armorStash = document.getElementById("armor");
				let listy = new Option(doc.id, doc.id)
				armorStash.options[armorStash.options.length] = listy;

			});

		}).catch(function(error) {

			console.log("Error getting document: ", error);

	});
	
}

// display all the trade goods stored in firebase in the Stock Room portion of the app
function listGoods() {
	
	let goods = db.collection("Trade Goods");
	let displayGoods = goods.get()
		.then(function(snapshot) {

			snapshot.forEach(function(doc) {

				let goodsStash = document.getElementById("goods");
				let listy = new Option(doc.id, doc.id)
				goodsStash.options[goodsStash.options.length] = listy;

			});

		}).catch(function(error) {

			console.log("Error getting document: ", error);

	});
	
}

// display all the wands stored in firebase in the Stock Room portion of the app
function listWands() {
	
	let wands = db.collection("Wands");
	let displayWands = wands.get()
		.then(function(snapshot) {

			snapshot.forEach(function(doc) {

				let wandsStash = document.getElementById("wands");
				let listy = new Option(doc.id, doc.id)
				wandsStash.options[wandsStash.options.length] = listy;

			});

		}).catch(function(error) {

			console.log("Error getting document: ", error);

	});
	
}

// display all the potions stored in firebase in the Stock Room portion of the app
function listPotions() {
	
	let potions = db.collection("Potions");
	let displayPotions = potions.get()
		.then(function(snapshot) {

			snapshot.forEach(function(doc) {

				let potionsStash = document.getElementById("potions");
				let listy = new Option(doc.id, doc.id)
				potionsStash.options[potionsStash.options.length] = listy;

			});

		}).catch(function(error) {

			console.log("Error getting document: ", error);

	});
	
}

// display all the scrolls stored in firebase in the Stock Room portion of the app
function listScrolls() {
	
	let scrolls = db.collection("Scrolls");
	let displayScrolls = scrolls.get()
		.then(function(snapshot) {

			snapshot.forEach(function(doc) {

				let scrollsStash = document.getElementById("scrolls");
				let listy = new Option(doc.id, doc.id)
				scrollsStash.options[scrollsStash.options.length] = listy;

			});

		}).catch(function(error) {

			console.log("Error getting document: ", error);

	});	
	
}

// display all the magic armor stored in firebase in the Stock Room portion of the app
function listMA() {
	
	let magicArmor = db.collection("Magic Armor");
	let displayMA = magicArmor.get()
		.then(function(snapshot) {

			snapshot.forEach(function(doc) {

				let MAStash = document.getElementById("magicarmor");
				let listy = new Option(doc.id, doc.id)
				MAStash.options[MAStash.options.length] = listy;

			});

		}).catch(function(error) {

			console.log("Error getting document: ", error);

	});
	
}
	
// display all the magic weapons stored in firebase in the Stock Room portion of the app
function listMW() {
	
	let magicWeapons = db.collection("Magic Weapons");
	let displayMW = magicWeapons.get()
		.then(function (snapshot) {

			snapshot.forEach(function(doc) {

				let MWStash = document.getElementById("magicweapons");
				let listy = new Option(doc.id, doc.id)
				MWStash.options[MWStash.options.length] = listy;

			});

		}).catch(function(error) {

			console.log("Error getting document: ", error);

	});	
	
}

// display all the magic items stored in firebase in the Stock Room portion of the app
function listMI() {
	
	let magic = db.collection("Magic Items");
	let displayMagic = magic.get()
		.then(function(snapshot) {

			snapshot.forEach(function(doc) {

				let magicStash = document.getElementById("magicitems");
				let listy = new Option(doc.id, doc.id)
				magicStash.options[magicStash.options.length] = listy;

			});

		}).catch(function(error) {

			console.log("Error getting document: ", error);

	});	
	
}
// end displaying firebase data in stock room
	
// drop down menu determines which inputs to display when adding a new item to the stock room. these values will determine the object's properties in firebase
function chooseStock() {

    let newitem = document.getElementById("newitem");
    let props = document.getElementById("props");

    props.innerHTML = ''; // clears the div to append the proper input fields so they don't just all end up stacking on top of each other

    // if statements to show different inputs depending on which drop down input is selected
    if (stock.value == "weapons") {

        let dmgS = document.createElement( "input" );
        dmgS.id = "dmgS";
        dmgS.type = "text";
        dmgS.placeholder = "Dmg(S)";
        props.appendChild(dmgS);

        let dmgM = document.createElement( "input");
        dmgM.id = "dmgM";
        dmgM.type = "text";
        dmgM.placeholder = "Dmg(M)";
        props.appendChild(dmgM);

        let crit = document.createElement( "input" );
        crit.id = "crit";
        crit.type = "text"
        crit.placeholder = "Critical";
        props.appendChild(crit);

        let range = document.createElement( "input" );
        range.id = "range";
        range.type = "text";
        range.placeholder = "Range";
        props.appendChild(range);
		
		let type = document.createElement( "input" );
		type.id = "type";
		type.type = "text";
		type.placeholder = "Damage Type";
		props.appendChild(type);

        let special = document.createElement( "textarea" );
        special.id = "special";
        special.placeholder = "Special";
        props.appendChild(special);

    }

    if (stock.value == "armor") {

        let arBonus = document.createElement( "input" );
        arBonus.id = "arBonus";
        arBonus.type = "text";
        arBonus.placeholder = "Armor Bonus";
        props.appendChild(arBonus);

        let maxDex = document.createElement( "input" );
        maxDex.id = "maxDex";
        maxDex.type = "text";
        maxDex.placeholder = "Max Dex Bonus";
        props.appendChild(maxDex);

        let acPenalty = document.createElement( "input" );
        acPenalty.id = "acPenalty";
        acPenalty.type = "text";
        acPenalty.placeholder = "Armor Check Penalty";
        props.appendChild(acPenalty);

        let spellFail = document.createElement( "input" );
        spellFail.id = "spellFail";
        spellFail.type = "text";
        spellFail.placeholder = "Spell Failure Chance";
        props.appendChild(spellFail);

        let speed30 = document.createElement( "input" );
        speed30.id = "speed30";
        speed30.type = "text";
        speed30.placeholder = "Speed 30";
        props.appendChild(speed30);

        let speed20 = document.createElement( "input" );
        speed20.id = "speed20";
        speed20.type = "text";
        speed20.placeholder = "Speed 20";
        props.appendChild(speed20);

    }

    if (stock.value == "goods") {

        let desc = document.createElement( "textarea" );
        desc.id = "desc";
        desc.placeholder = "Item Description";
        props.appendChild(desc);      
        
    }

    if (stock.value == "wands") {

        let spellLvl = document.createElement( "input" );
        spellLvl.id = "spellLvl";
        spellLvl.type = "text";
        spellLvl.placeholder = "Spell Level";
        props.appendChild(spellLvl);

        let casterLvl = document.createElement( "input");
        casterLvl.id = "casterLvl";
        casterLvl.type = "text";
        casterLvl.placeholder = "Caster Level";
        props.appendChild(casterLvl);

        let charges = document.createElement( "input" );
        charges.id = "charges";
        charges.type = "text"
        charges.placeholder = "Charges";
        props.appendChild(charges);   

    }

    if (stock.value == "potions") {

        let spellLvl = document.createElement( "input" );
        spellLvl.id = "spellLvl";
        spellLvl.type = "text";
        spellLvl.placeholder = "Spell Level";
        props.appendChild(spellLvl);

        let casterLvl = document.createElement( "input");
        casterLvl.id = "casterLvl";
        casterLvl.type = "text";
        casterLvl.placeholder = "Caster Level";
        props.appendChild(casterLvl);
        
    }

    if (stock.value == "scrolls") {

        let spellLvl = document.createElement( "input" );
        spellLvl.id = "spellLvl";
        spellLvl.type = "text";
        spellLvl.placeholder = "Spell Level";
        props.appendChild(spellLvl);

        let casterLvl = document.createElement( "input");
        casterLvl.id = "casterLvl";
        casterLvl.type = "text";
        casterLvl.placeholder = "Caster Level";
        props.appendChild(casterLvl);      

    }

    if (stock.value == "magicArmor") {

        let arBonus = document.createElement( "input" );
        arBonus.id = "arBonus";
        arBonus.type = "text";
        arBonus.placeholder = "Armor Bonus";
        props.appendChild(arBonus);

        let maxDex = document.createElement( "input" );
        maxDex.id = "maxDex";
        maxDex.type = "text";
        maxDex.placeholder = "Max Dex Bonus";
        props.appendChild(maxDex);

        let acPenalty = document.createElement( "input" );
        acPenalty.id = "acPenalty";
        acPenalty.type = "text";
        acPenalty.placeholder = "Armor Check Penalty";
        props.appendChild(acPenalty);

        let spellFail = document.createElement( "input" );
        spellFail.id = "spellFail";
        spellFail.type = "text";
        spellFail.placeholder = "Spell Failure Chance";
        props.appendChild(spellFail);

        let speed30 = document.createElement( "input" );
        speed30.id = "speed30";
        speed30.type = "text";
        speed30.placeholder = "Speed 30";
        props.appendChild(speed30);

        let speed20 = document.createElement( "input" );
        speed20.id = "speed20";
        speed20.type = "text";
        speed20.placeholder = "Speed 20";
        props.appendChild(speed20);

        let desc = document.createElement( "textarea" );
        desc.id = "desc";
        desc.placeholder = "Item Description";
        props.appendChild(desc);        

    }

    if (stock.value == "magicWeapons") {

        let dmgS = document.createElement( "input" );
        dmgS.id = "dmgS";
        dmgS.type = "text";
        dmgS.placeholder = "Dmg(S)";
        props.appendChild(dmgS);

        let dmgM = document.createElement( "input");
        dmgM.id = "dmgM";
        dmgM.type = "text";
        dmgM.placeholder = "Dmg(M)";
        props.appendChild(dmgM);

        let crit = document.createElement( "input" );
        crit.id = "crit";
        crit.type = "text"
        crit.placeholder = "Critical";
        props.appendChild(crit);

        let range = document.createElement( "input" );
        range.id = "range";
        range.type = "text";
        range.placeholder = "Range";
        props.appendChild(range);
		
		let type = document.createElement( "input" );
		type.id = "type";
		type.type = "text";
		type.placeholder = "Damage Type";
		props.appendChild(type);

        let desc = document.createElement( "textarea" );
        desc.id = "desc";
        desc.placeholder = "Item Description";							
        props.appendChild(desc);

    }

    if (stock.value == "magic") {

        let desc = document.createElement( "textarea" );
        desc.id = "desc";
        desc.placeholder = "Item Description";
        props.appendChild(desc);

    }

} // end chooseStock() function