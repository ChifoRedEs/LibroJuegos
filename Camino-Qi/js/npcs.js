/* Socializar: matriz de PNJ. Cada día aparecen 5 distintos. Tipos: charla, reto, lucha, mental */
const N_=(id,n,t,e,d,x)=>({id,n,t,e,d,...x});
const NPCS=[
 N_('tao','Gordo Tao','reto','apuesta de cartas',['«¡Una partidita! Prometo no hacer trampas. Mucho.»','«Hoy he soñado con un banquete. Desperté con hambre y rencor.»'],{s:'su',dc:9,rw:{oro:30},pn:{oro:-10}}),
 N_('lian','Lian','mental','enigma de respiración',['«El Qi se asusta del ruido. Tú, también, haces mucho.»','«Si quieres un enigma, siéntate. Y no hables.»']),
 N_('hu','Maestro Hu','mental','acertijo alquímico',['«¡Cuidado con mi humo! Y con mis preguntas.»','«La alquimia exige paciencia. Yo, por desgracia, solo tengo ojeras.»']),
 N_('lin','Madre Lin','charla','sopa y consejo',['«¡Flaco! Come. Y no preguntes qué lleva.»','«Hoy hay sopa de cinco sabores. Cuatro son sorpresa.»'],{rw:{hp:30,qi:5}}),
 N_('xu','Instructor Xu','lucha','duelo de entrenamiento',['«No es para vencer. Es para saber quién eres cuando te golpean.»','«Hoy toca tocar el suelo. Suele doler menos que el orgullo.»'],{en:'instructor'}),
 N_('wang','Wang','lucha','duelo con el rival',['«¡Novato! Otra vez tú. ¡Mi abanico está afilado y mi pelo, impecable!»','«No he dormido. Y la culpa, la tienes tú.»'],{en:'wang'}),
 N_('bao','Tendero Bao','reto','regateo',['«Mi precio es justo. Es decir, mío.»','«Si me convences, te hago un descuento. Si no, también, pero menor.»'],{s:'me',dc:10,rw:{oro:40},pn:{oro:-15}}),
 N_('monje','Monje del Bambú','mental','meditación y enigma',['«Los árboles piensan despacio. Yo, más.»','«Siéntate. Respira. Y escucha lo que no digo.»']),
 N_('chen','Viuda Chen','charla','historias de la secta',['«Esta montaña ha visto cosas que no caben en un pergamino.»','«Los jóvenes corren. Los viejos recuerdan. Yo, a veces, hago ambas.»'],{rw:{xp:8}}),
 N_('fu','Pequeño Fu','reto','carrera por el patio',['«¡Te echo una carrera! Te dejo ventaja. Poca.»','«Mi madre dice que soy rápido. Mi madre no cuenta, pero igual.»'],{s:'cu',dc:9,rw:{xp:15},pn:{hp:-5}}),
 N_('viejo','Viejo Sin Nombre','mental','sabiduría de mendigo',['«No tengo casa, pero tengo respuestas. Son más baratas.»','«Dame una moneda y te regalo una verdad. Gratis, una mentira.»']),
 N_('huren','Hermano Hu Ren','lucha','cacería a cuchillo',['«Los lobos del bosque no muerden: se quejan. Pero con dientes.»','«Si quieres aprender a pelear, que sea contra algo que te lo merezca.»'],{en:'lobo'}),
 N_('yue','Señorita Yue','reto','ceremonia del té',['«Servir té es un arte. Derramar, también, pero otro.»','«Un cuenco lleno no se agita. Un corazón, sí.»'],{s:'es',dc:10,rw:{xp:20},pn:{hp:-5}}),
 N_('ming','Poeta Ming','charla','versos mal rimados',['«¡Oh luna, oh luna! Rima con "fortuna", y poco más.»','«Escribo odas a mi cena. Es mi musa más constante.»'],{rw:{xp:10,oro:10}}),
 N_('dong','Capitán Dong','reto','pulso con la guardia',['«¿Un pulso, discípulo? Prepárate para llorar con dignidad.»','«La guardia no duerme. Yo sí, pero a ratos.»'],{s:'cu',dc:11,rw:{item:'pildora_salud'},pn:{hp:-8}})];
