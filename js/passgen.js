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

	// LZ-String LZW encoder/decoder is embedded, WTFPL allows this
	// source : http://pieroxy.net/blog/pages/lz-string/index.html
	var LZString={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_f:String.fromCharCode,compressToBase64:function(e){if(e==null)return"";var t="";var n,r,i,s,o,u,a;var f=0;e=LZString.compress(e);while(f<e.length*2){if(f%2==0){n=e.charCodeAt(f/2)>>8;r=e.charCodeAt(f/2)&255;if(f/2+1<e.length)i=e.charCodeAt(f/2+1)>>8;else i=NaN}else{n=e.charCodeAt((f-1)/2)&255;if((f+1)/2<e.length){r=e.charCodeAt((f+1)/2)>>8;i=e.charCodeAt((f+1)/2)&255}else r=i=NaN}f+=3;s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+LZString._keyStr.charAt(s)+LZString._keyStr.charAt(o)+LZString._keyStr.charAt(u)+LZString._keyStr.charAt(a)}return t},decompressFromBase64:function(e){if(e==null)return"";var t="",n=0,r,i,s,o,u,a,f,l,c=0,h=LZString._f;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(c<e.length){u=LZString._keyStr.indexOf(e.charAt(c++));a=LZString._keyStr.indexOf(e.charAt(c++));f=LZString._keyStr.indexOf(e.charAt(c++));l=LZString._keyStr.indexOf(e.charAt(c++));i=u<<2|a>>4;s=(a&15)<<4|f>>2;o=(f&3)<<6|l;if(n%2==0){r=i<<8;if(f!=64){t+=h(r|s)}if(l!=64){r=o<<8}}else{t=t+h(r|i);if(f!=64){r=s<<8}if(l!=64){t+=h(r|o)}}n+=3}return LZString.decompress(t)},compressToUTF16:function(e){if(e==null)return"";var t="",n,r,i,s=0,o=LZString._f;e=LZString.compress(e);for(n=0;n<e.length;n++){r=e.charCodeAt(n);switch(s++){case 0:t+=o((r>>1)+32);i=(r&1)<<14;break;case 1:t+=o(i+(r>>2)+32);i=(r&3)<<13;break;case 2:t+=o(i+(r>>3)+32);i=(r&7)<<12;break;case 3:t+=o(i+(r>>4)+32);i=(r&15)<<11;break;case 4:t+=o(i+(r>>5)+32);i=(r&31)<<10;break;case 5:t+=o(i+(r>>6)+32);i=(r&63)<<9;break;case 6:t+=o(i+(r>>7)+32);i=(r&127)<<8;break;case 7:t+=o(i+(r>>8)+32);i=(r&255)<<7;break;case 8:t+=o(i+(r>>9)+32);i=(r&511)<<6;break;case 9:t+=o(i+(r>>10)+32);i=(r&1023)<<5;break;case 10:t+=o(i+(r>>11)+32);i=(r&2047)<<4;break;case 11:t+=o(i+(r>>12)+32);i=(r&4095)<<3;break;case 12:t+=o(i+(r>>13)+32);i=(r&8191)<<2;break;case 13:t+=o(i+(r>>14)+32);i=(r&16383)<<1;break;case 14:t+=o(i+(r>>15)+32,(r&32767)+32);s=0;break}}return t+o(i+32)},decompressFromUTF16:function(e){if(e==null)return"";var t="",n,r,i=0,s=0,o=LZString._f;while(s<e.length){r=e.charCodeAt(s)-32;switch(i++){case 0:n=r<<1;break;case 1:t+=o(n|r>>14);n=(r&16383)<<2;break;case 2:t+=o(n|r>>13);n=(r&8191)<<3;break;case 3:t+=o(n|r>>12);n=(r&4095)<<4;break;case 4:t+=o(n|r>>11);n=(r&2047)<<5;break;case 5:t+=o(n|r>>10);n=(r&1023)<<6;break;case 6:t+=o(n|r>>9);n=(r&511)<<7;break;case 7:t+=o(n|r>>8);n=(r&255)<<8;break;case 8:t+=o(n|r>>7);n=(r&127)<<9;break;case 9:t+=o(n|r>>6);n=(r&63)<<10;break;case 10:t+=o(n|r>>5);n=(r&31)<<11;break;case 11:t+=o(n|r>>4);n=(r&15)<<12;break;case 12:t+=o(n|r>>3);n=(r&7)<<13;break;case 13:t+=o(n|r>>2);n=(r&3)<<14;break;case 14:t+=o(n|r>>1);n=(r&1)<<15;break;case 15:t+=o(n|r);i=0;break}s++}return LZString.decompress(t)},compress:function(e){if(e==null)return"";var t,n,r={},i={},s="",o="",u="",a=2,f=3,l=2,c="",h=0,p=0,d,v=LZString._f;for(d=0;d<e.length;d+=1){s=e.charAt(d);if(!Object.prototype.hasOwnProperty.call(r,s)){r[s]=f++;i[s]=true}o=u+s;if(Object.prototype.hasOwnProperty.call(r,o)){u=o}else{if(Object.prototype.hasOwnProperty.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++){h=h<<1;if(p==15){p=0;c+=v(h);h=0}else{p++}}n=u.charCodeAt(0);for(t=0;t<8;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}else{n=1;for(t=0;t<l;t++){h=h<<1|n;if(p==15){p=0;c+=v(h);h=0}else{p++}n=0}n=u.charCodeAt(0);for(t=0;t<16;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}delete i[u]}else{n=r[u];for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}r[o]=f++;u=String(s)}}if(u!==""){if(Object.prototype.hasOwnProperty.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++){h=h<<1;if(p==15){p=0;c+=v(h);h=0}else{p++}}n=u.charCodeAt(0);for(t=0;t<8;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}else{n=1;for(t=0;t<l;t++){h=h<<1|n;if(p==15){p=0;c+=v(h);h=0}else{p++}n=0}n=u.charCodeAt(0);for(t=0;t<16;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}delete i[u]}else{n=r[u];for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}}n=2;for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}while(true){h=h<<1;if(p==15){c+=v(h);break}else p++}return c},decompress:function(e){if(e==null)return"";if(e=="")return null;var t=[],n,r=4,i=4,s=3,o="",u="",a,f,l,c,h,p,d,v=LZString._f,m={string:e,val:e.charCodeAt(0),position:32768,index:1};for(a=0;a<3;a+=1){t[a]=a}l=0;h=Math.pow(2,2);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}switch(n=l){case 0:l=0;h=Math.pow(2,8);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}d=v(l);break;case 1:l=0;h=Math.pow(2,16);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}d=v(l);break;case 2:return""}t[3]=d;f=u=d;while(true){if(m.index>m.string.length){return""}l=0;h=Math.pow(2,s);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}switch(d=l){case 0:l=0;h=Math.pow(2,8);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}t[i++]=v(l);d=i-1;r--;break;case 1:l=0;h=Math.pow(2,16);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}t[i++]=v(l);d=i-1;r--;break;case 2:return u}if(r==0){r=Math.pow(2,s);s++}if(t[d]){o=t[d]}else{if(d===i){o=f+f.charAt(0)}else{return null}}u+=o;t[i++]=f+o.charAt(0);r--;f=o;if(r==0){r=Math.pow(2,s);s++}}}};if(typeof module!=="undefined"&&module!=null){module.exports=LZString}
	
	// Dictonaries
	// English
	var englishdict=LZString.decompressFromBase64("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");
	// sources: 
	// http://www.encyclopedie-incomplete.com/?Les-600-Mots-Francais-Les-Plus#outil_sommaire_2
	// http://en.wikipedia.org/wiki/Dolch_Word_List
	// French
	// French dictionnary seems not supporting LZW compression very well with the library used because of accended characters... 
	var frenchdict="les des une que est pour qui dans par plus pas sur sont Les avec son aux d'un cette d'une ont ses mais comme tout nous Mais fait �t� aussi leur bien peut ces deux ans encore n'est march� Pour donc cours qu'il moins sans C'est entre faire elle c'est peu vous Une prix dont lui �galement Dans effet pays cas millions Belgique BEF mois leurs taux ann�es temps groupe ainsi toujours soci�t� depuis tous soit faut Bruxelles fois quelques sera entreprises contre francs n'a Nous Cette dernier �tait s'est chez monde alors sous actions autres ils reste trois non notre doit nouveau milliards avant exemple compte belge premier nouvelle Elle l'on terme avait produits cela d'autres fin niveau b�n�fice toute travail partie trop hausse secteur part beaucoup valeur croissance rapport USD aujourd'hui ann�e base Bourse lors vers souvent vie l'entreprise autre peuvent bon surtout toutes nombre fonds point grande jour avoir nos quelque place grand personnes plusieurs certains d'affaires permet politique cet chaque chiffre pourrait devrait produit l'ann�e Par rien mieux celui qualit� France Ils Ces s'agit vente jamais production action baisse Avec r�sultats Des votre risque d�but banque voir avons qu'un elles moment qu'on question pouvoir titre doute long petit d'ailleurs notamment droit qu'elle heures cependant service Etats-Unis qu'ils l'action jours celle demande belges ceux services bonne seront �conomique raison car situation Depuis entreprise nouvelles n'y possible toutefois tant nouveaux selon parce dit seul qu'une soci�t�s vient jusqu quatre march�s mise seulement Van semble clients Tout Cela serait fort frais lieu gestion font quand capital gouvernement projet grands r�seau l'autre donn�es prendre plan points outre pourtant Ainsi type Europe pendant Comme mesure actuellement public dire important mis partir parfois nom n'ont veut pr�sent pass� forme autant d�veloppement mettre grandes vue investisseurs trouve maison mal l'an moyen choix doivent NLG direction Sur simple p�riode enfants dollars personnel assez programme g�n�ral banques eux semaine pr�sident personne europ�enne moyenne tard loi petite certaines savoir loin explique plupart jeunes cinq contrat Banque valeurs seule rendement nombreux fonction offre client activit�s environ ministre cadre sens �taient s�curit� recherche Paris sorte d�cembre Son suite davantage ensuite janvier donne vrai cause d'abord conditions suis juin peine certain septembre sommes famille l'indice pris laquelle directeur qu'en propose gens derniers �tant fut chose portefeuille obligations afin diff�rents technique Aujourd'hui ailleurs l'ensemble am�ricain ventes Selon rue livre octobre vraiment sein dollar Enfin haut Plus petits porte tel dur�e domaine aurait jeune pr�sente passe lorsque choses puis Vous aucun l'un n'en tandis coup existe propre carte crise importante atteint revenus montant forte ici s'il Quant rapidement j'ai ville etc mars s'en mon premiers bas marque v�ritable ligne longtemps propres devant passer d�part total s�rie quoi particulier concurrence �lev� position connu principe tendance court pages �videmment r�sultat aura parmi Sans am�ricaine face trouver durant femmes construction d�sormais distribution telle difficile autour europ�en pratique centre vendre juillet mai r�gion sociale filiale film besoin mode Pas repr�sente r�alit� femme vaut T�l aucune hommes donner titres l'Europe nombreuses diff�rentes moyens formation chiffres G�n�rale dix prochain l'Etat genre bureau communication participation gros pourquoi estime devient r�alis� cr�ation novembre l'�volution pourra semaines consommation faible terrain site droits moiti� puisque reprise compris projets avril vont call donn� simplement six firme perte Bien Philippe sait prend vite via strat�gie vos jeu petites marketing presque Michel manque r�aliser financiers Car Comment voiture chef constitue Internet J'ai enfin net charge nature second payer actuel Elles investissements dispose financier d'achat membres date avaient gamme revanche comment d�cision l'avenir tour actionnaires s'y solution cr�er l'�conomie concerne l'�poque belle lequel t�l seconde version Pays-Bas cher chacun lire techniques d�cid� mouvement conseil n�cessaire meilleur double sujet g�n�ralement restent celles politiques malgr� confiance homme d'actions Certains ayant papier commerce R�gion Wallonie Windows termes met contraire informations l'industrie trimestre diff�rence certaine formule jusqu'au voit programmes actuelle permis dossier Quand l'heure guerre acheter rendre f�vrier l'emploi main voire bons technologie europ�ens �l�ments unique l'eau venir g�n�rale courant suffit l'ordre conserver maximum force fax Que largement milliard soient Pierre devenir l'Union franc minimum mort responsable possibilit� presse affaires longue travers BBL relativement moi Deux pr�sence europ�ennes devraient groupes ensemble sant� New pense b�n�fices but compagnie publique coeur revenu mesures table nettement questions d'avoir permettre l'homme Chez retour qu'elles majorit� potentiel moindre r�cemment secteurs r�duction large traitement perdu �trangers parents l'une fond capacit� vitesse activit� l'exercice l'objet quel tient taille �viter risques Jean Pourtant Allemagne parler propos quant signifie voie jouer pr�voit blanc noir parti logiciel continue Notre bois meilleure l'argent perspectives d�velopper celui-ci oeuvre structure suivre tiers prise professionnels raisons n�anmoins preuve social b�n�ficiaire couleurs mondial Cet maintenant essentiellement pr�vu Japon pr�visions centrale Alors international yeux PME l'a ait bonnes op�rations pied l'art pourraient Londres juge devra uniquement corps divers Parmi num�ro r�duire Tous texte tenu budget l'�tranger pression mes n'�tait style �conomiques Jacques montre population analystes processus placement classique dividende rester publics fortement plein wallonne DEM Express faudra travailler Cr�dit directement prime Flandre cr�dit monnaie pr�cise appel Autre travaux l'occasion juste Chaque put tableau terre permettent devenu rouge m�moire partenaires rapide travailleurs joue objectif salle parle musique milieu d'entreprise autorit�s chute r�gime d'autant liste op�ration bout performances �lectronique haute responsables lanc� voitures patron Malgr� affiche situe l'image �tudes Microsoft condition retrouve Aux revient Belgacom route Ensuite Luxembourg campagne comptes hors culture Commission d'entre possibilit�s semestre actifs finalement internationale l'achat mon�taire passage justice page tels poids celle-ci commercial entendu l'investisseur mondiale accord diverses totalement fil clair vin biens euro York parfaitement viennent division r�seaux principal lancer sup�rieur atteindre r�f�rence t�l�phone management vins proche collection fiscale Ceci informatique investissement volume mat�riel publicit� train coupon progression tenir protection l'aide couleur nouvel Lorsque change changement garantie somme Belge plaisir fils laisse importants priv� Ses besoins oeuvres am�ricains relations peau moteur augmentation suivi volont� beau bancaire laisser bureaux principalement int�ressant logiciels sommet l'activit� d'en vivre �lev�s Robert contrats oublier performance r�ponse d'exploitation concept obtenir poste attendre lignes consiste augment� vert figure mot d�velopp� l'histoire magasins collaboration r�pondre TVA holding livres convient fonctions fera pouvait million Paul britannique d'entreprises voix Grande-Bretagne disque affaire minutes quelle contexte limite mains commun r�duit Pourquoi particuliers verre wallon d'Etat allemand effets Chine meilleurs rend applications d'ici proc�dure l'op�ration devait profit m�thode pose commence id�e l'Internet d'eau cr�� nuit Nord capitaux options consommateur cartes soi m�tier probablement aller d'investissement facile International importantes Marc capitale devise prochaine transport Street demander utilisateurs l'affaire image l'id�e propri�taire facilement publiques croire disponible Louis d'or veulent Charleroi consommateurs devises difficult�s sort national machines annonc� choisi d�couvrir soutien avez perdre cuisine telles D'autres travaille ouvert phase certainement t�l�vision pratiquement annuel bord paiement Bank institutions seuls arrive constate marques nationale regard repr�sentent Belges �tat Qui libre rachat Toutefois portes sortir commandes permettant manager fiscal cin�ma histoire zone sauf avantages l'information voici dur effectivement puisse r�el The puissance fixe Belgium contact �poque rythme principaux vendu utilis� �tude Leur sensible Bref rencontre L'entreprise sp�cialistes brut mauvais n�erlandais suppl�mentaire mots reprises n�cessaires Non soir Prix machine penser parts comprend fusion acquis totale voyage logique l'�ch�ance concurrents id�es trouv� dette Sud r�ellement financement disponibles vieux lance marge dirigeants avis changer cons�quence sociales sup�rieure Certes faisant ordinateur partenaire warrant fabrication redressement suffisamment d�l�gu� pourront poursuit chemin emplois l'environnement r�alise FRF �volution Cour automobile Premier ancien note parties pension professionnel assure garder Rien Actuellement S'il l'administration Guy est-il IBM climat d'acheter SICAV d�partement sept partout immobilier lancement rating r�ussi patrimoine feu exp�rience Anvers anciens graphique Fortis faveur retrouver droite responsabilit� commande Kredietbank d'argent direct l'inflation n'avait utiliser tonnes l'origine connaissance achet� Ici am�ricaines clairement semblent biais futur neuf chance faillite �quipe mus�e compagnies documents pertes sortie m'a seraient d'autre choisir l'instant tellement industriel pr�compte d'Europe imm�diatement avantage qu'au constituent d�chets sport van demeure garde maisons Solvay cons�quences l'offre active d�penses donnent employ�s sites �lections d�tient n'importe obligation fruits v�hicule l'�gard Conseil investi mission profiter visite comprendre professionnelle affirme l'int�rieur Wall charges priv�e rares succession libert� rentabilit� suivant efficace assurer images agences impossible John enfant fournisseurs photo salaires Avant compter l'Est disposition formes b�n�ficiaires lesquels maintenir pr�cis�ment couple enregistr� recul offrir peur hauteur centres voulu industrielle positif Luc administrateur int�ressante commerciale interne pleine passant vision GSM faits retard certes l'air lundi Outre porter �crit cesse locaux d�lai trouvent classiques commenc� r�alis�e Alain vigueur gagner Celui-ci Philips ceux-ci favorable pouvoirs participations annonce g�n�ration �l�ment devenue touche conseils devoir mer souligne respectivement rapports vacances lieux naturellement d'y lorsqu'il statut USA ceci destin� d�faut objectifs r�cente saison d'art industriels Suisse cat�gorie complexe huit l'obligation fisc obtenu repris occupe s�rieux �mis Quelques comportement limit� vingt conjoncture gauche marche d'origine l'utilisateur ordre mobilier parcours perspective normes recours l'esprit Communaut� annuelle lecteur objets fabricant niveaux Entre r�alisation amateurs cons�quent pr�senter Celle-ci vise types d�tail mauvaise professeur progress� signe pass�e approche Reste return jardin l'espace flamand Namur bilan Vif sensiblement Trois utilise commune dimanche option partis analyse films surface warrants GBP prises secret historique journ�e l'ancien Pendant allemande d'assurance Andr� fille l'importance proposer avions augmenter parc Delhaize the Lors limit�e appareils villes au-dessus diminution prochaines servir Bernard commission faiblesse plus-value souhaite internationales producteur producteurs code belles cabinet fonctionnement g�rer mouvements pratiques r�gions dossiers meilleures Parce entr�e vendredi actif sociaux suppl�mentaires caf� message physique Soci�t� communes dizaine faute s�lection source facteurs milliers soleil tirer concernant Bourses fallait sentiment b�n�ficier d�bat l'Allemagne �lev�e ouvrage police pouvez attention a-t-il bel constructeurs contribuable moderne passion primes suit auquel d�passe sp�cialis�e bruxellois d�claration multiples quartier vid�o d�pend l'�cole liquidit�s correction comit� Web cherche filiales Sous sign� leader calcul gaz D'abord Rens artistes d�ficit cadres f�d�ral probable remboursement and efforts restaurant Toutes couverture domicile soins devront luxe complet danger indispensable syndicats comporte faite juridique langue rendez-vous d'informations demand� respect continuer l'organisation lesquelles local l'impression n'existe rare restructuration automatiquement plat boursier sol c'�tait cot�es d�cide L'action Cependant Certaines mat�riaux ordinateurs tradition progressivement capable classe familiale r�serve fonctionne solutions fabricants paie Finances l'�t� r�elle chang� masse unit�s consid�r� fer auront noms riche Patrick propos� salon territoire fix� magasin candidats marges asiatique inf�rieur r�action fleurs l'effet record tribunal recettes poursuivre dessous portant Aussi Sabena acteurs dehors constructeur l'auteur relation offrent spectaculaire LUF produire confort familles investir reprend sert montrer m�rite places Soit judiciaire textes quasi SNCB jeux permettra �tudiants membre photos positions sud Cockerill lendemain cent gagn� japonais l'absence mark pointe solide Voici anglais n'ai pr�sentent d�cisions l�gislation m�dias victimes �cran n�cessairement d�couverte l'assur� club environnement noter cr�e exportations n�gociations Jan r�pond BEL entier business peinture s'�tait voisins faibles location nord promotion technologies auraient caisse entend simples maladie menu chances commerciaux printemps Benelux poser Asie l'utilisation usage PIB actionnaire prennent r�sistance Dow surprise Etats mariage n�cessit� Puis cote Plusieurs beaut� exclusivement lettre pay� rendu s'ils software utile gestionnaires b�n�ficie proc�d� vaste crois normal Centre construire d�marche emprunts naissance D'autant d'information distance tourner Club attendant quantit� roi l'assureur tourne ajoute bancaires ajouter g�ant automatique faux attend litres pr�sent� argent confirme ind�pendants l'ordinateur �norme destin�s l'avantage v�hicules ressources standard auparavant construit Quelle principales quelqu'un disposer global �coles Quel r�putation fameux rappelle conseille heure veille difficult� l'�tat limites commerciales samedi palais vend vit Tractebel connaissent reprendre village emploi amis budg�taire croit mises souci contient habitants Weekend bras beaux bruxelloise faisait introduit int�rieur outils pr�cis chercheurs taxe salaire transactions Christian chambre port�e r�flexion C'�tait d'emploi hasard matin assureurs r�forme Beaucoup fournir recherches li�s tenue proposent aide ferme l'enfant l'or secondes CGER contenu quotidien flamande centaines course billet critique l'arriv�e naturel principale support week-end Dehaene Gand charg� �conomies Nos augmente guide proposition laiss� sp�cialiste francophones importance vent conception pr�f�rence spectacle avenir d'entr�e grave commencer d'ann�es diminuer chercher bonheur dizaines d'environ exactement outil sc�nario Jones coups �missions �ventuellement Royale l'agence soumis d'exercice lecture monter Grand central exigences assur� contacts consacr� l'attention d'administration due faut-il r�ussite �ch�ance recevoir tableaux arriver �vident art Italie am�lioration auteurs estim� quinze Russie demain pr�c�dent vendeur �v�nements autrement experts fortes furent possibles circonstances placer publication l'�cran r�serves sauce venu Charles collaborateurs implique l'assurance obligataire �tabli CD-Rom forc�ment l'essentiel l'enseignement remarquable vol Claude tourisme internationaux directe comp�tences conseiller facteur l'est plastique rarement Royal affich� lutte relative actuels envie l'�quipe ministres secr�taire capitalisation langage positive circulation convaincre notion visage vouloir ajout�e caract�ristiques Eric Union paix puisqu'il courrier disposent d�veloppe pr�sentation barre comparaison d�terminer firmes fournisseur informatiques luxembourgeois achats solde Serge globale propri�t� strat�gique Renault partage port� sources Kong cour destin�e absolument branche l'objectif ouvre plans productivit� R�sultat am�liorer d'obtenir jou� Parlement d�pit fichiers personnalit� constitu� gestionnaire profession qualit�s conscience m�decin celles-ci design d�cor faudrait participer appelle forces suisse appareil conduite D'une longueur tarifs v�rit� lien locales francophone clubs correspond coupons d'�mission estiment d�fi prot�ger r�alis�s d'emplois d'�viter l'ouverture m�thodes revenir superbe volontiers document nomm� tente financer scientifique Georges travaillent l'investissement li� zones aime lettres ouverte Hong L'ann�e murs philosophie rappeler utilis�s suivante d'ann�e repr�sentant traduit remettre situ� diff�rente longs �conomie discours distributeur domaines l'introduction r�gional faites italien restera usine Group l'informatique personnage portent attendu l'option Jean-Pierre articles changements fallu l�ger mener propri�taires sp�cifique r�cup�rer voyages proc�der locale m�decins priv�s transmission concurrent courte quart baisser pieds publi� Ford menace r�union transfert compos� dimension personnages ralentissement conclusion l'usage agents parfum r�mun�ration difficiles l'entr�e mettent pierre proches r�glementation salles grimp� prochains pr�vue �lectrique dynamique exposition install� plancher distributeurs d�clare connue n'avons pr�paration r�alis�es beurre op�rateurs achat province sp�cifiques Albert l'usine l'existence renforcer t�l�phonique comptable effectuer trafic degr� l'ont d�finitivement humain optique remarque talent appel� modifier d�finition peintre respecter stade statistiques certificats s'attend limiter livraison placements raconte volumes immobiliers Fax anciennes chevaux m�dicaments Peter feuilles football identique pouvons remise structures tenter accords cotisations indice neutre Mon constituer d'accord montrent plac� loyer proximit� voient �pouse Canada entrer postes pr�cision cit� concours patrons populaire p�trole n�gatif allemands d'activit� roman victime italienne m�nages repas PetroFina langues tendances D'autre pire prudence savent N�anmoins conduit mille r�novation �gard Am�ricains exercice l'�tude s'impose avance effectu� fortune fournit lecteurs Morgan d�couvert l'inverse diff�rent emploie bleu royal technologique t�l�communications Amsterdam fiscales indique information lourd signal Mieux aider ancienne apporte nette prestations publicitaires sensibles communaut� l'�mission lit volatilit� �tape assurance jusqu'en lanc�e r�soudre garanti modification revue sp�ciale www chacune l'analyse diff�rences messages priorit� recommandation r�cent charme dividendes Olivier passent finale immeubles logement pourcentage rire stabilit� difficilement d�fense l'ancienne magazine D'un eaux jeunesse l'intention continuent r�volution �tonnant organisation constater dos emprunt oui �ditions Daniel sel utilis�e compartiment publicitaire article bande capacit�s centrales consid�r�e milieux occasion quasiment pouvant Vermeulen-Raemdonck visiteurs chambres consid�rablement demi d�couvre essentiel broker dettes mardi reconnaissance salari�s formules grosse heureux perd radio allait multim�dia partiellement seules G�rard Oui Securities toucher jugement l'oeuvre consid�rer remplacer couvrir pr�cieux segment dessins espace indices refuse chefs exemples rejoint sp�cialis� l'amour l'exportation objet pr�c�dente rose versions d'�tudes destination Encore deviennent l'Italie personnelle plats vingtaine l'exp�rience virus Faut-il chasse longues Toute bases cot�e final monnaies travaill� apporter aspects disparu David Management port racheter relever Celui ING catalogue centaine chaleur profil repr�sentants conclu r�side scientifiques Chambre secondaire Fin serveur XIXe exige grimper immeuble l'Universit� montants paysage vendus ton assurances cat�gories dure d�cote soutenir �dition dangereux agr�able voulait combien d'application disparition optimiste plus-values tomber erreur l'augmentation situations sp�cialis�s subi suivent Jusqu'au classement l'exemple norme rentable sang socialiste tombe Justice attitude mines qu'aux li�e plantes vague General l'immobilier l�gumes Ceux-ci conflit excellent licence travailleur appris est-elle gagne mari pr�parer purement situ�e v�rifier Jean-Luc gain m�tal surfaces L'objectif d'�pargne douze expliquer lorsqu'on meubles yen chaussures cr��e institution l'accent solidarit� Maastricht bas�e journal soin sourire Guerre bouteilles flexibilit� maintient appartient moments rouges L'an bas� devons installations Bacob association d'obligations format City Page disques modem m�lange ordinaire vide chimique disent pharmaceutique d'assurances num�rique porteur r�partition blanche composants future parvient �voque Durant calme cru Electrabel culturel grosses baiss� lois moteurs principes trente �ventuelle Peu pr�voir tours Pentium acheteur dimensions fonctionnaires organis� rencontr� russe savoir-faire �tablissements F�d�ration Toujours cr�ativit� top application d�passer importe jaune l'application marqu� m�canique socialistes tranche Quelles envisage traiter Surtout acheteurs chinois claire l'Institut v�cu Objectif bail demandes diversification montr� renseignements souscription Tokyo entendre tests Siemens filles unit� Bekaert UCB composition rest� sinon agence fini modifications Cash industrielles obtient permanence restaurants r�els �change florins l'accord terrains �mergents atouts offrant LES bouche champ chaud l'annonce monte preneur pr�sents quitte tarif facture fiscaux modeste processeur Fund avenue comp�tition relev� tent� Est-ce Mus�e bijoux diff�rentiel d�clar� institutionnels l'employeur trait� Intel traditionnels victoire connus correctement pub Dominique Tant accessible rencontrer stocks Art esp�rer jouent men�e n�cessite provenant utilisent affichent d�lais inf�rieure sent sp�cial Am�rique acqu�rir album id�al l'�cart v�ritables associ� candidat connaissances l'�nergie signes cheveux conserve stress d'Anvers d'action directeurs donn�e endroit l'emprunt l'impact der traditionnelle Martin ciel convention obligataires prouver Espagne Petit Source dessin humaine l'huile lait Seule Thierry boursiers continent destin�es flamands n�erlandaise pensions commencent consid�rable nationales nul s'adresse conjoint cr�dits militaire morceaux privatisation repose sommeil traditionnel PSC Seul capables combat finances puissant s'agissait Bill Renseignements physiques Richard allant cr�ations toile �vidence convaincu excellente retraite th�orie transformer Tour transaction visant Deutsche Mons attentes cycle d�tails Votre h�ros l'artiste l'universit� s�rieusement uns Ceux consid�ration impose propositions Autrement cap forts l'Afrique usines Afin Quels ais�ment ressemble risquent totalit� imaginer originale int�gr� int�ressantes l'ext�rieur loyers auxquels circuit ind�pendant int�rieure jus maintien cotisation l'Asie moyennes quitter stable CVP Compaq galerie liens souffle GIB apprendre concert l'exception l'�chelle liquide nez noire temp�rature transparence �cole champion diminu� d�sir ressort voulons �quip� alimentaire den organisations pr�sidence raisonnable ratio recommande utilisant accepter accept� cache chocolat chut� comparer courts figurent passagers prison viande associ�s esprit froid jeudi li�es revu satisfaction satisfaire test tiennent vraie contrairement d�pass� ext�rieur qu'avec ami American Etat compl�mentaire d�clarations r�actions Fonds artiste conclure d�duction remis L'indice d�termin�e fiscalit� grand-chose humaines r�ponses �quipes ITL Michael Systems aspect commercialisation manger RTBF engag� oblig� proportion signature �tranger impos� s'applique silence vote Afrique Mobistar cible contemporain fondateur Jean-Claude communiquer d'investir existent majeure ouvrir �lectroniques JPY TGV comp�titivit� erreurs notation rang Apple accident certificat exceptionnel http proprement riches Barco Quoi violence adapt� b�n�ficient r�cession sentir armes arriv� crainte garanties l'automne m�nage officiellement ouvriers Autant discussion rejoindre �poux citoyens concern�s d'inflation d�finir L'id�e Paribas Telecom d'aller fabrique feront n�e oblige patients pensent responsabilit�s doubl� fraude l'article organise Henri conclut d�sire l'appareil l'association l'installation l�gislateur �crans choc gratuit mobile naturelle dialogue r�vision familial lourde poche d�cider n�gociation tort Maison Tr�sor constante cotation d�termin� l'instar managers opt� transformation Life anniversaire comp�tence g�ographique mandat r�serv� �tablir Business fins richesse CAD commente interm�diaire l'univers retrouv� sciences Sun banquier former mont� parfait veux Ren� investit l'oeil n'aurait parvenir vieille collections dirige fonctionner mauvaises tapis venus Contrairement Suez piste pistes tensions campagnes investis propos�s sac tabac bataille britanniques fine li�geois partenariat priv�es remplir sup�rieurs Beaux-Arts Christie's laser restauration Dutroux chimie rendent textile Brabant Colruyt James National Quatre pr�alable souvenir venue Communal avocat comparable consolid� critiques interdit l'initiative mine quotidienne rigueur r�duite tissu Invest pain participants proc�dures profondeur retrouvent rues taxation Mexique asiatiques conducteur demandent environs fermeture gris rumeurs accueille amoureux d'augmenter d�fendre l'immeuble pure souffre cr�neau d'�nergie journaux s'explique seuil Jeux Office auteur cash-flow fichier foi instruments quelles s�ance v�ritablement Yves attirer civil civile d'aujourd'hui eau l'�pargne station courbe hectares influence ing�nieurs tables vivent Exemple L'un blancs couche cuir devenus extraordinaire patient peux aient animaux associations d'utiliser foie initiative l'Am�rique poursuite survie Face apparemment consultant expansion l'exposition s�jour champagne commentaires complexes cylindres d�cennie rendements retenu sais sujets cuivre offert r�agir sec varie Fondation artistique communications mon�taires m�taux permanente positifs �lectriques basse concentration investisseur provoqu� doux stations coin modifi� avocats estimations original souplesse Attention Frank Hainaut Suite annuels cellule clause exemplaires malheureusement minute normale Fr�d�ric Sud-Est atout latine logements pilotes susceptibles Roger XVIIIe ordres remarquer actuelles bouteille constat opportunit�s pr�pare vendeurs accrue fruit jug� l'am�lioration loisirs pur trentaine bus gendarmerie air alimentaires cot� modernes pr�ciser r�ussir laissent parfaite sp�cialement �voluer Dewaay D�sormais Groupe maladies n�gligeable tension Lion chansons dite festival n�gative pr�f�r� restant Cera adopt� coop�ration distingue douceur retirer technologiques Editions Parfois bruit comptant d�mocratie exception mercredi offres sucre vedette �volue British Leurs compromis hauts �lev�es �mission Faire attendue d'appel jusqu'ici lourds quels soir�e �v�nement alternative chimiques conf�rence quitt� serveurs Br�sil CD-ROM correspondant l'avis locataire mat�riau p�riodes utilis�es d'embl�e l'aspect morale �quilibre Sony fixer gratuitement trait Trop adultes consacrer d'importance normalement parole prochainement suscite verra cl� mesurer notes potentiels relatives Flamands Francfort L'homme Palais Plan R�publique l'arm�e transports Portugal couvert joueurs Malheureusement coupe dispositions effort endroits aides contribution insiste s'inscrit souhaitent communal impact progresser Sambre administrateurs d'ordre deviendra d�gager formations l'ouvrage souscrire cellules facilit� gras militaires pass�s quinzaine souvient automobiles bref confortable essentielle officiel vive vols Marcel Top combinaison distinction d�finitive japonaise liaison tissus cadeau canadien distribu� existants ordinaires servi surveillance l'architecture l'a�roport m�decine n'aura n'�taient revoir r�centes voies L'obligation Rappelons comptabilit� fabriquer fasse int�ressants peintures quartiers valable �tapes b�n�fici� couvre diminue envers introduire missions s'attendre Petrofina apparition coffre digne fibres initiatives litt�rature rembourser retrait Bundesbank D'ailleurs Pascal Pologne consacre employeur favorables l'approche manquent assur�e battre chantier conclusions consulter craindre d'utilisation vivant Chacun internes apprend li�geoise observe provenance sortes Marie cess� c�der estim�e marchandises Poste balance copie cuisson n�gocier sp�ciaux traite Bruges hollandais peut-on porteurs r�gler soutenue suivie Stanley accueillir m�dical notori�t� provoquer sensibilit� vocation L'investisseur for impression l'ampleur s�duit conflits imposable journalistes manifeste provoque wallons �diteurs EUR canal fondamentale futurs graves men� mur pommes rachet� remonte solides suffisante charg�e chers discussions garantit indicateurs provient soutenu sportif syst�matiquement z�ro comptent recette r�cit subir �volu� Johan accorde faciliter hausses Macintosh Services d'imposition d�buts garantir portefeuilles susceptible universit�s Glaverbel Sotheby's actes brasserie caract�ristique cherchent favoriser justement prudent stock �chelle �norm�ment Standard compose couronne exceptionnelle flux j'�tais justifier r�fugi�s t�l�phoniques Monsieur Ville accepte inspir� l'ombre pollution situent allemandes boissons douce gouvernements intervention motifs primaire World entrepreneurs l'efficacit� repr�sentation Thomas apparaissent compl�mentaires cycliques franchement instrument rayon Food Roi conversion partager retenue simplicit� Comit� confirm� devaient exp�riences front jeter logistique reconnu Affaires Heureusement com�die historiques imposer l'actionnaire obligatoire recourir r�f�rences traces t�moigne GBL Java acte appliquer catastrophe conduire contribu� fais intervenir mettant pilote plafond remplacement tire Berlin Vincent portable profonde refus� repos b�ton ferm� juges parlementaires pr�vention Donc d'�lectricit� dispositif forment neige suffisant Louvain diffusion f�d�ration lentement prenant souris contenter douleur intervient j'avais look manoeuvre parquet pouss� arguments billets consacr�e dirigeant d�coration holdings justifie levier majeur midi recyclage robe Entre-temps appels directive initial int�ress�s pousser pouvaient secrets surpris univers d'avis poisson sp�cialis�es s�duire verser d'investissements g�n�rations nettoyage ouverts r�ductions v�lo Anne Compagnie Souvent d'Amsterdam explique-t-il l'abri l'int�gration officielle r�solution Service courses l'exploitation pari pousse revendre trace abonn�s craint croissant juger r�gionale symbole touristes Rome actives communautaire contraintes journaliste traditionnelles variable amour atelier budgets budg�taires clef d'ores d�triment nationaux paquet relatif Francis Rupo d'enfants diesel gare l'acquisition parlent rapporte regarder �ventuel Clabecq carr�s psychologique rupture t�l�phonie Air Danemark Sauf citoyen four permettrait puissent rapides Marketing Tendances dit-il d�veloppements enregistre envoy� interm�diaires l'issue liquidit� r�agi Allemands L'autre Louise connues consolidation cr�ateur id�ale l'espoir profit� pr�vus r�sulte similaire Boeing Didier Dieu Willy agir coins constat� d'eux danse occidentale optimistes pens�e professionnelles Computer San Tournai appliqu�e chanson d�roule franchir liquidation morts nouveaut� prestigieux suppression Laurent Mercedes existantes pleinement simultan�ment �tablissement cercle corruption discipline familiales l'avant laboratoire livrer mont�e participe Personne adresse finance g�nie leasing versement bits concern�es dents inclus maximale pr�c�demment routes variations �quipements Declerck chemins constitu�e d'effectuer globalement libres proposant souligner Bon ambitions croissante d�cennies fou l'influence litt�ralement motivation rubrique souvenirs surprises vendue Celles-ci b�b� plainte stockage �crire �nergie Spector annonceurs d'olive d�bats ferait grain sont-ils s�paration tournant vendues Compte Cools Volvo accessoires constitution consultants dommages occup� s'appelle �changes Seconde adresses efficacit� fix�e frappe l'apparition monopole panneaux rest�e sentiments termin� utiles Bruno Seuls appliqu� donnant fondamentaux fr�quemment l'aventure m�tiers planche royale suppose Inc Moins fourni japonaises pay�s profond programmation r�solument L'Europe d'amour d'ouvrir golf poudre propos�es �toiles PRL attach� concevoir dommage l'opinion main-d'oeuvre r�cents strat�giques vitesses Peugeot Philip appr�ci� connexion hommage jardins remonter suppl�ment Canal Tessenderlo cheval entretien inutile l'Espagne laissant m�canisme nouveaut�s plac�s repli r�gionales r�gionaux souple symbolique troubles �valuer Aucun Mac R�gions cession confie moyennant num�ros portrait �tablie cinquantaine d'assurer peuple promis retenir r�ception sexe utilisation visiblement acteur cr�ateurs dites d�poser expositions handicap lourdes plastiques procure proviennent sous-jacente Quick Virgin auxquelles banquiers baptis� finit venait volant Fiat Joseph Lyonnais enseignants geste l'UCL s�rieuse Mignon Royaume-Uni Vers classes doigts encadr� froide niche pr�vision servent Baudouin Nicolas Smeets arriv�e domestique envisager espaces filet inflation pos� promouvoir roues Assurances Capital immense incontestablement lot pharmacie restructurations sportive L'ensemble ci-dessus d'activit�s engagements humains introduction organis�e Delvaux assiste couverts franchise L'histoire annuellement arrivent causes pierres valent volet Hanart Karel Lotus intention l'acheteur manifestement prendra profond�ment relance suivantes suspension commissions divisions d�velopp�e employ� fourchette qu'est s'occupe vendent Clinton Jean-Marie Maurice Nationale compenser d'octobre essayer fond� formidable graphiques professeurs tester George Histoire boutique cam�ra d'avance fond�e heureusement label montagne pensons plate-forme temporaire tomb� tribunaux �vite BMW Monde condamn� culturelle d'air entre-temps entr�es installer perception sauver th� Ferm� Peut-on Unilever accompagn� externe franchi jadis manifestation miracle moral refus r�unit r�v�ler s'installe Etienne Evidemment bateau conseill� d'�cart d�crit fr�quence l'occurrence s'adresser taxes Company concentrer consultation dor�navant dynamisme install�e profite r�unions amateur avoirs calcul� d'atteindre estimation exerce bloc circuits couper courante d'am�liorer d'instruction effectu�s fameuse int�ress� montage pr�vues subsides s�duction trait�s trouvera �quip�s Aucune ing�nieur r�clame r�mun�rations tentent tournent �gale �metteurs Prenons agent attentif d'aide d'oeil existant fluctuations gr� l'administrateur m�dicament partiel permanent s'installer situ�s sportifs vertu Intranet L'�volution Quelque allons appartements duquel kilos sicav toit vers�es chauss�e d'huile futures individuelle manifestations raisonnement sports Christophe DES absolue appel�e contente d'id�es d'investisseurs intense money r�pondent tranches Waterloo assurent calculer choisit citer dot� fixes inf�rieurs mensuel promoteurs relais sorti t�l� voisin Cor�e Lynch dit-on hiver l'Association l'ULB naturelles preuves pr�sent�s souffert Qu'est-ce attendent camions camp contenant curieux d�tente effectue g�ants l'endroit l'interm�diaire l�gale n'�tant prestation publi�s rente r�alisent ski soigneusement vif Cie conviction doubler morceau racines tenant universitaires visiter Center Global d�marrage entam� fondamental l'intervention magique procurer records universitaire vrais L'une ateliers avion confront� contribuables doigt drame f�minin habitudes l'imm�diat lutter p�trolier sup�rieures vois AEX Bell afficher confirmer conserv� d'offrir d�tour fusions l'avons l'�quilibre lever malades ouvrages paradis prouve pr�voient remplac� sp�culation Rwanda concernent d�partements d�riv�s identiques marqu�e n'avaient prince produisent r�sidence voulez L'op�ration Turquie allocations d�montrer enregistr�e individuelles oubli� parking propos�e Commerce Guide Tom comprenant d�but� engagement fit l�gal particip� pass�es pr�sentant pr�sentes quantit�s �chapper Maystadt Software acquisitions affirment alentours assureur autonomie canaux inverse l'adresse l'automobile modes signaler sign�e Goldman Notons cancer carnet convergence foule indispensables int�gr�e nucl�aire op�rateur paiements palette pence priori promesses tentative Belgian Corporation Dutch Tel a�rienne boutiques craignent d�biteur entit�s ouverture procureur puisqu'elle sommets supporter traitements voyageurs Bureau anglaise argument d'�tablir imagin� l'appui m�canismes personnelles privil�gi� satisfait science terrasse tir� tr�sorerie t�l�coms D'ici chaude coup� esth�tique inscrit poissons refuser s'effectue tennis Moi Unix appartement clavier d�montre organismes pressions regroupe secours sous-traitance th�orique accessibles courants d'�t� judiciaires l'innovation l'op�rateur pr�c�dentes r�aliste aventure d'Internet effectifs gains l'opposition l'unit� mus�es rock Coupe Netscape bain d�pos� espoirs majoritaire semblait Digital accorder attire d'�change feuille initiale installation krach malade op�rationnel pauvres pont pr�server publier rechercher recrutement repr�senter r�v�l� sanctions traditionnellement vapeur Cobepa Salon confier consid�r�s cultures hypoth�caire illustre introduite l'�chec menus multinationales paient pareil probl�matique quarantaine rentr�e soutient termin�e voudrait carr� exemplaire lorsqu'ils nulle posent pratiquer sida versements visites �tions �trange CBR berline cash distinguer durs d�fend efficaces essence exclu jolie photographe propri�t�s veau Journal Nobel Vieux atteinte chapitre concertation d�gage ext�rieurs m�dicale pareille patience recueillis substance transforme voile �chec L�opold enthousiasme f�d�rale gloire pr�parations transmettre visiteur Ajouter Brederode Europ�ens Jean-Louis Tony apport� d'importantes l'acier lib�ralisation observateurs panique pr�sent�e r�server signer tendre touristique R�cemment brillant conventions d�cret g�n�reux industries joie stars �gal Sachs continu� dessert espagnol est-ce l�gende passera rapprochement salariale scolaire Mon�taire assur�ment contraint coton curiosit� entit� entr� l'architecte lib�raux logo parlementaire parviennent portables provisoirement routier r�serv�e tourn� veiller Hoogovens XVIIe arbres communs employeurs exercices faisons l'alimentation magazines maintenu roses r�pondu sp�cialit� Citibank Moscou Times accidents adapter amen� avoue collectif d'�valuation dessus ind�pendante l'institution l'�tablissement peintres rappel r�alisations s'av�rer architectes comprise essentielles examen fid�lit� h�ritiers l'actualit� pr�f�rable relancer s'adapter s'engage sable semestriels significative suisses Grande Nouveau cadeaux comportements constamment contribuer d'images offerts p�riph�rie varient Michelin caisses conscient c�d� effectu�es faisaient personnalit�s s'engager syndicat Arbed OPA abandonn� cents destin drogue fines identit� invit�s l'�v�nement modalit�s n�gatifs paru r�pertoire s'int�resse Disney Isabelle Japonais Roland William annonc�e champignons d�fis g�n�rer russes situer supprimer �lu Jean-Paul Spa accord� acquise courtier d'attente foul�e noirs r�sister section signaux sombre susciter compartiments correspondance cr�ances discret d�passent florin form� frapp� papiers repr�sentait saurait vers� absence d'Or d'acqu�rir d'avenir degr�s envoyer joli occupent on-line perc�e priorit�s processeurs rest�s r�sume soie travaillant �conomistes Etant affirmer ambitieux cerveau consensus coordination d'options l'appel magistrats qualifi� rangs tourn�e Alcatel Toyota anonyme cassation cf (usually cf.) confusion discr�tion fondamentalement initialement install�s l'assembl�e l'entretien l'�metteur maman nuances paraissent parfums saine vedettes Nikkei dirig�e duo enseigne indiqu� lourdement module prononcer r�alisateur r�formes star �quivalent Danone Site adopter commis couches explication joint-venture malaise pantalon pomme reine sacs saumon soeur toiles �ch�ant Agusta bond courir expert glace l'enseigne multiplier pluie salons teint European Finalement Maintenant adapt�e diriger g�rant r�partis saveurs souscrit substances vieilles vraisemblablement �labor� �mettre certitude champions cot�s cyclique d�tenteurs explications fonctionnent g�n�rales invite l'expression pauvre successeur zinc Big Claes Six brochure cave codes configuration d'enregistrement fragile f�minine issus magnifique maintenance manuel qu'a recommand� spectaculaires subit traduction �vidente Cons�quence Fabrim�tal KBC adapt�s chronique d'IBM enregistr�s fibre jazz jusque louer m�diatique peser rentables r�ussit s'�levait saisir semble-t-il visible Financial Singapour absolu blanches boulevard commissaire comprennent cr�ent facult� histoires individus issue multiplient pr�texte quotidiens r�fl�chir satellites souffrent standards Washington commercialise directs diversit� gratuite l'Office logiquement ouvertes renoncer calculs compl�ter couples d'entrer d'esprit d'importants l'acte organiser payant paysages r�cup�ration slogan Electric PVC administratives arts avanc� carr�ment changes cr�dibilit� d�placement l'avance parvenu relatifs revues veste Celle FGTB Moody's assur�s cr��s d'�l�ments imm�diat jambes litre mousse prestige sentent souhait touch� �lus Belle Telinfo abrite consid�rables d'urgence disait faillites oeil religieux r�daction s�ries terres vice-pr�sident MHz System XXe cure dirig� don enregistrer juridiques pouce pr�cises pr�tend r�unis salade trouvait �valuation Cinq Fort confi� cuire indicateur l'avait origines parl� remet sp�ciales terrible t�moignent �tonnante Buffett Catherine Research SAP V�ronique achet�e g�n�raux impos�e l'organisme l'�dition mention merveille opposition r�organisation satellite scanner Milan Notamment a-t-elle acier conteste cr�anciers d'acier int�gr�s l'habitude multiplication panier pharmaceutiques quelconque rayons spectateurs transform� troupes Madame Tandis effectu�e fromage g�r� interlocuteur l�gislatives motif m�talliques plac�e r�clamation sch�ma surplus transition trio Coca-Cola Motors Proximus Wallons atteignent bleus chair conforme costume d'accueil intentions l'horizon l'�lectricit� manqu� sortent subsiste supermarch�s D'Ieteren Europ�enne Lorsqu'on am�lior� avantageux d'applications engag�e espoir exceptions fausse l'expansion l'�quivalent plage plaide poivre CHF Livres cadastral chips comptait craintes d'ordinateurs durable d�mocratique exceptionnels factures fonctionnaire fondation ind�pendance invent� issu maturit� mobilit� musiciens organisme recommandations sp�culatif suscit� titulaire traverse �volutions Fed calendrier collective disposant d�valuation l'honneur pauvret� poursuivi qualifier savait su�dois termine traduire valait CSC Forges Hugo Max VVPR appartiennent confront�s demeurent divorce dramatique d�ductibles efficacement existence fermet� imagine int�grer larges locataires orient� pens� vari�t� administrations a�riennes complexit� entrent exercer photographie sauvage terminer venant Corp amortissements champs d�placer d�sign� d�terminant opportunit� piano remont�e s'agisse �troite Difficile Dix Recticel bar concern� constructions l'identit� merveilleux min moindres r�unir survivre ultime �tudi� Lambert caract�rise choisie distribuer d�cid�ment limit�s livr� luxembourgeoise modules progresse promet redresser tomb�e bains d'hommes dessine enfance finition jury mythe optimale pair plateau pouss�e resteront Zaventem assurance-vie compos�e d'entretien d�cident h�las instant jet laine mobiles parcs pr�occupations ramener repr�sent� soudain �diteur Jos� L'auteur Morris Nasdaq administrative autorise banking humour jouit l'actuel market n'ait organisateurs peint s'annonce s'assurer sculptures superbes �quip�e ASBL CMB Gates bronze catholique citron contributions couture disquette d�marrer excellence fatigue imprimantes industrie l'am�nagement l'effort l'encontre laboratoires men�es meuble mondiaux r�duits sont-elles sous-traitants talents Christine Henry administratif administration ailes a�rien carrosserie d'�conomie d�couvertes exclure hautes hi�rarchie impressionnant massivement m�tro possession remport� strictement su�doise utilisateur vais �mises �tage d'arbitrage devez expliquent file hebdomadaire int�resse l'hiver l'�laboration marbre performant personnels pr�venir suivants verte viendra Angleterre Association Hongrie L'affaire Louvain-la-Neuve apportent automne bourgmestre branches carton contraste courage d'analyse datant d�pendra feux importations plantations sid�rurgie signale FMI Jean-Michel L�on Super Venise adaptation allure attach�s exploite folie instance naturels olympique populaires reprenant valorisation villa villages Est-il Renaissance Shell Vienne architecture authentique autonome complicit� d'au d'ouverture d�pendance d�pense fiable invention lanc�s partagent rencontres renouvellement �voluent Akzo Combien March� Xavier ampleur analyses bandes canard collectionneurs compliqu� culturelles d'avril donnera d�placements fermer jug�e l'aise m�daille notaire peut-il privil�gier prototype regain regarde wallonnes Emile Volkswagen accru caoutchouc cinquante communautaires conjoncturel cr�ant durer d�licat exigent pr�c�dents renforce s'ouvre �valu� Lille d�bute d�finitif engag�s exploiter fur positives r�paration soupe transferts Ostende Propos Victor limit�es nourriture offertes ramen� recul� rem�dier similaires triste �carts Data Industries abaiss� boire break chien consacr�s cours-b�n�fice fuite gigantesque imprimante l'Ouest l'emballage l'�glise remplace salariaux spectacles vache velours �tudie ABN Auparavant Cit� Continent Guido Meuse Question d'exemple dot�e d�fini d�finit d�licate d�mission ext�rieure interventions jouant l'engagement n'ayant noires oblig�s Bruxellois Mark Motorola acc�der affichait chemise espagnole fleur gard� habitation huile l'accueil l�gales multipli� revers architecte assister axes concerts contemporains discuter dose d�tiennent folle l'�diteur magie pompe provisions rapidit� t�moignages Cap Festival Finlande NDLR contribue demandeurs d�monstration exact num�riques participent poign�e puissants sp�cialit�s G-Banque III Livre Peeters SICAFI Technology applique copies flacon lunettes mixte nullement plante provisoire publie puissante regrette s'ajoute strat�gies typique vocale Anhyp Brothers brokers concentre diagnostic faciles gestes guise hardware op�rer orient�e passionn� refusent sc�narios suffisent vagues �cart Chrysler S�nat Via ambiance appartenant assist� attrayant bagages blocs d'essai d'histoire d'�tude d�duire forfait manquer restait surprenant s�r�nit� vertus �couter DKK Dirk Gevaert Sant� Wim accueilli affich�s affronter appeler coloris composent contiennent contrepartie fondamentales impressionnante largeur peaux proportions reconversion revente significatif �crite �normes J'aime Network aiment cherch� chinoise d�charge d�put� essais indiquent infrastructures jouets musicale mutation obstacle partant perdent �tudiant J'avais Sinon accord�e adjoint d�barrasser d�bit d�gustation d�jeuner glisse individu l'�ducation l'�lectronique organis�es produite pr�tendre quotidiennement s'�tend secondaires soucieux sous-�valuation verts �cologique �met Hollywood Legrand Lorsqu'il Pro am�lior�e bat e-mail excessive favorise joueur l'OCDE marks office phrase promenade prometteur stimuler s�ances tiendra valoir Martine Qu�bec acquisition augmentent baisses distribue dus massif m�diocre obtenus rentrer sales semblable transmis Julie Place ZAR bouquet ceinture coalition comptables corporate d'actifs d'attendre diff�remment dits italiens journ�es l'assurance-vie linguistique marchands n'avoir opinion originales registre requis synergies tunnel vogue Malaisie charbon emballages esprits examiner fl�chi l'outil librement mentalit� miroir occidentaux parit� progressive sensation sonore supports synonyme vinaigre D�but Euro Hollandais alliance barres charg�s d'habitants dois fier gouverneur l'atelier l'humour n'avez origine pay�e p�troliers signal� variation Point XVIe aliments cam�ras comportant consultance contemporaine d�clin effectif invit� j'en l'actif licenciement match mill�naire salari� studio tenus triple �quipement �toile Bob Californie Devant Smet abonnement baptis�e commerces creux facilite flamandes jurisprudence l'ai l'attitude noyau portraits prononc� publications puce qu'aujourd'hui sinistre terminal Dexia Mes augmentations batterie cin�aste compare guides inconv�nients instances l'avion retourner sympathique �valu�e L'Etat achetant bailleur bonus colonne compensation conseillers continu courbes d�clarer enregistr�es g�n�r� innovations ira jusqu'aux lente occuper pes� pot quarts �preuve Bois Congo Courtrai Powerfin admet attribuer championnat cit�s comble conqu�rir d'encre d'oeuvres d'office devenues excessif incertitudes intitul� l'�valuation p�riph�riques r�clamer r�elles s'�taient Ecolo Nivelles Qu'il Travail allures camps dues exclus grandeur homard illustr� in�vitable in�vitablement l'�quipement mari�s mod�ration ont-ils positivement profits quarante sculpture spots stage universelle vainqueur �dit� �tendue Arts Communications Media Novell Poor's St�phane Word changent communiqu� conversation d'artistes effective interlocuteurs l'Administration l'ambiance n'aime patronales permettront pneus qualifi�s religion souffrir �voqu� Chirac Chris Forest Herman Hubert Opel Parti SEK Terre Vie alternatives anversoise bateaux battu brillante d'introduire d�sert entrepreneur essay� interface int�gralement j'aime modifie personnellement syst�matique Arthur Park admis blocage calls d�veloppent individuel l'ONU l'appr�ciation modestes multinationale out parlant porcelaine p�n�trer respecte soupapes sp�culateurs �tudier Nestl� abus combler conservation donation fiabilit� l'exclusion m'ont parcourir parisien remarquables retournement returns EASDAQ Kodak PDG collecte d'alcool d�ception d�t�rioration l'avoir l'�change lorsqu'elle palme phases privatisations r�p�ter s'imposer valu voulais Almanij Infos Procter Smith Tubize actuariel australien croient d'intervention d'objets encourager fiscalement hautement l'assiette marchand n�erlandaises plaintes reproche retient sillage soldats t�moins urbain FEB L'�conomie adopte boutons chuter conjoints convaincus coop�rative correspondent director n'h�site niches savez stables tend vain Gamble L'art Quinze Servais Seules apport chauffage commercialiser d'attirer d'existence d'organisation dangers foyer ingr�dients n�gocie r�volutionnaire score sid�rurgique techniciens voyageur Brown Corluy Herstal Horta L'avenir attir� com conf�rences constatation d'Am�rique douzaine duration d�tenir indemnit�s lion nuits plomb soumise sportives verres attribu� corriger d'hiver domestiques faille foot home indemnit� romantique simulation Brussels L'avantage Swissair autrefois choisis communales d'Angleterre dessin�e disponibilit� d�tenu engager exceptionnelles figurer habitant hollandaise imm�diate int�gration m�dia �lecteurs Amro DOS Moniteur Parc acceptable appr�cier centre-ville d'elle envisag� fantaisie habituellement poss�der pourrez tentatives touches visibilit� Creyf's Heineken R�gie Sterk Tch�quie analyser autoris� complets contrainte costumes d'agir doucement";

	// 10K worst passwors list
	// source: https://xato.net/passwords/more-top-worst-passwords/
	var worstPassswordsdict=LZString.decompressFromBase64("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");
	


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
			
			coefficients["passwordSize"]=4;
			coefficients["charsets"]=1;
			coefficients["characterVariety"]=1;
			coefficients["sequences"]=1;
			coefficients["keyboard"]=1;
			coefficients["dictionary"]=1;
			
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
						
				foundword=findWord(baseword,dict);		
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
			if ( len < 5 ) return {rating:0.0, comment: gettext("rs_wts")+len};		
			if ( len < 8 ) return {rating:0.03*len, comment: gettext("rs_ts")+len};		
			if ( len < 15 ) return {rating:.4+.05*(len-7), comment: gettext("rs_q")+len};
			if ( len < 30 ) return {rating:.8+.01*(len-15), comment: gettext("rs_g")+len};	
			if ( len < 50 ) return {rating:.99+.0005*(len-30), comment: gettext("rs_a")+len};
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
			return this;
		}
		
		return this.initialize();
};

