db.collection(shopDrop.value)
	.onSnapshot(function(querySnapshot) {
	
	storefront();
	
});

// this removes the item from firebase when someone "buys" it and then updates the shop tabl
function buyItem(e) {
	
	console.log(event.currentTarget)
		
	let rbutton = event.currentTarget;
	let ritem = rbutton.parentElement;
	let unstock = ritem.id;
	console.log(shopDrop.value);
	
	db.collection(shopDrop.value).doc(unstock)
		.delete();
	
}

// this is the same as the displayShop() function in the shops.js file with only a couple small changes for the buyer
function storefront(querySnapshot) {

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
			th.colSpan = "11";
			//th.rowSpan = "2";
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
				ith.innerHTML = doc.id + "<br><br><input type='button' value ='Buy!' onclick='Javascript:buyItem(this)'>";
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
					sSpec.colSpan = "2";
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
					sDesc.colSpan = "2";
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
					sextra.colSpan = "4";
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
					sDesc.colSpan = "2";
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
					sDesc.colSpan = "7";
					sDesc.appendChild(document.createTextNode(doc.data().Description));
					shopItem.appendChild(sDesc);
						 
				}
							
			});
	
		});
			
} //end displayShop function