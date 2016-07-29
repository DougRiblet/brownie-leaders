var Reminders = (function (){
	var remAPI;

	remAPI = {
		// reminders( { sessionID: .. } )
		getReminders : function (data) {
			var promiseGetRem = $.ajax("/api/reminders",{
				method: "GET",
				data: data,
				dataType: "json",
				cache: false
			});
			// success => JSON response as an array of reminders,
			// each with the information necessary to display and also a reminderID
			return promiseGetRem;
		};

		// ignoreReminder( { sessionID: .., reminderID: .. } )
		ignoreReminder : function (data) {
			var promiseIgRem = $.ajax("/api/reminder/ignore",{
				method: "POST",
				data: data,
				dataType: "text",
				cache: false,
			});
			// success, => 200 status response, failure => 500 status response;
			// no response text is provided either way.
			return promiseIgRem;
		};

		// deleteReminder( { sessionID: .., reminderID: .. } )
		deleteReminder : function(data) {
			var promiseDelRem = $.ajax("/api/reminder/delete",{
				method: "POST",
				data: data,
				dataType: "text",
				cache: false
			});
			// success => 200 status response, failure => 500 status response; 
			// no response text is provided either way.
			return promiseDelRem;
		};

		// addReminder( {
		//    sessionID: ..,
		//    description: ..,
		//    date: ..,
		//    time: ..,
		//    duration: ..
		// } )
		addReminder : function (data) {
			var promiseAddRem = $.ajax("/api/reminder/add",{
				method: "POST",
				data: data,
				dataType: "text",
				cache: false
			});
			//success => reminder ID as the response text.
			return promiseAddRem;
		};

		// updateReminder( {
		//    sessionID: ..,
		//    reminderID: ..,
		//    description: ..,
		//    date: ..,
		//    time: ..,
		//    duration: ..
		// } )
		updateReminder : function(data) {
			var promiseUpdRem = $.ajax("/api/reminder/update",{
				method: "POST",
				data: data,
				dataType: "text",
				cache: false
			});
			// success => 200 status response, failure => 500 status response; 
			// no response text is provided either way.
			return promiseUpdRem;
		};

	};

	return remAPI;

})();



var ReminderFormat = (function (){
	var remFormAPI;

	remFormAPI = {
		// parse a date/time pair in UTC as JS does, but then force
		// it to behave as if it was specified in the local timezone
		reminderTimestamp : function (date,time) {
			var tz = (new Date()).toString().match(/\((.+)\)$/)[1];
			var utc = new Date(date + "T" + time);
			var str = utc.toUTCString();
			str = str.replace(/GMT$/,tz);
			return (new Date(str)).getTime();
		};

		// format a date and time in a friendlier way
		formatReminderDateTime : function (date,time) {
			var ts = new Date(reminderTimestamp(date,time));
			var hours = ts.getHours(), minutes = ts.getMinutes(), ampm;
			ampm = (hours > 11) ? "pm" : "am";
			hours = (hours + 11) % 12 + 1;
			return ts.toLocaleDateString() + " " +
				hours + ":" + (minutes < 10 ? "0" : "") + minutes + ampm;
		};

		// HINT: use this function to build the reminder DOM element for
		// each reminder in the list. IT DOES NOT ADD IT to the DOM, though,
		// only return it to you for you to add somewhere.
		buildReminderElement : function (reminder) {
			var $reminder = $reminderTemplate.clone();

			$reminder.attr("data-reminder-id",reminder.reminderID);
			$reminder.find(".description").text(reminder.description);
			$reminder.find(".datetime").text(
				formatReminderDateTime(reminder.date,reminder.time)
			);
			if (reminder.duration > 0) {
				$reminder.find(".duration > .count").text(reminder.duration);
			}
			else {
				$reminder.find(".duration").hide();
			}
			if (reminder.createdBy != null) {
				$reminder.find(".createdBy > .user").text(reminder.createdBy);
				$reminder.find(".buttons > .edit, .buttons > .delete").hide();
			}
			else {
				$reminder.find(".createdBy").hide();
				$reminder.find(".buttons > .ignore").hide();
			}
			if (reminder.invitees != "") {
				var invitees = reminder.invitees.join(", ");
				$reminder.find(".invitees > .users").text(invitees);
			}
			else {
				$reminder.find(".invitees").hide();
			}

			return $reminder;
		};

	};

	return remFormAPI;

})();


var Invite = (function (){
	var inviteAPI;

	inviteAPI = {
		// inviteToReminder( { sessionID: .., reminderID: .., invite: .. } )
		var promiseInviteToRem = inviteToReminder : function (data) {
			$.ajax("/api/reminder/invite",{
				method: "POST",
				data: data,
				dataType: "text",
				cache: false,
			});
			// success, => 200 status response, failure => 500 status response;
			// both return a comma-separated list with current valid invitees of the reminder
			return promiseInviteToRem;
		}
	};

	// separate methods for adding invitees and removing invitees ??

	return inviteAPI;

})();

