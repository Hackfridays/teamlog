test code:

		<script type="text/javascript">
			function makeRequest() {
			
				var request = gapi.client.drive.about.get();
				
				request.execute(function(resp) {
					console.log('Response', resp);
					var files = resp.files;
					if (files && files.length > 0) {
						for (var i = 0; i < files.length; i++) {
							var file = files[i];
							console.log(file.name + ' (' + file.id + ')');
						}
					} else {
						console.log('No files found.');
					}
				});
      
			}
			
			function handleAuthResult (resp)
			{
				console.log('auth process:', resp)
			}
			
			function checkAuth() {
				console.log('init started');
				gapi.auth.authorize({client_id: '378076366908-q7c8cq5ojpvsu036t3j2v5fgdouj3q6a.apps.googleusercontent.com', scope: ['https://www.googleapis.com/auth/drive'], immediate: true}, handleAuthResult);
			}
			
			function init() {
			  
				console.log('init started')
				gapi.client.setApiKey("AIzaSyD69MlWfS_pOo_XxBUoVuSEkg0ue9mj6iE");
				gapi.client.load('drive', 'v3').then(makeRequest);
			}	
			
		</script>
		<script src="https://apis.google.com/js/client.js?onload=checkAuth"></script>