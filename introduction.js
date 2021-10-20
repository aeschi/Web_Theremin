const tour = new Shepherd.Tour({
    defaultStepOptions: {
        cancelIcon: {
            enabled: true,
        },
        classes: 'shepherd-theme-default',
        scrollTo: { behavior: 'smooth', block: 'left' },
    },
});

tour.addStep({
    title: 'Hi there!',
    text: `This is a virtual THEREMIN application.\
  Let's have a look around. This application has several THEREMIN sounds. The 'CLASSIC' sound, the more atmospheric 'GRANULAR SYNTHESIS' one and an examplatory composition for this film scene. `,
    buttons: [
        {
            action() {
                return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back',
        },
        {
            action() {
                return this.next();
            },
            text: 'Next',
        },
    ],
    id: 'creating',
});

tour.addStep({
    title: 'Hi there!',
    text: `The THEREMIN responds to your hand movements, so make sure to allow access to your webcam. To be able to hear anything, you will have to turn on the sound with the '►
 | ◼︎' button for each sound source`,
    buttons: [
        {
            action() {
                return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back',
        },
        {
            action() {
                return this.next();
            },
            text: 'Next',
        },
    ],
    id: 'creating',
});

tour.addStep({
    title: 'THEREMIN CLASSIC',
    text: `To explore the classic Theremin sound, click on the '► | ◼︎' button below THEREMIN CLASSIC. Move your left hand up and done to change the volume. Move your right hand through space to change the pitch.`,
    buttons: [
        {
            action() {
                return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back',
        },
        {
            action() {
                return this.next();
            },
            text: 'Next',
        },
    ],
    id: 'creating',
});

tour.addStep({
    title: 'THEREMIN GRANUALAR SYNTHESIS',
    text: `Try out different sources and play around with the grain settings to fully explore the possible output for granular synthesis.`,
    buttons: [
        {
            action() {
                return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back',
        },
        {
            action() {
                return this.next();
            },
            text: 'Next',
        },
    ],
    id: 'creating',
});

tour.addStep({
    title: 'THEREMIN MUSIC COMPOSITION',
    text: `Here you can listen to theremin film music specifically made for this scene. You can apply various filters to the music.`,
    buttons: [
        {
            action() {
                return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back',
        },
        {
            action() {
                return this.next();
            },
            text: 'Next',
        },
    ],
    id: 'creating',
});

tour.addStep({
    title: "That's it",
    text: `Thank you for stopping by & have fun!`,
    buttons: [
        {
            action() {
                return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back',
        },
        {
            action() {
                return this.next();
            },
            text: 'Done',
        },
    ],
    id: 'creating',
});

tour.start();
