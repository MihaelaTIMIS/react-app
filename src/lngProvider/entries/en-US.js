import antdEn from "antd/lib/locale-provider/en_US";
import appLocaleData from "react-intl/locale-data/en";
import enMessages from "../locales/en_US.json";

const EnLang = {
  messages: {
    ...enMessages,

    "spliik.cookie.consent":
      'SpliiK uses cookies to provide you with a quality user experience, measure audience and optimize functionality. By continuing to browse this site, you accept the use of cookies under the conditions provided for in <a href="https://www.spliik.com/supports" target="_blank">our privacy policy</a>.',
    "spliik.cookie.consent.button": "I understand",

    "spliik.accountbanking.add": "Register a bank account",
    "spliik.accountbanking.recovered": "Recover my earnings",

    "spliik.earnings.title": "My earnings",
    "spliik.earnings.line1": "Current uncredited earnings",
    "spliik.earnings.line2": "Total gains from the start",
    "spliik.earnings.line3":
      "Register your bank account to receive your winnings at the start of each month.",
    "spliik.earnings.line5": "The information is transmitted securely.",
    "spliik.earnings.iban.add": "Register the IBAN",
    "spliik.earnings.iban.close": "Close",
    "spliik.earnings.iban.validated": "Your IBAN has been validated.",
    "spliik.earnings.iban.preview": "Overview of my IBAN",

    "spliik.search.placeholder": "Find a workshop...",
    "spliik.feedback.label": "Report a problem",

    "spliik.followed": "Followe",
    "spliik.followedby": "Followed by",

    "spliik.confirm": "Confirmation",

    "miuwi.privacypolicy": "Privacy policy",
    "miuwi.cgu": "Terms of service",
    "miuwi.cgv": "Condiciones de venta",
    "miuwi.cgucgy.error": "Please accept the T&Use and the T&Sale",
    "miuwi.legalnotices":
      'I accept the <a href="https://www.spliik.com/supports" target="_blank" >general conditions of use</a> and the <a href="https://www.spliik.com/supports" target="_blank" >general conditions of sale</a>.',

    "miuwi.paymentLegalNotices":
      'I accept the <a href="https://www.spliik.com/supports" target="_blank" > general conditions </a> of the platform and proceed to payment to fully benefit from the tutorial.',
    "miuwi.confirmPaymentButton": "I confirm and proceed to payment",
    "miuwi.stripePaymentLabel":
      'Secure payment with <a href="https://stripe.com" target="_blank" style="color:#003366; text-decoration:underline;" >stripe.com</a>',
    "miuwi.confirmPaymentText":
      'Under article L.221-28 of the Consumer Code, the right of withdrawal cannot be exercised for contracts "for the supply of digital content not supplied on a material medium whose execution has started after express prior agreement from the consumer and express waiver of his right of withdrawal". By confirming the payment of the Tutorial, You expressly acknowledge waiving the right of withdrawal.',

    "miuwi.form.select": "Select",
    "miuwi.form.addPicture": "Add picture",
    "miuwi.form.addFile": "Add file",
    "miuwi.form.addAvatar": "Add avatar in square format",

    "miuwi.sidebar.createProject": "Create tutorial",
    "miuwi.sidebar.editProject": "Edit tutorial",
    "miuwi.sidebar.contributeProject": "Contribute to the tutorial",
    "miuwi.sidebar.realizeProject": "Realize a tutorial",
    "miuwi.sidebar.readProject": "Read a tutorial",
    "miuwi.sidebar.projects": "Tutorials",
    "miuwi.sidebar.listProjects": "All Tutorials",
    "miuwi.sidebar.createExercice": "Create Exercice (component)",
    "miuwi.sidebar.login": "Login",
    "miuwi.sideBar.logout": "Sign out",
    "miuwi.sidebar.signUp": "Sign Up",
    "miuwi.keywords.all": "All",

    //profil user
    "miuwi.user.student": "Collaborater",
    "miuwi.user.student.action": "Learn",
    "miuwi.user.owner": "Expert",
    "miuwi.user.owner.action": "Create",
    "miuwi.user.admin": "Publish requests",
    "miuwi.user.tofollow": "To follow",
    "miuwi.user.notfollow": "No longer follow",
    "miuwi.user.description": "Description",
    "miuwi.user.loginlabel": "or login by email",
    "miuwi.user.soutien": "Support",
    "miuwi.user.soutien.action": "Advise",
    "miuwi.project.infos.visit": " visit",
    "miuwi.project.infos.subscription": " subscription",
    "miuwi.project.infos.message": " interaction",
    "miuwi.project.infos.earnings": " earnings",
    "miuwi.user.backToDashboard": "Back to my tutorials",
    "miuwi.user.archives": "Archives",
    "miuwi.user.show.archives": "Show my archives",
    //student copy tutorial
    "miuwi.student.copyWorkshop.label": "Create a blank copy",
    "miuwi.student.copyWorkshop.text":
      "Copying allows you to respond to the tutorial steps again. \n The current tutorial and your answers will always be available.",
    "miuwi.student.copyWorkshop.confirm":
      "Do you confirm the creation of a blank copy of the tutorial?",
    //expert copy tutorial
    "miuwi.expert.copyWorkshop.title": "Create a copy of a tutorial",
    "miuwi.expert.copyWorkshop.label": "Create a copy",
    "miuwi.expert.copyWorkshop.text":
      "Copying a tutorial allows you to create an improved and / or extended version. \n This tutorial will not be published until the publication request is made.",
    "miuwi.expert.copyWorkshop.confirm":
      "Confirm that you have created a copy of your tutorial",

    //form opinion
    "miuwi.opinionLabel": "Share your opinion",
    "miuwi.opinionLabel.stars": "Required fields",
    "miuwi.field.required": "Field required",
    "miuwi.opinion.success": "Thanks for your opinion.",
    "miuwi.opinion.empty": "There's no opinion yet.",

    //les étapes de création projet
    "miuwi.project.title.create": "Create",
    "miuwi.project.title.presentation": "Presentation",
    "miuwi.project.title.exercises": "Steps",
    "miuwi.project.title.exercise": "Step",
    "miuwi.project.title.contribution": "Contribution",
    "miuwi.project.title.publication": "Publication",
    "miuwi.project.title.final": "Final",

    //texte qu'on utilise par tout
    //errors pour les champs vides
    "miuwi.sever.error": "An error has occurred. Please retry later.",
    "miuwi.errorInput.title": "Please fill in the fields!",
    "miuwi.errorInput.pseudo": "Please input your nickname",
    "miuwi.errorInput.email": "Please input your email",
    "miuwi.errorInput.password": "Please input your password",
    "miuwi.errorInput.password-confirm":
      "Please input your password confirmation",
    "miuwi.errorInput.password-confirm-different":
      "The passwords entered are not identical",
    "miuwi.errorInput.account-already-exists":
      "An account with this email already exists.",
    "miuwi.errorInput.price": "The price input is required",
    "miuwi.errorInput.isFree":
      "You have to specify if your project is free or not",

    //discussions
    "miuwi.thread.label": "Conversation threading",
    "miuwi.thread.title": "Conversation threading - title",
    "miuwi.thread.resume": "Conversation threading - resume",
    "miuwi.thread.overview": "Conversation threading - overview",

    "miuwi.thread.link": "Answer in the conversation threading",

    "miuwi.thread.student.bubble":
      "You can click on the bubble to see \n the feedback of your helpers",
    "miuwi.thread.helper.bubble":
      "You can click on the bubble \n to make a global return.",

    "miuwi.thread.expert.bubble":
      "You create your tutorial.  \n Ask your assistants for feedback  \n on the next page. ",

    "miuwi.thread.assistant.bubble1": "You support ",
    "miuwi.thread.assistant.bubble2":
      " on his tutorial.  \n Assist him in the discussion threads.",

    "miuwi.thread.link.helper": "Summarize your answer below",
    "miuwi.thread.sendButton": "Send my message",

    "miuwi.thread.helper": "Support",
    "miuwi.thread.assistant": "Assist",
    "miuwi.thread.expert": "Watch the feedback",

    //bouttons
    "miuwi.project.edit-exercise.nextText":
      "Validate and go to the next step. You can return to these parts later.",
    "miuwi.project.previousButton": "Previous",
    "miuwi.project.saveButton": "Save",
    "miuwi.project.publishButton": "Publish your tutorial",
    "miuwi.project.nextButton": "Following",
    "miuwi.project.viewProjects": "View my tutorials",
    "miuwi.project.seeProject": "See",
    "miuwi.project.editProject": "Edit",
    "miuwi.project.contributeToTheProject": "Contribute",
    "miuwi.project.copy": "Copy",
    "miuwi.project.share": "Share",
    "miuwi.project.publishConfirmButton": "Publish",
    "miuwi.project.publishCancelButton": "Cancel",

    "miuwi.project.cancelButton": "Cancel",
    "miuwi.project.saveAndCancel": "Save and close",    
    "miuwi.project.mailToAssistants": "Send an email to my assistants",
    "miuwi.project.mailToExpert": "Send an email to the expert of this tutorial",    
    "miuwi.project.mailToExpert.info": "Please note: the creator of the tutorial may request a financial contribution for his services and feedback on your tutorial.",
    "miuwi.project.mailToHelpers": "Send an email to my advisers",
    "miuwi.project.mailToStudent": "Send an email \n to the novice I support",   
    "miuwi.project.shareAndDiscover": "Share & discover",

    //-----------text
    "miuwi.titleLabel": "Title",
    "miuwi.discussionLabel": "Discussion",
    "miuwi.dateLabel": "Date/hour",
    "miuwi.opinion":
      "Give your opinion or your solution to your contributors. Write it how you would have written it.",
    "miuwi.examplesLabel": "Examples",
    "miuwi.emailInput": "E-mail",
    "miuwi.project.bravoTitle": "BRAVO ! ",
    "miuwi.project.bravoText": "You have finished your tutorial.",

    //-----------media
    "miuwi.downloadButton": "Download",
    "miuwi.downloadButtonFile": "Download a file",
    "miuwi.videoText": "Download a video",
    "miuwi.videoText.delete": " Delete video",
    "miuwi.videoText.delete.confirm":
      "You are about to delete the video. You confirm?",
    "miuwi.picture.delete.confirm":
      "Are you sure you want to delete this media ?",

    "miuwi.file.size": "Size",
    "miuwi.file.format": "Format: ",
    "miuwi.video.duration": "Download a video of 3 minutes maximum.",

    "miuwi.imageLabel": "Picture",
    "miuwi.videoLabel": "Video",
    "miuwi.attachmentsLabel": "Attachments",
    "miuwi.show.pdf": "Open file",

    //welcome page
    "miuwi.welcome": "The world will be smarter if you sell him your skills.",
    "miuwi.welcome.lastWorkshops": "Last workshops",
    "miuwi.welcome.mostViewed": "Most viewed",
    "miuwi.welcome.unavoidables": "Unavoidables",

    //**************NOT CONNECTED OR NOT STUDENT***********
    "miuwi.offlineUser.note": "Notation",
    "miuwi.offlineUser.timeNeeded": "Necessary time",
    "miuwi.offlineUser.nbActive": "Number of active contributors",
    "miuwi.offlineUser.nbExercises": "Number of steps",
    "miuwi.offlineUser.connectButton":
      "CONNECTION TO START YOUR TUTORIAL AND STEPS",
    "miuwi.offlineUser.readyButton": "Start the tutorial",
    "miuwi.offlineUser.authorTitle": "Assistant",
    "miuwi.offlineUser.authorTitle.action": "Support",
    "miuwi.offlineUser.authorLastName": "Name",
    "miuwi.offlineUser.authorFirstName": "First Name",
    "miuwi.offlineUser.authorPost": "Poste",
    "miuwi.offlineUser.authorSentences": "Sentences",
    "miuwi.offlineUser.linkProject": "Link to the tutorial",
    "miuwi.offlineUser.sendLinkButton": "Send link",
    "miuwi.offlineUser.noticeTitle": "NOTICE",
    "miuwi.offlineUser.friendsInProject": "Friends already in the tutorial",
    "miuwi.offlineUser.otherStudents": "Other contributors",
    "miuwi.offlineUser.discoverProject": "Invite to discover the tutorial",
    "miuwi.offlineUser.sendButton": "Send invitations",
    "miuwi.offlineUser.projectsLabel": "THE ASSOCIATED TUTORIAL",

    //************************OWNER************************
    //1. création projet
    "miuwi.project.create.firstParagraph":
      "You can now create your tutorial. The approach is to allow your audience to understand what they will do by applying your knowledge and experience.",

    //1. création projet - titre
    "miuwi.project.create.title.description":
      "Give a title to this tutorial in the form of a question that explains what the person will do",
    "miuwi.project.create.title.exemple":
      "Ex: How are you going to do your team project?",

    //1. création projet - categories
    "miuwi.project.create.categories": "Categories",
    "miuwi.project.create.categories.description":
      "Select the categories of your tutorial",
    "miuwi.project.create.categories.exemple": "Ex : marketing",
    "miuwi.project.category": "Category",
    "miuwi.project.subcategory": "Sub-category",

    //1. création projet - tags
    "miuwi.project.create.tags": "Tags",
    "miuwi.project.create.tags.add": "Add tag",
    "miuwi.project.create.tags.help": "The labels are used to reference you in the search bar. You can put as many as you want: surname, first name, job, specialty, company, subject, problem, title, client, goal, gain, mission, actions, result,…",

    //1. création projet - résumé
    "miuwi.project.create.resume": "Resume",
    "miuwi.project.create.resume.description":
      "Make a summary of what your contributors will do. Give (1) the result he will get, (2) the steps he will do, (3) the methods he will apply, ...",

    //1. création projet - bouttons
    "miuwi.project.create.nextButton": "Continue",

    //2. édition projet(présentation)
    "miuwi.project.edit.error":
      "You are not authorized to perform this action for a workshop that is submmited to publication or  published.",
    "miuwi.project.edit.firstParagraph":
      "You can now present your tutorial to your contributors through video and media. They will allow your contributors to better understand what he will do by applying your knowledge and experience.",

    //2. édition projet - image
    "miuwi.project.edit.image.description":
      "Download the image to differentiate yourself and have a beautiful layout",

    //2. édition projet - video
    "miuwi.project.edit.video.description":
      "Save yourself with your webcam or phone.",

    //2. édition projet - fichiers joints
    "miuwi.project.edit.attachmens.description":
      "Put your brochure, your diagram, your pdf in these two spaces ",

    //2. édition projet - bouttons
    "miuwi.project.edit.nextButton": "Add your steps",

    //3. exercises
    "miuwi.project.exercises.owner":
      "Expert in this tutorial, you are allowed to preview your steps.",
    "miuwi.project.exercises.firstParagraph":
      "You can now write the steps that will allow your contributors to apply your knowledge and experience.",
    "miuwi.project.edit.secondParagraph":
      "Each line is to be taken as a step towards the implementation of this tutorial. There are minimum 3 steps and maximum 20.",
    "miuwi.project.edit.linkedFiles": "Do you have files to link ?",
    "miuwi.project.exercices.deleteConfirm":
      "Are you sure you want to delete this step? ?",

    "miuwi.project.exercises.editError":
      "You are not authorized to perform this action while you are editing a step.",

    //3. exercises - bouttons
    "miuwi.project.exercises.hideAllExosBtn": "Hide all ",
    "miuwi.project.exercises.seeAllExos1Btn": "Show all ",
    "miuwi.project.exercises.seeAllExos2Btn": " steps",
    "miuwi.project.exercises.deleteButton": "Delete",
    "miuwi.project.exercises.overviewButton": "Overview of the step",
    "miuwi.project.exercises.validateButton": "Save the step",
    "miuwi.project.exercises.addButton": "Add a step",
    "miuwi.project.exercises.editButton": "Edit",
    "miuwi.project.exercises.answer.edit.button": "Answer to this step",
    "miuwi.project.exercises.answer.save.button": "Save my answer",
    "miuwi.project.student.noanswer": "No response recorded",
    "miuwi.project.exercises.extendsButton": "Hide",
    "miuwi.project.student.start": "I'm starting my tutorial!",
    "miuwi.project.student.start2":
      "We are pleased to confirm your integration into the workshop.",
    "miuwi.project.student.start3":
      "Thank you very much and have a good workshop.",

    //3. exercises - presentation
    "miuwi.project.exercises.presentationText":
      "Develop the presentation of the action to be done in this step",

    "miuwi.project.exercises.examplesText":
      "Giving pre-written examples will make it easier to take action",
    "miuwi.project.exercises.examplesVideoText":
      "The video transmit the emotions and give importance to your audience. Register with your webcam or phone.",

    "miuwi.project.exercises.positionLabel": "Position of the step:",

    //4. diffusion
    "miuwi.project.diffusion.firstParagraph":
      "You can link your tutorial to others to create continuity or referrals. You can invite your assistants to discover your tutorial.",
    "miuwi.project.diffusion.nextSteps": "Next steps",
    "miuwi.project.diffusion.seeProject": "You can see your tutorial",
    "miuwi.project.diffusion.inviteCustomersLabel":
      'By clicking on button "Invite your audience", you will be directed to the publication page, which allows you to publish and invite your contributors, prospects and customers to use your tutorial.',
    "miuwi.project.diffusion.inviteCustomersButton": "Invite your audience",

    //4. diffusion - associer les projects
    "miuwi.project.diffusion.joinTitle": "Join your tutorials",
    "miuwi.project.diffusion.joinText":
      "Is there an associated tutorial that you would recommend?",
    "miuwi.project.diffusion.projectButton": "Tutorials",
    "miuwi.project.diffusion.joinButton": "Associate",
    "miuwi.project.diffusion.disjoinButton": "Dissociate",

    //4. diffusion - inviter des lecteurs
    "miuwi.project.diffusion.inviteTitle": "Invite your assistants",
    "miuwi.project.diffusion.inviteText":
      "Who do you want to co-build or have your tutorial re- read?",
    "miuwi.project.diffusion.lecteurLabel": "Assistants",
    "miuwi.project.diffusion.inviteSubmitBtn": "Submit to your assistants",
    "miuwi.project.diffusion.renderTitle": "Watch the render",
    "miuwi.project.diffusion.previewBtn": "See preview",

    //4bis. diffusion
    "miuwi.project.diffusionBis.firstParagraph": "You can share your tutorial.",
    "miuwi.project.diffusionBis.shareTitle": "Share your tutorial",
    "miuwi.project.diffusionBis.shareText1":
      "Who might be interested in discovering your tutorial? Who could use your tutorial in his daily work ?",
    "miuwi.project.diffusionBis.shareText2":
      "Send an invitation to an email list. Separate emails with a comma.",
    "miuwi.project.diffusionBis.submitBtn": "Submit to your audience",
    "miuwi.project.publishConfirmText":
      "Warning: Be sure that your tutorial is completed in its form, its background, its spelling, its progress... When a tutorial is published, it's no longer editable.",

    //Sign In
    "miuwi.login.welcome":
      "Welcome to the SpliiK community !\n Here you will succeed until the concrete result \n through practice and collaboration.",

    "miuwi.login.title": "Sign In",
    "miuwi.login.remember": "Remember me",
    "miuwi.login.forgotPassword": "Forgot Password ?",
    "miuwi.loginButton": "Log in",
    "miuwi.login.emailError": "Enter a valid email",
    "miuwi.login.emailPassword": "Email / password invalid",
    "miuwi.login.passwordError": "Enter a valid password",
    "miuwi.login.error": "Error",
    "miuwi.noaccount": "No account yet?",
    "miuwi.registering": "I'm registering!",
    "miuwi.resetPassword": "Reset password",
    "miuwi.resetButton": "Reset",
    "miuwi.notExist": "This account does not exist",
    "miuwi.resetPassword.success":
      "A reset link has been sent to the email address provided.",
    "miuwi.alreadyregistered": "Already registered ?",
    //Se Créer un compte
    "miuwi.signup.confirm":
      "Please activate your account by following the link received in your mail.",
    "miuwi.signup.activate": "Thank you for activating your account.",
    "miuwi.signup.username": "Username",
    "miuwi.signup.password": "Password",
    "miuwi.signup.passwordConfirm": "Password Confirm",
    "miuwi.signup.iconnect": "I connect",

    //admin - les bouttons du projet à publier
    "miuwi.project.accept": "Accept the publication",
    "miuwi.project.reject": "Reject the publication",
    "miuwi.project.rejectReason":
      "Please write the reason you reject the publication of this tutorial.",
    "miuwi.project.sendRejectMessage": "Send the reason of the rejection",
    "miuwi.project.status.online": "Online",
    "miuwi.project.status.pending": "Publish pending",
    "miuwi.project.status.rejected": "Rejected",
    "miuwi.project.status.draft": "Draft",
    "miuwi.project.rejectedReason": "Reason for refusal",
    "miuwi.project.student.archive":
      "Do you confirm the archiving of the tutorial? It will be accessible from your archives.",
    "miuwi.project.expert.archive":
      "You are about to archive your tutorial. It will no longer be visible in the SpliiK catalog. It will be accessible from your archives.",
    "miuwi.project.expert.unarchive":
      "Warning: the tutorial will be unarchived. It will be like a new tutorial. You need to repost it for it to appear to others.",

    "miuwi.project.expert.archives.info":
      "Here will appear the workshops that you have archived as an expert.",

    //etudiant
    "miuwi.project.student.info":
      "Here will appear the workshops you started as a student.",
    "miuwi.project.student.archives.info":
      "Here will appear the workshops you archived as a student.",
    "miuwi.project.student.showVideoBtn": "Show the video",
    "miuwi.project.student.answerLabel": "Your answer",
    "miuwi.project.student.help": "Need help ? Send an invitation",
    "miuwi.project.student.exerciseAnswer": "Answer",
    "miuwi.project.student.payed": "Payed",
    "miuwi.project.student.statusInProgress": "In progress",
    "miuwi.project.student.statusFinished": "Finished",
    "miuwi.project.student.statusArchived": "Archived",
    "miuwi.project.student.continue": "Continue",
    "miuwi.project.student.resume": "Resume",
    "miuwi.project.archive": "Archive my tutorial",
    "miuwi.project.student.review": "See my archived tutorial",
    "miuwi.project.student.finish": "Finish and note the tutorial",
    "miuwi.project.student.calendar.title": "My tutorial Spliik",
    "miuwi.project.student.calendar.label": "Add to my calendar",

    "miuwi.project.student.finish.warning":
      "Are you shure you want to finish this workshop ? Once finished, you can not modify it anymore. ",
    "miuwi.project.student.finish.button": "Finish",
    "miuwi.project.student.icon": "supports you",

    //helper
    "miuwi.project.helper.info":
      "Here will appear the workshops whose students will ask you for support.",
    "miuwi.project.helper.answerLabel": "Collaborator answer",
    "miuwi.project.helper.archives.info":
      "Here will appear the workshops that you have archived as support.",
    "miuwi.project.helper.icon": "You support",
    //assistant
    "miuwi.project.assistant.info":
      "Here will appear the workshops whose trainers will ask you for assistance.",
    "miuwi.project.assistant.archives.info":
      "Here will appear the workshops that you have archived as an assistant.",
    //search
    "miuwi.search.labelresult": "Results for:",

    //paiement
    "miuwi.project.paymentButton": "Buy this tutorial",
    "miuwi.project.tarif.title": "Indicate the price of your tutorial",
    "miuwi.project.tarif.free": "Free",
    "miuwi.project.tarif.paying": "Paying",
    "miuwi.project.tarif.price": "Net gain",
    "miuwi.project.tarif.commission": "SpliiK Commission",
    "miuwi.project.tarif.shownPrice": "Price displayed",
    "miuwi.project.tarif.offered": "Free",
    "miuwi.project.tarif.label": "Tutorial price ",

    "miuwi.not.whorkshop": "There is no tutorial in this category yet."
  },
  antd: antdEn,
  locale: "en-US",
  data: appLocaleData
};
export default EnLang;
