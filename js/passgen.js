
// Make easy to remember
//  # short sequence of number
//  # one punctuation
//  # two sequences of alpha starting with uppercase and mixing voyels and consons
// In any order

// Make based on dictionnary

// Or make rough and complex

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
enableDefaultCharsets();

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

// Dictonaries
// English
var englishdict="the and that was his with for had you not her which have from this him but all she they were are one their said them who would been will when there more out into any your what has man could other than our some very time upon about may its only now like little then can should made did such great before must two these see know over much down after first good men own never most old shall day where those came come himself way work life without make well through being long say might how too even def again many back here think every people went same last thought away under take found hand eyes still place while just also young yet though against things get ever give god years off face nothing right once another left part saw house world head three took new love always mrs put night each king between tell mind heart few because thing whom far seemed looked called whole set both got find done heard look name days told let lord country asked going seen better having home knew side something moment father among course hands woman enough words mother soon full end gave room almost small thou cannot water want however light quite brought nor word whose given door best turned taken does use morning myself Gutenberg felt until since power themselves used rather began present voice others white works less money next poor death stood form within together till thy large matter kind often certain herself year friend half order round true anything keep sent wife means believe passed feet near public state son hundred children thus hope alone above case dear thee says person high read city already received fact gone girl known hear times least perhaps sure indeed english open body itself along land return leave air nature answered either law help lay point child letter four wish fire cried women speak number therefore hour friends held free war during several business whether manner second reason replied united call general why behind became john become dead earth boy lost forth thousand looking I'll family soul feel coming England spirit question care truth ground really rest mean different making possible fell towards human kept short town following need cause met evening returned five strong able french live lady subject answer sea fear understand hard terms doubt around ask arms turn sense seems black bring followed beautiful close dark hold character sort sight ten show party fine ready story common book electronic talk account mark interest written can't bed necessary age else force idea longer art spoke across brother early ought sometimes line saying table appeared river continued eye ety sun information later everything reached suddenly past hours strange deep change miles feeling act meet paid further purpose happy added seem taking blood rose south beyond cold neither forward view I've position sound none entered clear road late stand suppose daughter real nearly mine laws knowledge comes toward bad cut copy husband six France living peace didn't low north remember effect natural pretty fall fair service below except American hair London laid pass led copyright doing army run horse future opened pleasure history west pay red an' hath note although wanted gold makes desire play master office tried front big lived certainly wind receive attention government unto church strength length company placed paper letters probably glad important especially greater yourself fellow bear opinion window ran faith ago agreement charge beauty lips remained arm latter duty send distance silence foot wild object die save gentleman trees green trouble smile books wrong various sleep persons blockquote happened particular drew minutes hardly walked chief chance according beginning action deal loved visit thinking follow standing knows try presence heavy sweet plain donations immediately wrote mouth rich thoughts months won't afraid Paris single joy enemy broken unless states ship condition carry exclaimed including filled seeing influence write boys appear outside secret parts please appearance evil march george whatever slowly tears horses places caught stay instead struck blue York impossible period sister battle school Mary raised occasion married man's former food youth learned merely reach system twenty dinner quiet easily moved afterwards giving walk stopped laughed language expression week hall danger property wonder usual figure born court generally grew showed getting ancient respect third worth simple tree leaving remain society fight wall result heaven William started command tone regard expected mere month beside silent perfect experience street writing goes circumstances entirely fresh duke covered bound east wood stone quickly notice bright Christ boat noble meant somewhat sudden value c. direction chair due support tom date waiting Christian village lives reading agree lines considered field observed scarcely wished wait greatest permission success piece british Charles formed speaking trying conversation proper hill music opportunity that's German afternoon cry cost allowed girls considerable broke honour seven private sit news top scene discovered marriage step garden race begin per individual sitting learn political difficult bit speech Henry lie cast eat authority etc. floor ill ways officers offered original happiness flowers produced summer provide study religion picture walls personal America watch pleased leaves declared hot understood effort prepared escape attempt supposed killed fast author Indian brown determined pain spring takes drawn soldiers houses beneath talking turning century steps intended soft straight matters likely corner trademark justice simply produce trust appears Rome laugh forget Europe passage eight closed ourselves gives dress passing terrible required medium efforts sake breath wise ladies possession pleasant perfectly o' memory usually grave fixed modern spot troops rise break fifty island meeting camp nation existence reply I'd copies sky touch equal fortune v. shore domain named situation looks promise orders degree middle winter plan spent allow pale conduct running religious surprise minute roman cases shot lead move names Word stop higher father's threw worse built spoken glass board vain affairs instance safe loss doctor offer class complete access lower wouldn't repeated forms darkness military warm drink passion ones physical example ears questions start lying smiled keeping spite shown directly james hart serious hat dog silver sufficient main mentioned servant pride crowd train wonderful moral instant associated path greek meaning fit ordered lot he's proved obliged enter rule sword attack seat game health paragraph statement social refund sorry courage members grace official dream worthy rock jack provided special shook request mighty glance heads movement fee share expect couldn't dollars spread opposite glory twelve space engaged peter wine ordinary mountains taste iron isn't distribute trade consider greatly accepted forced advantage ideas decided using officer rate clothes sign feelings native promised judge difference working anxious marry captain finished extent watched curious foreign besides method excellent confidence marked 'em jesus exactly importance finally bill vast prove fancy quick yes sought prevent neck hearts liberty interesting sides legal gentlemen dry serve aside pure concerning forgotten lose powers possessed thrown evidence distant michael progress similar narrow altogether building page particularly knowing weeks settled holding mountain search sad sin lies proud pieces clearly price ships thirty sick honest shut talked bank fate dropped judgment conditions king's accept hills removed forest measure species seek highest otherwise stream honor carefully obtained ear bread bottom additional presented aid fingers remembered choose agreed animal events there's fully delight rights amount obtain tax servants sons cross shoulders thick points stranger woods facts dare grow creature hung rain false tall gate nations created refused quietly surface freely holy streets blow july regarded fashion report coast daily file shoulder surprised faces succeeded birds distribution royal song wealth comfort failed freedom peculiar anyone advance gentle surely animals waited secure desired grass touched occupied draw stage portion expressed opening june spirits fish tongue capital angry growing served carriage weather breast presently snow david papers necessity practice claim hast education sharp prince permitted group enemies robert played throughout pity expense yours million add pray taught explained tired leading kill shadow companion weight mass established suffered gray brave thin satisfied check virtue golden numerous frequently famous telling powerful alive waters national weak divine material principal gathered suggested frank valley guess finding yellow heat remains bent seized guard equally naturally box remarkable gods moon slight style pointed saved windows crossed louis pounds ain't evidently principle immediate willing consequence richard principles characters paul season remarked science tender worked grown whispered interested quarter midst liked advanced apparently bore pwh active noticed aware thomas uncle list dangerous august calm genius sacred kingdom entire popular unknown nice habit spanish familiar reader published direct handsome you'll joined actually kings posted approach washington hearing needed increased walking twice throw intellectual appointed wisdom ceased truly numbers demanded priest wounded sorrow drive fault listened palace affair contact distinguished station beat distributed listen italy fool becomes watching hurt wants express occurred favour height size edge subjects task follows interests nine sympathy burst putting dressed lifted hopes suffer noise smiling rode tells minds farther literature vessel affection suffering proceeded flesh advice grand carrying legs spain post collection empty rank storm god's imagine wore duties admitted countries pocket arrival imagination driven loud sentence lovely extraordinary november december happen absence breakfast population thank rules inhabitants series laughing address relief bird owner impression satisfaction coat prepare relations shape birth rapidly smoke January mother+'s machine content consideration accompanied regular moving stands wholly teeth busy treated burning shame quality bay discover inside brain soil completely message ring resolved calling phrase acts mention square pair won title understanding Sunday fruit mad forces included tea rocks nearer slaves falling absolutely slow bearing mercy larger explain contain grief soldier wasn't countenance previous explanation welcome proposed prayer stars germany belief informed moments poetry constant buy final faithful ride policy supper drawing excitement dying demand fighting fields drove upper sum philip motion assistance forty april stones edward fees kindly dignity catch october seated knees amongst current sending parties objects gained bitter possibly slave separate loose text receiving worst sold don credit chosen hoped printed terror features fond control capable fifteen doesn't firm superior cruel spiritual harry splendid proof pressed sooner join process crime dust instantly lands relation doors concerned deeply practical colour sing destroy anger distributing results increase reasons nose friendly entrance rooms admit supply clean useful yesterday delicate fail continue remove addressed choice huge needs wear blind unable cover double victory dozen constantly level india release rough ended shows fly praise devil ahead smith connected degrees gain addition committed chamber notes italian gradually acquaintance bought souls mission sacrifice cities mistake exercise conscience based car buried theory commanded nobody minister closely energy dick bare fought partly mistress hate arose playing color lake safety provisions description asleep centre faint thinks parents escaped careful enjoy drop brilliant brief bringing worship goods tale skin roof grey highly crown castle excited throne stated despair ease attached total kindness mile citizens circle dull extreme clouds figures intention prison term assured hidden thoroughly cup member civil apply labor everywhere intelligence strike fairly comply fellows haven't event gently connection protection conscious edition directed pulled flight evident surrounded wishes yards voices weary couple variety whilst volume details older requirements custom apart bow awful everybody labour asking lover showing introduced suit becoming composed plans rendered pictures lest volunteers singing eager precious paused require meat whenever milk dogs successful plants vision rare granted raise egypt manners cousin you've development arthur obs cool trial learning approached bridge abroad devoted paying literary writer israel disappeared interrupted stock readers dreadful female protect accustomed virginia type recognized salt destroyed signs innocent temper plenty pope avoid hurried represented favor mental attitude returning admiration brothers anxiety queen teach count curiosity solemn causes vessels compelled dance hotel wicked fled kissed guns fill visible younger guide earnest actual companions prisoner miserable lad harm views irish utterly ends shop stairs pardon gay beg seldom kinds record fat sand violent branches inquired september worn ireland flat departure delivered gift ruin skill cattle Word equipment temple calls earlier license visited consent sufficiently natives wound laughter contained perceived scattered whence rushed chiefly bold anywhere witness foolish helped kitchen sell anybody self extremely treatment throat dreams patient speed growth quantity latin immense conclusion computer affected severe excuse triumph origin joseph slept eternal thine audience pages sounds swift limited wings stepped services library remaining containing base confusion win maid charming editions attended softly reality performed glorious likewise site sail frightened acquainted unhappy feared article prisoners store adopted shalt remark cook thousands pause inclined convinced band valuable hence desert effects kiss plant ice ball stick absolute readily behold fierce argument observe blessed bosom rage striking discovery creatures shouted guilty related setting forgot punishment gun slightly articles police mysterious extended confess shade murder emotion destruction wondered increasing hide expedition horror local expenses ignorant doctrine generous range host wet cloud mystery waste changes possess consciousness february trembling disease formerly spend production source mankind universal deck sees habits estate aunt reign humble compliance delay shining reported hers unfortunate midnight listening flower hero accomplished doth classes thanks banks philosophy belong finger comfortable market cap waves woman's glanced troubled difficulties picked european purposes somewhere delighted pushed press household fleet baby region lately uttered exact image ages murmured melancholy suspicion bowed refuse elizabeth staff liability we'll enjoyed stretched gaze belonged ashamed reward meal blame nodded status opinions indicate poem savage arise voyage misery guests painted attend afford donate job proceed loves forehead regret plainly risk lighted angel rapid distinct doubtless properly wit fame singular error utmost methods reputation appeal she's strongly margaret lack breaking dawn violence fatal render career design displayed gets commercial forgive lights agreeable suggestion utter sheep resolution spare patience domestic concluded 'tis farm reference chinese exist corn approaching alike mounted jane issue key providing majority measures towns flame boston dared ignorance reduced occasionally weakness furnished china priests flying cloth gazed profit fourth bell hitherto benefit movements eagerly acted urged ascii disposed electronically atmosphere chapter begged helen hole invited borne departed catholic files reasonable sugar replacement sigh humanity thrust frame opposition disk haste lonely artist knight quarters charm substance rolled email flung celebrated division slavery verse decision probable painful governor forever turns branch ocean rear leader delightful stared boats keen disposition senses occasions readable beloved inches bones enthusiasm materials luck derived managed community apparent preserved magnificent hurry scheme oil thence reaching dim wretched hanging pipe useless nevertheless print smooth solid pursued necessarily build attempted centuries eggs equivalent hastily burned you'd recent travel cries noon crying generations located cabin announcement britain compared handed cease smaller circumstance tent frequent alarm nervous beast what's aloud independent gates distinction essential observation stronger recovered belonging loving masters writers cf. permanent mortal stern gratitude preserve burden aspect millions merry knife dread clever applicable district shadows jim silk failure links cent sentiment amid profits agent finds russia bade russian desperate union imagined contempt raising lords hell separated grant seriously tribes hit enormous defective conviction secured mixed insisted wooden prefer prayers fever selected daughters treat warning flew speaks developed impulse slipped ours johnson mistaken damages ambition resumed christmas yield ideal schools confirmed descended rush falls deny calculated correct perform hadn't somehow accordingly stayed acquired counsel distress sins notion discussion constitution anne hundreds instrument firmly actions steady remarks empire elements idle pen entering online africa permit th' tide vol leaned college maintain sovereign tail generation crowded fears nights limitation tied horrible cat displaying port male experienced opposed treaty contents rested mode poured les occur seeking practically abandoned reports eleven sank begins founded brings trace instinct collected scotland characteristic chose cheerful tribe costs threatened arrangement western sang beings sam pressure politics sorts shelter rude scientific revealed winds riding scenes shake industry claims pp. merit profession lamp interview territory sleeping sex coffee devotion thereof creation trail romans supported requires fathers prospect obey alexander shone operation northern nurse profound hungry scott sisters assure exceedingly match wrath continually rest. gifts folly chain uniform debt teaching venture execution shoes mood crew perceive accounts eating multitude declare yard o'er astonishment version vague odd grateful nearest infinite elsewhere copying apartment activity wives parted security cared sensible owing martin saturday cottage jews leaning capacity joe settle referred francis holder involved sunshine dutch council princes ate examination steel strangers beheld test noted slightest widow charity realized element shed errors communication reflection attacked organization maintained restored folks concealed accordance heavens star examined deeds wordforms somebody incident oath guest bar row poverty bottle prevented bless stir intense completed quarrel touching inner available fix resistance unusual deed derive hollow suspected contains sighed province deserted establishment vote muttered thither oxford cavalry lofty endure succeed leg bid alice hated civilization u.s. acting landed christians passions interior scarce lightly disturbed rev supreme hang notwithstanding shock exception offering display strain drank confined exhausted poets sounded aim critical jerusalem directions negro fearful standard studied bag buildings consequences commenced deeper repeat driving beasts track rid holds residence steadily intimate drinking swear treasure fun throwing apt enterprise queer seed tower runs defend favourite desires heavily assembled existed depends poems hesitated stuff section settlement staring sole roads plate mexico overcome pains performing dwell grounds taxes marble recently tones ability awake walter wave shaking folk possibility butter fury marched moses writes issued sailed instructions hatred pursuit pull furniture additions hid rope adventure royalty vanished arts elder signal wanting supplied feast safely burn describe references lesson annual card passes application intelligent county beaten presents format flow sixty scale damage marks obtaining moreover commerce startled southern consequently outer belongs ben wrought average naked conducted rivers songs obvious foundation concern ceremony magic campaign hunting carolina liberal whisper largely commonly torn exists contributions hunt teacher christianity lawyer operations detail shortly caesar wondering leaders blessing princess he'd altar tenderness tiny web cardinal sharply regiment chest distinctly purple creating gather depth indignation performance election prosperity gloomy conception clerk decide drunk victim reflected pour preceding individuals gazing absurd lift gesture armies limbs manage brethren hugh plays hastened dragged motive whatsoever pointing verses pronounced exchange definite emperor tendency remote finish flag Word boots enabled administration denied churches rarely earnestly considering previously ugly bears signed genuine harmless mingled obedience walks training badly feed central contrast relieved romance mississippi structure payment pace passages succession persuaded sources inquiry inspired angels roll wilt inch troubles perfection lee wherever owe handle advantages trip shoot fortunate newspaper employment fitted refuge misfortune providence owns cutting beard stirred tear dan resist bob depths maiden determine commission merchant whereas crossing independence lively breeze provinces jean virtues conceived relative solitary smell wandering thereby eighteen locked provision courts eaten historical regarding Florence preferred pick ruined wherein vanity condemned deliver unexpected desk gross lane happens represent billy root holland mud respectable cleared feels fruits testimony milton existing bride rang ranks responsibility beating disappointed suitable depend judges giant grasp arrive simplicity autumn absent legally veil gloom doubtful suspect weapons limits determination feeble prophet shak gathering basis examine corrupt payments returns laying prize instances greeks they're theatre purchase comparison composition rival someone realize defeat demands foe shared consists studies balance intercourse forming slender coach criminal knocked silly humour masses indifferent recall occupation discourse keeps regions intervals assist novel intellect leads hither tales sale revenge lucy yonder resources jealous we're wheel invitation narrative risen burnt sentiments inferior amusement marie flash recognize swiftly portrait create summoned suggest induced conflict fed curse disappointment helpless preparing construction lincoln zeal responsible indicated groups positive germans attracted vengeance fort club cure stout missed gracious include flood satisfy agony respects ventured implied maria stupid seas spaniards grain enjoyment wearing indifference conceal horizon pleasures therein precisely canada day's assume registered estimate steep route gardens visitor closer harmony non thunder wire graceful crept greece childhood knee saddle supplies weeping mostly paragraphs unconscious mutual scorn grows external agents software institutions losing universe clock attempts instruction injury roots receipt jumped dearest sore earliest finest enable discipline motives fastened introduction converted wilderness confused fancied offices slip revolution wedding girl's farmer silently fires wept behalf reckon responded uncertain neglected stroke exquisite engagement dirty rolling platform messenger privilege admirable offers mischief physician imposed organized covering student daring cave wars convey he'll sincere tradition gravely combined gallant sensation travelling charges submit tragedy specific commander inn stiff accompany score virgin farewell paradise villages hunger trembled favorite criticism proprietary customs cotton ruth hospital restrictions outward impressed blows plains flashed rent prey owed longing musical satisfactory ridiculous sheet disgrace colored shouldn't originally samuel wages papa gas inevitable extensive leisure deadly chin claimed glow husband's emotions adam jealousy leaf publication englishman allah jones hostile wandered railway translation procession betrayed pound admired elected pierre sunk ruins eastern roses citizen reminded deceived tables beach starting funeral arrested flour feature correspondence consisted counted reserve proceedings roar romantic twenty-five hut strangely absorbed propose seats bark reception pleasing attained wake research prayed monarch clothing dollar illness calmly obeyed heartily pressing daylight warriors jest abruptly washed comment metal preparations nerves solution pretended sixteen assembly tobacco entity dwelling depart swung bitterly alteration colony disclaimers wing peaceful lion opportunities alarmed furnish resting accused culture writings dwelt conquered trick trusted column financial cunning preparation drama joke entertained mist hypertext shell medicine proofread nest reverence situated yielded conceive appointment lessons fetch tomb candle offence coarse heap mixture homes model men's defect destined occasional fourteen hint knights solicit dreamed objection craft acid namely asia neglect data weapon confessed arrangements repose complying copied pink user heels grandfather other's income i.e. regards streams vigorous accepting bishop lightning authors flames observations compressed sport powder beds orange painting shout austria bath careless chap derivative roused primitive doorway climbed volumes vulgar arguments 1st sunset convenient mail recalled wrapped abode planted paint surrender establish mild promptly appearing department parish stephen nay lit handkerchief basket easier deserve quit assurance mirror plot yer upward sadly secretary adding modest dish cares straw net advised heavenly largest proceeding impatient wounds warmth certainty restless meantime rays salvation lovers experiment shores today tremendous afforded moonlight intend california cultivated flushed shakespeare newspapers rocky pious wont steam improvement garments ned treasury merchants perpetual trained products affectionate dispute visitors poison proposition maybe rifle warned parting shield erected employ prevailed talent rises climate chairs searched unlike recover mate arrange fortunes puzzled committee aged ohio ashes ghost promises bushes effective distinguish manifest comparatively esteem blew revelation wash recognition confession clay nonsense trunk management undoubtedly dried dorothy chiefs coal stolen earthly restore indirectly lasted selfish renewed canoe protest vice races deemed temporary pile frederick chapel moderate spell massachusetts upright quoted area bone solitude instruments formal students greatness struggling monday reproach altered grim leaped venice federal questioned editor desirable acknowledge motionless remedy bestowed pursue representative pole gladly linen vital sink pacific hopeless dangers gratefully president travelled ward nephew cheer bloody siege commands justified atlantic stomach improved admire openly sailors abide advancing forests records polly recorded modification dramatic statements upstairs varied letting wilson comrades sets descent whither envy load pretend folded brass internal furious curtain healthy obscure summit alas fifth center faced cheap saints colonel egyptian contest owned adventures exclusion seize chances springs alter landing fence leagues glimpse statue contract luxury artillery doubts saving fro string combination awakened faded arrest protected temperature strict contented professional intent brother's injured neighborhood andrew abundance smoking yourselves medical garrison likes corps heroic inform wife's retained agitation nobles prominent institution judged embrace wheels closing damaged pack affections eldest anguish surrounding obviously strictly capture drops inquire ample remainder justly recollection deer answers bedroom purely bush plunged thyself joint refer expecting madam railroad spake respecting jan columns weep identify discharge bench ralph heir oak rescue limit unpleasant anxiously innocence awoke expectation incomplete program reserved secretly we've invention faults disagreeable piano defeated charms purse persuade deprived electric endless interval chase heroes invisible well-known occupy jacob gown cruelty lock lowest hesitation withdrew proposal destiny recognised commons foul loaded amidst titles ancestors types commanding madness happily assigned declined temptation lady's subsequent jewels breathed willingly youthful bells spectacle uneasy shine formidable stately machinery fragments rushing attractive product economic sickness uses dashed engine ashore dates theirs adv clasped international leather spared crushed interfere subtle waved slope floating worry effected passengers violently donation steamer witnesses Word specified learnt stores designed guessed roger timber talents heed jackson murdered vivid woe calculate killing laura savages wasted trifle funny pockets philosopher insult den representation incapable eloquence dine temples ann sensitive robin appetite wishing picturesque douglas courtesy flowing remembrance lawyers sphere murmur elegant honourable stopping guilt welfare avoided fishing perish sober steal delicious infant lip norman offended dost memories wheat japanese humor exhibited encounter footsteps marquis smiles amiable twilight arrows consisting park retire economy sufferings secrets halted govern favourable colors translated stretch formation immortal gallery parallel lean tempted frontier continent knock impatience unity dealing prohibition decent fiery images tie punished submitted julia albert rejoined speedily consented major preliminary cell void placing prudence egg amazement border artificial hereafter fanny crimes breathe exempt anchor chicago sits purchased eminent neighbors glowing sunlight examples exercised wealthy seeming bonaparte shouting thanked illustrious curiously inspiration seeds naval foes everyone longed abundant doubted painter greeted erect glasses meanwhile shooting athens wagon lend lent crisis undertake particulars veins polite anna experiences seal header clergy mount array corners magazine loudly bitterness texas guardian searching rejected harsh includes boldly maurice kate lunch pine shells seconds despite hoping injustice expressions flies push tight problems landscape sue protested scarlet abandon artistic mainly measured loyal boiling desirous suited alliance advise waist sinking apprehension stable gregory maximum commit hideous hamilton sweetness dismissed tore affect shaken evils unworthy significance modified miracle lieu peasant considerably observing conveyed resemblance extend riches personally morality rebellion thread dumb inclination forbidden copper differences sailor requested alfred response promoting imperial blank purity victor bending solemnly twenty-four minor del crimson republic teachers ma'am danced bargain dealt fatigue telephone cents whip adams dislike witnessed infantry acres checked countrymen enemy's companies normal shirt addresses introduce sofa mothers sweep conversion sketch african deserved answering virtuous persian anyway thief driver retain constructed daniel philadelphia conspicuous channel nobility edith berlin editing cambridge declaration guards personality smallest excess separation disgust accomplish speeches herbert convent rightly suspended reform mob thirst unnecessary treasures asks viewed designs gleam threatening palm missouri filling quoth fur fortnight holes addressing frightful encourage speaker tribute procure frankly recommended relieve intentions unjust legislation project threshold merits morrow traces induce spear inward pupils corresponding fairy conclude clung neat lucky lap session torture damp ridge spoil liable swords hearty abraham thoughtful traveller chains favorable tin imp. strongest horace dependent couch bills warrant complaint endeavour sails dined convention guarded angle widely illinois charlotte endeavoured ardent cow mill victims prejudice foremost map probability porch lieutenant surprising fountain sustained appropriate ford clara assisted lewis rejoice extending marvellous clothed jew collar bands confident hasty nigh organ prose privileges selection inquiries codes replace saint districts deliberately awe beforehand strife released compare beer retorted relate cheerfully pistol presume velvet wretch susan pennsylvania stirring righteousness missing fain facing fashionable producing peoples positively reasoning gravity disturb sermon exchanged partner brains lowered association estates abuse flock niece languages asserted bodily notions oliver faculty cannon thirteen sailing rings smart possessions disciples petty widest divisions prudent caution justify awhile boxes manuscript cigar warrior impressions aught lifting inaccurate tidings friday liquid staying concept creek brush download specially cream meetings jump unwilling adapted practised combat subdued jewish innumerable blowing extra civilized invented japan pitch cliff crowned portions awkward horrid pulling appreciate communicated kentucky jury encountered attacks monster simon maintaining sites frozen invariably dies survive literally consolation phenomena pot ellen briefly rice planned barbara respected sublime dropping guy behaviour desolate penny adopt replaced revenue formats hired regularly infringement curtains eagerness helping investigation constitutional insist occurs fools inheritance latest leap games apple visiting travellers experiments hasn't pupil enjoying totally twisted discuss firing background subscribe tenderly transcribe descend differ majesty's avail disaster bet periodic bull entertainment computers cursed raw fulfilled georgia virus log skies scotch embraced hospitality faintly solomon robbed cart influences ascended incidents childish robe aboard resembling reflect dominion dreary serving complexion engage tents herd attain collect disclaims pan relatives borrowed convert outline blown comprehend peasants opera assault deceive doctrines representatives dedicated struggled officials hiding paths backs prominently prices procured mourning compliment heights approval gasped breadth withdraw tune compassion polished latitude dishes parent contrived delicacy projected akin betray traced resentment indemnify pseud sacrifices disguise transcription document neighbour squire punish bars glittering tossed block lots worldly muscles elbow obligation trifling decline attachment ambitious filename artists bloom holiday brute repair fist recollect eagle honorable significant barren functions guided dense fiction viz. adds rows recommend suspicious resulting seventy shillings educational duly governed scripture upwards sworn nicholas horn brook fund vienna lodge infinitely clergyman marshal ruled fiercely portuguese costume pit disorder sheer exalted fare applause chaucer remind binary packed pillow jersey abbey nowhere anyhow agitated marching catching grasped arrow tend carved fitting bonds instructed elaborate corpse bewildered essence positions emily edited continues harold elevation realm debts glancing shops complained loyalty coin clad staircase documents interpreted 4th extremity accord sally lace tremble exile gospel mechanical successfully scholar wonders arab temperament expressing fred trap spots awaiting potatoes likeness harbour proofs jolly contributed wits generosity ruler lawrence cake lamps crazy sincerity entertain madame sir faculties hesitate deepest seventeen lordship greeting feminine monstrous tongues barely mansion facility praised warranties sarah happier indicating rob gigantic honey ladder ending wales swallowed sunny knelt tyranny decree stake divide dreaming proclaimed dignified tread mines viewing defense oldest incredible bidding brick arch everlasting elect sprung harder winding deductible magistrate respective liquor imitation shy perished prime studying eighty hebrew unfortunately licensed fog coloured bits consult moves warn taylor vile depended phil legend locations shallow doom dreaded encouragement impatiently scent varieties irregular battles compass neighbouring bliss harvest promotion stove faithfully anthony excellence transfer awaited heathen poetic consulted illustrated gilbert fundamental bundle rebel cultivation joys rigid tragic review representing flowed brows whereupon terribly melted venerable towers cooking mustn't suspicions old-fashioned oppressed australia friend's revolt swell improve williams describes goddess wreck tennessee convince sentences bowl radiant prussia westward indignant refined unseen illustration pertaining swamp austrian saxon congregation nerve undertaking disclaimer characteristics stare specimens ascertain pledge earn warfare supposing subsequently attending angrily select animated industrial hurriedly manhood quantities interpretation Word dressing rejoiced edinburgh catherine challenge produces forbid gang boiled shouts so-called theme thankful admission enters elevated frenchman pool terrified lads persisted conference equality genus didst newly generals surroundings sorrows occasioned invasion workmen monks sends turkish discretion pattern reveal endured resolve columbia preach exceeding ringing triumphant defiance errand woke grandmother weighed wool orleans communicate strikes promising scenery righteous essentially oppose joyous specimen doctors eloquent manager organs sticks drag haunted chorus rational crop processing accurate wolf adorned sheets resort refusal bond vicinity preacher sympathetic casting opens prophets horns warmly salary continuous satan continual defended breaks workers lantern balls rod blaze examining naples peculiarly vegetables ingenious excite howard horseback re-use louisiana farmers wildly mouths carpet sadness customary circles aren't wonderfully max juan successor allied ceiling confirmation glances diamonds goal representations cash vacant antiquity despise lawn they'll appealed turkey texts neighbor spreading discharged phrases ultimate tastes submission entry rachel blush monument hardy thorough ein ecclesiastical fertile exciting captive severity considerations shew faster louise grandeur winning solely globe malice echoed lodging conservative throng prosperous whistle floated transferred declaring reckoned cheese bite thoughtfully breach enthusiastic cars downstairs allowing invite adjoining dusk cathedral truths plague sandy boil caroline beautifully inhabited tomorrow exclamation finishing shocked escort forgetting hanged hats mirth uncomfortable connecticut bows pierced harbor tricks rubbed apparatus mysteries honesty negroes concerns wander assert ceremonies sacrificed utterance dismay fright rail reflections crops pushing proves jimmy pathetic imperfect haughty navy fortress hurrying blessings attempting insects selling appreciation suppressed acquire offensive ripe dresses reigned coldly candles sixth blazing youngest mask florida lecture parlor decidedly whereby gordon reverend successive perception buffalo sire quitted keys develop function morals damned vexed pouring bullet excessive bind identical cliffs tools byron mexican piety superstition git substantial bulk prevail wiser preaching prolonged annoyed westminster splendour remembering richmond upset cab bunch pencil subjected vegetable exhibit emerged cooked hay kansas gale preached arnold trousers debate dated tumult corruption summons comrade eternity hears lingered propriety stillness partial welcomed cabinet proceeds vow quaint soup beef rests slay surgeon irresistible sealed repeating needn't allowance undertaken treachery posts borders attendant unite murderer owners sweeping unconsciously blade saviour theories graham behaved pleaded spy possesses lawful tommy seasons withdrawn reckless factory shades gossip seventh attendance robes journal systems dryden maine token intimacy abstract machines bestow chanced locks honestly legitimate accent symptoms votes ragged thursday manifested fidelity swinging descending sincerely bred whereof indies novels league failing succeeding santa approve cautiously miller afflicted lodgings petition traffic sparkling limb architecture disposal carriages crack kindred naught ornament slew steward fantastic evolution patiently reverse survey dug amuse stretching isaac forthwith contemporary foliage receives scandal donors deliberate influenced intolerable hearth symbol governments repaired pleasantly homage victorious columbus recovery defined attendants modesty diana washing pavement unnatural decisive wisely precise negative occurrence snatched shaft linked festival exclusively jove wickedness visions maggie rosy carelessly stem corporation dec feeding allen cows schemes preference urge husbands labours shrill exercises sovereignty reduce distressed clearing removal dean scottish assertion accessible comedy flush code philosophers adequate vaguely treason hunter chambers split yielding newsletter snake pub. historian ass intensity democracy battery draws netherlands creed liking luke tyrant strove attraction slaughter dismal deposited assent cups concert downward canal evenings wax detective fancies spoiled revolver murray earned analysis finer paces roaring prompt paperwork wherefore emphasis sharing delayed inherited bronze waking garment redistributing wholesome remorse plato morris stooped dew monk thrill hue exclusive funds porter uncommon dash strained confounded swim strip middle-aged ultimately team missionary esteemed tracks envelope whoever expensive headquarters cherished brandy startling homer talks acute cigarette motor embarrassed janet volunteer offspring network reaches indispensable plane reaction regiments sums partially prejudices proudly baggage terrace deaf allusion grip juice isabel resigned humility benjamin blast ministry sexual nile diameter troop onward crowds marrying tightly sullen brutal axe holmes penalty tops diamond boards corridor endowed strengthened cells proportions alternate echo restraint trials reads identity headed softened quivering stages sway poetical objected screen professed dirt ascertained era wider ambassador constituted breed interference eyebrows shapes afar consist acceptance displays flashing hunted beauties lazy shrewd extravagant momentary cordial engineer rapidity nov halt alternative devils stamp compact whites breathless encoding drift disappear roared revived counter venus imaginary diminished honoured 5th despatched objections ray climbing attract astonishing competition suggestions ink oft crystal shower diseases ferdinand obedient draught wondrous await armour massive bottles kin cellar falsehood pillars edgar philosophical martha worlds memorable jacques detected stealing noisy henceforth cicero laden frost device glare touches senate lasting communion transport constantinople coffin eventually johnny enclosed forgiveness awfully clinging darkened contemplation termed manufacture swallow commonplace nancy resembled she'd labors contracted inscription comfortably indulge indulgence bravely kneeling yea keenly exhibition agricultural enlightened quest compliments crest extension uneasiness constitute inflicted lakes swing meadow noblest downloading complex controversy freed resignation tempest guidance prospects humbly lined serene shrugged honours roughly checks remarkably dainty overhead commencement singularly brightness oppression repeatedly conspiracy restrain splendor preservation pub pepper basin creeping matthew publicly percy continuing grove calamity pony vigour melody profitable descendants hire speculation discoveries accepts drunken candidate principally worried obstinate hasten foreigners elderly overwhelmed instincts telegraph russell university ghastly patron varying barbarous celestial t' patriotism modify earnestness exertion fox refusing horsemen inspection stations grieved louder bursting regretted mournful pursuing traitor associations cautious foundations stamped prior undertook telegram beggar chimney complicated davis striving magistrates converse graces wiped oars apology scared imprisonment eastward substitute yahweh handful usage lodged of. villain banished restoration serpent hedge jurisdiction captains settlers gaining valiant primary storms beam victoria tour prophecy spectacles obsolete buying shepherd wells harriet exaggerated heated penetrated travels earl hereditary ali supernatural competent piled hostess agriculture boughs urgent gratified suffice ports drifted accuracy deceased circular securing possibilities rhine alert neighboring democratic quebec bud accounted aided augustus blanket hail pretence beams andy pig shaped oven rounded ivory northward isolated policeman aug conventional babylon dusty bishops complaints stripped plead hinder 8vo cord flows personage classical alongside wrongs extract rewarded lungs lighter kisses serves pint forgiven sternly proclamation realised pipes arising pitched tube observer smote avenue elephant burke footing statesman rebels nails wears doomed edges esther indiana affecting stormy bee bury efficient mix Word supporting actor disturbance sweat executive seemingly tenth blossoms ethel folds painfully polish shudder oe. roofs comparative begging imposing notable invested imprisoned mute amy cage esq cured cargo prof. negotiations assented jail skilful ideals conferred resulted illusion torment troublesome crowns feb repentance blankets proprietor uncertainty concentrated mediterranean covers scream compromise respectful chariot ammunition bonnet secondary persia persecution lesser assistant saluted fits indulged springing cane fold boundary valued she'll rugged aloft thieves hello";
// sources: 
// http://www.encyclopedie-incomplete.com/?Les-600-Mots-Francais-Les-Plus#outil_sommaire_2
// http://en.wikipedia.org/wiki/Dolch_Word_List
// French
var frenchdict="les des une que est pour qui dans par plus pas sur sont Les avec son aux d'un cette d'une ont ses mais comme tout nous Mais fait �t� aussi leur bien peut ces deux ans encore n'est march� Pour donc cours qu'il moins sans C'est entre faire elle c'est peu vous Une prix dont lui �galement Dans effet pays cas millions Belgique BEF mois leurs taux ann�es temps groupe ainsi toujours soci�t� depuis tous soit faut Bruxelles fois quelques sera entreprises contre francs n'a Nous Cette dernier �tait s'est chez monde alors sous actions autres ils reste trois non notre doit nouveau milliards avant exemple compte belge premier nouvelle Elle l'on terme avait produits cela d'autres fin niveau b�n�fice toute travail partie trop hausse secteur part beaucoup valeur croissance rapport USD aujourd'hui ann�e base Bourse lors vers souvent vie l'entreprise autre peuvent bon surtout toutes nombre fonds point grande jour avoir nos quelque place grand personnes plusieurs certains d'affaires permet politique cet chaque chiffre pourrait devrait produit l'ann�e Par rien mieux celui qualit� France Ils Ces s'agit vente jamais production action baisse Avec r�sultats Des votre risque d�but banque voir avons qu'un elles moment qu'on question pouvoir titre doute long petit d'ailleurs notamment droit qu'elle heures cependant service Etats-Unis qu'ils l'action jours celle demande belges ceux services bonne seront �conomique raison car situation Depuis entreprise nouvelles n'y possible toutefois tant nouveaux selon parce dit seul qu'une soci�t�s vient jusqu quatre march�s mise seulement Van semble clients Tout Cela serait fort frais lieu gestion font quand capital gouvernement projet grands r�seau l'autre donn�es prendre plan points outre pourtant Ainsi type Europe pendant Comme mesure actuellement public dire important mis partir parfois nom n'ont veut pr�sent pass� forme autant d�veloppement mettre grandes vue investisseurs trouve maison mal l'an moyen choix doivent NLG direction Sur simple p�riode enfants dollars personnel assez programme g�n�ral banques eux semaine pr�sident personne europ�enne moyenne tard loi petite certaines savoir loin explique plupart jeunes cinq contrat Banque valeurs seule rendement nombreux fonction offre client activit�s environ ministre cadre sens �taient s�curit� recherche Paris sorte d�cembre Son suite davantage ensuite janvier donne vrai cause d'abord conditions suis juin peine certain septembre sommes famille l'indice pris laquelle directeur qu'en propose gens derniers �tant fut chose portefeuille obligations afin diff�rents technique Aujourd'hui ailleurs l'ensemble am�ricain ventes Selon rue livre octobre vraiment sein dollar Enfin haut Plus petits porte tel dur�e domaine aurait jeune pr�sente passe lorsque choses puis Vous aucun l'un n'en tandis coup existe propre carte crise importante atteint revenus montant forte ici s'il Quant rapidement j'ai ville etc mars s'en mon premiers bas marque v�ritable ligne longtemps propres devant passer d�part total s�rie quoi particulier concurrence �lev� position connu principe tendance court pages �videmment r�sultat aura parmi Sans am�ricaine face trouver durant femmes construction d�sormais distribution telle difficile autour europ�en pratique centre vendre juillet mai r�gion sociale filiale film besoin mode Pas repr�sente r�alit� femme vaut T�l aucune hommes donner titres l'Europe nombreuses diff�rentes moyens formation chiffres G�n�rale dix prochain l'Etat genre bureau communication participation gros pourquoi estime devient r�alis� cr�ation novembre l'�volution pourra semaines consommation faible terrain site droits moiti� puisque reprise compris projets avril vont call donn� simplement six firme perte Bien Philippe sait prend vite via strat�gie vos jeu petites marketing presque Michel manque r�aliser financiers Car Comment voiture chef constitue Internet J'ai enfin net charge nature second payer actuel Elles investissements dispose financier d'achat membres date avaient gamme revanche comment d�cision l'avenir tour actionnaires s'y solution cr�er l'�conomie concerne l'�poque belle lequel t�l seconde version Pays-Bas cher chacun lire techniques d�cid� mouvement conseil n�cessaire meilleur double sujet g�n�ralement restent celles politiques malgr� confiance homme d'actions Certains ayant papier commerce R�gion Wallonie Windows termes met contraire informations l'industrie trimestre diff�rence certaine formule jusqu'au voit programmes actuelle permis dossier Quand l'heure guerre acheter rendre f�vrier l'emploi main voire bons technologie europ�ens �l�ments unique l'eau venir g�n�rale courant suffit l'ordre conserver maximum force fax Que largement milliard soient Pierre devenir l'Union franc minimum mort responsable possibilit� presse affaires longue travers BBL relativement moi Deux pr�sence europ�ennes devraient groupes ensemble sant� New pense b�n�fices but compagnie publique coeur revenu mesures table nettement questions d'avoir permettre l'homme Chez retour qu'elles majorit� potentiel moindre r�cemment secteurs r�duction large traitement perdu �trangers parents l'une fond capacit� vitesse activit� l'exercice l'objet quel tient taille �viter risques Jean Pourtant Allemagne parler propos quant signifie voie jouer pr�voit blanc noir parti logiciel continue Notre bois meilleure l'argent perspectives d�velopper celui-ci oeuvre structure suivre tiers prise professionnels raisons n�anmoins preuve social b�n�ficiaire couleurs mondial Cet maintenant essentiellement pr�vu Japon pr�visions centrale Alors international yeux PME l'a ait bonnes op�rations pied l'art pourraient Londres juge devra uniquement corps divers Parmi num�ro r�duire Tous texte tenu budget l'�tranger pression mes n'�tait style �conomiques Jacques montre population analystes processus placement classique dividende rester publics fortement plein wallonne DEM Express faudra travailler Cr�dit directement prime Flandre cr�dit monnaie pr�cise appel Autre travaux l'occasion juste Chaque put tableau terre permettent devenu rouge m�moire partenaires rapide travailleurs joue objectif salle parle musique milieu d'entreprise autorit�s chute r�gime d'autant liste op�ration bout performances �lectronique haute responsables lanc� voitures patron Malgr� affiche situe l'image �tudes Microsoft condition retrouve Aux revient Belgacom route Ensuite Luxembourg campagne comptes hors culture Commission d'entre possibilit�s semestre actifs finalement internationale l'achat mon�taire passage justice page tels poids celle-ci commercial entendu l'investisseur mondiale accord diverses totalement fil clair vin biens euro York parfaitement viennent division r�seaux principal lancer sup�rieur atteindre r�f�rence t�l�phone management vins proche collection fiscale Ceci informatique investissement volume mat�riel publicit� train coupon progression tenir protection l'aide couleur nouvel Lorsque change changement garantie somme Belge plaisir fils laisse importants priv� Ses besoins oeuvres am�ricains relations peau moteur augmentation suivi volont� beau bancaire laisser bureaux principalement int�ressant logiciels sommet l'activit� d'en vivre �lev�s Robert contrats oublier performance r�ponse d'exploitation concept obtenir poste attendre lignes consiste augment� vert figure mot d�velopp� l'histoire magasins collaboration r�pondre TVA holding livres convient fonctions fera pouvait million Paul britannique d'entreprises voix Grande-Bretagne disque affaire minutes quelle contexte limite mains commun r�duit Pourquoi particuliers verre wallon d'Etat allemand effets Chine meilleurs rend applications d'ici proc�dure l'op�ration devait profit m�thode pose commence id�e l'Internet d'eau cr�� nuit Nord capitaux options consommateur cartes soi m�tier probablement aller d'investissement facile International importantes Marc capitale devise prochaine transport Street demander utilisateurs l'affaire image l'id�e propri�taire facilement publiques croire disponible Louis d'or veulent Charleroi consommateurs devises difficult�s sort national machines annonc� choisi d�couvrir soutien avez perdre cuisine telles D'autres travaille ouvert phase certainement t�l�vision pratiquement annuel bord paiement Bank institutions seuls arrive constate marques nationale regard repr�sentent Belges �tat Qui libre rachat Toutefois portes sortir commandes permettant manager fiscal cin�ma histoire zone sauf avantages l'information voici dur effectivement puisse r�el The puissance fixe Belgium contact �poque rythme principaux vendu utilis� �tude Leur sensible Bref rencontre L'entreprise sp�cialistes brut mauvais n�erlandais suppl�mentaire mots reprises n�cessaires Non soir Prix machine penser parts comprend fusion acquis totale voyage logique l'�ch�ance concurrents id�es trouv� dette Sud r�ellement financement disponibles vieux lance marge dirigeants avis changer cons�quence sociales sup�rieure Certes faisant ordinateur partenaire warrant fabrication redressement suffisamment d�l�gu� pourront poursuit chemin emplois l'environnement r�alise FRF �volution Cour automobile Premier ancien note parties pension professionnel assure garder Rien Actuellement S'il l'administration Guy est-il IBM climat d'acheter SICAV d�partement sept partout immobilier lancement rating r�ussi patrimoine feu exp�rience Anvers anciens graphique Fortis faveur retrouver droite responsabilit� commande Kredietbank d'argent direct l'inflation n'avait utiliser tonnes l'origine connaissance achet� Ici am�ricaines clairement semblent biais futur neuf chance faillite �quipe mus�e compagnies documents pertes sortie m'a seraient d'autre choisir l'instant tellement industriel pr�compte d'Europe imm�diatement avantage qu'au constituent d�chets sport van demeure garde maisons Solvay cons�quences l'offre active d�penses donnent employ�s sites �lections d�tient n'importe obligation fruits v�hicule l'�gard Conseil investi mission profiter visite comprendre professionnelle affirme l'int�rieur Wall charges priv�e rares succession libert� rentabilit� suivant efficace assurer images agences impossible John enfant fournisseurs photo salaires Avant compter l'Est disposition formes b�n�ficiaires lesquels maintenir pr�cis�ment couple enregistr� recul offrir peur hauteur centres voulu industrielle positif Luc administrateur int�ressante commerciale interne pleine passant vision GSM faits retard certes l'air lundi Outre porter �crit cesse locaux d�lai trouvent classiques commenc� r�alis�e Alain vigueur gagner Celui-ci Philips ceux-ci favorable pouvoirs participations annonce g�n�ration �l�ment devenue touche conseils devoir mer souligne respectivement rapports vacances lieux naturellement d'y lorsqu'il statut USA ceci destin� d�faut objectifs r�cente saison d'art industriels Suisse cat�gorie complexe huit l'obligation fisc obtenu repris occupe s�rieux �mis Quelques comportement limit� vingt conjoncture gauche marche d'origine l'utilisateur ordre mobilier parcours perspective normes recours l'esprit Communaut� annuelle lecteur objets fabricant niveaux Entre r�alisation amateurs cons�quent pr�senter Celle-ci vise types d�tail mauvaise professeur progress� signe pass�e approche Reste return jardin l'espace flamand Namur bilan Vif sensiblement Trois utilise commune dimanche option partis analyse films surface warrants GBP prises secret historique journ�e l'ancien Pendant allemande d'assurance Andr� fille l'importance proposer avions augmenter parc Delhaize the Lors limit�e appareils villes au-dessus diminution prochaines servir Bernard commission faiblesse plus-value souhaite internationales producteur producteurs code belles cabinet fonctionnement g�rer mouvements pratiques r�gions dossiers meilleures Parce entr�e vendredi actif sociaux suppl�mentaires caf� message physique Soci�t� communes dizaine faute s�lection source facteurs milliers soleil tirer concernant Bourses fallait sentiment b�n�ficier d�bat l'Allemagne �lev�e ouvrage police pouvez attention a-t-il bel constructeurs contribuable moderne passion primes suit auquel d�passe sp�cialis�e bruxellois d�claration multiples quartier vid�o d�pend l'�cole liquidit�s correction comit� Web cherche filiales Sous sign� leader calcul gaz D'abord Rens artistes d�ficit cadres f�d�ral probable remboursement and efforts restaurant Toutes couverture domicile soins devront luxe complet danger indispensable syndicats comporte faite juridique langue rendez-vous d'informations demand� respect continuer l'organisation lesquelles local l'impression n'existe rare restructuration automatiquement plat boursier sol c'�tait cot�es d�cide L'action Cependant Certaines mat�riaux ordinateurs tradition progressivement capable classe familiale r�serve fonctionne solutions fabricants paie Finances l'�t� r�elle chang� masse unit�s consid�r� fer auront noms riche Patrick propos� salon territoire fix� magasin candidats marges asiatique inf�rieur r�action fleurs l'effet record tribunal recettes poursuivre dessous portant Aussi Sabena acteurs dehors constructeur l'auteur relation offrent spectaculaire LUF produire confort familles investir reprend sert montrer m�rite places Soit judiciaire textes quasi SNCB jeux permettra �tudiants membre photos positions sud Cockerill lendemain cent gagn� japonais l'absence mark pointe solide Voici anglais n'ai pr�sentent d�cisions l�gislation m�dias victimes �cran n�cessairement d�couverte l'assur� club environnement noter cr�e exportations n�gociations Jan r�pond BEL entier business peinture s'�tait voisins faibles location nord promotion technologies auraient caisse entend simples maladie menu chances commerciaux printemps Benelux poser Asie l'utilisation usage PIB actionnaire prennent r�sistance Dow surprise Etats mariage n�cessit� Puis cote Plusieurs beaut� exclusivement lettre pay� rendu s'ils software utile gestionnaires b�n�ficie proc�d� vaste crois normal Centre construire d�marche emprunts naissance D'autant d'information distance tourner Club attendant quantit� roi l'assureur tourne ajoute bancaires ajouter g�ant automatique faux attend litres pr�sent� argent confirme ind�pendants l'ordinateur �norme destin�s l'avantage v�hicules ressources standard auparavant construit Quelle principales quelqu'un disposer global �coles Quel r�putation fameux rappelle conseille heure veille difficult� l'�tat limites commerciales samedi palais vend vit Tractebel connaissent reprendre village emploi amis budg�taire croit mises souci contient habitants Weekend bras beaux bruxelloise faisait introduit int�rieur outils pr�cis chercheurs taxe salaire transactions Christian chambre port�e r�flexion C'�tait d'emploi hasard matin assureurs r�forme Beaucoup fournir recherches li�s tenue proposent aide ferme l'enfant l'or secondes CGER contenu quotidien flamande centaines course billet critique l'arriv�e naturel principale support week-end Dehaene Gand charg� �conomies Nos augmente guide proposition laiss� sp�cialiste francophones importance vent conception pr�f�rence spectacle avenir d'entr�e grave commencer d'ann�es diminuer chercher bonheur dizaines d'environ exactement outil sc�nario Jones coups �missions �ventuellement Royale l'agence soumis d'exercice lecture monter Grand central exigences assur� contacts consacr� l'attention d'administration due faut-il r�ussite �ch�ance recevoir tableaux arriver �vident art Italie am�lioration auteurs estim� quinze Russie demain pr�c�dent vendeur �v�nements autrement experts fortes furent possibles circonstances placer publication l'�cran r�serves sauce venu Charles collaborateurs implique l'assurance obligataire �tabli CD-Rom forc�ment l'essentiel l'enseignement remarquable vol Claude tourisme internationaux directe comp�tences conseiller facteur l'est plastique rarement Royal affich� lutte relative actuels envie l'�quipe ministres secr�taire capitalisation langage positive circulation convaincre notion visage vouloir ajout�e caract�ristiques Eric Union paix puisqu'il courrier disposent d�veloppe pr�sentation barre comparaison d�terminer firmes fournisseur informatiques luxembourgeois achats solde Serge globale propri�t� strat�gique Renault partage port� sources Kong cour destin�e absolument branche l'objectif ouvre plans productivit� R�sultat am�liorer d'obtenir jou� Parlement d�pit fichiers personnalit� constitu� gestionnaire profession qualit�s conscience m�decin celles-ci design d�cor faudrait participer appelle forces suisse appareil conduite D'une longueur tarifs v�rit� lien locales francophone clubs correspond coupons d'�mission estiment d�fi prot�ger r�alis�s d'emplois d'�viter l'ouverture m�thodes revenir superbe volontiers document nomm� tente financer scientifique Georges travaillent l'investissement li� zones aime lettres ouverte Hong L'ann�e murs philosophie rappeler utilis�s suivante d'ann�e repr�sentant traduit remettre situ� diff�rente longs �conomie discours distributeur domaines l'introduction r�gional faites italien restera usine Group l'informatique personnage portent attendu l'option Jean-Pierre articles changements fallu l�ger mener propri�taires sp�cifique r�cup�rer voyages proc�der locale m�decins priv�s transmission concurrent courte quart baisser pieds publi� Ford menace r�union transfert compos� dimension personnages ralentissement conclusion l'usage agents parfum r�mun�ration difficiles l'entr�e mettent pierre proches r�glementation salles grimp� prochains pr�vue �lectrique dynamique exposition install� plancher distributeurs d�clare connue n'avons pr�paration r�alis�es beurre op�rateurs achat province sp�cifiques Albert l'usine l'existence renforcer t�l�phonique comptable effectuer trafic degr� l'ont d�finitivement humain optique remarque talent appel� modifier d�finition peintre respecter stade statistiques certificats s'attend limiter livraison placements raconte volumes immobiliers Fax anciennes chevaux m�dicaments Peter feuilles football identique pouvons remise structures tenter accords cotisations indice neutre Mon constituer d'accord montrent plac� loyer proximit� voient �pouse Canada entrer postes pr�cision cit� concours patrons populaire p�trole n�gatif allemands d'activit� roman victime italienne m�nages repas PetroFina langues tendances D'autre pire prudence savent N�anmoins conduit mille r�novation �gard Am�ricains exercice l'�tude s'impose avance effectu� fortune fournit lecteurs Morgan d�couvert l'inverse diff�rent emploie bleu royal technologique t�l�communications Amsterdam fiscales indique information lourd signal Mieux aider ancienne apporte nette prestations publicitaires sensibles communaut� l'�mission lit volatilit� �tape assurance jusqu'en lanc�e r�soudre garanti modification revue sp�ciale www chacune l'analyse diff�rences messages priorit� recommandation r�cent charme dividendes Olivier passent finale immeubles logement pourcentage rire stabilit� difficilement d�fense l'ancienne magazine D'un eaux jeunesse l'intention continuent r�volution �tonnant organisation constater dos emprunt oui �ditions Daniel sel utilis�e compartiment publicitaire article bande capacit�s centrales consid�r�e milieux occasion quasiment pouvant Vermeulen-Raemdonck visiteurs chambres consid�rablement demi d�couvre essentiel broker dettes mardi reconnaissance salari�s formules grosse heureux perd radio allait multim�dia partiellement seules G�rard Oui Securities toucher jugement l'oeuvre consid�rer remplacer couvrir pr�cieux segment dessins espace indices refuse chefs exemples rejoint sp�cialis� l'amour l'exportation objet pr�c�dente rose versions d'�tudes destination Encore deviennent l'Italie personnelle plats vingtaine l'exp�rience virus Faut-il chasse longues Toute bases cot�e final monnaies travaill� apporter aspects disparu David Management port racheter relever Celui ING catalogue centaine chaleur profil repr�sentants conclu r�side scientifiques Chambre secondaire Fin serveur XIXe exige grimper immeuble l'Universit� montants paysage vendus ton assurances cat�gories dure d�cote soutenir �dition dangereux agr�able voulait combien d'application disparition optimiste plus-values tomber erreur l'augmentation situations sp�cialis�s subi suivent Jusqu'au classement l'exemple norme rentable sang socialiste tombe Justice attitude mines qu'aux li�e plantes vague General l'immobilier l�gumes Ceux-ci conflit excellent licence travailleur appris est-elle gagne mari pr�parer purement situ�e v�rifier Jean-Luc gain m�tal surfaces L'objectif d'�pargne douze expliquer lorsqu'on meubles yen chaussures cr��e institution l'accent solidarit� Maastricht bas�e journal soin sourire Guerre bouteilles flexibilit� maintient appartient moments rouges L'an bas� devons installations Bacob association d'obligations format City Page disques modem m�lange ordinaire vide chimique disent pharmaceutique d'assurances num�rique porteur r�partition blanche composants future parvient �voque Durant calme cru Electrabel culturel grosses baiss� lois moteurs principes trente �ventuelle Peu pr�voir tours Pentium acheteur dimensions fonctionnaires organis� rencontr� russe savoir-faire �tablissements F�d�ration Toujours cr�ativit� top application d�passer importe jaune l'application marqu� m�canique socialistes tranche Quelles envisage traiter Surtout acheteurs chinois claire l'Institut v�cu Objectif bail demandes diversification montr� renseignements souscription Tokyo entendre tests Siemens filles unit� Bekaert UCB composition rest� sinon agence fini modifications Cash industrielles obtient permanence restaurants r�els �change florins l'accord terrains �mergents atouts offrant LES bouche champ chaud l'annonce monte preneur pr�sents quitte tarif facture fiscaux modeste processeur Fund avenue comp�tition relev� tent� Est-ce Mus�e bijoux diff�rentiel d�clar� institutionnels l'employeur trait� Intel traditionnels victoire connus correctement pub Dominique Tant accessible rencontrer stocks Art esp�rer jouent men�e n�cessite provenant utilisent affichent d�lais inf�rieure sent sp�cial Am�rique acqu�rir album id�al l'�cart v�ritables associ� candidat connaissances l'�nergie signes cheveux conserve stress d'Anvers d'action directeurs donn�e endroit l'emprunt l'impact der traditionnelle Martin ciel convention obligataires prouver Espagne Petit Source dessin humaine l'huile lait Seule Thierry boursiers continent destin�es flamands n�erlandaise pensions commencent consid�rable nationales nul s'adresse conjoint cr�dits militaire morceaux privatisation repose sommeil traditionnel PSC Seul capables combat finances puissant s'agissait Bill Renseignements physiques Richard allant cr�ations toile �vidence convaincu excellente retraite th�orie transformer Tour transaction visant Deutsche Mons attentes cycle d�tails Votre h�ros l'artiste l'universit� s�rieusement uns Ceux consid�ration impose propositions Autrement cap forts l'Afrique usines Afin Quels ais�ment ressemble risquent totalit� imaginer originale int�gr� int�ressantes l'ext�rieur loyers auxquels circuit ind�pendant int�rieure jus maintien cotisation l'Asie moyennes quitter stable CVP Compaq galerie liens souffle GIB apprendre concert l'exception l'�chelle liquide nez noire temp�rature transparence �cole champion diminu� d�sir ressort voulons �quip� alimentaire den organisations pr�sidence raisonnable ratio recommande utilisant accepter accept� cache chocolat chut� comparer courts figurent passagers prison viande associ�s esprit froid jeudi li�es revu satisfaction satisfaire test tiennent vraie contrairement d�pass� ext�rieur qu'avec ami American Etat compl�mentaire d�clarations r�actions Fonds artiste conclure d�duction remis L'indice d�termin�e fiscalit� grand-chose humaines r�ponses �quipes ITL Michael Systems aspect commercialisation manger RTBF engag� oblig� proportion signature �tranger impos� s'applique silence vote Afrique Mobistar cible contemporain fondateur Jean-Claude communiquer d'investir existent majeure ouvrir �lectroniques JPY TGV comp�titivit� erreurs notation rang Apple accident certificat exceptionnel http proprement riches Barco Quoi violence adapt� b�n�ficient r�cession sentir armes arriv� crainte garanties l'automne m�nage officiellement ouvriers Autant discussion rejoindre �poux citoyens concern�s d'inflation d�finir L'id�e Paribas Telecom d'aller fabrique feront n�e oblige patients pensent responsabilit�s doubl� fraude l'article organise Henri conclut d�sire l'appareil l'association l'installation l�gislateur �crans choc gratuit mobile naturelle dialogue r�vision familial lourde poche d�cider n�gociation tort Maison Tr�sor constante cotation d�termin� l'instar managers opt� transformation Life anniversaire comp�tence g�ographique mandat r�serv� �tablir Business fins richesse CAD commente interm�diaire l'univers retrouv� sciences Sun banquier former mont� parfait veux Ren� investit l'oeil n'aurait parvenir vieille collections dirige fonctionner mauvaises tapis venus Contrairement Suez piste pistes tensions campagnes investis propos�s sac tabac bataille britanniques fine li�geois partenariat priv�es remplir sup�rieurs Beaux-Arts Christie's laser restauration Dutroux chimie rendent textile Brabant Colruyt James National Quatre pr�alable souvenir venue Communal avocat comparable consolid� critiques interdit l'initiative mine quotidienne rigueur r�duite tissu Invest pain participants proc�dures profondeur retrouvent rues taxation Mexique asiatiques conducteur demandent environs fermeture gris rumeurs accueille amoureux d'augmenter d�fendre l'immeuble pure souffre cr�neau d'�nergie journaux s'explique seuil Jeux Office auteur cash-flow fichier foi instruments quelles s�ance v�ritablement Yves attirer civil civile d'aujourd'hui eau l'�pargne station courbe hectares influence ing�nieurs tables vivent Exemple L'un blancs couche cuir devenus extraordinaire patient peux aient animaux associations d'utiliser foie initiative l'Am�rique poursuite survie Face apparemment consultant expansion l'exposition s�jour champagne commentaires complexes cylindres d�cennie rendements retenu sais sujets cuivre offert r�agir sec varie Fondation artistique communications mon�taires m�taux permanente positifs �lectriques basse concentration investisseur provoqu� doux stations coin modifi� avocats estimations original souplesse Attention Frank Hainaut Suite annuels cellule clause exemplaires malheureusement minute normale Fr�d�ric Sud-Est atout latine logements pilotes susceptibles Roger XVIIIe ordres remarquer actuelles bouteille constat opportunit�s pr�pare vendeurs accrue fruit jug� l'am�lioration loisirs pur trentaine bus gendarmerie air alimentaires cot� modernes pr�ciser r�ussir laissent parfaite sp�cialement �voluer Dewaay D�sormais Groupe maladies n�gligeable tension Lion chansons dite festival n�gative pr�f�r� restant Cera adopt� coop�ration distingue douceur retirer technologiques Editions Parfois bruit comptant d�mocratie exception mercredi offres sucre vedette �volue British Leurs compromis hauts �lev�es �mission Faire attendue d'appel jusqu'ici lourds quels soir�e �v�nement alternative chimiques conf�rence quitt� serveurs Br�sil CD-ROM correspondant l'avis locataire mat�riau p�riodes utilis�es d'embl�e l'aspect morale �quilibre Sony fixer gratuitement trait Trop adultes consacrer d'importance normalement parole prochainement suscite verra cl� mesurer notes potentiels relatives Flamands Francfort L'homme Palais Plan R�publique l'arm�e transports Portugal couvert joueurs Malheureusement coupe dispositions effort endroits aides contribution insiste s'inscrit souhaitent communal impact progresser Sambre administrateurs d'ordre deviendra d�gager formations l'ouvrage souscrire cellules facilit� gras militaires pass�s quinzaine souvient automobiles bref confortable essentielle officiel vive vols Marcel Top combinaison distinction d�finitive japonaise liaison tissus cadeau canadien distribu� existants ordinaires servi surveillance l'architecture l'a�roport m�decine n'aura n'�taient revoir r�centes voies L'obligation Rappelons comptabilit� fabriquer fasse int�ressants peintures quartiers valable �tapes b�n�fici� couvre diminue envers introduire missions s'attendre Petrofina apparition coffre digne fibres initiatives litt�rature rembourser retrait Bundesbank D'ailleurs Pascal Pologne consacre employeur favorables l'approche manquent assur�e battre chantier conclusions consulter craindre d'utilisation vivant Chacun internes apprend li�geoise observe provenance sortes Marie cess� c�der estim�e marchandises Poste balance copie cuisson n�gocier sp�ciaux traite Bruges hollandais peut-on porteurs r�gler soutenue suivie Stanley accueillir m�dical notori�t� provoquer sensibilit� vocation L'investisseur for impression l'ampleur s�duit conflits imposable journalistes manifeste provoque wallons �diteurs EUR canal fondamentale futurs graves men� mur pommes rachet� remonte solides suffisante charg�e chers discussions garantit indicateurs provient soutenu sportif syst�matiquement z�ro comptent recette r�cit subir �volu� Johan accorde faciliter hausses Macintosh Services d'imposition d�buts garantir portefeuilles susceptible universit�s Glaverbel Sotheby's actes brasserie caract�ristique cherchent favoriser justement prudent stock �chelle �norm�ment Standard compose couronne exceptionnelle flux j'�tais justifier r�fugi�s t�l�phoniques Monsieur Ville accepte inspir� l'ombre pollution situent allemandes boissons douce gouvernements intervention motifs primaire World entrepreneurs l'efficacit� repr�sentation Thomas apparaissent compl�mentaires cycliques franchement instrument rayon Food Roi conversion partager retenue simplicit� Comit� confirm� devaient exp�riences front jeter logistique reconnu Affaires Heureusement com�die historiques imposer l'actionnaire obligatoire recourir r�f�rences traces t�moigne GBL Java acte appliquer catastrophe conduire contribu� fais intervenir mettant pilote plafond remplacement tire Berlin Vincent portable profonde refus� repos b�ton ferm� juges parlementaires pr�vention Donc d'�lectricit� dispositif forment neige suffisant Louvain diffusion f�d�ration lentement prenant souris contenter douleur intervient j'avais look manoeuvre parquet pouss� arguments billets consacr�e dirigeant d�coration holdings justifie levier majeur midi recyclage robe Entre-temps appels directive initial int�ress�s pousser pouvaient secrets surpris univers d'avis poisson sp�cialis�es s�duire verser d'investissements g�n�rations nettoyage ouverts r�ductions v�lo Anne Compagnie Souvent d'Amsterdam explique-t-il l'abri l'int�gration officielle r�solution Service courses l'exploitation pari pousse revendre trace abonn�s craint croissant juger r�gionale symbole touristes Rome actives communautaire contraintes journaliste traditionnelles variable amour atelier budgets budg�taires clef d'ores d�triment nationaux paquet relatif Francis Rupo d'enfants diesel gare l'acquisition parlent rapporte regarder �ventuel Clabecq carr�s psychologique rupture t�l�phonie Air Danemark Sauf citoyen four permettrait puissent rapides Marketing Tendances dit-il d�veloppements enregistre envoy� interm�diaires l'issue liquidit� r�agi Allemands L'autre Louise connues consolidation cr�ateur id�ale l'espoir profit� pr�vus r�sulte similaire Boeing Didier Dieu Willy agir coins constat� d'eux danse occidentale optimistes pens�e professionnelles Computer San Tournai appliqu�e chanson d�roule franchir liquidation morts nouveaut� prestigieux suppression Laurent Mercedes existantes pleinement simultan�ment �tablissement cercle corruption discipline familiales l'avant laboratoire livrer mont�e participe Personne adresse finance g�nie leasing versement bits concern�es dents inclus maximale pr�c�demment routes variations �quipements Declerck chemins constitu�e d'effectuer globalement libres proposant souligner Bon ambitions croissante d�cennies fou l'influence litt�ralement motivation rubrique souvenirs surprises vendue Celles-ci b�b� plainte stockage �crire �nergie Spector annonceurs d'olive d�bats ferait grain sont-ils s�paration tournant vendues Compte Cools Volvo accessoires constitution consultants dommages occup� s'appelle �changes Seconde adresses efficacit� fix�e frappe l'apparition monopole panneaux rest�e sentiments termin� utiles Bruno Seuls appliqu� donnant fondamentaux fr�quemment l'aventure m�tiers planche royale suppose Inc Moins fourni japonaises pay�s profond programmation r�solument L'Europe d'amour d'ouvrir golf poudre propos�es �toiles PRL attach� concevoir dommage l'opinion main-d'oeuvre r�cents strat�giques vitesses Peugeot Philip appr�ci� connexion hommage jardins remonter suppl�ment Canal Tessenderlo cheval entretien inutile l'Espagne laissant m�canisme nouveaut�s plac�s repli r�gionales r�gionaux souple symbolique troubles �valuer Aucun Mac R�gions cession confie moyennant num�ros portrait �tablie cinquantaine d'assurer peuple promis retenir r�ception sexe utilisation visiblement acteur cr�ateurs dites d�poser expositions handicap lourdes plastiques procure proviennent sous-jacente Quick Virgin auxquelles banquiers baptis� finit venait volant Fiat Joseph Lyonnais enseignants geste l'UCL s�rieuse Mignon Royaume-Uni Vers classes doigts encadr� froide niche pr�vision servent Baudouin Nicolas Smeets arriv�e domestique envisager espaces filet inflation pos� promouvoir roues Assurances Capital immense incontestablement lot pharmacie restructurations sportive L'ensemble ci-dessus d'activit�s engagements humains introduction organis�e Delvaux assiste couverts franchise L'histoire annuellement arrivent causes pierres valent volet Hanart Karel Lotus intention l'acheteur manifestement prendra profond�ment relance suivantes suspension commissions divisions d�velopp�e employ� fourchette qu'est s'occupe vendent Clinton Jean-Marie Maurice Nationale compenser d'octobre essayer fond� formidable graphiques professeurs tester George Histoire boutique cam�ra d'avance fond�e heureusement label montagne pensons plate-forme temporaire tomb� tribunaux �vite BMW Monde condamn� culturelle d'air entre-temps entr�es installer perception sauver th� Ferm� Peut-on Unilever accompagn� externe franchi jadis manifestation miracle moral refus r�unit r�v�ler s'installe Etienne Evidemment bateau conseill� d'�cart d�crit fr�quence l'occurrence s'adresser taxes Company concentrer consultation dor�navant dynamisme install�e profite r�unions amateur avoirs calcul� d'atteindre estimation exerce bloc circuits couper courante d'am�liorer d'instruction effectu�s fameuse int�ress� montage pr�vues subsides s�duction trait�s trouvera �quip�s Aucune ing�nieur r�clame r�mun�rations tentent tournent �gale �metteurs Prenons agent attentif d'aide d'oeil existant fluctuations gr� l'administrateur m�dicament partiel permanent s'installer situ�s sportifs vertu Intranet L'�volution Quelque allons appartements duquel kilos sicav toit vers�es chauss�e d'huile futures individuelle manifestations raisonnement sports Christophe DES absolue appel�e contente d'id�es d'investisseurs intense money r�pondent tranches Waterloo assurent calculer choisit citer dot� fixes inf�rieurs mensuel promoteurs relais sorti t�l� voisin Cor�e Lynch dit-on hiver l'Association l'ULB naturelles preuves pr�sent�s souffert Qu'est-ce attendent camions camp contenant curieux d�tente effectue g�ants l'endroit l'interm�diaire l�gale n'�tant prestation publi�s rente r�alisent ski soigneusement vif Cie conviction doubler morceau racines tenant universitaires visiter Center Global d�marrage entam� fondamental l'intervention magique procurer records universitaire vrais L'une ateliers avion confront� contribuables doigt drame f�minin habitudes l'imm�diat lutter p�trolier sup�rieures vois AEX Bell afficher confirmer conserv� d'offrir d�tour fusions l'avons l'�quilibre lever malades ouvrages paradis prouve pr�voient remplac� sp�culation Rwanda concernent d�partements d�riv�s identiques marqu�e n'avaient prince produisent r�sidence voulez L'op�ration Turquie allocations d�montrer enregistr�e individuelles oubli� parking propos�e Commerce Guide Tom comprenant d�but� engagement fit l�gal particip� pass�es pr�sentant pr�sentes quantit�s �chapper Maystadt Software acquisitions affirment alentours assureur autonomie canaux inverse l'adresse l'automobile modes signaler sign�e Goldman Notons cancer carnet convergence foule indispensables int�gr�e nucl�aire op�rateur paiements palette pence priori promesses tentative Belgian Corporation Dutch Tel a�rienne boutiques craignent d�biteur entit�s ouverture procureur puisqu'elle sommets supporter traitements voyageurs Bureau anglaise argument d'�tablir imagin� l'appui m�canismes personnelles privil�gi� satisfait science terrasse tir� tr�sorerie t�l�coms D'ici chaude coup� esth�tique inscrit poissons refuser s'effectue tennis Moi Unix appartement clavier d�montre organismes pressions regroupe secours sous-traitance th�orique accessibles courants d'�t� judiciaires l'innovation l'op�rateur pr�c�dentes r�aliste aventure d'Internet effectifs gains l'opposition l'unit� mus�es rock Coupe Netscape bain d�pos� espoirs majoritaire semblait Digital accorder attire d'�change feuille initiale installation krach malade op�rationnel pauvres pont pr�server publier rechercher recrutement repr�senter r�v�l� sanctions traditionnellement vapeur Cobepa Salon confier consid�r�s cultures hypoth�caire illustre introduite l'�chec menus multinationales paient pareil probl�matique quarantaine rentr�e soutient termin�e voudrait carr� exemplaire lorsqu'ils nulle posent pratiquer sida versements visites �tions �trange CBR berline cash distinguer durs d�fend efficaces essence exclu jolie photographe propri�t�s veau Journal Nobel Vieux atteinte chapitre concertation d�gage ext�rieurs m�dicale pareille patience recueillis substance transforme voile �chec L�opold enthousiasme f�d�rale gloire pr�parations transmettre visiteur Ajouter Brederode Europ�ens Jean-Louis Tony apport� d'importantes l'acier lib�ralisation observateurs panique pr�sent�e r�server signer tendre touristique R�cemment brillant conventions d�cret g�n�reux industries joie stars �gal Sachs continu� dessert espagnol est-ce l�gende passera rapprochement salariale scolaire Mon�taire assur�ment contraint coton curiosit� entit� entr� l'architecte lib�raux logo parlementaire parviennent portables provisoirement routier r�serv�e tourn� veiller Hoogovens XVIIe arbres communs employeurs exercices faisons l'alimentation magazines maintenu roses r�pondu sp�cialit� Citibank Moscou Times accidents adapter amen� avoue collectif d'�valuation dessus ind�pendante l'institution l'�tablissement peintres rappel r�alisations s'av�rer architectes comprise essentielles examen fid�lit� h�ritiers l'actualit� pr�f�rable relancer s'adapter s'engage sable semestriels significative suisses Grande Nouveau cadeaux comportements constamment contribuer d'images offerts p�riph�rie varient Michelin caisses conscient c�d� effectu�es faisaient personnalit�s s'engager syndicat Arbed OPA abandonn� cents destin drogue fines identit� invit�s l'�v�nement modalit�s n�gatifs paru r�pertoire s'int�resse Disney Isabelle Japonais Roland William annonc�e champignons d�fis g�n�rer russes situer supprimer �lu Jean-Paul Spa accord� acquise courtier d'attente foul�e noirs r�sister section signaux sombre susciter compartiments correspondance cr�ances discret d�passent florin form� frapp� papiers repr�sentait saurait vers� absence d'Or d'acqu�rir d'avenir degr�s envoyer joli occupent on-line perc�e priorit�s processeurs rest�s r�sume soie travaillant �conomistes Etant affirmer ambitieux cerveau consensus coordination d'options l'appel magistrats qualifi� rangs tourn�e Alcatel Toyota anonyme cassation cf (usually cf.) confusion discr�tion fondamentalement initialement install�s l'assembl�e l'entretien l'�metteur maman nuances paraissent parfums saine vedettes Nikkei dirig�e duo enseigne indiqu� lourdement module prononcer r�alisateur r�formes star �quivalent Danone Site adopter commis couches explication joint-venture malaise pantalon pomme reine sacs saumon soeur toiles �ch�ant Agusta bond courir expert glace l'enseigne multiplier pluie salons teint European Finalement Maintenant adapt�e diriger g�rant r�partis saveurs souscrit substances vieilles vraisemblablement �labor� �mettre certitude champions cot�s cyclique d�tenteurs explications fonctionnent g�n�rales invite l'expression pauvre successeur zinc Big Claes Six brochure cave codes configuration d'enregistrement fragile f�minine issus magnifique maintenance manuel qu'a recommand� spectaculaires subit traduction �vidente Cons�quence Fabrim�tal KBC adapt�s chronique d'IBM enregistr�s fibre jazz jusque louer m�diatique peser rentables r�ussit s'�levait saisir semble-t-il visible Financial Singapour absolu blanches boulevard commissaire comprennent cr�ent facult� histoires individus issue multiplient pr�texte quotidiens r�fl�chir satellites souffrent standards Washington commercialise directs diversit� gratuite l'Office logiquement ouvertes renoncer calculs compl�ter couples d'entrer d'esprit d'importants l'acte organiser payant paysages r�cup�ration slogan Electric PVC administratives arts avanc� carr�ment changes cr�dibilit� d�placement l'avance parvenu relatifs revues veste Celle FGTB Moody's assur�s cr��s d'�l�ments imm�diat jambes litre mousse prestige sentent souhait touch� �lus Belle Telinfo abrite consid�rables d'urgence disait faillites oeil religieux r�daction s�ries terres vice-pr�sident MHz System XXe cure dirig� don enregistrer juridiques pouce pr�cises pr�tend r�unis salade trouvait �valuation Cinq Fort confi� cuire indicateur l'avait origines parl� remet sp�ciales terrible t�moignent �tonnante Buffett Catherine Research SAP V�ronique achet�e g�n�raux impos�e l'organisme l'�dition mention merveille opposition r�organisation satellite scanner Milan Notamment a-t-elle acier conteste cr�anciers d'acier int�gr�s l'habitude multiplication panier pharmaceutiques quelconque rayons spectateurs transform� troupes Madame Tandis effectu�e fromage g�r� interlocuteur l�gislatives motif m�talliques plac�e r�clamation sch�ma surplus transition trio Coca-Cola Motors Proximus Wallons atteignent bleus chair conforme costume d'accueil intentions l'horizon l'�lectricit� manqu� sortent subsiste supermarch�s D'Ieteren Europ�enne Lorsqu'on am�lior� avantageux d'applications engag�e espoir exceptions fausse l'expansion l'�quivalent plage plaide poivre CHF Livres cadastral chips comptait craintes d'ordinateurs durable d�mocratique exceptionnels factures fonctionnaire fondation ind�pendance invent� issu maturit� mobilit� musiciens organisme recommandations sp�culatif suscit� titulaire traverse �volutions Fed calendrier collective disposant d�valuation l'honneur pauvret� poursuivi qualifier savait su�dois termine traduire valait CSC Forges Hugo Max VVPR appartiennent confront�s demeurent divorce dramatique d�ductibles efficacement existence fermet� imagine int�grer larges locataires orient� pens� vari�t� administrations a�riennes complexit� entrent exercer photographie sauvage terminer venant Corp amortissements champs d�placer d�sign� d�terminant opportunit� piano remont�e s'agisse �troite Difficile Dix Recticel bar concern� constructions l'identit� merveilleux min moindres r�unir survivre ultime �tudi� Lambert caract�rise choisie distribuer d�cid�ment limit�s livr� luxembourgeoise modules progresse promet redresser tomb�e bains d'hommes dessine enfance finition jury mythe optimale pair plateau pouss�e resteront Zaventem assurance-vie compos�e d'entretien d�cident h�las instant jet laine mobiles parcs pr�occupations ramener repr�sent� soudain �diteur Jos� L'auteur Morris Nasdaq administrative autorise banking humour jouit l'actuel market n'ait organisateurs peint s'annonce s'assurer sculptures superbes �quip�e ASBL CMB Gates bronze catholique citron contributions couture disquette d�marrer excellence fatigue imprimantes industrie l'am�nagement l'effort l'encontre laboratoires men�es meuble mondiaux r�duits sont-elles sous-traitants talents Christine Henry administratif administration ailes a�rien carrosserie d'�conomie d�couvertes exclure hautes hi�rarchie impressionnant massivement m�tro possession remport� strictement su�doise utilisateur vais �mises �tage d'arbitrage devez expliquent file hebdomadaire int�resse l'hiver l'�laboration marbre performant personnels pr�venir suivants verte viendra Angleterre Association Hongrie L'affaire Louvain-la-Neuve apportent automne bourgmestre branches carton contraste courage d'analyse datant d�pendra feux importations plantations sid�rurgie signale FMI Jean-Michel L�on Super Venise adaptation allure attach�s exploite folie instance naturels olympique populaires reprenant valorisation villa villages Est-il Renaissance Shell Vienne architecture authentique autonome complicit� d'au d'ouverture d�pendance d�pense fiable invention lanc�s partagent rencontres renouvellement �voluent Akzo Combien March� Xavier ampleur analyses bandes canard collectionneurs compliqu� culturelles d'avril donnera d�placements fermer jug�e l'aise m�daille notaire peut-il privil�gier prototype regain regarde wallonnes Emile Volkswagen accru caoutchouc cinquante communautaires conjoncturel cr�ant durer d�licat exigent pr�c�dents renforce s'ouvre �valu� Lille d�bute d�finitif engag�s exploiter fur positives r�paration soupe transferts Ostende Propos Victor limit�es nourriture offertes ramen� recul� rem�dier similaires triste �carts Data Industries abaiss� boire break chien consacr�s cours-b�n�fice fuite gigantesque imprimante l'Ouest l'emballage l'�glise remplace salariaux spectacles vache velours �tudie ABN Auparavant Cit� Continent Guido Meuse Question d'exemple dot�e d�fini d�finit d�licate d�mission ext�rieure interventions jouant l'engagement n'ayant noires oblig�s Bruxellois Mark Motorola acc�der affichait chemise espagnole fleur gard� habitation huile l'accueil l�gales multipli� revers architecte assister axes concerts contemporains discuter dose d�tiennent folle l'�diteur magie pompe provisions rapidit� t�moignages Cap Festival Finlande NDLR contribue demandeurs d�monstration exact num�riques participent poign�e puissants sp�cialit�s G-Banque III Livre Peeters SICAFI Technology applique copies flacon lunettes mixte nullement plante provisoire publie puissante regrette s'ajoute strat�gies typique vocale Anhyp Brothers brokers concentre diagnostic faciles gestes guise hardware op�rer orient�e passionn� refusent sc�narios suffisent vagues �cart Chrysler S�nat Via ambiance appartenant assist� attrayant bagages blocs d'essai d'histoire d'�tude d�duire forfait manquer restait surprenant s�r�nit� vertus �couter DKK Dirk Gevaert Sant� Wim accueilli affich�s affronter appeler coloris composent contiennent contrepartie fondamentales impressionnante largeur peaux proportions reconversion revente significatif �crite �normes J'aime Network aiment cherch� chinoise d�charge d�put� essais indiquent infrastructures jouets musicale mutation obstacle partant perdent �tudiant J'avais Sinon accord�e adjoint d�barrasser d�bit d�gustation d�jeuner glisse individu l'�ducation l'�lectronique organis�es produite pr�tendre quotidiennement s'�tend secondaires soucieux sous-�valuation verts �cologique �met Hollywood Legrand Lorsqu'il Pro am�lior�e bat e-mail excessive favorise joueur l'OCDE marks office phrase promenade prometteur stimuler s�ances tiendra valoir Martine Qu�bec acquisition augmentent baisses distribue dus massif m�diocre obtenus rentrer sales semblable transmis Julie Place ZAR bouquet ceinture coalition comptables corporate d'actifs d'attendre diff�remment dits italiens journ�es l'assurance-vie linguistique marchands n'avoir opinion originales registre requis synergies tunnel vogue Malaisie charbon emballages esprits examiner fl�chi l'outil librement mentalit� miroir occidentaux parit� progressive sensation sonore supports synonyme vinaigre D�but Euro Hollandais alliance barres charg�s d'habitants dois fier gouverneur l'atelier l'humour n'avez origine pay�e p�troliers signal� variation Point XVIe aliments cam�ras comportant consultance contemporaine d�clin effectif invit� j'en l'actif licenciement match mill�naire salari� studio tenus triple �quipement �toile Bob Californie Devant Smet abonnement baptis�e commerces creux facilite flamandes jurisprudence l'ai l'attitude noyau portraits prononc� publications puce qu'aujourd'hui sinistre terminal Dexia Mes augmentations batterie cin�aste compare guides inconv�nients instances l'avion retourner sympathique �valu�e L'Etat achetant bailleur bonus colonne compensation conseillers continu courbes d�clarer enregistr�es g�n�r� innovations ira jusqu'aux lente occuper pes� pot quarts �preuve Bois Congo Courtrai Powerfin admet attribuer championnat cit�s comble conqu�rir d'encre d'oeuvres d'office devenues excessif incertitudes intitul� l'�valuation p�riph�riques r�clamer r�elles s'�taient Ecolo Nivelles Qu'il Travail allures camps dues exclus grandeur homard illustr� in�vitable in�vitablement l'�quipement mari�s mod�ration ont-ils positivement profits quarante sculpture spots stage universelle vainqueur �dit� �tendue Arts Communications Media Novell Poor's St�phane Word changent communiqu� conversation d'artistes effective interlocuteurs l'Administration l'ambiance n'aime patronales permettront pneus qualifi�s religion souffrir �voqu� Chirac Chris Forest Herman Hubert Opel Parti SEK Terre Vie alternatives anversoise bateaux battu brillante d'introduire d�sert entrepreneur essay� interface int�gralement j'aime modifie personnellement syst�matique Arthur Park admis blocage calls d�veloppent individuel l'ONU l'appr�ciation modestes multinationale out parlant porcelaine p�n�trer respecte soupapes sp�culateurs �tudier Nestl� abus combler conservation donation fiabilit� l'exclusion m'ont parcourir parisien remarquables retournement returns EASDAQ Kodak PDG collecte d'alcool d�ception d�t�rioration l'avoir l'�change lorsqu'elle palme phases privatisations r�p�ter s'imposer valu voulais Almanij Infos Procter Smith Tubize actuariel australien croient d'intervention d'objets encourager fiscalement hautement l'assiette marchand n�erlandaises plaintes reproche retient sillage soldats t�moins urbain FEB L'�conomie adopte boutons chuter conjoints convaincus coop�rative correspondent director n'h�site niches savez stables tend vain Gamble L'art Quinze Servais Seules apport chauffage commercialiser d'attirer d'existence d'organisation dangers foyer ingr�dients n�gocie r�volutionnaire score sid�rurgique techniciens voyageur Brown Corluy Herstal Horta L'avenir attir� com conf�rences constatation d'Am�rique douzaine duration d�tenir indemnit�s lion nuits plomb soumise sportives verres attribu� corriger d'hiver domestiques faille foot home indemnit� romantique simulation Brussels L'avantage Swissair autrefois choisis communales d'Angleterre dessin�e disponibilit� d�tenu engager exceptionnelles figurer habitant hollandaise imm�diate int�gration m�dia �lecteurs Amro DOS Moniteur Parc acceptable appr�cier centre-ville d'elle envisag� fantaisie habituellement poss�der pourrez tentatives touches visibilit� Creyf's Heineken R�gie Sterk Tch�quie analyser autoris� complets contrainte costumes d'agir doucement";

