/* Vida diaria: platos rotativos del Comedor y misiones rotativas del Tablón */
const PLATOS=[['Sopa de cinco sabores',5,30,5],['Gachas de mijo',3,20,0],['Arroz con jade',8,40,0],['Fideos de longevidad',10,50,0],['Dumplings de loto',12,40,10],['Té de ginseng',6,0,15],['Pato laqueado',20,90,0],['Pescado al vapor',15,70,0],
 ['Bao de jabalí',14,60,5],['Tofu fermentado heroico',6,25,8],['Sopa de nido',30,100,20],['Té de crisantemo',4,0,10],['Pastel de luna',10,30,15],['Estofado del Abuelo Pei',9,45,5],['Cerdo agridulce',13,65,0],['Congee de hongo de niebla',18,80,15]];
const FRASES_LIN=['«¡Flacos, a comer! Aquí no se cultiva con el estómago vacío!»','«Hoy el cucharón está de buen humor. Aprovechad.»','«Si algo sabe raro, es especia. Si algo se mueve, también.»','«Quien no come, no cultiva. Quien come mucho, cultiva despacio.»'];
GEN.comedor=()=>({h:'El Comedor',t:['Madre Lin remueve una olla del tamaño de un estanque. '+FRASES_LIN[S.dia%FRASES_LIN.length],'<span class=tag>El menú cambia cada día.</span>'],c:[
 ...shuf(PLATOS.map((p,i)=>i),S.dia*53+7).slice(0,5).map(i=>{const[n,p,h,q]=PLATOS[i];return{x:`${n} · ${p} monedas · ${[h?'+'+h+' Vida':'',q?'+'+q+' Qi':''].filter(Boolean).join(', ')} · 1 h`,to:'comedor',req:{oro:p},fx:{oro:-p,hp:h,qi:q,t:1},k:'side'}}),
 {x:'Preguntarle a Madre Lin por los chismes de la secta',to:'lin_rumores',req:{no:'rumor'},oc:1,k:'social'},{x:'Volver al patio',to:'patio'}]});
const MISIONES=[['pergaminos','Entregar pergaminos al Pabellón',2,'su',9,25,10],['hierbas','Recolectar hierbas para el Horno',3,'es',9,30,0,'hierba_qi'],['lena','Cortar leña para el invierno',3,'cu',9,30,15],['barrer','Barrer el Patio de los Mil Pasos',2,'cu',8,20,8],
 ['copiar','Copiar pergaminos de Qi',4,'me',10,40,20],['guardia','Guardia nocturna en la Puerta',5,'es',10,45,20],['mensaje','Llevar un mensaje a la ciudad',4,'su',10,40,25],['cocina','Ayudar en la cocina de Madre Lin',2,'cu',8,20,5],
 ['biblio','Ordenar la biblioteca prohibida',3,'me',10,35,10],['estatua','Pulir la estatua del Dragón',3,'cu',9,30,10],['pozo','Rescatar un gato del pozo',2,'su',9,25,0,'pildora_salud'],['huerto','Cuidar el huerto del Maestro Hu',3,'es',9,30,10],
 ['mineral','Cargar mineral hasta la herrería',4,'cu',10,40,0,'mineral_hierro'],['festival','Preparar el Festival de la Linterna',5,'me',10,50,25]];
GEN.tablon=()=>{const per=Math.floor((S.dia-1)/2),c=[];
 shuf(MISIONES.map((m,i)=>i),per*37+5).slice(0,4).forEach(i=>{const[id,n,h,s,dc,xp,oro,item]=MISIONES[i],key=`ms_${id}_${per}`;if(S.fl[key])return;
  c.push({x:`${n} · ${h} h · ${NM[s]} · +${xp} XP${oro?' · +'+oro+' 🪙':''}${item?' · +'+OBJ[item].n:''} · hasta el día ${(per+1)*2}`,chk:{s,dc,ok:'ms_ok',ko:'ms_ko',fxok:{xp,oro,item},fxko:{hp:-5}},req:{hmax:24-h},fx:{t:h,fl:{[key]:true}},k:'side'})});
 c.push({x:'Limpiar la fragua del maestro Tie · 2 h',to:'fragua',req:{no:'fragua'},oc:1,fx:{t:2},k:'side'},{x:'Volver al patio',to:'patio'});
 return{h:'Tablón de misiones',t:['Pergaminos clavados con chinchetas y desesperación. Las misiones cambian cada dos días y solo puedes empezarlas si te da tiempo de terminarlas antes de medianoche.',c.length<3?'<span class=tag>Hoy ya has hecho todo lo disponible. Vuelve en un par de días.</span>':''],c}};
registrarCapitulo({temporada:0,n:0,parte:'vida',titulo:'Vida diaria',escenas:{
 ms_ok:{t:['Cumples el encargo. El maestro de turno asiente, anota algo y, por una vez, no te regaña.'],c:[{x:'Volver al tablón',to:'tablon',k:'side'},{x:'Volver al patio',to:'patio'}]},
 ms_ko:{t:['El encargo sale a medias. No es un desastre, pero tampoco una gloria.'],c:[{x:'Volver al tablón',to:'tablon',k:'side'},{x:'Volver al patio',to:'patio'}]}}});
