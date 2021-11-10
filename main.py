from flask import Flask
from flask.templating import render_template 
from flask import render_template 
from flask import request
from block import write_block, check_integrity, read_blockchain
from firebase import firebase
import firebase_configuration
import pyrebase
import json
import hashlib


# Inicializando la app
app = Flask(__name__,static_url_path = '',
            static_folder = 'app/static', template_folder = 'app/templates'
            ) 

# Creamos la instancia de firebase que conecte a nuestra BD 
firebase = pyrebase.initialize_app(firebase_configuration.FIREBASE_CONFIG) 
db = firebase.database()
#firebase = firebase.FirebaseApplication("https://blockchain-29b1a-default-rtdb.firebaseio.com/", None)

###### Definimos las rutas del proyecto ######

### Ruta del login
@app.route('/')
def inicio(): 
    return render_template('login.html')

### Ruta del panel de los centros educativos
@app.route('/panel_admin_centro')
def panel_admin_centro(): 
    return render_template('panel_admin_centro.html')


## Ruta del registro de diplomas
@app.route('/registrar_diploma', methods = ['POST', 'GET'])
def registrar_diploma():
    if request.method == 'POST':
        
        ### Obtenemos las variables del formulario
        dni = request.form.get('dni') # Va a la Blockchain
        nomb_curso = request.form.get('nomb_curso') # Va a la Blockchain
        nota = request.form.get('nota') # Va a la Blockchain
        institucion = request.form.get('institucion') # Va a la Blockchain
        
        ### Obtenemos algunas variables más necesarias para el diploma ###
        ### Consultando Firebase ###
        #### Tabla alumnos ####
        alumno_ref =  db.child("proyecto/alumnos").child(dni)
        alumno_data = alumno_ref.get()
        alumno_val = alumno_data.val()
        alumno_val = alumno_val.items()
        alumno_val = list(alumno_val)
        print(alumno_val)
        
        # Nombre
        nombres = alumno_val[3][1] # Va a la Blockchain
        
        # Apelido paterno
        ap_paterno = alumno_val[1][1] # Va a la Blockchain
        
        # Apelido materno
        ap_materno = alumno_val[0][1] # Va a la Blockchain
        
        # Condicion
        if (int(nota) > 14):
            condicion = "APROBADO" # Va a la Blockchain
        else:
            condicion = "DESAPROBADO"

        ### Tabla alumnos-cursos ###
        alumno_curso_ref =  db.child("proyecto/alumnos_cursos").child(dni)
        alumno_ref_data = alumno_curso_ref.get()
        alumno_ref_val = alumno_ref_data.val()
        alumno_ref_val = alumno_ref_val.items()
        alumno_ref_val = list(alumno_ref_val)
        alumno_ref_val_long = len(alumno_ref_val)
        
        ### Buscamos la fecha de inicio - fin
        for i in range(alumno_ref_val_long): 
            if (nomb_curso == alumno_ref_val[i][1]['curso']):
                fecha_inicio_fin = str(alumno_ref_val[i][1]['fecha_inicio_fin']) # Va a la Blockchain
        
        """print("Datos que llegan a la blockchain:" , dni,nombres,ap_paterno,ap_materno,nomb_curso,
              fecha_inicio_fin,nota,condicion,institucion)"""
        
        write_block(dni = dni, nombres = nombres, ap_paterno = ap_paterno, ap_materno = ap_materno,
                    curso = nomb_curso , fecha_inicio_fin = fecha_inicio_fin, nota = nota, 
                    institucion = institucion, condicion = condicion
                    )

    return render_template('registrar_diploma.html') 


@app.route('/checking')
def check(): 
    results = check_integrity()
    return render_template('registrar_diploma.html', checking_results = results)


### Ruta para comprobar la integridad de la Blockchain
@app.route('/integrity')
def integred():

    results = check_integrity()

    return render_template('integrity.html', checking_results = results)


