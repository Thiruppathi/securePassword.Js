// Javascript password generator
//  and Javascript password evaluator
// Author: L.Coulet, 2014
// License: Apache 2.0

// ------------------------------------------------------------------------
// The globals... THis is not state-of-the-art nut good-enough to start with
// Javascript ninja may prefer to close their eyes.

function SecurePassword() {  
    var availableCharsets={};
	availableCharsets["alphaLower"]				='abcdefghijklmnopqrstuvwxyz';
	availableCharsets["alphaUpper"]				='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	availableCharsets["numeric"]				='0123456789';
	availableCharsets["punctuation"]			='.,/;\':?"!#@~<>=+-_)(*&%';
	availableCharsets["special"]				=' `|^$��[]{}';
	availableCharsets["accented"]				='���������������������������';
	availableCharsets["accentedUppercase"]		='������������������������';
	availableCharsets["accentedSpecial"]		='�������������';

	var classifiedCharsets={};
	classifiedCharsets["vowel"]				= 'aeiouyAEIOUY������������������������������������������������������';
	classifiedCharsets["consonant"]			= 'bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ��������';
	classifiedCharsets["numeric"]			='0123456789';
	classifiedCharsets["separate"]			='.,/;:?!��| #@~=+-_&^%$��*\`"';
	classifiedCharsets["open"]				='\'"<([{`*/';
	classifiedCharsets["close"]				='\'">)]}`*/';
	classifiedCharsets["uppercase"]			= 'BCDFGHJKLMNPQRSTVWXZ���AEIOUY���������������������������';
	classifiedCharsets["lowercase"]			= 'aeiouybcdfghjklmnpqrstvwxz��������������������������������';

	var easyPasswordRequested=false;
	var easyPasswordUsingDictionary=false;

	var defaultEnabledCharsets=["alphaLower","alphaUpper","numeric","punctuation"];

	var enabledCharsets={};

	var allowCharacterRepetition=true;
	var passwordSize=10;

	var enableAlpha=true, enableNumeric=true, enableSpecial=true, enableAccented=true, enableAccentedSpecial=true;
	var customChars="";
	var ratings={};

	ratings["passwordSize"]=0;
	ratings["charsets"]=0;
	ratings["characterVariety"]=0;
	ratings["sequences"]=0;
	ratings["keyboard"]=0;
	ratings["dictionary"]=0;
	ratings["commonPasswords"]=0;

	var coefficients={};
	coefficients["passwordSize"]=4;
	coefficients["charsets"]=1;
	coefficients["characterVariety"]=1;
	coefficients["sequences"]=1;
	coefficients["keyboard"]=1;
	coefficients["dictionary"]=1;


	// The dictionary lookup object
	var dict = {};
	var dictKeys = {};
	// The password dictionary lookup object
	var passwddict = {};
	var passwddictKeys = {};

	// Dictonaries
	// English
	var englishdict="the and that was his with for had you not her which have from this him but all she";
	
	// sources: 
	// http://www.encyclopedie-incomplete.com/?Les-600-Mots-Francais-Les-Plus#outil_sommaire_2
	// http://en.wikipedia.org/wiki/Dolch_Word_List
	// French
	// French dictionnary seems not supporting LZW compression very well with the library used because of accended characters... 
	var frenchdict="les des une que est pour qui dans par plus pas sur sont Les avec son aux d'un cette d'une ont ses mais comme tout nous Mais fait �t� aussi leur bien peut ces deux ans encore n'est march� Pour donc cours qu'il moins sans C'est entre faire elle c'est peu vous Une prix dont lui �galement Dans effet pays cas millions Belgique BEF mois leurs taux ann�es temps groupe ainsi toujours soci�t� depuis tous soit faut Bruxelles fois quelques sera entreprises contre francs n'a Nous Cette dernier �tait s'est chez monde alors sous actions autres ils reste trois non notre doit nouveau milliards avant exemple compte belge premier nouvelle Elle l'on terme avait produits cela d'autres fin niveau b�n�fice toute travail partie trop hausse secteur part beaucoup valeur croissance rapport USD aujourd'hui ann�e base Bourse lors vers souvent vie l'entreprise autre peuvent bon surtout toutes nombre fonds point grande jour avoir nos quelque place grand personnes plusieurs certains d'affaires permet politique cet chaque chiffre pourrait devrait produit l'ann�e Par rien mieux celui qualit� France Ils Ces s'agit vente jamais production action baisse Avec r�sultats Des votre risque d�but banque voir avons qu'un elles moment qu'on question pouvoir titre doute long petit d'ailleurs notamment droit qu'elle heures cependant service Etats-Unis qu'ils l'action jours celle demande belges ceux services bonne seront �conomique raison car situation Depuis entreprise nouvelles n'y possible toutefois tant nouveaux selon parce dit seul qu'une soci�t�s vient jusqu quatre march�s mise seulement Van semble clients Tout Cela serait fort frais lieu gestion font quand capital gouvernement projet grands r�seau l'autre donn�es prendre plan points outre pourtant Ainsi type Europe pendant Comme mesure actuellement public dire important mis partir parfois nom n'ont veut pr�sent pass� forme autant d�veloppement mettre grandes vue investisseurs trouve maison mal l'an moyen choix doivent NLG direction Sur simple p�riode enfants dollars personnel assez programme g�n�ral banques eux semaine pr�sident personne europ�enne moyenne tard loi petite certaines savoir loin explique plupart jeunes cinq contrat Banque valeurs seule rendement nombreux fonction offre client activit�s environ ministre cadre sens �taient s�curit� recherche Paris sorte d�cembre Son suite davantage ensuite janvier donne vrai cause d'abord conditions suis juin peine certain septembre sommes famille l'indice pris laquelle directeur qu'en propose gens derniers �tant fut chose portefeuille obligations afin diff�rents technique Aujourd'hui ailleurs l'ensemble am�ricain ventes Selon rue livre octobre vraiment sein dollar Enfin haut Plus petits porte tel dur�e domaine aurait jeune pr�sente passe lorsque choses puis Vous aucun l'un n'en tandis coup existe propre carte crise importante atteint revenus montant forte ici s'il Quant rapidement j'ai ville etc mars s'en mon premiers bas marque v�ritable ligne longtemps propres devant passer d�part total s�rie quoi particulier concurrence �lev� position connu principe tendance court pages �videmment r�sultat aura parmi Sans am�ricaine face trouver durant femmes construction d�sormais distribution telle difficile autour europ�en pratique centre vendre juillet mai r�gion sociale filiale film besoin mode Pas repr�sente r�alit� femme vaut T�l aucune hommes donner titres l'Europe nombreuses diff�rentes moyens formation chiffres G�n�rale dix prochain l'Etat genre bureau communication participation gros pourquoi estime devient r�alis� cr�ation novembre l'�volution pourra semaines consommation faible terrain site droits moiti� puisque reprise compris projets avril vont call donn� simplement six firme perte Bien Philippe sait prend vite via strat�gie vos jeu petites marketing presque Michel manque r�aliser financiers Car Comment voiture chef constitue Internet J'ai enfin net charge nature second payer actuel Elles investissements dispose financier d'achat membres date avaient gamme revanche comment d�cision l'avenir tour actionnaires s'y solution cr�er l'�conomie concerne l'�poque belle lequel t�l seconde version Pays-Bas cher chacun lire techniques d�cid� mouvement conseil n�cessaire meilleur double sujet g�n�ralement restent celles politiques malgr� confiance homme d'actions Certains ayant papier commerce R�gion Wallonie Windows termes met contraire informations l'industrie trimestre diff�rence certaine formule jusqu'au voit programmes actuelle permis dossier Quand l'heure guerre acheter rendre f�vrier l'emploi main voire bons technologie europ�ens �l�ments unique l'eau venir g�n�rale courant suffit l'ordre conserver maximum force fax Que largement milliard soient Pierre devenir l'Union franc minimum mort responsable possibilit� presse affaires longue travers BBL relativement moi Deux pr�sence europ�ennes devraient groupes ensemble sant� New pense b�n�fices but compagnie publique coeur revenu mesures table nettement questions d'avoir permettre l'homme Chez retour qu'elles majorit� potentiel moindre r�cemment secteurs r�duction large traitement perdu �trangers parents l'une fond capacit� vitesse activit� l'exercice l'objet quel tient taille �viter risques Jean Pourtant Allemagne parler propos quant signifie voie jouer pr�voit blanc noir parti logiciel continue Notre bois meilleure l'argent perspectives d�velopper celui-ci oeuvre structure suivre tiers prise professionnels raisons n�anmoins preuve social b�n�ficiaire couleurs mondial Cet maintenant essentiellement pr�vu Japon pr�visions centrale Alors international yeux PME l'a ait bonnes op�rations pied l'art pourraient Londres juge devra uniquement corps divers Parmi num�ro r�duire Tous texte tenu budget l'�tranger pression mes n'�tait style �conomiques Jacques montre population analystes processus placement classique dividende rester publics fortement plein wallonne DEM Express faudra travailler Cr�dit directement prime Flandre cr�dit monnaie pr�cise appel Autre travaux l'occasion juste Chaque put tableau terre permettent devenu rouge m�moire partenaires rapide travailleurs joue objectif salle parle musique milieu d'entreprise autorit�s chute r�gime d'autant liste op�ration bout performances �lectronique haute responsables lanc� voitures patron Malgr� affiche situe l'image �tudes Microsoft condition retrouve Aux revient Belgacom route Ensuite Luxembourg campagne comptes hors culture Commission d'entre possibilit�s semestre actifs finalement internationale l'achat mon�taire passage justice page tels poids celle-ci commercial entendu l'investisseur mondiale accord diverses totalement fil clair vin biens euro York parfaitement viennent division r�seaux principal lancer sup�rieur atteindre r�f�rence t�l�phone management vins proche collection fiscale Ceci informatique investissement volume mat�riel publicit� train coupon progression tenir protection l'aide couleur nouvel Lorsque change changement garantie somme Belge plaisir fils laisse importants priv� Ses besoins oeuvres am�ricains relations peau moteur augmentation suivi volont� beau bancaire laisser bureaux principalement int�ressant logiciels sommet l'activit� d'en vivre �lev�s Robert contrats oublier performance r�ponse d'exploitation concept obtenir poste attendre lignes consiste augment� vert figure mot d�velopp� l'histoire magasins collaboration r�pondre TVA holding livres convient fonctions fera pouvait million Paul britannique d'entreprises voix Grande-Bretagne disque affaire minutes quelle contexte limite mains commun r�duit Pourquoi particuliers verre wallon d'Etat allemand effets Chine meilleurs rend applications d'ici proc�dure l'op�ration devait profit m�thode pose commence id�e l'Internet d'eau cr�� nuit Nord capitaux options consommateur cartes soi m�tier probablement aller d'investissement facile International importantes Marc capitale devise prochaine transport Street demander utilisateurs l'affaire image l'id�e propri�taire facilement publiques croire disponible Louis d'or veulent Charleroi consommateurs devises difficult�s sort national machines annonc� choisi d�couvrir soutien avez perdre cuisine telles D'autres travaille ouvert phase certainement t�l�vision pratiquement annuel bord paiement Bank institutions seuls arrive constate marques nationale regard repr�sentent Belges �tat Qui libre rachat Toutefois portes sortir commandes permettant manager fiscal cin�ma histoire zone sauf avantages l'information voici dur effectivement puisse r�el The puissance fixe Belgium contact �poque rythme principaux vendu utilis� �tude Leur sensible Bref rencontre L'entreprise sp�cialistes brut mauvais n�erlandais suppl�mentaire mots reprises n�cessaires Non soir Prix machine penser parts comprend fusion acquis totale voyage logique l'�ch�ance concurrents id�es trouv� dette Sud r�ellement financement disponibles vieux lance marge dirigeants avis changer cons�quence sociales sup�rieure Certes faisant ordinateur partenaire warrant fabrication redressement suffisamment d�l�gu� pourront poursuit chemin emplois l'environnement r�alise FRF �volution Cour automobile Premier ancien note parties pension professionnel assure garder Rien Actuellement S'il l'administration Guy est-il IBM climat d'acheter SICAV d�partement sept partout immobilier lancement rating r�ussi patrimoine feu exp�rience Anvers anciens graphique Fortis faveur retrouver droite responsabilit� commande Kredietbank d'argent direct l'inflation n'avait utiliser tonnes l'origine connaissance achet� Ici am�ricaines clairement semblent biais futur neuf chance faillite �quipe mus�e compagnies documents pertes sortie m'a seraient d'autre choisir l'instant tellement industriel pr�compte d'Europe imm�diatement avantage qu'au constituent d�chets sport van demeure garde maisons Solvay cons�quences l'offre active d�penses donnent employ�s sites �lections d�tient n'importe obligation fruits v�hicule l'�gard Conseil investi mission profiter visite comprendre professionnelle affirme l'int�rieur Wall charges priv�e rares succession libert� rentabilit� suivant efficace assurer images agences impossible John enfant fournisseurs photo salaires Avant compter l'Est disposition formes b�n�ficiaires lesquels maintenir pr�cis�ment couple enregistr� recul offrir peur hauteur centres voulu industrielle positif Luc administrateur int�ressante commerciale interne pleine passant vision GSM faits retard certes l'air lundi Outre porter �crit cesse locaux d�lai trouvent classiques commenc� r�alis�e Alain vigueur gagner Celui-ci Philips ceux-ci favorable pouvoirs participations annonce g�n�ration �l�ment devenue touche conseils devoir mer souligne respectivement rapports vacances lieux naturellement d'y lorsqu'il statut USA ceci destin� d�faut objectifs r�cente saison d'art industriels Suisse cat�gorie complexe huit l'obligation fisc obtenu repris occupe s�rieux �mis Quelques comportement limit� vingt conjoncture gauche marche d'origine l'utilisateur ordre mobilier parcours perspective normes recours l'esprit Communaut� annuelle lecteur objets fabricant niveaux Entre r�alisation amateurs cons�quent pr�senter Celle-ci vise types d�tail mauvaise professeur progress� signe pass�e approche Reste return jardin l'espace flamand Namur bilan Vif sensiblement Trois utilise commune dimanche option partis analyse films surface warrants GBP prises secret historique journ�e l'ancien Pendant allemande d'assurance Andr� fille l'importance proposer avions augmenter parc Delhaize the Lors limit�e appareils villes au-dessus diminution prochaines servir Bernard commission faiblesse plus-value souhaite internationales producteur producteurs code belles cabinet fonctionnement g�rer mouvements pratiques r�gions dossiers meilleures Parce entr�e vendredi actif sociaux suppl�mentaires caf� message physique Soci�t� communes dizaine faute s�lection source facteurs milliers soleil tirer concernant Bourses fallait sentiment b�n�ficier d�bat l'Allemagne �lev�e ouvrage police pouvez attention a-t-il bel constructeurs contribuable moderne passion primes suit auquel d�passe sp�cialis�e bruxellois d�claration multiples quartier vid�o d�pend l'�cole liquidit�s correction comit� Web cherche filiales Sous sign� leader calcul gaz D'abord Rens artistes d�ficit cadres f�d�ral probable remboursement and efforts restaurant Toutes couverture domicile soins devront luxe complet danger indispensable syndicats comporte faite juridique langue rendez-vous d'informations demand� respect continuer l'organisation lesquelles local l'impression n'existe rare restructuration automatiquement plat boursier sol c'�tait cot�es d�cide L'action Cependant Certaines mat�riaux ordinateurs tradition progressivement capable classe familiale r�serve fonctionne solutions fabricants paie Finances l'�t� r�elle chang� masse unit�s consid�r� fer auront noms riche Patrick propos� salon territoire fix� magasin candidats marges asiatique inf�rieur r�action fleurs l'effet record tribunal recettes poursuivre dessous portant Aussi Sabena acteurs dehors constructeur l'auteur relation offrent spectaculaire LUF produire confort familles investir reprend sert montrer m�rite places Soit judiciaire textes quasi SNCB jeux permettra �tudiants membre photos positions sud Cockerill lendemain cent gagn� japonais l'absence mark pointe solide Voici anglais n'ai pr�sentent d�cisions l�gislation m�dias victimes �cran n�cessairement d�couverte l'assur� club environnement noter cr�e exportations n�gociations Jan r�pond BEL entier business peinture s'�tait voisins faibles location nord promotion technologies auraient caisse entend simples maladie menu chances commerciaux printemps Benelux poser Asie l'utilisation usage PIB actionnaire prennent r�sistance Dow surprise Etats mariage n�cessit� Puis cote Plusieurs beaut� exclusivement lettre pay� rendu s'ils software utile gestionnaires b�n�ficie proc�d� vaste crois normal Centre construire d�marche emprunts naissance D'autant d'information distance tourner Club attendant quantit� roi l'assureur tourne ajoute bancaires ajouter g�ant automatique faux attend litres pr�sent� argent confirme ind�pendants l'ordinateur �norme destin�s l'avantage v�hicules ressources standard auparavant construit Quelle principales quelqu'un disposer global �coles Quel r�putation fameux rappelle conseille heure veille difficult� l'�tat limites commerciales samedi palais vend vit Tractebel connaissent reprendre village emploi amis budg�taire croit mises souci contient habitants Weekend bras beaux bruxelloise faisait introduit int�rieur outils pr�cis chercheurs taxe salaire transactions Christian chambre port�e r�flexion C'�tait d'emploi hasard matin assureurs r�forme Beaucoup fournir recherches li�s tenue proposent aide ferme l'enfant l'or secondes CGER contenu quotidien flamande centaines course billet critique l'arriv�e naturel principale support week-end Dehaene Gand charg� �conomies Nos augmente guide proposition laiss� sp�cialiste francophones importance vent conception pr�f�rence spectacle avenir d'entr�e grave commencer d'ann�es diminuer chercher bonheur dizaines d'environ exactement outil sc�nario Jones coups �missions �ventuellement Royale l'agence soumis d'exercice lecture monter Grand central exigences assur� contacts consacr� l'attention d'administration due faut-il r�ussite �ch�ance recevoir tableaux arriver �vident art Italie am�lioration auteurs estim� quinze Russie demain pr�c�dent vendeur �v�nements autrement experts fortes furent possibles circonstances placer publication l'�cran r�serves sauce venu Charles collaborateurs implique l'assurance obligataire �tabli CD-Rom forc�ment l'essentiel l'enseignement remarquable vol Claude tourisme internationaux directe comp�tences conseiller facteur l'est plastique rarement Royal affich� lutte relative actuels envie l'�quipe ministres secr�taire capitalisation langage positive circulation convaincre notion visage vouloir ajout�e caract�ristiques Eric Union paix puisqu'il courrier disposent d�veloppe pr�sentation barre comparaison d�terminer firmes fournisseur informatiques luxembourgeois achats solde Serge globale propri�t� strat�gique Renault partage port� sources Kong cour destin�e absolument branche l'objectif ouvre plans productivit� R�sultat am�liorer d'obtenir jou� Parlement d�pit fichiers personnalit� constitu� gestionnaire profession qualit�s conscience m�decin celles-ci design d�cor faudrait participer appelle forces suisse appareil conduite D'une longueur tarifs v�rit� lien locales francophone clubs correspond coupons d'�mission estiment d�fi prot�ger r�alis�s d'emplois d'�viter l'ouverture m�thodes revenir superbe volontiers document nomm� tente financer scientifique Georges travaillent l'investissement li� zones aime lettres ouverte Hong L'ann�e murs philosophie rappeler utilis�s suivante d'ann�e repr�sentant traduit remettre situ� diff�rente longs �conomie discours distributeur domaines l'introduction r�gional faites italien restera usine Group l'informatique personnage portent attendu l'option Jean-Pierre articles changements fallu l�ger mener propri�taires sp�cifique r�cup�rer voyages proc�der locale m�decins priv�s transmission concurrent courte quart baisser pieds publi� Ford menace r�union transfert compos� dimension personnages ralentissement conclusion l'usage agents parfum r�mun�ration difficiles l'entr�e mettent pierre proches r�glementation salles grimp� prochains pr�vue �lectrique dynamique exposition install� plancher distributeurs d�clare connue n'avons pr�paration r�alis�es beurre op�rateurs achat province sp�cifiques Albert l'usine l'existence renforcer t�l�phonique comptable effectuer trafic degr� l'ont d�finitivement humain optique remarque talent appel� modifier d�finition peintre respecter stade statistiques certificats s'attend limiter livraison placements raconte volumes immobiliers Fax anciennes chevaux m�dicaments Peter feuilles football identique pouvons remise structures tenter accords cotisations indice neutre Mon constituer d'accord montrent plac� loyer proximit� voient �pouse Canada entrer postes pr�cision cit� concours patrons populaire p�trole n�gatif allemands d'activit� roman victime italienne m�nages repas PetroFina langues tendances D'autre pire prudence savent N�anmoins conduit mille r�novation �gard Am�ricains exercice l'�tude s'impose avance effectu� fortune fournit lecteurs Morgan d�couvert l'inverse diff�rent emploie bleu royal technologique t�l�communications Amsterdam fiscales indique information lourd signal Mieux aider ancienne apporte nette prestations publicitaires sensibles communaut� l'�mission lit volatilit� �tape assurance jusqu'en lanc�e r�soudre garanti modification revue sp�ciale www chacune l'analyse diff�rences messages priorit� recommandation r�cent charme dividendes Olivier passent finale immeubles logement pourcentage rire stabilit� difficilement d�fense l'ancienne magazine D'un eaux jeunesse l'intention continuent r�volution �tonnant organisation constater dos emprunt oui �ditions Daniel sel utilis�e compartiment publicitaire article bande capacit�s centrales consid�r�e milieux occasion quasiment pouvant Vermeulen-Raemdonck visiteurs chambres consid�rablement demi d�couvre essentiel broker dettes mardi reconnaissance salari�s formules grosse heureux perd radio allait multim�dia partiellement seules G�rard Oui Securities toucher jugement l'oeuvre consid�rer remplacer couvrir pr�cieux segment dessins espace indices refuse chefs exemples rejoint sp�cialis� l'amour l'exportation objet pr�c�dente rose versions d'�tudes destination Encore deviennent l'Italie personnelle plats vingtaine l'exp�rience virus Faut-il chasse longues Toute bases cot�e final monnaies travaill� apporter aspects disparu David Management port racheter relever Celui ING catalogue centaine chaleur profil repr�sentants conclu r�side scientifiques Chambre secondaire Fin serveur XIXe exige grimper immeuble l'Universit� montants paysage vendus ton assurances cat�gories dure d�cote soutenir �dition dangereux agr�able voulait combien d'application disparition optimiste plus-values tomber erreur l'augmentation situations sp�cialis�s subi suivent Jusqu'au classement l'exemple norme rentable sang socialiste tombe Justice attitude mines qu'aux li�e plantes vague General l'immobilier l�gumes Ceux-ci conflit excellent licence travailleur appris est-elle gagne mari pr�parer purement situ�e v�rifier Jean-Luc gain m�tal surfaces L'objectif d'�pargne douze expliquer lorsqu'on meubles yen chaussures cr��e institution l'accent solidarit� Maastricht bas�e journal soin sourire Guerre bouteilles flexibilit� maintient appartient moments rouges L'an bas� devons installations Bacob association d'obligations format City Page disques modem m�lange ordinaire vide chimique disent pharmaceutique d'assurances num�rique porteur r�partition blanche composants future parvient �voque Durant calme cru Electrabel culturel grosses baiss� lois moteurs principes trente �ventuelle Peu pr�voir tours Pentium acheteur dimensions fonctionnaires organis� rencontr� russe savoir-faire �tablissements F�d�ration Toujours cr�ativit� top application d�passer importe jaune l'application marqu� m�canique socialistes tranche Quelles envisage traiter Surtout acheteurs chinois claire l'Institut v�cu Objectif bail demandes diversification montr� renseignements souscription Tokyo entendre tests Siemens filles unit� Bekaert UCB composition rest� sinon agence fini modifications Cash industrielles obtient permanence restaurants r�els �change florins l'accord terrains �mergents atouts offrant LES bouche champ chaud l'annonce monte preneur pr�sents quitte tarif facture fiscaux modeste processeur Fund avenue comp�tition relev� tent� Est-ce Mus�e bijoux diff�rentiel d�clar� institutionnels l'employeur trait� Intel traditionnels victoire connus correctement pub Dominique Tant accessible rencontrer stocks Art esp�rer jouent men�e n�cessite provenant utilisent affichent d�lais inf�rieure sent sp�cial Am�rique acqu�rir album id�al l'�cart v�ritables associ� candidat connaissances l'�nergie signes cheveux conserve stress d'Anvers d'action directeurs donn�e endroit l'emprunt l'impact der traditionnelle Martin ciel convention obligataires prouver Espagne Petit Source dessin humaine l'huile lait Seule Thierry boursiers continent destin�es flamands n�erlandaise pensions commencent consid�rable nationales nul s'adresse conjoint cr�dits militaire morceaux privatisation repose sommeil traditionnel PSC Seul capables combat finances puissant s'agissait Bill Renseignements physiques Richard allant cr�ations toile �vidence convaincu excellente retraite th�orie transformer Tour transaction visant Deutsche Mons attentes cycle d�tails Votre h�ros l'artiste l'universit� s�rieusement uns Ceux consid�ration impose propositions Autrement cap forts l'Afrique usines Afin Quels ais�ment ressemble risquent totalit� imaginer originale int�gr� int�ressantes l'ext�rieur loyers auxquels circuit ind�pendant int�rieure jus maintien cotisation l'Asie moyennes quitter stable CVP Compaq galerie liens souffle GIB apprendre concert l'exception l'�chelle liquide nez noire temp�rature transparence �cole champion diminu� d�sir ressort voulons �quip� alimentaire den organisations pr�sidence raisonnable ratio recommande utilisant accepter accept� cache chocolat chut� comparer courts figurent passagers prison viande associ�s esprit froid jeudi li�es revu satisfaction satisfaire test tiennent vraie contrairement d�pass� ext�rieur qu'avec ami American Etat compl�mentaire d�clarations r�actions Fonds artiste conclure d�duction remis L'indice d�termin�e fiscalit� grand-chose humaines r�ponses �quipes ITL Michael Systems aspect commercialisation manger RTBF engag� oblig� proportion signature �tranger impos� s'applique silence vote Afrique Mobistar cible contemporain fondateur Jean-Claude communiquer d'investir existent majeure ouvrir �lectroniques JPY TGV comp�titivit� erreurs notation rang Apple accident certificat exceptionnel http proprement riches Barco Quoi violence adapt� b�n�ficient r�cession sentir armes arriv� crainte garanties l'automne m�nage officiellement ouvriers Autant discussion rejoindre �poux citoyens concern�s d'inflation d�finir L'id�e Paribas Telecom d'aller fabrique feront n�e oblige patients pensent responsabilit�s doubl� fraude l'article organise Henri conclut d�sire l'appareil l'association l'installation l�gislateur �crans choc gratuit mobile naturelle dialogue r�vision familial lourde poche d�cider n�gociation tort Maison Tr�sor constante cotation d�termin� l'instar managers opt� transformation Life anniversaire comp�tence g�ographique mandat r�serv� �tablir Business fins richesse CAD commente interm�diaire l'univers retrouv� sciences Sun banquier former mont� parfait veux Ren� investit l'oeil n'aurait parvenir vieille collections dirige fonctionner mauvaises tapis venus Contrairement Suez piste pistes tensions campagnes investis propos�s sac tabac bataille britanniques fine li�geois partenariat priv�es remplir sup�rieurs Beaux-Arts Christie's laser restauration Dutroux chimie rendent textile Brabant Colruyt James National Quatre pr�alable souvenir venue Communal avocat comparable consolid� critiques interdit l'initiative mine quotidienne rigueur r�duite tissu Invest pain participants proc�dures profondeur retrouvent rues taxation Mexique asiatiques conducteur demandent environs fermeture gris rumeurs accueille amoureux d'augmenter d�fendre l'immeuble pure souffre cr�neau d'�nergie journaux s'explique seuil Jeux Office auteur cash-flow fichier foi instruments quelles s�ance v�ritablement Yves attirer civil civile d'aujourd'hui eau l'�pargne station courbe hectares influence ing�nieurs tables vivent Exemple L'un blancs couche cuir devenus extraordinaire patient peux aient animaux associations d'utiliser foie initiative l'Am�rique poursuite survie Face apparemment consultant expansion l'exposition s�jour champagne commentaires complexes cylindres d�cennie rendements retenu sais sujets cuivre offert r�agir sec varie Fondation artistique communications mon�taires m�taux permanente positifs �lectriques basse concentration investisseur provoqu� doux stations coin modifi� avocats estimations original souplesse Attention Frank Hainaut Suite annuels cellule clause exemplaires malheureusement minute normale Fr�d�ric Sud-Est atout latine logements pilotes susceptibles Roger XVIIIe ordres remarquer actuelles bouteille constat opportunit�s pr�pare vendeurs accrue fruit jug� l'am�lioration loisirs pur trentaine bus gendarmerie air alimentaires cot� modernes pr�ciser r�ussir laissent parfaite sp�cialement �voluer Dewaay D�sormais Groupe maladies n�gligeable tension Lion chansons dite festival n�gative pr�f�r� restant Cera adopt� coop�ration distingue douceur retirer technologiques Editions Parfois bruit comptant d�mocratie exception mercredi offres sucre vedette �volue British Leurs compromis hauts �lev�es �mission Faire attendue d'appel jusqu'ici lourds quels soir�e �v�nement alternative chimiques conf�rence quitt� serveurs Br�sil CD-ROM correspondant l'avis locataire mat�riau p�riodes utilis�es d'embl�e l'aspect morale �quilibre Sony fixer gratuitement trait Trop adultes consacrer d'importance normalement parole prochainement suscite verra cl� mesurer notes potentiels relatives Flamands Francfort L'homme Palais Plan R�publique l'arm�e transports Portugal couvert joueurs Malheureusement coupe dispositions effort endroits aides contribution insiste s'inscrit souhaitent communal impact progresser Sambre administrateurs d'ordre deviendra d�gager formations l'ouvrage souscrire cellules facilit� gras militaires pass�s quinzaine souvient automobiles bref confortable essentielle officiel vive vols Marcel Top combinaison distinction d�finitive japonaise liaison tissus cadeau canadien distribu� existants ordinaires servi surveillance l'architecture l'a�roport m�decine n'aura n'�taient revoir r�centes voies L'obligation Rappelons comptabilit� fabriquer fasse int�ressants peintures quartiers valable �tapes b�n�fici� couvre diminue envers introduire missions s'attendre Petrofina apparition coffre digne fibres initiatives litt�rature rembourser retrait Bundesbank D'ailleurs Pascal Pologne consacre employeur favorables l'approche manquent assur�e battre chantier conclusions consulter craindre d'utilisation vivant Chacun internes apprend li�geoise observe provenance sortes Marie cess� c�der estim�e marchandises Poste balance copie cuisson n�gocier sp�ciaux traite Bruges hollandais peut-on porteurs r�gler soutenue suivie Stanley accueillir m�dical notori�t� provoquer sensibilit� vocation L'investisseur for impression l'ampleur s�duit conflits imposable journalistes manifeste provoque wallons �diteurs EUR canal fondamentale futurs graves men� mur pommes rachet� remonte solides suffisante charg�e chers discussions garantit indicateurs provient soutenu sportif syst�matiquement z�ro comptent recette r�cit subir �volu� Johan accorde faciliter hausses Macintosh Services d'imposition d�buts garantir portefeuilles susceptible universit�s Glaverbel Sotheby's actes brasserie caract�ristique cherchent favoriser justement prudent stock �chelle �norm�ment Standard compose couronne exceptionnelle flux j'�tais justifier r�fugi�s t�l�phoniques Monsieur Ville accepte inspir� l'ombre pollution situent allemandes boissons douce gouvernements intervention motifs primaire World entrepreneurs l'efficacit� repr�sentation Thomas apparaissent compl�mentaires cycliques franchement instrument rayon Food Roi conversion partager retenue simplicit� Comit� confirm� devaient exp�riences front jeter logistique reconnu Affaires Heureusement com�die historiques imposer l'actionnaire obligatoire recourir r�f�rences traces t�moigne GBL Java acte appliquer catastrophe conduire contribu� fais intervenir mettant pilote plafond remplacement tire Berlin Vincent portable profonde refus� repos b�ton ferm� juges parlementaires pr�vention Donc d'�lectricit� dispositif forment neige suffisant Louvain diffusion f�d�ration lentement prenant souris contenter douleur intervient j'avais look manoeuvre parquet pouss� arguments billets consacr�e dirigeant d�coration holdings justifie levier majeur midi recyclage robe Entre-temps appels directive initial int�ress�s pousser pouvaient secrets surpris univers d'avis poisson sp�cialis�es s�duire verser d'investissements g�n�rations nettoyage ouverts r�ductions v�lo Anne Compagnie Souvent d'Amsterdam explique-t-il l'abri l'int�gration officielle r�solution Service courses l'exploitation pari pousse revendre trace abonn�s craint croissant juger r�gionale symbole touristes Rome actives communautaire contraintes journaliste traditionnelles variable amour atelier budgets budg�taires clef d'ores d�triment nationaux paquet relatif Francis Rupo d'enfants diesel gare l'acquisition parlent rapporte regarder �ventuel Clabecq carr�s psychologique rupture t�l�phonie Air Danemark Sauf citoyen four permettrait puissent rapides Marketing Tendances dit-il d�veloppements enregistre envoy� interm�diaires l'issue liquidit� r�agi Allemands L'autre Louise connues consolidation cr�ateur id�ale l'espoir profit� pr�vus r�sulte similaire Boeing Didier Dieu Willy agir coins constat� d'eux danse occidentale optimistes pens�e professionnelles Computer San Tournai appliqu�e chanson d�roule franchir liquidation morts nouveaut� prestigieux suppression Laurent Mercedes existantes pleinement simultan�ment �tablissement cercle corruption discipline familiales l'avant laboratoire livrer mont�e participe Personne adresse finance g�nie leasing versement bits concern�es dents inclus maximale pr�c�demment routes variations �quipements Declerck chemins constitu�e d'effectuer globalement libres proposant souligner Bon ambitions croissante d�cennies fou l'influence litt�ralement motivation rubrique souvenirs surprises vendue Celles-ci b�b� plainte stockage �crire �nergie Spector annonceurs d'olive d�bats ferait grain sont-ils s�paration tournant vendues Compte Cools Volvo accessoires constitution consultants dommages occup� s'appelle �changes Seconde adresses efficacit� fix�e frappe l'apparition monopole panneaux rest�e sentiments termin� utiles Bruno Seuls appliqu� donnant fondamentaux fr�quemment l'aventure m�tiers planche royale suppose Inc Moins fourni japonaises pay�s profond programmation r�solument L'Europe d'amour d'ouvrir golf poudre propos�es �toiles PRL attach� concevoir dommage l'opinion main-d'oeuvre r�cents strat�giques vitesses Peugeot Philip appr�ci� connexion hommage jardins remonter suppl�ment Canal Tessenderlo cheval entretien inutile l'Espagne laissant m�canisme nouveaut�s plac�s repli r�gionales r�gionaux souple symbolique troubles �valuer Aucun Mac R�gions cession confie moyennant num�ros portrait �tablie cinquantaine d'assurer peuple promis retenir r�ception sexe utilisation visiblement acteur cr�ateurs dites d�poser expositions handicap lourdes plastiques procure proviennent sous-jacente Quick Virgin auxquelles banquiers baptis� finit venait volant Fiat Joseph Lyonnais enseignants geste l'UCL s�rieuse Mignon Royaume-Uni Vers classes doigts encadr� froide niche pr�vision servent Baudouin Nicolas Smeets arriv�e domestique envisager espaces filet inflation pos� promouvoir roues Assurances Capital immense incontestablement lot pharmacie restructurations sportive L'ensemble ci-dessus d'activit�s engagements humains introduction organis�e Delvaux assiste couverts franchise L'histoire annuellement arrivent causes pierres valent volet Hanart Karel Lotus intention l'acheteur manifestement prendra profond�ment relance suivantes suspension commissions divisions d�velopp�e employ� fourchette qu'est s'occupe vendent Clinton Jean-Marie Maurice Nationale compenser d'octobre essayer fond� formidable graphiques professeurs tester George Histoire boutique cam�ra d'avance fond�e heureusement label montagne pensons plate-forme temporaire tomb� tribunaux �vite BMW Monde condamn� culturelle d'air entre-temps entr�es installer perception sauver th� Ferm� Peut-on Unilever accompagn� externe franchi jadis manifestation miracle moral refus r�unit r�v�ler s'installe Etienne Evidemment bateau conseill� d'�cart d�crit fr�quence l'occurrence s'adresser taxes Company concentrer consultation dor�navant dynamisme install�e profite r�unions amateur avoirs calcul� d'atteindre estimation exerce bloc circuits couper courante d'am�liorer d'instruction effectu�s fameuse int�ress� montage pr�vues subsides s�duction trait�s trouvera �quip�s Aucune ing�nieur r�clame r�mun�rations tentent tournent �gale �metteurs Prenons agent attentif d'aide d'oeil existant fluctuations gr� l'administrateur m�dicament partiel permanent s'installer situ�s sportifs vertu Intranet L'�volution Quelque allons appartements duquel kilos sicav toit vers�es chauss�e d'huile futures individuelle manifestations raisonnement sports Christophe DES absolue appel�e contente d'id�es d'investisseurs intense money r�pondent tranches Waterloo assurent calculer choisit citer dot� fixes inf�rieurs mensuel promoteurs relais sorti t�l� voisin Cor�e Lynch dit-on hiver l'Association l'ULB naturelles preuves pr�sent�s souffert Qu'est-ce attendent camions camp contenant curieux d�tente effectue g�ants l'endroit l'interm�diaire l�gale n'�tant prestation publi�s rente r�alisent ski soigneusement vif Cie conviction doubler morceau racines tenant universitaires visiter Center Global d�marrage entam� fondamental l'intervention magique procurer records universitaire vrais L'une ateliers avion confront� contribuables doigt drame f�minin habitudes l'imm�diat lutter p�trolier sup�rieures vois AEX Bell afficher confirmer conserv� d'offrir d�tour fusions l'avons l'�quilibre lever malades ouvrages paradis prouve pr�voient remplac� sp�culation Rwanda concernent d�partements d�riv�s identiques marqu�e n'avaient prince produisent r�sidence voulez L'op�ration Turquie allocations d�montrer enregistr�e individuelles oubli� parking propos�e Commerce Guide Tom comprenant d�but� engagement fit l�gal particip� pass�es pr�sentant pr�sentes quantit�s �chapper Maystadt Software acquisitions affirment alentours assureur autonomie canaux inverse l'adresse l'automobile modes signaler sign�e Goldman Notons cancer carnet convergence foule indispensables int�gr�e nucl�aire op�rateur paiements palette pence priori promesses tentative Belgian Corporation Dutch Tel a�rienne boutiques craignent d�biteur entit�s ouverture procureur puisqu'elle sommets supporter traitements voyageurs Bureau anglaise argument d'�tablir imagin� l'appui m�canismes personnelles privil�gi� satisfait science terrasse tir� tr�sorerie t�l�coms D'ici chaude coup� esth�tique inscrit poissons refuser s'effectue tennis Moi Unix appartement clavier d�montre organismes pressions regroupe secours sous-traitance th�orique accessibles courants d'�t� judiciaires l'innovation l'op�rateur pr�c�dentes r�aliste aventure d'Internet effectifs gains l'opposition l'unit� mus�es rock Coupe Netscape bain d�pos� espoirs majoritaire semblait Digital accorder attire d'�change feuille initiale installation krach malade op�rationnel pauvres pont pr�server publier rechercher recrutement repr�senter r�v�l� sanctions traditionnellement vapeur Cobepa Salon confier consid�r�s cultures hypoth�caire illustre introduite l'�chec menus multinationales paient pareil probl�matique quarantaine rentr�e soutient termin�e voudrait carr� exemplaire lorsqu'ils nulle posent pratiquer sida versements visites �tions �trange CBR berline cash distinguer durs d�fend efficaces essence exclu jolie photographe propri�t�s veau Journal Nobel Vieux atteinte chapitre concertation d�gage ext�rieurs m�dicale pareille patience recueillis substance transforme voile �chec L�opold enthousiasme f�d�rale gloire pr�parations transmettre visiteur Ajouter Brederode Europ�ens Jean-Louis Tony apport� d'importantes l'acier lib�ralisation observateurs panique pr�sent�e r�server signer tendre touristique R�cemment brillant conventions d�cret g�n�reux industries joie stars �gal Sachs continu� dessert espagnol est-ce l�gende passera rapprochement salariale scolaire Mon�taire assur�ment contraint coton curiosit� entit� entr� l'architecte lib�raux logo parlementaire parviennent portables provisoirement routier r�serv�e tourn� veiller Hoogovens XVIIe arbres communs employeurs exercices faisons l'alimentation magazines maintenu roses r�pondu sp�cialit� Citibank Moscou Times accidents adapter amen� avoue collectif d'�valuation dessus ind�pendante l'institution l'�tablissement peintres rappel r�alisations s'av�rer architectes comprise essentielles examen fid�lit� h�ritiers l'actualit� pr�f�rable relancer s'adapter s'engage sable semestriels significative suisses Grande Nouveau cadeaux comportements constamment contribuer d'images offerts p�riph�rie varient Michelin caisses conscient c�d� effectu�es faisaient personnalit�s s'engager syndicat Arbed OPA abandonn� cents destin drogue fines identit� invit�s l'�v�nement modalit�s n�gatifs paru r�pertoire s'int�resse Disney Isabelle Japonais Roland William annonc�e champignons d�fis g�n�rer russes situer supprimer �lu Jean-Paul Spa accord� acquise courtier d'attente foul�e noirs r�sister section signaux sombre susciter compartiments correspondance cr�ances discret d�passent florin form� frapp� papiers repr�sentait saurait vers� absence d'Or d'acqu�rir d'avenir degr�s envoyer joli occupent on-line perc�e priorit�s processeurs rest�s r�sume soie travaillant �conomistes Etant affirmer ambitieux cerveau consensus coordination d'options l'appel magistrats qualifi� rangs tourn�e Alcatel Toyota anonyme cassation cf (usually cf.) confusion discr�tion fondamentalement initialement install�s l'assembl�e l'entretien l'�metteur maman nuances paraissent parfums saine vedettes Nikkei dirig�e duo enseigne indiqu� lourdement module prononcer r�alisateur r�formes star �quivalent Danone Site adopter commis couches explication joint-venture malaise pantalon pomme reine sacs saumon soeur toiles �ch�ant Agusta bond courir expert glace l'enseigne multiplier pluie salons teint European Finalement Maintenant adapt�e diriger g�rant r�partis saveurs souscrit substances vieilles vraisemblablement �labor� �mettre certitude champions cot�s cyclique d�tenteurs explications fonctionnent g�n�rales invite l'expression pauvre successeur zinc Big Claes Six brochure cave codes configuration d'enregistrement fragile f�minine issus magnifique maintenance manuel qu'a recommand� spectaculaires subit traduction �vidente Cons�quence Fabrim�tal KBC adapt�s chronique d'IBM enregistr�s fibre jazz jusque louer m�diatique peser rentables r�ussit s'�levait saisir semble-t-il visible Financial Singapour absolu blanches boulevard commissaire comprennent cr�ent facult� histoires individus issue multiplient pr�texte quotidiens r�fl�chir satellites souffrent standards Washington commercialise directs diversit� gratuite l'Office logiquement ouvertes renoncer calculs compl�ter couples d'entrer d'esprit d'importants l'acte organiser payant paysages r�cup�ration slogan Electric PVC administratives arts avanc� carr�ment changes cr�dibilit� d�placement l'avance parvenu relatifs revues veste Celle FGTB Moody's assur�s cr��s d'�l�ments imm�diat jambes litre mousse prestige sentent souhait touch� �lus Belle Telinfo abrite consid�rables d'urgence disait faillites oeil religieux r�daction s�ries terres vice-pr�sident MHz System XXe cure dirig� don enregistrer juridiques pouce pr�cises pr�tend r�unis salade trouvait �valuation Cinq Fort confi� cuire indicateur l'avait origines parl� remet sp�ciales terrible t�moignent �tonnante Buffett Catherine Research SAP V�ronique achet�e g�n�raux impos�e l'organisme l'�dition mention merveille opposition r�organisation satellite scanner Milan Notamment a-t-elle acier conteste cr�anciers d'acier int�gr�s l'habitude multiplication panier pharmaceutiques quelconque rayons spectateurs transform� troupes Madame Tandis effectu�e fromage g�r� interlocuteur l�gislatives motif m�talliques plac�e r�clamation sch�ma surplus transition trio Coca-Cola Motors Proximus Wallons atteignent bleus chair conforme costume d'accueil intentions l'horizon l'�lectricit� manqu� sortent subsiste supermarch�s D'Ieteren Europ�enne Lorsqu'on am�lior� avantageux d'applications engag�e espoir exceptions fausse l'expansion l'�quivalent plage plaide poivre CHF Livres cadastral chips comptait craintes d'ordinateurs durable d�mocratique exceptionnels factures fonctionnaire fondation ind�pendance invent� issu maturit� mobilit� musiciens organisme recommandations sp�culatif suscit� titulaire traverse �volutions Fed calendrier collective disposant d�valuation l'honneur pauvret� poursuivi qualifier savait su�dois termine traduire valait CSC Forges Hugo Max VVPR appartiennent confront�s demeurent divorce dramatique d�ductibles efficacement existence fermet� imagine int�grer larges locataires orient� pens� vari�t� administrations a�riennes complexit� entrent exercer photographie sauvage terminer venant Corp amortissements champs d�placer d�sign� d�terminant opportunit� piano remont�e s'agisse �troite Difficile Dix Recticel bar concern� constructions l'identit� merveilleux min moindres r�unir survivre ultime �tudi� Lambert caract�rise choisie distribuer d�cid�ment limit�s livr� luxembourgeoise modules progresse promet redresser tomb�e bains d'hommes dessine enfance finition jury mythe optimale pair plateau pouss�e resteront Zaventem assurance-vie compos�e d'entretien d�cident h�las instant jet laine mobiles parcs pr�occupations ramener repr�sent� soudain �diteur Jos� L'auteur Morris Nasdaq administrative autorise banking humour jouit l'actuel market n'ait organisateurs peint s'annonce s'assurer sculptures superbes �quip�e ASBL CMB Gates bronze catholique citron contributions couture disquette d�marrer excellence fatigue imprimantes industrie l'am�nagement l'effort l'encontre laboratoires men�es meuble mondiaux r�duits sont-elles sous-traitants talents Christine Henry administratif administration ailes a�rien carrosserie d'�conomie d�couvertes exclure hautes hi�rarchie impressionnant massivement m�tro possession remport� strictement su�doise utilisateur vais �mises �tage d'arbitrage devez expliquent file hebdomadaire int�resse l'hiver l'�laboration marbre performant personnels pr�venir suivants verte viendra Angleterre Association Hongrie L'affaire Louvain-la-Neuve apportent automne bourgmestre branches carton contraste courage d'analyse datant d�pendra feux importations plantations sid�rurgie signale FMI Jean-Michel L�on Super Venise adaptation allure attach�s exploite folie instance naturels olympique populaires reprenant valorisation villa villages Est-il Renaissance Shell Vienne architecture authentique autonome complicit� d'au d'ouverture d�pendance d�pense fiable invention lanc�s partagent rencontres renouvellement �voluent Akzo Combien March� Xavier ampleur analyses bandes canard collectionneurs compliqu� culturelles d'avril donnera d�placements fermer jug�e l'aise m�daille notaire peut-il privil�gier prototype regain regarde wallonnes Emile Volkswagen accru caoutchouc cinquante communautaires conjoncturel cr�ant durer d�licat exigent pr�c�dents renforce s'ouvre �valu� Lille d�bute d�finitif engag�s exploiter fur positives r�paration soupe transferts Ostende Propos Victor limit�es nourriture offertes ramen� recul� rem�dier similaires triste �carts Data Industries abaiss� boire break chien consacr�s cours-b�n�fice fuite gigantesque imprimante l'Ouest l'emballage l'�glise remplace salariaux spectacles vache velours �tudie ABN Auparavant Cit� Continent Guido Meuse Question d'exemple dot�e d�fini d�finit d�licate d�mission ext�rieure interventions jouant l'engagement n'ayant noires oblig�s Bruxellois Mark Motorola acc�der affichait chemise espagnole fleur gard� habitation huile l'accueil l�gales multipli� revers architecte assister axes concerts contemporains discuter dose d�tiennent folle l'�diteur magie pompe provisions rapidit� t�moignages Cap Festival Finlande NDLR contribue demandeurs d�monstration exact num�riques participent poign�e puissants sp�cialit�s G-Banque III Livre Peeters SICAFI Technology applique copies flacon lunettes mixte nullement plante provisoire publie puissante regrette s'ajoute strat�gies typique vocale Anhyp Brothers brokers concentre diagnostic faciles gestes guise hardware op�rer orient�e passionn� refusent sc�narios suffisent vagues �cart Chrysler S�nat Via ambiance appartenant assist� attrayant bagages blocs d'essai d'histoire d'�tude d�duire forfait manquer restait surprenant s�r�nit� vertus �couter DKK Dirk Gevaert Sant� Wim accueilli affich�s affronter appeler coloris composent contiennent contrepartie fondamentales impressionnante largeur peaux proportions reconversion revente significatif �crite �normes J'aime Network aiment cherch� chinoise d�charge d�put� essais indiquent infrastructures jouets musicale mutation obstacle partant perdent �tudiant J'avais Sinon accord�e adjoint d�barrasser d�bit d�gustation d�jeuner glisse individu l'�ducation l'�lectronique organis�es produite pr�tendre quotidiennement s'�tend secondaires soucieux sous-�valuation verts �cologique �met Hollywood Legrand Lorsqu'il Pro am�lior�e bat e-mail excessive favorise joueur l'OCDE marks office phrase promenade prometteur stimuler s�ances tiendra valoir Martine Qu�bec acquisition augmentent baisses distribue dus massif m�diocre obtenus rentrer sales semblable transmis Julie Place ZAR bouquet ceinture coalition comptables corporate d'actifs d'attendre diff�remment dits italiens journ�es l'assurance-vie linguistique marchands n'avoir opinion originales registre requis synergies tunnel vogue Malaisie charbon emballages esprits examiner fl�chi l'outil librement mentalit� miroir occidentaux parit� progressive sensation sonore supports synonyme vinaigre D�but Euro Hollandais alliance barres charg�s d'habitants dois fier gouverneur l'atelier l'humour n'avez origine pay�e p�troliers signal� variation Point XVIe aliments cam�ras comportant consultance contemporaine d�clin effectif invit� j'en l'actif licenciement match mill�naire salari� studio tenus triple �quipement �toile Bob Californie Devant Smet abonnement baptis�e commerces creux facilite flamandes jurisprudence l'ai l'attitude noyau portraits prononc� publications puce qu'aujourd'hui sinistre terminal Dexia Mes augmentations batterie cin�aste compare guides inconv�nients instances l'avion retourner sympathique �valu�e L'Etat achetant bailleur bonus colonne compensation conseillers continu courbes d�clarer enregistr�es g�n�r� innovations ira jusqu'aux lente occuper pes� pot quarts �preuve Bois Congo Courtrai Powerfin admet attribuer championnat cit�s comble conqu�rir d'encre d'oeuvres d'office devenues excessif incertitudes intitul� l'�valuation p�riph�riques r�clamer r�elles s'�taient Ecolo Nivelles Qu'il Travail allures camps dues exclus grandeur homard illustr� in�vitable in�vitablement l'�quipement mari�s mod�ration ont-ils positivement profits quarante sculpture spots stage universelle vainqueur �dit� �tendue Arts Communications Media Novell Poor's St�phane Word changent communiqu� conversation d'artistes effective interlocuteurs l'Administration l'ambiance n'aime patronales permettront pneus qualifi�s religion souffrir �voqu� Chirac Chris Forest Herman Hubert Opel Parti SEK Terre Vie alternatives anversoise bateaux battu brillante d'introduire d�sert entrepreneur essay� interface int�gralement j'aime modifie personnellement syst�matique Arthur Park admis blocage calls d�veloppent individuel l'ONU l'appr�ciation modestes multinationale out parlant porcelaine p�n�trer respecte soupapes sp�culateurs �tudier Nestl� abus combler conservation donation fiabilit� l'exclusion m'ont parcourir parisien remarquables retournement returns EASDAQ Kodak PDG collecte d'alcool d�ception d�t�rioration l'avoir l'�change lorsqu'elle palme phases privatisations r�p�ter s'imposer valu voulais Almanij Infos Procter Smith Tubize actuariel australien croient d'intervention d'objets encourager fiscalement hautement l'assiette marchand n�erlandaises plaintes reproche retient sillage soldats t�moins urbain FEB L'�conomie adopte boutons chuter conjoints convaincus coop�rative correspondent director n'h�site niches savez stables tend vain Gamble L'art Quinze Servais Seules apport chauffage commercialiser d'attirer d'existence d'organisation dangers foyer ingr�dients n�gocie r�volutionnaire score sid�rurgique techniciens voyageur Brown Corluy Herstal Horta L'avenir attir� com conf�rences constatation d'Am�rique douzaine duration d�tenir indemnit�s lion nuits plomb soumise sportives verres attribu� corriger d'hiver domestiques faille foot home indemnit� romantique simulation Brussels L'avantage Swissair autrefois choisis communales d'Angleterre dessin�e disponibilit� d�tenu engager exceptionnelles figurer habitant hollandaise imm�diate int�gration m�dia �lecteurs Amro DOS Moniteur Parc acceptable appr�cier centre-ville d'elle envisag� fantaisie habituellement poss�der pourrez tentatives touches visibilit� Creyf's Heineken R�gie Sterk Tch�quie analyser autoris� complets contrainte costumes d'agir doucement";

	// 10K worst passwors list
	// source: https://xato.net/passwords/more-top-worst-passwords/
	var worstPassswordsdict="password 123456 12345678 1234 qwerty 12345 dragon pussy baseball football letmein monkey 696969";
	


	var translations = {
	  en:  { test_str: "test(en)"
				, passwordSize: "password size"
				, charsets: "character types"
				, alphaLower: "alphabet lowercase"
				, alphaUpper: "alphabet uppercase"
				, numeric: "numeric"
				, punctuation: "punctuation"
				, special: "special"
				, accented: "accented"
				, accentedUppercase: "accentedUppercase"
				, accentedSpecial: "accentedSpecial"			
				, characterVariety: "character variety"
				, sequences: "character sequences"
				, keyboard: "character keyboard sequences"
				, dictionary: "dictionary"
				, globalRatingComment: "Aggregate from all individual ratings (size is first criteria)"
				, rd_allwords_l: " (all words: "
				, rd_allwords_r: ")"
				, rd_allwords_hazard: "Hazardous, found word in "
				, rd_allwords_weak: "Weak, found word in "
				, rd_allwords_dic: " dictionary: "
				, rd_allwords_q: "Questionable, found word in "
				, rd_allwords_a: "Average, found word in "
				, rd_allwords_g: "Good, found word in "
				, rd_allwords_e1: "Excellent, even if found word in "
				, rd_allwords_e2: "Excellent, no significant word found from dictionary compared to password size"
				, rateUnsafe: "Unsafe"
				, rateWeak: "Weak"
				, rateMedium: "Medium"
				, rateGood: "Good"
				, rateSecure: "Secure"
				, rateHazardous: "Hazardous"
				, rs_wts: "Password is far too short: "
				, rs_ts: "Password is too short: "
				, rs_q: "Password length is questionable: "
				, rs_g: "Password length is pretty good: "
				, rs_a: "Password length is awesome... Is is easy to remember?: "
				, rs_i: "Password length is insane!!: "
				, rseq_perfect: "Perfect: No (or very few) sequences found"
				, rseq_average: "Average amount of sequences found: "
				, rseq_impactive: "Impactive amount of sequences found: "
				, rseq_toomany: "Too many / long sequences found: "
				, rseq_allsequences: "Your password is all sequences: "
		   }
	, fr:  { test_str: "test(fr)"
				, passwordSize:   "Longueur de mot de passe"
				, charsets:   "Types de caract�res"
				, alphaLower:   "alphabet minuscule"
				, alphaUpper:   "alphabet majuscule"
				, numeric:   "num�rique"
				, punctuation:   "ponctuation"
				, special:   "caract�res sp�ciaux"
				, accented:   "caract�res accentu�s"
				, accentedUppercase:   "caract�res accentu�s majuscule"
				, accentedSpecial:   "caract�res accentu�s/sp�ciaux"			
				, characterVariety:   "vari�t�"
				, sequences:   "s�quences"
				, keyboard:   "s�quences clavier"
				, dictionary:   "dictionnaire"
				, globalRatingComment:   "Aggr�gation des crit�res individuels (la taille compte plus)"
				, rd_allwords_l:   " (tous les mots: "
				, rd_allwords_r:    ")"
				, rd_allwords_hazard:    "Dangereux, mot trouv� "
				, rd_allwords_weak:    "Faible, mot trouv� "
				, rd_allwords_dic:    " dictionnaire: "
				, rd_allwords_q:    "M�diocre, mot trouv� "
				, rd_allwords_a:    "Moyen, mot trouv� "
				, rd_allwords_g:    "Bon, mot trouv� "
				, rd_allwords_e1:    "Excellent, malgr� mot trouv� "
				, rd_allwords_e2:    "Excellent, pas ou peu de mots du dictionnaire compar� � la taille du mot de passe "
		   }
	};

	var defaultText=translations.en;
	var selectedLanguage=defaultText;

	this.setCharacterRepetitionAllowed=function( allowRepetition ){
		allowCharacterRepetition=allowRepetition;
	}
	
    	this._gettext = function ( key )
		{
		  return gettext(key);
		}
		
		/**
		 * Translation function
		 * @param {key} the localized string key
		 * @type {string} the localized string
		 */
		gettext = function ( key )
		{
		  return selectedLanguage[ key ] || defaultText[ key ] || "{translation key not found: " + key + "}";
		}

		/**
		 * Set language to the selected key (e.g. fr, en), or to default
		 * @param {lang} the Language key
		 */
		this.setLanguage = function ( lang )
		{
		  if ( typeof translations[lang] !== 'undefined') {
			selectedLanguage=translations[lang];
		  }else{
			selectedLanguage=defaultText;
		  }
		  return this;
		}


		/**
		 * Retrieve all details from latest password rating
		 * @type {object} The password rating details object
		 */
		this.getLastRatingDetails = function (){
			return ratings;
		}
		/**
		 * Unloads a dictionary in the dictionaries set
		 * @param {string} name The name of the removed words list
		 * @type {object} The new dictionaries set
		 */
		this.unloadDictionary = function ( name ){
			delete dict[name];
			delete dictKeys[name];
			return this;
		}


		/**
		 * Selects the type of  password generator
		 * @type {boolean} Enables generator for password easier to remember if true, or all random is false
		 */
		this.setEasyPasswordRequested = function ( trueOrFalse ){
			easyPasswordRequested=trueOrFalse;
			return this;
		}
		/**
		 * Selects the type of easy password generator for
		 * @type {boolean} Enables dictionaries if true, or disables them
		 */
		this.useDictionaryForEasyPasswordRequested = function ( trueOrFalse ){
			easyPasswordUsingDictionary=trueOrFalse;
			return this;
		}

		/**
		 * Unloads any dictionary in the dictionaries set
		 * @type {object} The new dictionaries set
		 */
		this.unloadAllDictionaries = function (  ){
			dict = {};
			dictKeys={};
			return dict;
		}


		/**
		 * Loads a dictionary in the dictionaries set
		 * @param {string} dictionary The string to look into
		 * @param {string} name The name of the added words list
		 * @type {object} The new dictionaries set
		 */
		this.loadDictionary = function ( dictionary, name ){
			dict[ name ]={};
			// Get an array of all the words
			var words = dictionary.split( " " );
		 
			// And add them as properties to the dictionary lookup
			// This will allow for fast lookups later
			for ( var i = 0; i < words.length; i++ ) {
				dict[ name ][ words[i] ] = true;		
			}
			
			dictKeys[ name ] = Object.keys(dict[ name ]);
			return dict;
		}


		/**
		 * Loads a password dictionary in the relevant dictionaries set
		 * @param {string} dictionary The string to look into
		 * @param {string} name The name of the added words list
		 * @type {object} The new dictionaries set
		 */
		this.loadPasswdDictionary = function ( dictionary, name ){
			passwddict[ name ]={};
			// Get an array of all the words
			var words = dictionary.split( " " );
		 
			// And add them as properties to the dictionary lookup
			// This will allow for fast lookups later
			for ( var i = 0; i < words.length; i++ ) {
				passwddict[ name ][ words[i] ] = true;		
			}
			
			passwddictKeys[ name ] = Object.keys(passwddict[ name ]);
			return passwddict;
		}
		
		/**
		 * Unloads a password dictionary in the dictionaries set
		 * @param {string} name The name of the removed words list
		 * @type {object} The new dictionaries set
		 */
		this.unloadPasswdDictionary = function ( name ){
			delete passwddict[name];
			delete passwddictKeys[name];
			return this;
		}
		
		/**
		 * Unloads any password dictionary in the dictionaries set
		 * @type {object} The new dictionaries set
		 */
		this.unloadAllPasswdDictionaries = function (  ){
			passwddict = {};
			passwddictKeys={};
			return passwddict;
		}


		this._findWord = function ( letters, dict ) {
			return findWord( letters, dict );
		}
		/**
		 * Takes in an array of letters and finds the longest possible word at the front of the letters
		 * Courtesy from John Resig @ http://ejohn.org/blog/dictionary-lookups-in-javascript/
		 * @param {string} letters The string to look into
		 * @param {object} dict The dictionary set to use for lookup
		 * @type {object} object containing the longest word and the name of matching dictionary
		 */
		findWord = function ( letters, dict ) {
			
			// Clone the array for manipulation
			var curLetters = letters.slice( 0 ), word = "";
			
			
				
			// Make sure the word is at least 3 letters long	
			while ( curLetters.length > 2 ) {
				// Get a word out of the existing letters
				curLetters=Array.prototype.slice.call(curLetters);
				word = curLetters.join("");
				
				for(var dictName in dict){			
					// And see if it's in the dictionary
					if ( dict[ dictName ][ word ] ) {
						// If it is, return that word
						return {word: word,dictionary: dictName};
					}
				}
		 
				// Otherwise remove another letter from the end
				curLetters.pop();
			}
					
			return {word:"",dictionary:""};
		}

		/**
		 * Generates a password supposed to be easier to remember (recursive)
		 * @param {string} allowedCharset Allowed characters
		 * @param {number} length maximal allowed length
		 * @param {string} password the current password ('cause this is recursive)
		 * @param {string} previous last type done ('cause this is recursive)
		 * @type {string} the generated password
		 */
		easierToRememberPassword = function ( allowedCharset, length, password, previous ){	
			// if we're done return the generated password
			if( password.length >= length) return password;
			
			// make a word or a number of an arbitrary length (or remaining characters number)
			// alphabetic words may be longer than numbers
			var passwordAddon="";
			var lastItem;
			var remainingSize = length-password.length;
			
			var addonMaxSize=remainingSize ;
			var addonLength;
			if ( previous === "word" ){
				if( addonMaxSize > 6 ) addonMaxSize = 6;
				// improve chances for a year
				if( addonMaxSize > 3 ) addonLength=4;
				if( Math.random() > .6 ) addonLength = Math.ceil( Math.random() * addonMaxSize);
				
				
				//  check if allowed charset contains numbers before adding any
				if( allowedCharset.indexOf(classifiedCharsets["numeric"]) != -1 )
					passwordAddon=easierToRememberPasswordNumber(allowedCharset, addonLength );
				lastItem="number";
			} else{
				if( addonMaxSize > 8 ) addonMaxSize = 8;
				var addonLength = Math.ceil( Math.random() * addonMaxSize);
				// word
				passwordAddon=easierToRememberPasswordWord( allowedCharset, addonLength );
				lastItem="word";
			}
				
			
			// Maybe pick a separator, or an open-close group
			passwordAddon=addSeparatorOrOpenCloseOrNothing( allowedCharset, length, passwordAddon );
				
			// append or prepend to previous password
			var newPassword=appendOrPrepend(password,passwordAddon );
			
			// recursive call, do this amn arbitrary number of times until length is Ok		
			return easierToRememberPassword(allowedCharset, length, newPassword, lastItem )
		}

		/**
		 * Generates a password supposed to be easier to remember (recursive)
		 * @param {string} allowedCharset Allowed characters
		 * @param {number} length maximal allowed length
		 * @param {string} password the current password ('cause this is recursive)
		 * @param {string} previous last type done ('cause this is recursive)
		 * @type {string} the generated password
		 */
		easierToRememberPasswordUsingDictionaries = function ( allowedCharset, length, password, previous ){	
			// if we're done return the generated password
			if( password.length >= length) return password;
			
			// make a word or a number of an arbitrary length (or remaining characters number)
			// alphabetic words may be longer than numbers
			var passwordAddon="";
			var lastItem;
			var remainingSize = length-password.length;
			
			var addonMaxSize=remainingSize ;
			var addonLength;
			if ( previous === "word" ){
				if( addonMaxSize > 6 ) addonMaxSize = 6;
				// improve chances for a year
				if( addonMaxSize > 3 ) addonLength=4;
				if( Math.random() > .6 ) addonLength = Math.ceil( Math.random() * addonMaxSize);
				
				
				//  check if allowed charset contains numbers before adding any
				if( allowedCharset.indexOf(classifiedCharsets["numeric"]) != -1 )
					passwordAddon=easierToRememberPasswordNumber(allowedCharset, addonLength );
				lastItem="number";
			} else{
				if( addonMaxSize > length/2 ) addonMaxSize = length/2;
				// word
				passwordAddon=easierToRememberPasswordWordFromDictionary( allowedCharset, addonMaxSize );
				lastItem="word";
			}
				
			
			// Maybe pick a separator, or an open-close group
			passwordAddon=addSeparatorOrOpenCloseOrNothing( allowedCharset, length, passwordAddon );
				
			// append or prepend to previous password
			var newPassword=appendOrPrepend(password,passwordAddon );
			
			// recursive call, do this amn arbitrary number of times until length is Ok		
			return easierToRememberPasswordUsingDictionaries(allowedCharset, length, newPassword, lastItem )
		}


		/**
		 * Adds a separator character to a string
		 * @param {string} allowedCharset Allowed characters
		 * @param {number} maxLength maximal allowed length
		 * @param {string} currentPassword the string that may be modified
		 * @type {string} the modified string
		 */
		addSeparatorOrOpenCloseOrNothing = function ( allowedCharset, maxLength, currentPassword){
			var remainingLength=maxLength-currentPassword.length;
			
			if (  remainingLength  >= 2){		
				if ( Math.random() > .6) {
					var index=Math.floor(Math.random() * classifiedCharsets["open"].length);
					if( allowedCharset.indexOf(classifiedCharsets["open"].charAt(index)) >=0 &&  allowedCharset.indexOf(classifiedCharsets["close"].charAt(index))> 0)
						return classifiedCharsets["open"].charAt(index) + currentPassword + classifiedCharsets["close"].charAt(index);
				}		
			}
			if (  remainingLength >= 1){
				if ( Math.random() > .5){ 			
					var charToAdd = pickOneFromCharsetWithPreference(allowedCharset, classifiedCharsets["separate"]);
					var strToAdd= charToAdd;
					// repeat chances			
					while( remainingLength > strToAdd.length &&  Math.random() > .7) {
						strToAdd+=""+charToAdd;
					}
					return appendOrPrepend(currentPassword, strToAdd);
				}
			}
			return currentPassword;
		}	

		/**
		 * Gets the common part of two distinct strings
		 * @param {string} charset1 One string
		 * @param {string} charset2 Another string
		 * @type {string} the common set of characters as a string
		 */
		commonCharset = function ( charset1, charset2){
			var returnCharset="";
			for ( var i = 0; i < charset1.length; i++ )
			{
				var curChar=charset1.charAt(i);
				if( hasOneFromCharset(charset2, curChar+"")) returnCharset+=curChar;
			}
			return returnCharset;
		}

		/**
		 * Concatenate two strings, by adding something before or after (randomized) the existing.
		 * @param {string} existing the base string
		 * @param {string} addon The part to append to the existing string
		 * @type {string} the generated word
		 */
		appendOrPrepend = function ( existing, addon){
			if ( Math.random() > .5) return addon + existing;  
			return existing+addon;
		}

		/**
		 * Creates a word for a password easier to remember
		 * @param {string} allowedCharset The characters of the custom charset
		 * @param {number} length The maximal Length of characters
		 * @type {string} the generated word
		 */
		easierToRememberPasswordWord = function ( allowedCharset, length ){
			var type = Math.ceil(Math.random()*3);
			
			return easierToRememberPasswordWordRec( allowedCharset, "", length, type, Math.ceil(Math.random()*2) );
			
		}


		/**
		 * Gets a word from dictionary 
		 * @param {string} allowedCharset The characters of the custom charset
		 * @param {number} length The maximal Length of the word
		 * @type {string} the generated word
		 */
		easierToRememberPasswordWordFromDictionary = function ( allowedCharset, length ){		
			var dictWord="";
			if( length > 3) {
				var i=0;
				dictWord=pickAWordFromDictionary(pickADictionary());
				// try 300 times max, if it doesn't work let's assume the dictionary is weak or words 
				//   shorter than x chars
				while ( i<300 ){
					dictWord=pickAWordFromDictionary(pickADictionary());			
					if( dictWord.length <= length  ){
						// randomly create uppercase or first letter capitalized word
						if( Math.random() > (2/3) ){
							dictWord=capitaliseFirstLetter(dictWord);
						}
						if( Math.random() > (7/9) ){
							dictWord=dictWord.toUpperCase();
						}
						return dictWord;
					}
				}
			}
			// by default build a random word
			return easierToRememberPasswordWord(allowedCharset, length);
		}

		/**
		 * Returns the same word with the first character in uppercase
		 * @type {string} string the string to modify
		 * @type {string} the modified string
		 */
		capitaliseFirstLetter = function (string){
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		/**
		 * Returns a name of a loaded  dictionnary (randomly)
		 * @type {string} the dictionary name
		 */
		pickADictionary = function (  ){	
			var dictNames = Object.keys(dict);
			return dictNames[ dictNames.length * Math.random() << 0 ];
			
		}
		
		/**
		 * Returns a word from a loaded  dictionnary (randomly chosen)
		 * @param {string} dictionaryName the dictionary name
		 * @type {string} the selected word
		 */
		pickAWordFromDictionary = function ( dictionaryName ){	
			return dictKeys[dictionaryName][ dictKeys[dictionaryName].length * Math.random() << 0 ];
			
		}

		/**
		 * Creates a word for a password easier to remember, recursive internal function
		 * @param {string} allowedCharset The characters of the custom charset
		 * @param {string} currentWord The word being built
		 * @param {number} length The maximal length remaining
		 * @param {number} type The type of word being generated
		 * @param {number} lastTaken The last type of character taken 
		 * @type {string} the generated word
		 */
		easierToRememberPasswordWordRec = function ( allowedCharset, currentWord, length, type, lastTaken ){
			if( currentWord.length >= length) return currentWord;
			
			var maxLength=length-currentWord.length;
			
			if( type == 3 && currentWord.length > 0){
				type=1;
			}
			
			var addOn="";
			
			// take vowel or consonant depending on last type and append
			var takeFrom=classifiedCharsets["consonant"];	
			var newLastTaken=1;
			if (lastTaken == 1 ){
				takeFrom=classifiedCharsets["vowel"];
				newLastTaken=2;
			}
				
			// Upercase or lowercase ?
			// 3 choices : 3-one uppercase + lowercase / 2-all lowercase / 1-all uppercase	
			var reducedCharset;
			if ( type == 1 ){
				reducedCharset = commonCharset(takeFrom,classifiedCharsets["uppercase"]);			
			}else if (type == 2 ){
				reducedCharset = commonCharset(takeFrom,classifiedCharsets["lowercase"]);	
			}else {
				reducedCharset = commonCharset(takeFrom,classifiedCharsets["uppercase"]);
				type = 2;
			}

			// take 1 to 3 characters? 
			var nbChars=Math.ceil(Math.random()*3);
			if ( nbChars > maxLength ) nbChars=maxLength;
				
			while ( addOn.length < nbChars){
				
				addOn+=""+pickOneFromCharsetWithPreference(allowedCharset,reducedCharset);
			} 	
			
			return easierToRememberPasswordWordRec( allowedCharset, currentWord+addOn, length, type, newLastTaken );
		}


		/**
		 * Creates a password easier to remember
		 * @param {string} charset The characters of the custom charset
		 * @param {number} length The Length of generated password
		 * @type {string} the generated password
		 */
		easierToRememberPasswordNumber = function ( charset, length ){
			var currNumber="";
			
			// if size is 4, chances for a date 2000's, 1900's ...etc.
			if ( length == 4 ){
				if( Math.random() > .7 ) currNumber="20";
				else if( Math.random() > .7 ) currNumber="19";
				else if( Math.random() > .8 ) currNumber="18";
				else if( Math.random() > .8 ) currNumber="17";
				else if( Math.random() > .8 ) currNumber="21";
				else if( Math.random() > .8 ) currNumber="16";
				else if( Math.random() > .8 ) currNumber="15";
				else if( Math.random() > .8 ) currNumber="14";
			}
			
			while ( currNumber.length < length){
				currNumber+=""+nextChar(classifiedCharsets["numeric"]);
			} 
			return currNumber;
		}



		/**
		 * returns a character in both allowed and preferred charsets. If no common characters preferred, return one from allowed. 
		 */
		pickOneFromCharsetWithPreference = function (allowedCharacters, preferredCharacters){
			var reducedCharset = commonCharset( allowedCharacters, preferredCharacters );
			if( reducedCharset.length == 0 ){
				reducedCharset=allowedCharacters;
			}
			
			return nextChar(reducedCharset);
		}


		/**
		 * @type {map} returns the available charsets
		 */
		this.getAvailableCharsets= function (){
			return availableCharsets;
		}
		

		/**
		 * @type {number} returns the default password size
		 */
		this.getDefaultPasswordSize= function (){
			return passwordSize;
		}
		
		/**
		 * @type {map} returns the enabled charsets
		 */
		this.getEnabledCharsets= function (){
			return enabledCharsets;
		}
		

		/**
		 * Creates a custom charset names "custom" (or replace if already exists) with the provided characters
		 * @param {string} The characters of the custom charset
		 */
		this.setCustomCharset = function ( charset ){
			if( charset.length==0 ){
				delete availableCharsets["custom"];
			}else{
				availableCharsets["custom"]=charset;
			}
		}
		/**
		 * Enables one charset
		 * @param {string} The name of the charset to enable
		 */
		enableCharset = function ( charsetName ){
			console.log("Charset " + charsetName  + " enabled");
			enabledCharsets[charsetName]=availableCharsets[charsetName];
			return this;
		}

		/**
		 * Enables one charset
		 * @param {string} The name of the charset to enable
		 */
		this.enableCharsetByName = function ( charsetName ){
			return enableCharset(charsetName);
		}
		
		/**
		 * Enables all available charset
		 */
		this.enableAllCharsets = function ( ){
			for(var charsetName in availableCharsets){
				 enableCharset( charsetName );
			};
		}

		/**
		 * Enables all default charsets
		 */
		this.enableDefaultCharsets = function (){
			defaultEnabledCharsets.forEach(function(charsetName) {
				enableCharset( charsetName );
			});
			return this;
		}

		/**
		 * Disables one charset
		 * @param {string} The name of the charset to disable
		 */
		this.disableCharsetByName = function ( charsetName ){
			return disableCharset(charsetName);
		}
		
		/**
		 * Disables one charset
		 * @param {string} The name of the charset to disable
		 */
		disableCharset = function ( charsetName ){
			console.log("Charset " + charsetName  + " disabled");
			delete enabledCharsets[charsetName];
			return this;
		}

		/**
		 * Builds a bigger charset from all enabled charsets
		 * @type {string} The complete charset
		 */
		prepareCharset = function ( ){
			var fullCharset="";
			var logStr="Enabled charsets:";
			for(var charset in enabledCharsets){
				logStr+=" "+charset;
				fullCharset+=enabledCharsets[charset];
			};
			console.log(logStr);
			console.log("Characters:"+fullCharset)
			return fullCharset;
		}

		/**
		 * Provides any character (random) from the provided charset
		 * @param {string} charset The set of characters to use
		 * @type {string} The random character
		 */
		nextChar = function ( charset ){	
			return charset.charAt(Math.floor(Math.random() * charset.length));
		}

		/**
		 * Checks, and ensures if possible, that the password has at least one character from all enabled charsets
		 * @param {string} password the password to analyze
		 * @type {string} The eventually modified (or not) version of the password
		 */
		checkCompliance = function ( password ){
			var isCompliant=false;
			
			// if length is lower than number of charsets there's no way to solve it
			if (Object.keys(enabledCharsets).length > password.length) return password;
			
			while ( isCompliant == false ){
				isCompliant = true;
				for(var charsetName in enabledCharsets){
					var charset=enabledCharsets[charsetName];
					if( !hasOneFromCharset(charset, password) ){
						var logStr="password \"" + password+ "\" was missing from " + charsetName ;
						password=addOneFromCharset(charset, password);
						console.log(logStr + ", now" + password);
						isCompliant=false;
					}		
				}
			}	
			return password;
		}

		/**
		 * Adds a character from specified charset to the provided password, by replacing another character
		 * @param {string} charset the set of characters to include a char from
		 * @param {string} password the password to analyze
		 * @type {string} The eventually modified (or not) version of the password
		 */
		addOneFromCharset = function ( charset, password ){	
			password = replaceCharAt( password, Math.floor(Math.random() * password.length), nextChar(charset))	;
			return password;
		} 

		/**
		 * Replaces a character at specified index
		 * @param {string} inputStr the set of characters to include a char from
		 * @param {number} index index of the character to replace
		 * @type {string} The  modified version of the string
		 */
		replaceCharAt = function (inputStr, index, newChar) {
			var strArray = inputStr.split("");
			strArray[index] = newChar;
			return strArray.join("");
		}
		/**
		 * Rate a password using the default strategy
		 * @param {string} password the password being evaluated
		  * @type {object} The password rating
		 */
		this.ratePassword = function ( password ){
			ratings["passwordSize"]=ratePasswordSize(password);
			ratings["charsets"]=rateCharsets(password);
			ratings["characterVariety"]=rateCharacterVariety(password);
			ratings["sequences"]=rateSequences(password);
			ratings["keyboard"]=rateKeyboardLayout(password);
			ratings["dictionary"]=rateDictionary(password, dict);
			ratings["commonPasswords"]=rateDictionary(password, passwddict);
			
			coefficients["passwordSize"]=4;
			coefficients["charsets"]=1;
			coefficients["characterVariety"]=1;
			coefficients["sequences"]=1;
			coefficients["keyboard"]=1;
			coefficients["dictionary"]=1;
			coefficients["commonPasswords"]=1;
			
			var nbRatings=0;
			var sumOfRatings=0;
			var productOfRatings=1;
			for(var ratingName in ratings){
				var oneRating=ratings[ratingName].rating;
				sumOfRatings+=oneRating;
				productOfRatings*=Math.pow(oneRating,coefficients[ratingName]);
				nbRatings+=coefficients[ratingName];
			}	
			//return (sumOfRatings/nbRatings+Math.pow(productOfRatings, 1/3))/2;
			var globalRating=Math.pow(productOfRatings, 1.0/nbRatings);
			return {
					rating: globalRating,
					comment: gettext("globalRatingComment")
				}
		}

		
		this._rateDictionary = function (password, dictionary){
			return rateDictionary(password, dictionary);
		}
		
		/**
		 * Provides a subjective rating of a given password according to dictionary lookup
		 * @param {string} the password being evaluated
		 * @type {object} The resulting rating
		 */
		rateDictionary = function (password, dictionary){
			password=password.toLowerCase();
			var curLetters = password.slice( 0 ), word = "";
			var foundWords=[];
			var maxWord={word:"",dictionary:""};
			
			// Make sure the word is at least 3 letters long	
			while ( curLetters.length > 2 ) {
				curLetters=Array.prototype.slice.call(curLetters);
				baseword = curLetters.join("");
						
				foundword=findWord(baseword,dictionary);		
				if( foundword.word != "" ){
					foundWords.push(foundword);
					if( foundword.word.length > maxWord.word.length){
						maxWord=foundword;				
					}
				}
				curLetters.shift();
			}
			
			var ratingFactor=maxWord.word.length/password.length;
			
			var allwords=gettext("rd_allwords_l");
			for (var i = 0; i < foundWords.length; i++)
			{
				allwords=allwords+"/"+foundWords[i].word;
			}
			var allwords=allwords+gettext("rd_allwords_r");
			
			// compare size of biggest word found with the password size
			if( ratingFactor > .9 ) return {rating:0.0, comment: gettext("rd_allwords_hazard") + maxWord.dictionary + gettext("rd_allwords_dic") + maxWord.word + allwords};	
			if( ratingFactor > .8 ) return {rating:0.01, comment: gettext("rd_allwords_weak") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			if( ratingFactor  > .7 ) return {rating:0.15+.3*(.8-ratingFactor), comment: gettext("rd_allwords_q") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			if( ratingFactor  > .4 ) return {rating:0.15+2*(.7-ratingFactor), comment: gettext("rd_allwords_a") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			if( ratingFactor  > .2 ) return {rating:0.8, comment: gettext("rd_allwords_g") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			if( ratingFactor  > .1 ) return  {rating:1.0, comment: gettext("rd_allwords_e1") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			return {rating:1.0, comment: gettext("rd_allwords_e2")};	
					
		}
		/**
		 * Provides a subjective rating of a given password according to its size
		 * @param {string} the password being evaluated
		 * @type {object} The resulting rating
		 */
		ratePasswordSize = function ( password ){
			var len = password.length;
			
			// lower than 5 is far too low	
			if ( len < 6 ) return {rating:0.0, comment: gettext("rs_wts")+len};		
			if ( len < 10 ) return {rating:0.04*len, comment: gettext("rs_ts")+len};		
			if ( len < 15 ) return {rating:.44+.04*(len-10), comment: gettext("rs_q")+len};
			if ( len < 30 ) return {rating:.65+.01*(len-15), comment: gettext("rs_g")+len};	
			if ( len < 50 ) return {rating:.80+.01*(len-30), comment: gettext("rs_a")+len};
			return {rating:1.0, comment: gettext("rs_i")+len};	
			
			
		}
		/**
		 * Provides a subjective rating of a given password for the amount/size of character sequences inside
		 * @param {string} password The set of characters to use
		 * @type {number} The rating, floating point value between 0 and 1
		 */
		this._rateSequences = function ( password ){
			return rateSequences(password);
		}
		/**
		 * Provides a subjective rating of a given password for the amount/size of character sequences inside
		 * @param {string} password The set of characters to use
		 * @type {number} The rating, floating point value between 0 and 1
		 */
		rateSequences = function ( password ){
			
			var sequences=findSequences(password);
			var seqLength = sequences.reduce(function(previousValue, currentValue, index, array){
				return previousValue + currentValue;
			},"").length;		
			var seqStr = sequences.reduce(function(previousValue, currentValue, index, array){
				return previousValue + " / " + currentValue;
			},"");		
			var ratio=seqLength/password.length;
			
			if( ratio <= .1) return {rating:1.0, comment: gettext("rseq_perfect")};
			if( ratio <= .5) return {rating:.9-ratio/2, comment: gettext("rseq_average") + seqStr};
			if( ratio <= .6) return {rating:.64-(ratio-.5), comment: gettext("rseq_impactive") + seqStr};
			if( ratio <= .8) return {rating:.53-((ratio-.6)*2.0), comment: gettext("rseq_toomany") + seqStr};
			if ( ratio == 1.0 ) return {rating:0.0, comment: gettext("rseq_allsequences") + seqStr} ;
			return {rating:0.1, comment: gettext("rseq_toomany") + seqStr};
			
		}
		
		this._rateKeyboardLayout = function ( password ){
			return rateKeyboardLayout(password);
		}
		
		/**
		 * Provides a subjective rating of a given password for the character sequences inside according to keyboard layouts
		 * @param {string} password The set of characters to use
		 * @type {number} The rating, floating point value between 0 and 1
		 */
		rateKeyboardLayout = function ( password ){
			var keyboardSequences={};
			if( !password || password.length==0 ){
				return {rating: 0.0, comment: "no passwords"};
			}
			
			keyboardSequences["qwerty"]=("qwertyuiop[]asdfghjkl;'#zxcvbnm,./1234567890");
			keyboardSequences["qwertz"]=("qwertzuiop�+asdfghjkl��#<ycxvbnm,.-1234567890");
			keyboardSequences["azerty"]=("azertyuiop^$qsdfghjklm�*<wxcvbn?.:!1234567890");
			
			var worstsequence= {
					length: 0,
					sequence: "",
					offset: 0
				};
			
			var passwd=password.toLowerCase(); 
			var keyboardRecognized="";
			for(var keyboardseqName in keyboardSequences){
				var commonality=longestCommonSubstring(passwd, keyboardSequences[keyboardseqName]);
				if( commonality.length > worstsequence.length){
					worstsequence=commonality;
					keyboardRecognized=keyboardseqName;
				}
				//console.log( "password : " + commonality.length + " " + commonality.sequence + " keyboard: " + keyboardseqName );
			}
			
			if ( worstsequence.length == 0) return {rating:1.0, comment: "Perfect : no keyboard sequence"} ;		
			// Less than 3 characters is no problem	
			if ( worstsequence.length < 3 && password.length > 8 ) return {rating:1.0, comment: "Perfect: No (or short enough) keyboard sequences found"};			
			if ( worstsequence.length < 3  ) return {rating:1-worstsequence.length/10, comment: "Keyboard sequence: " + keyboardRecognized  + " layout, \"" + worstsequence.sequence+'"'};		
			
			var indicator=worstsequence.length/password.length;
			
			// More than 70% is too much, reduce by 4
			if ( indicator > .7) 	return {rating:(password.length-worstsequence.length)/(4*password.length), comment: "Too long keyboard sequence: \"" + keyboardRecognized  + " layout, " + worstsequence.sequence+'"'};
			
			// More than 45% is too much, reduce by 2
			if ( indicator > .45) 	return {rating:(password.length-worstsequence.length)/(2*password.length), comment: "Long keyboard sequence: \"" + keyboardRecognized  + " layout, " + worstsequence.sequence+'"'};
				
			// 3 characters  or more depend on password size
			return {rating:(password.length-worstsequence.length)/password.length, comment: "Keyboard sequence: " + keyboardRecognized  + " layout, \"" + worstsequence.sequence+'"'};
			
			
		}
		this._longestCommonSubstring = function (str1, str2){
			return longestCommonSubstring(str1, str2);
		}
		/**
		 * This function provides the longest common substring between two strings
		 * This algorithm is not optimized but good enough for one password and a 
		 * small sequence of characters representing the keyboard layout.
		 *
		 * taken from:
		 * http://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Longest_common_substring
		 * @param {string} string1 First string
		 * @param {string} string2 Second string
		 * @return {object} longest substring: length, sequence, offset
		 */
		longestCommonSubstring = function (str1, str2){
			if (!str1 || !str2)
				return {
					length: 0,
					sequence: "",
					offset: 0
				};
		 
			var sequence = "",
				str1Length = str1.length,
				str2Length = str2.length,
				num = new Array(str1Length),
				maxlen = 0,
				lastSubsBegin = 0;
		 
			for (var i = 0; i < str1Length; i++) {
				var subArray = new Array(str2Length);
				for (var j = 0; j < str2Length; j++)
					subArray[j] = 0;
				num[i] = subArray;
			}
			var thisSubsBegin = null;
			for (var i = 0; i < str1Length; i++)
			{
				for (var j = 0; j < str2Length; j++)
				{
					if (str1[i] !== str2[j])
						num[i][j] = 0;
					else
					{
						if ((i === 0) || (j === 0))
							num[i][j] = 1;
						else
							num[i][j] = 1 + num[i - 1][j - 1];
		 
						if (num[i][j] > maxlen)
						{
							maxlen = num[i][j];
							thisSubsBegin = i - num[i][j] + 1;
							if (lastSubsBegin === thisSubsBegin)
							{//if the current LCS is the same as the last time this block ran
								sequence += str1[i];
							}
							else //this block resets the string builder if a different LCS is found
							{
								lastSubsBegin = thisSubsBegin;
								sequence= ""; //clear it
								sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin);
							}
						}
					}
				}
			}
			return {
				length: maxlen,
				sequence: sequence,
				offset: thisSubsBegin
			};
		}
		/**
		 * Provides a subjective rating of a given password according to the different sets of characters in use
		 * @param {string} the password being evaluated
		 * @type {object} The resulting rating
		 */
		rateCharsets = function ( password ){
			var charsetCount=0;
			charsetsStr="";
			for(var charsetName in availableCharsets){
				var charset=availableCharsets[charsetName];
				console.log("check charset " + charsetName + ": " + charset);
				if( hasOneFromCharset(charset, password) ){		
					charsetCount++;
					charsetsStr+=" / " + charsetName;
				}		
			}
			// less than 2 types of characters is not enough
			if( charsetCount < 2 ) return {rating:0.05, comment: "Not enough types of characters types:" + charsetsStr};
			// 2 types of characters is weak
			if( charsetCount == 2 ) return {rating:.2, comment: "Not enough types of characters types:" + charsetsStr};
			// 3 types of characters is good enough
			if( charsetCount == 3 ) return {rating:.65, comment: "Average amount of characters types:" + charsetsStr};
			// More than 3 types of characters is pretty good
			if( charsetCount == 4 ) return {rating:.9, comment: "Good amount of characters types:" + charsetsStr};	
			// More than 4 types of characters is perfect
			return {rating:1.0, comment: "Perfect amount of characters types:" + charsetsStr};	
			
			
		}
		/**
		 * Provides a subjective rating of a given password according to the variety of characters
		 * @param {string} the password being evaluated
		 * @type {object} The resulting rating
		 */
		rateCharacterVariety = function ( password ){	
			var rate=rawRateCharacterVariety( password );
			if (rate.rating >= 1.0 ) return {rating: 1.0, comment: rate.comment}; else return rate;
		}
		/**
		 * Provides a subjective rating of a given password according to the different sets of characters in use
		 * @param {string} the password being evaluated
		 * @type {object} The resulting rating
		 */
		rawRateCharacterVariety = function ( password ){	
			var differentCharacters={};
			for (var i=0;i<password.length;i++) {  
				differentCharacters[password.charAt(i)]=true;
			}
			var nbDifferentCharacters=Object.keys(differentCharacters).length;	
			var variation=nbDifferentCharacters/password.length;
			
			// lower too short password ratings
			if( password.length < 5 )
				variation = variation*.25;
			if( password.length < 10 )
				variation = variation*.8;
			if( password.length < 15 )
				variation = variation*.9;
			
			
			if (variation<.1) return {rating: 0.01*nbDifferentCharacters/10.0, comment: "Less than 10% variation of characters is not enough: " + (variation*100).toFixed(2)};	
			if (variation<.5) return {rating: variation/2*nbDifferentCharacters/10.0, comment: "less than 50% variation is weak: " + (variation*100).toFixed(2)};
			if (variation<.91) return {rating: variation*nbDifferentCharacters/10.0, comment: "50-90% variation may be good enough: " + (variation*100).toFixed(2)};
			if (variation<.99) return {rating: 1.0, comment: "91-99% variation is perfect: " + (variation*100).toFixed(2)};
			return {rating: .95*nbDifferentCharacters/10.0, comment: "99-100% variation is almost perfect: " + (variation*100).toFixed(2)};
		}
		/**
		 * Checks if the password has at least one character from provided charset
		 * @param {string} charset the related charset
		 * @param {string} password the password to analyze
		 * @type {boolean} true if the password has at least one character from provided charset, false either
		 */
		this._hasOneFromCharset = function ( charset, password){
			return hasOneFromCharset( charset, password);
		}
		
		/**
		 * Checks if the password has at least one character from provided charset
		 * @param {string} charset the related charset
		 * @param {string} password the password to analyze
		 * @type {boolean} true if the password has at least one character from provided charset, false either
		 */
		hasOneFromCharset = function ( charset, password){
			var hasFromCharset=false;
			for (var i=0;i<password.length;i++) {    
				if( charset.indexOf(password.charAt(i)) != -1 ) {
					hasFromCharset=true;
					break;
				}
			}
			return hasFromCharset;
		}
		/**
		 * Build a password using global settings for passwordSize and charsets to use
		 * @type {string} the generated password
		 */
		this.makePassword = function (){
			return makePasswordWithSize(passwordSize);
		}
		
		/**
		 * Find all sequences of characters like "ABCDEF" or "123456" in a given password
		 * @param {string} password the password to analyze
		 * @type {string[]}
		 */
		this._findSequences=function ( password ){
			return findSequences(password);
		}
		/**
		 * Find all sequences of characters like "ABCDEF" or "123456" in a given password
		 * @param {string} password the password to analyze
		 * @type {string[]}
		 */
		findSequences = function ( password ){
			var lastCode=-1;
			var lastChar="";
			var isInSequence=false;
			var currSequence="";
			var sequences= new Array();
			var lastDirection=0;
			
			for (var i=0;i<password.length;i++) {    
				var currCode=password.charCodeAt(i);
				var direction=0;
				var isSequence=false;
				
				// if this is not the first character, check for ordered sequence
				if( lastCode != -1 ) {
					// do we detect a sequence?
					isSequence=(Math.abs( currCode - lastCode) == 1);
					direction=currCode - lastCode;
					
					// check if sequential status detection status changed
					if( isSequence != isInSequence){
						if( isSequence == true ){
							currSequence+=lastChar;
							lastDirection=currCode - lastCode;
						}else{
							sequences.push(currSequence);
							currSequence="";
						}				
					}
					
					if( isSequence ){
						// check if direction changed, if yes there are 2 sequences
						if( direction != lastDirection){
							sequences.push(currSequence);
							currSequence=""+lastChar;
						}
						// keep information of current sequence
						currSequence=currSequence+password.charAt(i);
					}					
				}
				
				isInSequence=isSequence;
				
				// keep information foir checking next char
				lastCode=currCode;
				lastChar=password.charAt(i);
				lastDirection=direction;
			}
			if( currSequence.length != 0 ){
				sequences.push(currSequence);
			}
			
			return sequences;
		}
		/**
		 * Provides a subjective description of password security
		 * @param {object} rate the password rating
		 * @type {string} The resulting description
		 */
		this.passwordStrengthDescFromRate = function (rate){
			if( rate < .2) return gettext("rateHazardous");
			if( rate < .5) return gettext("rateUnsafe");
			if( rate < .6) return gettext("rateWeak");
			if( rate < .7) return gettext("rateMedium");
			if( rate < .8) return gettext("rateGood");
			if( rate >= .8) return gettext("rateSecure");
			return "N/A";
		}
		/**
		 * Generates a password of a given size
		 * @param {number} passwdSize the size of the requested password
		 * @type {string} The generated password
		 */
		this.makePasswordWithSize = function ( passwdSize ){
			var charset=prepareCharset();
			
			if ( easyPasswordRequested && easyPasswordUsingDictionary) return easierToRememberPasswordUsingDictionaries( charset, passwdSize,"","");
			if ( easyPasswordRequested ) return easierToRememberPassword( charset, passwdSize,"","");
			else return makeAnyPasswordWithSize(charset, passwdSize);
			
		}
		/**
		 * Generates a password of a given size using a given charset
		 * @param {string} charset the allowed set of characters
		 * @param {number} passwdSize the size of the requested password
		 * @type {string} The generated password
		 */
		makeAnyPasswordWithSize = function ( charset, passwdSize ){
			var passwd="";
			
			for (var i=0;i<passwdSize;i++) {
				var newChar=nextChar( charset )
				passwd+=newChar;
				if( !allowCharacterRepetition ) {
					charset=charset.replace(newChar,'');
				}
			}
			return checkCompliance(passwd);
		}
		
		/**
		 * Initialization 
		 * @type {object} This object
		 */
		
		this.initialize = function(){
			this.enableDefaultCharsets();
			this.loadDictionary(frenchdict,"french");
			this.loadDictionary(englishdict,"english");
			this.loadPasswdDictionary(worstPassswordsdict,"10k worst passwords");
			return this;
		}
		
		return this.initialize();
};

