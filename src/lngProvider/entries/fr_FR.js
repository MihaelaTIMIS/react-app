import antdSA from "antd/lib/locale-provider/fr_FR";
import appLocaleData from "react-intl/locale-data/fr";
import saMessages from "../locales/fr_FR.json";

const saLang = {
  messages: {
    ...saMessages,

    "spliik.cookie.consent":
      'SpliiK utilise des cookies pour vous offrir une expérience utilisateur de qualité, mesurer l\'audience et optimiser les fonctionnalités. En poursuivant votre navigation sur ce site, vous acceptez l\'utilisation de cookies dans les conditions prévues par <a href="https://www.spliik.com/supports" target="_blank">notre politique de confidentialité</a>.',
    "spliik.cookie.consent.button": "Je comprends",

    "spliik.accountbanking.add": "Enregistrer un compte bancaire",
    "spliik.accountbanking.recovered": "Recupérer mes gains",

    "spliik.earnings.title": "Mes gains",
    "spliik.earnings.line1": "Gains actuels non crédités",
    "spliik.earnings.line2": "Gains totals depuis le début",
    "spliik.earnings.line3":
      "Enregistrer votre compte bancaire pour recevoir vos gains à chaque début du mois.",
    "spliik.earnings.line5":
      "Les informations sont transmises de façon sécurisée.",
    "spliik.earnings.iban.add": "Enregistrer l'IBAN",
    "spliik.earnings.iban.close": "Fermer",
    "spliik.earnings.iban.validated": "Votre IBAN a été validé.",
    "spliik.earnings.iban.preview": "Aperçu de mon IBAN",

    "spliik.search.placeholder": "Rechercher un atelier...",
    "spliik.feedback.label": "Signaler un problème",

    "spliik.followed": "Abonné(e) à",
    "spliik.followedby": "Suivi par",

    "spliik.confirm": "Confirmation",

    "miuwi.privacypolicy": "Politique de confidentialité",
    "miuwi.cgu": "CGU",
    "miuwi.cgv": "CGV",
    "miuwi.cgucgy.error": "Veuillez accepter les CGU et les CGV",
    "miuwi.legalnotices":
      'J\'accepte les <a href="https://www.spliik.com/supports" target="_blank" >conditions générales d\'utilisation</a> et les <a href="https://www.spliik.com/supports" target="_blank" >conditions générales de vente</a>.',

    "miuwi.paymentLegalNotices":
      'J\'accepte les <a href="https://www.spliik.com/supports" target="_blank" > conditions générales </a> de la plateforme et procède au paiement pour profiter pleinement du tutoriel.',
    "miuwi.confirmPaymentButton": "Je confirme et procède au paiement",
    "miuwi.stripePaymentLabel":
      'Paiement sécurisé avec <a href="https://stripe.com" target="_blank" style="color:#003366; text-decoration:underline;" >stripe.com</a>',
    "miuwi.confirmPaymentText":
      "En vertu de l'article L.221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats \"de fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation\" . Dès lors, en validant le paiement du Tutoriel, Vous reconnaissez expressément renoncer au droit de rétractation.",

    "miuwi.form.select": "Sélectionner",
    "miuwi.form.addPicture": "Ajouter une image",
    "miuwi.form.addFile": "Ajouter un fichier",
    "miuwi.form.addAvatar": "Ajouter un avatar au format carré",

    "miuwi.sidebar.createProject": "Créer mon tutoriel",
    "miuwi.sidebar.editProject": "Modifier mon tutoriel",
    "miuwi.sidebar.contributeProject": "Contribuer au tutoriel",
    "miuwi.sidebar.realizeProject": "Réaliser un tutoriel",
    "miuwi.sidebar.readProject": "Visualiser un tutoriel",
    "miuwi.sidebar.projects": "Tutoriels",
    "miuwi.sidebar.listProjects": "Tous les tutoriels",
    "miuwi.sidebar.createExercice": "Créer une étape (composant)",
    "miuwi.sidebar.login": "Se connecter",
    "miuwi.sideBar.logout": "Se déconnecter",
    "miuwi.sidebar.signUp": "S'inscrire",
    "miuwi.keywords.all": "Tout",

    //profil user
    "miuwi.user.student": "Collaborateur",
    "miuwi.user.student.action": "Apprendre",
    "miuwi.user.owner": "Expert",
    "miuwi.user.owner.action": "Créer",
    "miuwi.user.admin": "Demande publication",
    "miuwi.user.tofollow": "Suivre",
    "miuwi.user.notfollow": "Ne plus suivre",
    "miuwi.user.description": "Description",
    "miuwi.user.loginlabel": "ou identifiez-vous par email",
    "miuwi.user.soutien": "Soutien",
    "miuwi.user.soutien.action": "Conseiller",
    "miuwi.project.infos.visit": " visite",
    "miuwi.project.infos.subscription": " souscription",
    "miuwi.project.infos.message": " interaction",
    "miuwi.project.infos.earnings": " de gains",
    "miuwi.user.backToDashboard": "Retour à mes tutoriels",
    "miuwi.user.archives": "Archives",
    "miuwi.user.show.archives": "Voir mes archives",
    //student copy tutorial
    "miuwi.student.copyWorkshop.label": "Créer une copie vierge",
    "miuwi.student.copyWorkshop.text":
      "La copie vous permet de répondre une nouvelle fois aux étapes du tutoriel. \n Le tutoriel actuel et vos réponses seront toujours accessibles.",
    "miuwi.student.copyWorkshop.confirm":
      "Confirmez-vous la création d'une copie vierge du tutoriel ?",
    //expert copy tutorial
    "miuwi.expert.copyWorkshop.title": "Créer une copie d'un tutoriel",
    "miuwi.expert.copyWorkshop.label": "Créer une copie",
    "miuwi.expert.copyWorkshop.text":
      " La copie d'un tutoriel vous permet de créer une version améliorée et/ou étendue. \n Ce tutoriel ne sera pas publié tant que la demande de publication ne sera pas réalisée.",
    "miuwi.expert.copyWorkshop.confirm":
      "Confirmez-vous la création d'une copie de votre tutoriel",

    //Form opinion
    "miuwi.opinionLabel": "Donner votre avis",
    "miuwi.opinionLabel.stars": "Champs obligatoire",
    "miuwi.field.required": "Champs obligatoire",
    "miuwi.opinion.success": "Merci pour votre opinion.",
    "miuwi.opinion.empty": "Il n'y a pas eu encore d'avis.",

    //les étapes de création projet
    "miuwi.project.title.create": "Création",
    "miuwi.project.title.presentation": "Présentation",
    "miuwi.project.title.exercises": "Étapes",
    "miuwi.project.title.exercise": "Étape",
    "miuwi.project.title.contribution": "Contribution",
    "miuwi.project.title.publication": "Publication",
    "miuwi.project.title.final": "Finale",

    //texte qu'on utilise par tout
    //errors pour les champs vides
    "miuwi.sever.error":
      "Une erreur s'est produite. Veuillez essayer ulterieurement.",
    "miuwi.errorInput.title": "Veuillez remplir les champs de saisie!",
    "miuwi.errorInput.pseudo": "Veuillez insérer un pseudo",
    "miuwi.errorInput.email": "Veuillez insérer votre mail",
    "miuwi.errorInput.password": "Veuillez insérer un mot de passe",
    "miuwi.errorInput.password-confirm":
      "Veuillez insérer de nouveau votre mot de passe",
    "miuwi.errorInput.password-confirm-different":
      "Les mots de passe saisis ne sont pas identiques",
    "miuwi.errorInput.account-already-exists":
      "Un compte avec cet email existe déjà.",
    "miuwi.errorInput.price": "Le champ prix est obligatoire",
    "miuwi.errorInput.isFree":
      "Veuillez préciser si votre projet est gratuit ou non",

    //discussions
    "miuwi.thread.label": "Fil de discussion",
    "miuwi.thread.title": "Fil de discussion - titre",
    "miuwi.thread.resume": "Fil de discussion - résumé",
    "miuwi.thread.overview": "Fil de discussion d'ensemble",

    "miuwi.thread.link": "Répondre dans le fil de discussion",
    "miuwi.thread.helper.bubble":
      "Vous pouvez cliquer sur la bulle \n pour faire un retour globale.",
    "miuwi.thread.student.bubble":
      "Vous pouvez cliquer sur la bulle pour voir \n les retours globaux de vos soutiens",

    "miuwi.thread.expert.bubble":
      "Vous créez votre tutoriel. \n Demandez des retours \n à vos assistants à la page suivante.",

    "miuwi.thread.assistant.bubble1": "Vous aidez ",
    "miuwi.thread.assistant.bubble2":
      " sur son tutoriel. \n Assistez-le dans les fils de discussion.",

    "miuwi.thread.link.helper": "Faire la synthèse de votre réponse là-dessous",
    "miuwi.thread.sendButton": "Envoyer le message",

    "miuwi.thread.helper": "Soutenir",
    "miuwi.thread.assistant": "Assister",
    "miuwi.thread.expert": "Regarder les retours",

    //bouttons
    "miuwi.project.edit-exercise.nextText":
      "Validez et passez à l'étape suivante. Vous pourrez revenir sur ces parties par la suite.",
    "miuwi.project.previousButton": "Précédent",
    "miuwi.project.saveButton": "Enregistrer",
    "miuwi.project.publishButton": "Publier votre tutoriel",
    "miuwi.project.nextButton": "Suivant",
    "miuwi.project.viewProjects": "Voir mes tutoriels",
    "miuwi.project.seeProject": "Voir",
    "miuwi.project.editProject": "Modifier",
    "miuwi.project.contributeToTheProject": "Contribuer",
    "miuwi.project.copy": "Copier",
    "miuwi.project.share": "Partager",
    "miuwi.project.publishConfirmButton": "Publier",

    "miuwi.project.cancelButton": "Annuler",
    "miuwi.project.saveAndCancel": "Enregistrer et fermer",
    "miuwi.project.mailToAssistants": "Envoyer un mail à mes assistants",
    "miuwi.project.mailToExpert": "Envoyer un mail à l’expert de ce tutoriel",  
    "miuwi.project.mailToExpert.info": "Attention: le créateur du tutoriel peut demander un contribution financière pour ses services et ses retours sur votre tutoriel.",  
    "miuwi.project.mailToHelpers": "Envoyer un mail à mes conseillers",
    "miuwi.project.mailToStudent": "Envoyer un mail \n au collaborateur que j’aide",   
    "miuwi.project.shareAndDiscover": "Partager & découvrir",

    //-----------text
    "miuwi.titleLabel": "Titre",
    "miuwi.discussionLabel": "Discussion",
    "miuwi.dateLabel": "Date/heure",
    "miuwi.opinion":
      "Donnez votre opinion voir votre solution à votre collaborateur. Ecrivez comment vous vous l'auriez rédigé.",
    "miuwi.examplesLabel": "Exemples",
    "miuwi.emailInput": "Email",
    "miuwi.project.bravoTitle": "BRAVO ! ",
    "miuwi.project.bravoText": "Vous avez terminé votre tutoriel.",

    //-----------media
    "miuwi.downloadButton": "Télécharger",
    "miuwi.downloadButtonFile": "Télécharger le fichier",
    "miuwi.videoText": " Téléchargez la vidéo",
    "miuwi.videoText.delete": " Supprimer la vidéo",
    "miuwi.videoText.delete.confirm":
      "Vous êtes sur le point de supprimer la vidéo. Confirmez-vous ?",
    "miuwi.picture.delete.confirm":
      "Êtes-vous sûr de vouloir supprimer ce média ?",

    "miuwi.file.size": "Poids ",
    "miuwi.file.format": "Format: ",
    "miuwi.video.duration":
      "Téléchargez la vidéo d'une durée de 3 minutes maximum. ",

    "miuwi.imageLabel": "Image",
    "miuwi.videoLabel": "Vidéo",
    "miuwi.attachmentsLabel": "Fichiers joints",
    "miuwi.show.pdf": "Voir le fichier",

    //**************NOT CONNECTED OR NOT STUDENT***********
    "miuwi.offlineUser.note": "Notation",
    "miuwi.offlineUser.timeNeeded": "Temps nécessaire",
    "miuwi.offlineUser.nbActive": "Nombre de collaborateurs actifs",
    "miuwi.offlineUser.nbExercises": "Nombre d'étapes",
    "miuwi.offlineUser.connectButton":
      "CONNECTION POUR COMMENCER VOTRE TUTORIEL ET LES ETAPES",
    "miuwi.offlineUser.readyButton": "Commencer le tutoriel",
    "miuwi.offlineUser.authorTitle": "Assistant",
    "miuwi.offlineUser.authorTitle.action": "Accompagner",
    "miuwi.offlineUser.authorLastName": "Nom",
    "miuwi.offlineUser.authorFirstName": "Prénom",
    "miuwi.offlineUser.authorPost": "Poste",
    "miuwi.offlineUser.authorSentences": "Phrases",
    "miuwi.offlineUser.linkProject": "Lien vers le tutoriel",
    "miuwi.offlineUser.sendLinkButton": "Envoyer le lien",
    "miuwi.offlineUser.noticeTitle": "AVIS",
    "miuwi.offlineUser.friendsInProject": "Amis déjà dans le tutoriel",
    "miuwi.offlineUser.otherStudents": "Les autres collaborateurs",
    "miuwi.offlineUser.discoverProject": "Faire découvrir le tutoriel",
    "miuwi.offlineUser.sendButton": "Envoyer les invitations",
    "miuwi.offlineUser.projectsLabel": "LES TUTORIELS ASSOCIES",

    //welcome page
    "miuwi.welcome":
      "Le monde sera plus intelligent si vous lui partagez vos compétences.",
    "miuwi.welcome.lastWorkshops": "Les derniers ateliers",
    "miuwi.welcome.mostViewed": "Les plus consultés",
    "miuwi.welcome.unavoidables": "Les incontournables",

    //************************OWNER************************
    //1. création projet
    "miuwi.project.create.firstParagraph":
      "Vous pouvez maintenant créer votre projet. La démarche est de permettre à votre public de comprendre ce qu'il va faire en application votre savoir et votre expérience.",

    //1. création projet - titre
    "miuwi.project.create.title.description":
      "Donner un titre à ce tutoriel sous la forme d'une question qui explique ce que va faire la personne",
    "miuwi.project.create.title.exemple":
      "Ex : Comment allez-vous faire votre projet d'équipe ?",

    //1. création projet - categories
    "miuwi.project.create.categories": "Catégories",
    "miuwi.project.create.categories.description":
      "Sélectionner les catégories de votre tutoriel",
    "miuwi.project.create.categories.exemple": "Ex : marketing",
    "miuwi.project.category": "Catégorie",
    "miuwi.project.subcategory": "Sous-catégorie",

    //1. création projet - étiquettes
    "miuwi.project.create.tags": "Étiquettes",
    "miuwi.project.create.tags.add": "Ajouter étiquette",
    "miuwi.project.create.tags.help":
      "Les étiquettes servent à vous référencer dans la barre de recherche. Vous pouvez en mettre autant que vous voulez : nom, prénom, travail, spécialité, entreprise, sujet, problème, titre, client, but, gain, mission, actions, résultat, ...",

    //1. création projet - résumé
    "miuwi.project.create.resume": "Résumé",
    "miuwi.project.create.resume.description":
      "Faire un résumé de ce que votre collaborateur va faire. Donner (1) le résultat qu'il va obtenir, (2) les étapes qu'il va faire, (3) les méthodes qu'il va appliquer, ...",

    //1. création projet - bouttons
    "miuwi.project.create.nextButton": "Poursuivre",

    //2. édition projet(présentation)
    "miuwi.project.edit.error":
      "Vous n'êtes pas autorisé à effectuer cette action pour un atelier soumis à publication ou publié.",
    "miuwi.project.edit.firstParagraph":
      "Vous pouvez maintenant présenter votre tutoriel à votre collaborateur grâce à la vidéo et aux supports. Ils vont permettre à votre collaborateur de mieux comprendre ce qu'il va faire en appliquant votre savoir et votre expérience.",

    //2. édition projet - image
    "miuwi.project.edit.image.description":
      "Télécharger l'image pour vous différencier et avoir une belle mise en page",

    //2. édition projet - video
    "miuwi.project.edit.video.description":
      "Enregistrez-vous avec votre webcam ou votre téléphone. ",

    //2. édition projet - fichiers joints
    "miuwi.project.edit.attachmens.description":
      "Mettre votre plaquette, votre schéma, votre pdf dans ces deux espaces",

    //2. édition projet - bouttons
    "miuwi.project.edit.nextButton": "Ajouter vos étapes",

    //3. exercises
    "miuwi.project.exercises.owner":
      "Expert de ce tutoriel, vous avez le droit à l'aperçu de vos étapes.",
    "miuwi.project.exercises.firstParagraph":
      "Vous pouvez maintenant rédiger les étapes qui vont permettre à votre collaborateur de mettre en application votre savoir et votre expérience.",
    "miuwi.project.edit.secondParagraph":
      "Chaque ligne est à prendre comme une étape vers la mise en œuvre de ce tutoriel. Il y a minimum 3 étapes et maximum 20.",
    "miuwi.project.edit.linkedFiles": "Avez-vous des fichiers à lier ?",
    "miuwi.project.exercices.deleteConfirm":
      "Vous êtes sûr de vouloir supprimer cette étape ?",

    "miuwi.project.exercises.editError":
      "Vous n'êtes pas authorisé à réaliser cette action pendant que vous éditez une étape.",

    //3. exercises - bouttons
    "miuwi.project.exercises.hideAllExosBtn": "Replier les ",
    "miuwi.project.exercises.seeAllExos1Btn": "Ouvrir les ",
    "miuwi.project.exercises.seeAllExos2Btn": " étapes",
    "miuwi.project.exercises.deleteButton": "Supprimer",
    "miuwi.project.exercises.overviewButton": "Aperçu de l'étape",
    "miuwi.project.exercises.validateButton": "Enregistrer l'étape",
    "miuwi.project.exercises.addButton": "Ajouter une étape",
    "miuwi.project.exercises.editButton": "Modifier",
    "miuwi.project.exercises.answer.edit.button": "Répondre à l'étape",
    "miuwi.project.exercises.answer.save.button": "Sauvegarder ma réponse",
    "miuwi.project.student.noanswer": "Aucune réponse enregistrée",
    "miuwi.project.exercises.extendsButton": "Fermer",
    "miuwi.project.student.start": "Je commence mon tutoriel !",
    "miuwi.project.student.start2":
      "Nous avons le plaisir de vous confirmer votre intégration à l'atelier.",
    "miuwi.project.student.start3": "Merci beaucoup et bon atelier.",

    //3. exercises - presentation
    "miuwi.project.exercises.presentationText":
      "Développer la présentation de l'action à faire dans cette étape",

    "miuwi.project.exercises.examplesText":
      "Donner des exemples pré rédigés permettra de passer à l'action plus facilement",
    "miuwi.project.exercises.examplesVideoText":
      "La vidéo permet de transmettre les émotions et de donner de l'importance à votre public. Enregistrez-vous avec votre webcam ou votre téléphone.",

    "miuwi.project.exercises.positionLabel": "Position de l'étape",

    //4. diffusion
    "miuwi.project.diffusion.firstParagraph":
      "Vous pouvez lier votre tutoriel à d'autres pour créer une continuité ou des renvois. Vous pouvez inviter vos assistants à découvrir votre projet.",
    "miuwi.project.diffusion.nextSteps": "Prochaines étapes",
    "miuwi.project.diffusion.seeProject": "Vous pouvez voir votre tutoriel",
    "miuwi.project.diffusion.inviteCustomersLabel":
      'En cliquant sur le bouton "Inviter votre public", vous serez diriger vers la page de publication. Elle permet de publier et d\'inviter vos collaborateurs, prospects et clients à utiliser votre tutoriel.',
    "miuwi.project.diffusion.inviteCustomersButton": "Inviter votre public",

    //4. diffusion - associer les projects
    "miuwi.project.diffusion.joinTitle": "Associer vos tutoriels",
    "miuwi.project.diffusion.joinText":
      "Est ce qu'il y a un tutoriel associé que vous conseilleriez ?",
    "miuwi.project.diffusion.projectButton": "Tutoriel",
    "miuwi.project.diffusion.joinButton": "Associer",
    "miuwi.project.diffusion.disjoinButton": "Dissocier",

    //4. diffusion - inviter des lecteurs
    "miuwi.project.diffusion.inviteTitle": "Inviter vos assistants",
    "miuwi.project.diffusion.inviteText":
      "Avec qui voulez-vous co-construire ou faire relire votre tutoriel ?",
    "miuwi.project.diffusion.lecteurLabel": "Assistant",
    "miuwi.project.diffusion.inviteSubmitBtn": "Soumettre à vos assistants",
    "miuwi.project.diffusion.renderTitle": "Regarder le rendu",
    "miuwi.project.diffusion.previewBtn": "Voir l'aperçu",

    //4bis. diffusion
    "miuwi.project.diffusionBis.firstParagraph":
      "Vous pouvez partager votre tutoriel.",
    "miuwi.project.diffusionBis.shareTitle": "Partager votre tutoriel",
    "miuwi.project.diffusionBis.shareText1":
      "Qui pourrait être intéressé de découvrir votre tutoriel ? Qui pourrait utiliser votre tutoriel dans le quotidien de son travail ?",
    "miuwi.project.diffusionBis.shareText2":
      "Envoyer une invitation à une liste de mail. Séparer les emails avec une virgule.",
    "miuwi.project.diffusionBis.submitBtn": "Soumettre à votre public",
    "miuwi.project.publishConfirmText":
      "Attention: Être bien sûr que votre tutoriel est abouti dans sa forme, son fond, son orthographe, son déroulement... Quand un tutoriel est publié, il n'est plus modifiable.",

    //Se Connecter
    "miuwi.login.welcome":
      "Bienvenue dans la communauté SpliiK !\n Ici, vous allez réussir jusqu’au résultat concret \n par la pratique et la collaboration.",

    "miuwi.login.title": "Se connecter",
    "miuwi.login.remember": "Se souvenir de moi",
    "miuwi.login.forgotPassword": "Mot de passe oublié ?",
    "miuwi.loginButton": "Je me connecte",
    "miuwi.login.emailError": "Entrer un email valide",
    "miuwi.login.emailPassword": "Email / mot de passe invalide",
    "miuwi.login.passwordError": "Entrer un mot de passe valide",
    "miuwi.login.error": "Erreur",
    "miuwi.noaccount": "Pas encore de compte ?",
    "miuwi.registering": "Je m'inscris !",
    "miuwi.resetPassword": "Réinitialiser le mot de passe",
    "miuwi.resetButton": "Réinitialiser",
    "miuwi.notExist": "Ce compte n'existe pas",
    "miuwi.resetPassword.success":
      "Un lien de réinitialisation vous a été envoyé à l'adresse mail fournie.",
    "miuwi.alreadyregistered": "Déjà inscrit ?",
    //Se Créer un compte
    "miuwi.signup.confirm":
      "Veuillez activer votre compte en cliquant sur le lien reçu dans votre mail. ",
    "miuwi.signup.activate": "Merci d'avoir activé votre compte.",
    "miuwi.signup.username": "Nom d'utilisateur",
    "miuwi.signup.password": "Mot de passe",
    "miuwi.signup.passwordConfirm": "Confirmer votre mot de de passe",
    "miuwi.signup.iconnect": "Je me connecte",

    //admin - les bouttons du projet à publier
    "miuwi.project.accept": "Accepter la publication",
    "miuwi.project.reject": "Refuser la publication",
    "miuwi.project.rejectReason":
      "Veuillez indiquer la raison pour laquelle vous refusez la publication de ce projet.",
    "miuwi.project.sendRejectMessage": "Envoyer la raison du refus",
    "miuwi.project.status.online": "Publié",
    "miuwi.project.status.pending": "En cours de publication",
    "miuwi.project.status.rejected": "Refusé",
    "miuwi.project.status.draft": "Brouillon",
    "miuwi.project.rejectedReason": "Motif de refus",
    "miuwi.project.student.archive":
      "Confirmez-vous l’archivage du tutoriel ? Il sera accessible à partir de vos archives.",
    "miuwi.project.expert.archive":
      "Vous êtes sur le point d’archiver votre tutoriel. Il ne sera plus visible dans le catalogue SpliiK. Il sera accessible à partir de vos archives.",
    "miuwi.project.expert.unarchive":
      "Attention: le tutoriel va être désarchivé. Il sera comme un nouveau tutoriel. Vous devez le republier pour qu'il apparaisse aux autres.",

    "miuwi.project.expert.archives.info":
      "Ici apparaîtront les ateliers que vous avez archivé en tant qu'expert.",
    //etudiant
    "miuwi.project.student.info":
      "Ici apparaîtront les ateliers que vous avez commencé en tant qu'étudiant.",
    "miuwi.project.student.archives.info":
      "Ici apparaîtront les ateliers que vous avez archivé en tant qu'étudiant.",

    "miuwi.project.student.showVideoBtn": "Voir la vidéo",
    "miuwi.project.student.answerLabel": "Votre réponse",
    "miuwi.project.student.help": "Besoin d'aide ? Envoyer une invitation",
    "miuwi.project.student.exerciseAnswer": "Réponse",
    "miuwi.project.student.payed": "Payé",
    "miuwi.project.student.statusInProgress": "En cours",
    "miuwi.project.student.statusFinished": "Terminé",
    "miuwi.project.student.statusArchived": "Archivé",
    "miuwi.project.student.continue": "Continuer",
    "miuwi.project.student.resume": "Reprendre",
    "miuwi.project.archive": "Archiver mon tutoriel",
    "miuwi.project.archive.review": "Voir mon tutoriel archivé",
    "miuwi.project.student.finish": "Terminer et noter le tutoriel",
    "miuwi.project.student.calendar.title": "Mon tutoriel Spliik",
    "miuwi.project.student.calendar.label": "Ajouter à mon calendrier",

    "miuwi.project.student.finish.warning":
      "Êtes-vous sûr de vouloir terminer cet atelier ? Une fois terminé, vous ne pouvez plus le modifier.",
    "miuwi.project.student.finish.button": "Terminer",
    "miuwi.project.student.icon": "vous soutient",

    //helper
    "miuwi.project.helper.info":
      "Ici apparaîtront les ateliers dont les étudiants vous demanderont un soutien.",
    "miuwi.project.helper.answerLabel": "La réponse du collaborateur",
    "miuwi.project.helper.icon": "vous soutenez",
    "miuwi.project.helper.archives.info":
      "Ici apparaîtront les ateliers que vous avez archivé en tant que soutien.",

    //assistant
    "miuwi.project.assistant.info":
      "Ici apparaîtront les ateliers dont les formateurs vous demanderont une assistance.",
    "miuwi.project.assistant.archives.info":
      "Ici apparaîtront les ateliers que vous avez archivé en tant qu'assistant.",
    // search
    "miuwi.search.labelresult": "Résultat pour :",

    //paiement
    "miuwi.project.paymentButton": "Acheter le tutoriel",
    "miuwi.project.tarif.title": "Indiquer le tarif de votre tutoriel",
    "miuwi.project.tarif.free": "Gratuit",
    "miuwi.project.tarif.paying": "Payant",
    "miuwi.project.tarif.price": "Gain net par vente",
    "miuwi.project.tarif.commission": "Commission SpliiK",
    "miuwi.project.tarif.shownPrice": "Prix affiché",
    "miuwi.project.tarif.offered": "Offert",
    "miuwi.project.tarif.label": "Prix du tutoriel ",

    "miuwi.not.whorkshop":
      "Il n'y a pas encore de tutoriel dans cette catégorie."
  },
  antd: antdSA,
  locale: "fr-FR",
  data: appLocaleData
};
export default saLang;
