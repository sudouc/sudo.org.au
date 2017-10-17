var app = new Vue({
    name: 'Root2',
    el: '#voting',
    data: {
    	apiURL: "http://am.local:9090/api/pitch/",
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
			var _this = this;
			setTimeout(function () {
				app.$http.get(_this.apiURL + 'candidates').then(function (response) {
					var candidates = response.body

				}, function (response) {
					// error callback
				});

				app.refresh();
			}, 10000)
		},
		toggleDisabled: function() {
            app.candidates.forEach(function (can) {
                if (can.selected == true) {
                    numberOfSelected++;
                }
            });
		},
        selectCan: function (can) {
			var _this = this;
            // Change Selected Value on Object
            if (can.selected) {
            	can.disabled = true;
				this.$http.get(_this.apiURL + 'downvote/' + can.id).then(function (response) {
					console.log("Success");
					can.disabled = false;
				}, function (response) {
					// error callback
				});
                can.selected = false;
            } else {
                if (!can.disabled) {
                	can.disabled = true;
					this.$http.get(_this.apiURL + 'vote/' + can.id).then(function (response) {
						console.log("Success");
						can.disabled = false;
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
    	var _this = this;
		this.$http.get(_this.apiURL + 'candidates').then(function (response) {
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
