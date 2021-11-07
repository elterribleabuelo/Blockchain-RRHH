import json 
import os
import hashlib 

BLOCKCHAIN_DIR = 'blockchain/'


def get_hash(prev_block): 
    with open(BLOCKCHAIN_DIR + prev_block, 'rb') as f:
        content = f.read() 
    return hashlib.md5(content).hexdigest()





def check_integrity(): 
    files = sorted(os.listdir(BLOCKCHAIN_DIR), key = lambda x: int(x))
    results = [] 
    #print(files)


    for file in files[1:]: 
        #print("File:",file)
        with open(BLOCKCHAIN_DIR + file) as f: 
            block = json.load(f) 

        nombres = block.get('nombres')
        ap_paterno = block.get('ap_paterno')
        ap_materno = block.get('ap_materno')
        dni = block.get('dni')
        curso = block.get('curso')
        nota = block.get('nota')
        institucion = block.get('institucion')
        condicion = block.get('condicion')
        prev_hash = block.get('prev_block').get('hash') # PREV_HASH DEL BLOQUE 9 , PERO QUE PERTENECE AL BLOQUE 8
        prev_filename = block.get('prev_block').get('filename') # OBTENEMOS EL NÚMERO DEL BLOQUE ANTERIOR

        actual_hash = get_hash(prev_filename) # HASH DEL BLOQUE ANTERIOR (8)

        if prev_hash == actual_hash: 
            res = 'Ok'
            estado = 0
        
        else: 
            res = 'ha sido cambiado'
            estado = 1

        #print(f'Bloque {prev_filename}: {res}') 

        results.append({'block' : int(prev_filename) + 1, 'result': res, 'estado': estado, 
                        'nombres':nombres, 'ap_paterno' : ap_paterno,'ap_materno': ap_materno,
                        'dni' : dni,'curso': curso, 'nota' : nota,'institucion': institucion,
                        'condicion': condicion}) # Aca deben viajar las variables

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





def write_block(nombres, ap_paterno, ap_materno,curso,nota,institucion,condicion,dni):

    blocks_count = len(os.listdir(BLOCKCHAIN_DIR)) # numero de registros del blockchain
    prev_block = str(blocks_count) # int a str

    data = {
        "nombres" : nombres,
        "ap_paterno" : ap_paterno,
        "ap_materno" : ap_materno,
        "dni" : dni,
        "curso" : curso,
        "nota" : nota,
        "institucion" : institucion,
        "condicion" : condicion,
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