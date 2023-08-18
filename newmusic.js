
    let fullpath = "https://kpunit333.github.io/music/audio/";
    // let path = "audio/";
    let path = "https://kpunit333.github.io/music/audio/";
    let stylefullpath = "https://kpunit333.github.io/music/css/";

    let stylepath = "css/";
    let playicon = document.getElementById('playicon');
    let playcheck = music.paused; // 0 for || and play, 1 for pause
    let progress = document.getElementById("pbar");
    let songimg = document.getElementById('songimg');
    let songname = document.getElementById('songname');

    let cssdarklist = ["musicpinkdark.css","musicgreendark.css","musicyellowdark.css","musicreddark.css","musicbluedark.css"]

    let patriotic = [
        "maa_tujhe_salaam", "ae_watan_watan", "sandeshe_aate_hai", "azadi_ke_liye", "aye_mere_watan_ke_logo", "saare_jahan_se_acha",
        "ab_tumhare_hawale_watan_sathiyo", "mera_mulk_mera_desh", "lehra_do", "jai_ho", "phir_bhi_dil_hai_hindustani",
        "kadam_kadam_badhaye_jaa", "rang_de_basanti", "main_lad_jaana", "desh_rangila", "chak_de_india"
    ];

    let sad = [
        "ae_dil_hai_mushkil", "laree_chooti", "aabaad_barbaad", "abhi_mujhme_kahin", "shayad", 
        "jab_koi_baat", "behti_hawa_sa_tha_woh", "give_me_some_sunshine", "jaane_tujhe_denge_nahi", "bhagwan_hai_kaha_re_tu",
        "tujhe_sab_hai_pata", "dhaaga"
    ];


    let party = [
        "sweetheart", "pallo_latke", "kamariya", "makhna", "nachne_de_saare",
        "udi_udi_jaaye"
    ];

    let retro = [
        "mera_geet_amar_kardo", "tujhse_naraz_nahi_zindagi", "yeh_raate_yeh_mausam", "jaane_woh_kaise", "lag_ja_gale", 
        "jeena_isika_naam", "hai_apna_dil_to_awara", "tareef_karoon_kya_uski"
    ];

    let romantic = [
        "apna_bana_le", "main_phir_bhi_tumko_chahunga", "tum_hi_aana", "hamari_adhuri_kahani", "humnava",
        "pal"
    ];


    let devotional = [
        "namo_namo_ji_shankara", "shiv_panchak_strotam", "aigiri_nandini", "shri_ganeshay_dhimahi",
        "shindoor_lal_chadhayo", "ganesh_aarti", "har_har_gange", "shri_krishna_govinda", "achyutam_keshavam"
    ];

    let classical = ["gmp","aps","bc","mrdl","bnhh"];
    let songs = []

    songs = songs.concat(patriotic, sad, party, retro, romantic, devotional, classical);
    let currentlist = [];
    
    currentlist = songs;
    // console.log("Started");

    let now = music.src.split(fullpath)[1];
    let currentSongpath = now;
    now = now.split(".mp3")[0];

    let prevsong = now;
    let isnext = false;
    let nextsong;

    function updateNow()
    {
        prevsong = now;
        
        now = music.src.split(fullpath)[1];
        now = now.split(".mp3")[0];
    }
    
    function nowplaying()
    {
        let prev_song = document.getElementById(prevsong);
        let now_song = document.getElementById(now);
        
        prev_song.classList.remove('nowplaying');  
        now_song.classList.add('nowplaying');

        // console.log(`nowplaying() => Highlight changed from ${prevsong} to ${now}`);
    }
    
    function playsong(x)
    {
        music.src = path + x + ".mp3";
        // console.log(music.src); 
        
        prevsong = now;
        now = x;

        // updateNow();
        // console.log(now);
        music.play();

        // console.log("playsong() => Now playing : " + now);
        nowplaying();

    }  
    
    function addtonext(x)
    {
        nextsong = x;
        isnext = true;
        // console.log(`addtonext() => ${nextsong} added to next`);
    }
    
    
    function changeSongName(x)
    {
        let name = document.getElementById(x);
        songname.innerText = name.getElementsByTagName('span')[0].innerText;          
        // console.log("changeSongName() => Song name changed to : " + songname.innerHTML);
    }

    
    
    let name = document.getElementById(now);
    
    let tabs = document.querySelectorAll(".songs");

    function showgenre(reqTabs)
    {
        $('.active-genre').removeClass('active-genre');
        $(`#${reqTabs}`).addClass('active-genre');

        tabs.forEach(element => {
            element.classList.remove('active');   
        });

        let rtabs = document.querySelectorAll(`.${reqTabs}`);
        rtabs.forEach(element =>{
            element.classList.add('active');
        });

        if(reqTabs == 'songs')
        {
            currentlist = songs;
        }
        else if(reqTabs == 'patriotic')
        {
            currentlist = patriotic;
        }
        else if(reqTabs == 'sad')
        {
            currentlist = sad;
        }
        else if(reqTabs == 'party')
        {
            currentlist = party;
        }
        else if(reqTabs == 'retro')
        {
            currentlist = retro;
        }
        else if(reqTabs == 'romantic')
        {
            currentlist = romantic;
        }
        else if(reqTabs == 'devotional')
        {
            currentlist = devotional;
        }
        else if(reqTabs == 'classical')
        {
            currentlist = classical;
        }


        // console.log("showgenre() => Songlist changed to : " + reqTabs);
        // console.log(currentlist[0]);
        
        music.src = path + currentlist[0] + ".mp3";
        music.play();
        
        // now = music.src.substr(70,10);
        // now = now.split(".mp3")[0];
        // console.log(now);
        
        updateNow();
        changeSongName(now);
        nowplaying();
    }


    let shufflemode = 1; 

    // 1 = loop song.
    // 2 = loop playlist.
    // 3 = random.

    let playmode = document.getElementById('playmode');

    function shuffle()
    {
        music.loop = false;

        if(shufflemode==1)
        {
            playmode.classList.remove('fa-rotate-right');
            playmode.classList.add('fa-repeat');
            shufflemode +=1;
        }
        else if(shufflemode == 2)
        {
            playmode.classList.remove('fa-repeat');
            playmode.classList.add('fa-shuffle');
            shufflemode += 1;
        }
        else
        {
            playmode.classList.remove('fa-shuffle');
            playmode.classList.add('fa-rotate-right');
            shufflemode = 1;
        }

        // console.log(playmode);
        // console.log(`shuffle() => Shufflemode = ${shufflemode} ::: 1 = song, 2 = playlist, 3 = random`);
    }

    function shufflesong()
    {
        // console.log("Hey there");
        let i = Math.floor(Math.random()*currentlist.length);

        playsong(currentlist[i]);

        updateNow();
        
        
        changeSongName(now);
        nowplaying();

        // console.log("shufflesong() => Song shuffled.");
    }


    function prev()
    {
        let i = currentlist.indexOf(now);
        i = (i-1);

        if(i<0)
        {
            i = currentlist.length - 1;
        }
        
        music.src = path + currentlist[i] + ".mp3";
        music.play();

        // console.log("prev() => Previous song played.");
        // now = music.src.substr(70,10);
        // now = now.split(".mp3")[0];

        updateNow();
        
        nowplaying();

        changeSongName(now);
    }

    function playchange(playcheck)
    {
        if(playcheck)
        {
            playicon.classList.remove("fa-play");
            playicon.classList.add("fa-pause");

            // console.log("playchange() => || button applied.");
            
        }
        else
        {
            playicon.classList.remove("fa-pause");
            playicon.classList.add("fa-play");
            
            // console.log("playchange() => > button applied.");
        }
    }     

    function playpause()
    {

        if(music.paused)
        {
            playchange(1);
            // console.log(music.src);
            music.play();
            // console.log("playpause() => playing");
        }
        else{            
            playchange(0);
            music.pause();
            // console.log("playpause() => paused");
        }
        
    }

    function next()
    {
        var i = currentlist.indexOf(now);
        i = (i+1)%currentlist.length;

        music.src = path + currentlist[i] + ".mp3";
        music.play();

        // console.log("next() => Next song played.");
        // now = music.src.substr(70,10);
        // now = now.split(".mp3")[0];

        updateNow();
        nowplaying();

        changeSongName(now);
    }

    let mute = document.getElementById('mute');

    function mutesong()
    {

        if(music.muted)
        {
            mute.classList.remove("fa-volume-xmark");
            mute.classList.add("fa-volume-high");              

            // music.volume = vbar.value/100;
            music.muted = false;

            // vbar.value = 10;
            vol.value = vbar.value;
            // music.volume = 0.1;

            // console.log("mute() => Audio unmuted");
        }
        else
        {
            mute.classList.remove("fa-volume-high");
            mute.classList.add("fa-volume-xmark");             
            
            music.muted = true;            
            // console.log("mute() => Audio muted");

        }
        
    }

    function changetheme(x)
    {
        let ss = document.getElementById('ss');
        ss.href = stylefullpath + x;

        // console.log("changetheme() => Theme changed to " + x);
    }

    function theme()
    {
        let ss = document.getElementById('ss');
        // let themebtn = document.getElementById('themebtn');
        // let ref = ss.href.substr(64);

        let ref = ss.href.split(stylefullpath)[1];

        let i = cssdarklist.indexOf(ref);
        i = (i+1)%cssdarklist.length;

        changetheme(cssdarklist[i]);

        // console.log("theme() => Theme changed to " + ss.href);

    }


    function barchange(target)
    {
        // let target = document.getElementById(x);
        let min = target.min;
        let max = target.max;
        let val = target.value;

        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
        // console.log(`barchange() => ${target} updated.` );
    } 





    
    // Event listeners

    music.addEventListener('playing',()=>{
        songimg.src = "/img/music-playing.gif"
        changeSongName(now);

        playchange(1);
        // console.log("eventlistener-playing => Audio playing");
    })

    music.addEventListener('pause',()=>{
        songimg.src = "/img/music-paused.jpg";

        playchange(0);
        // console.log("eventlistener-paused => Audio paused.");
    })

    music.addEventListener('timeupdate',()=>{
        progress.value = (music.currentTime/ music.duration)*100;
        barchange(progress);
        // console.log(progress.value);
    })

    music.addEventListener('ended',()=>{

        if(isnext)
        {
            isnext = false;
            playsong(nextsong);
        }
        else if(shufflemode == 1)
        {
            music.loop = true;            
        }
        else if(shufflemode == 2)
        {
            next();
        }
        else if(shufflemode == 3)
        {
            shufflesong();            ;
        }
        else
        {
            next();
        }

        // console.log("eventlistener-ended => Next song played");    
    })

   
    // let vbar = document.getElementById('vbar');

    vbar.addEventListener('change',()=>{
        music.volume = vbar.value/100;
        barchange(vbar);
        // vol.value = vbar.value;

        if(music.volume == 0)
        {
            mute.classList.remove("fa-volume-high");
            mute.classList.add("fa-volume-xmark");             
            
            music.muted = true;            
        }
        else
        {
            mute.classList.remove("fa-volume-xmark");
            mute.classList.add("fa-volume-high");              

            // music.volume = vbar.value/100;
            music.muted = false;
        }
        // console.log("eventlistener-volume bar => Audio volume : " + music.volume);
    })
       
    progress.addEventListener('change', ()=>{
        music.currentTime = ((progress.value * music.duration)/100 );

        barchange(progress);
        // console.log(music.currentTime);
    })

    let partymode = false;
    let discoTimer ;

    function toggleDisco(x)
    {
        if(!x)
        {
            discoTimer = setInterval(()=>{theme();}, 1000);
        }
        else
        {
            clearInterval(discoTimer);
        }
        partymode = !partymode;
    }

changetheme('musicpinkdark.css');
barchange(progress);
barchange(music);
barchange(vbar);

$(document).ready(()=>{
    
    $('.songs').click((e)=>{playsong(e.target.id)});

    $(document).keypress((e)=>{
        if(e.originalEvent.key == 'P' || e.originalEvent.key == 'p'){toggleDisco(partymode);};
        if(e.originalEvent.key == 'T' || e.originalEvent.key == 't'){theme()};
    });

    $('.genre').click((e)=>{showgenre(e.target.id)});
})
