var app = new Vue({
    el: '#voting',
    data: {
        candidates: []
    },
    methods: {
        selectCan: function(can) {

            // Change Selected Value on Object
            if (can.selected) {
				this.$http.get('https://sudoapistaging.herokuapp.com/api/pitch/downvote/' + can.id).then(function(response) {
					console.log("Sucess");
				}, function(response) {
					// error callback
				});
                can.selected = false;
            } else {
                if (!can.disabled) {
					this.$http.get('https://sudoapistaging.herokuapp.com/api/pitch/vote/' + can.id).then(function(response) {
						console.log("Sucess");
					}, function(response) {
						// error callback
					});
                    can.selected = true;
                }
            }

            var count = function() {
                var numberOfSelected = 0;
                app.candidates.forEach(function(can) {
                    if (can.selected == true) {
                        numberOfSelected++;
                    }
                });
                return numberOfSelected;
            }();

            if (count >= 3) {
                app.candidates.forEach(function(can) {
                    if (can.selected == false) {
                        can.disabled = true;
                    }
                });
            } else {
                app.candidates.forEach(function(can) {
                    can.disabled = false;
                });
            }

			Vue.nextTick(function () {
			  // DOM updated
			})
            console.log(can);
        }
    },
	mounted: function () {
		this.$http.get('https://sudoapistaging.herokuapp.com/api/pitch/candidates').then(function(response) {
			var cand = response.body
			cand.forEach(function(can) {
				can.selected = false;
				can.disabled = false;
			});
			app.candidates = cand;
		}, function(response) {
			// error callback
		});

	}
})
