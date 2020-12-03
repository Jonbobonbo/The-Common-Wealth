// when creating a new shop, capture the name of the shop via prompt and insert it into the database then call the displayShop function
function addShop(callback) {
		
	let shopname = prompt("Enter the name of the shop you want to create!");
	
	let campaign = db.collection(camp.value);
	let displayCampaign = campaign.get()
		.then(function(snapshot) {
			
			db.collection(camp.value).doc(shopname).set({})  // hopefully this sets the shop name into firebase with the unique campaign id? it worked!
			getCamp(); // callback to run the function to add this shop to the dropdown list without refreshing the page.

		});
		
}
	
//this is the function that deletes a row from the table and removes it from firebase
function deleteRow(e) {
	
	console.log(event.currentTarget)
		
	let rbutton = event.currentTarget;
	let ritem = rbutton.parentElement;
	let unstock = ritem.id;
	console.log(shopDrop.value);
	
	db.collection(shopDrop.value).doc(unstock)
		.delete();
	
}

// this is the actual shop! the function gets the shop data from firebase and displays it in a table
function displayShop() {

	// the onSnapshot method is a listener that listens for changes in the database and updates in real time
	let myShops = db.collection(shopDrop.value)
		.onSnapshot(function(querySnapshot) {
			
			let shopDrop = document.getElementById("shopDrop");
			let shop = document.getElementById("shop");
			
			if (shop) {
		
				shop.remove();
				console.log(shop);

			} // removes current table before new one is created to avoid multiple tables on the page
				
			let shopTable = document.getElementById("shopTable");

			let table = document.createElement("table");
			table.border='1';
			table.id = "shop";

			let tableBody = document.createElement("tbody");
			tableBody.id = "tableBody";
			table.appendChild(tableBody);

			let tr = document.createElement("tr");
			tableBody.appendChild(tr);

			let th = document.createElement("th");
			th.colSpan = "10";
			th.appendChild(document.createTextNode(shopDrop.value));
			tr.appendChild(th);

			shopTable.appendChild(table);

			// this is to pull the shop data from firebase and shove it into a table. i underestimated how cumbersome this would be and tried doing this dynamically with forEach and for...in loops and even tried setting the firebase doc.data() into an array, but the data was randomized and hard to read so i went with this chunky approach. but hey, it works now!
			querySnapshot.forEach(function(doc) {
				
				//console.log(doc.id, "=>", doc.data());	
				
				let tableBody = document.getElementById("tableBody");
				let shopItem = document.createElement("tr");
				tableBody.appendChild(shopItem)

				let ith = document.createElement("th");
				ith.id = doc.id;
				ith.width = "200";
				ith.innerHTML = doc.id + "<br><br><input type='button' value = 'Remove' onclick='deleteRow(this)'>";
				shopItem.appendChild(ith);
								
				let sCost = document.createElement("td");
				sCost.id = "shopcost";
				sCost.name = doc.data().Coin;
				sCost.width = "200";
				sCost.appendChild(document.createTextNode("Cost: " + doc.data().Cost + doc.data().Coin));
				shopItem.appendChild(sCost);
				
				let sCat = document.createElement("td");
				sCat.id = "shopcat";
				sCat.width = "200";
				sCat.appendChild(document.createTextNode(doc.data().Category));
				shopItem.appendChild(sCat);
				
				let sWeight = document.createElement("td");
				sWeight.id = "shopweight";
				sWeight.width = "200";
				sWeight.appendChild(document.createTextNode("Weight: " + doc.data().Weight))
				shopItem.appendChild(sWeight);
								
				// the properties are not all the same across item collections so now we need if statements to organize the ones that are different into the shop table. having moved these items from their original collections, the only comparisons i could make for the if statements were whether certain properties existed within the doc.data()
				
				// weapons properties
				if (doc.data().Range && doc.data().Special) {
					
					let sSpec = document.createElement("td");
					sSpec.id = "shopSpec";
					sSpec.width = "400";
					sSpec.appendChild(document.createTextNode("Special: " + doc.data().Special));
					shopItem.appendChild(sSpec);
					
					let sDmgS = document.createElement("td");
					sDmgS.id = "shopdmgs";
					sDmgS.width = "200";
					sDmgS.appendChild(document.createTextNode("dmg(S): " + doc.data().DamageS));
					shopItem.appendChild(sDmgS);
					
					let sDmgM = document.createElement("td");
					sDmgM.id = "shopdmgm";
					sDmgM.width = "200";
					sDmgM.appendChild(document.createTextNode("dmg(M): " + doc.data().DamageM));
					shopItem.appendChild(sDmgM);
					
					let scrit = document.createElement("td");
					scrit.id = "shopcrit";
					scrit.width = "200";
					scrit.appendChild(document.createTextNode("Crit: " + doc.data().Critical));
					shopItem.appendChild(scrit);
					
					let sRange = document.createElement("td");
					sRange.id = "shoprange";
					sRange.width = "200";
					sRange.appendChild(document.createTextNode("Range: " + doc.data().Range));
					shopItem.appendChild(sRange);
					
					let sType = document.createElement("td");
					sType.id = "shoptype";
					sType.width = "200"
					sType.appendChild(document.createTextNode("Type: " + doc.data().Type));
					shopItem.appendChild(sType);
									
				}
				// magic armor properties need to appear before armor properties because armor has all the same properties except for description
				else if (doc.data().Description && doc.data().ArmorBonus) {
					
					let sDesc = document.createElement("td");
					sDesc.width = "400";
					sDesc.appendChild(document.createTextNode(doc.data().Description));
					shopItem.appendChild(sDesc);
					
					let sArB = document.createElement("td");
					sArB.id = "shoparb";
					sArB.width = "200";
					sArB.appendChild(document.createTextNode("AC Bonus: " + doc.data().ArmorBonus));
					shopItem.appendChild(sArB);
					
					let sMaxDex = document.createElement("td");
					sMaxDex.id = "shopmaxdex";
					sMaxDex.width = "200";
					sMaxDex.appendChild(document.createTextNode("Max Dex: " + doc.data().MaxDex));
					shopItem.appendChild(sMaxDex);
					
					let sACP = document.createElement("td");
					sACP.id = "shopACP";
					sACP.width = "200";
					sACP.appendChild(document.createTextNode("Armor Check Penalty: " + doc.data().ArmorCheckPenalty));
					shopItem.appendChild(sACP);
					
					let sSPF = document.createElement("td");
					sSPF.id = "shopSPF";
					sSPF.width = "200";
					sSPF.appendChild(document.createTextNode("Spell Failure Chance: " + doc.data().SpellFailure));
					shopItem.appendChild(sSPF);
					
					let sS30 = document.createElement("td");
					sS30.id = "shopS30";
					sS30.width = "200";
					sS30.appendChild(document.createTextNode("Speed 30: " + doc.data().Speed30));
					
					let sS20 = document.createElement("td");
					sS20.id = "shopS20";
					sS20.width = "200";
					sS20.appendChild(document.createTextNode("Speed 20: " + doc.data().Speed20));
					shopItem.appendChild(sS20);
					
				}
				// armor properties
				else if (doc.data().ArmorBonus) {
					
					let sArB = document.createElement("td");
					sArB.id = "shoparb";
					sArB.width = "200";
					sArB.appendChild(document.createTextNode("Armor/Shield Bonus: " + doc.data().ArmorBonus));
					shopItem.appendChild(sArB);
					
					let sMaxDex = document.createElement("td");
					sMaxDex.id = "shopmaxdex";
					sMaxDex.width = "200";
					sMaxDex.appendChild(document.createTextNode("Max Dex: " + doc.data().MaxDex));
					shopItem.appendChild(sMaxDex);
					
					let sACP = document.createElement("td");
					sACP.id = "shopACP";
					sACP.width = "200";
					sACP.appendChild(document.createTextNode("Armor Check Penalty: " + doc.data().ArmorCheckPenalty));
					shopItem.appendChild(sACP);
					
					let sSPF = document.createElement("td");
					sSPF.id = "shopSPF";
					sSPF.width = "200";
					sSPF.appendChild(document.createTextNode("Spell Failure Chance: " + doc.data().SpellFailure));
					shopItem.appendChild(sSPF);
					
					let sS30 = document.createElement("td");
					sS30.id = "shopS30";
					sS30.width = "200";
					sS30.appendChild(document.createTextNode("Speed 30: " + doc.data().Speed30));
					shopItem.appendChild(sS30);
					
					let sS20 = document.createElement("td");
					sS20.id = "shopS20";
					sS20.width = "200";
					sS20.appendChild(document.createTextNode("Speed 20: " + doc.data().Speed20));
					shopItem.appendChild(sS20);
					
				}
				// wands properties
				else if (doc.data().Charges) {
					
					let sSL = document.createElement("td");
					sSL.id = "shopSL";
					sSL.width = "200";
					sSL.appendChild(document.createTextNode("Spell Level: " + doc.data().spellLevel));
					shopItem.appendChild(sSL);
					
					let sCL = document.createElement("td");
					sCL.id = "shopCL";
					sCL.width = "200";
					sCL.appendChild(document.createTextNode("Spell Level: " + doc.data().casterLevel));
					shopItem.appendChild(sCL);
					
					let sCharges = document.createElement("td");
					sCharges.width = "200";
					sCharges.appendChild(document.createTextNode(doc.data().Charges));
					shopItem.appendChild(sCharges);
					
					let sextra = document.createElement("td");
					sextra.colSpan = "3";
					shopItem.appendChild(sextra);
					
				}
				// potions and scrolls properties together! yay one less if statement
				else if (doc.data().spellLevel) {
					
					let sSL = document.createElement("td");
					sSL.id = "shopSL";
					sSL.width = "200";
					sSL.appendChild(document.createTextNode("Spell Level: " + doc.data().spellLevel));
					shopItem.appendChild(sSL);
					
					let sCL = document.createElement("td");
					sCL.id = "shopCL";
					sCL.width = "200";
					sCL.appendChild(document.createTextNode("Spell Level: " + doc.data().casterLevel));
					shopItem.appendChild(sCL);
					
					let sextra = document.createElement("td");
					sextra.colSpan = "5";
					shopItem.appendChild(sextra);
					
				}
				// magic weapons properties
				else if (doc.data().Range && doc.data().Description) {
					
					let sDesc = document.createElement("td");
					sDesc.width = "400";
					sDesc.appendChild(document.createTextNode(doc.data().Description));
					shopItem.appendChild(sDesc);
					
					let sDmgS = document.createElement("td");
					sDmgS.id = "shopdmgs";
					sDmgS.width = "200";
					sDmgS.appendChild(document.createTextNode("dmg(S): " + doc.data().DamageS));
					shopItem.appendChild(sDmgS);
					
					let sDmgM = document.createElement("td");
					sDmgM.id = "shopdmgm";
					sDmgM.width = "200";
					sDmgM.appendChild(document.createTextNode("dmg(M): " + doc.data().DamageM));
					shopItem.appendChild(sDmgM);
					
					let scrit = document.createElement("td");
					scrit.id = "shopcrit";
					scrit.width = "200";
					scrit.appendChild(document.createTextNode("Crit: " + doc.data().Critical));
					shopItem.appendChild(scrit);
					
					let sRange = document.createElement("td");
					sRange.id = "shoprange";
					sRange.width = "200";
					sRange.appendChild(document.createTextNode("Range: " + doc.data().Range));
					shopItem.appendChild(sRange);
					
					let sType = document.createElement("td");
					sType.id = "shoptype";
					sType.width = "200"
					sType.appendChild(document.createTextNode("Type: " + doc.data().Type));
					shopItem.appendChild(sType);
					
				}
				// trade goods and magic items properties, another twofer!
				else if (doc.data().Description) {
					
					let sDesc = document.createElement("td");
					sDesc.width = "400";
					sDesc.colSpan = "6";
					sDesc.appendChild(document.createTextNode(doc.data().Description));
					shopItem.appendChild(sDesc);
						 
				}
							
			});
	
		});
	
} // end displayShop function
	
	
// functions to move items from their original collections into the selected shop's collection. this was a bit tricky. I needed to copy the correct document from the relevent collection in firebase by matching it to the name of the selected value in a select box and then add it to the shop's collection, along with all its properties. Then I had to break that collection down into its parts and assign them to variables so they could be passed into the new collection
function stockWeapons() {
	
	let weapons = db.collection("Weapons");
	let shopWeap = weapons.get() // gets the data from the collection so it can be passed
		.then (function(snapshot) {
			
			snapshot.forEach(function(doc) {
				
				let shopDrop = document.getElementById("shopDrop")
				let toShop = document.getElementById("weapons");
				let chosen = toShop.options[toShop.selectedIndex].value; // defines which document is getting added to the shop collection
				if (doc.id == chosen) {
					
					let specWeap = doc.id; // targets the item name that is selected in the list box and matches it to the document name
					let weapData = doc.data(); // targets the properties of the item that is stored in the collection

					db.collection(shopDrop.value).doc(specWeap).set(weapData);	// takes all the variables and puts them in the different collection
				}
			
			})
			
			displayShop(); // adds to shop without requiring page refresh
			
		});
		
}
	
