
var spt=new SecurePassword();


test( "ShouldFind3Sequences", function() {
	deepEqual( spt._findSequences("abcdefABCDEF123456"), new Array("abcdef","ABCDEF","123456"), "Should Find 3 Sequences in abcdefABCDEF123456" );
});

test( "ShouldFind2Sequences", function() {
	deepEqual( spt._findSequences("abcdefedcba"), new Array("abcdef","fedcba"), "Should Find 2 Sequences in abcdefedcba" );
});

test( "ShouldFind1Sequence", function() {
	deepEqual( spt._findSequences("abbbbbbbbbbbbbfjl;"), new Array("ab"), "Should Find 2 Sequences in abbbbbbbbbbbbbfjl;" );
});

test( "ShouldRateAllSequencePoorly", function() {
	QUnit.close( spt._rateSequences("abcdefABCDEF123456").rating, 0.00, .00001, "Should rate the all sequences string with 0.01" );
});

test( "ShouldRateNoSequenceWith1", function() {
	QUnit.close( spt._rateSequences("a1b2c3d4e5f6A7B8C9D0EaFb1c2d3e4f5g6").rating, 1.0, .00001, "Should rate no sequences string with 1.0" );
});

test( "ShouldRate50PercSequence", function() {
	QUnit.close( spt._rateSequences("abcdefksd;cm").rating, .65,.00001, "Should rate 50% sequences string with 0.65" );
});

test( "ShouldRate10percSequenceWith1", function() {
	QUnit.close( spt._rateSequences("abd;cmbgnhmjliptkrhe").rating, 1.0, .00001, "Should rate 10% sequences string with 1" );
});

test( "ShouldRate70PercSequence", function() {
	QUnit.close( spt._rateSequences("abcdefg,1.").rating, .33, .00001, "Should rate 70% sequences string with .33" );
});

test( "ShouldRate60PercSequence", function() {
	QUnit.close( spt._rateSequences("abcdef,1.s").rating, .54, .00001, "Should rate 60% sequences string with .54" );
});

test( "ShouldRate58PercSequence", function() {
	QUnit.close( spt._rateSequences("abcdefg1.,1.").rating, .5566, .0001, "Should rate 58% sequences string with .5566" );
});

test( "ShouldFind1FromCharsetA", function() {
	ok( spt._hasOneFromCharset("ABCDEF","AB"), "Should Find A or B in AB" );
});

test( "ShouldFind1FromCharsetA", function() {
	ok( !spt._hasOneFromCharset("CD","AB"), "Should Find no C nor D in AB" );
});

test( "longestCommonSubstringBasicTest", function() {
	deepEqual( spt._longestCommonSubstring("AB","ABCD"), {length: 2,sequence: "AB",offset: 0} , "longestCommonSubstring: Should Find AB in common between AB and ABCD" );
});

test( "longestCommonSubstringNoCommonalityTest", function() {
	deepEqual( spt._longestCommonSubstring("AB","kjkjfsdkjlsjksdjkfjsd"), {length: 0,sequence: "",offset: null} , "longestCommonSubstring: Should not find any common substring" );
});

test( "longestCommonSubstringANotherTest", function() {
	deepEqual( spt._longestCommonSubstring("12qwerty.1235df","qwertyuiop[]asdfghjkl;'#zxcvbnm,./"), {length: 6,sequence: "qwerty",offset: 2} , "longestCommonSubstring: Should Find AB in common between AB and ABCD" );
});

test( "rateKeyboardLayoutZeroTest", function() {
	deepEqual( spt._rateKeyboardLayout("").rating, 0 , "rateKeyboardLayout: should rate no password " );
});

test( "rateKeyboardLayoutNoCommonalityTest", function() {
	deepEqual( spt._rateKeyboardLayout("1f2s3qpfd").rating, 1.0 , "rateKeyboardLayout: should rate good password " );
});

test( "rateKeyboardLayoutLowCommonalityQWERTYTest", function() {
	QUnit.close( spt._rateKeyboardLayout("12qwerty.1235df").rating, .6, .00001 , "rateKeyboardLayout: should rate medium password " );
});

test( "rateKeyboardLayoutLowCommonalityAZERTYTest", function() {
	QUnit.close( spt._rateKeyboardLayout("12azerty.1235df").rating, .6, .00001 , "rateKeyboardLayout: should rate medium password " );
});


test( "rateKeyboardLayoutLowCommonalityQWERTZTest", function() {
	QUnit.close( spt._rateKeyboardLayout("12ycxvbn.1235df").rating, .6, .00001 , "rateKeyboardLayout: should rate medium password " );
});


test( "rateKeyboardLayoutHighCommonalityQWERTZTest", function() {
	QUnit.close( spt._rateKeyboardLayout("12ycxvbn.12").rating, .2272, .0001 , "rateKeyboardLayout: should rate low password " );
});


test( "rateKeyboardLayoutVeryHighCommonalityQWERTZTest", function() {
	QUnit.close( spt._rateKeyboardLayout("1asdfghjkl.").rating, .04545, .00001 , "rateKeyboardLayout: should rate low password " );
});

