var app = new Vue({
    el: '#voting',
    data: {
        candidates: []
    },
    methods: {
		contains: function (needle) {
		    // Per spec, the way to identify NaN is that it is not equal to itself
		    var findNaN = needle !== needle;
		    var indexOf;

		    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
		        indexOf = Array.prototype.indexOf;
		    } else {
		        indexOf = function (needle) {
		            var i = -1, index = -1;

		            for(i = 0; i < this.length; i++) {
		                var item = this[i];

		                if((findNaN && item !== item) || item === needle) {
		                    index = i;
		                    break;
		                }
		            }

		            return index;
		        };
		    }

		    return indexOf.call(this, needle) > -1;
		},
		refresh: function () {
			setTimeout(function () {
				app.$http.get('https://sudoapistaging.herokuapp.com/api/pitch/candidates').then(function (response) {
					var cand = response.body
					var addTo = [];
					cand.forEach(function (can) {
						can.selected = false;
						can.disabled = false;
					});
					cand.forEach(function (can) {
						if(app.contains(app.candidates, cand)) {
							console.log("YESSSSS")
						} else {
							addTo.push(cand)
						}
					})


					app.candidates = addTo;
				}, function (response) {
					// error callback
				});

				app.refresh();
			}, 10000)
		},
        selectCan: function (can) {

            // Change Selected Value on Object
            if (can.selected) {
				this.$http.get('https://sudoapistaging.herokuapp.com/api/pitch/downvote/' + can.id).then(function (response) {
					console.log("Success");
				}, function (response) {
					// error callback
				});
                can.selected = false;
            } else {
                if (!can.disabled) {
					this.$http.get('https://sudoapistaging.herokuapp.com/api/pitch/vote/' + can.id).then(function (response) {
						console.log("Success");
					}, function (response) {
						// error callback
					});
                    can.selected = true;
                }
            }

            var count = function () {
                var numberOfSelected = 0;
                app.candidates.forEach(function (can) {
                    if (can.selected == true) {
                        numberOfSelected++;
                    }
                });
                return numberOfSelected;
            }();

            if (count >= 3) {
                app.candidates.forEach(function (can) {
                    if (can.selected == false) {
                        can.disabled = true;
                    }
                });
            } else {
                app.candidates.forEach(function (can) {
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
		this.$http.get('https://sudoapistaging.herokuapp.com/api/pitch/candidates').then(function (response) {
			var cand = response.body
			cand.forEach(function (can) {
				can.selected = false;
				can.disabled = false;
			});
			app.candidates = cand;
		}, function (response) {
			// error callback
		});

	}
})

app.refresh();
