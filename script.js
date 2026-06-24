*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Inter,Segoe UI,sans-serif;
}

body{
    min-height:100vh;
    overflow-x:hidden;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(-45deg,#090909,#120b25,#1f1040,#0d2f40);
    background-size:400% 400%;
    animation:bgMove 12s ease infinite;
    padding:20px;
    position:relative;
}

@keyframes bgMove{
    0%{background-position:0% 50%;}
    50%{background-position:100% 50%;}
    100%{background-position:0% 50%;}
}

.container{
    width:100%;
    max-width:900px;
    z-index:2;
}

.glass-card{
    backdrop-filter:blur(25px);
    background:rgba(255,255,255,.08);
    border:1px solid rgba(255,255,255,.15);
    border-radius:30px;
    padding:40px;
    box-shadow:
        0 20px 60px rgba(0,0,0,.4),
        inset 0 1px 1px rgba(255,255,255,.2);
}

.title{
    text-align:center;
    font-size:3rem;
    margin-bottom:10px;
    background:linear-gradient(90deg,#00f5ff,#9d4dff,#00e1ff);
    background-size:300%;
    -webkit-background-clip:text;
    color:transparent;
    animation:gradientText 5s linear infinite;
}

@keyframes gradientText{
    0%{background-position:0%}
    100%{background-position:300%}
}

.subtitle{
    text-align:center;
    color:#cfcfcf;
    margin-bottom:35px;
}

.input-group{
    display:flex;
    flex-direction:column;
    gap:10px;
}

label{
    color:white;
}

input{
    padding:16px;
    border:none;
    outline:none;
    border-radius:15px;
    background:rgba(255,255,255,.08);
    color:white;
    font-size:1rem;
    border:1px solid rgba(255,255,255,.12);
    transition:.3s;
}

input:focus{
    box-shadow:
      0 0 20px #00f5ff,
      0 0 40px rgba(0,245,255,.4);
    border-color:#00f5ff;
}

button{
    width:100%;
    margin-top:20px;
    padding:16px;
    border:none;
    border-radius:16px;
    background:linear-gradient(135deg,#6f3cff,#00d9ff);
    color:white;
    font-size:1rem;
    cursor:pointer;
    transition:.3s;
    font-weight:600;
}

button:hover{
    transform:translateY(-3px) scale(1.03);
    box-shadow:
        0 0 20px #00eaff,
        0 0 50px rgba(0,234,255,.5);
}

.error{
    margin-top:15px;
    color:#ff6b81;
    text-align:center;
    min-height:25px;
}

.shake{
    animation:shake .4s;
}

@keyframes shake{
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-8px)}
    40%{transform:translateX(8px)}
    60%{transform:translateX(-8px)}
    80%{transform:translateX(8px)}
}

.loader{
    display:none;
    flex-direction:column;
    align-items:center;
    gap:15px;
    margin:30px 0;
}

.spinner{
    width:60px;
    height:60px;
    border:4px solid rgba(255,255,255,.2);
    border-top:4px solid cyan;
    border-radius:50%;
    animation:spin 1s linear infinite;
}

@keyframes spin{
    to{transform:rotate(360deg);}
}

.results{
    display:none;
    margin-top:30px;
}

.main-age{
    text-align:center;
    padding:30px;
    border-radius:25px;
    background:rgba(255,255,255,.05);
    border:1px solid rgba(255,255,255,.1);
}

.main-age h2{
    color:#ddd;
}

.age-display{
    margin-top:10px;
    font-size:2.5rem;
    font-weight:700;
    color:#00f5ff;
}

.age-display span{
    color:white;
}

.pulse-card{
    animation:pulse 2s infinite;
}

@keyframes pulse{
    0%{
        box-shadow:0 0 0 0 rgba(0,255,255,.4);
    }
    70%{
        box-shadow:0 0 0 25px rgba(0,255,255,0);
    }
    100%{
        box-shadow:0 0 0 0 rgba(0,255,255,0);
    }
}

.stats-grid{
    margin-top:25px;
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
    gap:20px;
}

.stat-card{
    text-align:center;
    padding:25px;
    border-radius:20px;
    background:rgba(255,255,255,.05);
    border:1px solid rgba(255,255,255,.1);
    transition:.3s;
    opacity:0;
    transform:translateY(30px);
}

.stat-card h3{
    color:#ccc;
}

.stat-card p{
    margin-top:10px;
    color:#00f5ff;
    font-size:1.8rem;
    font-weight:700;
}

.show{
    animation:reveal .7s forwards;
}

@keyframes reveal{
    to{
        opacity:1;
        transform:translateY(0);
    }
}

.fade-in{
    animation:fadeIn 1.2s ease;
}

@keyframes fadeIn{
    from{
        opacity:0;
        transform:translateY(40px);
    }
    to{
        opacity:1;
        transform:translateY(0);
    }
}

.particles{
    position:fixed;
    inset:0;
    overflow:hidden;
    pointer-events:none;
}

.particle{
    position:absolute;
    border-radius:50%;
    background:rgba(0,255,255,.5);
    animation:float linear infinite;
}

@keyframes float{
    from{
        transform:translateY(100vh);
    }
    to{
        transform:translateY(-120px);
    }
}

.floating-orb{
    position:fixed;
    border-radius:50%;
    filter:blur(70px);
    z-index:0;
}

.orb1{
    width:250px;
    height:250px;
    background:#9d4dff;
    top:10%;
    left:5%;
}

.orb2{
    width:220px;
    height:220px;
    background:#00d9ff;
    right:5%;
    top:60%;
}

.orb3{
    width:180px;
    height:180px;
    background:#5d6bff;
    bottom:5%;
    left:40%;
}

.mouse-light{
    position:fixed;
    width:250px;
    height:250px;
    border-radius:50%;
    pointer-events:none;
    background:radial-gradient(circle,
    rgba(0,255,255,.2),
    transparent 70%);
    transform:translate(-50%,-50%);
    z-index:1;
}

#confetti{
    position:fixed;
    inset:0;
    pointer-events:none;
}

@media(max-width:768px){

    .title{
        font-size:2.2rem;
    }

    .glass-card{
        padding:25px;
    }

    .age-display{
        font-size:1.8rem;
    }
}
