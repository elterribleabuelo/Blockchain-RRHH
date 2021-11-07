from flask import Flask
from flask.templating import render_template 
from flask import render_template 
from flask import request
from block import write_block, check_integrity, read_blockchain




app = Flask(__name__,static_url_path = '',
            static_folder = 'app/static', template_folder = 'app/templates'
            ) 


@app.route('/')
def inicio(): 
    return render_template('login.html')

@app.route('/panel_admin_centro')
def panel_admin_centro(): 
    return render_template('panel_admin_centro.html')


@app.route('/index', methods = ['POST', 'GET'])
def index():
    if request.method == 'POST': 
        nombres = request.form.get('nombres') 
        ap_paterno = request.form.get('ap_paterno') 
        ap_materno = request.form.get('ap_materno')
        dni = request.form.get('dni')
        curso = request.form.get('curso')
        nota = request.form.get('nota')
        institucion = request.form.get('institucion')
        condicion = request.form.get('condicion')

        #print(borrower)
        #print(lender)
        #print(amount) 

        write_block(nombres = nombres, ap_paterno = ap_paterno, ap_materno = ap_materno, 
                    dni = dni, curso = curso , nota = nota, 
                    institucion = institucion, condicion = condicion
                    )

    return render_template('index.html') 


@app.route('/checking')
def check(): 
    results = check_integrity()
    return render_template('index.html', checking_results = results)



@app.route('/integrity')
def integred():

    results = check_integrity()

    return render_template('integrity.html', checking_results = results)

if __name__ == '__main__': 
    app.run(debug = True, port = 4000)