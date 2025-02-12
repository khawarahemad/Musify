import bell_icon from './bell.png'
import home_icon from './home.png'
import like_icon from './like.png'
import loop_icon from './loop.png'
import mic_icon from './mic.png'
import next_icon from './next.png'
import play_icon from './play.png'
import pause_icon from './pause.png'
import plays_icon from './plays.png'
import prev_icon from './prev.png'
import search_icon from './search.png'
import shuffle_icon from './shuffle.png'
import speaker_icon from './speaker.png'
import stack_icon from './stack.png'
import zoom_icon from './zoom.png'
import plus_icon from './plus.png'
import arrow_icon from './arrow.png'
import mini_player_icon from './mini-player.png'
import queue_icon from './queue.png'
import volume_icon from './volume.png'
import arrow_right from './right_arrow.png'
import arrow_left from './left_arrow.png'
import Musify from './Musify.png'
import clock_icon from './clock_icon.png'
import img1 from './img1.jpg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import img5 from './img5.jpg'
import img6 from './img6.jpg'
import img7 from './img7.jpg'
import img8 from './img8.jpg'
import img9 from './img9.jpg'
import img10 from './img10.jpg'
import img11 from './img11.jpg'
import img12 from './img12.jpg'
import img13 from './img13.jpg'
import img14 from './img14.jpg'
import img15 from './img15.jpg'
import img16 from './img16.jpg'
import song1 from  './song1.mp3'
import song2 from  './song2.mp3'
import song3 from  './song3.mp3'
import song4 from  './song4.mp3'
import song5 from  './song5.mp3'
import song6 from  './song6.mp3'
import { useState, useEffect } from 'react';

export const assets = {
    bell_icon,
    home_icon,
    like_icon,
    loop_icon,
    mic_icon,
    next_icon,
    play_icon,
    plays_icon,
    prev_icon,
    search_icon,
    shuffle_icon,
    speaker_icon,
    stack_icon,
    zoom_icon,
    plus_icon,
    arrow_icon,
    mini_player_icon,
    volume_icon,
    queue_icon,
    pause_icon,
    arrow_left,
    arrow_right,
    Musify,
    clock_icon
}

export const albumsData = [
    {   
        id:0,
        name: "Honey 3.0",
        image: "https://i.scdn.co/image/ab67616d0000b273c279c63a20be981bddcbec61",
        desc:"Your weekly update of the most played tracks",
        bgColor:"#2a4365"
    },
    {   
        id:1,
        name: "DEADLY TIMES",
        image: "https://i.scdn.co/image/ab67616d0000b27368efbf2e90c0bf0e6c718734",
        desc:"Your weekly update of the most played tracks",
        bgColor:"#22543d"
    },
    {   
        id:2,
        name: "Lover",
        image: "https://i.scdn.co/image/ab67616d0000b27343e2febdfe833cc820a879e2",
        desc:"Your weekly update of the most played tracks",
        bgColor:"#742a2a"
    },
    {   
        id:3,
        name: "Glory",
        image: "https://i.scdn.co/image/ab67616d0000b273aad3f4b601ae8763b3fc4e88",
        desc:"Your weekly update of the most played tracks",
        bgColor:"#44337a"
    },
    {   
        id:4,
        name: "Timeless Love,",
        image: "https://i.scdn.co/image/ab67616d0000b27347474eb7eb349555851c3e6f",
        desc:"Your weekly update of the most played tracks",
        bgColor:"#234e52"
    },
    {   
        id:5,
        name: "YRF Top 10",
        image: "https://i.scdn.co/image/ab67616d0000b273f7991610fad937fd9f29f55d",
        desc:"Your weekly update of the most played tracks",
        bgColor:"#744210"
    },
    {   
        id:6,
        name: "Lost;Found",
        image: "https://i.scdn.co/image/ab67616d0000b2730de04fd2c7c3bdc0a1d765f5",
        desc:"Your weekly update of the most played tracks",
        bgColor:"#744210"
    }
]