loadDictionary(frenchdict,"french");
loadDictionary(englishdict,"english");

function unloadDictionary( name ){
	delete dict[name];
}

function unloadAllDictionaries(  ){
	dict = {};
}



function loadDictionary( dictionary, name ){
	dict[ name ]={};
	// Get an array of all the words
    var words = dictionary.split( " " );
 
    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[ name ][ words[i] ] = true;
		
    }
    return dict;
}

// Takes in an array of letters and finds the longest
// possible word at the front of the letters
// from http://ejohn.org/blog/dictionary-lookups-in-javascript/
function findWord( letters, dict ) {
	
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

function easierToRememberPassword( allowedCharset, length, password, previous ){	
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

function addSeparatorOrOpenCloseOrNothing( allowedCharset, maxLength, currentPassword){
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

function commonCharset( charset1, charset2){
	var returnCharset="";
	for ( var i = 0; i < charset1.length; i++ )
	{
		var curChar=charset1.charAt(i);
		if( hasOneFromCharset(charset2, curChar+"")) returnCharset+=curChar;
	}
	return returnCharset;
}

function appendOrPrepend( existing, addon){
	if ( Math.random() > .5) return addon + existing;  
	return existing+addon;
}

/**
 * Creates a word for a password easier to remember
 * @param {string} allowedCharset The characters of the custom charset
 * @param {number} length The maximal Length of characters
 * @type {string} the generated word
 */
function easierToRememberPasswordWord( allowedCharset, length ){
	var type = Math.ceil(Math.random()*3);
	
	return easierToRememberPasswordWordRec( allowedCharset, "", length, type, Math.ceil(Math.random()*2) );
	
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
function easierToRememberPasswordWordRec( allowedCharset, currentWord, length, type, lastTaken ){
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
function easierToRememberPasswordNumber( charset, length ){
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
function pickOneFromCharsetWithPreference(allowedCharacters, preferredCharacters){
	var reducedCharset = commonCharset( allowedCharacters, preferredCharacters );
	if( reducedCharset.length == 0 ){
		reducedCharset=allowedCharacters;
	}
	
	return nextChar(reducedCharset);
}




/**
 * Creates a custom charset names "custom" (or replace if already exists) with the provided characters
 * @param {string} The characters of the custom charset
 */
function setCustomCharset( charset ){
	if( charset.length==0 ){
		delete availableCharsets["custom"];
	}else{
		availableCharsets["custom"]=charset;
	}
}

/**
 * Enables all available charset
 */
function enableAllCharsets( ){
	for(var charsetName in availableCharsets){
		 enableCharset( charsetName );
	};
}

/**
 * Enables all default charsets
 */
function enableDefaultCharsets(){
	defaultEnabledCharsets.forEach(function(charsetName) {
		enableCharset( charsetName );
	});
}

/**
 * Enables one charset
 * @param {string} The name of the charset to enable
 */
function enableCharset( charsetName ){
	console.log("Charset " + charsetName  + " enabled");
	enabledCharsets[charsetName]=availableCharsets[charsetName];
}

/**
 * Disables one charset
 * @param {string} The name of the charset to disable
 */
function disableCharset( charsetName ){
	console.log("Charset " + charsetName  + " disabled");
	delete enabledCharsets[charsetName];
}

/**
 * Builds a bigger charset from all enabled charsets
 * @type {string} The complete charset
 */
function prepareCharset( ){
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
function nextChar( charset ){	
	return charset.charAt(Math.floor(Math.random() * charset.length));
}

/**
 * Checks, and ensures if possible, that the password has at least one character from all enabled charsets
 * @param {string} password the password to analyze
 * @type {string} The eventually modified (or not) version of the password
 */
function checkCompliance( password ){
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
function addOneFromCharset( charset, password ){	
	password = replaceCharAt( password, Math.floor(Math.random() * password.length), nextChar(charset))	;
	return password;
} 

/**
 * Replaces a character at specified index
 * @param {string} inputStr the set of characters to include a char from
 * @param {number} index index of the character to replace
 * @type {string} The  modified version of the string
 */
function replaceCharAt(inputStr, index, newChar) {
    var strArray = inputStr.split("");
    strArray[index] = newChar;
    return strArray.join("");
}
/**
 * Rate a password using the default strategy
 * @param {string} password the password being evaluated
  * @type {object} The password rating
 */
function ratePassword( password ){
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
			comment: "Aggregate from all individual ratings (size is first criteria)"
		}
		
	
	
}

/**
 * Provides a subjective rating of a given password according to dictionary lookup
 * @param {string} the password being evaluated
 * @type {object} The resulting rating
 */
function rateDictionary(password, dictionary){
	
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
	
	var allwords=" (all words: ";
	for (var i = 0; i < foundWords.length; i++)
	{
		console .log( "Biggest word found: " + maxWord.word );
		allwords=allwords+"/"+foundWords[i].word;
	}
	var allwords=allwords+")";
	
	// compare size of biggest word found with the password size
	if( ratingFactor > .9 ) return {rating:0.01, comment: "Hazardous, found word in " + maxWord.dictionary + " dictionary: " + maxWord.word + allwords};	
	if( ratingFactor > .8 ) return {rating:0.1, comment: "Weak, found word in " + maxWord.dictionary + " dictionary: " + maxWord.word + allwords};	
	if( ratingFactor  > .7 ) return {rating:0.25, comment: "Questionable, found word in " + maxWord.dictionary + " dictionary: " + maxWord.word + allwords};	
	if( ratingFactor  > .4 ) return {rating:0.25+.7-ratingFactor, comment: "Average, found word in " + maxWord.dictionary + " dictionary: " + maxWord.word + allwords};	
	if( ratingFactor  > .2 ) return {rating:0.8, comment: "Good, found word in " + maxWord.dictionary + " dictionary: " + maxWord.word + allwords};	
	if( ratingFactor  > .1 ) return  {rating:1.0, comment: "Excellent, even if found word in " + maxWord.dictionary + " dictionary: " + maxWord.word + allwords};	
	return {rating:1.0, comment: "Excellent, so significant word found from dictionary compared to password size"};	
	    	
}


/**
 * Provides a subjective rating of a given password according to its size
 * @param {string} the password being evaluated
 * @type {object} The resulting rating
 */
function ratePasswordSize( password ){
	var len = password.length;
	
	// lower than 5 is far too low	
	if ( len < 5 ) return {rating:0.0, comment: "Password is far too short: "+len};		
	if ( len < 8 ) return {rating:0.03*len, comment: "Password is too short: "+len};		
	if ( len < 15 ) return {rating:.4+.05*(len-7), comment: "Password length is questionable: "+len};
	if ( len < 30 ) return {rating:.8+.01*(len-15), comment: "Password length is pretty good: "+len};	
	if ( len < 50 ) return {rating:.99+.0005*(len-30), comment: "Password length is awesome... Is is easy to remember?: "+len};
	return {rating:1.0, comment: "Password length is insane!!: "+len};	
	
	
}


/**
 * Provides a subjective rating of a given password for the amount/size of character sequences inside
 * @param {string} password The set of characters to use
 * @type {number} The rating, floating point value between 0 and 1
 */
function rateSequences( password ){
	
	var sequences=findSequences(password);
	var seqLength = sequences.reduce(function(previousValue, currentValue, index, array){
		return previousValue + currentValue;
	},"").length;		
	var seqStr = sequences.reduce(function(previousValue, currentValue, index, array){
		return previousValue + " / " + currentValue;
	},"");		
	var ratio=seqLength/password.length;
	
	if( ratio <= .1) return {rating:1.0, comment: "Perfect: No (or very few) sequences found"};
	if( ratio <= .5) return {rating:.9-ratio/2, comment: "Average amount of sequences found: " + seqStr};
	if( ratio <= .6) return {rating:.64-(ratio-.5), comment: "Impactive amount of sequences found: " + seqStr};
	if( ratio <= .8) return {rating:.53-((ratio-.6)*2.0), comment: "Too many / long sequences found: " + seqStr};
	if ( ratio == 1.0 ) return {rating:0.0, comment: "Your password is all sequences: " + seqStr} ;
	return {rating:0.1, comment: "Too many / long sequences found: " + seqStr};
	
	
}

/**
 * Provides a subjective rating of a given password for the character sequences inside according to keyboard layouts
 * @param {string} password The set of characters to use
 * @type {number} The rating, floating point value between 0 and 1
 */
function rateKeyboardLayout( password ){
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
function longestCommonSubstring(str1, str2){
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
function rateCharsets( password ){
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
function rateCharacterVariety( password ){	
	var rate=rawRateCharacterVariety( password );
	if (rate.rating >= 1.0 ) return {rating: 1.0, comment: rate.comment}; else return rate;
}

/**
 * Provides a subjective rating of a given password according to the different sets of characters in use
 * @param {string} the password being evaluated
 * @type {object} The resulting rating
 */
function rawRateCharacterVariety( password ){	
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
function hasOneFromCharset( charset, password){
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
function makePassword(){
	return makePasswordWithSize(passwordSize);
}


/**
 * Find all sequences of characters like "ABCDEF" or "123456" in a given password
 * @param {string} password the password to analyze
 * @type {string[]}
 */
function findSequences( password ){
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
 * @param {object} the password rating
 * @type {string} The resulting description
 */
function passwordStrengthDescFromRate(rate){
	if( rate < .5) return "Unsafe";
	if( rate < .6) return "Weak";
	if( rate < .7) return "Medium";
	if( rate < .8) return "Good";
	if( rate >= .8) return "Secure";
	return "N/A";
}

/**
 * Generates a password of a given size
 * @param {number} the size of the requested password
 * @type {string} The generated password
 */
function makePasswordWithSize( passwdSize ){
	var charset=prepareCharset();
	
	if ( easyPasswordRequested ) return easierToRememberPassword( charset, passwdSize,"","");
	else return makeAnyPasswordWithSize(charset, passwdSize);
	
}



function makeAnyPasswordWithSize( charset, passwdSize ){
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
