<template>
    <div class="container-fluid right-screen">
        <div class="row">
            <div class="col">
                <div class="text-md-right text-sm-center text-xs-center" style="padding-right: 15px">
                    <transition name="fade">
                        <div @click="goInitial" v-if="right!=''" v-ripple class="icon-back">
                            <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
                        </div>
                    </transition>
                    <button type="button" :class="{mark:all}" v-ripple class="btn btn-info right-btn"
                            @click="showRights('all')">Todos
                    </button>
                    <button type="button" :class="{mark:old}" v-ripple class="btn btn-info right-btn"
                            @click="showRights('old')">Vigentes
                    </button>
                    <button type="button" :class="{mark:nuu}" v-ripple class="btn btn-info right-btn"
                            @click="showRights('nuu')">Nuevos
                    </button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col col-md-6 side-rigths">
                <v-divider class="hidden-sm-and-up"/>
                <p class="rights">{{right}}</p>
                <p class="type-rights">{{typo}}</p>
                <p class="art-rights"><span>{{article}}</span></p>
                <p style="text-align:justify" v-html="textArticle"></p>
                <p style="text-align:justify">{{auxiliar}}</p>
            </div>
            <div class="col-md-6">
                <ul class="box-rigths">
                    <template v-for="(item, index) in items">
                        <li v-ripple :key="index" v-if="visible(index)" class="item-rights" @click="getArticle(index)">
                            + {{ item.derecho }}
                        </li>
                        <v-divider v-show="visible(index)" v-if="index + 1 < items.length"
                                   :key="`divider-${index}`"></v-divider>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(faArrowLeft)
    export default {
        name: "Rights",
        components: {FontAwesomeIcon},
        data() {
            let initial = ["El reconocimiento a los Derechos Humanos en el proyecto constitucional es señalado como un gran progreso. Entre los elementos más destacados del documento que se ha puesto a consideración resalta la inclusión de nuevos derechos y libertades, aunque también llaman la atención la aparición de límites a algunos derechos ya conquistados en nuevas formulaciones y las pocas garantías para el cumplimiento de todos.",
                "Al tocar sobre cada derecho puedes ver el artículo donde se reconoce y el sujeto al que beneficia."]
            return {
                article: "",
                initial: initial,
                all: true,
                old: false,
                nuu: false,
                textArticle: initial[0],
                auxiliar: initial[1],
                right: "",
                typo: "",
                items: [
                    {
                        "derecho": "Derecho de combatir por todos los medios,  incluyendo la lucha armada,  contra cualquiera que intente derribar el orden político,  social y económico. ",
                        "status": "old",
                        "subject": "ciudadano",
                        "numero": 3,
                        "texto": "La defensa de la patria socialista es el más grande honor y el deber supremo de cada cubano.  La traición a la patria es el más grave de los crímenes,  quien la comete está sujeto a las más severas sanciones. <br/> El socialismo y el sistema político y social revolucionario,  establecidos por esta Constitución,  son irrevocables.  <br/> Los ciudadanos tienen el derecho de combatir por todos los medios,  incluyendo la lucha armada,  cuando no fuera posible otro recurso,  contra cualquiera que intente derribar el orden político,  social y económico establecido por esta Constitución.  <br/>"
                    },
                    {
                        "derecho": "Libertad religiosa. ",
                        "status": "Old",
                        "subject": "Ciudadano ,  organizaciones . ",
                        "numero": 15,
                        "texto": "El Estado reconoce,  respeta y garantiza la libertad religiosa. <br/>En la República de Cuba las instituciones religiosas están separadas del Estado  y todas tienen los mismos derechos y deberes.  <br/>Las distintas creencias y religiones gozan de igual consideración. <br/>"
                    },
                    {
                        "derecho": "Derecho a la libre determinación,  expresado en la libertad de elegir el sistema político,  económico,  social y cultural,  como condición para la convivencia pacífica entre las naciones. ",
                        "status": "old",
                        "subject": "Estado",
                        "numero": 16,
                        "texto": "La República de Cuba  basa las relaciones internacionales en el ejercicio de su soberanía y  los principios antimperialistas e internacionalistas,   en función de los intereses del pueblo y,  en consecuencia:  <br/>a) ratifica su aspiración de paz digna,  verdadera y válida para todos los Estados,  asentada en el respeto a la independencia y soberanía de los pueblos y su derecho a la  libre determinación,   expresado en la libertad de elegir su sistema político,  económico,  social y cultural,  como condición esencial para asegurar la convivencia pacífica entre las naciones;  <br/>b)  sostiene su voluntad de observar de manera irrestricta los principios y normas que conforman el Derecho internacional,  en particular la  igualdad de derechos,  la integridad territorial,  la independencia de los Estados,  el no uso ni amenaza del uso de la fuerza en las relaciones internacionales,  la cooperación internacional en beneficio e interés mutuo y equitativo,  el arreglo pacífico de controversias en pie de igualdad y respeto y los demás principios proclamados en la Carta de las Naciones Unidas; <br/>c) reafirma su voluntad de integración y colaboración con los países de América Latina y del Caribe,  cuya identidad común y necesidad histórica de avanzar hacia la integración económica y política para lograr la verdadera independencia,  nos permitirá alcanzar el lugar que nos corresponde en el mundo; <br/>d) propugna la unidad de todos los países del Tercer Mundo y condena el imperialismo,   enemigo de la paz y de los pueblos;  el fascismo;  el colonialismo;  el neocolonialismo u otras formas de sometimiento,  en cualquiera de sus manifestaciones;  <br/>e)  promueve la protección y conservación del medio ambiente y el enfrentamiento al cambio climático,  que amenaza la sobrevivencia de la especie humana,  sobre la base del reconocimiento de responsabilidades comunes,  pero diferenciadas;  el establecimiento de un orden económico internacional más justo y equitativo y la erradicación de los patrones irracionales de producción y consumo;  <br/>f)  defiende y protege el disfrute de los derechos humanos y repudia cualquier manifestación de racismo o discriminación;  <br/>g)  condena  la intervención directa o indirecta en los asuntos internos o externos de cualquier Estado y,  por tanto,  la agresión armada,  el bloqueo económico,   comercial y financiero,   así como cualquier otra forma de coerción económica o política,  la violencia física contra personas residentes en otros países,  u otro tipo de injerencia y amenaza a la integridad de los Estados y de los elementos políticos,  económicos y culturales de las naciones; <br/>h) rechaza la violación del derecho irrenunciable y soberano de todo Estado a regular el uso y los beneficios de las telecomunicaciones en su territorio,  conforme a la práctica universal y a los convenios internacionales que ha suscrito; <br/>i) califica de  crimen  internacional la guerra de agresión y de conquista,  reconoce la legitimidad de las luchas por la liberación nacional y la resistencia armada a la agresión,  así como considera su deber internacionalista solidarizarse con el agredido y con los pueblos que combaten por su liberación y autodeterminación; <br/>j)  promueve el desarme general y completo,  rechaza la existencia,  proliferación o uso de armas nucleares,  de exterminio en masa u otras de efectos similares,  y la ciberguerra,  así como el desarrollo y empleo de nuevas armas,  incluyendo las autónomas,  que transgreden el Derecho Internacional Humanitario;  <br/>k)  repudia y condena el terrorismo en cualquiera de sus manifestaciones,  en particular el terrorismo de Estado;  <br/>l)  ratifica su compromiso en la construcción de una sociedad de la información y el conocimiento centrada en la persona,  integradora y orientada al desarrollo sostenible,  en la que todos puedan crear,  consultar,  utilizar y compartir la información y el conocimiento en la mejora de su calidad de vida,  sobre la base de los propósitos y principios de la Carta de las Naciones Unidas;  y defiende la cooperación de todos los Estados y la democratización del ciberespacio,  así como condena su uso con fines contrarios a ello,  incluidas la subversión y la desestabilización de naciones soberanas;  <br/>m) basa sus relaciones con los países que edifican el socialismo en la amistad fraternal,  la cooperación y la ayuda mutua,  asentadas en los objetivos comunes de la construcción de la nueva sociedad; <br/>n) mantiene relaciones de amistad con los países que,  teniendo un régimen político,  social y económico diferente,  respetan su soberanía,  observan las normas de convivencia entre los Estados,  se atienen a los principios de mutuas conveniencias y adoptan una actitud recíproca con nuestro país,  y<br/>ñ)  promueve la multipolaridad en las relaciones internacionales,  como alternativa a la dominación y al hegemonismo político,  financiero y militar que amenazan la paz,  la independencia y la soberanía de los pueblos.  <br/>"
                    },
                    {
                        "derecho": "Derechos de propiedad sobre los bienes. ",
                        "status": "new",
                        "subject": "empresas",
                        "numero": 25,
                        "texto": " El Estado crea y organiza empresas con el objetivo de desarrollar actividades económicas de producción y prestación de servicios,  las que ejercen los derechos que les corresponden sobre los bienes de propiedad socialista de todo el pueblo que tienen asignados.  <br/>Las empresas responden de las obligaciones contraídas  con su patrimonio,  en correspondencia con los límites que determine la ley. <br/>El Estado no responde de las obligaciones contraídas por las empresas y estas tampoco responden de las de aquel. <br/> La ley define otras formas en las que este tipo de propiedad puede ser gestionada.  <br/>"
                    },
                    {
                        "derecho": "Derecho a tener una ciudadanía y a cambiarla. ",
                        "status": "old",
                        "subject": "los cubanos",
                        "numero": 37,
                        "texto": "Los cubanos no podrán ser privados de su ciudadanía,  salvo por causas legalmente establecidas.  Tampoco podrán ser privados del derecho a cambiarla. <br/>La ley establece el procedimiento a seguir para la formalización de la pérdida y renuncia de la ciudadanía y las autoridades facultadas para decidirlo. <br/>"
                    },
                    {
                        "derecho": "Derecho a la vida. ",
                        "status": "new",
                        "subject": "ciudadanos",
                        "numero": 43,
                        "texto": " El Estado garantiza a todos sus ciudadanos la vida,  la libertad,  la justicia,  la seguridad,  la paz,  la salud,  la educación,  la cultura y su desarrollo integral.  <br/>"
                    },
                    {
                        "derecho": "Derecho al libre desenvolvimiento de la personalidad bajo una conducta de respeto,  fraternidad y solidaridad. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 44,
                        "texto": " Las personas tienen derecho al libre desenvolvimiento de su personalidad y deben guardar entre sí una conducta de respeto,  fraternidad y solidaridad.  <br/>"
                    },
                    {
                        "derecho": "Derecho a la intmidad personal y familiar. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 46,
                        "texto": " El Estado respeta y garantiza el derecho de las personas a su intimidad personal y familiar,  a su imagen,  dignidad y honor.  <br/>"
                    },
                    {
                        "derecho": "Derecho al debido proceso.",
                        "status": "new",
                        "subject": "personas",
                        "numero": 48,
                        "texto": " Toda persona como garantía a su seguridad jurídica,  disfruta de un debido proceso y en consecuencia goza de los derechos siguientes:  <br/>a)  no ser privada de libertad,  sino por autoridad competente;  <br/>b)  no ser detenida ni procesada,  sino por causa justa,  autoridad competente y por el tiempo establecido;  <br/>c)  que se presuma inocente,  mientras no se haya declarado responsable por sentencia firme de tribunal;  <br/>d) ser  procesada  y condenada por tribunal competente,   independiente,  imparcial,  preestablecido legalmente  y en virtud de leyes anteriores al delito; <br/>e)  ser tratada con respeto a su dignidad e integridad física,  síquica y moral;  <br/>f)  recibir asistencia jurídica para ejercer su defensa;  <br/>g)  ser notificada de los cargos en su contra y acceder a los medios de pruebas;  <br/>h)  comunicarse con sus familiares,  caso de ser detenida o arrestada.  Si se tratara de extranjeros se procede a la notificación consular;  <br/>i)  no ser privada de sus derechos sino por resolución fundada de autoridad competente o sentencia firme de tribunal,  e <br/>j)  interponer los recursos pertinentes contra las resoluciones judiciales o administrativas que correspondan.  <br/>"
                    },
                    {
                        "derecho": "Derecho a presentar Habeas Corpus. ",
                        "status": "new",
                        "subject": "personas ,  privadas de libertad",
                        "numero": 50,
                        "texto": " Quien estuviere privado de libertad ilegalmente,  tiene derecho a establecer ante tribunal competente procedimiento de Habeas Corpus,  conforme a las exigencias establecidas en la ley.  <br/>"
                    },
                    {
                        "derecho": "Derecho de las personas privadas de libertad a su reinserción social. ",
                        "status": "new",
                        "subject": "personas ,  privadas de libertad",
                        "numero": 51,
                        "texto": " El Estado favorece en su política penitenciaria la reinserción social de las personas privadas de libertad,  garantiza el respeto de sus derechos y el cumplimiento de las normas establecidas para su tratamiento en los establecimientos penitenciarios.  <br/>"
                    },
                    {
                        "derecho": "Derecho a la privacidad en las comunicaciones. ",
                        "status": "old",
                        "subject": "personas",
                        "numero": 53,
                        "texto": "La correspondencia  y demás formas de comunicación entre las personas  son inviolables.   Solo pueden ser interceptadas o registradas,  mediante orden expresa de autoridad competente,  en los casos y con las formalidades establecidas en la ley.  <br/>"
                    },
                    {
                        "derecho": "Derecho a entrar,  salir y transitar por el territorio nacional y a residir donde quieran. ",
                        "status": "old",
                        "subject": "personas",
                        "numero": 54,
                        "texto": " Las personas tienen libertad de entrar,  permanecer,  transitar y salir del territorio nacional,  cambiar de domicilio o residencia,  sin más limitaciones que las establecidas por la ley.  <br/>"
                    },
                    {
                        "derecho": "Derecho a conocer sobre sus datos personales. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 55,
                        "texto": " Toda persona tiene el derecho de conocer lo que de ella conste en archivos o cualquier otra forma de registros públicos,  así como a interesar su no divulgación y obtener su debida corrección,  rectificación y actualización,  de conformidad con lo establecido en la ley.  <br/>"
                    },
                    {
                        "derecho": "Derecho a la información veraz,  oportuna y adecuada por parte del Estado. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 56,
                        "texto": " Todas las personas tienen derecho a recibir del Estado información veraz,  adecuada y oportuna,  conforme a las regulaciones establecidas.  <br/>"
                    },
                    {
                        "derecho": "Derecho al uso,  disfrute y libre disposición de la propiedad. ",
                        "status": "new",
                        "subject": "propietarios",
                        "numero": 57,
                        "texto": " El Estado garantiza el uso,  disfrute y libre disposición de la propiedad,  de conformidad con lo establecido en la ley.  <br/>"
                    },
                    {
                        "derecho": "Libertad de conciencia.",
                        "status": "new",
                        "subject": false,
                        "numero": 59,
                        "texto": "El Estado reconoce,  respeta y garantiza la libertad de  pensamiento,  conciencia  y expresión.  <br/>"
                    },
                    {
                        "derecho": "Libertad de prensa ",
                        "status": "old",
                        "subject": "ciudadanos",
                        "numero": 60,
                        "texto": "Se reconoce a los ciudadanos la libertad de prensa.   Este derecho se ejerce de conformidad con la ley.  <br/> Los medios fundamentales de comunicación social,  en cualquiera de sus soportes,  son de propiedad socialista de todo el pueblo,  lo que asegura su uso al servicio de toda la sociedad.  <br/> El Estado establece los principios de organización y funcionamiento para todos los medios de comunicación social.  <br/>"
                    },
                    {
                        "derecho": "Derecho a manifestación. ",
                        "status": "old",
                        "subject": false,
                        "numero": 61,
                        "texto": "Los derechos de reunión,  manifestación y asociación,   con fines lícitos y pacíficos,  se reconocen por el Estado siempre que se ejerzan con respeto al orden público y el acatamiento a las preceptivas establecidas en la ley.  <br/>"
                    },
                    {
                        "derecho": "Derecho a profesar o no y a cambiar de creencia religiosa. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 62,
                        "texto": " Toda persona tiene derecho a profesar o no creencias religiosas,  a cambiarlas y a practicar la de su preferencia,  con el debido respeto a otros credos y de conformidad con la ley.  <br/>"
                    },
                    {
                        "derecho": "Derecho a formular quejas al Estado. ",
                        "status": "old",
                        "subject": "personas",
                        "numero": 64,
                        "texto": " Las personas  tienen derecho a dirigir quejas y peticiones a las autoridades,   las que están obligadas   a tramitarlas en plazo adecuado,  dando las respuestas oportunas y pertinentes de conformidad con la ley.  <br/>"
                    },
                    {
                        "derecho": "Derechos de creación intelectual. ",
                        "status": "new",
                        "subject": "Autores y titulares",
                        "numero": 65,
                        "texto": " Se reconocen a las personas los derechos derivados de la creación intelectual,  conforme a la ley y los tratados internacionales.  <br/> Los derechos adquiridos se ejercen por los autores y titulares en correspondencia con las políticas públicas.  <br/>"
                    },
                    {
                        "derecho": "Derecho a la sucesión. ",
                        "status": "new",
                        "subject": false,
                        "numero": 66,
                        "texto": "El Estado reconoce el derecho  a la sucesión   por causa de muerte.  La ley regula su contenido y alcance.  <br/>"
                    },
                    {
                        "derecho": "Derecho a obtener un empleo digno,  en correspondencia con su elección,  calificación,  aptitud y exigencias. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 75,
                        "texto": " La persona en condición de trabajar tiene derecho a obtener un empleo digno,  en correspondencia con su elección,  calificación,  aptitud y exigencias de la economía y la sociedad.  <br/>"
                    },
                    {
                        "derecho": "Derecho al descanso,  que se garantiza por la jornada de trabajo de ocho horas,  el descanso semanal y las vacaciones anuales pagadas. ",
                        "status": "old",
                        "subject": "trabajador",
                        "numero": 78,
                        "texto": "El que trabaja tiene derecho al descanso,  que se garantiza por la jornada de trabajo de ocho horas,  el descanso semanal y las vacaciones anuales pagadas. <br/> La ley define aquellos otros supuestos en los que excepcionalmente se pueden aprobar jornadas diferentes de trabajo,  con respeto al descanso.  <br/>"
                    },
                    {
                        "derecho": "Derecho a la seguridad social. ",
                        "status": "old",
                        "subject": "trabajador",
                        "numero": 79,
                        "texto": " Se reconoce el derecho a la seguridad social.  El Estado,   mediante el sistema de seguridad social,  garantiza la protección adecuada de todo trabajador impedido de laborar por su edad,   maternidad,  paternidad,   invalidez o enfermedad. <br/>En caso de muerte del trabajador,  el Estado  brinda  similar protección a su familia. <br/>"
                    },
                    {
                        "derecho": "Derecho a la atención médica y a subsidio o jubilación en los casos de incapacidad temporal o permanente de trabajo. ",
                        "status": "old",
                        "subject": "trabajador",
                        "numero": 80,
                        "texto": "El Estado garantiza el derecho a la protección,  seguridad y  salud  en el trabajo mediante la adopción de medidas adecuadas para la prevención de accidentes y enfermedades profesionales. <br/>El que sufre un accidente en el trabajo o contrae una enfermedad profesional tiene derecho a la atención médica y a subsidio o jubilación en los casos de incapacidad temporal o permanente de trabajo. <br/>"
                    },
                    {
                        "derecho": "Derecho a la vivienda. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 82,
                        "texto": " Se reconoce el derecho   de las personas a una vivienda digna.  <br/>El Estado trabaja  para hacer efectivo este derecho  mediante programas de construcción de viviendas,  con la participación de entidades y de la población,  en correspondencia con las normas del ordenamiento territorial y urbano y las leyes.  <br/>"
                    },
                    {
                        "derecho": "Derecho a la salud.",
                        "status": "old",
                        "subject": "personas",
                        "numero": 83,
                        "texto": " La salud pública es un derecho de todas las personas.  El Estado garantiza el acceso y la gratuidad de los servicios de atención,  protección y recuperación.  <br/> La ley define el modo en que los servicios de salud se prestan.  <br/>"
                    },
                    {
                        "derecho": "Derecho a la educación. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 84,
                        "texto": " La educación es un derecho de todas las personas   y una responsabilidad del Estado,  la sociedad y las familias.  <br/> El Estado   garantiza a sus ciudadanos servicios de educación gratuitos y asequibles para su formación integral,  desde el preescolar hasta la enseñanza universitaria de pregrado,  conforme a  las exigencias sociales y a las necesidades del desarrollo económico-social del país. <br/> La ley define,  entre otras cuestiones,  el alcance de la obligatoriedad de estudiar y la preparación general básica que,  como mínimo,  debe adquirir todo ciudadano.  <br/> Se garantiza la formación posgraduada y la educación de las personas adultas,  de conformidad con las regulaciones establecidas.  <br/>"
                    },
                    {
                        "derecho": "Derecho a la educación física,  al deporte y a la recreación como elementos esenciales de su calidad de vida. ",
                        "status": "old",
                        "subject": "personas",
                        "numero": 85,
                        "texto": "Las personas tienen derecho a la educación física,  al deporte y a la recreación  como elementos esenciales de su calidad de vida.  <br/> Los planes de estudio del sistema nacional de educación garantizan la inclusión de la enseñanza y práctica de la educación física y el deporte como parte de la formación integral de la niñez,  la adolescencia y la juventud.  <br/> El Estado trabaja para garantizar los recursos necesarios dedicados a la promoción y práctica del deporte y la recreación del pueblo,    así como para la preparación y desarrollo de los talentos deportivos.  <br/>"
                    },
                    {
                        "derecho": "Derecho a vivir en un medio ambiente sano y equilibrado. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 86,
                        "texto": " Todas las personas tienen derecho a vivir en un medio ambiente sano y equilibrado.  <br/>El Estado protege el medio ambiente y los recursos naturales del país.  Reconoce su estrecha vinculación con el desarrollo sostenible de la economía y la sociedad para hacer más racional la vida humana y asegurar la supervivencia,  el bienestar y la seguridad de las generaciones actuales y futuras. <br/>"
                    },
                    {
                        "derecho": "Derecho al agua. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 87,
                        "texto": " Todas las personas tienen derecho al agua,  con la debida retribución y uso racional.  <br/>"
                    },
                    {
                        "derecho": "Derecho a la alimentación. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 88,
                        "texto": " Se reconoce el derecho de las personas a la alimentación.  El Estado trabaja para alcanzar la seguridad alimentaria de toda la población.  <br/>"
                    },
                    {
                        "derecho": "Derecho a consumir bienes y servicios de calidad. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 89,
                        "texto": " Todas las personas tienen derecho a consumir bienes y servicios de calidad y que no atenten contra su salud,  y a acceder a información adecuada y veraz sobre estos,  así como a recibir un trato equitativo y digno de conformidad con la ley.  <br/>"
                    },
                    {
                        "derecho": "Derecho a participar en la vida cultural y artística. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 90,
                        "texto": " Todas las personas tienen derecho a participar en la vida cultural y artística de la nación.  El Estado promueve la cultura y las distintas manifestaciones artísticas,  de conformidad con la política cultural y la ley.  <br/>"
                    },
                    {
                        "derecho": "Derecho a la participación en la conformación,  ejercicio y control del poder del Estado. ",
                        "status": "new",
                        "subject": "ciudadano cubano",
                        "numero": 92,
                        "texto": " El ciudadano cubano tiene derecho a participar en la conformación,  ejercicio y control del poder del Estado,  en razón a esto puede,  de conformidad con la Constitución y las leyes:  <br/>a)  estar inscripto en el registro electoral;  <br/>b)  proponer y nominar candidatos;  <br/>c)  elegir y ser elegido;  <br/>d)  participar en elecciones,  plebiscitos,  referendos,  consultas populares y otras formas de participación democrática;  <br/>e)  pronunciarse sobre la rendición de cuenta que le presentan los elegidos;  <br/>f)  revocar el mandato de los elegidos;  <br/>g)  ejercer la iniciativa legislativa y de reforma de la Constitución;  <br/>h)  desempeñar funciones y cargos públicos,  y <br/>i)  estar informado de la gestión de los órganos y autoridades del Estado.  <br/>"
                    },
                    {
                        "derecho": "Derecho a reclamar ante los tribunales cuando se vulneran los derechos por los organos del Estado. ",
                        "status": "new",
                        "subject": "personas",
                        "numero": 94,
                        "texto": " La  persona  a la que se le vulneren sus derechos y  sufriere daño o perjuicio por  órganos del Estado,  sus directivos,   funcionarios y  empleados,   con motivo de  la acción u omisión indebida de sus funciones,   tiene derecho a reclamar,   ante los tribunales,  la restitución de los derechos  y obtener,   de conformidad con la ley,   la correspondiente reparación o indemnización. <br/> La ley establece la pertinencia y el procedimiento preferente,  expedito y concentrado para su cumplimiento.  <br/>"
                    },
                    {
                        "derecho": "Derecho a intervenir en la dirección del Estado,  bien directamente o por intermedio de sus representantes. ",
                        "status": "old",
                        "subject": "ciudadanos",
                        "numero": 199,
                        "texto": "Todos los ciudadanos,  con capacidad legal para ello,  tienen derecho a intervenir en la dirección del Estado,  bien directamente o por intermedio de sus representantes elegidos para integrar los órganos del Poder Popular y a participar,  con ese propósito,  en la forma prevista en la ley,  en elecciones periódicas,   plebiscitos  y referendos populares,  que serán de voto libre,  igual,  directo y secreto.  Cada elector tiene derecho a un solo voto. <br/>"
                    },
                    {
                        "derecho": "Derecho al voto.",
                        "status": "old",
                        "subject": "ciudadanos",
                        "numero": 200,
                        "texto": " El voto es un derecho  y un deber ciudadano.  Lo ejercen voluntariamente  los cubanos,  hombres y mujeres,  mayores de dieciséis años de edad,  excepto: <br/>a) los incapacitados mentales,  previa declaración judicial de su incapacidad; <br/>b) los inhabilitados judicialmente,  y<br/>c)  los que no cumplan con los requisitos de permanencia en el país previstos en la ley.  <br/>"
                    }
                ]
            }
        },
        methods: {
            goInitial: function () {
                this.textArticle = this.initial[0]
                this.auxiliar = this.initial[1]
                this.right = "";
                this.typo = "",
                    this.article = "";
            },
            showRights: function (status) {
                switch (status) {
                    case 'all': {
                        this.all = true
                        this.old = false
                        this.nuu = false
                        break;
                    }
                    case 'old': {
                        this.all = false
                        this.old = true
                        this.nuu = false
                        break;
                    }
                    case 'nuu': {
                        this.all = false
                        this.old = false
                        this.nuu = true
                        break;
                    }

                }
            },
            getArticle: function (index) {
                this.auxiliar = ""

                this.article = "Artículo " + this.items[index].numero;
                this.right = this.items[index].derecho;
                if (this.items[index].subject)
                    this.typo = "Para: " + this.items[index].subject;
                else
                    this.typo = ""
                this.textArticle = this.items[index].texto;
            },
            visible: function (index) {
                if (this.all) {
                    return true
                }
                if (this.nuu && this.items[index].status == "nuu") {
                    return true
                }
                if (this.old && this.items[index].status == "old") {
                    return true
                }
                return false
            }
        },
    }