export const songsData = [
    {
        id:0,
        name: "Kitna Chahe",
        image: img1,
        file:song1,
        desc:"Aniruth Ravichander,Thalapathy Vijay",
        duration:"5:22"
    },
    {
        id:1,
        name: "VIP Title Song",
        image: img2,
        file:song2,
        desc:"Anirudh Ravichander",
        duration:"2:43"
    },
    {
        id:2,
        name: "Dharala Prabhu Title Track",
        image: img3,
        file:song3,
        desc:"Anirudh Ravichander",
        duration:"3:42"
    },
    {
        id:3,
        name: "Hukum-Thalaivar Alappara",
        image: img4,
        file:song4,
        desc:"Anirudh Ravichander,Super Subu",
        duration:"3:26"
    },
    {
        id:4,
        name: "Illuminati",
        image: img5,
        file:song5,
        desc:"Sushin Shyam, Dabzee, Vinayak Sasikumar",
        duration:"2:28"
    },
    {
        id:5,
        name: "Idhazin Oram-The Innocence of Love",
        image: img6,
        file:song6,
        desc:"Anirudh Ravichander,Ajesh",
        duration:"3:24"
    },
    {
        id:6,
        name: "Vaathi Coming",
        image: img7,
        file:song1,
        desc:"Aniruth Ravichander,Thalapathy Vijay",
        duration:"3:48"
    },
    {
        id:7,
        name: "What a Karavaad",
        image: img2,
        file:song2,
        desc:"Anirudh Ravichander,Dhanush",
        duration:"4:27"
    }
]
export const TopHit =[
    {
        "id": 0,
        "title": "Sajni (From \"Laapataa Ladies\")",
        "album": "Sajni (From \"Laapataa Ladies\")",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273d5f4378b1ffc9119fdc7306d",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Sajni_From_Laapataa_Ladies.mp3"
    },
    {
        "id": 1,
        "title": "Ishq",
        "album": "Lost;Found",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2730de04fd2c7c3bdc0a1d765f5",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Ishq.mp3"
    },
    {
        "id": 3,
        "title": "Apna Bana Le",
        "album": "Bhediya (Original Motion Picture Soundtrack)",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273b85b4e8fb6ba961aedfde386",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Apna_Bana_Le.mp3"
    },
    {
        "id": 4,
        "title": "O Maahi",
        "album": "Dunki",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273ab1e3b16de1c7ec009880e97",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/O_Maahi.mp3"
    },
    {
        "id": 5,
        "title": "Heeriye (feat. Arijit Singh)",
        "album": "Heeriye (feat. Arijit Singh)",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2734a60872ae145776164540a7f",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Heeriye_feat._Arijit_Singh.mp3"
    },
    {
        "id": 6,
        "title": "Tum Se Hi",
        "album": "Jab We Met",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b27352fe6875028c892308ffc2f7",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Tum_Se_Hi.mp3"
    },
    {
        "id": 7,
        "title": "Khoobsurat (From \"Stree 2\")",
        "album": "Khoobsurat (From \"Stree 2\")",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273dd5eaafc5f4075139d7f34b4",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Khoobsurat_From_Stree_2.mp3"
    },
]
export const songsData2 = [
    {
        "id": 1,
        "title": "Agar Tum Saath Ho (From \"Tamasha\")",
        "album": "A.R. Rahman All Time Favourites",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2731bea41b64855e2efd68d5fcb",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Agar_Tum_Saath_Ho_From_Tamasha.mp3"
    },
    {
        "id": 2,
        "title": "Tere Bina",
        "album": "Guru (Original Motion Picture Soundtrack)",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2730504fdf58bae8cd52dd13047",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Tere_Bina.mp3"
    },
    {
        "id": 3,
        "title": "Kabhi Kabhi Aditi (From \"Jaane Tu... Ya Jaane Na\")",
        "album": "A.R. Rahman All Time Favourites",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2731bea41b64855e2efd68d5fcb",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Kabhi_Kabhi_Aditi_From_Jaane_Tu..._Ya_Jaane_Na.mp3"
    },
    {
        "id": 4,
        "title": "Kun Faya Kun",
        "album": "Rockstar",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b27354e544672baa16145d67612b",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Kun_Faya_Kun.mp3"
    },
    {
        "id": 5,
        "title": "Rait Zara Si (From \"Atrangi Re\")",
        "album": "Rait Zara Si (From \"Atrangi Re\")",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273004f83c1be7d66c4677b32a8",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Rait_Zara_Si_From_Atrangi_Re.mp3"
    },
    {
        "id": 6,
        "title": "Yennai Izhukkuthadi (From \"Kadhalikka Neramillai\")",
        "album": "Yennai Izhukkuthadi (From \"Kadhalikka Neramillai\")",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273a3288b749195fb39e6e5ac2b",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Yennai_Izhukkuthadi_From_Kadhalikka_Neramillai.mp3"
    },
    {
        "id": 7,
        "title": "Tum Tak",
        "album": "Raanjhanaa (Original Motion Picture Soundtrack)",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273a00249b8bf77312ec156dd4b",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Tum_Tak.mp3"
    },
    {
        "id": 8,
        "title": "Maahi Ve",
        "album": "Highway",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2731f4e9ecaf6913e207810093f",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Maahi_Ve.mp3"
    },
    {
        "id": 9,
        "title": "Water Packet (From \"Raayan\")",
        "album": "Water Packet (From \"Raayan\")",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2734c8ed16792cb66f09aa75b8c",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Water_Packet_From_Raayan.mp3"
    },
    {
        "id": 10,
        "title": "Jashn-E-Bahaaraa",
        "album": "Jodhaa Akbar (Original Motion Picture Soundtrack)",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b27346131d4d7919c5cacd15c7d3",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Jashn-E-Bahaaraa.mp3"
    }
]
export const Arijit_Singh = [
    {
        "id": 1,
        "title": "Sajni (From \"Laapataa Ladies\")",
        "album": "Sajni (From \"Laapataa Ladies\")",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273d5f4378b1ffc9119fdc7306d",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Sajni_From_Laapataa_Ladies.mp3"
    },
    {
        "id": 2,
        "title": "Apna Bana Le",
        "album": "Bhediya (Original Motion Picture Soundtrack)",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273b85b4e8fb6ba961aedfde386",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Apna_Bana_Le.mp3"
    },
    {
        "id": 3,
        "title": "Tujhe Kitna Chahne Lage (From \"Kabir Singh\")",
        "album": "Tujhe Kitna Chahne Lage (From \"Kabir Singh\")",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273ba03ff79dad25f7c3542382f",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Tujhe_Kitna_Chahne_Lage_From_Kabir_Singh.mp3"
    },
    {
        "id": 4,
        "title": "Satranga (From \"ANIMAL\")",
        "album": "Satranga (From \"ANIMAL\")",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273021d7017f73387b008eab271",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Satranga_From_ANIMAL.mp3"
    },
    {
        "id": 5,
        "title": "Humdard (From \"Ek Villain\")",
        "album": "Ultimate Love Songs - Arijit Singh",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2731aa5adad8593923dcdf1a7d0",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Humdard_From_Ek_Villain.mp3"
    },
    {
        "id": 6,
        "title": "O Maahi",
        "album": "Dunki",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273ab1e3b16de1c7ec009880e97",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/O_Maahi.mp3"
    },
    {
        "id": 7,
        "title": "Tainu Khabar Nahi - From \"Munjya\"",
        "album": "Tainu Khabar Nahi (From \"Munjya\")",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b27367a876fee5cd00ed0f395a9e",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Tainu_Khabar_Nahi_-_From_Munjya.mp3"
    },
    {
        "id": 8,
        "title": "Heeriye (feat. Arijit Singh)",
        "album": "Heeriye (feat. Arijit Singh)",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2734a60872ae145776164540a7f",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Heeriye_feat._Arijit_Singh.mp3"
    },
    {
        "id": 9,
        "title": "Agar Tum Saath Ho (From \"Tamasha\")",
        "album": "Love Forever With Arijit Singh",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2737569cbe3695608074d9fd389",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Agar_Tum_Saath_Ho_From_Tamasha.mp3"
    },
    {
        "id": 10,
        "title": "Tum Hi Ho",
        "album": "Aashiqui 2",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2736404721c1943d5069f0805f3",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Tum_Hi_Ho.mp3"
    }
]
export const sidheMot = [
    {
        "id": 1,
        "title": "Hola Amigo",
        "album": "FAR FROM OVER",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b27383e257b20f473f0063cdd351",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Hola_Amigo.mp3"
    },
    {
        "id": 2,
        "title": "Khatta Flow",
        "album": "Lunch Break",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273b7b544e5241b69574edc814e",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Khatta_Flow.mp3"
    },
    {
        "id": 3,
        "title": "KODAK",
        "album": "MONOPOLY MOVES",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2730be866d7779f5058a81e48c4",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/KODAK.mp3"
    },
    {
        "id": 4,
        "title": "Raat Ki Rani",
        "album": "SHAKTI",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2739750614dd177fa9137726f07",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Raat_Ki_Rani.mp3"
    },
    {
        "id": 5,
        "title": "RED",
        "album": "Kshama",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b2733f18f7a781cad23e074c82b5",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/RED.mp3"
    },
    {
        "id": 6,
        "title": "Nanchaku",
        "album": "\u0928",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273d65e2670b7176415b9d88a59",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Nanchaku.mp3"
    },
    {
        "id": 7,
        "title": "11K",
        "album": "Lunch Break",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273b7b544e5241b69574edc814e",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/11K.mp3"
    },
    {
        "id": 8,
        "title": "Luka Chippi",
        "album": "Lunch Break",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273b7b544e5241b69574edc814e",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Luka_Chippi.mp3"
    },
    {
        "id": 9,
        "title": "Namastute",
        "album": "\u0928",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273d65e2670b7176415b9d88a59",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/Namastute.mp3"
    },
    {
        "id": 10,
        "title": "SHUTDOWN",
        "album": "SHUTDOWN",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273490b544e5b5174dee355b30a",
        "file_path": "https://pub-b03428fdf2a349f384cb1a14c6700866.r2.dev/songs/SHUTDOWN.mp3"
    }
]
export const phoNk =[
    {
        "id": 1,
        "title": "POP POP",
        "album": "DEADLY TIMES",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b27368efbf2e90c0bf0e6c718734",
        "file_path": "songs/Phonk_Music_2024_\u203b_Best_Aggressive_Drift_Phonk_TikTok_Phonk_\u203b_\u0424\u043e\u043d\u043a_2024.mp3"
    },
    {
        "id": 2,
        "title": "SHOOT YOU",
        "album": "DEADLY TIMES",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b27368efbf2e90c0bf0e6c718734",
        "file_path": "songs/msht_-_One_Shot_PHONK.mp3"
    },
    {
        "id": 3,
        "title": "CONSEQUENCES",
        "album": "DEADLY TIMES",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b27368efbf2e90c0bf0e6c718734",
        "file_path": "songs/What_if_there_was_a_song_the_goes_like..._\ud83e\udd27_shorts_phonk_musicproducer.mp3"
    },
    {
        "id": 4,
        "title": "LOWKEY",
        "album": "DEADLY TIMES",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b27368efbf2e90c0bf0e6c718734",
        "file_path": "songs/YCK_-_Lowkey_II.mp3"
    },
    {
        "id": 5,
        "title": "RUN UP",
        "album": "DEADLY TIMES",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b27368efbf2e90c0bf0e6c718734",
        "file_path": "songs/Top_5_phonk_songs_of_the_month.mp3"
    },
    {
        "id": 6,
        "title": "RIDIN SPINNERS",
        "album": "DEADLY TIMES",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b27368efbf2e90c0bf0e6c718734",
        "file_path": "songs/Phonk_Killer_-_RIDING_SPINNERS_SPED_UP.mp3"
    },
    {
        "id": 7,
        "title": "MEGALOMANIA",
        "album": "VOICE OF THE SOUL",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273f18e8277277e3255cae990b5",
        "file_path": "songs/MEGALOMANIA_\u2039PHONK\u203a.mp3"
    },
    {
        "id": 8,
        "title": "DEATH DAGGER",
        "album": "VOICE OF THE SOUL",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273f18e8277277e3255cae990b5",
        "file_path": "songs/DEATH_DAGGER.mp3"
    },
    {
        "id": 9,
        "title": "ALTERNATIVE REALITY",
        "album": "VOICE OF THE SOUL",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273f18e8277277e3255cae990b5",
        "file_path": "songs/ALTERNATIVE_REALITY.mp3"
    },
    {
        "id": 10,
        "title": "REVENGE",
        "album": "VOICE OF THE SOUL",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273f18e8277277e3255cae990b5",
        "file_path": "songs/REVENGE.mp3"
    },
    {
        "id": 11,
        "title": "MOVEMENT",
        "album": "VOICE OF THE SOUL",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273f18e8277277e3255cae990b5",
        "file_path": "songs/Pham_-_Movements_ft._Yung_Fusion_[EP_Version].mp3"
    },
    {
        "id": 12,
        "title": "BOOM",
        "album": "VOICE OF THE SOUL",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273f18e8277277e3255cae990b5",
        "file_path": "songs/Top_7_Viral_Phonk_Songs_of_2024..mp3"
    },
    {
        "id": 13,
        "title": "ELECTRIC SHOCK",
        "album": "VOICE OF THE SOUL",
        "album_cover": "https://i.scdn.co/image/ab67616d0000b273f18e8277277e3255cae990b5",
        "file_path": "songs/Top_7_Viral_Phonk_Songs_of_2024..mp3"
    }
]