function stockArmor() {
	
	let armor = db.collection("Armor");
	let shopArmor = armor.get() // gets the data from the collection so it can be passed
		.then (function(snapshot) {
			
			snapshot.forEach(function(doc) {
				
				let shopDrop = document.getElementById("shopDrop")
				let toShop = document.getElementById("armor");
				let chosen = toShop.options[toShop.selectedIndex].value; // defines which document is getting added to the shop collection
				if (doc.id == chosen) {
					
					let specArmor = doc.id; // targets the item name that is selected in the armor list box and matches it to the document name
					let armorData = doc.data(); // targets the properties of the item that is stored in the armor collection

					db.collection(shopDrop.value).doc(specArmor).set(armorData);	// takes all the variables and puts them in the different collection
					
				}
			
			})
			
			displayShop(); // adds to shop without requiring page refresh
			
		});
	
}
	
function stockGoods() {
	
	let goods = db.collection("Trade Goods");
	let shopGoods = goods.get() // gets the data from the collection so it can be passed
		.then (function(snapshot) {
			
			snapshot.forEach(function(doc) {
				
				let shopDrop = document.getElementById("shopDrop")
				let toShop = document.getElementById("goods");
				let chosen = toShop.options[toShop.selectedIndex].value; // defines which document is getting added to the shop collection
				if (doc.id == chosen) {
					
					let specGoods = doc.id; // targets the item name that is selected in the list box and matches it to the document name
					let goodsData = doc.data(); // targets the properties of the item that is stored in the collection

					db.collection(shopDrop.value).doc(specGoods).set(goodsData);	// takes all the variables and puts them in the different collection
					
				}
			
			})
			
			displayShop(); // adds to shop without requiring page refresh
			
		});
	
}
	
