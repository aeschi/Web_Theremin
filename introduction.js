const tour = new Shepherd.Tour({
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
    scrollTo: { behavior: "smooth", block: "left" },
  },
});



tour.addStep({
  title: "Hi there!",
  text: `This is a virtual THEREMIN application.\
  Let's have a look around. This application has video, several interactive sounds and film music.`,
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "WEB THEREMIN",
  text: `To use the interactive functions of the WEB THEREMIN you need to allow your browser to use your webcam.`,
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "WEB THEREMIN",
  text: `To start the web theremin activate the sound button in the upper left corner of the page.`,
  attachTo: { element: ".SpeakerContainer", on: "right" },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});
/*
tour.addStep({
  title: "INTERACTIVE SOUNDS",
  text: `Move your left hand up and down to change the volume. Move your right hand through space to change the pitch.`,
  attachTo: { element: ".ui-theremin", on: "top" },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});
*/
tour.addStep({
  title: "INTERACTIVE SOUNDS",
  text: `You can choose THEREMIN or SAMPLER to play sounds by hand movement. Activate and deactivate one or both of the sounds to play the sounds by hand movement.`,
  attachTo: { element: ".ui-interactive-buttons", on: "top" },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "INTERACTIVE SOUNDS",
  text: `With the left hand you control the volume of the sounds, with right hand tge pitch of the sounds.`,
  attachTo: { element: ".ui-interactive-buttons", on: "top" },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "FILM MUSIC",
  text: `To hear the film music composed for this film scene activate the button with the sound grafik/waveform.`,
  attachTo: { element: ".ui-filmsounds-melody", on: "top" },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "FILM MUSIC",
  text: `This activates the main film melody.`,
  attachTo: { element: ".ui-filmsounds-melody", on: "left" },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});


tour.addStep({
  title: "FILM MUSIC",
  text: `This activates the accompanying melody.`,
  attachTo: { element: ".ui-filmsounds-polyphone", on: "left" },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "FILM MUSIC",
  text: `You can choose between different scenes of the video using the labeled buttons on top of the time line.
  When you choose a scene by label, the video scene and its sound will loop, until you deactivate the label.`,
  attachTo: { element: ".ui-filmsounds", on: "top" },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "VIDEO CONTROLS",
  text: `Use the slider of the video to choose a portion of the video, that you want to watch and listen to. You can also start and pause the video. The film sound will pause too.`,
  attachTo: {element: ".ui-video", on: "top"},
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "SOUND EFFECTS",
  text: `You can choose between three sound effects, and fade between them using hand movement. For this activate the sound effects button.`,
  attachTo: {element: ".btn-effect", on: "left"},
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "GRANULAR SYNTHESIS",
  text: `You can apply a granular feedback delay effect to the film music. For this activate the granular synthesis button and choose one ot both of the granular effect buttons below.`,
  attachTo: {element: ".btn-granular", on: "left"},
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Done",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "GRANULAR SYNTHESIS",
  text: `the applied effect is controlled by hand movement.
  You control the sound effects by moving your right hand left and right`,
  attachTo: {element: ".btn-gran-size", on: "left"},
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Done",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "GRANULAR DELAY EFFECT",
  text: `or up and down`,
  attachTo: {element: ".btn-gran-delay", on: "right"},
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Done",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "GRANULAR SYNTHESIS",
  text: `When you deactivate the effect buttons the effect will be removed from the music.`,
  attachTo: {element: ".ui-interactive-effects-sett", on: "top"},
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "ATMOSPHERE FOLEY",
  text: `Aside from film music, atmospheric sound, also called FOLEYS, help with bringing a film scene to life. Click on the different sound sources to hear what a difference these sounds can make.`,
  attachTo: { element: ".ui-filmsounds-foley", on: "top" },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "HELP",
  text: `You can always come back to this introduction tour by clicking the lightbulb button.`,
  attachTo: { element: ".infoContainer", on: "right" },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});

tour.addStep({
  title: "That's it",
  text: `Thank you for stopping by & have fun!`,
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.next();
      },
      text: "Done",
    },
  ],
  id: "creating",
});
