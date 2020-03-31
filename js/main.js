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
        <h4 class='p-2'>{{movie.name}}</h4>
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
        description: `Wise men say only fools rush in
        But I can't help falling in love with you
        Shall I stay
        Would it be a sin
        If I can't help falling in love with you
        Like a river flows surely to the sea
        Darling so it goes
        Some things are meant to be
        Take my hand, take my whole life too
        For I can't help falling in love with you
        Like a river flows surely to the sea
        Darling so it goes
        Some things are meant to be
        Take my hand, take my whole life too
        For I can't help falling in love with you
        For I can't help falling in love with you`
      },
      {
        name: "The Asphalt Jungle",
        thumb: "The Asphalt Jungle.jpg",
        source: "the_asphalt_jungle.mp4",
        description: ""
      },
      {
        name: "Stranger Things",
        thumb: "stranger_things.jpg",
        source: "strangerthings.mp4",
        description: ""
      }
    ],

    status: {
      paused: false,
      muted: false,
      transcript: false
    },

    title: "",
    description: "",
    source: "",

    type: null,
    showDetails: false
  },
  mounted() {

    this.status.paused = false
    this.status.muted = false
    this.status.description = false




    //set vueobject
    let VueObject = this


    //keypress event
    window.addEventListener("keydown", function (event) {

      //looping for each media
      for (let i = 0; i < VueObject.videodata.length; i++) {

        //keycode increasement (49 == num1)
        let keycode = i + 49;


        if (event.keyCode == keycode && event.keyCode <= 57) {
          VueObject.title = VueObject.videodata[i].name
          VueObject.source = VueObject.videodata[i].source
          VueObject.showDetails = true
          VueObject.videodata[i].description !== "" ? VueObject.description = VueObject.videodata[i].description : VueObject.description = "No transcript available"
        }




      }

      //play keypress
      if (event.keyCode == 32) {
        VueObject.togglePlayPause()
      }


      //mute keypress
      if (event.keyCode == 77) {
        VueObject.toggleMute()
      }

      //show transcript keypress
      if (event.keyCode == 84) {
        VueObject.toggleTranscript()
      }

      let fileExtension = VueObject.source.split('.').pop()

      if (fileExtension == 'mp3') {
        VueObject.type = 'audio'
      } else {
        VueObject.type = 'video'
      };



    })





  },


  methods: {

    progress() {
      this.$refs.progress.value = this.$refs.media.currentTime / this.$refs.media.duration;
    },


    // this is ES6 data destructuring = pull the keys and values you need, not the whole object
    loadMovie({ name, description, source }) {
      this.status.paused = false
      this.status.muted = false
      this.status.description = false


      this.title = name;
      this.description = description;
      this.source = source;
      this.description !== "" ? this.description = this.description : this.description = "No transcript available"
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

      if (media.paused) {
        this.status.paused = false;
        media.play();
      } else {
        media.pause()
        this.status.paused = true;
      }

    },
    toggleMute() {
      let media = document.querySelector('.media').lastChild

      if (media.muted) {
        this.status.muted = false;
        media.muted = false;
      } else {
        media.muted = true;
        this.status.muted = true;
      }
    },

    toggleTranscript() {
      this.status.transcript = !this.status.transcript
    }
  }
})