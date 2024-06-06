import antdSA from "antd/lib/locale-provider/ca_ES";
import appLocaleData from "react-intl/locale-data/es";
import saMessages from "../locales/es_ES.json";

const saLang = {
  messages: {
    ...saMessages,

    "spliik.cookie.consent":
      'SpliiK utiliza cookies des para su experiencia de uso, calidad de usuario, audiencia y optimizador de funciones. En lugar de un sitio de navegación de navegación votivo, usted acepta la utilización de cookies en las condiciones previas a <a href="https://www.spliik.com/supports" target="_blank">la política de confidencialidad<a>.',
    "spliik.cookie.consent.button": "Entiendo",

    "spliik.accountbanking.add": "Registrar una cuenta bancaria",
    "spliik.accountbanking.recovered": "Recuperar mis ganancias",

    "spliik.earnings.title": "Mis ganancias",
    "spliik.earnings.line1": "Ganancias actuales no acreditadas",
    "spliik.earnings.line2": "Ganancias totales desde el principio",
    "spliik.earnings.line3":
      "Registre su cuenta bancaria para recibir sus ganancias al comienzo de cada mes.",
    "spliik.earnings.line5": "La información se transmite de forma segura.",
    "spliik.earnings.iban.add": "Registra el IBAN",
    "spliik.earnings.iban.close": "Cerrar",
    "spliik.earnings.iban.validated": "Su IBAN ha sido validado.",
    "spliik.earnings.iban.preview": "Resumen de mi IBAN",

    "spliik.search.placeholder": "Encuentra un taller...",
    "spliik.feedback.label": "Informar de un problema",

    "spliik.followed": "Followe",
    "spliik.followedby": "Followed by",

    "spliik.confirm": "Confirmación",

    "miuwi.privacypolicy": "política de privacidad",
    "miuwi.cgu": "Términos de servicio",
    "miuwi.cgv": "Terms of sales",
    "miuwi.cgucgy.error": "Por favor acepte los C&Uso y C&Venta",
    "miuwi.legalnotices":
      'Acepto las <a href="https://www.spliik.com/supports" target="_blank" >condiciones generales de uso</a> y <a href="https://www.spliik.com/supports" target="_blank" >condiciones generales de venta</a>.',

    "miuwi.paymentLegalNotices":
      'Acepto las <a href="https://www.spliik.com/supports" target="_blank" >condiciones generales</a> de la plataforma y procedo al pago para beneficiarme completamente del tutorial.',
    "miuwi.confirmPaymentButton": "Confirmo y procedo al pago",
    "miuwi.stripePaymentLabel":
      'Pago seguro con <a href="https://stripe.com" target="_blank" style="color:#003366; text-decoration:underline;" >sripe.com</a>',
    "miuwi.confirmPaymentText":
      'Según el artículo L.221-28 del Código del Consumidor, el derecho de desistimiento no puede ejercerse para contratos "para el suministro de contenido digital no suministrado en un medio material cuya ejecución ha comenzado después de un acuerdo previo expreso del consumidor y la renuncia expresa a su derecho de desistimiento". Al confirmar el pago del Tutorial, Usted reconoce expresamente que renuncia al derecho de desistimiento',

    "miuwi.form.select": "Seleccionar",
    "miuwi.form.addPicture": "Añadir una imagen",
    "miuwi.form.addFile": "Agregar archivo",
    "miuwi.form.addAvatar": "Agregar avatar en formato cuadrado",

    "miuwi.sidebar.createProject": "Crear mi tutorial",
    "miuwi.sidebar.editProject": "Editar mi tutorial",
    "miuwi.sidebar.contributeProject": "Contribuir al tutorial",
    "miuwi.sidebar.realizeProject": "Realizar un tutorial",
    "miuwi.sidebar.readProject": "Leer un tutorial",
    "miuwi.sidebar.projects": "Tutorials",
    "miuwi.sidebar.listProjects": "Todos los tutoriales",
    "miuwi.sidebar.createExercice": "Crear mi escenario (componente)",
    "miuwi.sidebar.login": "Conectarse",
    "miuwi.sideBar.logout": "Desconectarse",
    "miuwi.sidebar.signUp": "Regístrarse",
    "miuwi.keywords.all": "Todo",

    //form opinion
    "miuwi.opinionLabel": "Dar su opinion",
    "miuwi.opinionLabel.stars": "Campos obligatorios",
    "miuwi.field.required": "Campo requerido",
    "miuwi.opinion.success": "Gracias por tu opinion.",
    "miuwi.opinion.empty": "Todavía no ha habido opiniones.",

    //profil user
    "miuwi.user.student": "Contribuyente",
    "miuwi.user.student.action": "Aprender",
    "miuwi.user.owner": "Experto",
    "miuwi.user.owner.action": "Crear",
    "miuwi.user.admin": "Publicar solicitudes",
    "miuwi.user.tofollow": "Seguir",
    "miuwi.user.notfollow": "No seguir más",
    "miuwi.user.description": "Descripción",
    "miuwi.user.loginlabel": "o inicie sesión por correo electrónico",
    "miuwi.user.soutien": "Apoyo",
    "miuwi.user.soutien.action": "Asesorar",
    "miuwi.project.infos.visit": " visita",
    "miuwi.project.infos.subscription": " suscripcione",
    "miuwi.project.infos.message": " interaccione",
    "miuwi.project.infos.earnings": " ganancias",
    "miuwi.user.backToDashboard": "Volver a mis tutorialeso",
    "miuwi.user.archives": "Archivos",
    "miuwi.user.show.archives": "Ver mis archivos",
    //student copy tutorial
    "miuwi.student.copyWorkshop.label": "Crear una copia en blanco",
    "miuwi.student.copyWorkshop.text":
      "Copiar le permite responder a los pasos del tutorial nuevamente. \n El tutorial actual y sus respuestas siempre estarán disponibles",
    "miuwi.student.copyWorkshop.confirm":
      "¿Confirma la creación de una copia en blanco del tutorial?",

    //expert copy tutorial
    "miuwi.expert.copyWorkshop.title": "Crear una copia de un tutorial",
    "miuwi.expert.copyWorkshop.label": "Crear una copia",
    "miuwi.expert.copyWorkshop.text":
      "Copiar un tutorial le permite crear una versión mejorada y/o extendida. \n Este tutorial no se publicará hasta que se realice la solicitud de publicación.",
    "miuwi.expert.copyWorkshop.confirm":
      "Confirme que ha creado una copia de su tutorial",

    //les étapes de création projet
    "miuwi.project.title.create": "Creación",
    "miuwi.project.title.presentation": "Presentación",
    "miuwi.project.title.exercises": "Escenarios",
    "miuwi.project.title.exercise": "Escenario",
    "miuwi.project.title.contribution": "Contribución",
    "miuwi.project.title.publication": "Publicación",
    "miuwi.project.title.final": "Final",

    //texte qu'on utilise par tout
    //errors pour les champs vides
    "miuwi.sever.error":
      "Se ha producido un error. Por favor intente nuevamente más tarde.",
    "miuwi.errorInput.title": "Por favor, rellene los campos!",
    "miuwi.errorInput.pseudo": "¡Por favor ingrese un apodo!",
    "miuwi.errorInput.email": "¡Por favor proporcione su correo!",
    "miuwi.errorInput.password": "¡Por favor proporcione una contraseña!",
    "miuwi.errorInput.password-confirm": "¡Por favor, confirme su contraseña!",
    "miuwi.errorInput.password-confirm-different":
      "Las contraseñas ingresadas no son idénticas",
    "miuwi.errorInput.account-already-exists":
      "Ya existe una cuenta con este correo electrónico",
    "miuwi.errorInput.price": "Se requiere la entrada del precio",
    "miuwi.errorInput.isFree":
      "Debe especificar si su proyecto es gratuito o no",

    //discussions
    "miuwi.thread.label": "Hilo de conversación",
    "miuwi.thread.title": "Hilo de conversación - título",
    "miuwi.thread.resume": "Conversation threading - currículum",
    "miuwi.thread.overview": "Hilo de conversación - descripción general",

    "miuwi.thread.link": "Responder en el hilo de conversación",

    "miuwi.thread.student.bubble":
      "Puede hacer clic en la burbuja para ver \n los comentarios de sus ayudantes",
    "miuwi.thread.helper.bubble":
      "You can click on the bubble \n to make a global return.",

    "miuwi.thread.expert.bubble":
      "Tú creas tu tutorial. \n Solicite comentarios a sus asistentes  \n en la página siguiente ",

    "miuwi.thread.assistant.bubble1": "Tú ayudas ",
    "miuwi.thread.assistant.bubble2":
      " en su tutorial.  \n Ayúdelo en los hilos de discusión",

    "miuwi.thread.link.helper": "Resuma su respuesta a continuación",
    "miuwi.thread.sendButton": "Enviar mi mensaje",

    "miuwi.thread.helper": "Apoyo",
    "miuwi.thread.assistant": "Ayudar",
    "miuwi.thread.expert": "Mira los comentarios",

    //bouttons
    "miuwi.project.edit-exercise.nextText":
      "Valide y vaya al siguiente paso. Puede volver a estas partes más adelante.",
    "miuwi.project.previousButton": "Anterior",
    "miuwi.project.saveButton": "Salvar",
    "miuwi.project.publishButton": "Publicar su tutorial",
    "miuwi.project.nextButton": "Próximo",
    "miuwi.project.viewProjects": "Ver mis tutoriales",
    "miuwi.project.seeProject": "Ver",
    "miuwi.project.editProject": "Editar",
    "miuwi.project.contributeToTheProject": "Contribuir",
    "miuwi.project.copy": "Copiar",
    "miuwi.project.share": "Compartir",
    "miuwi.project.publishConfirmButton": "Publicar",

    "miuwi.project.cancelButton": "Anular",
    "miuwi.project.saveAndCancel": "Guardar y cerrar",    
    "miuwi.project.mailToAssistants": "Enviar un correo electrónico a mis asistentes",
    "miuwi.project.mailToExpert": "Enviar un correo electrónico al experto para este tutorial",
    "miuwi.project.mailToExpert.info": "Tenga en cuenta que el creador del tutorial puede solicitar una contribución financiera por sus servicios y comentarios sobre su tutorial.",
    "miuwi.project.mailToHelpers": "Enviar un correo electrónico a mis asesores",
    "miuwi.project.mailToStudent": "Enviar un correo electrónico \n al empleado al que estoy ayudando",   
    "miuwi.project.shareAndDiscover": "Compartir y descubrir",

    //-----------text
    "miuwi.titleLabel": "Título",
    "miuwi.discussionLabel": "Discusión",
    "miuwi.dateLabel": "Fecha/hora",
    "miuwi.opinion":
      "Da su opinión o su solución a su Contribuyente. Escríbelo como lo habría escrito.",
    "miuwi.examplesLabel": "Ejemplos",
    "miuwi.emailInput": "E-mail",
    "miuwi.project.bravoTitle": "BRAVO ! ",
    "miuwi.project.bravoText": "Se ha Terminado su tutorial.",

    //-----------media
    "miuwi.downloadButton": "Descargar",
    "miuwi.downloadButtonFile": "Descargar un archivo",
    "miuwi.videoText": "Descargar un video",
    "miuwi.videoText.delete": " Eliminar video",
    "miuwi.videoText.delete.confirm":
      "Estás a punto de eliminar el video. ¿Confirmas?",
    "miuwi.picture.delete.confirm":
      "¿Está seguro de que desea eliminar este medio?",

    "miuwi.file.size": "Peso",
    "miuwi.file.format": "Formato: ",
    "miuwi.video.duration": "Descargue un video de 3 minutos como máximo.",

    "miuwi.imageLabel": "Imagen",
    "miuwi.videoLabel": "Vídeo",
    "miuwi.attachmentsLabel": "Archivos adjuntos",

    "miuwi.show.pdf": "Abrir documento",

    //**************NOT CONNECTED OR NOT STUDENT***********
    "miuwi.offlineUser.note": "Notación",
    "miuwi.offlineUser.timeNeeded": "Tiempo necesario",
    "miuwi.offlineUser.nbActive": "Número de alumnos activos",
    "miuwi.offlineUser.nbExercises": "Numero de escenarios",
    "miuwi.offlineUser.connectButton":
      "CONEXIÓN PARA INICIAR SU TUTORIAL Y PASOS",
    "miuwi.offlineUser.readyButton": "Iniciar el tutorial",
    "miuwi.offlineUser.authorTitle": "Asistente",
    "miuwi.offlineUser.authorTitle.action": "Acompañar",
    "miuwi.offlineUser.authorLastName": "Apellido",
    "miuwi.offlineUser.authorFirstName": "Primer nombre",
    "miuwi.offlineUser.authorPost": "Puesto",
    "miuwi.offlineUser.authorSentences": "Frases",
    "miuwi.offlineUser.linkProject": "Enlace al tutorial",
    "miuwi.offlineUser.sendLinkButton": "Enviar enlace",
    "miuwi.offlineUser.noticeTitle": "Enviar enlace",
    "miuwi.offlineUser.friendsInProject": "Amigos ya en el tutorial",
    "miuwi.offlineUser.otherStudents": "Otros contribuyentes",
    "miuwi.offlineUser.discoverProject": "Para descubrir el tutorial",
    "miuwi.offlineUser.sendButton": "Enviar invitaciones",
    "miuwi.offlineUser.projectsLabel": "LOS TUTORIALES ASOCIADOS",

    //welcome page
    "miuwi.welcome":
      "El mundo será más inteligente si le vendes tus habilidades.",
    "miuwi.welcome.lastWorkshops": "Últimos talleres",
    "miuwi.welcome.mostViewed": "Mas visto",
    "miuwi.welcome.unavoidables": "Inevitables",

    //************************OWNER************************
    //1. création projet
    "miuwi.project.create.firstParagraph":
      "Ahora puede crear su tutorial. El enfoque es permitir que su audiencia entienda lo que hará al aplicar su conocimiento y experiencia.",

    //1. création projet - titre
    "miuwi.project.create.title.description":
      "Asignar un título a este tutorial en forma de pregunta que explique qué hará la persona",
    "miuwi.project.create.title.exemple":
      "Ex: ¿Cómo va a hacer su proyecto de equipo?",

    //1. création projet - categories
    "miuwi.project.create.categories": "Categorias",
    "miuwi.project.create.categories.description":
      "Seleccionar las categorías de su tutorial",
    "miuwi.project.create.categories.exemple": "Ej: marketing",
    "miuwi.project.category": "Categoría",
    "miuwi.project.subcategory": "Subcategoría",

    //1. création projet - tags
    "miuwi.project.create.tags": "Etiquetas",
    "miuwi.project.create.tags.add": "Agregar etiqueta",
    "miuwi.project.create.tags.help": "Las etiquetas se utilizan para hacer referencia a usted en la barra de búsqueda. Puede poner tantos como desee: apellido, nombre, trabajo, especialidad, empresa, tema, problema, título, cliente, objetivo, ganancia, misión, acciones, resultado, ...",

    //1. création projet - résumé
    "miuwi.project.create.resume": "Currículum",
    "miuwi.project.create.resume.description":
      "Hacer un resumen de lo que hará su contribuyente. Dar (1) el resultado que obtendrá, (2) los pasos que realizará, (3) los métodos que aplicará, ...",

    //1. création projet - bouttons
    "miuwi.project.create.nextButton": "Continuar",

    //2. édition projet(présentation)
    "miuwi.project.edit.error":
      "No tiene autorización para realizar esta acción en un taller que se envíe a publicación o se publique.",
    "miuwi.project.edit.firstParagraph":
      "Ahora puede presentar su tutorial a su contribuyente a través de videos y medios. Permitirá que su contribuyente entienda mejor lo que hará al aplicar su conocimiento y experiencia.",

    //2. édition projet - image
    "miuwi.project.edit.image.description":
      "Descargue la imagen para diferenciarse y tenga un diseño hermoso",

    //2. édition projet - video
    "miuwi.project.edit.video.description":
      "Sálvase con su webcam o teléfono. ",

    //2. édition projet - fichiers joints
    "miuwi.project.edit.attachmens.description":
      "Coloque su folleto, su diagrama, su pdf en estos dos espacios ",

    //2. édition projet - bouttons
    "miuwi.project.edit.nextButton": "Agrega sus escenarios",

    //3. exercises
    "miuwi.project.exercises.owner":
      "Experto en este tutorial, tiene derecho a previsualizar sus escenarios.",
    "miuwi.project.exercises.firstParagraph":
      "Ahora puede escribir los escenarios que le permitirán a su contribuyente aplicar sus conocimientos y experiencia.",
    "miuwi.project.edit.secondParagraph":
      "Cada línea debe tomarse como un paso hacia la implementación de este tutorial. Hay mínimo 3 pasos y máximo 20.",
    "miuwi.project.edit.linkedFiles": "¿Tiene archivos para enlazar ?",
    "miuwi.project.exercices.deleteConfirm":
      "¿Seguro que quiere borrar este escenario?",
    "miuwi.project.exercises.editError":
      "No está autorizado para realizar esta acción mientras está editando un escenario.",

    //3. exercises - bouttons
    "miuwi.project.exercises.hideAllExosBtn": "Ocultar los ",
    "miuwi.project.exercises.seeAllExos1Btn": "Abrir los ",
    "miuwi.project.exercises.seeAllExos2Btn": " escenarios",
    "miuwi.project.exercises.deleteButton": "Eliminar",
    "miuwi.project.exercises.overviewButton": "Resumen del escenario",
    "miuwi.project.exercises.validateButton": "Salvar el escenario",
    "miuwi.project.exercises.addButton": "Añadir un escenario",
    "miuwi.project.exercises.editButton": "Editar",
    "miuwi.project.exercises.answer.edit.button": "Responde el escenario",
    "miuwi.project.exercises.answer.save.button": "Guarda mi respuesta",
    "miuwi.project.student.noanswer": "No se registró respuesta",
    "miuwi.project.exercises.extendsButton": "Esconder",
    "miuwi.project.student.start": "Estoy empezando mi tutorial!",
    "miuwi.project.student.start2":
      "Nos complace confirmar su integración en el taller.",
    "miuwi.project.student.start3":
      "Muchas gracias y que tengas un buen taller.",

    //3. exercises - presentation
    "miuwi.project.exercises.presentationText":
      "Desarrollar la presentación de la acción a realizar en este paso.",
    "miuwi.project.exercises.examplesText":
      "Dar ejemplos escritos previamente hará que sea más fácil actuar.",
    "miuwi.project.exercises.examplesVideoText":
      "El video transmite los emociónes y dar importancia a su audiencia. Regístrese con su webcam o teléfono.",
    "miuwi.project.exercises.positionLabel": "Posición del escenario:",

    //4. diffusion
    "miuwi.project.diffusion.firstParagraph":
      "Puede vincular su tutorial a otros para crear continuidad o referencias. Puedes invitar a sus assistantes a descubrir su tutorial.",
    "miuwi.project.diffusion.nextSteps": "Próximos pasos",
    "miuwi.project.diffusion.seeProject": "Puedes ver su tutorial",
    "miuwi.project.diffusion.inviteCustomersLabel":
      'Al hacer clic en este botón "Invita a su audiencia", se lo dirigirá a la página de publicación, que le permite publicar e invitar a sus contribuyentes, prospectos y clientes a usar su tutorial',
    "miuwi.project.diffusion.inviteCustomersButton": "Invitar a su audiencia",

    //4. diffusion - associer les projects
    "miuwi.project.diffusion.joinTitle": "Asociar sus tutoriales",
    "miuwi.project.diffusion.joinText":
      "¿Hay algún tutorial asociado que recomendaría?",
    "miuwi.project.diffusion.projectButton": "Tutorial",
    "miuwi.project.diffusion.joinButton": "Asociar",
    "miuwi.project.diffusion.disjoinButton": "Disociar",

    //4. diffusion - inviter des lecteurs
    "miuwi.project.diffusion.inviteTitle": "Invitar a sus asistentes",
    "miuwi.project.diffusion.inviteText":
      "¿Con quién quiere construir o hacer que su tutorial vuelva a leerse?",
    "miuwi.project.diffusion.lecteurLabel": "Asistent",
    "miuwi.project.diffusion.inviteSubmitBtn": "Presentar a sus asistentes",
    "miuwi.project.diffusion.renderTitle": "Ver el render",
    "miuwi.project.diffusion.previewBtn": "Ver vista previa",

    //4bis. diffusion
    "miuwi.project.diffusionBis.firstParagraph": "Puede compartir su tutorial.",
    "miuwi.project.diffusionBis.shareTitle": "Comparse su tutorial",
    "miuwi.project.diffusionBis.shareText1":
      "¿Quién podría estar interesado en descubrir su tutorial? ¿Quién podría usar su tutorial en su trabajo diario ?",
    "miuwi.project.diffusionBis.shareText2":
      "Enviar una invitación a una lista de correo electrónico. Separar los correos electrónicos con una coma.",
    "miuwi.project.diffusionBis.submitBtn": "Presentar a su audiencia",
    "miuwi.project.publishConfirmText":
      "Advertencia: Asegúrarse de que su tutorial esté completo en su forma, sus antecedentes, su ortografía, su progreso... Cuando se publica un tutorial, ya no es editable.",

    //SignIn
    "miuwi.login.welcome":
      "¡Bienvenido a la comunidad SpliiK !\n Aquí tendrás éxito hasta el resultado concreto \n a través de la práctica y la colaboración.",

    "miuwi.login.title": "Conectarse",
    "miuwi.login.remember": "Recuérdarme",
    "miuwi.login.forgotPassword": "Se ha olvidó su contraseña?",
    "miuwi.loginButton": "Iniciar sesión",
    "miuwi.login.emailError": "Ingreser un correo electrónico válido",
    "miuwi.login.emailPassword": "Correo electrónico / contraseña inválida",
    "miuwi.login.passwordError": "Ingreser una contraseña válida",
    "miuwi.login.error": "Error",
    "miuwi.noaccount": "No tiene cuenta aún?",
    "miuwi.registering": "Me inscribo!",
    "miuwi.resetPassword": "Restablecer la contraseña",
    "miuwi.resetButton": "Reiniciar",
    "miuwi.notExist": "Esta cuenta no existe.",
    "miuwi.resetPassword.success":
      "Se ha enviado un enlace de restablecimiento a la dirección de correo electrónico proporcionada.",
      "miuwi.alreadyregistered": "¿ya inscrito?",
    //Se Créer un compte
    "miuwi.signup.confirm":
      "Active su cuenta haciendo clic en el enlace recibido en su correo electrónico.",
    "miuwi.signup.activate": "Gracias por activar su cuenta.",
    "miuwi.signup.username": "Nombre de usuario",
    "miuwi.signup.password": "Contraseña",
    "miuwi.signup.passwordConfirm": "Confirmación de contraseña",
    "miuwi.signup.iconnect": "Me conecto",

    //admin - les bouttons du projet à publier
    "miuwi.project.accept": "Aceptar la publicación",
    "miuwi.project.reject": "Rechazar la publicación",
    "miuwi.project.rejectReason":
      "Escribir el motivo por el que rechazar la publicación de este tutorial.",
    "miuwi.project.sendRejectMessage": "Enviar el motivo del rechazo",
    "miuwi.project.status.online": "Publicado",
    "miuwi.project.status.pending": "En curso de publicación",
    "miuwi.project.status.rejected": "Rechazado",
    "miuwi.project.status.draft": "Borrador",
    "miuwi.project.rejectedReason": "Motivo de rechazo",
    "miuwi.project.student.archive":
      "¿Confirmas el archivo del tutorial? Será accesible desde sus archivos.",
    "miuwi.project.expert.archive":
      "Estás a punto de archivar tu tutorial. Ya no será visible en el catálogo de SpliiK. Será accesible desde sus archivos.",
    "miuwi.project.expert.unarchive":
      "Advertencia: el tutorial no se archivará. Será como un nuevo tutorial. Debe volver a publicarlo para que aparezca a los demás.",

    "miuwi.project.expert.archives.info":
      "Aquí aparecerán los talleres que ha archivado como experto",

    //etudiant
    "miuwi.project.student.info":
      "Aquí hay una lista de los proyectos que ha comenzado como estudiante.",
    "miuwi.project.student.archives.info":
      "Aquí aparecerán los talleres que archivó como estudiante.",
    "miuwi.project.student.showVideoBtn": "Mirar el video",
    "miuwi.project.student.answerLabel": "Su respuesta",
    "miuwi.project.student.help": "Necesidad de ayuda? Enviar una invitación",
    "miuwi.project.student.exerciseAnswer": "Respuesta",
    "miuwi.project.student.payed": "Pagado",
    "miuwi.project.student.statusInProgress": "En curso",
    "miuwi.project.student.statusFinished": "Terminado",
    "miuwi.project.student.statusArchived": "Archivado",
    "miuwi.project.student.continue": "Continuar",
    "miuwi.project.student.resume": "Reanudar",
    "miuwi.project.archive": "Archivar mi tutorial",
    "miuwi.project.student.review": "Ver mi tutorial archivado",
    "miuwi.project.student.finish": "Terminar y anotar este tutorial",
    "miuwi.project.student.calendar.title": "Mi tutorial Spliik",
    "miuwi.project.student.calendar.label": "Agregar a mi calendario",

    "miuwi.project.student.finish.warning":
      "¿Estás seguro de que quieres terminar este taller? Una vez terminado, ya no puedes modificarlo",
    "miuwi.project.student.finish.button": "Terminar",

    //helper
    "miuwi.project.helper.info":
      "Aquí aparecerán los talleres que comenzó como estudiante.",
    "miuwi.project.helper.answerLabel": "La respuesta del contribuyent",
    "miuwi.project.helper.archives.info":
      "Aquí aparecerán los talleres que ha archivado como soporte",
    "miuwi.project.helper.icon": "Usted apoya",
    "miuwi.project.student.icon": "te apoya",
    //assistant
    "miuwi.project.assistant.info":
      "Aquí aparecerán talleres cuyos entrenadores le pedirán ayuda.",
    "miuwi.project.assistant.archives.info":
      "Aquí aparecerán los talleres que has archivado como asistente",
    //search
    "miuwi.search.labelresult": "Resultado para:",

    //paiement
    "miuwi.project.paymentButton": "Comprar el tutorial",
    "miuwi.project.tarif.title": "Indicar el precio de su tutorial",
    "miuwi.project.tarif.free": "Gratis",
    "miuwi.project.tarif.paying": "Pagando",
    "miuwi.project.tarif.price": "Ganancia neta",
    "miuwi.project.tarif.commission": "Comisión SpliiK",
    "miuwi.project.tarif.shownPrice": "Precio mostrado",
    "miuwi.project.tarif.offered": "Ofrecido",
    "miuwi.project.tarif.label": "Precio del tutorial ",

    "miuwi.not.whorkshop": "No hay tutorial en esta categoría todavía."
  },
  antd: antdSA,
  locale: "es",
  data: appLocaleData
};
export default saLang;
