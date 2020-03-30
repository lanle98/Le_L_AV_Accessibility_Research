// todo => use a key to track the current video, or just pass the video in as a ref to the function and grab its source
Vue.component("poster", {
  props: {
    vidsource: String,
    thumb: String,
    movie: Object
  },

  template: `
  <li>
      <a :href="vidsource" v-on:click.prevent="$emit('make-selection', movie)">
        <img class="" :src="'images/' + thumb" alt="movie poster" />
      </a>
  </li>
  `
});
var vm = new Vue({
  el: "#app",

  data: {
    // mock up the user - this well eventually come from the database UMS (user management system)
    user: {},
    // this data would also come from the database, but we'll just mock it up for now
    videodata: [
      {
        name: "Can't Help Falling In Love",
        thumb: "Elvis-Presley.jpg",
        source: "Cant Help Falling In Love.mp4",
      },
      {
        name: "The Asphalt Jungle",
        thumb: "The Asphalt Jungle.jpg",
        source: "strangerthings.mp4",
      },
      {
        name: "The Jack Benny Program",
        thumb: "The Jack Benny Program.jpg",
        source: "avengers.mp4",
      }
    ],

    videotitle: "",
    videodescription: "",
    videosource: "",

    showDetails: false
  },



  methods: {
    logInOut() {
      // test the login / logout UI ->button should change color
      //eventually we'll use routing and loging component
      console.log("do login/ logout on click");
      this.user.isLoggedIn = this.user.isLoggedIn ? false : true;
      // this.user.avatar = this.user.avatar == null ? "thor.png" : null;
    },

    setUserPrefs() {
      console.log("set user prefs via routing and probably a component");
    },

    // this is ES6 data destructuring = pull the keys and values you need, not the whole object
    loadMovie({ name, description, vidsource }) {
      //

      this.videotitle = name;
      this.videodescription = description;
      this.videosource = vidsource;

      this.showDetails = true;
    },


  }
});