</script>

<style scoped>
    @media (max-width: 764px) {
        .box-rigths {
            max-height: 200px !important;
        }

        .side-rigths {
            overflow-y: auto !important;
        }

        .right-btn {
            width: 100px !important;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .icon-back {
        background-color: #33ccb2;
        color: white;
        width: 35px;
        height: 35px;
        float: left;
        cursor: pointer;
        text-align: center;
        padding-top: 7px;
    }

    .right-screen {
        max-width: 900px;
    }

    .box-rigths {
        margin-top: 10px;
        max-height: 400px;
        padding-left: 0px;
        overflow-y: scroll;
    }

    h3 {
        font-family: TradeGothicLTStd-Bold;
        color: #4c768c;
        margin: 0px auto;
        margin-top: 20px;
        font-size: 26px;
        text-align: right;
        text-transform: uppercase;
        letter-spacing: 5.2px;
    }

    .item-rights {
        cursor: pointer;
        padding: 5px 10px 5px 0px;
        text-align: justify;
        list-style: none;
        font-family: TradeGothicLTStd;
        font-size: 14px;
    }

    .rights {
        color: #4c768c;
        margin-top: 10px;
        font-family: TradeGothicLTStd-Bold;
        font-weight: bold;
        text-align: justify;
        font-size: 19px;
    }

    .side-rigths {
        /*margin-top: 140px;*/
        font-size: 16px;
        max-height: 400px;
        overflow-y: auto;
    }

    .art-rights {
        font-family: TradeGothicLTStd-Bold;
        font-size: 19.5px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.2px;
        text-align: left;
        text-transform: uppercase;
        color: #4c768c;
    }

    .type-rights {
        color: #df640b;
        text-transform: uppercase;

    }

    .right-btn {
        font-size: 15px;
        font-family: TradeGothicLTStd-Bold;
        background-color: #3d6277;
        font-weight: bold;
        letter-spacing: 0.5px;
        color: #f2f2f2;
        text-align: center;
        /*margin: 5px 5px;*/
        width: 130px;
        text-transform: uppercase;
        user-select: none;
        border: 0px;
        height: 35px;
        border-radius: 0px;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }

</style>