import json 
import os
import hashlib 
import pyrebase
import firebase_configuration


BLOCKCHAIN_DIR = 'blockchain/'

## Firebase initiation 
# firebase = pyrebase.initialize_app(firebase_configuration.FIREBASE_CONFIG) 
# db = firebase.database()

def get_hash(prev_block): 
    with open(BLOCKCHAIN_DIR + prev_block, 'rb') as f:
        content = f.read() 
    return hashlib.md5(content).hexdigest()


def check_integrity(): 
    files = sorted(os.listdir(BLOCKCHAIN_DIR), key = lambda x: int(x))
    results = [] 
    #print(files)


    for file in reversed(files[1:]): 
        ## Entro al bloque 3
        with open(BLOCKCHAIN_DIR + file) as f: 
            block = json.load(f) 

        ######################## Datos del bloque actual ###############################
        ######################## Por ejemplo: Bloque 8 #################################
        nombres = block.get('nombres')
        ap_paterno = block.get('ap_paterno')
        ap_materno = block.get('ap_materno')
        dni = int(block.get('dni'))
        curso = block.get('curso')
        fecha_inicio_fin = block.get('fecha_inicio_fin')
        nota = int(block.get('nota'))
        institucion = block.get('institucion')
        condicion = block.get('condicion')
        link = block.get('link')
        
        ######################## HASH del bloque anterior #################################
        ####Bloque actual = 8 ####
        ##### Por ejemplo: Bloque 8-1 = 7 (bloque anterior) ######
        ##### Prev_hash del bloque 8, pero que codifica informacion del bloque 7 #####
        prev_hash = block.get('prev_block').get('hash') 
        
        #######################  NUMERO DE BLOQUE ANTERIOR (1 menos que el actual)  #################################
        #####   Por ejemplo: Bloque 8-1 = 7 #####
        prev_filename = block.get('prev_block').get('filename') ### 7

        ####################### HASH ACTUAL DEL BLOQUE ANTERIOR (7) ###############################################
        actual_hash = get_hash(prev_filename)  ### El que puede ser modificado (escribiendo otro valor en algun dato del bloque 7)

        if prev_hash == actual_hash: 
            estado = 0 # No ha sido cambiado los valores de la blockchain
        
        else: 
            estado = 1 # Si ha sido cambiado los valores de la blockchain

        #print(f'Bloque {prev_filename}: {res}') 
        
        
        results.append({'block' : int(prev_filename) + 1,'estado': estado, 
                        'nombres':nombres, 'ap_paterno' : ap_paterno,'ap_materno': ap_materno,
                        'dni' : dni,'curso': curso, 'fecha_inicio_fin':fecha_inicio_fin, 'nota' : nota,'institucion': institucion,
                        'condicion': condicion,'link' : link}) # Aca deben viajar las variables

    return results 


def read_blockchain(num_registro):

    with open(BLOCKCHAIN_DIR + str(num_registro)) as f:

        block = json.load(f) 

        #nombre = block['nombre']
        #ap_paterno = block['ap_paterno']
        #ap_materno = block['ap_materno']
        #dni = block['dni']
        #curso = block['curso']
        #nota = block['nota']
        #institucion = block['institucion']
        #condicion = block['condicion']

    return block





def write_block(dni, nombres, ap_paterno, ap_materno,curso, fecha_inicio_fin,nota,institucion,condicion,link):

    blocks_count = len(os.listdir(BLOCKCHAIN_DIR)) # numero de registros del blockchain
    prev_block = str(blocks_count) # int a str

    data = {
        "nombres" : nombres,
        "ap_paterno" : ap_paterno,
        "ap_materno" : ap_materno,
        "dni" : int(dni),
        "curso" : curso,
        "fecha_inicio_fin":fecha_inicio_fin,
        "nota" : int(nota),
        "institucion" : institucion,
        "condicion" : condicion,
        "link": link,
        "prev_block":{
            "hash" : get_hash(prev_block),
            "filename" : prev_block
        }
    }

    current_block = BLOCKCHAIN_DIR + str(blocks_count + 1)

    with open(current_block,'w') as f: 
        json.dump(data, f, indent = 4, ensure_ascii = False) 
        f.write('\n')
    
    return 0





def main():
    #read_blockchain(1)
    #write_block(borrower = "Andrew", lender = "Kate", amount = 100)
    check_integrity()
    #pass





if __name__ == '__main__':
    main()