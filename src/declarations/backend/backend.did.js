export const idlFactory = ({ IDL }) => {
  const Topic = IDL.Text;
  const Activity = IDL.Record({
    'id' : IDL.Nat,
    'contentFa' : IDL.Text,
    'contentSv' : IDL.Text,
    'topic' : Topic,
    'descriptionFa' : IDL.Text,
    'descriptionSv' : IDL.Text,
    'createdAt' : IDL.Int,
    'slug' : IDL.Text,
    'isActive' : IDL.Bool,
    'updatedAt' : IDL.Int,
    'imageUrl' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'hasRegistrationForm' : IDL.Bool,
    'titleFa' : IDL.Text,
    'titleSv' : IDL.Text,
  });
  const AreaInput = IDL.Record({
    'topic' : IDL.Text,
    'icon' : IDL.Text,
    'subtitleFa' : IDL.Text,
    'subtitleSv' : IDL.Text,
    'titleFa' : IDL.Text,
    'titleSv' : IDL.Text,
  });
  const Area = IDL.Record({
    'id' : IDL.Nat,
    'topic' : IDL.Text,
    'order' : IDL.Nat,
    'icon' : IDL.Text,
    'cardBackground' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'subtitleFa' : IDL.Text,
    'subtitleSv' : IDL.Text,
    'areaBackgroundVideo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'areaBackground' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'titleFa' : IDL.Text,
    'titleSv' : IDL.Text,
  });
  const FooterLink = IDL.Record({
    'id' : IDL.Nat,
    'url' : IDL.Text,
    'labelFa' : IDL.Text,
    'labelSv' : IDL.Text,
    'order' : IDL.Nat,
    'category' : IDL.Text,
  });
  const HeroSlide = IDL.Record({
    'id' : IDL.Nat,
    'topic' : Topic,
    'order' : IDL.Nat,
    'isActive' : IDL.Bool,
    'imageUrl' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'subtitleFa' : IDL.Text,
    'subtitleSv' : IDL.Text,
    'titleFa' : IDL.Text,
    'titleSv' : IDL.Text,
  });
  const AboutContent = IDL.Record({
    'id' : IDL.Nat,
    'contentFa' : IDL.Text,
    'contentSv' : IDL.Text,
    'imagePath' : IDL.Opt(IDL.Text),
  });
  const Background = IDL.Record({
    'id' : IDL.Nat,
    'activitySlug' : IDL.Opt(IDL.Text),
    'scope' : IDL.Text,
    'imageUrl' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'mediaType' : IDL.Opt(IDL.Text),
  });
  const ContactInfo = IDL.Record({
    'id' : IDL.Nat,
    'email' : IDL.Text,
    'addressFa' : IDL.Text,
    'addressSv' : IDL.Text,
    'mapEmbedUrl' : IDL.Opt(IDL.Text),
    'phone' : IDL.Text,
  });
  const ContactSubmission = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'email' : IDL.Text,
    'message' : IDL.Text,
    'timestamp' : IDL.Int,
    'phone' : IDL.Opt(IDL.Text),
  });
  const SubmissionStatus = IDL.Variant({
    'Approved' : IDL.Null,
    'Rejected' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const RegistrationSubmission = IDL.Record({
    'id' : IDL.Nat,
    'status' : SubmissionStatus,
    'nameFa' : IDL.Opt(IDL.Text),
    'nameSv' : IDL.Opt(IDL.Text),
    'activityId' : IDL.Nat,
    'submittedAt' : IDL.Int,
    'email' : IDL.Text,
    'message' : IDL.Opt(IDL.Text),
    'phone' : IDL.Opt(IDL.Text),
  });
  const SiteSettings = IDL.Record({
    'id' : IDL.Nat,
    'landingSubtitleFa' : IDL.Text,
    'landingSubtitleSv' : IDL.Text,
    'primaryColor' : IDL.Text,
    'topicsBgVideo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'accentColor' : IDL.Text,
    'logoUrl' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'adminPassword' : IDL.Text,
    'secondaryColor' : IDL.Text,
    'topicsBgImage' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'titleFa' : IDL.Text,
    'titleSv' : IDL.Text,
  });
  const ContactSubmissionInput = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'message' : IDL.Text,
    'phone' : IDL.Opt(IDL.Text),
  });
  const RegistrationInput = IDL.Record({
    'nameFa' : IDL.Opt(IDL.Text),
    'nameSv' : IDL.Opt(IDL.Text),
    'activityId' : IDL.Nat,
    'email' : IDL.Text,
    'message' : IDL.Opt(IDL.Text),
    'phone' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'addActivity' : IDL.Func(
        [IDL.Text, Activity],
        [IDL.Variant({ 'ok' : Activity, 'err' : IDL.Text })],
        [],
      ),
    'addArea' : IDL.Func(
        [IDL.Text, AreaInput],
        [IDL.Variant({ 'ok' : Area, 'err' : IDL.Text })],
        [],
      ),
    'addFooterLink' : IDL.Func(
        [IDL.Text, FooterLink],
        [IDL.Variant({ 'ok' : FooterLink, 'err' : IDL.Text })],
        [],
      ),
    'addHeroSlide' : IDL.Func(
        [IDL.Text, HeroSlide],
        [IDL.Variant({ 'ok' : HeroSlide, 'err' : IDL.Text })],
        [],
      ),
    'adminLogin' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], []),
    'deleteActivity' : IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'deleteArea' : IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'deleteContactSubmission' : IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'deleteFooterLink' : IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'deleteHeroSlide' : IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'deleteSubmission' : IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'getAbout' : IDL.Func([], [AboutContent], ['query']),
    'getActivities' : IDL.Func(
        [IDL.Opt(Topic)],
        [IDL.Vec(Activity)],
        ['query'],
      ),
    'getActivityBySlug' : IDL.Func([IDL.Text], [IDL.Opt(Activity)], ['query']),
    'getAllActivitiesAdmin' : IDL.Func(
        [IDL.Opt(Topic)],
        [IDL.Vec(Activity)],
        ['query'],
      ),
    'getAllHeroSlides' : IDL.Func([], [IDL.Vec(HeroSlide)], ['query']),
    'getAreas' : IDL.Func([], [IDL.Vec(Area)], ['query']),
    'getBackgrounds' : IDL.Func([], [IDL.Vec(Background)], ['query']),
    'getContactInfo' : IDL.Func([], [IDL.Opt(ContactInfo)], ['query']),
    'getContactSubmissions' : IDL.Func(
        [IDL.Text],
        [IDL.Variant({ 'ok' : IDL.Vec(ContactSubmission), 'err' : IDL.Text })],
        [],
      ),
    'getFooterLinks' : IDL.Func([], [IDL.Vec(FooterLink)], ['query']),
    'getHeroSlides' : IDL.Func([Topic], [IDL.Vec(HeroSlide)], ['query']),
    'getRegistrationSubmissions' : IDL.Func(
        [IDL.Opt(IDL.Nat)],
        [IDL.Vec(RegistrationSubmission)],
        ['query'],
      ),
    'getSiteSettings' : IDL.Func([], [IDL.Opt(SiteSettings)], ['query']),
    'reorderAreas' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat)],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'reorderFooterLinks' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat)],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'reorderHeroSlides' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat)],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'resetAdminPassword' : IDL.Func(
        [IDL.Text],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'seedSampleData' : IDL.Func([], [IDL.Bool], []),
    'setAbout' : IDL.Func(
        [IDL.Text, AboutContent],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'setAreaBackground' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Vec(IDL.Nat8)],
        [IDL.Variant({ 'ok' : IDL.Opt(Area), 'err' : IDL.Text })],
        [],
      ),
    'setAreaBackgroundVideo' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Vec(IDL.Nat8)],
        [IDL.Variant({ 'ok' : IDL.Opt(Area), 'err' : IDL.Text })],
        [],
      ),
    'setAreaCardBackground' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Vec(IDL.Nat8)],
        [IDL.Variant({ 'ok' : IDL.Opt(Area), 'err' : IDL.Text })],
        [],
      ),
    'setBackground' : IDL.Func(
        [IDL.Text, Background],
        [IDL.Variant({ 'ok' : Background, 'err' : IDL.Text })],
        [],
      ),
    'setContactInfo' : IDL.Func(
        [IDL.Text, ContactInfo],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'setSiteSettings' : IDL.Func(
        [IDL.Text, SiteSettings],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'submitContactForm' : IDL.Func(
        [ContactSubmissionInput],
        [ContactSubmission],
        [],
      ),
    'submitRegistration' : IDL.Func(
        [RegistrationInput],
        [RegistrationSubmission],
        [],
      ),
    'updateActivity' : IDL.Func(
        [IDL.Text, Activity],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'updateAdminPassword' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'updateArea' : IDL.Func(
        [IDL.Text, IDL.Nat, AreaInput],
        [IDL.Variant({ 'ok' : IDL.Opt(Area), 'err' : IDL.Text })],
        [],
      ),
    'updateFooterLink' : IDL.Func(
        [IDL.Text, FooterLink],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'updateHeroSlide' : IDL.Func(
        [IDL.Text, HeroSlide],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
    'updateSubmissionStatus' : IDL.Func(
        [IDL.Text, IDL.Nat, SubmissionStatus],
        [IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text })],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
