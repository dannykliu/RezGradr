var ref = new Firebase('https://rezgrader.firebaseIO.com/');
$(function() {
	//Enter data into databasec
	$("#form").submit(function(event) {
		if(+$("#rating").val() > 10 || +$("#rating").val() < 1){
			//$('#validRating').html('Invalid Rating!');
            alert('Invalid rating!');
            event.preventDefault();
		}
		else {
			ref.push().set(+$("#rating").val());
			event.preventDefault();
		}
        $('#rating').val('');
	});

    
	//Computes data and spits it back onto the screen
	var total = 0;
	ref.on("value", function(snapshot) {
		snapshot.forEach(function(childSnapshots){
			total += childSnapshots.val();
			console.log("total "+total);
			console.log(snapshot.numChildren());
		})
		averageRating = (total/snapshot.numChildren()).toFixed(2);
		console.log("avg rating "+averageRating);
		if(snapshot.numChildren()<1){
			document.getElementById("myLink").innerHTML= "___";
		}
		else{
			document.getElementById("myLink").innerHTML=averageRating;
		}
		total = 0;
	});

    //name variable here is sent by our router
    //remember we put our uploads folder in the public directory because that's the default directory of all static files such as pdfs due to the express.static middleware function we used earlier
    //$('#submitResume').attr('href', 'resumes/' + name);

	//Creates a user
	$("#formRegister").submit(function(event){
		ref.createUser({
			email    : "bobtony@firebase.com",
			password : "correcthorsebatterystaple"
		}, function(error, userData) {
			if (error) {
				console.log("Error creating user:", error);
			} else {
				console.log("Successfully created user account with uid:", userData.uid);
			}
		});
	});

}, function (errorObject) {
	console.log("The read failed: " + errorObject.code);
});
