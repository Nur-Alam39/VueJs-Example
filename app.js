new Vue({
	el: '#app1',
	data: {
			watt: 0,
			hour: 0,
			rate: 0,
			day: 0,
			image1: 'assets/images/vue_logo.png',
			image2: 'assets/images/bootstrap4.jpg'
		  },
	computed: {
		result() {
			    	return (parseFloat(this.watt) * parseFloat(this.hour) * parseFloat(this.rate) * parseFloat(this.day)) / 1000;
			    }
			  }
			});

//BMI Calculator
			new Vue({
			  el: '#app2',
			  data: {
			    age: 0,
			    Height: 0,
			    weight: 0,
			    gender: 0,
			  },
			  computed: {
			  	result() {
			    	return (parseFloat(this.age) * parseFloat(this.height));
			    }
			  }
			});

//VAT Calculator
			new Vue({
			  el: '#app3',
			  data: {
			    watt: 0,
			    hour: 0,
			    rate: 0,
			    day: 0
			  },
			  computed: {
			  	result() {
			    	return (parseFloat(this.watt) * parseFloat(this.hour) * parseFloat(this.rate) * parseFloat(this.day)) / 1000;
			    }
			  }
			});

///Codeforces Contest API
const app = new Vue({
		el: '#app4',
		data: {
			contests: []
		},
		created () {
			fetch('https://codeforces.com/api/contest.list')
			.then(response => response.json())
			.then(json => {
			 this.contests = json.result	
			})
		}
});




///Country API
new Vue({
    el: '#app5', //Attach to element id app
    data: {
        countries_list: [] //Blank country array
    },

    mounted() { //When element is mounted, look up data
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => 
			{
                this.countries_list = response.data
			})
            .catch(error =>(
                console.log(error)
                ));
    }

})

///Leetcode Problems API
new Vue({
  el: '#app7',
  data: {
    problems: NULL
  },
  created () {
			fetch('https://leetcode.com/api/problems/algorithms/')
			.then(response => response.json())
			.then(json => {
			 this.problems = json.user_name	
			})
		}
})
/*
new Vue({
		el: '#app7',
		data: {
			problems: 'Leetcode'
		}/*,
		created () {
			fetch('https://leetcode.com/api/problems/algorithms/')
			.then(response => response.json())
			.then(json => {
			 this.problems = json.stat_status_pairs.stat
			})
		}
})*/