function stockWands() {
	
	let wands = db.collection("Wands");
	let shopWands = wands.get() // gets the data from the collection so it can be passed
		.then (function(snapshot) {
			
			snapshot.forEach(function(doc) {
				
				let shopDrop = document.getElementById("shopDrop")
				let toShop = document.getElementById("wands");
				let chosen = toShop.options[toShop.selectedIndex].value; // defines which document is getting added to the shop collection
				if (doc.id == chosen) {
					
					let specWands = doc.id; // targets the item name that is selected in the list box and matches it to the document name
					let wandsData = doc.data(); // targets the properties of the item that is stored in the collection

					db.collection(shopDrop.value).doc(specWands).set(wandsData);	// takes all the variables and puts them in the different collection
					
				}
			
			})
			
			displayShop(); // adds to shop without requiring page refresh
			
		});
	
}
	
function stockPotions() {
	
	let potions = db.collection("Potions");
	let shopPotions = potions.get() // gets the data from the collection so it can be passed
		.then (function(snapshot) {
			
			snapshot.forEach(function(doc) {
				
				let shopDrop = document.getElementById("shopDrop")
				let toShop = document.getElementById("potions");
				let chosen = toShop.options[toShop.selectedIndex].value; // defines which document is getting added to the shop collection
				if (doc.id == chosen) {
					
					let specPotions = doc.id; // targets the item name that is selected in the list box and matches it to the document name
					let potionsData = doc.data(); // targets the properties of the item that is stored in the collection

					db.collection(shopDrop.value).doc(specPotions).set(potionsData);	// takes all the variables and puts them in the different collection
					
				}
			
			})
			
			displayShop(); // adds to shop without requiring page refresh
			
		});
	
}
	
