export type Track = {
  id: string;
  groupId: string;
  title: string;
  description: string;
  tags: string[];
  artwork: {
    src: string;
    alt?: string;
  };
  audio: {
    sunoCoverUrl: string;
    originalUrl?: string;
  };
  lyrics?: {
    text: string;
  };
  originalRef?: {
    year: number;
    description: string;
  };
  releaseDate?: string;
  downloads?: {
    allow: boolean;
    filename?: string;
  };
  order?: number;
};

const PH_IMG = "/art/placeholder.png";
const PH_MP3 = "/songs/placeholder.mp3";

export const isPlaceholderTrack = (track: Track) =>
  track.artwork.src === PH_IMG || track.audio.sunoCoverUrl === PH_MP3;

export const tracks: Track[] = [
  // ─── SAINT ANTHONY ───────────────────────────────────────────────────────────

  {
    id: "sa-she-knows",
    groupId: "saint-anthony",
    title: "She Knows",
    description: "A freestyle odyssey, from winter streets to cosmic metaphors.",
    tags: ["hip-hop", "spoken-word", "freestyle"],
    artwork: {
      src: "/art/sheknows.png",
      alt: "She Knows artwork",
    },
    audio: {
      sunoCoverUrl:
        "/songs/She Knows - 2-7 - TRIPHOPMETALCORE- (50,50) - D - new voice style test.mp3",
    },
    lyrics: {
      text: `[Intro]
I don't do this often but...

[Pre-Verse]
when i do i like to get a lot in
there's no stoppin when you're climbing for the top (top)
Let's take our time, and climb the right side….
(Right side) ….

Up the mountain -
yeah follow me - we'll take our time, and climb the right side (right side)
to see the sun rise (sun rise), on our way to the top

[Verse 1]
and i mean it - when i say i'll get a lot in
It's the mind that brings you, the following no stop-ping
the sound of voice is mine all in one cut just cause i'm cool like that
This life's just fine I can relax - I do relax (I do relax)

you attack, it's cool i got my shield of truth
jump at me, I'm Hermes, I can fly right over you
in my wing-ed boots, i can phase through walls
wizard in a cloak all blue, i throw some icicles

[Pre-Chorus]
Cause i'm cold (cold) … no really
it was snowing earlier we all got stuck in the city
but finally we're home, and i am only warming up.
my dress shirt's in the corner next to hers and they're all crumbled up (yeah)

We had a cab. but just for ten blocks
We had to walk fifteen and you know that's a lot
for a girl, in those shoes, she's lookin fine, in that leather.
you might think your rhymes are cool but she thinks mine, are much better

[Chorus]
Yea she knows…
she knows…
she knows…
whats true…
Smart girl…

[Verse 2]
(school) learning curve, so far ahead
ruin all your scores, study while you're all in bed
yea, she wears the led, she re-pels all evil ….
….. she lets me in (woo!)

Yes I'm in! and i'm speakin to the beat
cannot be stopped I cannot stay in my seat
cannot be blocked cannot fall of my peak
cannot be stopped - I said I cannot (I cannot)

so welcome, to this odd E P
welcome to this side of this odd emcee
I'd like to introduce its simply Anthony
Or let's go crazy Mr Tony Calamari - (wait, It's all me!)

(Oh!) - I thought i told you that
she wants to jump too soon, I gotta hold her back
she tried to jump too soon, I had to hold her back
she want's her lunch but it's too soon, so here's your snack

Yes I'm in! (in) … and i'm speaking to the rhythm
i'm speaking louder now, God only knows what's in em
I choose my battles wisely, yes that why I'll always win em
so American - I'm up in cotton and denim

Yes cotton and denim - cotton and denim
I'm so American, i can rock - and spit some venom!
Got my slippers on, comfort's number one, check (check)
Ch ch check the speakers on, flat response is best

[Interlude]
for mixing
We got to mix it up
Mixing
We got to mix it up
Mix it
We got to mix it
yes we mix it
mix it all up

[Drop]
so we E Q, that shit down, let your sound, sit right
don't misuse, what you've found, it's profound, since it's (since it's)…
E Q that shit down, let your sound, sit right
don't misuse, what you've found, it's profound, since it's … life
Life (life)

[Outro]
She knows…
She knows…
She knows… what's true`,
    },
    downloads: { allow: true, filename: "she-knows.mp3" },
    order: 1,
  },

  {
    id: "sa-blessed",
    groupId: "saint-anthony",
    title: "Blessed",
    description: "Gratitude as groove, counting blessings over a hip-hop pulse.",
    tags: ["hip-hop", "devotional", "uplifting"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Intro]
I'm so blest (blest)… you know why? - well…

[Verse 1]
I got soooo…. many options, it's so hard to decide
Lucky me - I still got working feet, knees, heart, soul and mind
Standing still is backwards, moving forward, just chillin
Look at me be the one jumping stairs all the way to the top of your building

(But I take my time), I look out each window
I see the rain, sun, rainbow, light deep red to indigo
(purple) what! - Newton was scared of six colors
This Universe amazing, miracles everywhere, star-crossed lovers

[Chorus]
Yes lovers (lovers)
like her and me
I thank the lord
how can this be
Look at me
I'm dropping seeds
Yes I'm growing up
this family tree

[Verse 2]
Cause I be there, (yeah I be there)
yeah I always be there…. you know why - (why)…..
Cause I always prepare - (yet)…
Yet some might say (Yet some might say)…
I, am, sooooo… blest

[Bridge]
blest

[Outro]
Yes lovers (like her and me)
I thank the lord, how can this be
Look at me baby I'm dropping seeds
Yeah I'm growing up this family tree`,
    },
    order: 3,
  },

  {
    id: "sadam-complete-in-your-eyes",
    groupId: "septimus-adams",
    title: "Complete (In Your Eyes) - SynthPop Remix",
    description: "Finding the entire universe in someone's gaze.",
    tags: ["hip-hop", "love", "spoken-word"],
    artwork: { src: "/art/complete-remix-art.jpg" },
    audio: { sunoCoverUrl: "/songs/Complete - 2-6 - SYNTHPOP - (50,50) - D.mp3" },
    lyrics: {
      text: `[Intro]

[Verse 1]
so people ask me how i'm doing when they see me outside
They see I'm doing great they see my face I can't hide
this happiness yes it flows out my soul
the sun is out i'm in awe I absorb

[Pre-Chorus]
all this energy that she shines on me
I soak it up… now she's a part of me
a lovely vessel designed so beautifully
that's why with you… is how I choose to be

[Chorus]
you're moving me… I feel alive
I'm blasting off… you're by my side
in the sky. we continue to rise
I see the universe and it's found in your eyes

[Verse 2]
O in your eyes I get lost I drown.
don't send a search party we cannot be found
Yea she's alone, with me, as we sink into these sheets
Yes I give her everything my every word my every beat

[Chorus]
Yes I'm complete… I feel alive
I'm blasting off… you're by my side
in the sky. we continue to rise
I see the universe and it's found in your eyes

[Instrumental Solo]
in your eyes

[Bridge]
O in your eyes I get lost I drown.
don't send a search party we cannot be found
Shes alone, with me, as we sink into the sheets
Yes I give her everything my every word my every beat

[Chorus]
Yes I'm complete… I feel alive
I'm blasting off… you're by my side
in the sky. we continue to rise
I see the universe and it's found in your eyes

[Outro]`,
    },
    order: 2,
  },

  {
    id: "sa-ac1",
    groupId: "saint-anthony",
    title: "AC1",
    description: "A visitor from Alpha Centauri reflects on your strange little world.",
    tags: ["hip-hop", "sci-fi", "spoken-word"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Intro]

[Verse 1]
Alpha Centauri One, that's where I come from
a planet just like yours and it orbits A sun
but not one sun, you see we have two
and my home goes round one of them it's actually not that new

see most stars come in twos, and i'm just like yous
except my species got advanced common sense and it's your turn to
efficiently, recirculate, energy. Yea we got that problem solved
war's no more, we praise true lord (we've evolved)

