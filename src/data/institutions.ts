import type { Institution } from "@/types";

const institutions: Institution[] = [
  {
    id: "inst-king",
    slug: "the-king",
    name: {
      en: "The King",
      fr: "Le Roi",
      ar: "الملك",
      tz: "The King",
      es: "El Rey"
    },
    type: "king",
    level: 1,
    constitutionalBasis: {
      en: "Articles 41–47 of the Constitution of 2011 (Chapter II, Of the King)",
      fr: "Articles 41 à 47 de la Constitution de 2011 (Titre II, Du Roi)",
      ar: "المواد من 41 إلى 47 من دستور 2011 (الباب الثاني: الملك)",
      tz: "Articles 41–47 of the Constitution of 2011 (Chapter II, Of the King)",
      es: "Artículos 41–47 de la Constitución de 2011 (Capítulo II, Del Rey)"
    },
    responsibilities: [
      {
        en: "Supreme Representative of the Nation and Symbol of its unity; guarantees the independence of the Nation and the integrity of its territory",
        fr: "Représentant suprême de la Nation et Symbole de son unité ; il garantit l'indépendance de la Nation et l'intégrité de son territoire",
        ar: "الممثل الأسمى للأمة ورمز وحدتها؛ يضمن استقلالها وسلامة ترابها",
        tz: "Supreme Representative of the Nation and Symbol of its unity; guarantees the independence of the Nation and the integrity of its territory",
        es: "Representante Supremo de la Nación y Símbolo de su unidad; garantiza la independencia de la Nación y la integridad de su territorio"
      },
      {
        en: "Head of State and Supreme Commander of the Royal Armed Forces",
        fr: "Chef de l'État et Chef suprême des Forces armées royales",
        ar: "رئيس الدولة وقائد عام للقوات المسلحة الملكية",
        tz: "Head of State and Supreme Commander of the Royal Armed Forces",
        es: "Jefe del Estado y Comandante Supremo de las Fuerzas Armadas Reales"
      },
      {
        en: "Appoints the Head of Government and, on the latter's proposal, the members of the Government",
        fr: "Nomme le Chef du Gouvernement et, sur proposition de ce dernier, les membres du Gouvernement",
        ar: "يعين رئيس الحكومة، باقتراح من هذا الأخير، أعضاء الحكومة",
        tz: "Appoints the Head of Government and, on the latter's proposal, the members of the Government",
        es: "Nombra al Jefe de Gobierno y, a propuesta de este, a los miembros del Gobierno"
      },
      {
        en: "Promulgates the laws, exercises the regulatory power and may submit any draft law to referendum",
        fr: "Promulgue les lois, exerce le pouvoir réglementaire et peut soumettre tout projet de loi à référendum",
        ar: "يصدر القوانين ويمارس السلطة التنظيمية وله أن يعرض أي مشروع قانون على الاستفتاء",
        tz: "Promulgates the laws, exercises the regulatory power and may submit any draft law to referendum",
        es: "Promulga las leyes, ejerce el poder reglamentario y puede someter cualquier proyecto de ley a referéndum"
      },
      {
        en: "Presides over the Council of Ministers and may dissolve Parliament after consultation",
        fr: "Préside le Conseil des ministres et peut dissoudre le Parlement après consultation",
        ar: "يرأس مجلس الوزراء وله أن يحل البرلمان بعد الاستشارة",
        tz: "Presides over the Council of Ministers and may dissolve Parliament after consultation",
        es: "Preside el Consejo de Ministros y puede disolver el Parlamento previa consulta"
      },
      {
        en: "Guarantees the independence of the judicial power and presides over the Superior Council of the Judicial Power",
        fr: "Garantit l'indépendance du pouvoir judiciaire et préside le Conseil supérieur du pouvoir judiciaire",
        ar: "يضمن استقلال السلطة القضائية ويرأس المجلس الأعلى للسلطة القضائية",
        tz: "Guarantees the independence of the judicial power and presides over the Superior Council of the Judicial Power",
        es: "Garantiza la independencia del poder judicial y preside el Consejo Superior del Poder Judicial"
      }
    ],
    website: "https://www.maroc.ma",
    content: {
      en: "The King is the Head of State and the Supreme Representative of the Nation. He is the Symbol of its unity and guarantees the independence of the Nation and the integrity of its territory. His person is inviolable, and respect and devotion are owed to him. The Constitution of 2011 (Articles 41–47) defines his prerogatives within a constitutional, democratic, parliamentary and social monarchy.",
      fr: "Le Roi est le Chef de l'État et le Représentant suprême de la Nation. Il est le Symbole de son unité et garantit l'indépendance de la Nation et l'intégrité de son territoire. Sa personne est inviolable et le respect et la dévotion lui sont dus. La Constitution de 2011 (articles 41 à 47) définit ses prérogatives dans le cadre d'une monarchie constitutionnelle, démocratique, parlementaire et sociale.",
      ar: "الملك هو رئيس الدولة والممثل الأسمى للأمة، ورمز وحدتها، ويضمن استقلالها وسلامة ترابها. شخصه مصون وله واجب الاحترام والتفاني. ويحدد دستور 2011 (المواد 41 إلى 47) صلاحياته في إطار ملكية دستورية ديمقراطية برلمانية واجتماعية.",
      tz: "The King is the Head of State and the Supreme Representative of the Nation. He is the Symbol of its unity and guarantees the independence of the Nation and the integrity of its territory. His person is inviolable, and respect and devotion are owed to him. The Constitution of 2011 (Articles 41–47) defines his prerogatives within a constitutional, democratic, parliamentary and social monarchy.",
      es: "El Rey es el Jefe del Estado y el Representante Supremo de la Nación. Es el Símbolo de su unidad y garantiza la independencia de la Nación y la integridad de su territorio. Su persona es inviolable y se le debe respeto y devoción. La Constitución de 2011 (artículos 41 a 47) define sus prerrogativas en el marco de una monarquía constitucional, democrática, parlamentaria y social."
    },
    currentHolder: {
      en: "His Majesty King Mohammed VI",
      fr: "Sa Majesté le Roi Mohammed VI",
      ar: "صاحب الجلالة الملك محمد السادس",
      tz: "His Majesty King Mohammed VI",
      es: "Su Majestad el Rey Mohammed VI"
    },
    order: 1,
    sourceUrl: "https://www.maroc.ma/en/the-kingdom",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-government",
    slug: "government",
    name: {
      en: "The Government",
      fr: "Le Gouvernement",
      ar: "الحكومة",
      tz: "The Government",
      es: "El Gobierno"
    },
    type: "government",
    level: 2,
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government), Article 87 and following",
      fr: "Constitution de 2011, Titre III (Du Gouvernement), article 87 et suivants",
      ar: "دستور 2011، الباب الثالث (الحكومة)، المادة 87 وما بعدها",
      tz: "Constitution of 2011, Chapter III (Of the Government), Article 87 and following",
      es: "Constitución de 2011, Capítulo III (Del Gobierno), artículo 87 y siguientes"
    },
    responsibilities: [
      {
        en: "Implements the policy of the State and administers the public services",
        fr: "Met en œuvre la politique de l'État et administre les services publics",
        ar: "تنفذ سياسة الدولة وتدير المرافق العمومية",
        tz: "Implements the policy of the State and administers the public services",
        es: "Aplica la política del Estado y administra los servicios públicos"
      },
      {
        en: "Exercises the regulatory power and prepares the draft laws and the draft budget",
        fr: "Exerce le pouvoir réglementaire et prépare les projets de loi et le projet de loi de finances",
        ar: "تمارس السلطة التنظيمية وتعد مشاريع القوانين ومشروع قانون المالية",
        tz: "Exercises the regulatory power and prepares the draft laws and the draft budget",
        es: "Ejerce el poder reglamentario y prepara los proyectos de ley y el proyecto de ley de finanzas"
      },
      {
        en: "Supervises the public establishments and the state-owned enterprises",
        fr: "Tutelle les établissements publics et les entreprises publiques",
        ar: "تشرف على المؤسسات العمومية والمقاولات العمومية",
        tz: "Supervises the public establishments and the state-owned enterprises",
        es: "Supervisa los establecimientos públicos y las empresas públicas"
      },
      {
        en: "Is politically responsible to Parliament, which may grant it its confidence or withdraw it",
        fr: "Est politiquement responsable devant le Parlement, qui peut lui accorder ou retirer sa confiance",
        ar: "مسؤولة سياسيا أمام البرلمان الذي يمكن أن يمنحها ثقته أو يسحبها منها",
        tz: "Is politically responsible to Parliament, which may grant it its confidence or withdraw it",
        es: "Es políticamente responsable ante el Parlamento, que puede concederle o retirarle su confianza"
      }
    ],
    website: "https://www.maroc.ma",
    content: {
      en: "The Government is the executive body of the State. It is composed of the Head of Government and the ministers, appointed by the King on the proposal of the Head of Government (Chapter III of the Constitution of 2011). It is responsible for implementing the policy of the State, administering the public services and supervising the public establishments and enterprises.",
      fr: "Le Gouvernement est l'organe exécutif de l'État. Il est composé du Chef du Gouvernement et des ministres, nommés par le Roi sur proposition du Chef du Gouvernement (Titre III de la Constitution de 2011). Il a pour mission de mettre en œuvre la politique de l'État, d'administrer les services publics et de veiller sur les établissements et entreprises publics.",
      ar: "الحكومة هي جهاز الدولة التنفيذي، وتتكون من رئيس الحكومة والوزراء الذين يعينهم الملك باقتراح من رئيس الحكومة (الباب الثالث من دستور 2011). وتكلف بتنفيذ سياسة الدولة وإدارة المرافق العمومية والإشراف على المؤسسات والمقاولات العمومية.",
      tz: "The Government is the executive body of the State. It is composed of the Head of Government and the ministers, appointed by the King on the proposal of the Head of Government (Chapter III of the Constitution of 2011). It is responsible for implementing the policy of the State, administering the public services and supervising the public establishments and enterprises.",
      es: "El Gobierno es el órgano ejecutivo del Estado. Está compuesto por el Jefe de Gobierno y los ministros, nombrados por el Rey a propuesta del Jefe de Gobierno (Capítulo III de la Constitución de 2011). Tiene la misión de aplicar la política del Estado, administrar los servicios públicos y supervisar los establecimientos y empresas públicos."
    },
    order: 2,
    sourceUrl: "https://www.maroc.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-parliament",
    slug: "parliament",
    name: {
      en: "Parliament",
      fr: "Le Parlement",
      ar: "البرلمان",
      tz: "Parliament",
      es: "El Parlamento"
    },
    type: "parliament",
    level: 2,
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter IV (Of the Parliament), Articles 61 to 84",
      fr: "Constitution de 2011, Titre IV (Du Parlement), articles 61 à 84",
      ar: "دستور 2011، الباب الرابع (البرلمان)، المواد من 61 إلى 84",
      tz: "Constitution of 2011, Chapter IV (Of the Parliament), Articles 61 to 84",
      es: "Constitución de 2011, Capítulo IV (Del Parlamento), artículos 61 a 84"
    },
    responsibilities: [
      {
        en: "Votes the laws, including the finance law, and the organic laws",
        fr: "Vote les lois, y compris la loi de finances, et les lois organiques",
        ar: "يصوت على القوانين، بما فيها قانون المالية والقوانين التنظيمية",
        tz: "Votes the laws, including the finance law, and the organic laws",
        es: "Vota las leyes, incluida la ley de finanzas, y las leyes orgánicas"
      },
      {
        en: "Controls the action of the Government and evaluates public policies",
        fr: "Contrôle l'action du Gouvernement et évalue les politiques publiques",
        ar: "يراقب عمل الحكومة ويقييم السياسات العمومية",
        tz: "Controls the action of the Government and evaluates public policies",
        es: "Controla la acción del Gobierno y evalúa las políticas públicas"
      },
      {
        en: "Debates questions of general policy and may set up commissions of inquiry",
        fr: "Débat des questions de politique générale et peut créer des commissions d'enquête",
        ar: "يناقش قضايا السياسة العامة ويمكنه إحداث لجان تقصي الحقائق",
        tz: "Debates questions of general policy and may set up commissions of inquiry",
        es: "Debate las cuestiones de política general y puede crear comisiones de investigación"
      }
    ],
    website: "https://www.parlement.ma",
    content: {
      en: "Parliament is the legislative body of the Kingdom. It is composed of two chambers: the House of Representatives, whose 395 members are elected by direct universal suffrage for five-year terms, and the House of Councillors, whose 120 members are elected by indirect suffrage for six-year terms (Chapter IV of the Constitution of 2011).",
      fr: "Le Parlement est l'organe législatif du Royaume. Il est composé de deux chambres : la Chambre des représentants, dont les 395 membres sont élus au suffrage universel direct pour cinq ans, et la Chambre des conseillers, dont les 120 membres sont élus au suffrage indirect pour six ans (Titre IV de la Constitution de 2011).",
      ar: "البرلمان هو الهيئة التشريعية للمملكة، ويتكون من غرفتين: مجلس النواب الذي يضم 395 عضوا ينتخبون بالاقتراع العام المباشر لمدة خمس سنوات، ومجلس المستشارين الذي يضم 120 عضوا ينتخبون بالاقتراع غير المباشر لمدة ست سنوات (الباب الرابع من دستور 2011).",
      tz: "Parliament is the legislative body of the Kingdom. It is composed of two chambers: the House of Representatives, whose 395 members are elected by direct universal suffrage for five-year terms, and the House of Councillors, whose 120 members are elected by indirect suffrage for six-year terms (Chapter IV of the Constitution of 2011).",
      es: "El Parlamento es el órgano legislativo del Reino. Está compuesto por dos cámaras: la Cámara de Representantes, cuyos 395 miembros son elegidos por sufragio universal directo para periodos de cinco años, y la Cámara de Consejeros, cuyos 120 miembros son elegidos por sufragio indirecto para periodos de seis años (Capítulo IV de la Constitución de 2011)."
    },
    order: 3,
    sourceUrl: "https://www.parlement.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-judiciary",
    slug: "judiciary",
    name: {
      en: "The Judiciary",
      fr: "Le pouvoir judiciaire",
      ar: "السلطة القضائية",
      tz: "The Judiciary",
      es: "El poder judicial"
    },
    type: "judiciary",
    level: 2,
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter VI (Of the judicial power), Article 107 and following",
      fr: "Constitution de 2011, Titre VI (Du pouvoir judiciaire), article 107 et suivants",
      ar: "دستور 2011، الباب السادس (السلطة القضائية)، المادة 107 وما بعدها",
      tz: "Constitution of 2011, Chapter VI (Of the judicial power), Article 107 and following",
      es: "Constitución de 2011, Capítulo VI (Del poder judicial), artículo 107 y siguientes"
    },
    responsibilities: [
      {
        en: "Renders justice in the name of the King and decides on the disputes submitted to it",
        fr: "Rend la justice au nom du Roi et statue sur les litiges qui lui sont soumis",
        ar: "تقضي باسم الملك وتفصل في النزاعات المعروضة عليها",
        tz: "Renders justice in the name of the King and decides on the disputes submitted to it",
        es: "Imparte justicia en nombre del Rey y resuelve los litigios que se le someten"
      },
      {
        en: "Guarantees the fundamental rights and freedoms and the application of the law",
        fr: "Garantit les droits et libertés fondamentaux et l'application de la loi",
        ar: "تضمن الحقوق والحريات الأساسية وتطبيق القانون",
        tz: "Guarantees the fundamental rights and freedoms and the application of the law",
        es: "Garantiza los derechos y libertades fundamentales y la aplicación de la ley"
      },
      {
        en: "Is independent of the legislative power and the executive power",
        fr: "Est indépendante du pouvoir législatif et du pouvoir exécutif",
        ar: "مستقلة عن السلطة التشريعية والسلطة التنفيذية",
        tz: "Is independent of the legislative power and the executive power",
        es: "Es independiente del poder legislativo y del poder ejecutivo"
      }
    ],
    website: "https://www.justice.gov.ma",
    content: {
      en: "The judicial power is independent of the legislative power and the executive power (Chapter VI of the Constitution of 2011). Justice is rendered in the name of the King by the courts of the Kingdom: communal and district courts, courts of first instance, courts of appeal and the Supreme Court, together with the administrative tribunals, the commercial courts and the standing tribunal of the Royal Armed Forces.",
      fr: "Le pouvoir judiciaire est indépendant du pouvoir législatif et du pouvoir exécutif (Titre VI de la Constitution de 2011). La justice est rendue au nom du Roi par les juridictions du Royaume : tribunaux communaux et de district, tribunaux de première instance, cours d'appel et Cour suprême, auxquels s'ajoutent les tribunaux administratifs, les tribunaux de commerce et le tribunal permanent des Forces armées royales.",
      ar: "السلطة القضائية مستقلة عن السلطة التشريعية والسلطة التنفيذية (الباب السادس من دستور 2011). وتقضي باسم الملك عبر محاكم المملكة: المحاكم الجماعية والمقاطعية، ومحاكم الدرجة الأولى، ومحاكم الاستئناف، والمحكمة العليا، إضافة إلى المحاكم الإدارية والمحاكم التجارية والمحكمة الدائمة للقوات المسلحة الملكية.",
      tz: "The judicial power is independent of the legislative power and the executive power (Chapter VI of the Constitution of 2011). Justice is rendered in the name of the King by the courts of the Kingdom: communal and district courts, courts of first instance, courts of appeal and the Supreme Court, together with the administrative tribunals, the commercial courts and the standing tribunal of the Royal Armed Forces.",
      es: "El poder judicial es independiente del poder legislativo y del poder ejecutivo (Capítulo VI de la Constitución de 2011). La justicia se imparte en nombre del Rey por los tribunales del Reino: tribunales comunales y de distrito, tribunales de primera instancia, tribunales de apelación y el Tribunal Supremo, a los que se suman los tribunales administrativos, los tribunales mercantiles y el tribunal permanente de las Fuerzas Armadas Reales."
    },
    order: 4,
    sourceUrl: "https://www.justice.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-constitutional-court",
    slug: "constitutional-court",
    name: {
      en: "Constitutional Court",
      fr: "Cour constitutionnelle",
      ar: "المحكمة الدستورية",
      tz: "Constitutional Court",
      es: "Tribunal Constitucional"
    },
    type: "constitutional_court",
    level: 2,
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter VII (Of the Constitutional Court), Articles 129 to 132",
      fr: "Constitution de 2011, Titre VII (De la Cour constitutionnelle), articles 129 à 132",
      ar: "دستور 2011، الباب السابع (المحكمة الدستورية)، المواد من 129 إلى 132",
      tz: "Constitution of 2011, Chapter VII (Of the Constitutional Court), Articles 129 to 132",
      es: "Constitución de 2011, Capítulo VII (Del Tribunal Constitucional), artículos 129 a 132"
    },
    responsibilities: [
      {
        en: "Rules on the constitutionality of the laws before their promulgation",
        fr: "Statue sur la constitutionnalité des lois avant leur promulgation",
        ar: "تبت في دستورية القوانين قبل صدورها",
        tz: "Rules on the constitutionality of the laws before their promulgation",
        es: "Resuelve sobre la constitucionalidad de las leyes antes de su promulgación"
      },
      {
        en: "Decides on the validity of the election of the members of Parliament and of referendums",
        fr: "Décide de la validité de l'élection des membres du Parlement et des référendums",
        ar: "تقرر في صحة انتخاب أعضاء البرلمان وفي صحة عمليات الاستفتاء",
        tz: "Decides on the validity of the election of the members of Parliament and of referendums",
        es: "Decide sobre la validez de la elección de los miembros del Parlamento y de los referéndums"
      },
      {
        en: "May be seized by the King, the Head of Government, the President of either chamber or a qualified minority of parliamentarians",
        fr: "Peut être saisie par le Roi, le Chef du Gouvernement, le président de l'une ou l'autre chambre ou une minorité qualifiée de parlementaires",
        ar: "يمكن أن تُعرض عليها النزاعات من طرف الملك أو رئيس الحكومة أو رئيس إحدى الغرفتين أو أقلية مؤهلة من البرلمانيين",
        tz: "May be seized by the King, the Head of Government, the President of either chamber or a qualified minority of parliamentarians",
        es: "Puede ser requerida por el Rey, el Jefe de Gobierno, el presidente de cualquiera de las cámaras o una minoría cualificada de parlamentarios"
      },
      {
        en: "Rulings on preliminary questions of constitutionality raised in the course of proceedings before any court",
        fr: "Statue sur les questions prioritaires de constitutionnalité soulevées au cours d'une instance devant toute juridiction",
        ar: "تبت في المسائل الأولية للدستورية المثارة في إطار نازلة معروضة على أي محكمة",
        tz: "Rulings on preliminary questions of constitutionality raised in the course of proceedings before any court",
        es: "Resuelve las cuestiones prejudiciales de constitucionalidad planteadas en el curso de un proceso ante cualquier tribunal"
      }
    ],
    website: "https://www.cc.gov.ma",
    content: {
      en: "The Constitutional Court is the constitutional jurisdiction of the Kingdom (Chapter VII, Articles 129 to 132 of the Constitution of 2011). It is composed of twelve members: one third designated by the King, one third elected by the House of Representatives and one third elected by the House of Councillors. They are appointed for a single, non-renewable term of nine years, and the Court is renewed by thirds every three years.",
      fr: "La Cour constitutionnelle est la juridiction constitutionnelle du Royaume (Titre VII, articles 129 à 132 de la Constitution de 2011). Elle est composée de douze membres : un tiers désigné par le Roi, un tiers élu par la Chambre des représentants et un tiers élu par la Chambre des conseillers. Ils sont nommés pour un mandat unique et non renouvelable de neuf ans, et la Cour est renouvelée par tiers tous les trois ans.",
      ar: "المحكمة الدستورية هي هيئة القضاء الدستوري في المملكة (الباب السابع، المواد من 129 إلى 132 من دستور 2011). وتتكون من اثني عشر عضوا: ثلث يعينه الملك، وثلث تنتخبه مجلس النواب، وثلث ينتخبه مجلس المستشارين. ويعينون لمدة واحدة غير قابلة للتجديد مدتها تسع سنوات، وتجدد المحكمة بالثلث كل ثلاث سنوات.",
      tz: "The Constitutional Court is the constitutional jurisdiction of the Kingdom (Chapter VII, Articles 129 to 132 of the Constitution of 2011). It is composed of twelve members: one third designated by the King, one third elected by the House of Representatives and one third elected by the House of Councillors. They are appointed for a single, non-renewable term of nine years, and the Court is renewed by thirds every three years.",
      es: "El Tribunal Constitucional es la jurisdicción constitucional del Reino (Capítulo VII, artículos 129 a 132 de la Constitución de 2011). Está compuesto por doce miembros: un tercio designado por el Rey, un tercio elegido por la Cámara de Representantes y un tercio elegido por la Cámara de Consejeros. Son nombrados para un mandato único y renovable de nueve años, y el Tribunal se renueva por tercios cada tres años."
    },
    order: 5,
    sourceUrl: "https://www.cc.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-head-of-government",
    slug: "head-of-government",
    name: {
      en: "Head of Government",
      fr: "Chef du Gouvernement",
      ar: "رئيس الحكومة",
      tz: "Head of Government",
      es: "Jefe de Gobierno"
    },
    type: "head_of_government",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government), Articles 87 to 88",
      fr: "Constitution de 2011, Titre III (Du Gouvernement), articles 87 à 88",
      ar: "دستور 2011، الباب الثالث (الحكومة)، المادتان 87 و88",
      tz: "Constitution of 2011, Chapter III (Of the Government), Articles 87 to 88",
      es: "Constitución de 2011, Capítulo III (Del Gobierno), artículos 87 a 88"
    },
    responsibilities: [
      {
        en: "Directs and coordinates the action of the Government",
        fr: "Dirige et coordonne l'action du Gouvernement",
        ar: "يوجه وينسق عمل الحكومة",
        tz: "Directs and coordinates the action of the Government",
        es: "Dirige y coordina la acción del Gobierno"
      },
      {
        en: "Proposes the members of the Government to the King and chairs the Council of Government",
        fr: "Propose au Roi les membres du Gouvernement et préside le Conseil de gouvernement",
        ar: "يقترح على الملك أعضاء الحكومة ويرأس مجلس الحكومة",
        tz: "Proposes the members of the Government to the King and chairs the Council of Government",
        es: "Propone al Rey a los miembros del Gobierno y preside el Consejo de Gobierno"
      },
      {
        en: "Exercises the regulatory power, without prejudice to the prerogatives devolved to the King",
        fr: "Exerce le pouvoir réglementaire, sous réserve des prérogatives dévolues au Roi",
        ar: "يمارس السلطة التنظيمية، مع مراعاة الصلاحيات المخولة للملك",
        tz: "Exercises the regulatory power, without prejudice to the prerogatives devolved to the King",
        es: "Ejerce el poder reglamentario, sin perjuicio de las prerrogativas atribuidas al Rey"
      },
      {
        en: "Presents the programme of his Government to the House of Representatives",
        fr: "Présente le programme de son Gouvernement devant la Chambre des représentants",
        ar: "يعرض برنامج حكومته على مجلس النواب",
        tz: "Presents the programme of his Government to the House of Representatives",
        es: "Presenta el programa de su Gobierno ante la Cámara de Representantes"
      }
    ],
    website: "https://www.cg.gov.ma",
    content: {
      en: "The Head of Government directs and coordinates the action of the Government (Articles 87 to 88 of the Constitution of 2011). Following the general election, the King appoints him from the political party which has won the greatest number of seats in the House of Representatives, and he is tasked with forming the Government.",
      fr: "Le Chef du Gouvernement dirige et coordonne l'action du Gouvernement (articles 87 à 88 de la Constitution de 2011). À la suite des élections législatives, le Roi le nomme parmi le parti politique ayant remporté le plus grand nombre de sièges à la Chambre des représentants, et il est chargé de former le Gouvernement.",
      ar: "يوجه رئيس الحكومة وينسق عمل الحكومة (المادتان 87 و88 من دستور 2011). وبعد الانتخابات التشريعية، يعينه الملك من بين الحزب السياسي الذي فاز بأكبر عدد من المقاعد في مجلس النواب، ويكلف بتشكيل الحكومة.",
      tz: "The Head of Government directs and coordinates the action of the Government (Articles 87 to 88 of the Constitution of 2011). Following the general election, the King appoints him from the political party which has won the greatest number of seats in the House of Representatives, and he is tasked with forming the Government.",
      es: "El Jefe de Gobierno dirige y coordina la acción del Gobierno (artículos 87 a 88 de la Constitución de 2011). Tras las elecciones legislativas, el Rey lo nombra de entre el partido político que ha obtenido el mayor número de escaños en la Cámara de Representantes, y se le encomienda la formación del Gobierno."
    },
    currentHolder: {
      en: "Fatima Ezzahra El Mansouri",
      fr: "Fatima Ezzahra El Mansouri",
      ar: "فاطمة الزهراء المنصوري",
      tz: "Fatima Ezzahra El Mansouri",
      es: "Fatima Ezzahra El Mansouri"
    },
    order: 6,
    sourceUrl: "https://www.cg.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-ministry-foreign-affairs",
    slug: "ministry-foreign-affairs",
    name: {
      en: "Ministry of Foreign Affairs, African Cooperation and Moroccans Residing Abroad",
      fr: "Ministère des Affaires étrangères, de la Coopération africaine et des Marocains résidant à l'étranger",
      ar: "وزارة الشؤون الخارجية والتعاون الإفريقي والمغاربة المقيمين بالخارج",
      tz: "Ministry of Foreign Affairs, African Cooperation and Moroccans Residing Abroad",
      es: "Ministerio de Asuntos Exteriores, Cooperación Africana y Marroquíes Residentes en el Extranjero"
    },
    type: "ministry",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      fr: "Constitution de 2011, Titre III (Du Gouvernement) ; les ministres sont nommés par le Roi sur proposition du Chef du Gouvernement",
      ar: "دستور 2011، الباب الثالث (الحكومة)؛ يُعين الوزراء من طرف الملك باقتراح من رئيس الحكومة",
      tz: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      es: "Constitución de 2011, Capítulo III (Del Gobierno); los ministros son nombrados por el Rey a propuesta del Jefe de Gobierno"
    },
    responsibilities: [
      {
        en: "Conducts the foreign policy of the Kingdom and represents it in international organizations",
        fr: "Conduit la politique étrangère du Royaume et le représente dans les organisations internationales",
        ar: "تدير السياسة الخارجية للمملكة وتمثلها في المنظمات الدولية",
        tz: "Conducts the foreign policy of the Kingdom and represents it in international organizations",
        es: "Dirige la política exterior del Reino y lo representa en las organizaciones internacionales"
      },
      {
        en: "Negotiates and follows the implementation of the treaties and international agreements",
        fr: "Négocie et suit la mise en œuvre des traités et accords internationaux",
        ar: "تفاوض وتتبع تنفيذ المعاهدات والاتفاقيات الدولية",
        tz: "Negotiates and follows the implementation of the treaties and international agreements",
        es: "Negocia y sigue la aplicación de los tratados y acuerdos internacionales"
      },
      {
        en: "Protects the rights and interests of Moroccans residing abroad and manages consular affairs",
        fr: "Protège les droits et intérêts des Marocains résidant à l'étranger et gère les affaires consulaires",
        ar: "تحمي حقوق ومصالح المغاربة المقيمين بالخارج وتدير الشؤون القنصلية",
        tz: "Protects the rights and interests of Moroccans residing abroad and manages consular affairs",
        es: "Protege los derechos e intereses de los marroquíes residentes en el extranjero y gestiona los asuntos consulares"
      }
    ],
    website: "https://www.diplomatie.gov.ma",
    content: {
      en: "The Ministry of Foreign Affairs, African Cooperation and Moroccans Residing Abroad is responsible for conducting the foreign policy of the Kingdom and for representing it abroad and in the international organizations. It implements the strategic orientations of His Majesty the King, in particular the African policy of the Kingdom.",
      fr: "Le Ministère des Affaires étrangères, de la Coopération africaine et des Marocains résidant à l'étranger est chargé de la conduite de la politique étrangère du Royaume et de sa représentation à l'étranger et dans les organisations internationales. Il met en œuvre les orientations stratégiques de Sa Majesté le Roi, en particulier la politique africaine du Royaume.",
      ar: "تتكلف وزارة الشؤون الخارجية والتعاون الإفريقي والمغاربة المقيمين بالخارج بقيادة السياسة الخارجية للمملكة وتمثيلها في الخارج وفي المنظمات الدولية، وتنفذ التوجهات الاستراتيجية لصاحب الجلالة الملك، لا سيما السياسة الإفريقية للمملكة.",
      tz: "The Ministry of Foreign Affairs, African Cooperation and Moroccans Residing Abroad is responsible for conducting the foreign policy of the Kingdom and for representing it abroad and in the international organizations. It implements the strategic orientations of His Majesty the King, in particular the African policy of the Kingdom.",
      es: "El Ministerio de Asuntos Exteriores, Cooperación Africana y Marroquíes Residentes en el Extranjero es responsable de la política exterior del Reino y de su representación ante el extranjero y en las organizaciones internacionales. Aplica las orientaciones estratégicas de Su Majestad el Rey, en particular la política africana del Reino."
    },
    currentHolder: {
      en: "Nasser Bourita",
      fr: "Nasser Bourita",
      ar: "ناصر بوريطة",
      tz: "Nasser Bourita",
      es: "Nasser Bourita"
    },
    order: 7,
    sourceUrl: "https://www.diplomatie.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-ministry-interior",
    slug: "ministry-interior",
    name: {
      en: "Ministry of the Interior",
      fr: "Ministère de l'Intérieur",
      ar: "وزارة الداخلية",
      tz: "Ministry of the Interior",
      es: "Ministerio del Interior"
    },
    type: "ministry",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      fr: "Constitution de 2011, Titre III (Du Gouvernement) ; les ministres sont nommés par le Roi sur proposition du Chef du Gouvernement",
      ar: "دستور 2011، الباب الثالث (الحكومة)؛ يُعين الوزراء من طرف الملك باقتراح من رئيس الحكومة",
      tz: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      es: "Constitución de 2011, Capítulo III (Del Gobierno); los ministros son nombrados por el Rey a propuesta del Jefe de Gobierno"
    },
    responsibilities: [
      {
        en: "Ensures the maintenance of public order and the protection of the institutions of the State",
        fr: "Veille au maintien de l'ordre public et à la protection des institutions de l'État",
        ar: "تضمن صيانة النظام العمومي وحماية مؤسسات الدولة",
        tz: "Ensures the maintenance of public order and the protection of the institutions of the State",
        es: "Velar por el mantenimiento del orden público y la protección de las instituciones del Estado"
      },
      {
        en: "Prepares and organizes the electoral operations",
        fr: "Prépare et organise les opérations électorales",
        ar: "تعد وتنظم العمليات الانتخابية",
        tz: "Prepares and organizes the electoral operations",
        es: "Prepara y organiza las operaciones electorales"
      },
      {
        en: "Supervises the territorial administration through the governors (walis and pashas) and oversees the local authorities",
        fr: "Encadre l'administration territoriale par les gouverneurs (walis et pachas) et assure la tutelle des collectivités",
        ar: "تشرف على الإدارة الترابية عبر الولاة والعمال وتقوم بوصاية الجماعات الترابية",
        tz: "Supervises the territorial administration through the governors (walis and pashas) and oversees the local authorities",
        es: "Supervisa la administración territorial mediante los gobernadores (walis y pachás) y ejerce la tutela de las entidades locales"
      }
    ],
    website: "https://www.interieur.gov.ma",
    content: {
      en: "The Ministry of the Interior ensures the maintenance of public order and the protection of the institutions of the State. It prepares and organizes the electoral operations and supervises the territorial administration through the governors (walis and pashas), representatives of the central authority in the regions, prefectures and provinces.",
      fr: "Le Ministère de l'Intérieur veille au maintien de l'ordre public et à la protection des institutions de l'État. Il prépare et organise les opérations électorales et encadre l'administration territoriale par les gouverneurs (walis et pachas), représentants de l'autorité centrale dans les régions, préfectures et provinces.",
      ar: "تضمن وزارة الداخلية صيانة النظام العمومي وحماية مؤسسات الدولة، وتعد وتنظم العمليات الانتخابية، وتشرف على الإدارة الترابية عبر الولاة والعمال كممثلين للسلطة المركزية في الجهات والعمالات والأقاليم.",
      tz: "The Ministry of the Interior ensures the maintenance of public order and the protection of the institutions of the State. It prepares and organizes the electoral operations and supervises the territorial administration through the governors (walis and pashas), representatives of the central authority in the regions, prefectures and provinces.",
      es: "El Ministerio del Interior vela por el mantenimiento del orden público y la protección de las instituciones del Estado. Prepara y organiza las operaciones electorales y supervisa la administración territorial mediante los gobernadores (walis y pachás), representantes de la autoridad central en las regiones, prefecturas y provincias."
    },
    currentHolder: {
      en: "Abdelouafi Laftit",
      fr: "Abdelouafi Laftit",
      ar: "عبد الوافي لفتيت",
      tz: "Abdelouafi Laftit",
      es: "Abdelouafi Laftit"
    },
    order: 8,
    sourceUrl: "https://www.interieur.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-ministry-justice",
    slug: "ministry-justice",
    name: {
      en: "Ministry of Justice",
      fr: "Ministère de la Justice",
      ar: "وزارة العدل",
      tz: "Ministry of Justice",
      es: "Ministerio de Justicia"
    },
    type: "ministry",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      fr: "Constitution de 2011, Titre III (Du Gouvernement) ; les ministres sont nommés par le Roi sur proposition du Chef du Gouvernement",
      ar: "دستور 2011، الباب الثالث (الحكومة)؛ يُعين الوزراء من طرف الملك باقتراح من رئيس الحكومة",
      tz: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      es: "Constitución de 2011, Capítulo III (Del Gobierno); los ministros son nombrados por el Rey a propuesta del Jefe de Gobierno"
    },
    responsibilities: [
      {
        en: "Contributes to the elaboration of the policy of the State in matters of justice and to the modernization of the judicial system",
        fr: "Contribue à l'élaboration de la politique de l'État en matière de justice et à la modernisation du système judiciaire",
        ar: "تساهم في وضع سياسة الدولة في مجال العدل وفي تحديث المنظومة القضائية",
        tz: "Contributes to the elaboration of the policy of the State in matters of justice and to the modernization of the judicial system",
        es: "Contribuye a la elaboración de la política del Estado en materia de justicia y a la modernización del sistema judicial"
      },
      {
        en: "Administers the penitentiary establishments and the reintegration of detainees",
        fr: "Administre les établissements pénitentiaires et la réinsertion des détenus",
        ar: "تدير المؤسسات السجنية وإعادة إدماج المعتقلين",
        tz: "Administers the penitentiary establishments and the reintegration of detainees",
        es: "Administra los establecimientos penitenciarios y la reinserción de los reclusos"
      },
      {
        en: "Oversees the judicial professions and manages the judicial infrastructure",
        fr: "Encadre les professions judiciaires et gère l'infrastructure judiciaire",
        ar: "تشرف على المهن القضائية وتدير البنية التحتية القضائية",
        tz: "Oversees the judicial professions and manages the judicial infrastructure",
        es: "Supervisa las profesiones judiciales y gestiona la infraestructura judicial"
      }
    ],
    website: "https://www.justice.gov.ma",
    content: {
      en: "The Ministry of Justice contributes to the elaboration of the national policy in matters of justice and to the modernization of the judicial system. It prepares the draft laws and regulations concerning the organization of the courts and the status of the legal professions.",
      fr: "Le Ministère de la Justice contribue à l'élaboration de la politique nationale en matière de justice et à la modernisation du système judiciaire. Il prépare les projets de lois et de textes réglementaires relatifs à l'organisation des tribunaux et au statut des professions judiciaires.",
      ar: "تساهم وزارة العدل في وضع السياسة الوطنية في مجال العدل وفي تحديث المنظومة القضائية، وتعد مشاريع القوانين والنصوص التنظيمية المتعلقة بتنظيم المحاكم ووضعية المهن القضائية.",
      tz: "The Ministry of Justice contributes to the elaboration of the national policy in matters of justice and to the modernization of the judicial system. It prepares the draft laws and regulations concerning the organization of the courts and the status of the legal professions.",
      es: "El Ministerio de Justicia contribuye a la elaboración de la política nacional en materia de justicia y a la modernización del sistema judicial. Prepara los proyectos de leyes y textos reglamentarios relativos a la organización de los tribunales y al estatuto de las profesiones judiciales."
    },
    order: 9,
    sourceUrl: "https://www.justice.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-ministry-economy-finance",
    slug: "ministry-economy-finance",
    name: {
      en: "Ministry of Economy and Finance",
      fr: "Ministère de l'Économie et des Finances",
      ar: "وزارة الاقتصاد والمالية",
      tz: "Ministry of Economy and Finance",
      es: "Ministerio de Economía y Hacienda"
    },
    type: "ministry",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      fr: "Constitution de 2011, Titre III (Du Gouvernement) ; les ministres sont nommés par le Roi sur proposition du Chef du Gouvernement",
      ar: "دستور 2011، الباب الثالث (الحكومة)؛ يُعين الوزراء من طرف الملك باقتراح من رئيس الحكومة",
      tz: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      es: "Constitución de 2011, Capítulo III (Del Gobierno); los ministros son nombrados por el Rey a propuesta del Jefe de Gobierno"
    },
    responsibilities: [
      {
        en: "Prepares and implements the budgetary, fiscal and economic policy of the State",
        fr: "Prépare et met en œuvre la politique budgétaire, fiscale et économique de l'État",
        ar: "تعد وتنفذ السياسة الميزانية والجبائية والاقتصادية للدولة",
        tz: "Prepares and implements the budgetary, fiscal and economic policy of the State",
        es: "Prepara y aplica la política presupuestaria, fiscal y económica del Estado"
      },
      {
        en: "Supervises the tax and customs administrations and the public procurement policy",
        fr: "Tutelle les administrations fiscale et douanière et la politique de la commande publique",
        ar: "تشرف على الإدارتين الجبائية والجمركية وعلى سياسة الصفقات العمومية",
        tz: "Supervises the tax and customs administrations and the public procurement policy",
        es: "Supervisa las administraciones tributaria y aduanera y la política de contratación pública"
      },
      {
        en: "Ensures the equilibrium of the public finances and the financing of the economy",
        fr: "Assure l'équilibre des finances publiques et le financement de l'économie",
        ar: "تضمن توازن المالية العمومية وتمويل الاقتصاد",
        tz: "Ensures the equilibrium of the public finances and the financing of the economy",
        es: "Garantiza el equilibrio de las finanzas públicas y la financiación de la economía"
      }
    ],
    website: "https://www.finances.gov.ma",
    content: {
      en: "The Ministry of Economy and Finance prepares and implements the budgetary, fiscal and economic policy of the State. It ensures the equilibrium of the public finances and the financing of the economy, and supervises the tax and customs administrations as well as the public establishments and enterprises of the State.",
      fr: "Le Ministère de l'Économie et des Finances prépare et met en œuvre la politique budgétaire, fiscale et économique de l'État. Il assure l'équilibre des finances publiques et le financement de l'économie, et assure la tutelle des administrations fiscale et douanière ainsi que des établissements et entreprises publics de l'État.",
      ar: "تعد وزارة الاقتصاد والمالية وتنفذ السياسة الميزانية والجبائية والاقتصادية للدولة، وتضمن توازن المالية العمومية وتمويل الاقتصاد، وتشرف على الإدارتين الجبائية والجمركية وعلى المؤسسات والمقاولات العمومية للدولة.",
      tz: "The Ministry of Economy and Finance prepares and implements the budgetary, fiscal and economic policy of the State. It ensures the equilibrium of the public finances and the financing of the economy, and supervises the tax and customs administrations as well as the public establishments and enterprises of the State.",
      es: "El Ministerio de Economía y Hacienda prepara y aplica la política presupuestaria, fiscal y económica del Estado. Garantiza el equilibrio de las finanzas públicas y la financiación de la economía, y supervisa las administraciones tributaria y aduanera, así como los establecimientos y empresas públicos del Estado."
    },
    order: 10,
    sourceUrl: "https://www.finances.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-ministry-education",
    slug: "ministry-national-education",
    name: {
      en: "Ministry of National Education, Preschool and Sports",
      fr: "Ministère de l'Éducation nationale, du Préscolaire et des Sports",
      ar: "وزارة التربية الوطنية والتعليم الأولي والرياضة",
      tz: "Ministry of National Education, Preschool and Sports",
      es: "Ministerio de Educación Nacional, Educación Preescolar y Deportes"
    },
    type: "ministry",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      fr: "Constitution de 2011, Titre III (Du Gouvernement) ; les ministres sont nommés par le Roi sur proposition du Chef du Gouvernement",
      ar: "دستور 2011، الباب الثالث (الحكومة)؛ يُعين الوزراء من طرف الملك باقتراح من رئيس الحكومة",
      tz: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      es: "Constitución de 2011, Capítulo III (Del Gobierno); los ministros son nombrados por el Rey a propuesta del Jefe de Gobierno"
    },
    responsibilities: [
      {
        en: "Organizes the pre-school, primary and secondary education system",
        fr: "Organise le système d'éducation préscolaire, primaire et secondaire",
        ar: "تنظم منظومة التربية والتعليم الأولي والابتدائي والثانوي",
        tz: "Organizes the pre-school, primary and secondary education system",
        es: "Organiza el sistema de educación preescolar, primaria y secundaria"
      },
      {
        en: "Defines the curricula, the school programmes and the national examinations",
        fr: "Définit les programmes scolaires et les examens nationaux",
        ar: "تحدد المقررات والبرامج الدراسية والامتحانات الوطنية",
        tz: "Defines the curricula, the school programmes and the national examinations",
        es: "Define los planes de estudio, los programas escolares y los exámenes nacionales"
      },
      {
        en: "Manages the teaching staff and administers the public education establishments",
        fr: "Gère le personnel enseignant et administre les établissements publics d'enseignement",
        ar: "تدبر الموارد البشرية التعليمية وتدير المؤسسات العمومية للتعليم",
        tz: "Manages the teaching staff and administers the public education establishments",
        es: "Gestiona el personal docente y administra los establecimientos públicos de enseñanza"
      }
    ],
    website: "https://www.men.gov.ma",
    content: {
      en: "The Ministry of National Education, Preschool and Sports is responsible for the pre-school, primary and secondary education system. It defines the curricula and the national examinations, manages the teaching staff and administers the public education establishments. Its action is framed by the Framework Law No. 51-17 of 2019 on the education, training and scientific research system.",
      fr: "Le Ministère de l'Éducation nationale, du Préscolaire et des Sports est chargé du système d'éducation préscolaire, primaire et secondaire. Il définit les programmes et les examens nationaux, gère le personnel enseignant et administre les établissements publics d'enseignement. Son action s'inscrit dans le cadre de la loi-cadre n° 51-17 de 2019 relative au système d'éducation, de formation et de recherche scientifique.",
      ar: "تتكلف وزارة التربية الوطنية والتعليم الأولي والرياضة بمنظومة التربية والتعليم الأولي والابتدائي والثانوي، وتحدد المقررات والامتحانات الوطنية، وتدبر الموارد البشرية التعليمية وتدير المؤسسات العمومية للتعليم. وينظم عملها القانون-الإطار رقم 51-17 لسنة 2019 المتعلق بمنظومة التربية والتكوين والبحث العلمي.",
      tz: "The Ministry of National Education, Preschool and Sports is responsible for the pre-school, primary and secondary education system. It defines the curricula and the national examinations, manages the teaching staff and administers the public education establishments. Its action is framed by the Framework Law No. 51-17 of 2019 on the education, training and scientific research system.",
      es: "El Ministerio de Educación Nacional, Educación Preescolar y Deportes es responsable del sistema de educación preescolar, primaria y secundaria. Define los planes de estudio y los exámenes nacionales, gestiona el personal docente y administra los establecimientos públicos de enseñanza. Su acción se enmarca en la Ley Marco n.º 51-17 de 2019 relativa al sistema de educación, formación e investigación científica."
    },
    order: 11,
    sourceUrl: "https://www.men.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-ministry-health",
    slug: "ministry-health-social-protection",
    name: {
      en: "Ministry of Health and Social Protection",
      fr: "Ministère de la Santé et de la Protection sociale",
      ar: "وزارة الصحة والحماية الاجتماعية",
      tz: "Ministry of Health and Social Protection",
      es: "Ministerio de Sanidad y Protección Social"
    },
    type: "ministry",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      fr: "Constitution de 2011, Titre III (Du Gouvernement) ; les ministres sont nommés par le Roi sur proposition du Chef du Gouvernement",
      ar: "دستور 2011، الباب الثالث (الحكومة)؛ يُعين الوزراء من طرف الملك باقتراح من رئيس الحكومة",
      tz: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      es: "Constitución de 2011, Capítulo III (Del Gobierno); los ministros son nombrados por el Rey a propuesta del Jefe de Gobierno"
    },
    responsibilities: [
      {
        en: "Defines and implements the national health policy",
        fr: "Définit et met en œuvre la politique nationale de santé",
        ar: "تحدد وتنفذ السياسة الوطنية للصحة",
        tz: "Defines and implements the national health policy",
        es: "Define y aplica la política nacional de salud"
      },
      {
        en: "Organizes the network of public health establishments and ensures the quality of care",
        fr: "Organise le réseau des établissements publics de santé et assure la qualité des soins",
        ar: "تنظم شبكة المؤسسات العمومية للصحة وتضمن جودة العلاجات",
        tz: "Organizes the network of public health establishments and ensures the quality of care",
        es: "Organiza la red de establecimientos públicos de salud y garantiza la calidad de la atención"
      },
      {
        en: "Contributes to the implementation of the social protection policy and the generalization of health coverage",
        fr: "Contribue à la mise en œuvre de la politique de protection sociale et à la généralisation de la couverture santé",
        ar: "تساهم في تنفيذ سياسة الحماية الاجتماعية وفي تعميم التغطية الصحية",
        tz: "Contributes to the implementation of the social protection policy and the generalization of health coverage",
        es: "Contribuye a la aplicación de la política de protección social y a la generalización de la cobertura sanitaria"
      }
    ],
    website: "https://www.sante.gov.ma",
    content: {
      en: "The Ministry of Health and Social Protection defines and implements the national health policy. It organizes the network of public health establishments, conducts prevention and public health programmes, and ensures the availability of the health workforce. It also contributes to the social protection policy, notably the generalization of compulsory health insurance.",
      fr: "Le Ministère de la Santé et de la Protection sociale définit et met en œuvre la politique nationale de santé. Il organise le réseau des établissements publics de santé, mène les programmes de prévention et de santé publique et assure la disponibilité des ressources humaines de santé. Il contribue également à la politique de protection sociale, notamment la généralisation de l'assurance maladie obligatoire.",
      ar: "تحدد وزارة الصحة والحماية الاجتماعية وتنفذ السياسة الوطنية للصحة، وتنظم شبكة المؤسسات العمومية للصحة، وتنفذ برامج الوقاية والصحة العمومية، وتضمن توفر الموارد البشرية الصحية. كما تساهم في سياسة الحماية الاجتماعية، لا سيما تعميم التأمين الإجباري عن المرض.",
      tz: "The Ministry of Health and Social Protection defines and implements the national health policy. It organizes the network of public health establishments, conducts prevention and public health programmes, and ensures the availability of the health workforce. It also contributes to the social protection policy, notably the generalization of compulsory health insurance.",
      es: "El Ministerio de Sanidad y Protección Social define y aplica la política nacional de salud. Organiza la red de establecimientos públicos de salud, desarrolla los programas de prevención y salud pública y garantiza la disponibilidad de los recursos humanos sanitarios. Contribuye también a la política de protección social, en particular a la generalización del seguro de enfermedad obligatorio."
    },
    order: 12,
    sourceUrl: "https://www.sante.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-ministry-agriculture",
    slug: "ministry-agriculture",
    name: {
      en: "Ministry of Agriculture, Maritime Fisheries, Rural Development and Water and Forests",
      fr: "Ministère de l'Agriculture, de la Pêche maritime, du Développement rural et des Eaux et Forêts",
      ar: "وزارة الفلاحة والصيد البحري والتنمية القروية والمياه والغابات",
      tz: "Ministry of Agriculture, Maritime Fisheries, Rural Development and Water and Forests",
      es: "Ministerio de Agricultura, Pesca Marítima, Desarrollo Rural y Aguas y Bosques"
    },
    type: "ministry",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      fr: "Constitution de 2011, Titre III (Du Gouvernement) ; les ministres sont nommés par le Roi sur proposition du Chef du Gouvernement",
      ar: "دستور 2011، الباب الثالث (الحكومة)؛ يُعين الوزراء من طرف الملك باقتراح من رئيس الحكومة",
      tz: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      es: "Constitución de 2011, Capítulo III (Del Gobierno); los ministros son nombrados por el Rey a propuesta del Jefe de Gobierno"
    },
    responsibilities: [
      {
        en: "Implements the agricultural, fisheries and rural policy of the Kingdom through the sectoral strategies",
        fr: "Met en œuvre la politique agricole, halieutique et rurale du Royaume à travers les stratégies sectorielles",
        ar: "تنفذ السياسة الفلاحية والبحرية والقروية للمملكة عبر الاستراتيجيات القطاعية",
        tz: "Implements the agricultural, fisheries and rural policy of the Kingdom through the sectoral strategies",
        es: "Aplica la política agrícola, pesquera y rural del Reino a través de las estrategias sectoriales"
      },
      {
        en: "Supports agricultural production and the agrifood chains",
        fr: "Accompagne la production agricole et les filières agroalimentaires",
        ar: "ترافق الإنتاج الفلاحي وسلاسل القيم الفلاحية الغذائية",
        tz: "Supports agricultural production and the agrifood chains",
        es: "Apoya la producción agrícola y las cadenas agroalimentarias"
      },
      {
        en: "Manages the irrigation schemes and the water and forest resources, and supervises maritime fisheries",
        fr: "Gère les périmètres irrigués et les ressources en eau et forêts, et encadre la pêche maritime",
        ar: "تدبر مناطق السقي وموارد المياه والغابات، وتشرف على الصيد البحري",
        tz: "Manages the irrigation schemes and the water and forest resources, and supervises maritime fisheries",
        es: "Gestiona los perímetros de regadío y los recursos hídricos y forestales, y supervisa la pesca marítima"
      }
    ],
    website: "https://www.agriculture.gov.ma",
    content: {
      en: "The Ministry of Agriculture, Maritime Fisheries, Rural Development and Water and Forests implements the agricultural, fisheries and rural policy of the Kingdom. Its action is carried out through the successive sectoral strategies, the Green Morocco Plan and then the Generation Green strategy, which aim to support agricultural production and the agrifood chains.",
      fr: "Le Ministère de l'Agriculture, de la Pêche maritime, du Développement rural et des Eaux et Forêts met en œuvre la politique agricole, halieutique et rurale du Royaume. Son action se déploie à travers les stratégies sectorielles successives, le Plan Maroc Vert puis la stratégie Génération Vert, qui visent à accompagner la production agricole et les filières agroalimentaires.",
      ar: "تنفذ وزارة الفلاحة والصيد البحري والتنمية القروية والمياه والغابات السياسة الفلاحية والبحرية والقروية للمملكة. ويتجسد عملها عبر الاستراتيجيات القطاعية المتعاقبة: مخطط المغرب الأخضر ثم استراتيجية جيل الأخضر، والتي تهدف إلى مرافقة الإنتاج الفلاحي وسلاسل القيم الفلاحية الغذائية.",
      tz: "The Ministry of Agriculture, Maritime Fisheries, Rural Development and Water and Forests implements the agricultural, fisheries and rural policy of the Kingdom. Its action is carried out through the successive sectoral strategies, the Green Morocco Plan and then the Generation Green strategy, which aim to support agricultural production and the agrifood chains.",
      es: "El Ministerio de Agricultura, Pesca Marítima, Desarrollo Rural y Aguas y Bosques aplica la política agrícola, pesquera y rural del Reino. Su acción se desarrolla a través de las estrategias sectoriales sucesivas, el Plan Mar Verde y luego la estrategia Generación Verde, orientadas a respaldar la producción agrícola y las cadenas agroalimentarias."
    },
    currentHolder: {
      en: "Mohamed Sadiki",
      fr: "Mohamed Sadiki",
      ar: "محمد صديقي",
      tz: "Mohamed Sadiki",
      es: "Mohamed Sadiki"
    },
    order: 13,
    sourceUrl: "https://www.agriculture.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-ministry-energy",
    slug: "ministry-energy-transition",
    name: {
      en: "Ministry of Energy Transition and Sustainable Development",
      fr: "Ministère de la Transition énergétique et du Développement durable",
      ar: "وزارة الانتقال الطاقي والتنمية المستدامة",
      tz: "Ministry of Energy Transition and Sustainable Development",
      es: "Ministerio de Transición Energética y Desarrollo Sostenible"
    },
    type: "ministry",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      fr: "Constitution de 2011, Titre III (Du Gouvernement) ; les ministres sont nommés par le Roi sur proposition du Chef du Gouvernement",
      ar: "دستور 2011، الباب الثالث (الحكومة)؛ يُعين الوزراء من طرف الملك باقتراح من رئيس الحكومة",
      tz: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      es: "Constitución de 2011, Capítulo III (Del Gobierno); los ministros son nombrados por el Rey a propuesta del Jefe de Gobierno"
    },
    responsibilities: [
      {
        en: "Conducts the national policy in matters of energy, mines and hydrocarbons",
        fr: "Conduit la politique nationale en matière d'énergie, des mines et des hydrocarbures",
        ar: "تدير السياسة الوطنية في مجال الطاقة والمناجم والمحروقات",
        tz: "Conducts the national policy in matters of energy, mines and hydrocarbons",
        es: "Dirige la política nacional en materia de energía, minas e hidrocarburos"
      },
      {
        en: "Coordinates the energy transition and the development of renewable energies and energy efficiency",
        fr: "Coordonne la transition énergétique, le développement des énergies renouvelables et l'efficacité énergétique",
        ar: "تنسق الانتقال الطاقي وتطوير الطاقات المتجددة والنجاعة الطاقية",
        tz: "Coordinates the energy transition and the development of renewable energies and energy efficiency",
        es: "Coordina la transición energética y el desarrollo de las energías renovables y la eficiencia energética"
      },
      {
        en: "Implements the policy of environmental protection and sustainable development",
        fr: "Met en œuvre la politique de protection de l'environnement et du développement durable",
        ar: "تنفذ سياسة حماية البيئة والتنمية المستدامة",
        tz: "Implements the policy of environmental protection and sustainable development",
        es: "Aplica la política de protección del medio ambiente y de desarrollo sostenible"
      }
    ],
    website: "https://www.mem.gov.ma",
    content: {
      en: "The Ministry of Energy Transition and Sustainable Development conducts the national policy in matters of energy, mines, electricity and hydrocarbons. It supports the development of renewable energies and energy efficiency, ensures the security of the energy supply and coordinates the transition to a low-carbon economy.",
      fr: "Le Ministère de la Transition énergétique et du Développement durable conduit la politique nationale en matière d'énergie, des mines, d'électricité et des hydrocarbures. Il accompagne le développement des énergies renouvelables et de l'efficacité énergétique, assure la sécurité de l'approvisionnement énergétique et coordonne la transition vers une économie bas carbone.",
      ar: "تدير وزارة الانتقال الطاقي والتنمية المستدامة السياسة الوطنية في مجال الطاقة والمناجم والكهرباء والمحروقات، وترافق تطوير الطاقات المتجددة والنجاعة الطاقية، وتضمن أمن التزويد الطاقي، وتنسق الانتقال نحو اقتصاد منخفض الانبعاثات الكربونية.",
      tz: "The Ministry of Energy Transition and Sustainable Development conducts the national policy in matters of energy, mines, electricity and hydrocarbons. It supports the development of renewable energies and energy efficiency, ensures the security of the energy supply and coordinates the transition to a low-carbon economy.",
      es: "El Ministerio de Transición Energética y Desarrollo Sostenible dirige la política nacional en materia de energía, minas, electricidad e hidrocarburos. Impulsa el desarrollo de las energías renovables y de la eficiencia energética, garantiza la seguridad del suministro energético y coordina la transición hacia una economía baja en carbono."
    },
    order: 14,
    sourceUrl: "https://www.mem.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-ministry-industry",
    slug: "ministry-industry-trade",
    name: {
      en: "Ministry of Industry and Trade",
      fr: "Ministère de l'Industrie et du Commerce",
      ar: "وزارة الصناعة والتجارة",
      tz: "Ministry of Industry and Trade",
      es: "Ministerio de Industria y Comercio"
    },
    type: "ministry",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      fr: "Constitution de 2011, Titre III (Du Gouvernement) ; les ministres sont nommés par le Roi sur proposition du Chef du Gouvernement",
      ar: "دستور 2011، الباب الثالث (الحكومة)؛ يُعين الوزراء من طرف الملك باقتراح من رئيس الحكومة",
      tz: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      es: "Constitución de 2011, Capítulo III (Del Gobierno); los ministros son nombrados por el Rey a propuesta del Jefe de Gobierno"
    },
    responsibilities: [
      {
        en: "Implements the industrial policy and supports the competitiveness of the industrial fabric",
        fr: "Met en œuvre la politique industrielle et accompagne la compétitivité du tissu industriel",
        ar: "تنفذ السياسة الصناعية وترافق تنافسية النسيج الصناعي",
        tz: "Implements the industrial policy and supports the competitiveness of the industrial fabric",
        es: "Aplica la política industrial y respalda la competitividad del tejido industrial"
      },
      {
        en: "Promotes investment, innovation and the development of very small, small and medium-sized enterprises",
        fr: "Promeut l'investissement, l'innovation et le développement des très petites, petites et moyennes entreprises",
        ar: "تعزز الاستثمار والابتكار وتطوير المقاولات الصغيرة جدا والصغيرة والمتوسطة",
        tz: "Promotes investment, innovation and the development of very small, small and medium-sized enterprises",
        es: "Fomenta la inversión, la innovación y el desarrollo de las microempresas, pequeñas y medianas empresas"
      },
      {
        en: "Regulates internal and external trade and protects the consumer",
        fr: "Régule le commerce intérieur et extérieur et protège le consommateur",
        ar: "تنظم التجارة الداخلية والخارجية وتحمي المستهلك",
        tz: "Regulates internal and external trade and protects the consumer",
        es: "Regula el comercio interior y exterior y protege al consumidor"
      }
    ],
    website: "https://www.mcinet.gov.ma",
    content: {
      en: "The Ministry of Industry and Trade implements the industrial policy of the Kingdom and supports the competitiveness of the industrial fabric, in particular through industrial acceleration plans and the development of industrial ecosystems. It promotes investment and innovation and regulates internal and external trade.",
      fr: "Le Ministère de l'Industrie et du Commerce met en œuvre la politique industrielle du Royaume et accompagne la compétitivité du tissu industriel, notamment à travers les plans d'accélération industrielle et le développement des écosystèmes industriels. Il promeut l'investissement et l'innovation et régule le commerce intérieur et extérieur.",
      ar: "تنفذ وزارة الصناعة والتجارة السياسة الصناعية للمملكة وترافق تنافسية النسيج الصناعي، لا سيما عبر مخططات تسريع الصناعة وتطوير الأنظمة البيئية الصناعية. كما تعزز الاستثمار والابتكار وتنظم التجارة الداخلية والخارجية.",
      tz: "The Ministry of Industry and Trade implements the industrial policy of the Kingdom and supports the competitiveness of the industrial fabric, in particular through industrial acceleration plans and the development of industrial ecosystems. It promotes investment and innovation and regulates internal and external trade.",
      es: "El Ministerio de Industria y Comercio aplica la política industrial del Reino y respalda la competitividad del tejido industrial, en particular mediante los planes de aceleración industrial y el desarrollo de ecosistemas industriales. Fomenta la inversión y la innovación y regula el comercio interior y exterior."
    },
    order: 15,
    sourceUrl: "https://www.mcinet.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-ministry-culture-youth",
    slug: "ministry-youth-culture-communication",
    name: {
      en: "Ministry of Youth, Culture and Communication",
      fr: "Ministère de la Jeunesse, de la Culture et de la Communication",
      ar: "وزارة الشباب والثقافة والتواصل",
      tz: "Ministry of Youth, Culture and Communication",
      es: "Ministerio de Juventud, Cultura y Comunicación"
    },
    type: "ministry",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      fr: "Constitution de 2011, Titre III (Du Gouvernement) ; les ministres sont nommés par le Roi sur proposition du Chef du Gouvernement",
      ar: "دستور 2011، الباب الثالث (الحكومة)؛ يُعين الوزراء من طرف الملك باقتراح من رئيس الحكومة",
      tz: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      es: "Constitución de 2011, Capítulo III (Del Gobierno); los ministros son nombrados por el Rey a propuesta del Jefe de Gobierno"
    },
    responsibilities: [
      {
        en: "Prepares and implements the policy of the Government in the fields of youth and culture",
        fr: "Prépare et met en œuvre la politique du Gouvernement dans les domaines de la jeunesse et de la culture",
        ar: "تعد وتنفذ سياسة الحكومة في مجالي الشباب والثقافة",
        tz: "Prepares and implements the policy of the Government in the fields of youth and culture",
        es: "Prepara y aplica la política del Gobierno en los ámbitos de la juventud y la cultura"
      },
      {
        en: "Supports artistic and literary creation, the book industry and the cultural industries",
        fr: "Accompagne la création artistique et littéraire, l'industrie du livre et les industries culturelles",
        ar: "ترافق الإبداع الفني والأدبي وصناعة الكتاب والصناعات الثقافية",
        tz: "Supports artistic and literary creation, the book industry and the cultural industries",
        es: "Respalda la creación artística y literaria, la industria del libro y las industrias culturales"
      },
      {
        en: "Ensures the protection and the enhancement of the national heritage",
        fr: "Assure la protection et la valorisation du patrimoine national",
        ar: "تضمن حماية وتثمين التراث الوطني",
        tz: "Ensures the protection and the enhancement of the national heritage",
        es: "Garantiza la protección y la puesta en valor del patrimonio nacional"
      },
      {
        en: "Manages the youth establishments and supervises the audio-visual sector and the public media",
        fr: "Gère les établissements de jeunesse et encadre le secteur audiovisuel et les médias publics",
        ar: "تدبر مرافق الشباب وتشرف على القطاع السمعي البصري والإعلام العمومي",
        tz: "Manages the youth establishments and supervises the audio-visual sector and the public media",
        es: "Gestiona los establecimientos de juventud y supervisa el sector audiovisual y los medios públicos"
      }
    ],
    website: "https://www.mjcc.gov.ma",
    content: {
      en: "The Ministry of Youth, Culture and Communication prepares and implements the policy of the Government in all the fields of youth, culture and communication. It supports artistic and literary creation and the cultural industries, ensures the protection and the enhancement of the national heritage and manages the youth establishments, such as the houses of youth and the socio-sport centres.",
      fr: "Le Ministère de la Jeunesse, de la Culture et de la Communication prépare et met en œuvre la politique du Gouvernement dans tous les domaines de la jeunesse, de la culture et de la communication. Il accompagne la création artistique et littéraire et les industries culturelles, assure la protection et la valorisation du patrimoine national et gère les établissements de jeunesse, tels que les maisons de jeunes et les centres socio-sportifs.",
      ar: "تعد وزارة الشباب والثقافة والتواصل وتنفذ سياسة الحكومة في جميع مجالات الشباب والثقافة والتواصل. وترافق الإبداع الفني والأدبي والصناعات الثقافية، وتضمن حماية وتثمين التراث الوطني، وتدبر مرافق الشباب، مثل دور الشباب والمراكز الاجتماعية الرياضية.",
      tz: "The Ministry of Youth, Culture and Communication prepares and implements the policy of the Government in all the fields of youth, culture and communication. It supports artistic and literary creation and the cultural industries, ensures the protection and the enhancement of the national heritage and manages the youth establishments, such as the houses of youth and the socio-sport centres.",
      es: "El Ministerio de Juventud, Cultura y Comunicación prepara y aplica la política del Gobierno en todos los ámbitos de la juventud, la cultura y la comunicación. Respalda la creación artística y literaria y las industrias culturales, garantiza la protección y la puesta en valor del patrimonio nacional y gestiona los establecimientos de juventud, como las casas de la juventud y los centros socio-deportivos."
    },
    currentHolder: {
      en: "Mohamed Mehdi Bensaid",
      fr: "Mohamed Mehdi Bensaïd",
      ar: "محمد مهدي بن سعيد",
      tz: "Mohamed Mehdi Bensaid",
      es: "Mohamed Mehdi Bensaid"
    },
    order: 16,
    sourceUrl: "https://www.mjcc.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-ministry-habous",
    slug: "ministry-habous-islamic-affairs",
    name: {
      en: "Ministry of Habous and Islamic Affairs",
      fr: "Ministère des Habous et des Affaires islamiques",
      ar: "وزارة الأوقاف والشؤون الإسلامية",
      tz: "Ministry of Habous and Islamic Affairs",
      es: "Ministerio de Asuntos Habús e Islámicos"
    },
    type: "ministry",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      fr: "Constitution de 2011, Titre III (Du Gouvernement) ; les ministres sont nommés par le Roi sur proposition du Chef du Gouvernement",
      ar: "دستور 2011، الباب الثالث (الحكومة)؛ يُعين الوزراء من طرف الملك باقتراح من رئيس الحكومة",
      tz: "Constitution of 2011, Chapter III (Of the Government); the ministers are appointed by the King on the proposal of the Head of Government",
      es: "Constitución de 2011, Capítulo III (Del Gobierno); los ministros son nombrados por el Rey a propuesta del Jefe de Gobierno"
    },
    responsibilities: [
      {
        en: "Manages the habous (endowment) properties and administers the mosques and the places of worship",
        fr: "Gère les biens habous et administre les mosquées et les lieux de culte",
        ar: "تدبر أملاك الأوقاف وتدير المساجد وبيوت العبادة",
        tz: "Manages the habous (endowment) properties and administers the mosques and the places of worship",
        es: "Gestiona los bienes habús y administra las mezquitas y los lugares de culto"
      },
      {
        en: "Ensures the material organization of worship and the supervision of the imams",
        fr: "Assure l'organisation matérielle du culte et l'encadrement des imams",
        ar: "تضمن التنظيم المادي للعبادة وتأطير الأئمة",
        tz: "Ensures the material organization of worship and the supervision of the imams",
        es: "Garantiza la organización material del culto y la supervisión de los imanes"
      },
      {
        en: "Organizes the pilgrimage to the holy places (Hajj and Umrah) and supports the teaching of the Quran",
        fr: "Organise le pèlerinage aux lieux saints (Hajj et Omra) et accompagne l'enseignement du Coran",
        ar: "تنظم الحج والعمرة وترافق تعليم القرآن الكريم",
        tz: "Organizes the pilgrimage to the holy places (Hajj and Umrah) and supports the teaching of the Quran",
        es: "Organiza la peregrinación a los lugares santos (Hach y Umrah) y respalda la enseñanza del Corán"
      }
    ],
    website: "https://www.habous.gov.ma",
    content: {
      en: "The Ministry of Habous and Islamic Affairs manages the habous (endowment) properties of the State and administers the mosques and the places of worship. It ensures the material organization of worship and the supervision of the imams, and organizes the pilgrimage to the holy places. Its action is conducted under the spiritual authority of the Commander of the Faithful and in coordination with the Higher Council of the Ulemas.",
      fr: "Le Ministère des Habous et des Affaires islamiques gère les biens habous de l'État et administre les mosquées et les lieux de culte. Il assure l'organisation matérielle du culte et l'encadrement des imams, et organise le pèlerinage aux lieux saints. Son action se déploie sous l'autorité spiritale du Commandeur des croyants et en coordination avec le Conseil supérieur des oulémas.",
      ar: "تدبر وزارة الأوقاف والشؤون الإسلامية أملاك الأوقاف التابعة للدولة وتدير المساجد وبيوت العبادة، وتضمن التنظيم المادي للعبادة وتأطير الأئمة، وتنظم الحج إلى الأماكن المقدسة. ويتجسد عملها تحت السلطة الروحية لأمير المؤمنين وبتنسيق مع المجلس العلمي الأعلى.",
      tz: "The Ministry of Habous and Islamic Affairs manages the habous (endowment) properties of the State and administers the mosques and the places of worship. It ensures the material organization of worship and the supervision of the imams, and organizes the pilgrimage to the holy places. Its action is conducted under the spiritual authority of the Commander of the Faithful and in coordination with the Higher Council of the Ulemas.",
      es: "El Ministerio de Asuntos Habús e Islámicos gestiona los bienes habús del Estado y administra las mezquitas y los lugares de culto. Garantiza la organización material del culto y la supervisión de los imanes, y organiza la peregrinación a los lugares santos. Su acción se desarrolla bajo la autoridad espiritual del Príncipe de los Creyentes y en coordinación con el Consejo Superior de los Ulemas."
    },
    currentHolder: {
      en: "Ahmed Toufiq",
      fr: "Ahmed Toufiq",
      ar: "أحمد التوفيق",
      tz: "Ahmed Toufiq",
      es: "Ahmed Toufiq"
    },
    order: 17,
    sourceUrl: "https://www.habous.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-regional-institutions",
    slug: "regional-institutions",
    name: {
      en: "Regional institutions",
      fr: "Les institutions régionales",
      ar: "المؤسسات الجهوية",
      tz: "Regional institutions",
      es: "Las instituciones regionales"
    },
    type: "regional",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, provisions on the territorial organization of the Kingdom and the advanced regionalization",
      fr: "Constitution de 2011, dispositions relatives à l'organisation territoriale du Royaume et à la régionalisation avancée",
      ar: "دستور 2011، مقتضيات التنظيم الترابي للمملكة والجهوية المتقدمة",
      tz: "Constitution of 2011, provisions on the territorial organization of the Kingdom and the advanced regionalization",
      es: "Constitución de 2011, disposiciones sobre la organización territorial del Reino y la regionalización avanzada"
    },
    responsibilities: [
      {
        en: "Deliberates on the regional affairs and adopts the regional development programmes",
        fr: "Délibère sur les affaires régionales et adopte les programmes de développement régional",
        ar: "تداول في الشؤون الجهوية وتعتمد برامج التنمية الجهوية",
        tz: "Deliberates on the regional affairs and adopts the regional development programmes",
        es: "Delibera sobre los asuntos regionales y aprueba los programas de desarrollo regional"
      },
      {
        en: "Exercises the competences transferred by the State, particularly in matters of economic, social and cultural development",
        fr: "Exerce les compétences transférées par l'État, notamment en matière de développement économique, social et culturel",
        ar: "تمارس الصلاحيات المنقولة من طرف الدولة، لا سيما في مجال التنمية الاقتصادية والاجتماعية والثقافية",
        tz: "Exercises the competences transferred by the State, particularly in matters of economic, social and cultural development",
        es: "Ejerce las competencias transferidas por el Estado, sobre todo en materia de desarrollo económico, social y cultural"
      },
      {
        en: "Promotes investment and the development of the regional territory",
        fr: "Promeut l'investissement et le développement du territoire régional",
        ar: "تعزز الاستثمار وتنمية التراب الجهوي",
        tz: "Promotes investment and the development of the regional territory",
        es: "Fomenta la inversión y el desarrollo del territorio regional"
      }
    ],
    website: "https://www.interieur.gov.ma",
    content: {
      en: "The territorial organization of the Kingdom comprises the regions, the prefectures, the provinces and the communes. The advanced regionalization, launched by His Majesty King Mohammed VI, makes the region the principal level of development. The Kingdom counts twelve regions since the administrative reform.",
      fr: "L'organisation territoriale du Royaume comprend les régions, les préfectures, les provinces et les communes. La régionalisation avancée, lancée par Sa Majesté le Roi Mohammed VI, fait de la région le principal niveau de développement. Le Royaume compte douze régions depuis la réforme administrative.",
      ar: "يشمل التنظيم الترابي للمملكة الجهات والعمالات والأقاليم والجماعات. وتجعل الجهوية المتقدمة، التي أطلقها صاحب الجلالة الملك محمد السادس، الجهة مستوى التنمية الأساسي. ويعرف المملكة اثنتي عشرة جهة منذ الإصلاح الإداري.",
      tz: "The territorial organization of the Kingdom comprises the regions, the prefectures, the provinces and the communes. The advanced regionalization, launched by His Majesty King Mohammed VI, makes the region the principal level of development. The Kingdom counts twelve regions since the administrative reform.",
      es: "La organización territorial del Reino comprende las regiones, las prefecturas, las provincias y las comunas. La regionalización avanzada, impulsada por Su Majestad el Rey Mohammed VI, convierte a la región en el principal nivel de desarrollo. El Reino cuenta con doce regiones desde la reforma administrativa."
    },
    order: 18,
    sourceUrl: "https://www.interieur.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-local-government",
    slug: "local-government",
    name: {
      en: "Local government",
      fr: "Les collectivités locales",
      ar: "الجماعات الترابية",
      tz: "Local government",
      es: "Las entidades locales"
    },
    type: "local",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, provisions on the territorial organization; the communes are freely administered by the councils elected",
      fr: "Constitution de 2011, dispositions sur l'organisation territoriale ; les communes sont librement administrées par les conseils élus",
      ar: "دستور 2011، مقتضيات التنظيم الترابي؛ تدار الجماعات بحرية بواسطة مجالس منتخبة",
      tz: "Constitution of 2011, provisions on the territorial organization; the communes are freely administered by the councils elected",
      es: "Constitución de 2011, disposiciones sobre la organización territorial; las comunas son administradas libremente por los consejos elegidos"
    },
    responsibilities: [
      {
        en: "Manages the local public services and the communal heritage",
        fr: "Gère les services publics locaux et le patrimoine communal",
        ar: "تدبر المرافق العمومية المحلية والمأثور الجماعي",
        tz: "Manages the local public services and the communal heritage",
        es: "Gestiona los servicios públicos locales y el patrimonio comunal"
      },
      {
        en: "Decides on the matters of local interest, within the limits of the law",
        fr: "Statue sur les questions d'intérêt local, dans les limites de la loi",
        ar: "تقرر في قضايا المصالح المحلية، في حدود القانون",
        tz: "Decides on the matters of local interest, within the limits of the law",
        es: "Resuelve los asuntos de interés local, dentro de los límites de la ley"
      },
      {
        en: "Exercises the powers transferred by the State under the principle of free administration",
        fr: "Exerce les compétences transférées par l'État dans le cadre du principe de libre administration",
        ar: "تمارس الصلاحيات المنقولة من طرف الدولة في إطار مبدأ التدبير الحر",
        tz: "Exercises the powers transferred by the State under the principle of free administration",
        es: "Ejerce las competencias transferidas por el Estado en el marco del principio de libre administración"
      }
    ],
    website: "https://www.interieur.gov.ma",
    content: {
      en: "The communes, the prefectures and the provinces constitute the local authorities of the Kingdom. They are administered by deliberative councils, elected by direct suffrage for the communes and by indirect suffrage for the prefectures and provinces. The presidents of the councils exercise the executive function at their level.",
      fr: "Les communes, les préfectures et les provinces constituent les collectivités locales du Royaume. Elles sont administrées par des conseils délibérants, élus au suffrage direct pour les communes et au suffrage indirect pour les préfectures et les provinces. Les présidents des conseils exercent la fonction exécutive à leur niveau.",
      ar: "تشكل الجماعات والعمالات والأقاليم الجماعات الترابية للمملكة، وتدار بواسطة مجالس تداولية تنتخب بالاقتراع المباشر بالنسبة للجماعات وبالاقتراع غير المباشر بالنسبة للعمالات والأقاليم. ويمارس رؤساء المجالس الوظيفة التنفيذية على مستواهم.",
      tz: "The communes, the prefectures and the provinces constitute the local authorities of the Kingdom. They are administered by deliberative councils, elected by direct suffrage for the communes and by indirect suffrage for the prefectures and provinces. The presidents of the councils exercise the executive function at their level.",
      es: "Las comunas, las prefecturas y las provincias constituyen las entidades locales del Reino. Son administradas por consejos deliberantes, elegidos por sufragio directo en el caso de las comunas y por sufragio indirecto en el de las prefecturas y provincias. Los presidentes de los consejos ejercen la función ejecutiva en su nivel."
    },
    order: 19,
    sourceUrl: "https://www.interieur.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-public-institutions",
    slug: "public-institutions",
    name: {
      en: "Public institutions",
      fr: "Les établissements publics",
      ar: "المؤسسات العمومية",
      tz: "Public institutions",
      es: "Las instituciones públicas"
    },
    type: "public_institution",
    level: 3,
    parent: "government",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter III (Of the Government); the Government supervises the public establishments and enterprises",
      fr: "Constitution de 2011, Titre III (Du Gouvernement) ; le Gouvernement assure la tutelle des établissements et entreprises publics",
      ar: "دستور 2011، الباب الثالث (الحكومة)؛ تشرف الحكومة على المؤسسات والمقاولات العمومية",
      tz: "Constitution of 2011, Chapter III (Of the Government); the Government supervises the public establishments and enterprises",
      es: "Constitución de 2011, Capítulo III (Del Gobierno); el Gobierno supervisa los establecimientos y empresas públicos"
    },
    responsibilities: [
      {
        en: "Ensure the management of a public service or of an activity of general interest",
        fr: "Assurent la gestion d'un service public ou d'une activité d'intérêt général",
        ar: "تضمن تدبير مرفق عمومي أو نشاط ذي مصلحة عامة",
        tz: "Ensure the management of a public service or of an activity of general interest",
        es: "Aseguran la gestión de un servicio público o de una actividad de interés general"
      },
      {
        en: "Are placed under the tutelage of a ministerial department, with administrative and financial autonomy",
        fr: "Sont placés sous la tutelle d'un département ministériel, avec une autonomie administrative et financière",
        ar: "توضع تحت وصاية قطاع حكومي، مع استقلالية إدارية ومالية",
        tz: "Are placed under the tutelage of a ministerial department, with administrative and financial autonomy",
        es: "Están bajo la tutela de un departamento ministerial, con autonomía administrativa y financiera"
      },
      {
        en: "Are subject to the control of the Court of Auditors",
        fr: "Sont soumis au contrôle de la Cour des comptes",
        ar: "تخضع لمراقبة المجلس الأعلى للحسابات",
        tz: "Are subject to the control of the Court of Auditors",
        es: "Están sujetos al control del Tribunal de Cuentas"
      }
    ],
    content: {
      en: "The public institutions and the state-owned enterprises are bodies created by the State to ensure the management of a public service or of an activity of general interest. They are placed under the tutelage of a ministerial department and managed with a degree of administrative and financial autonomy. They cover the main public services, such as water and electricity, social security and phosphates, as well as numerous agencies and offices.",
      fr: "Les établissements publics et les entreprises publiques sont des organismes créés par l'État pour assurer la gestion d'un service public ou d'une activité d'intérêt général. Ils sont placés sous la tutelle d'un département ministériel et gérés avec une autonomie administrative et financière. Ils couvrent les principaux services publics, tels que l'eau et l'électricité, la sécurité sociale et les phosphates, ainsi que de nombreuses agences et offices.",
      ar: "المؤسسات العمومية والمقاولات العمومية هي هيئات أحدثتها الدولة لتدبير مرفق عمومي أو نشاط ذي مصلحة عامة، وتوضع تحت وصاية قطاع حكومي وتدبر باستقلالية إدارية ومالية. وتغطي أبرز المرافق العمومية، مثل الماء والكهرباء والضمان الاجتماعي والفوسفاط، إضافة إلى عدد من الوكالات والمكاتب.",
      tz: "The public institutions and the state-owned enterprises are bodies created by the State to ensure the management of a public service or of an activity of general interest. They are placed under the tutelage of a ministerial department and managed with a degree of administrative and financial autonomy. They cover the main public services, such as water and electricity, social security and phosphates, as well as numerous agencies and offices.",
      es: "Las instituciones públicas y las empresas públicas son organismos creados por el Estado para asegurar la gestión de un servicio público o de una actividad de interés general. Están bajo la tutela de un departamento ministerial y se gestionan con un grado de autonomía administrativa y financiera. Cubren los principales servicios públicos, como el agua y la electricidad, la seguridad social y los fosfatos, así como numerosas agencias y oficinas."
    },
    order: 20,
    sourceUrl: "https://adala.justice.gov.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-representatives",
    slug: "house-of-representatives",
    name: {
      en: "House of Representatives",
      fr: "Chambre des représentants",
      ar: "مجلس النواب",
      tz: "House of Representatives",
      es: "Cámara de Representantes"
    },
    type: "representatives",
    level: 3,
    parent: "parliament",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter IV (Of the Parliament), Article 62 and following",
      fr: "Constitution de 2011, Titre IV (Du Parlement), article 62 et suivants",
      ar: "دستور 2011، الباب الرابع (البرلمان)، المادة 62 وما بعدها",
      tz: "Constitution of 2011, Chapter IV (Of the Parliament), Article 62 and following",
      es: "Constitución de 2011, Capítulo IV (Del Parlamento), artículo 62 y siguientes"
    },
    responsibilities: [
      {
        en: "Votes the laws and the finance law, and controls the action of the Government",
        fr: "Vote les lois et la loi de finances, et contrôle l'action du Gouvernement",
        ar: "يصوت على القوانين وقانون المالية، ويراقب عمل الحكومة",
        tz: "Votes the laws and the finance law, and controls the action of the Government",
        es: "Vota las leyes y la ley de finanzas, y controla la acción del Gobierno"
      },
      {
        en: "May set up commissions of inquiry and hear the members of the Government",
        fr: "Peut créer des commissions d'enquête et entendre les membres du Gouvernement",
        ar: "يمكنه إحداث لجان تقصي الحقائق والاستماع إلى أعضاء الحكومة",
        tz: "May set up commissions of inquiry and hear the members of the Government",
        es: "Puede crear comisiones de investigación y escuchar a los miembros del Gobierno"
      },
      {
        en: "Elects its President and its bureau, and organizes the work of the standing committees",
        fr: "Élit son Président et son bureau, et organise les travaux des commissions permanentes",
        ar: "ينتخب رئيسه ومكتبه، وينظم أشغال اللجان الدائمة",
        tz: "Elects its President and its bureau, and organizes the work of the standing committees",
        es: "Elige a su Presidente y a su mesa, y organiza los trabajos de las comisiones permanentes"
      }
    ],
    website: "https://www.parlement.ma",
    content: {
      en: "The House of Representatives is the lower chamber of Parliament. Its 395 members are elected by direct universal suffrage for a five-year term: 305 are elected in the local electoral districts and 90 on regional lists reserved for the promotion of gender parity. The last general election was held on 23 September 2026. Brahim Rachidi presided over the chamber during the 2021-2026 legislature; the President of the new legislature is elected by the House at its opening sitting.",
      fr: "La Chambre des représentants est la chambre basse du Parlement. Ses 395 membres sont élus au suffrage universel direct pour un mandat de cinq ans : 305 sont élus dans les circonscriptions électorales locales et 90 sur des listes régionales réservées à la promotion de la parité. Les dernières élections législatives se sont tenues le 23 septembre 2026. Brahim Rachidi a présidé la chambre durant la législature 2021-2026 ; le président de la nouvelle législature est élu par la Chambre lors de sa séance d'ouverture.",
      ar: "مجلس النواب هو الغرفة السفلى للبرلمان. ينتخب أعضاؤه البالغ عددهم 395 بالاقتراع العام المباشر لمدة خمس سنوات: 305 منهم ينتخبون في الدوائر الانتخابية المحلية و90 على لوائح جهوية مخصصة لتعزيز المناصفة. وأجريت آخر انتخابات تشريعية في 23 شتنبر 2026. وقد ترأس إبراهيم رشدي الغرفة خلال الولاية التشريعية 2021-2026؛ وينتخب رئيس الولاية التشريعية الجديدة من طرف المجلس في جلسة افتتاحه.",
      tz: "The House of Representatives is the lower chamber of Parliament. Its 395 members are elected by direct universal suffrage for a five-year term: 305 are elected in the local electoral districts and 90 on regional lists reserved for the promotion of gender parity. The last general election was held on 23 September 2026. Brahim Rachidi presided over the chamber during the 2021-2026 legislature; the President of the new legislature is elected by the House at its opening sitting.",
      es: "La Cámara de Representantes es la cámara baja del Parlamento. Sus 395 miembros son elegidos por sufragio universal directo para un mandato de cinco años: 305 en las circunscripciones electorales locales y 90 en listas regionales reservadas al fomento de la paridad. Las últimas elecciones legislativas se celebraron el 23 de septiembre de 2026. Brahim Rachidi presidió la cámara durante la legislatura 2021-2026; el presidente de la nueva legislatura es elegido por la Cámara en su sesión de apertura."
    },
    currentHolder: {
      en: "Brahim Rachidi (President of the 2021-2026 legislature)",
      fr: "Brahim Rachidi (président de la législature 2021-2026)",
      ar: "إبراهيم رشدي (رئيس الولاية التشريعية 2021-2026)",
      tz: "Brahim Rachidi (President of the 2021-2026 legislature)",
      es: "Brahim Rachidi (presidente de la legislatura 2021-2026)"
    },
    order: 21,
    sourceUrl: "https://www.parlement.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  },
  {
    id: "inst-councillors",
    slug: "house-of-councillors",
    name: {
      en: "House of Councillors",
      fr: "Chambre des conseillers",
      ar: "مجلس المستشارين",
      tz: "House of Councillors",
      es: "Cámara de Consejeros"
    },
    type: "councillors",
    level: 3,
    parent: "parliament",
    constitutionalBasis: {
      en: "Constitution of 2011, Chapter IV (Of the Parliament), Article 71 and following",
      fr: "Constitution de 2011, Titre IV (Du Parlement), article 71 et suivants",
      ar: "دستور 2011، الباب الرابع (البرلمان)، المادة 71 وما بعدها",
      tz: "Constitution of 2011, Chapter IV (Of the Parliament), Article 71 and following",
      es: "Constitución de 2011, Capítulo IV (Del Parlamento), artículo 71 y siguientes"
    },
    responsibilities: [
      {
        en: "Votes the laws and examines the draft laws adopted by the House of Representatives",
        fr: "Vote les lois et examine les projets de loi adoptés par la Chambre des représentants",
        ar: "يصوت على القوانين ويناقش مشاريع القوانين التي اعتمدها مجلس النواب",
        tz: "Votes the laws and examines the draft laws adopted by the House of Representatives",
        es: "Vota las leyes y examina los proyectos de ley aprobados por la Cámara de Representantes"
      },
      {
        en: "Controls the Government and participates in the evaluation of public policies",
        fr: "Contrôle le Gouvernement et participe à l'évaluation des politiques publiques",
        ar: "يراقب الحكومة ويشارك في تقييم السياسات العمومية",
        tz: "Controls the Government and participates in the evaluation of public policies",
        es: "Controla al Gobierno y participa en la evaluación de las políticas públicas"
      },
      {
        en: "Represents the regions and the professional, economic and social organizations of the Nation",
        fr: "Représente les régions et les organisations professionnelles, économiques et sociales de la Nation",
        ar: "يمثل الجهات والمنظمات المهنية والاقتصادية والاجتماعية للأمة",
        tz: "Represents the regions and the professional, economic and social organizations of the Nation",
        es: "Representa a las regiones y a las organizaciones profesionales, económicas y sociales de la Nación"
      }
    ],
    website: "https://www.parlement.ma",
    content: {
      en: "The House of Councillors is the upper chamber of Parliament. Its 120 members are elected by indirect suffrage for a six-year term: 72 members represent the regions, 20 are elected by the professional associations (agriculture; commerce, industry and services; crafts; maritime fisheries), 8 by the most representative employers' organizations and 20 by the employees' organizations. Naama Mayara has presided over the House of Councillors since October 2021.",
      fr: "La Chambre des conseillers est la chambre haute du Parlement. Ses 120 membres sont élus au suffrage indirect pour un mandat de six ans : 72 membres représentent les régions, 20 sont élus par les chambres professionnelles (agriculture ; commerce, industrie et services ; artisanat ; pêche maritime), 8 par les organisations professionnelles les plus représentatives des employeurs et 20 par les organisations des salariés. Naama Mayara préside la Chambre des conseillers depuis octobre 2021.",
      ar: "مجلس المستشارين هو الغرفة العليا للبرلمان. ينتخب أعضاؤه البالغ عددهم 120 بالاقتراع غير المباشر لمدة ست سنوات: 72 عضوا يمثلون الجهات، و20 ينتخبهم أعضاء الغرف المهنية (الفلاحة؛ التجارة والصناعة والخدمات؛ الصناعة التقليدية؛ الصيد البحري)، و8 تنتخبهم أنشط المنظمات المهنية للمشغلين، و20 تنتخبهم منظمات الأجراء. وترأس نعامة ميارا مجلس المستشارين منذ أكتوبر 2021.",
      tz: "The House of Councillors is the upper chamber of Parliament. Its 120 members are elected by indirect suffrage for a six-year term: 72 members represent the regions, 20 are elected by the professional associations (agriculture; commerce, industry and services; crafts; maritime fisheries), 8 by the most representative employers' organizations and 20 by the employees' organizations. Naama Mayara has presided over the House of Councillors since October 2021.",
      es: "La Cámara de Consejeros es la cámara alta del Parlamento. Sus 120 miembros son elegidos por sufragio indirecto para un mandato de seis años: 72 miembros representan a las regiones, 20 son elegidos por las cámaras profesionales (agricultura; comercio, industria y servicios; artesanía; pesca marítima), 8 por las organizaciones profesionales más representativas de los empleadores y 20 por las organizaciones de los asalariados. Naama Mayara preside la Cámara de Consejeros desde octubre de 2021."
    },
    currentHolder: {
      en: "Naama Mayara",
      fr: "Naama Mayara",
      ar: "نعامة ميارا",
      tz: "Naama Mayara",
      es: "Naama Mayara"
    },
    order: 22,
    sourceUrl: "https://www.parlement.ma",
    verifiedAt: "2026-10-03",
    publishedAt: "2026-10-03"
  }
];

export default institutions;
export { institutions };
