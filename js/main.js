// todo => use a key to track the current video, or just pass the video in as a ref to the function and grab its source




Vue.component("poster", {
  props: {
    source: String,
    thumb: String,
    movie: Object
  },

  template: `
  <li>
      <a :href="source" v-on:click.prevent="$emit('make-selection', movie)">
        <img class="" :src="'images/' + thumb" alt="movie poster" />
      </a>
  </li>
  `
});



var vm = new Vue({
  el: "#app",

  data: {


    // mock up the user - this well eventually come from the database UMS (user management system)

    // this data would also come from the database, but we'll just mock it up for now
    videodata: [
      {
        name: "Can't Help Falling In Love",
        thumb: "Elvis-Presley.jpg",
        source: "cant_help_falling_in_love.mp3",
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

    status: {
      paused: false,
      muted: false,
      stopped: false
    },

    title: "",
    videodescription: "",
    source: "",

    type: null,
    showDetails: false
  },
  mounted() {
    let movies = document.querySelectorAll("li");

    //set vueobject
    let VueObject = this


    //keypress event
    window.addEventListener("keydown", function (event) {

      //looping for each media
      for (let i = 0; i < VueObject.videodata.length; i++) {

        //keycode increasement (49 == num1)
        let keycode = i + 49;


        if (event.keyCode == keycode && event.keyCode <= 57) {
          VueObject.title = VueObject.videodata[i].name,
            VueObject.source = VueObject.videodata[i].source;
          VueObject.showDetails = true
        }


      }

      let fileExtension = VueObject.source.split('.').pop()

      if (fileExtension == 'mp3') {
        VueObject.type = 'audio'
      } else {
        VueObject.type = 'video'
      };
      console.log(VueObject.type)

    })

  },


  methods: {




    // this is ES6 data destructuring = pull the keys and values you need, not the whole object
    loadMovie({ name, description, source }) {
      this.title = name;
      this.description = description;
      this.source = source;
      let fileExtension = this.source.split('.').pop()

      if (fileExtension == 'mp3') {
        this.type = 'audio'
      } else {
        this.type = 'video'
      }
      this.showDetails = true;
    },

    togglePlayPause() {
      let media = document.querySelector('.media').lastChild
      console.log(media.paused)
      if (media.play()) {
        this.status.pause = true;
        media.pause();
      } else if (media.paused) {
        console.log('play')
        this.status.pause = false;
        media.play();
      }
    }
  }
});
