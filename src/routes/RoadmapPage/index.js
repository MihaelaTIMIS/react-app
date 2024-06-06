import React from "react";
import { Row, Col, Timeline } from "antd";
import { ScrollToTopController } from "../../components/ScrollToTopController";

const RoadmapPage = (props) => {
  return (
    <Row>
      <ScrollToTopController {...props} />
      <Col>
        <h1>Roadmap</h1>
        <Timeline>
          <Timeline.Item color="green">2019-10-29 : Site vitrine <a href="https://spliik.com" target="_blank" rel="noopener noreferrer">spliik.com</a></Timeline.Item> 
          <Timeline.Item color="green">2019-10-29 : Configuration des catégories (création d'un automate)</Timeline.Item> 
          <hr/>
          <Timeline.Item color="green">2019-10-29 : Atelier (formateur/assitant)</Timeline.Item> 
          <Timeline.Item color="green">2019-10-29 : - Règle de gestion : Minimum 3 exercices</Timeline.Item> 
          <Timeline.Item color="green">2019-10-29 : - Configuration Payant/Gratuit</Timeline.Item> 
          <Timeline.Item color="green">2019-10-29 : - Emission des emails aux étudiants à l'acceptation</Timeline.Item> 
          <Timeline.Item color="green">2019-10-29 : - Notification fil de discussion</Timeline.Item> 
          <hr/>
          <Timeline.Item color="green">2019-10-29 : Atelier (étudiant/soutien)</Timeline.Item> 
          <Timeline.Item color="green">2019-10-29 : - Statuts pour l'étudiant (en cours, archivé, terminé)</Timeline.Item> 
          <Timeline.Item color="green">2019-10-29 : - Vue Etudiant</Timeline.Item> 
          <Timeline.Item color="green">2019-10-29 : - Profil formateur</Timeline.Item> 
          <Timeline.Item color="green">2019-10-29 : - Ajout du calendrier</Timeline.Item> 
          <Timeline.Item color="green">2019-10-29 : - Paiement Stripe</Timeline.Item>
          <Timeline.Item color="green">2019-10-29 : - Invitation d'un soutien</Timeline.Item>
          <Timeline.Item color="green">2019-10-29 : - Fil de discussion</Timeline.Item>
          <Timeline.Item color="green">2019-10-29 : - Vue Soutien</Timeline.Item>
          <hr/>
          <Timeline.Item color="green">2019-10-29 : Nommage (Projet > Atelier, etc)</Timeline.Item>
          <Timeline.Item color="green">2019-10-29 : Template email FR/EN/SP</Timeline.Item>
          <Timeline.Item color="orange">2019-11-12 : Mise en qualification (AWS Amazon)</Timeline.Item> 
          <Timeline.Item color="orange">2019-11-12 : Connexion via Linkedin</Timeline.Item>
          <hr/>
          <Timeline.Item color="">2019-11-12 : Follower</Timeline.Item> 
          <Timeline.Item color="">2019-11-12 : Tests et qualification</Timeline.Item> 
          <hr/>
          <Timeline.Item color="">2019-12-?? : Mise en production après validation</Timeline.Item> 
          <hr/>
          <Timeline.Item color="green" >2019-06-21 : Nouvelle interface / Internationalisation</Timeline.Item>
          <Timeline.Item color="green" >2019-06-21 : Connexion / Inscription</Timeline.Item>
          <Timeline.Item color="green" >2019-06-21 : Création et lecture partielle d'un atelier</Timeline.Item>
          <Timeline.Item color="green">2019-07-17 : Finaliser la création de l'atelier avec les exercices</Timeline.Item>
          <Timeline.Item color="green">2019-07-17 : Finaliser la lecture d'un atelier</Timeline.Item>
          <Timeline.Item color="green">2019-07-17 : Ajouter les files de discussion dans atelier et exercice</Timeline.Item> 
          <Timeline.Item color="green">2019-07-17 : Ajout de la catégorie à un atelier</Timeline.Item> 
          <Timeline.Item color="green">2019-07-17 : Profil utilisateur (avatar)</Timeline.Item> 
          <Timeline.Item color="green">2019-08-28 : Ajout de la sous-catégorie à un atelier</Timeline.Item> 
          <Timeline.Item color="green">2019-09-01 : Continuer le développement de l'API pour répondre aux besoins front et technique</Timeline.Item>
          <Timeline.Item color="green">2019-09-01 : Vidéo Widget Cloudinary</Timeline.Item>
          <Timeline.Item color="green">2019-09-01 : Tous les médias (hors vidéos) sur AWS S3 (Storage)</Timeline.Item>
          <Timeline.Item color="green">2019-10-01 : atelier : Onglet diffusion</Timeline.Item>
          <Timeline.Item color="green">2019-10-01 : Atelier : Onglet publication</Timeline.Item>
          <Timeline.Item color="green">2019-10-01 : Moteur de recherche avec Agolia</Timeline.Item> 
          <Timeline.Item color="green">2019-10-01 : Mot de passe perdu ?</Timeline.Item> 
          <Timeline.Item color="green">2019-10-01 : Page d'accueil</Timeline.Item> 
          <Timeline.Item color="green">2019-10-01 : Template email</Timeline.Item> 
          <Timeline.Item color="green">2019-10-01 : Redirection après login</Timeline.Item> 
          <hr/>
        </Timeline>
      </Col>
    </Row>
  );
};

export default RoadmapPage;
