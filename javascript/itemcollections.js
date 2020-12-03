function storeItems(callback) {
	
	if (stock.value == "weapons"){
		
		let dmgS = document.getElementById("dmgS");
		let dmgM = document.getElementById("dmgM");
		let crit = document.getElementById("crit");
		let range = document.getElementById("range");
		let type = document.getElementById("type");
		let special = document.getElementById("special");
		
		db.collection("Weapons").doc(item.value).set({

			Category: category.value,
			Cost: cost.value,
			Coin: coinage.value,
			Weight: weight.value,
			DamageS: dmgS.value,
			DamageM: dmgM.value,
			Critical: crit.value,
			Range: range.value,
			Type: type.value,
			Special: special.value
			
		}).then( function() { 

			console.log("Document successfully written");
			listWeapons();

			category.value = '';
			item.value = '';
			cost.value = '';
			weight.value = '';
			dmgS.value = '';
			dmgM.value = '';
			crit.value = '';
			range.value = '';
			type.value = '';
			special.value = '';

		}).catch (function(error) {

			console.log("Error writing to the document: ", error);

		});
		
	}
	else if (stock.value == "armor") {
		
		let arBonus = document.getElementById("arBonus");
		let maxDex = document.getElementById("maxDex");
		let acPenalty = document.getElementById("acPenalty");
		let spellFail = document.getElementById("spellFail");
		let speed30 = document.getElementById("speed30");
		let speed20 = document.getElementById("speed20");
		
		db.collection("Armor").doc(item.value).set({

			Category: category.value,
			Cost: cost.value,
			Coin: coinage.value,
			Weight: weight.value,
			ArmorBonus: arBonus.value,
			MaxDex: maxDex.value,
			ArmorCheckPenalty: acPenalty.value,
			SpellFailure: spellFail.value,
			Speed30: speed30.value,
			Speed20: speed20.value  

    	}).then (function() { 

			console.log("Document successfully written");
			listArmor();

			category.value = '';
			item.value = '';
			cost.value = '';
			weight.value = '';
			arBonus.value = '';
			maxDex.value = '';
			acPenalty.value = '';
			spellFail.value = '';
			speed30.value = '';
			speed20.value = '';

		}).catch (function(error) {

			console.log("Error writing to the document: ", error);

		});
		
	}
	else if (stock.value == "goods") {
		
		let desc = document.getElementById("desc");
    
    	db.collection("Trade Goods").doc(item.value).set({

			Category: category.value,
			Cost: cost.value,
			Coin: coinage.value,
			Weight: weight.value,
			Description: desc.value

    	}).then (function() {
			
			console.log ("Document successfully written");
			listGoods();

			category.value = '';
			item.value = '';
			cost.value = '';
			weight.value = '';
			desc.value = '';
		
		}).catch (function(error) {

			console.log("Error writing to the document: ", error);

		});
		
	}
	else if (stock.value == "wands") {
		
		let spellLvl = document.getElementById("spellLvl");
		let casterLvl = document.getElementById("casterLvl");
		let charges = document.getElementById("charges");

		db.collection("Wands").doc(item.value).set({

			Category: category.value,
			Cost: cost.value,
			Coin: coinage.value,
			Weight: weight.value,
			spellLevel: spellLvl.value,
			casterLevel: casterLvl.value,
			Charges: charges.value       

		}).then (function() {
			
			console.log ("Document successfully written");
			listWands();

			category.value = '';
			item.value = '';
			cost.value = '';
			weight.value = '';
			spellLvl.value = '';
			casterLvl.value = '';
			charges.value = '';

		}).catch (function(error){
			
			console.log("Error writing to the document: ", error);
			
		});
			
	}
	else if (stock.value == "potions") {
		
		let spellLvl = document.getElementById("spellLvl");
		let casterLvl = document.getElementById("casterLvl");

		db.collection("Potions").doc(item.value).set({

			Category: category.value,
			Cost: cost.value,
			Coin: coinage.value,
			Weight: weight.value,
			spellLevel: spellLvl.value,
			casterLevel: casterLvl.value     

		}).then (function() {
			
			console.log ("Document successfully written");
			listPotions();

			category.value = '';
			item.value = '';
			cost.value = '';
			weight.value = '';
			spellLvl.value = '';
			casterLvl.value = '';

		}).catch (function(error){
			
			console.log("Error writing to the document: ", error);
			
		});
		
	}
	else if (stock.value == "scrolls") {
		
		let spellLvl = document.getElementById("spellLvl");
		let casterLvl = document.getElementById("casterLvl");

		db.collection("Scrolls").doc(item.value).set({

			Category: category.value,
			Cost: cost.value,
			Coin: coinage.value,
			Weight: weight.value,
			spellLevel: spellLvl.value,
			casterLevel: casterLvl.value      

		}).then (function() {

			console.log ("Document successfully written");
			listScrolls();
			
			category.value = '';
			item.value = '';
			cost.value = '';
			weight.value = '';
			spellLvl.value = '';
			casterLvl.value = '';

		}).catch (function(error){
			
			console.log("Error writing to the document: ", error);
			
		});
		
	}
	else if (stock.value == "magicArmor") {
		
		let arBonus = document.getElementById("arBonus");
		let maxDex = document.getElementById("maxDex");
		let acPenalty = document.getElementById("acPenalty");
		let spellFail = document.getElementById("spellFail");
		let speed30 = document.getElementById("speed30");
		let speed20 = document.getElementById("speed20");
		let desc = document.getElementById("desc");
		
		db.collection("Magic Armor").doc(item.value).set({

			Category: category.value,
			Cost: cost.value,
			Coin: coinage.value,
			Weight: weight.value,
			ArmorBonus: arBonus.value,
			MaxDex: maxDex.value,
			ArmorCheckPenalty: acPenalty.value,
			SpellFailure: spellFail.value,
			Speed30: speed30.value,
			Speed20: speed20.value,
			Description: desc.value

    	}).then (function() { 

			console.log("Document successfully written");
			listMA();
			
			category.value = '';
			item.value = '';
			cost.value = '';
			weight.value = '';
			arBonus.value = '';
			maxDex.value = '';
			acPenalty.value = '';
			spellFail.value = '';
			speed30.value = '';
			speed20.value = '';
			desc.value = '';

		}).catch (function(error) {

			console.log("Error writing to the document: ", error);

		});
		
	}
	else if (stock.value == "magicWeapons") {

		let dmgS = document.getElementById("dmgS");
		let dmgM = document.getElementById("dmgM");
		let crit = document.getElementById("crit");
		let range = document.getElementById("range");
		let type = document.getElementById("type");
		let desc = document.getElementById("desc");
		
		db.collection("Magic Weapons").doc(item.value).set({

			Category: category.value,
			Cost: cost.value,
			Coin: coinage.value,
			Weight: weight.value,
			DamageS: dmgS.value,
			DamageM: dmgM.value,
			Critical: crit.value,
			Range: range.value,
			Type: type.value,
			Description: desc.value
			
		}).then( function() { 

			console.log("Document successfully written");
			listMW();

			category.value = '';
			item.value = '';
			cost.value = '';
			weight.value = '';
			dmgS.value = '';
			dmgM.value = '';
			crit.value = '';
			range.value = '';
			type.value = '';
			desc.value = '';

		}).catch (function(error) {

			console.log("Error writing to the document: ", error);

		});
		
	}
	else if (stock.value == "magic") {
		
		let desc = document.getElementById("desc");

		db.collection("Magic Items").doc(item.value).set({

			Category: category.value,
			Cost: cost.value,
			Coin: coinage.value,
			Weight: weight.value,
			Description: desc.value

		}).then (function() {

			console.log("Document successfully written");
			listMI(); // callback
			
			category.value = '';
			item.value = '';
			cost.value = '';
			weight.value = '';
			desc.value = '';
		
		}).catch (function(error) {
		
			console.log("Error writing to the document: ", error);
		
		});
	
	}
	
} // end storeItems function
// end adding to item collections