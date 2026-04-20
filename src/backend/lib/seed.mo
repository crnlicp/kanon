import List "mo:core/List";
import ContentTypes "../types/content";
import SettingsTypes "../types/settings";
import AreaTypes "../types/area";

module {
  public func seedSampleData(
    siteSettings : { var value : ?SettingsTypes.SiteSettings },
    contactInfo : { var value : ?SettingsTypes.ContactInfo },
    heroSlides : List.List<ContentTypes.HeroSlide>,
    activities : List.List<ContentTypes.Activity>,
    backgrounds : List.List<ContentTypes.Background>,
    footerLinks : List.List<ContentTypes.FooterLink>,
    areas : List.List<AreaTypes.Area>,
    nextHeroSlideId : { var value : Nat },
    nextActivityId : { var value : Nat },
    nextBackgroundId : { var value : Nat },
    nextFooterLinkId : { var value : Nat },
    nextAreaId : { var value : Nat },
    seeded : { var value : Bool },
  ) : Bool {
    if (seeded.value) return false;

    // --- Site Settings ---
    siteSettings.value := ?{
      id = 1;
      logoUrl = null;
      titleFa = "مرکز فرهنگی، آموزشی و ورزشی";
      titleSv = "Kulturellt, utbildnings- och sportcenter";
      landingSubtitleFa = "به دنیای فرهنگ، آموزش و ورزش خوش آمدید";
      landingSubtitleSv = "Välkommen till en värld av kultur, utbildning och sport";
      primaryColor = "#1a1a2e";
      secondaryColor = "#16213e";
      accentColor = "#e94560";
      adminPassword = "kanonGolYasAdminPassword";
      topicsBgImage = null;
      topicsBgVideo = null;
    };

    // --- Contact Info ---
    contactInfo.value := ?{
      id = 1;
      addressFa = "خیابان فرهنگ، پلاک ۱۲، تهران، ایران";
      addressSv = "Kulturvägen 12, Stockholm, Sverige";
      phone = "+46 8 123 456 78";
      email = "info@example.com";
      mapEmbedUrl = null;
    };

    // --- Default Areas (Cultural, Educational, Sport) ---
    let culturalArea : AreaTypes.Area = {
      id = nextAreaId.value;
      icon = "Palette";
      titleFa = "فرهنگی";
      titleSv = "Kulturellt";
      subtitleFa = "هنر، موسیقی و فرهنگ ایرانی";
      subtitleSv = "Konst, musik och iransk kultur";
      cardBackground = null;
      areaBackground = null;
      areaBackgroundVideo = null;
      order = 0;
    };
    nextAreaId.value += 1;
    areas.add(culturalArea);

    let educationalArea : AreaTypes.Area = {
      id = nextAreaId.value;
      icon = "BookOpen";
      titleFa = "آموزشی";
      titleSv = "Utbildning";
      subtitleFa = "دوره‌ها، کارگاه‌ها و یادگیری زبان";
      subtitleSv = "Kurser, workshops och språkinlärning";
      cardBackground = null;
      areaBackground = null;
      areaBackgroundVideo = null;
      order = 1;
    };
    nextAreaId.value += 1;
    areas.add(educationalArea);

    let sportArea : AreaTypes.Area = {
      id = nextAreaId.value;
      icon = "Dumbbell";
      titleFa = "ورزشی";
      titleSv = "Sport";
      subtitleFa = "فوتبال، شنا، یوگا و بیشتر";
      subtitleSv = "Fotboll, simning, yoga och mer";
      cardBackground = null;
      areaBackground = null;
      areaBackgroundVideo = null;
      order = 2;
    };
    nextAreaId.value += 1;
    areas.add(sportArea);

    // --- Hero Slides: Cultural (2) ---
    let culturalSlide1 : ContentTypes.HeroSlide = {
      id = nextHeroSlideId.value;
      topic = #Cultural;
      titleFa = "کشف فرهنگ ایرانی";
      titleSv = "Utforska iransk kultur";
      subtitleFa = "سفری به دل هنر و تاریخ";
      subtitleSv = "En resa till hjärtat av konst och historia";
      imageUrl = null;
      order = 0;
      isActive = true;
    };
    nextHeroSlideId.value += 1;
    heroSlides.add(culturalSlide1);

    let culturalSlide2 : ContentTypes.HeroSlide = {
      id = nextHeroSlideId.value;
      topic = #Cultural;
      titleFa = "جشن نوروز ۱۴۰۴";
      titleSv = "Fira Nowruz 1404";
      subtitleFa = "سال نو مبارک — آغاز بهار";
      subtitleSv = "Gott nytt år — vårens början";
      imageUrl = null;
      order = 1;
      isActive = true;
    };
    nextHeroSlideId.value += 1;
    heroSlides.add(culturalSlide2);

    // --- Hero Slides: Educational (2) ---
    let eduSlide1 : ContentTypes.HeroSlide = {
      id = nextHeroSlideId.value;
      topic = #Educational;
      titleFa = "یادگیری بدون مرز";
      titleSv = "Lärande utan gränser";
      subtitleFa = "برنامه‌های آموزشی برای همه سنین";
      subtitleSv = "Utbildningsprogram för alla åldrar";
      imageUrl = null;
      order = 0;
      isActive = true;
    };
    nextHeroSlideId.value += 1;
    heroSlides.add(eduSlide1);

    let eduSlide2 : ContentTypes.HeroSlide = {
      id = nextHeroSlideId.value;
      topic = #Educational;
      titleFa = "آینده‌ات را بساز";
      titleSv = "Bygg din framtid";
      subtitleFa = "دوره‌های تخصصی و کارگاه‌های عملی";
      subtitleSv = "Specialkurser och praktiska workshops";
      imageUrl = null;
      order = 1;
      isActive = true;
    };
    nextHeroSlideId.value += 1;
    heroSlides.add(eduSlide2);

    // --- Hero Slides: Sport (2) ---
    let sportSlide1 : ContentTypes.HeroSlide = {
      id = nextHeroSlideId.value;
      topic = #Sport;
      titleFa = "سلامت و تندرستی";
      titleSv = "Hälsa och välmående";
      subtitleFa = "تجربه ورزش در محیطی دوستانه";
      subtitleSv = "Upplev sport i en vänlig miljö";
      imageUrl = null;
      order = 0;
      isActive = true;
    };
    nextHeroSlideId.value += 1;
    heroSlides.add(sportSlide1);

    let sportSlide2 : ContentTypes.HeroSlide = {
      id = nextHeroSlideId.value;
      topic = #Sport;
      titleFa = "قهرمان زندگیت باش";
      titleSv = "Bli hjälten i ditt liv";
      subtitleFa = "برنامه‌های ورزشی برای تمام سطوح";
      subtitleSv = "Sportprogram för alla nivåer";
      imageUrl = null;
      order = 1;
      isActive = true;
    };
    nextHeroSlideId.value += 1;
    heroSlides.add(sportSlide2);

    // --- Activities: Cultural (3) ---
    let nowruz : ContentTypes.Activity = {
      id = nextActivityId.value;
      topic = #Cultural;
      slug = "nowruz-exhibition";
      titleFa = "نمایشگاه نوروز";
      titleSv = "Nowruz-utställning";
      descriptionFa = "نمایشگاهی با آثار هنری سنتی ایرانی برای جشن سال نو";
      descriptionSv = "En utställning med traditionell iransk konst för att fira nyår";
      contentFa = "نمایشگاه نوروز فرصتی است تا با هنر سنتی ایرانی، خوشنویسی، نقاشی مینیاتور و صنایع‌دستی آشنا شوید. این رویداد هر ساله در بهار برگزار می‌شود و همه اقشار جامعه را به تجربه فرهنگ غنی ایران دعوت می‌کند.";
      contentSv = "Nowruz-utställningen är en möjlighet att bekanta sig med traditionell iransk konst, kalligrafi, miniatyrmålning och hantverk. Detta evenemang hålls varje vår och inbjuder alla samhällsgrupper att uppleva Irans rika kultur.";
      imageUrl = null;
      isActive = true;
      hasRegistrationForm = true;
      createdAt = 0;
      updatedAt = 0;
    };
    nextActivityId.value += 1;
    activities.add(nowruz);

    let calligraphy : ContentTypes.Activity = {
      id = nextActivityId.value;
      topic = #Cultural;
      slug = "calligraphy-workshop";
      titleFa = "کارگاه خوشنویسی";
      titleSv = "Kalligrafiworkshop";
      descriptionFa = "یادگیری هنر خوشنویسی فارسی با اساتید مجرب";
      descriptionSv = "Lär dig konsten persisk kalligrafi med erfarna lärare";
      contentFa = "در این کارگاه با هنر خوشنویسی فارسی آشنا می‌شوید. از مبتدی تا پیشرفته — استاد با حوصله همه را راهنمایی می‌کند. مواد لازم فراهم است. کلاس‌ها هر هفته پنج‌شنبه برگزار می‌شود.";
      contentSv = "I denna workshop lär du dig persisk kalligrafikonst. Från nybörjare till avancerad — läraren vägleder alla tålmodigt. Nödvändigt material tillhandahålls. Lektionerna hålls varje torsdag.";
      imageUrl = null;
      isActive = true;
      hasRegistrationForm = true;
      createdAt = 0;
      updatedAt = 0;
    };
    nextActivityId.value += 1;
    activities.add(calligraphy);

    let music : ContentTypes.Activity = {
      id = nextActivityId.value;
      topic = #Cultural;
      slug = "persian-music-night";
      titleFa = "شب موسیقی ایرانی";
      titleSv = "Persisk musiknatt";
      descriptionFa = "یک شب فراموش‌نشدنی با موسیقی اصیل ایرانی";
      descriptionSv = "En oförglömlig kväll med äkta iransk musik";
      contentFa = "شب موسیقی ایرانی یک رویداد ماهانه است که نوازندگان حرفه‌ای موسیقی سنتی ایران، از جمله سه‌تار، تنبک و کمانچه، برای مخاطبان اجرا می‌کنند. فضایی گرم و صمیمی برای دوستداران موسیقی اصیل.";
      contentSv = "Persisk musiknatt är ett månatligt evenemang där professionella musiker spelar traditionell iransk musik, inklusive sitar, tombak och kamancheh, för publiken. En varm och intim atmosfär för älskare av äkta musik.";
      imageUrl = null;
      isActive = true;
      hasRegistrationForm = false;
      createdAt = 0;
      updatedAt = 0;
    };
    nextActivityId.value += 1;
    activities.add(music);

    // --- Activities: Educational (3) ---
    let langLearning : ContentTypes.Activity = {
      id = nextActivityId.value;
      topic = #Educational;
      slug = "language-learning";
      titleFa = "یادگیری زبان";
      titleSv = "Språkinlärning";
      descriptionFa = "دوره‌های فارسی برای غیرفارسی‌زبانان و سوئدی برای فارسی‌زبانان";
      descriptionSv = "Persiska kurser för icke-persiatalare och svenska för persiatalare";
      contentFa = "این دوره‌ها به افرادی که می‌خواهند زبان فارسی یا سوئدی یاد بگیرند طراحی شده است. مدرسان مجرب با روش‌های نوین آموزشی، یادگیری را شاد و مؤثر می‌کنند. کلاس‌ها به صورت آنلاین و حضوری برگزار می‌شود.";
      contentSv = "Dessa kurser är utformade för personer som vill lära sig persiska eller svenska. Erfarna lärare gör lärandet roligt och effektivt med moderna undervisningsmetoder. Lektionerna hålls både online och på plats.";
      imageUrl = null;
      isActive = true;
      hasRegistrationForm = true;
      createdAt = 0;
      updatedAt = 0;
    };
    nextActivityId.value += 1;
    activities.add(langLearning);

    let mathClub : ContentTypes.Activity = {
      id = nextActivityId.value;
      topic = #Educational;
      slug = "math-club";
      titleFa = "باشگاه ریاضی";
      titleSv = "Matematikklubb";
      descriptionFa = "تقویت مهارت‌های ریاضی برای دانش‌آموزان با روش‌های خلاقانه";
      descriptionSv = "Stärk matematikfärdigheterna för elever med kreativa metoder";
      contentFa = "باشگاه ریاضی برای دانش‌آموزان ۱۰ تا ۱۶ ساله طراحی شده است. جلسات هفتگی شامل حل مسائل چالشی، بازی‌های آموزشی و آمادگی برای المپیادهای ریاضی است. پیوستن به ما و کشف لذت ریاضی را تجربه کنید.";
      contentSv = "Matematikklubben är utformad för elever i åldern 10 till 16. Veckosessioner inkluderar lösning av utmanande problem, pedagogiska spel och förberedelse för matematikolympiader. Gå med oss och upplev glädjen med matematik.";
      imageUrl = null;
      isActive = true;
      hasRegistrationForm = true;
      createdAt = 0;
      updatedAt = 0;
    };
    nextActivityId.value += 1;
    activities.add(mathClub);

    let scienceFair : ContentTypes.Activity = {
      id = nextActivityId.value;
      topic = #Educational;
      slug = "science-fair";
      titleFa = "نمایشگاه علوم";
      titleSv = "Vetenskapsmässa";
      descriptionFa = "فرصتی برای جوانان تا پروژه‌های علمی خود را به نمایش بگذارند";
      descriptionSv = "En möjlighet för ungdomar att visa upp sina vetenskapliga projekt";
      contentFa = "نمایشگاه علوم سالانه یک رویداد هیجان‌انگیز است که در آن دانش‌آموزان پروژه‌های علمی و تکنولوژی خود را ارائه می‌دهند. هیئت داوران از بهترین پروژه‌ها تقدیر می‌کند. ثبت‌نام برای شرکت‌کنندگان و بازدیدکنندگان آزاد است.";
      contentSv = "Den årliga vetenskapsmässan är ett spännande evenemang där elever presenterar sina vetenskapliga och teknologiska projekt. Juryn hedrar de bästa projekten. Registrering är öppen för deltagare och besökare.";
      imageUrl = null;
      isActive = true;
      hasRegistrationForm = true;
      createdAt = 0;
      updatedAt = 0;
    };
    nextActivityId.value += 1;
    activities.add(scienceFair);

    // --- Activities: Sport (3) ---
    let yoga : ContentTypes.Activity = {
      id = nextActivityId.value;
      topic = #Sport;
      slug = "yoga";
      titleFa = "یوگا";
      titleSv = "Yoga";
      descriptionFa = "کلاس‌های یوگا برای تمام سطوح در فضایی آرام و مدرن";
      descriptionSv = "Yogaklasser för alla nivåer i en lugn och modern miljö";
      contentFa = "کلاس‌های یوگای ما برای همه سطوح از مبتدی تا پیشرفته مناسب است. مربیان حرفه‌ای با تمرکز بر تنفس، انعطاف و آرامش ذهن، جلسات را هدایت می‌کنند. کلاس‌ها هر روز صبح و عصر برگزار می‌شود.";
      contentSv = "Våra yogaklasser är lämpliga för alla nivåer från nybörjare till avancerad. Professionella instruktörer leder sessionerna med fokus på andning, flexibilitet och mentalt lugn. Klasser hålls varje morgon och kväll.";
      imageUrl = null;
      isActive = true;
      hasRegistrationForm = true;
      createdAt = 0;
      updatedAt = 0;
    };
    nextActivityId.value += 1;
    activities.add(yoga);

    let football : ContentTypes.Activity = {
      id = nextActivityId.value;
      topic = #Sport;
      slug = "football";
      titleFa = "فوتبال";
      titleSv = "Fotboll";
      descriptionFa = "تیم‌های فوتبال برای جوانان و بزرگسالان با مسابقات هفتگی";
      descriptionSv = "Fotbollslag för ungdomar och vuxna med veckovisa matcher";
      contentFa = "برنامه فوتبال ما شامل تیم‌های مختلف سنی از ۸ تا ۴۵ سال است. تمرینات هفتگی، مسابقات دوستانه و لیگ داخلی از جمله فعالیت‌های این برنامه است. بیا و بخشی از خانواده فوتبال ما باش!";
      contentSv = "Vårt fotbollsprogram inkluderar olika ålderslag från 8 till 45 år. Veckoträningar, vänskapsmatcher och intern liga är bland programmets aktiviteter. Kom och bli en del av vår fotballfamilj!";
      imageUrl = null;
      isActive = true;
      hasRegistrationForm = true;
      createdAt = 0;
      updatedAt = 0;
    };
    nextActivityId.value += 1;
    activities.add(football);

    let swimming : ContentTypes.Activity = {
      id = nextActivityId.value;
      topic = #Sport;
      slug = "swimming";
      titleFa = "شنا";
      titleSv = "Simning";
      descriptionFa = "آموزش شنا برای کودکان و بزرگسالان در استخر مجهز";
      descriptionSv = "Simundervisning för barn och vuxna i välutrustad pool";
      contentFa = "برنامه شنای ما در یک استخر ۲۵ متری مجهز برگزار می‌شود. کلاس‌های مخصوص کودکان از ۴ سال، نوجوانان و بزرگسالان وجود دارد. مربیان دارای مدرک بین‌المللی هستند و ایمنی اولویت اول ماست.";
      contentSv = "Vårt simprogram hålls i en välutrustad 25-meters pool. Det finns specialklasser för barn från 4 år, ungdomar och vuxna. Instruktörerna har internationella certifikat och säkerhet är vår högsta prioritet.";
      imageUrl = null;
      isActive = true;
      hasRegistrationForm = true;
      createdAt = 0;
      updatedAt = 0;
    };
    nextActivityId.value += 1;
    activities.add(swimming);

    // --- Backgrounds (4 scopes) ---
    let bgLanding : ContentTypes.Background = {
      id = nextBackgroundId.value;
      scope = #Landing;
      activitySlug = null;
      imageUrl = null;
      mediaType = null;
    };
    nextBackgroundId.value += 1;
    backgrounds.add(bgLanding);

    let bgCultural : ContentTypes.Background = {
      id = nextBackgroundId.value;
      scope = #Cultural;
      activitySlug = null;
      imageUrl = null;
      mediaType = null;
    };
    nextBackgroundId.value += 1;
    backgrounds.add(bgCultural);

    let bgEducational : ContentTypes.Background = {
      id = nextBackgroundId.value;
      scope = #Educational;
      activitySlug = null;
      imageUrl = null;
      mediaType = null;
    };
    nextBackgroundId.value += 1;
    backgrounds.add(bgEducational);

    let bgSport : ContentTypes.Background = {
      id = nextBackgroundId.value;
      scope = #Sport;
      activitySlug = null;
      imageUrl = null;
      mediaType = null;
    };
    nextBackgroundId.value += 1;
    backgrounds.add(bgSport);

    // --- Footer Links (4) ---
    let link1 : ContentTypes.FooterLink = {
      id = nextFooterLinkId.value;
      labelFa = "درباره ما";
      labelSv = "Om oss";
      url = "/about";
      order = 0;
      category = "main";
    };
    nextFooterLinkId.value += 1;
    footerLinks.add(link1);

    let link2 : ContentTypes.FooterLink = {
      id = nextFooterLinkId.value;
      labelFa = "تماس با ما";
      labelSv = "Kontakta oss";
      url = "/contact";
      order = 1;
      category = "main";
    };
    nextFooterLinkId.value += 1;
    footerLinks.add(link2);

    let link3 : ContentTypes.FooterLink = {
      id = nextFooterLinkId.value;
      labelFa = "حریم خصوصی";
      labelSv = "Integritetspolicy";
      url = "/privacy";
      order = 2;
      category = "legal";
    };
    nextFooterLinkId.value += 1;
    footerLinks.add(link3);

    let link4 : ContentTypes.FooterLink = {
      id = nextFooterLinkId.value;
      labelFa = "شرایط استفاده";
      labelSv = "Användarvillkor";
      url = "/terms";
      order = 3;
      category = "legal";
    };
    nextFooterLinkId.value += 1;
    footerLinks.add(link4);

    seeded.value := true;
    true;
  };
};
