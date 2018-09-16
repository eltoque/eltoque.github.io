<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <button type="button" class="btn btn-info" @click="showRights('all')">Todos</button>
                <button type="button" class="btn btn-info" @click="showRights('old')">Viejo</button>
                <button type="button" class="btn btn-info" @click="showRights('new')">Nuevo</button>
                <br/>
                <ul class="box-rigths">
                    <template v-for="(item, index) in items">
                        <li v-ripple :key="index" v-if="visible(index)"  class="item-rights" @click="getArticle(index)">
                           + {{ item.derecho }}
                        </li>
                        <v-divider v-show="visible(index)" v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
                    </template>
                </ul>
            </div>
            <div class="col side-rigths">
                <p class="rights">{{right}}</p>
                <p class="type-rights">{{typo}}</p>
                <p class="art-rights" ><span >{{article}}</span></p>
                <p style="text-align:justify">{{textArticle}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Rights",
        data() {
            return {
                article: "",
                all: true,
                old: false,
                new: false,
                textArticle:"",
                right:"",
                typo:"",
                items: [
                    {
                    "derecho": "Derecho de combatir por todos los medios, incluyendo la lucha armada, contra cualquiera que intente derribar el orden político, social y económico. ",
                    "status": "old",
                    "subject": "ciudadano",
                    "numero": 3,
                    "texto": "La defensa de la patria socialista es el más grande honor y el deber supremo de cada cubano. La traición a la patria es el más grave de los crímenes, quien la comete está sujeto a las más severas sanciones. El socialismo y el sistema político y social revolucionario, establecidos por esta Constitución, son irrevocables.  Los ciudadanos tienen el derecho de combatir por todos los medios, incluyendo la lucha armada, cuando no fuera posible otro recurso, contra cualquiera que intente derribar el orden político, social y económico establecido por esta Constitución. "
                }, {
                    "derecho": "Libertad religiosa. ",
                    "status": "Old",
                    "subject": "Ciudadano, organizaciones. ",
                    "numero": 15,
                    "texto": "El Estado reconoce, respeta y garantiza la libertad religiosa. En la República de Cuba las instituciones religiosas están separadas del Estado y todas tienen los mismos derechos y deberes. Las distintas creencias y religiones gozan de igual consideración. "
                }, {
                    "derecho": "Derecho a la libre determinación, expresado en la libertad de elegir el sistema político, económico, social y cultural, como condición para la convivencia pacífica entre las naciones. ",
                    "status": "old",
                    "subject": "Estado",
                    "numero": 16,
                    "texto": "La República de Cuba basa las relaciones internacionales en el ejercicio de su soberanía y los principios antimperialistas e internacionalistas,  en función de los intereses del pueblo y, en consecuencia : "
                }, {
                    "derecho": "Derechos de propiedad sobre los bienes. ",
                    "status": "new",
                    "subject": "empresas",
                    "numero": 25,
                    "texto": " El Estado crea y organiza empresas con el objetivo de desarrollar actividades económicas de producción y prestación de servicios, las que ejercen los derechos que les corresponden sobre los bienes de propiedad socialista de todo el pueblo que tienen asignados. Las empresas responden de las obligaciones contraídas con su patrimonio , en correspondencia con los límites que determine la ley. El Estado no responde de las obligaciones contraídas por las empresas y estas tampoco responden de las de aquel. La ley define otras formas en las que este tipo de propiedad puede ser gestionada. "
                }, {
                    "derecho": "Derecho a tener una ciudadanía y a cambiarla. ",
                    "status": "old",
                    "subject": "los cubanos",
                    "numero": 37,
                    "texto": "Los cubanos no podrán ser privados de su ciudadanía, salvo por causas legalmente establecidas. Tampoco podrán ser privados del derecho a cambiarla. La ley establece el procedimiento a seguir para la formalización de la pérdida y renuncia de la ciudadanía y las autoridades facultadas para decidirlo. "
                }, {
                    "derecho": "Derecho a la vida. ",
                    "status": "new",
                    "subject": "ciudadanos",
                    "numero": 43,
                    "texto": " El Estado garantiza a todos sus ciudadanos la vida, la libertad, la justicia, la seguridad, la paz, la salud, la educación, la cultura y su desarrollo integral. "
                }, {
                    "derecho": "Derecho al libre desenvolvimiento de la personalidad bajo una conducta de respeto, fraternidad y solidaridad. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 44,
                    "texto": " Las personas tienen derecho al libre desenvolvimiento de su personalidad y deben guardar entre sí una conducta de respeto, fraternidad y solidaridad. "
                }, {
                    "derecho": "Derecho a la intmidad personal y familiar. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 46,
                    "texto": " El Estado respeta y garantiza el derecho de las personas a su intimidad personal y familiar, a su imagen, dignidad y honor. "
                }, {
                    "derecho": "Derecho al debido proceso",
                    "status": "new",
                    "subject": "personas",
                    "numero": 48,
                    "texto": " Toda persona como garantía a su seguridad jurídica, disfruta de un debido proceso y en consecuencia goza de los derechos siguientes : "
                }, {
                    "derecho": "Derecho a presentar Habeas Corpus. ",
                    "status": "new",
                    "subject": "personas, privadas de libertad",
                    "numero": 50,
                    "texto": " Quien estuviere privado de libertad ilegalmente, tiene derecho a establecer ante tribunal competente procedimiento de Habeas Corpus, conforme a las exigencias establecidas en la ley. "
                }, {
                    "derecho": "Derecho de las personas privadas de libertad a su reinserción social. ",
                    "status": "new",
                    "subject": "personas, privadas de libertad",
                    "numero": 51,
                    "texto": " El Estado favorece en su política penitenciaria la reinserción social de las personas privadas de libertad, garantiza el respeto de sus derechos y el cumplimiento de las normas establecidas para su tratamiento en los establecimientos penitenciarios. "
                }, {
                    "derecho": "Derecho a la privacidad en las comunicaciones. ",
                    "status": "old",
                    "subject": "personas",
                    "numero": 53,
                    "texto": "La correspondencia y demás formas de comunicación entre las personas son inviolables.  Solo pueden ser interceptadas o registradas, mediante orden expresa de autoridad competente, en los casos y con las formalidades establecidas en la ley. "
                }, {
                    "derecho": "Derecho a entrar, salir y transitar por el territorio nacional y a residir donde quieran. ",
                    "status": "old",
                    "subject": "personas",
                    "numero": 54,
                    "texto": " Las personas tienen libertad de entrar, permanecer, transitar y salir del territorio nacional, cambiar de domicilio o residencia, sin más limitaciones que las establecidas por la ley. "
                }, {
                    "derecho": "Derecho a conocer sobre sus datos personales. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 55,
                    "texto": " Toda persona tiene el derecho de conocer lo que de ella conste en archivos o cualquier otra forma de registros públicos, así como a interesar su no divulgación y obtener su debida corrección, rectificación y actualización, de conformidad con lo establecido en la ley. "
                }, {
                    "derecho": "Derecho a la información veraz, oportuna y adecuada por parte del Estado. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 56,
                    "texto": " Todas las personas tienen derecho a recibir del Estado información veraz, adecuada y oportuna, conforme a las regulaciones establecidas. "
                }, {
                    "derecho": "Derecho al uso, disfrute y libre disposición de la propiedad. ",
                    "status": "new",
                    "subject": "propietarios",
                    "numero": 57,
                    "texto": " El Estado garantiza el uso, disfrute y libre disposición de la propiedad, de conformidad con lo establecido en la ley. "
                }, {
                    "derecho": "libertad de conciencia",
                    "status": "new",
                    "subject": false,
                    "numero": 59,
                    "texto": "El Estado reconoce, respeta y garantiza la libertad de pensamiento, conciencia y expresión. "
                }, {
                    "derecho": "Libertad de prensa. ",
                    "status": "old",
                    "subject": "ciudadanos",
                    "numero": 60,
                    "texto": "Se reconoce a los ciudadanos la libertad de prensa.  Este derecho se ejerce de conformidad con la ley.  Los medios fundamentales de comunicación social, en cualquiera de sus soportes, son de propiedad socialista de todo el pueblo, lo que asegura su uso al servicio de toda la sociedad.  El Estado establece los principios de organización y funcionamiento para todos los medios de comunicación social. "
                }, {
                    "derecho": "Derecho a manifestación. ",
                    "status": "old",
                    "subject": false,
                    "numero": 61,
                    "texto": "Los derechos de reunión, manifestación y asociación,  con fines lícitos y pacíficos, se reconocen por el Estado siempre que se ejerzan con respeto al orden público y el acatamiento a las preceptivas establecidas en la ley. "
                }, {
                    "derecho": "Derecho a profesar o no y a cambiar de creencia religiosa. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 62,
                    "texto": " Toda persona tiene derecho a profesar o no creencias religiosas, a cambiarlas y a practicar la de su preferencia, con el debido respeto a otros credos y de conformidad con la ley. "
                }, {
                    "derecho": "Derecho a formular quejas al Estado. ",
                    "status": "old",
                    "subject": "personas",
                    "numero": 64,
                    "texto": " Las personas tienen derecho a dirigir quejas y peticiones a las autoridades,  las que están obligadas  a tramitarlas en plazo adecuado, dando las respuestas oportunas y pertinentes de conformidad con la ley. "
                }, {
                    "derecho": "Derechos de creación intelectual. ",
                    "status": "new",
                    "subject": "Autores y titulares",
                    "numero": 65,
                    "texto": " Se reconocen a las personas los derechos derivados de la creación intelectual, conforme a la ley y los tratados internacionales.  Los derechos adquiridos se ejercen por los autores y titulares en correspondencia con las políticas públicas. "
                }, {
                    "derecho": "Derecho a la sucesión. ",
                    "status": "new",
                    "subject": false,
                    "numero": 66,
                    "texto": "El Estado reconoce el derecho a la sucesión  por causa de muerte. La ley regula su contenido y alcance. "
                }, {
                    "derecho": "Derecho a obtener un empleo digno, en correspondencia con su elección, calificación, aptitud y exigencias. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 75,
                    "texto": " La persona en condición de trabajar tiene derecho a obtener un empleo digno, en correspondencia con su elección, calificación, aptitud y exigencias de la economía y la sociedad. "
                }, {
                    "derecho": "Derecho al descanso, que se garantiza por la jornada de trabajo de ocho horas, el descanso semanal y las vacaciones anuales pagadas. ",
                    "status": "old",
                    "subject": "trabajador",
                    "numero": 78,
                    "texto": "El que trabaja tiene derecho al descanso, que se garantiza por la jornada de trabajo de ocho horas, el descanso semanal y las vacaciones anuales pagadas. La ley define aquellos otros supuestos en los que excepcionalmente se pueden aprobar jornadas diferentes de trabajo, con respeto al descanso. "
                }, {
                    "derecho": "Derecho a la seguridad social. ",
                    "status": "old",
                    "subject": "trabajador",
                    "numero": 79,
                    "texto": " Se reconoce el derecho a la seguridad social. El Estado,  mediante el sistema de seguridad social, garantiza la protección adecuada de todo trabajador impedido de laborar por su edad,  maternidad, paternidad,  invalidez o enfermedad. En caso de muerte del trabajador, el Estado brinda similar protección a su familia. "
                }, {
                    "derecho": "Derecho a la atención médica y a subsidio o jubilación en los casos de incapacidad temporal o permanente de trabajo. ",
                    "status": "old",
                    "subject": "trabajador",
                    "numero": 80,
                    "texto": "El Estado garantiza el derecho a la protección, seguridad y salud en el trabajo mediante la adopción de medidas adecuadas para la prevención de accidentes y enfermedades profesionales. El que sufre un accidente en el trabajo o contrae una enfermedad profesional tiene derecho a la atención médica y a subsidio o jubilación en los casos de incapacidad temporal o permanente de trabajo. "
                }, {
                    "derecho": "Derecho a la vivienda. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 82,
                    "texto": " Se reconoce el derecho  de las personas a una vivienda digna. El Estado trabaja para hacer efectivo este derecho mediante programas de construcción de viviendas, con la participación de entidades y de la población, en correspondencia con las normas del ordenamiento territorial y urbano y las leyes. "
                }, {
                    "derecho": "Derecho a la salud",
                    "status": "old",
                    "subject": "personas",
                    "numero": 83,
                    "texto": " La salud pública es un derecho de todas las personas. El Estado garantiza el acceso y la gratuidad de los servicios de atención, protección y recuperación.  La ley define el modo en que los servicios de salud se prestan. "
                }, {
                    "derecho": "Derecho a la educación. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 84,
                    "texto": " La educación es un derecho de todas las personas  y una responsabilidad del Estado, la sociedad y las familias.  El Estado  garantiza a sus ciudadanos servicios de educación gratuitos y asequibles para su formación integral, desde el preescolar hasta la enseñanza universitaria de pregrado, conforme a las exigencias sociales y a las necesidades del desarrollo económico-social del país. La ley define, entre otras cuestiones, el alcance de la obligatoriedad de estudiar y la preparación general básica que, como mínimo, debe adquirir todo ciudadano.  Se garantiza la formación posgraduada y la educación de las personas adultas, de conformidad con las regulaciones establecidas. "
                }, {
                    "derecho": "Derecho a la educación física, al deporte y a la recreación como elementos esenciales de su calidad de vida. ",
                    "status": "old",
                    "subject": "personas",
                    "numero": 85,
                    "texto": "Las personas tienen derecho a la educación física, al deporte y a la recreación como elementos esenciales de su calidad de vida.  Los planes de estudio del sistema nacional de educación garantizan la inclusión de la enseñanza y práctica de la educación física y el deporte como parte de la formación integral de la niñez, la adolescencia y la juventud.  El Estado trabaja para garantizar los recursos necesarios dedicados a la promoción y práctica del deporte y la recreación del pueblo,  así como para la preparación y desarrollo de los talentos deportivos. "
                }, {
                    "derecho": "Derecho a vivir en un medio ambiente sano y equilibrado. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 86,
                    "texto": " Todas las personas tienen derecho a vivir en un medio ambiente sano y equilibrado. El Estado protege el medio ambiente y los recursos naturales del país. Reconoce su estrecha vinculación con el desarrollo sostenible de la economía y la sociedad para hacer más racional la vida humana y asegurar la supervivencia, el bienestar y la seguridad de las generaciones actuales y futuras. "
                }, {
                    "derecho": "Derecho al agua. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 87,
                    "texto": " Todas las personas tienen derecho al agua, con la debida retribución y uso racional. "
                }, {
                    "derecho": "Derecho a la alimentación. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 88,
                    "texto": " Se reconoce el derecho de las personas a la alimentación. El Estado trabaja para alcanzar la seguridad alimentaria de toda la población. "
                }, {
                    "derecho": "Derecho a consumir bienes y servicios de calidad. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 89,
                    "texto": " Todas las personas tienen derecho a consumir bienes y servicios de calidad y que no atenten contra su salud, y a acceder a información adecuada y veraz sobre estos, así como a recibir un trato equitativo y digno de conformidad con la ley. "
                }, {
                    "derecho": "Derecho a participar en la vida cultural y artística. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 90,
                    "texto": " Todas las personas tienen derecho a participar en la vida cultural y artística de la nación. El Estado promueve la cultura y las distintas manifestaciones artísticas, de conformidad con la política cultural y la ley. "
                }, {
                    "derecho": "Derecho a la participación en la conformación, ejercicio y control del poder del Estado. ",
                    "status": "new",
                    "subject": "ciudadano cubano",
                    "numero": 92,
                    "texto": " El ciudadano cubano tiene derecho a participar en la conformación, ejercicio y control del poder del Estado, en razón a esto puede, de conformidad con la Constitución y las leyes : "
                }, {
                    "derecho": "Derecho a reclamar ante los tribunales cuando se vulneran los derechos por los organos del Estado. ",
                    "status": "new",
                    "subject": "personas",
                    "numero": 94,
                    "texto": " La persona a la que se le vulneren sus derechos y sufriere daño o perjuicio por órganos del Estado, sus directivos,  funcionarios y empleados,  con motivo de la acción u omisión indebida de sus funciones,  tiene derecho a reclamar,  ante los tribunales, la restitución de los derechos y obtener,  de conformidad con la ley,  la correspondiente reparación o indemnización. La ley establece la pertinencia y el procedimiento preferente, expedito y concentrado para su cumplimiento. "
                }, {
                    "derecho": "Derecho a intervenir en la dirección del Estado, bien directamente o por intermedio de sus representantes. ",
                    "status": "old",
                    "subject": "ciudadanos",
                    "numero": 199,
                    "texto": "Todos los ciudadanos, con capacidad legal para ello, tienen derecho a intervenir en la dirección del Estado, bien directamente o por intermedio de sus representantes elegidos para integrar los órganos del Poder Popular y a participar, con ese propósito, en la forma prevista en la ley, en elecciones periódicas,  plebiscitos y referendos populares, que serán de voto libre, igual, directo y secreto. Cada elector tiene derecho a un solo voto. "
                }, {
                    "derecho": "Derecho al voto",
                    "status": "old",
                    "subject": "ciudadanos",
                    "numero": 200,
                    "texto": " El voto es un derecho y un deber ciudadano. Lo ejercen voluntariamente los cubanos, hombres y mujeres, mayores de dieciséis años de edad, excepto : "
                }
                ]
            }
        },
        methods:{
            showRights: function(status){
                switch (status) {
                    case 'all': {
                            this.all= true
                            this.old= false
                            this.new= false
                        break;
                    }
                    case 'old': {
                        this.all= false
                        this.old= true
                        this.new= false
                        break;
                    }
                    case 'new': {
                        this.all= false
                        this.old= false
                        this.new= true
                        break;
                    }

                }
            },
            getArticle: function (index) {
                this.article = "Artículo "+this.items[index].numero;
                this.right = this.items[index].derecho;
                if(this.items[index].subject)
                    this.typo ="Dirigido a: "+  this.items[index].subject;
                else
                    this.typo = ""
                this.textArticle = this.items[index].texto;
            },
            visible: function (index) {
                if(this.all){
                    return true
                }
                if(this.new && this.items[index].status ==  "new"){
                    return true
                }
                if(this.old && this.items[index].status ==  "old"){
                    return true
                }
                return false
            }
        },
    }
</script>

<style scoped>
    .box-rigths {
        margin-top: 10px;
        max-height: 400px;
        overflow: scroll;
    }

    .item-rights {
        cursor: pointer;
        padding: 5px 10px 5px 0px;
        text-align: justify;
        list-style: none;
    }

    .rights{
        color: #d77206;
        font-weight: bold;
    }
    .side-rigths{
        padding-top: 50px;
    }

    .art-rights{
        cursor: zoom-in;
    }
</style>