[Chorus]
so I dive down i'm in your sea of life
I swim around in your oxygen it's so so nice
my soul thirsts for your mass tonight
yes the mass of your sun - (I see the light)

[Verse 2]
yes light, it travels really fast
(one second) for moonlight to reflect and hit your sea like glass
takes (eight minutes) for sunlight to feed your grass
so when you see the sunset (you see it slightly in the past)

look up at my home, two stars, look like one
to get to where i'm from it'd take you kids millennium
Four years for me, no wonder i'm the chosen one
Cause out of Billions of other suns

(I'm, the, closest, one)

… Alpha Centauri One.

[Bridge]

[Chorus]
so I dive down i'm in your sea of life
I swim around in your oxygen it's so so nice
my soul thirsts for your mass tonight
yes the mass of your sun - (I see the light)

[Outro]`,
    },
    order: 4,
  },

  {
    id: "ac-home",
    groupId: "acoustic-core",
    title: "Home",
    description: "The simplest love song, being home is being with you.",
    tags: ["love-song", "intimate", "devotional"],
    artwork: { src: "/art/home-album-art-2.jpg" },
    audio: {
      sunoCoverUrl: "/songs/Home - 3-27 - acV1-CAMPFIREWHISPERCORE - (50,50,25) - d.mp3",
      originalUrl: "/songs/original-Home-Sometimes IWarmup Session A - 11-16-12.mp3",
    },
    originalRef: { year: 2012, description: "Warmup session recording." },
    lyrics: {
      text: `[Verse 1]
I'm home safe and sound
No one else around but you
Yes we're home safe and sound
I'm complete now with you

[Chorus]
And everything you want can happen
And everything you want will come true
And everything I want well it's everything I've got
Because I'm home and my home is with you

[Verse 2]
I'm home safe and sound
No one else around but you
Yes we're home safe and sound
No one else around but you

[Chorus]
And everything you want can happen
And everything you want will come true
And everything I want well it's everything I've got (got)
Because I'm home and my home is with you

[Bridge]
We're home safe and sound
I'm so complete, with you

[Chorus]
And everything you want can happen
And everything you want will come true
And everything I want well it's everything I've got
Because I'm home and my home is with you

[Outro]
Sometimes I (sometimes I)
Sometimes I (oh sometimes I)
Sometimes I… Let go… …

Sometimes I (sometimes I)
Sometimes I (oh sometimes I)
Sometimes I… let her take me…
…

I'm home (I'm home)
Yes I'm home with you
I'm home`,
    },
    order: 5,
  },

  // ─── CARAVAGGIO'S REVENGE ─────────────────────────────────────────────────────

  {
    id: "cr-should-i-press-the-button",
    groupId: "caravaggios-revenge",
    title: "Should I Press the Button",
    description: "A war song that starts in a crack alley and ends at countdown.",
    tags: ["alt-rock", "dark", "original"],
    artwork: { src: "/art/shouldipressthebutton.jpg" },
    audio: {
      sunoCoverUrl: "/songs/ShouldIPressTheButton-3-22- METALCORE-(30,40,80) - v-B-wPersona-A.mp3",
      originalUrl: "/songs/acarrozzo-ShouldIPressTheButton.mp3",
    },
    originalRef: { year: 2000, description: "Original recording." },
    lyrics: {
      text: `[Verse]
It's a sad sad song, For a sad sad girl
Melissa don't envision life beyond this world
No more waiting on the corner, she's hides in the alley
With a cancel bought from hell, with her crack salary

We're, going to war, so back up all your things
It's a three-hour deadline, to see what the future brings
If, you didn't know, what was going on
You'll find out soon enough, when you're asking where these bombs coming from!

[Instrumental Interlude]

[Bridge]
Music is my coffee, Bass is a cup of tea
I may play-a but I don't live a a hardcore philosophy
You have a better chance of finding her soul
If you look through the sky, than if you travel, if you travel the sea!

And I'm floating
Yes I'm floating in the sky

[Outro]
Countdown begins in
[pause]
Ten
Nine
Eight
Seven Six Five Four Three Two One BOOM!`,
    },
    order: 1,
  },

  {
    id: "cr-u",
    groupId: "caravaggios-revenge",
    title: "U",
    description: "One pronoun, delivered with maximum force.",
    tags: ["heavy", "dark", "original"],
    artwork: { src: "/art/u-song-art.jpg" },
    audio: { sunoCoverUrl: "/songs/U -3-27 - METALCORE- (30,30,40).mp3" },
    lyrics: {
      text: `[Intro]

[Verse 1]
You have lied
For the last time
And I
Will not die with you
When your eyes
When I stare at you
They lie
And I
Will not die with you

[Chorus]
YOU

[Verse 2]
You have lied
For the last time
And I
Will not die with you
When your eyes
When I stare at you
They lie
And I
Will not die with you

[Chorus]
YOU

[Bridge]
A shadow goes away /
When you shine a light on it /
I can see the truth /
When you shine a light on it /
might sound like an angry but I'm not cause I see /
You for the liar you are! /

[Guitar Solo]

[Instrumental]

[Outro]
It's You!
It's You!
It's You!
It's You!

It's You!`,
    },
    order: 2,
  },

  {
    id: "cr-changes",
    groupId: "caravaggios-revenge",
    title: "Changes",
    description: "Jet-lagged and disoriented. Everything shifted while you were away.",
    tags: ["alt-rock", "introspective", "original"],
    artwork: { src: PH_IMG },
    audio: {
      sunoCoverUrl: PH_MP3,
      originalUrl: "/songs/acarrozzo-Changes.mp3",
    },
    originalRef: { year: 2000, description: "Original recording." },
    lyrics: {
      text: `[Verse 1]
I'm thirty five hundred miles away
An then I return why couldn't things stay
The way they were
Before the year changed
And everyone is different
And nothing stayed the same

[Pre-Chorus]
I don't like these changes

[Chorus]
But at least I have some new friends
They don't know me, so i'll pretend
To be the same people as them
At least I have some new friends

[Verse 2]
My brother's not here no more
But I'm sure he's doing fine
I don't know if I have a job
But at least I have some free time
My parents have left the church
And it's for heaven's sake
Girlfriend needs some time to think and so we're on a break

[Pre-Chorus]
I don't like these changes

[Chorus]
But at least I have some new friends
They don't know me, so i'll pretend
To be the same people as them
At least I have some new friends

[Bridge]
Memories erased from my memory temporarily
So I took up photography
TO KNOW
What have I done when I'm not in control?
What have I done to deserve my given rights?
Why am I forced to make these decisions?
What have I done? What have I done?
What have I done when I'm not in control?
What have I done to deserve my given life?
Why am I forced to make these decisions?
What have I done? What have I done?
I've done
Nothing! The people around me
Whoever's guiding me, anyone who loves me
Nothing! My friends are so friendly
Maybe my enemies who want to fight me

[Pre-Chorus]
I don't like these changes

[Chorus]
But at least I have some new friends
They don't know me, so i'll pretend
To be the same people as them
At least I have some new friends

At least I have some new friends
At least I have some new friends
Who don't know me
Who really knows me`,
    },
    order: 3,
  },

  {
    id: "cr-child-alive",
    groupId: "caravaggios-revenge",
    title: "Child Alive",
    description: "When love isn't enough to change what happened.",
    tags: ["dark", "cinematic", "original"],
    artwork: { src: PH_IMG },
    audio: {
      sunoCoverUrl: "/songs/cr-Child Alive.mp3",
      originalUrl: "/songs/acarrozzo-ChildAlive.mp3",
    },
    originalRef: { year: 2000, description: "Original recording." },
    lyrics: {
      text: `[Verse 1]
Cancel all your plans, there will be no party
You should have stayed close, you should have stayed away
There's nothing you can do, and it's hard for you to see
You scream it's not fair, this shouldn't happen to me

[Chorus]
Love can't keep your child alive
So drop everything you knew of life
It's not fair we don't know why
So dream away

[Verse 2]
Lightning strikes twice and another baby dies
you're driving alone and his promises were lies
There's nothing you can do to earn some better luck
You must expose your heart so your God can sew it up

[Chorus]
And love can't keep your child alive
So forget everything you knew of life
Changes comes and our loves all die
So dream away 'cause it's all you got
Dream away 'cause it's all you got
Dream away
Dream away!

[Instrumental]

[Bridge]
(It's coming) (It's coming) (It's coming) (It's coming)

Dark, dark, spirit of the night
Lord of the flies
Don't be surprised
Of the lies

Don't know, don't care - madness despair
If there's something you should do
I suggest you do it now

[Pre-Chorus]
So slow down, get out of this place
With your fists down low, and that look upon your face
Something for nothing is all that we have ever known
Destroy something, it's not the way to get shown

[Chorus]
And love can't keep your child alive
So forget everything you knew of life
Changes comes and our loves all die
So dream away
And love can't keep your child alive
So forget everything you knew of life
Changes comes and our loves all die
So dream away 'cause it's all you got
Dream away 'cause it's all you got
Dream away
Dream away

[Outro]`,
    },
    order: 4,
  },

  {
    id: "cr-feel-this",
    groupId: "caravaggios-revenge",
    title: "Feel This",
    description: "A prayer for everyone the world failed, and a quiet rebellion.",
    tags: ["rock", "anthemic", "original"],
    artwork: { src: PH_IMG },
    audio: {
      sunoCoverUrl: PH_MP3,
      originalUrl: "/songs/acarrozzo-Feel This.mp3",
    },
    originalRef: { year: 2000, description: "Original recording." },
    lyrics: {
      text: `[Intro]
Feel this!..

[Verse 1]
Maybe you're a victim of this world
you can't believe a single thing that you're told
There will be influence from the man
it's happened before It will happen again and again

[Chorus]
Forgive me for everything I've ever done to make you sad
Forgive us for everything we've ever done to make you cry
So she don't have to…

[Verse 2]
This world is not for you this world is not for me
It's for the hidden people we cannot see
You'd like to know what I'm talking about
But you can't cause I am so lost in myself

[Chorus]
Forgive me for everything I've ever done to make you sad
Forgive us for everything we've ever done to make you cry
So, she, don't, have,
to, feel, this!

[Bridge]
You can save us with the lifting of your hand
But you let us run around, as we watch you save the other man
So please save us with the lifting of your hand
So she don't have to feel this. Feel this!

You can save us with the lifting of your hand
But you let us run around, as we watch you save the other man
So please save us with the lifting of your hand
So she don't have to feel this.
Feel this!

My band!

[Bridge 2]
And you can't get tickets to my show because there's not four of me
there's only one of me, and I play everything
It takes ten times as long just to finish one song
Cause I take take, after take, after take, after take, until I break!

[Outro]
my back trying to sing this song
of love and this fantasy reality`,
    },
    order: 5,
  },

  {
    id: "cr-give-me",
    groupId: "caravaggios-revenge",
    title: "Give Me",
    description: "Rage and tenderness in the same breath.",
    tags: ["alt-rock", "cathartic", "original"],
    artwork: { src: PH_IMG },
    audio: {
      sunoCoverUrl: PH_MP3,
      originalUrl: "/songs/acarrozzo-Give Me.mp3",
    },
    originalRef: { year: 2000, description: "Original recording." },
    lyrics: {
      text: `[Verse 1]
You're lame and you suck and I never would have believed
That you would run away and given up so easy
You are not that special just a thing to pass the time
But you must have meant something cause now the time I waste is mine
you're really not that different you're twisted mind just told you so
Personality mind flaws keep you feeling low
I was best thing you had going is it you or I who think to much
I could have saved you I could have saved… you

[Chorus]
Give me! - random bursts of violence
Brief periods of grief
Fuzzy happy feelings
And ultimate release

[Verse 2]
So don't be sad you know I'm there for you
And I know times are rough and you're lost with what to do
So please sit back and try to realize
That your eyes exaggerate and are nerving you lies
I know you're at that age where the molehills have a name
Mountains state the imbalance in your brain
Yeah yeah you're feeling sad but you have to consider
That someone else's problems might be a little bigger… you

[Chorus]
Give me random bursts of violence
Brief periods of grief
Some fuzzy happy feelings
And ultimate release
(You give me)
Random spurts of violence
Brief periods of grief
Some fuzzy happy feelings
And ultimate release

[Bridge]
I have nothing, you give me nothing
We still have something to believe in
I have nothing, you give me nothing
We still have something to believe in
I have nothing, you give me nothing
We still have something to believe in
I have nothing, you give me nothing
We still have something to believe in
(Believe in)

(We still have something to believe in)

[Outro]
I have nothing, you give me nothing
We still have something to believe in
I have nothing, you give me nothing
We still have something to believe in
I have nothing, you give me nothing
We still have something to believe in
I have nothing, you give me nothing
We still have something to believe in
(Believe in)

I didn't feel sad
for more than a day
I just needed the next morning
by noon I was OK

Believe me!

I don't want what you GIVE ME!

Give me!`,
    },
    order: 6,
  },

  {
    id: "cr-suicide-booth",
    groupId: "caravaggios-revenge",
    title: "Suicide Booth",
    description: "Dark humor drawn from the abyss, a Futurama riff with real weight.",
    tags: ["heavy", "dark", "original"],
    artwork: {
      src: "/art/holdmybreathforever.png",
      alt: "Suicide Booth artwork",
    },
    audio: {
      sunoCoverUrl:
        "/songs/Hold my Breath Forever - 2-1- (50,50,25)-D-P-NEW lyric structure.mp3",
      originalUrl:
        "/songs/original-cr-Hold my Breath Forever.mp3",
    },
    originalRef: { year: 2000, description: "Original recording." },
    lyrics: {
      text: `[Intro]
(O dear Lord its that time again)

[Verse 1]
Don't try to bother me with your emotional irrelevance
Don't try to bother me with your crystal suggestions
It's alright to bother me if it will take yet a moment
And it's alright if you want to see me tonight

[Chorus]
Hold my breath forever
If it meant that I could
Spend just another moment with you
Hold my breath forever
If it meant that I could
Spend just another moment with you

[Instrumental]

[Build-Up]
(No more protection from me)
(No more protection from me)
(No more protection from me)
(No more protection from me)

No more protection from me
The suicide booths fee is too heavy

[Breakdown]
O dear Lord its that time again
I have the equipment, but do I have the commitment?
O dear Lord its that time again
I have the equipment, but do I have the commitment?

(Medic!, Medic!, Medic!)

(Suture!, Suture!, Suture!)

[Instrumental Solo]

[Breakdown]
(No more protection from me)
(No more protection from me)
(No more protection from me)
The suicide booth's fee is too heavy

Me-dic!
Me-dic!
Me-dic!
Me-dic!

I would
I would
I would
I would`,
    },
    downloads: { allow: true, filename: "suicide-booth.mp3" },
    order: 0,
  },

  {
    id: "cr-paydenpayne",
    groupId: "caravaggios-revenge",
    title: "Paydenpayne",
    description: "Frozen oil and dead batteries, metaphors for a relationship going cold.",
    tags: ["alt-rock", "melancholy", "original"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Verse 1]
The oil's frozen over
You broke off from being mine
Cells are moving slower
In my fight against wasted time
The fuses are soaking wet
And batteries they hold no charge
I Think I have an extra set
Locked inside of your garage

[Chorus]
This is the first time I said the word
Love - You're gone…
It's obvious that you can feel
But you're gone

[Verse 2]
Confusionality
If it was a word
Would describe your personality
And so I concur
Another reason I still linger
On our possibility
So you don't flip our picture
Response hostility

[Chorus]
This is the first time I said the word
Love - You're gone…
It's obvious that you can feel
But you're gone

[Interlude]

[Bridge]
Tonight, I need to find a way
To myself, I've paydenpayne
Insight, to myself
You have my love so I've paydenpayne
Tonight, I need to find a way
To myself, I've paydenpayne
Insight, to myself
You have my love so I've paydenpayne

[Instrumental Solo]

[Chorus]
This is the first time I said the word
Love - You're gone…
It's obvious that you can feel
But you're gone

[Bridge 2]
Tonight, I need to find a way
To myself, I've paydenpayne
Insight, to myself
You have my love so I've paydenpayne
Tonight, I need to find a way
To myself, I've paydenpayne
Insight, to myself
You have my love so I've paydenpayne

[Outro]`,
    },
    order: 9,
  },

  // ─── STRANGE SOUNDS FOR STRANGE TIMES ────────────────────────────────────────

  {
    id: "sa-soda-pop",
    groupId: "saint-anthony",
    title: "Soda Pop!",
    description: "A satirical ode to America's forbidden sweetness.",
    tags: ["comedy", "rock", "satirical"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Intro]
Soda Pop!

[Chorus]
Soda Pop!
i need to drink it up
I love that Cherry coke
Doctor Pepper Seven Up

I love the sugar
yes I love it a lot
Let's go break the law
and drink a lot of soda pop

[Verse]
Welcome to America!
Yeah we got problems
We got bullets in the schools
and obese kids they gotta dodge em

see they just sit around
and play violent games all day
We gotta stand up and fight for soda rights
before the governor takes it them all away

So I say governor!
gets your mitts off my drink
It's out right to gulp big
we don't care what you think

we speak for freedom
yes we'll never stop
we love this country America
we love our, our our our - Soda Pop!

[Chorus]
Soda Pop!
We need to drink it up
We love that Cherry coke
Doctor Pepper Seven Up

We love the sugar
yes we love it a lot
Let's go break the law
and drink a lot of that soda pop

[Instrumental Interlude]

[Bridge]
whether you like it or not
it's still America - it's still America - it's still America

whether you like it or not
it's still America
We love America
we love our

[Chorus]
Soda Pop!
We need to drink it up
We love that Cherry coke
Doctor Pepper Seven Up

We love the sugar
yes we love it a lot
Let's go break the law
and drink a lot of that soda pop`,
    },
    order: 1,
  },

  {
    id: "misc-im-a-fire-truck",
    groupId: "misc",
    title: "I'm a Fire Truck",
    description: "The most elaborate pickup line ever committed to tape.",
    tags: ["comedy", "funk", "playful"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Chorus]
I'm a fire truck
I'm a fire truck
I'm a fire truck
Yeah, a fire truck
You're on fire girl and I'm a fire truck
I gotta hose you down 'cause you're burning up
You're on fire girl and I'm a fire truck
Stop, drop, and roll around, I can't get enough

(Danger, danger)
(I said Danger, danger)
(Danger, danger)
(I said Danger, danger)

[Verse 1]
Danger, danger, I'm in love with a stranger
Believe what you're see-in, don't grab the channel changer
I'm a first responder, quicker than a Honda
Hear me coming by, better make way for this monster
Should've known better than to wear that type of sweater
We're untouchable, adjustable, combustible together
In addition to the flammable attire (I'm a fire truck)
Your panties made of lace make likely spark of fire
I can tell by the friction in the vodka you've been drinking
You're a time bomb ticking and you're ready to blow
Girl on fire is the one that I desire
Wanna take you home tonight like Frodo to the Shire

[Chorus]
You're on fire girl and I'm a fire truck
I gotta hose you down 'cause you're burning up
You're on fire girl and I'm a fire truck
Stop, drop, and roll around, I can't get enough

(I'm a fire truck)
(I'm a fire truck)
(I'm a fire truck)
(Yeah a fire truck)

(What day is it?)

[Verse 2]
It's opposite day (the girl's not hot)
Trucks come running, yeah, we like it a lot
She's on the list, she took the top spot
Watch the temperatures rise all day, she's like a crockpot

She burns non-stop, so please handle with care
In case of fire call me, I'll be there
If I were sunny, well, you'd be my share
You're lightning in a bottle, an emergency flare

Not a little spark, no - (you blow the whole place up)
I drive right there (cause I'm a fire truck)
I don't make this up, I like to mix it up
Shake it up, and pass around the drink I'm fixin ya

I'm missin ya, when you're not around
So what's a fire truck to do when there's no fire in town?
So pretty please, you gotta come back to me
My heart burns for you to the third degree

[Guitar Solo]

[Verse 3]
Okay, okay, so it's not the first time
You're an amorous arsonist, not the worst crime
I mean there's burglary, perjury, malpractice surgery
But how many times you gonna keep on burnin me

I like my girls like my buffalo wings, blazing
Warm and sweet in the center with the flavor-packed glaze in
Touch with your inner animal, you're so vicious
Wicked like a chicken, you're delightfully delicious

[Chorus]
You're on fire girl and I'm a fire truck
I gotta hose you down 'cause you're burning up
You're on fire girl and I'm a fire truck
Stop, drop, and roll around, I can't get enough

(I'm a fire truck)
(I'm a fire truck)
(I'm a fire truck)
(Yeah a fire truck)

[Outro]`,
    },
    order: 2,
  },

  {
    id: "sadam-i-plant-a-tree",
    groupId: "septimus-adams",
    title: "I Plant a Tree",
    description: "Minimal, patient, grateful. Growing in real time.",
    tags: ["folk", "spiritual", "minimal"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Opening]

[Verse 1]
I plant a tree
It grows
I plant a tree
It grows
I plant a tree
It grows
I plant a tree
It grows slow

[Chorus]
I plant a tree
It grows
I plant a tree
It grows
I plant a tree
It grows
I plant a tree
It grows slow

[Verse 2]
I plant a tree
A tree of life
I thank the Lord
(Most every night)
I'm thankful for
This gift of life
So I plant a tree
(A tree of life)

[Chorus]
I plant a tree
It grows
I plant a tree
It grows
I plant a tree
It grows
I plant a tree
It grows (slow)

[Verse]
I plant the tree
It grows slow
I watch it sprout
Right by my toes
And it grows
It grows (slow)

[Chorus]
I plant a tree
It grows
I plant a tree
It grows (slow)
I plant a tree
It grows
I plant a tree
It grows - slow

[Outro]
Slow`,
    },
    order: 3,
  },

  {
    id: "sa-weird",
    groupId: "saint-anthony",
    title: "Weird",
    description: "A permission slip to be strange, delivered at maximum speed.",
    tags: ["hip-hop", "quirky", "comedy"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Intro]
At your party…

[Verse 1]
You wanna hear a weird song? - Well, you're going to
You can try and sing along if you can but it might be a bit too fast for you
Your mind, is the master of everything that you do
And mine, can deny the existence of all, except my mind - is this true?… (…weird!…)

It's hot! - I feel like a sinner sweatin in a pew
I jot down notes for this next chapter, since I like to figure out what's true
And I'm not your next pastor, but I guess you can call me Matthew
Since I pre-sent, this New Testament, I get to show you how to

[Chorus]
View this earth - it's so distant, so blue
Just like her eyes, I'm gonna dive, into that cool ocean hue
Yes, I command the seas - you row a tiny canoe
I compose symphonies - you blow a whiny kazoo

[Verse 2]
This ain't voodoo - it's just this witch doctor's debut
I travel from Babylon with an Amazon - she's strong, its cool
When she attacks, I attack back with wood like bamboo
I'm gonna break through the gate and teach them pandas all kung-fu

It's true! - we're all (Banned from the Zoo!)
Man! - I plan each syllable each songs like sixty haiku
Which face will drop next? It's like a game - "Guess Who"
I'll flip the dip, at your party and make it rain some fondue!…

[Dance Breakdown]
At your party…
Yeah, at your party…

[Bridge]
I have fun (fun). You can try it to
professor Plum wants you to run to the library he's coming for you
candlestick in his hand he demands your bored game back it's overdue
Oh - you say you don't have it? - Well then you have no…

[Instrumental Solo]

[Outro]
Yeah, at your party…
At your party…
(Weird)`,
    },
    order: 4,
  },

  {
    id: "cr-only-photographs",
    groupId: "caravaggios-revenge",
    title: "Only Photographs",
    description: "Vampire logic and city lights, the night as permanent residence.",
    tags: ["dark", "cinematic", "moody"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Intro]
(Oh-oh-oh)
(Oh-oh-oh)
(Oh-oh-oh)
(I only have photographs)

[Verse 1]
I see her purple eyes, for the first time tonight…
And at this twisted minute - I miss her (I miss her)…
And it's not a happy ending…
So don't leave a trail of incriminating pictures

[Pre-Chorus]
And if it were light in here, we would run away
But the black covers her face, so we stay
And if it were light in here, I would run away
But the black covers her face, so we stay, and say

[Chorus]
Save me - (save me), -
…the one in black please set her free
of the city lights, of the sin we try
The world is ending, so won't you come with me?

(Oh-oh-oh)
(Oh-oh-oh)
(Oh-oh-oh)
(I only have photographs)

[Verse 2]
We come alive (alive), at night, so do you, can't you see?
We're all vampires, some just choose not to be
This is the last time, this is the last time
This is the last time - well maybe one more time

[Pre-Chorus]
And you feel good 'cause you're not feeling anything
So put the pain behind you and you in front of me
And you feel good 'cause you're not feeling anything
So put the pain, yeah put the pain behind you

[Chorus]
And Save me.. (save me)
the one in black please set her free
of the city lights, of the sin we try
The world is ending, so won't you come with me?

[Bridge]
I don't have a past
No, I don't have a past
No, I don't have a past
I only, (only) only have, photographs

[Instrumental Solo]

[Outro]
(Oh-oh-oh)
(Oh-oh-oh)
(Oh-oh-oh)
(I only have photographs)`,
    },
    order: 5,
  },

  {
    id: "sa-the-healthiest-dessert",
    groupId: "saint-anthony",
    title: "The Healthiest Dessert",
    description: "Courtship as calorie-free indulgence.",
    tags: ["pop-rap", "playful", "romantic"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Intro]
In
In
In…in…in…

[Verse 1]
Indescribable chemistry
that's how she, described it to me
and it's obvious that I agree
see I can't not appreciate a healthy body

she's so pretty, like icing on the cake
but this is just the first course so we gotta wait
She leans in close, we're face to face
She wants to have dessert back at her place

[Pre-Chorus]
(without haste!) our hearts start to race
these precious seconds we don't waste
and thanks to nature we pick up the pace
and we savor every sweet taste

on the plate, mmmmm… this date was great
this twist of fate, can't wait for the next slice of cake
im loving the lovin why would I fight it
when my body, soul and spirit like it

[Chorus]
Can i get another slice, of your love
it's the heavenly gift, from above
each little kiss, is a drug
I'm overflowing yes I just can't get enough of your love

your love

your love

your love

Dessert

[Verse 2]
if calories are your concern
relax and enjoy - but feel the burn
it's never work when i'm lost in your eyes
it's always sweet… this free exercise

hey, want to hear something scary?
butterflies - I think they're inside of me
I normally, think logically
but lately this lady has made me flip one eighty

so baby let me take you out again
cause every minute i'm with you is the best and then
the next one tops the last one i'm a bless-ed man
there's no denying you're a fine specimen

what's for dessert - you can't decide?
let's take home a plate then split some apple pie
the former for the taste and later some more for fun
since two treats in this case (two treats in this case) …

[Bridge]
are healthier than one

are healthier than one

The healthiest dessert

[Final Chorus]
Can i get another slice, of your love
it's the heavenly gift, from above
each little kiss, is a drug
I'm overflowing yes I just can't get enough of your love

your love

your love

Can i get another slice, of your love
it's the heavenly gift, from above
each little kiss, is a drug
I'm overflowing yes I just can't get enough of your love

[Outro]`,
    },
    order: 6,
  },

  {
    id: "fh-fine-specimen",
    groupId: "first-human",
    title: "Fine Specimen (10,000 BC)",
    description: "Modern man imagines himself in prehistoric peak condition.",
    tags: ["hip-hop", "comedy", "storytelling"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Intro]
I wish it was the year ten thousand B.C.
before the advances in technology
i'm curious how my person would fare
without the advantages of all this miraculous software   (ten thousand B.C.)

[Verse 1]
you're stuck on the ground. (who's in the sky?!)
you stop - and watch - as I - de-fy - gravity…….
I swing so casually…
from a vine, connected to a tree

high up in the air, you can not compare
Every female, in the air just stare
I spot a hot one, with such vibrant skin
I can't control myself (around a fine specimen) woo! -

with a triple back-flip, I land on the ground
I move in quick - feel her heart pound
Hey girl, want to grab a vine and take a ride with me
it's natural, that's how we was designed to be -

bare chested - uh, I mean bear, vested,
it's a very nice vest - i see you invested,
in the best - fur - for your loin, cloth…
i'm not, a, gambler… (but i bet it's coming off!) woo!

which is sweet! - in this sweltering heat
sexy beast! from your ratty hair to your muddy feet.
Bob Barker would say, "the price is right!".
But I just grunt, "i like! i like!"

Cause I'm an animal! - I can't control my instincts
i'm confident - because i know what she thinks
And I'm a strong man, building up my city -
And that's why in ten thousand B.C. -

[Chorus]
I'm the king of the jungle - i don't look like this
my muscles are huge - i don't have a mouse to click
but in this time, I am just a modern man
So please be mine, you're such a fine… specimen

[Verse 2]
I like your style (like your style) - you're my kind of girl
blood stains on your shirt - is this one squirrel (yeah girl)
save it for lay ter, don't waste-yer - breakfast
just leave it dangling from your bone - necklace

(so I persist) - … because it feels right
So tell me lady, what are we doing tonight,
I'll do my best, to impress, and be polite,
but you're what I like - and I would like... (I would like),

to take you out! when the sun hits the ground
The earth is flat (you're whack, if you think it's round!) -
ok great! i'll pick you up at eight, it's a prehistoric date,
We need to eat… and we need… to… mate…

I knew ever since, I saw your homemade Uggs
you would be the one, I was meant to love
I'll serenade you, even though i sing badly
similar sadly to present day anthony (me)

but honestly - what's on your mind
club-bing me on my head, and robbing me blind
of my dig-ni-ty, and drag-ing me
to your cave - to mis-behave - frequently

to int-er-act (sexually) Woo!
…release chemicals in our brain help us feel free (feel free)
you see - we must not feel guilty (guilty)
when we're selected naturally (selected naturally)

You see things go as planned, when you understand,
and for just a moment - i was your man (bam bam) -
So let's run to the river, and rinse off this dirt,
I have to wake when the sun emerges from the earth,

business in the morning (yeah) you know it never stops (yeah)
but right now you're my Betty and we made the bed rock (yeah)
And you can't judge me, or my bare, foot, beauty,
Cause that's the way it is in ten thousand B.C…

I'm the king

[Instrumental Solo]

[Chorus]
I'm the king of the jungle
i don't look like this
my muscles are huge
i don't have a mouse to click

but in this time,
I'm no king, I am just a modern man
So please be mine,
my queen, you know you're such a fine… specimen

[Outro]
I'm the king of the jungle - i don't look like this
my muscles are huge - i don't have a mouse to click
but in this time, I am a modern man
So please be mine, you're such a fine - specimen`,
    },
    order: 7,
  },

  {
    id: "misc-numbers",
    groupId: "misc",
    title: "Numbers",
    description: "Love geometry, the third wheel problem, from the drummer's corner.",
    tags: ["alt-rock", "storytelling", "original"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Intro]
(One, two, three, four!)
(Woo-hoo-hoo!)
(Yeah!)

[Verse 1]
One, two, three is the perfect number
How many times do I have to hear the story?
I need to get some slumber?
Saw it from a mile away not hard to see

[Chorus]
Laura has a boyfriend, Dan falls in love
Boyfriend returns, push comes to shove
Problems arise, break some ties
Mike arrives
Dan can't believe his eyes
Laura loves Mike, -
Mike's the boyfriend,
Dan's a sad puppy in the end

(Yeah!)

[Verse 2]
One, two, three is the perfect number
(You know exactly what I'm talking about)
Its only a matter of time before
The third wheel sucks, bites and just blows… out!

[Verse 3]
One, two, three was the perfect number
How many times do I have to tell the story?
You need to get some slumber
We all want to go back to the way things used to be

[Chorus]
Laura has a boyfriend, Dan falls in love
Boyfriend returns, push comes to shove
Problems arise, break some ties
Mike arrives
Dan can't believe his eyes
Laura loves Mike, -
Mike's the boyfriend,
Dan's a sad puppy in the end

[Bridge]
In the end
In the end
In the end
In the end

[Drop]
Mike's our drum-mer… —
I know that brown-haired girl… —
Dan, well he don't talk no more… —
Well that's the way it goes… —

[Chorus]
Laura has a boyfriend, Dan falls in love
Boyfriend returns, push comes to shove
Problems arise, break some ties
Mike arrives
Dan can't believe his eyes
Laura loves Mike, -
Mike's the boyfriend,
Dan's a sad puppy in the end

[Breakdown]
One, two, three is the perfect number`,
    },
    order: 8,
  },

  // ─── KIDS ─────────────────────────────────────────────────────────────────────

  {
    id: "kids-abby-dabby-do",
    groupId: "kids",
    title: "Abby Dabby Do (Magic On the Move)",
    description: "A superhero theme for a little girl with magic in her pocket.",
    tags: ["kids", "pop", "uplifting"],
    artwork: { src: "/art/abbydabbydo-song-art.jpg" },
    audio: { sunoCoverUrl: "/songs/AbbyDabbyDo -2-4-26.mp3" },
    lyrics: {
      text: `[Intro]
Abby… Abby Dabby… Abby Dabby Do!
(Yeah!)

[Verse 1]
Abby Dabby Do, put on her pink shoes,
Magic in her pocket, unicorns on the news.
Fairies fly around in the gold morning light,
Chip, Chip, Cheerio says, "Adventure in sight!"
Skippin on the sidewalk, and bouncin' in the breeze,
We wave to the bunnies and look up to the trees
And who jumps down, with a superhero grin?
Hey look! It's Alex! - let the fun begin!

[Chorus]
Abby Dabby Do, (you're magic on the move),
Brave strong girl with that dance-floor groove!
You can jump, you can zoom, you can fly to the moon.
Abby Dabby Do—I love you!
Abby Dabby Do, everybody knows,
You got love in your heart and magic from your head to your toes.
When you try, you can do, you can do anything!
Abby Dabby Do—(I love you)

[Verse 2]
Off to the meadow where the bunnies hop,
Cheerio the squirrel does a flip-spin stop.
"Go Fish!" in the river, we love that splash sound,
It's reading time, let's all gather around.
Then Mommy appears, we all shout "Hooray!"
"Abby, you're amazing in every single way."
Here's your hero cape, let's tie it tight—
Super Abby - now you can take flight!

[Chorus]
Abby Dabby Do, (you're magic on the move),
Brave strong girl with that dance-floor groove!
You can jump, you can zoom, you can fly to the moon.
Abby Dabby Do—I love you!
Abby Dabby Do, everybody knows,
You got love in your heart and magic from your head to your toes.
When you try, you can do, you can do anything!
Abby Dabby Do—(I love you)

[Bridge]
I love you
Yes I do

[Drop]
Dad says, My Abigail
What I speak, is, true
There's no one else, like you my girl
I'll always - love - you (I'll always love you)

When storms get loud and the road feels long,
You've got a love with us that's extra strong.
Take my hand—and then let it go…
'Cause you're made to grow and grow and grow!

[Final Chorus]
Abby Dabby Do, (you're magic on the move),
Brave strong girl with a dance-floor groove!
You can jump, you can zoom, you can fly to the moon.
Abby Dabby Do—(I love you)
Abby Dabby Do, pink sky, bright day,
Chip, Chip, shouts, Hip Hip Hooray!
With Alex (yeah), Mommy (yeah), Daddy too (oh yeah)
We love, love, LOVE you—Abby Dabby Do!

Abby… Abby Dabby… Abby Dabby Do!

[Outro]
Abby Dabby Do…
I love you…`,
    },
    order: 1,
  },

  {
    id: "kids-alex-the-three-keys",
    groupId: "kids",
    title: "The Three Keys (Alex's Quest)",
    description: "Treasure maps, leopards, and moon missions. A boy's epic quest.",
    tags: ["kids", "adventure", "uplifting"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Intro]
(Okay Alex… new mission!) (Abby, you ready?) (Parrot, report!) SQUAWK! "Treasure awaits!"

[Verse 1]
He jumps from his bed and his boots hit the floor,
he spots the treasure map it's taped right to the door:
"The treasure is yours, if you have the three keys
They can be found in the Jungle, Deep Seas
Gather the keys, then the treasure is yours—
Be brave, be kind, and steer your force."
Abby runs in like, "I'm coming too!"
Tiny-but-tough and she's breaking through.
Outside—JUNGLE! Vines everywhere,
You climb that tree like you don't even care.
A snow leopard watches, cool and sly:
"Eyes on the branch, not the drop below—try."
The parrot yells, "SQUAWK! Don't rush, don't slip!"
You take one breath—then you make the grip.

[Chorus]
When it gets tricky—YOU don't quit,
You level up fast, you commit, commit!
You breathe in slow, you choose your plan,
That's how a hero becomes a man.
Step by step, you're brave and true—
You conquer the challenge the kind way too.
Treasure's calling, but here's the clue:
The power is already inside of you!

[Verse 2]
Next on the map: DEEP SEA ZONE—
"Find the pearl where the currents moan."
You dive down deep with a fearless grin,
Sea turtles swirl like, "Follow me in!"
A giant squid tries to block your path,
Waving its arms like a splashy math.
But you don't panic, you don't get mad—
You solve the puzzle like a genius lad:
You build a LEGO-thought bridge in your head,
Count the beats, keep calm instead.
Then BOOM—space portal! Stars go WOW,
You're floating by planets like "Okay… now."

[Chorus]
When it gets tricky—YOU don't quit,
You level up fast, you commit, commit!
You breathe in slow, you choose your plan,
That's how a hero becomes a man.
Step by step, you're brave and true—
You conquer the challenge the kind way too.
Treasure's calling, but here's the clue:
The power is already inside of you!

[Bridge]
Last on the map: THE MOON OF DOUBT,
Where worries whisper and try to shout.
Daddy's voice comes steady and warm:
"I'm always here through any storm.
I love you forever—no end, no break.
You're stronger than you know, for goodness' sake."
So you stand up tall in your moon-boot stance,
Tell the worries, "Nope," and you take your chance.
The parrot goes, "SQUAWK! That's the way!"
And Abby cheers, "You saved the day!"

[Final Chorus]
When it gets tricky—YOU don't quit,
You level up fast, you commit, commit!
You breathe in slow, you choose your plan,
That's how a hero becomes a man.
Step by step, you're brave and true—
You conquer the challenge the kind way too.
Now open the chest—what do you see?
A heart that's strong… and that's the key!

[Outro]
Cheese reward, victory dance,
Alex + Abby—best team in the land!
SQUAWK! "Captain Alex, mission complete!"
(And tomorrow… new adventure beat!)`,
    },
    order: 2,
  },

  {
    id: "kids-captain-alex-backyard-galaxy",
    groupId: "kids",
    title: "Captain Alex and the Backyard Galaxy",
    description: "A cardboard rocket to the moon and back before dinner.",
    tags: ["kids", "pop", "sci-fi"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Intro]
Backyard boots
Helmet on tight
Sittin' in my rocket
Counting down right (hey!)

[Chorus]
Captain Alex in the backyard galaxy
Lift off, fly fast, past the world you see
"5, 4, 3" everybody shout with me
Captain Alex in the backyard galaxy

[Verse 1]
Press that button
Rocket goes zoom
Earth gets tiny
On our way to the moon
Pass the clouds
Past our home town
Wave at the dog
Way, way down

Land on the moon
Jump out in a snap
Bunny in shades
Starts to rap
Parrot in sneakers
Spins around
T rex jumps in
It shakes the ground

[Chorus]
Captain Alex in the backyard galaxy
Moon dust jumping like a trampoline
"5, 4, 3" everybody shout with me
Captain Alex in the backyard galaxy

[Verse 2]
Monkey with a map
Says "this way, bro"
Cheese moon pizza
Jump super slow
Turtle's a DJ
Shell on spin
Stars do the wave
When the bass jumps in (oh yeah)

Alex moonwalk
Slide, slide, freeze
High-five comets
Become the breeze
Parrot yells loud
Alex you're the man
The whole moon crowd
Shouts, "let's go again"

[Chorus]
Captain Alex in the backyard galaxy
Got moves so smooth he defies all gravity
"5, 4, 3" everybody ride with me
Captain Alex in the backyard galaxy

[Bridge]
I'm Alex, sky pilot, ready to fly
Helmet slipping low but I'm aiming high
Parrot shouting - "Higher! Don't go slow!"
I shout - "Fast is all I know"

[Chorus]
Captain Alex in the backyard galaxy
Rocket ride home past the maple tree
"5, 4, 3" everybody shout with me
Captain Alex in the backyard galaxy

[Outro]
Backyard boots
Back on the grass
Moon dust glitter
On rocket glass
Looks at the sky
"Same time, soon?"
There's only one Alex
Captain of the moon (hey!)`,
    },
    order: 3,
  },

  {
    id: "kids-the-carrozzo-song",
    groupId: "kids",
    title: "The Carrozzo Song",
    description: "A family roll call, names are the first kind of love.",
    tags: ["kids", "family", "personal"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Intro]
Carrozzo, Carrozzo
It's Abby Carrozzo
Abigail Cathryn Carrozzo

Alex
Alexander Anthony Carrozzo

[Verse]
Mommy
Michelle Francine Troise Carrozzo

Daddy
Anthony Lawrence Carrozzo

[Chorus]

[Verse]
Gam Gam
Grandma Diane Adamo Carrozzo

Pop Pop
Grandpa Tony John Carrozzo

[Chorus]

[Verse]
Kailyn
Kailyn Joy Carrozzo

David
David Joseph Carrozzo

Jacob
Jacob Daniel Carrozzo

Aunt Kimmy Carrozzo
Kimberly Ann Leahy Carrozzo

Uncle Robby Carrozzo
Robert Joseph Carrozzo`,
    },
    order: 4,
  },

  {
    id: "kids-alex-bo-balex",
    groupId: "kids",
    title: "Alex Bo Balex",
    description: "Coming soon. Alex goes on a grand, silly, animated adventure.",
    tags: ["kids", "adventure", "placeholder"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    order: 5,
  },

  {
    id: "kids-alex-anderones",
    groupId: "kids",
    title: "Alex Anderones",
    description: "Coming soon.",
    tags: ["kids", "placeholder"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    order: 6,
  },

  // ─── MISC ─────────────────────────────────────────────────────────────────────

  {
    id: "misc-uncle-carmine-because-of-you",
    groupId: "misc",
    title: "Because of You",
    description: "A love song written for Linda, through Carmine's voice.",
    tags: ["love-song", "classic-pop", "family"],
    artwork: { src: PH_IMG },
    audio: { sunoCoverUrl: PH_MP3 },
    lyrics: {
      text: `[Verse 1]
I used to lie asleep at night
Wondering if I'd feel love again
As my mind finally drifts away
I wake up hoping when

[Verse 2]
As time went by
A friend said to me
I know the sweetest girl for you
And I wondered could it be
At last I finally met you
I was so nervous and shy
But when you looked at me
I felt something deep inside

[Chorus]
Never thought I'd fall in love again
Linda now I know it's because of you
Been so lonely since way back when
But when I think of you my heart's no longer blue
Linda (Linda)
It's because of you
Linda (Linda)
It's because of you

[Verse 3]
Every time I see you
I'd get that feeling more and more
But I'll take it day by day
And hope I know for sure
Now time's gone by
And I know that this is true
I know I'm in love with you girl
And Linda it's because of you

[Chorus]
Never thought I'd fall in love again
Linda now I know it's because of you
Been so lonely since way back when
But when I think of you my heart's no longer blue
Linda (Linda)
It's because of you
Linda (Linda)
It's because of you`,
    },
    order: 1,
  },
];