function stockScrolls() {
	
	let scrolls = db.collection("Scrolls");
	let shopScrolls = scrolls.get() // gets the data from the collection so it can be passed
		.then (function(snapshot) {
			
			snapshot.forEach(function(doc) {
				
				let shopDrop = document.getElementById("shopDrop")
				let toShop = document.getElementById("scrolls");
				let chosen = toShop.options[toShop.selectedIndex].value; // defines which document is getting added to the shop collection
				if (doc.id == chosen) {
					
					let specScrolls = doc.id; // targets the item name that is selected in the list box and matches it to the document name
					let scrollsData = doc.data(); // targets the properties of the item that is stored in the collection

					db.collection(shopDrop.value).doc(specScrolls).set(scrollsData);	// takes all the variables and puts them in the different collection
					
				}
			
			})
			
			displayShop(); // adds to shop without requiring page refresh
			
		});
	
}

function stockMA() {
	
	let magicArmor = db.collection("Magic Armor");
	let shopMA = magicArmor.get() // gets the data from the collection so it can be passed
		.then (function(snapshot) {
			
			snapshot.forEach(function(doc) {
				
				let shopDrop = document.getElementById("shopDrop")
				let toShop = document.getElementById("magicarmor");
				let chosen = toShop.options[toShop.selectedIndex].value; // defines which document is getting added to the shop collection
				if (doc.id == chosen) {
					
					let specMA = doc.id; // targets the item name that is selected in the list box and matches it to the document name
					let MAData = doc.data(); // targets the properties of the item that is stored in the collection

					db.collection(shopDrop.value).doc(specMA).set(MAData);	// takes all the variables and puts them in the different collection
					
				}
			
			})
			
			displayShop(); // adds to shop without requiring page refresh
			
		});
	
}
	