function setNpc(id){S.npc=id}function setFe(e){S.fe=e}function setRa(id){S.ra=id}
GEN.socializar=()=>({h:'Socializar',t:['La secta y la ciudad cercana bullen de gente. Hoy, entre todos, te cruzas con algunos rostros. Mañana serán otros.'],c:[
 ...shuf(NPCS.map((n,i)=>i),S.dia*977+13).slice(0,5).map(i=>{const n=NPCS[i];return{x:`${n.n} · ${n.e} · 1 h`,to:'npc_tema',fn:['setNpc',n.id],fx:{t:1},k:n.t=='lucha'?'hunt':'social'}}),
 {x:'Barracones (el rincón de Wang)',to:'barracones',k:'social'},{x:'Volver al patio',to:'patio'}]});
GEN.npc_tema=()=>{const n=NPCS.find(x=>x.id==S.npc),key=`n_${n.id}_${S.dia}`,l=n.d[(S.dia+hs(n.id))%n.d.length],t=[`<b>${n.n}</b> · <span class=tag>${n.e}</span>`,l],c=[];
 if(S.fl[key])t.push('<span class=tag>Hoy ya has hablado con '+n.n+'. Vuelve mañana.</span>');
 else if(n.t=='charla')c.push({x:'Charlar un rato',to:'npc_ok',fx:{...n.rw,fl:{[key]:true}},k:'social'});
 else if(n.t=='reto')c.push({x:`Aceptar el reto (${NM[n.s]})`,chk:{s:n.s,dc:n.dc,ok:'npc_ok',ko:'npc_ko',fxok:n.rw,fxko:n.pn},fx:{fl:{[key]:true}},k:'social'});
 else if(n.t=='lucha')c.push({x:'Aceptar un duelo',to:'npc_duelo',fn:['setFe',n.en],fx:{fl:{[key]:true}},k:'hunt'});
 else{const r=pickRiddle(n.id);if(r)c.push({x:'Escuchar su enigma',to:'npc_acertijo',fn:['setRa',r],fx:{fl:{[key]:true}},k:'social'});else t.push('<span class=tag>Ya no le quedan enigmas que no hayas resuelto.</span>')}
 c.push({x:'Volver a la plaza',to:'socializar'});return{h:n.n,t,c}};
GEN.npc_acertijo=()=>({t:['Se inclina y te susurra un enigma al oído.'],acertijo:S.ra,back:'socializar'});
registrarCapitulo({temporada:0,n:0,parte:'social',titulo:'Sistema social',escenas:{
 socializar:{gen:'socializar',gt:['npc_tema','barracones','patio']},
 npc_tema:{gen:'npc_tema',gt:['npc_ok','npc_ko','npc_duelo','npc_acertijo','socializar']},
 npc_acertijo:{gen:'npc_acertijo',gt:['socializar']},
 npc_ok:{t:['La charla resulta provechosa. Te despides con una sonrisa que casi parece sincera.'],c:[{x:'Seguir socializando',to:'socializar',k:'social'},{x:'Volver al patio',to:'patio'}]},
 npc_ko:{t:['No sale como esperabas, pero aprendes algo. O eso dices para sentirte mejor.'],c:[{x:'Seguir socializando',to:'socializar',k:'social'},{x:'Volver al patio',to:'patio'}]},
 npc_duelo:{t:['Os colocáis frente a frente. Alguien, por algún motivo, empieza a hacer apuestas.'],f:{e:'_dyn',win:'npc_ganas',lose:'npc_pierde',flee:'socializar'}},
 npc_ganas:{t:['Ganas el duelo. Alguien aplaude, alguien protesta, alguien cobra una apuesta.'],c:[{x:'Seguir socializando',to:'socializar',k:'social'},{x:'Volver al patio',to:'patio'}]},
 npc_pierde:{t:['Pierdes, pero con el orgullo (casi) intacto. Te ayudan a levantarte.'],fx:{hp:25},c:[{x:'Seguir socializando',to:'socializar',k:'social'},{x:'Volver al patio',to:'patio'}]}}});