### Ruta para registrar un alumno dentro de un curso
@app.route('/registrar_alumno', methods = ['POST', 'GET'])
def registrar_alumno():
    if request.method == 'POST':
        
        ### Identificador del bloque de alumno ###
        dni = request.form.get('dni')
        
        ### Informacion general ###
        nombres = request.form.get('nombres')
        ap_paterno = request.form.get('ap_paterno')
        ap_materno = request.form.get('ap_materno')
        
        ### Informacion del curso ###
        cod_curso = request.form.get('curso') #codigo del curso
        fecha_inicio_fin = request.form.get('fecha_inicio_fin')
        horario = request.form.get('horario')
        
        ### Obtenemos el nombre del curso en base al codigo obtenido
        # Tabla curso
        curso_ref =  db.child("proyecto/cursos").get()
        curso_val = curso_ref.val()
        curso_val = curso_val.items()
        curso_val = list(curso_val)
       
        num_cursos = len(curso_val)
        
        lista_cursos = []

        ### Búsqueda del código del curso en Firebase
        for i in range(num_cursos):
            if (cod_curso == curso_val[i][1]['codigo']):
                lista_cursos.append(curso_val[i][1]['nombre']) 
        
        lista_cursos = list(set(lista_cursos))
        
        ### Nombre del curso en base al codigo
        nomb_curso = lista_cursos[0]
        
        ### Creamos los arreglos ####
        # Alumno
        alumno = {}
        alumno['dni'] = dni
        alumno['nombres'] = nombres 
        alumno['ap_paterno'] = ap_paterno 
        alumno['ap_materno'] = ap_materno
        
        # Alumno - Curso 
        alumno_curso = {}
        alumno_curso['curso'] = nomb_curso ### nomb_curso 
        alumno_curso['fecha_inicio_fin'] = fecha_inicio_fin
        alumno_curso['horario'] = horario
        
        
        ### Agregando la data a firebase
        # Tabla alumno
        alumn_ref =  db.child("proyecto").child("alumnos").child(dni)
        alumn_ref.set(alumno)
        
        # Tabla alumnos-cursos
        db.child("proyecto").child("alumnos_cursos").child(dni).child(cod_curso).set(alumno_curso)
        
    return render_template('registrar_alumno.html')


### Ruta para registrar cursos nuevos
@app.route('/registrar_curso' , methods = ['POST', 'GET'])
def registrar_curso():

    cursos = []

    if request.method == 'POST': 

        codigo = request.form.get('codigo')
        nombre = request.form.get('nombre') 
        tipo = request.form.get('tipo')
        hora = request.form.get('hora')
        dia = request.form.get('dia')
        hora_inicio = request.form.get('hora_inicio')
        hora_fin = request.form.get('hora_fin')
        fecha_inicio = request.form.get('fecha_inicio')
        fecha_fin = request.form.get('fecha_fin')
        horario = request.form.get('horario')

        curso = {} 
        curso['codigo'] = codigo 
        curso['nombre'] = nombre 
        curso['tipo'] = tipo 
        curso['hora'] = hora
        curso['dia'] = dia
        curso['hora_inicio'] = hora_inicio
        curso['hora_fin'] = hora_fin
        curso['fecha_inicio'] = fecha_inicio 
        curso['fecha_fin'] = fecha_fin 
        curso['horario'] = horario
        
        #sent = json.dumps(cursos)
        
        ## Agregando la data a firebase
        hash = json.dumps(curso, sort_keys=True).encode()
        print(hash)
        hash = hashlib.sha256(hash).hexdigest()
        print(hash)
        db.child("proyecto").child("cursos").child(hash).set(curso)
        #resultado = firebase.post('/proyecto/cursos',cursos)

    return render_template('registrar_curso.html')


### Ruta para registrar alumnos en cursos existentes

if __name__ == '__main__': 
    app.run(debug = True, port = 4000)