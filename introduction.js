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
  Let's have a look around. This application has several interactive sounds. The 'THEREMIN' sound, a 'SAMPLER' Theremin sound, the more atmospheric 'GRANULAR SYNTHESIS' sound and a range of prerendered SOUND EFFECTS.`,
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
  text: `The THEREMIN responds to your hand movements, so make sure to allow access to your webcam. To be able to hear anything, you will have to turn on the sound with the speaker
 button on the left and activate one of the interactive sounds (THEREMIN/SAMPLER/GRANULAR SYNTHESIS) or the film music (M and P).`,
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
  text: `Move your left hand up and down to change the volume of THEREMIN and SAMPLER. Move your right hand through space to change the pitch.`,
  attachTo: { element: ".ui-granular", on: "top" },
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
  text: `To use the SOUND EFFECTS activate the button M and P on the right side, in the video timeline, and move your left hand up and down.`,
  attachTo: { element: ".ui-granular", on: "top" },
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
  text: `Activate the film music (M and P) on the left side, activate GRANULAR SYNTHESIS and use the sliders GRAIN SIZE and PLAYBACK RATE to hear how the parameters affect the sound. To use GRANULAR SYNTHESIS interactively, activate the checkboxes GRAIN SIZE or GRAIN DELAY, or both. Moving your right hand up and down affects the GRAIN DELAY, moving the right hand left and right affects the GRAIN SIZE. Moving your left hand up and down changes the volume.`,
  attachTo: { element: ".ui-graindelay", on: "top" },
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
  text: `You can activate several interactive sounds at once and try out different hand movements.`,
  attachTo: { element: ".ui-graindelay", on: "top" },
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
  text: `To better understand the value of film music, you can toggle on and off a precomposed piece of film music for the film scene. To hear the individual SCENE compositions, click a scene button. To listen to the whole composition, click the M or P buttons. You can toggle M and P on and off to hear the difference between leading and accompanying melodies.`,
  attachTo: { element: ".ui-music", on: "top" },
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
  attachTo: { element: ".ui-foley", on: "top" },
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