spt.unloadAllDictionaries();
var minifrenchdict=	"bleu super autre bizarre difficile machin machine dr�le �trange facile grave impossible jeune juste libre malade m�me pauvre possible propre rouge sale simple tranquille triste vide bonne toute doux faux fran�ais gros heureux mauvais s�rieux vieux vrai ancien beau blanc certain chaud cher clair content dernier d�sol� diff�rent entier fort froid gentil haut humain important joli l�ger meilleur mort pareil plein pr�t prochain quoi vert vivant aide chef enfant garde gauche geste gosse livre merci ombre part poche professeur tour fois madame paix voix affaire ann�e arme arm�e attention balle bo�te bouche carte cause chambre chance chose classe confiance couleur cour cuisine dame dent droite �cole �glise envie �paule �poque �quipe erreur esp�ce face fa�on faim famille faute femme fen�tre f�te fille fleur force forme guerre gueule habitude heure histoire id�e image impression jambe joie journ�e langue lettre l�vre ligne lumi�re main maison maman mani�re marche merde m�re minute musique nuit odeur oreille parole partie peau peine pens�e personne peur photo pi�ce pierre place police porte pr�sence prison putain question raison r�ponse robe route salle sc�ne seconde s�curit� semaine situation soeur soir�e sorte suite table terre t�te v�rit� ville voiture avis bois bras choix corps cours gars mois pays prix propos sens temps travers accord agent amour appel arbre argent avenir avion bateau b�b� besoin bonheur bonjour bord boulot bout bruit bureau caf� camp capitaine chat chemin ch�ri cheval cheveu chien ciel client c�ur coin colonel compte copain c�t� coup courant d�but d�part dieu docteur doigt dollar doute droit effet endroit ennemi escalier esprit �tat exemple fait film flic fond fr�re front gar�on g�n�ral genre go�t gouvernement grand groupe homme honneur h�tel instant int�r�t int�rieur jardin jour journal lieu long ma�tre mari mariage matin m�decin m�tre milieu million moment monde monsieur mouvement moyen noir nouveau num�ro oeil oiseau oncle ordre papa papier parent passage pass� patron p�re petit peuple pied plaisir plan point pouvoir premier pr�sent pr�sident prince probl�me quartier rapport regard reste retard retour r�ve revoir salut sang secret seigneur sentiment service seul si�cle signe silence soir soldat soleil sujet t�l�phone tout train travail trou truc type vent ventre verre village visage voyage fils gens abandonner accepter accompagner acheter adorer agir aider aimer ajouter aller amener amuser annoncer apercevoir appara�tre appeler apporter apprendre approcher arranger arr�ter arriver asseoir assurer attaquer atteindre attendre avancer avoir baisser battre boire bouger br�ler cacher calmer casser cesser changer chanter charger chercher choisir commencer comprendre compter conduire conna�tre continuer coucher couper courir couvrir craindre crier croire danser d�cider d�couvrir d�gager demander descendre d�soler d�tester d�truire devenir deviner devoir dire dispara�tre donner dormir �chapper �couter �crire �loigner embrasser emmener emp�cher emporter enlever entendre entrer envoyer esp�rer essayer �tre �viter excuser exister expliquer faire falloir fermer filer finir foutre frapper gagner garder glisser habiter ignorer imaginer importer inqui�ter installer int�resser inviter jeter jouer jurer l�cher laisser lancer lever lire maintenir manger manquer marcher marier mener mentir mettre monter montrer mourir na�tre obliger occuper offrir oser oublier ouvrir para�tre parler partir passer payer penser perdre permettre plaire pleurer porter poser pousser pr�f�rer prendre pr�parer pr�senter pr�venir prier promettre proposer prot�ger quitter raconter ramener rappeler recevoir reconna�tre r�fl�chir refuser regarder rejoindre remarquer remettre remonter rencontrer rendre rentrer r�p�ter r�pondre reposer reprendre ressembler rester retenir retirer retourner retrouver r�ussir r�veiller revenir r�ver rire risquer rouler sauter sauver savoir sembler sentir s�parer serrer servir sortir souffrir sourire souvenir suffire suivre taire tendre tenir tenter terminer tirer tomber toucher tourner tra�ner traiter travailler traverser tromper trouver tuer utiliser valoir vendre venir vivre voir voler vouloir";

test( "loadDictionaryTest", function() {
	deepEqual( Object.keys(spt.loadDictionary( minifrenchdict, "french")["french"]).length, 584 , "loadDictionaryTest: should have 600 words" );
});


test( "findWord Test: should find matching word", function() {
	deepEqual( spt._findWord("vieux",spt.loadDictionary( minifrenchdict, "french")), {word:"vieux",dictionary:"french"} , "findWord Test: should find matching word" );
});

test( "findWord Test: should not find missing word", function() {
	deepEqual( spt._findWord("obshedjs",spt.loadDictionary( minifrenchdict, "french")), {word:"",dictionary:""} , "findWord Test: should not find missing word" );
});

test( "findWord Test: should find longest starting matching word", function() {
	deepEqual( spt._findWord("vieuxobshedjs",spt.loadDictionary(minifrenchdict, "french")), {word:"vieux",dictionary:"french"} , "findWord Test: should not find missing word" );
});

test( "rateDictionary : should rate no word", function() {
	QUnit.close( spt._rateDictionary("b/s2h,e.d/j@s",spt.loadDictionary(minifrenchdict, "french")).rating,  1.0, .00001 , "rateDictionary Test: should rate good password" );
});

test( "rateDictionary : should rate one word badly", function() {
	QUnit.close( spt._rateDictionary("vieux",spt.loadDictionary(minifrenchdict, "french")).rating, 0.00, .00001 , "rateDictionary Test: should rate one word badly" );
});


test( "rateDictionary : should rate not only one word ", function() {
	QUnit.close( spt._rateDictionary("vieuxmachin",spt.loadDictionary(minifrenchdict, "french")).rating, 0.46, .01 , "rateDictionary Test: should rate not only one word" );
});

test( "gettext Test: should find starting matching word", function() {
	spt.setLanguage("default");
	deepEqual( spt._gettext("test_str"), "test(en)" , "gettext Test: should find test string" );
});
test( "gettext Test: should find French starting matching word", function() {
	spt.setLanguage("fr");
	deepEqual( spt._gettext("test_str"), "test(fr)" , "gettext Test: should find French test string" );
});
