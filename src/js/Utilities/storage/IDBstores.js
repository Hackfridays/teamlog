define(
	['config'],
	function (config)
	{
		var IDBstores = function(event) {
					
			console.log("Upgrading IDB.")
			
			// fail-safe
			return null;
			
			var db = event.target.result;
			var objectStore;
			
			// System
			objectStore = db.createObjectStore("system", { keyPath: "id" });
			
			// Me (current user)
			objectStore = db.createObjectStore("me", { keyPath: "id" });
			
			// Channels
			objectStore = db.createObjectStore("channels", { keyPath: "id" });
			objectStore.createIndex("type", "type", { unique: false });
				
			// Messages
			objectStore = db.createObjectStore("messages", { keyPath: "id" });
			objectStore.createIndex("stream", "stream", { unique: false });
			
			// Notifications
			objectStore = db.createObjectStore("notifications", { keyPath: "id" });
			objectStore.createIndex("stream", "stream", { unique: false });
			
			// Users
			objectStore = db.createObjectStore("users", { keyPath: "id" });
			objectStore.createIndex("name", "displayname", { unique: false });
			
			// Ping (polling)
			objectStore = db.createObjectStore("ping", { keyPath: "id" });
		}
		
		return IDBstores;
});