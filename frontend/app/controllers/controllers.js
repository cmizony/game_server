app.controller('GeneralController', function ($scope) {

	$('[data-toggle="tooltip"]').tooltip();
	$("#join-submit").click(send_suscription);
	$.get(BASE_URL+"/summary_donations", load_summary_donations);

	// Bind feature to open tabs
	$("#feature-lives").click(function(){ $('a[href="#tab-players"]').tab('show') });
	$("#feature-score").click(function(){ $('a[href="#tab-players"]').tab('show') });
	$("#feature-rewards").click(function(){ $('a[href="#tab-rewards"]').tab('show') });
	$("#feature-structures").click(function(){ $('a[href="#tab-structures"]').tab('show') });
	$("#feature-map").click(function(){ $('a[href="#tab-map"]').tab('show') });

	function load_summary_donations (data)  {
		var content = "";
		
		// Top daily donator
		content = "<code>"+data.top_weekly.username+" $"+data.top_weekly.amount+"</code> ";
		$("#weekly-donator").html(content);
		
		
		// Top daily donator
		content = "<code>"+data.top_daily.username+" $"+data.top_daily.amount+"</code> ";
		$("#daily-donator").html(content);

		// Sum monthly donation
		var serverCost = 12;
		var percentage = parseInt(data.sum_monthly*100/serverCost);

		$("#progress-donation").css("width",Math.min(100,percentage) + "%");
		$("#progress-donation").html(percentage + "%");
		$("#monthly-donation").html("<code>$" +  data.sum_monthly + "</code>");
	}	

	function send_suscription ()
	{
		var inputName = $("#input-name").val();
		var inputEmail = $("#input-email").val();

		// Check valid input
		if (inputName == "" || inputEmail == "")
		{
			new PNotify({
				text: 'Please fill your name & email',
				type: 'error'
			});
		}

		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
		if (!re.test(inputEmail))
		{
			new PNotify({
				text: 'Please enter a valid email',
				type: 'error'
			});
		}

		var post_data = JSON.stringify({name: inputName, email:inputEmail});

		$.post( BASE_URL+"/player", post_data, function (data){
			
			if (data.error){
				new PNotify({
					text: data.error,
					type: 'error'
				});
			}

			if (data.success) {
				new PNotify({
					text: data.success,
					type: 'success'
				});
				new PNotify({
					text: "Welcome to the server. Please check the forum to stay updated.",
					type: 'info'
				});
				
				$('#modal-join-server').modal('hide')
			}

		},"json");
	}

});

app.controller('PlayersController', function ($scope) {

});

app.controller('RewardsController', function ($scope) {

});

app.controller('ForumController', function ($scope) {

});

app.controller('StructuresController', function ($scope) {
	
});

app.controller('StatisticsController', function ($scope) {
	
});

app.controller('EmptyController', function ($scope) {

});
