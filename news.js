"use strict";

const NYTBaseUrl = "https://api.nytimes.com/svc/topstories/v2/";
const ApiKey = config.KEY;
const SECTIONS = "home, arts, automobiles, books, business, fashion, food, health, insider, magazine, movies, national, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, tmagazine, travel, upshot, world"; // From NYTimes

function buildUrl (url) {
    return NYTBaseUrl + url + ".json?api-key=" + ApiKey;
}

Vue.component('news-list', {
  props: ['results'],
  template: `
    <section>
      <div class="row" v-for="posts in processedPosts">
        <div class="col-lg-3" v-for="post in posts" style = "box-shadow: 0px 0px 0px 0px;">
          <div class="card" style = 'text-align:left; '>
            <div class="card-img-top">
              <a :href="post.url" target="_blank"><img :src="post.image_url" style="width:100%;height:auto;"></a>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
               <p>{{ post.abstract }}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted"><b>Last updated:</b> {{ post.updated_date }}</small>
            </div>
        </div>
        </div>
      </div>
  </section>
  `,
  computed: {
    processedPosts() {
      let posts = this.results;

      // Add image_url attribute
      posts.map(post => {
        let imgObj = post.multimedia.find(media => media.format === "superJumbo");
        post.image_url = imgObj ? imgObj.url : "http://placehold.it/300x200?text=N/A";
      });

      // Put Array into Chunks
      let i, j, chunkedArray = [], chunk = 4;
      for (i=0, j=0; i < posts.length; i += chunk, j++) {
        chunkedArray[j] = posts.slice(i,i+chunk);
      }
      return chunkedArray;
    }
  }
});

const vm = new Vue({
  el: '#app6',
  data: {
    results: [],
    sections: SECTIONS.split(', '), // create an array of the sections
    section: 'home', // set default section to 'home'
    loading: true,
    title: ''
  },
  mounted () {
    this.getPosts('home');
  },
  methods: {
    getPosts(section) {
      let url = buildUrl(section);
      axios.get(url).then((response) => {
        this.loading = false;
        this.results = response.data.results;
        let title = this.section !== 'home' ? "Top stories in '"+ this.section + "' today" : "Top stories today";
        this.title = title + "(" + response.data.num_results+ ")";
      }).catch((error) => { console.log(error); });
    }
  }
});