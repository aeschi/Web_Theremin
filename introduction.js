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
  Let's have a look around. This application has several interactive sounds. The 'THEREMIN' sound, the more atmospheric 'GRANULAR SYNTHESIS' one and ... `,
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
 button and active one of the interactive sounds (THEREMIN/GRANULAR). `,
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
  text: `Move your left hand up and done to change the volume. Move your right hand through space to change the pitch. Also try playing around with the sliders to adjust the settings for the GRANULAR sound.`,
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
  text: `To better understand the value of film music, you can toggle on and of a precomposed piece of film music. You can active ALL sources at once or the MAIN and additional VOICES individually.`,
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
  text: `Aside from film music, atmospheric sound, also called FOLEYS, help with brining a film scene to life. Click on the different sound sources to hear what a difference these sounds can make.`,
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
