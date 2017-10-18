import Vue from 'vue';
import VueResource from 'vue-resource';
import VueCookie from 'vue-cookie';
import VueSlider from 'vue-slider-component';

Vue.use(VueCookie);
Vue.use(VueResource);

var app = new Vue({
    name: 'Root2',
    el: '#voting',
    data: {
    	max: 10,
        maxAmount: 25,
		amount: 25,
    	apiURL: "https://platform.sudo.org.au/api/pitch/",
        candidates: [],
		submitted: false,
		comeback: false
    },
    components: {
        VueSlider
    },
    methods: {
        callback: function(value) {
            app.amount = app.maxAmount;

        	for(var can in app.candidates) {
                app.amount = app.amount - app.candidates[can].amount
            }
		},
		dragEnd: function (slider) {
			var highestAmount = 0;
            var highestIndex;

			while(app.amount < 0) {
                for(var can in app.candidates) {
                    if(app.candidates[can].amount > highestAmount) {
                    	highestAmount = app.candidates[can].amount;
                    	highestIndex = can;
					}
                }

                app.candidates[highestIndex].amount = app.candidates[highestIndex].amount - 1;
                this.callback()
			}
		},
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
        submit: function() {
        	var _this = this;
        	this.submitted = true;
			this.$http.post(_this.apiURL + 'vote', { 'candidates': this.candidates }).then(function (response) {
				if(response.body.length > 0) {
                    this.$cookie.set('vote', '1827129361', {expires: 1});

                    this.comeback = true;
				}
			}, function (response) {
				// error callback
			});

		}
    },
	mounted: function () {
    	var _this = this;
    	if(_this.$cookie.get('vote') === '1827129361') {
            _this.submitted = true;
    		_this.comeback = true;
		} else {
            this.$http.get(_this.apiURL + 'candidates').then(function (response) {
                var cand = response.body
                cand.forEach(function (can) {
                    can.selected = false;
                    can.disabled = false;
                    can.amount = 0;
                });
                app.candidates = cand;
            }, function (response) {
                // error callback
            });
        }

	}
})

// app.refresh();
