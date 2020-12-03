// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyCztUJW5XFPH9GggIlw1rkjBgnAWT_aS68",
authDomain: "web-104-application-85056.firebaseapp.com",
databaseURL: "https://web-104-application-85056.firebaseio.com",
projectId: "web-104-application-85056",
storageBucket: "web-104-application-85056.appspot.com",
messagingSenderId: "115233459484",
appId: "1:115233459484:web:940b621f1832e44662fed9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// existing user sign in 
function signIn() {
	
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function(user) {
		
			email = '';
			password = '';
			alert ("You have successfully logged in.");
		
		})
  		.catch(function(error) {
		
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode === "auth/wrong-password"){
				
				alert("Sorry, that password is incorrect.");
				
			}
			else {
				
				alert(errorMessage);
				
			}
		
  	});
	
} // end user sign in

// new users sign up
function signUp() {
	
	let newemail = document.getElementById("newemail").value;
	let newpass = document.getElementById("newpass").value;
	let newpass2 = document.getElementById("newpass2").value;
	
	if (newpass != newpass2) {
		
		alert("Passwords don't match!");
		return;
		
	}
	
	firebase.auth().createUserWithEmailAndPassword(newemail, newpass)
		.then(function(user) {
		
		alert("Login successfully created!");
		
	})
	.catch(function(error) {
		
		var errorCode = error.code;
		var errorMessage = error.message;

		if (errorCode === "auth/weak-password") {

			alert("That password is too weak, make a stronger password");

		}
		else {

			alert(errorMessage);

		}
		
	});
	
}

// listener to authenticate current user login state and display that state in the top right corner of the page
firebase.auth().onAuthStateChanged(function (user) {
	
	let listen = document.getElementById("listen");
	let inout = document.createElement("p");
	inout.id = "nospam";
	listen.appendChild(inout);
	let nospam = document.getElementById("nospam");
	
	
 	if (user) {

		nospam.innerText = "You are currently: Signed In";
		let outbutt = document.createElement("button");
		outbutt.id = "outbutt";
		outbutt.innerHTML = "Sign Out";
		outbutt.onclick = function logOut(inout) {

			firebase.auth().signOut()
				.then (function() {

				alert ("Successfully Signed Out.");
				inout.remove();

			});

		}

		listen.appendChild(outbutt);

  	} 
	else if (!user && window.location != "http://web-07.scwebsrv.com/public_html/web104/final-project/index.html") {
	  
    // if user is signed out and not on the home page, they get booted back there until they sign in
    window.location = "http://web-07.scwebsrv.com/public_html/web104/final-project/index.html";
	
  	}
	else {
		
		listen.removeChild;
		nospam.innerText = "You are currently: Signed Out";
		let rembutt = document.getElementById("outbutt");
		rembutt.remove();
	}
	
});

// this function uses the giant button to take the user to the shop manager page. if they are not signed in, it will alert the user to sign in first and remain on the index page
function DM() {
	
	firebase.auth().onAuthStateChanged(function (user) {
		
		if (user) {
			
			window.location = "/public_html/web104/final-project/shopmanager.html";
			
		}
		else {
			
			alert("Sorry, you need to be signed in to do that.");
			
		}
		
	});
	
}

// this function uses the giant button to take the user to the marketplace page. if they are not signed in, it will alert the user to sign in first and remain on the index page
function PC() {
	
	firebase.auth().onAuthStateChanged(function (user) {
		
		if (user) {
			
			window.location = "/public_html/web104/final-project/marketplace.html";
			
		}
		else {
			
			alert("Sorry, you need to be signed in to do that.");
			
		}
		
	});
	
}