function stockMW() {
	
	let magicWeapons = db.collection("Magic Weapons");
	let shopMW = magicWeapons.get() // gets the data from the collection so it can be passed
		.then (function(snapshot) {
			
			snapshot.forEach(function(doc) {
				
				let shopDrop = document.getElementById("shopDrop")
				let toShop = document.getElementById("magicweapons");
				let chosen = toShop.options[toShop.selectedIndex].value; // defines which document is getting added to the shop collection
				if (doc.id == chosen) {
					
					let specMW = doc.id; // targets the item name that is selected in the list box and matches it to the document name
					let MWData = doc.data(); // targets the properties of the item that is stored in the collection

					db.collection(shopDrop.value).doc(specMW).set(MWData);	// takes all the variables and puts them in the different collection
					
				}
				else {
					
					
				}
			
			})
			
			displayShop(); // adds to shop without requiring page refresh
			
		});
	
}
	
function stockMI() {
	
	let magic = db.collection("Magic Items");
	let shopMI = magic.get() // gets the data from the collection so it can be passed
		.then (function(snapshot) {
			
			snapshot.forEach(function(doc) {
				
				let shopDrop = document.getElementById("shopDrop")
				let toShop = document.getElementById("magicitems");
				let chosen = toShop.options[toShop.selectedIndex].value; // defines which document is getting added to the shop collection
				if (doc.id == chosen) {
					
					let specMI = doc.id; // targets the item name that is selected in the list box and matches it to the document name
					let MIData = doc.data(); // targets the properties of the item that is stored in the collection

					db.collection(shopDrop.value).doc(specMI).set(MIData);	// takes all the variables and puts them in the different collection
					
				}
				
				
			})
			
			displayShop(); // adds to shop without requiring page refresh
			
		});
	
}
// end functions that add items to shops
	
	

///////// Setting up Campaigns in firebase to manage shops based on a unique id now //////////	
	
// campaign id to be set in firebase
function newCamp() {
	
	let newCampId = document.getElementById("newcamp");
	camp.value = newCampId.value;
	
	
	newCampId.value = '';
	getCamp();
	
}
	
// getCamp() uses an if/else statement to dynamically generate a drop down list of the shops that are available to edit without needing to reload the page.
function getCamp() {
	
	var campaign = db.collection(camp.value);
	let displayCampaign = campaign.get()
		.then(function(snapshot) {
			
			let shopDrop = document.getElementById("shopDrop");
				
			// the remove method rearranges the select options so the for loop needs to remove the options backwards. this stumped me for a while, why does this even work this way??
			for (let i = shopDrop.options.length - 1; i >= 0 ; i--) {

				shopDrop.options.remove(i);

			} // removing previous select options to prevent duplicates

			snapshot.forEach(function(doc) {

				let listy = new Option(doc.id, doc.id);
				shopDrop.options[shopDrop.options.length] = listy;
					
				}); // grabs the data from Firebase and adds the existing shop names associated with that campaign id to the drop down list 
				
		}).catch(function(error) {

			console.log("Error getting document: ", error);

		});
	
} // end getCamp function 