#!/usr/bin/env python3.8

from namelist import docker_string_list
from namelist import docker_string_names

from datetime import date
import json
import os
import random
import sys

#
# Generates n questionnaires as JSON-files in the folder "generated"
#
def generate():
    questionnaire = {}

    # Allgemeines
    questionnaire['406543005'] = date.today().isoformat()     # 406543005 == Date of Visit
    questionnaire['118522005'] = random_name()  # 118522005 == Identifier
    questionnaire['263495000'] = random_gender()# 263495000 == Gender
    questionnaire['397669002'] = random_age()   # 397669002 == Age
    questionnaire['184102003'] = random_plz()   # 184102003 == Patient postal code

    # Physische Gesundheit
    ## Husten
    questionnaire['49727002'] = random_boolean() # 49727002 == Cough
    questionnaire['11833006'] = random_subquestion_boolean(questionnaire['49727002']) # 11833005 == Dry cough
    questionnaire['28743005'] = random_subquestion_boolean(questionnaire['49727002']) # 28743005 == Productive cough (schleimiger Husten)
    questionnaire['247410004'] = random_subquestion_boolean(questionnaire['49727002']) # 247410004 == Painful cough

    ## Fieber
    questionnaire['386661006'] = random_boolean() # 386661006 == Fever
    questionnaire['103001002'] = random_subquestion_boolean(questionnaire['386661006']) # 103001002 == Feeling feverish

    ## Schnupfen
    questionnaire['82272006'] = random_boolean() # 82272006 == Common cold

    ## Schmerzen
    questionnaire['22253000'] = random_boolean() # 22253000 = Pain
    questionnaire['25064002'] = random_subquestion_boolean(questionnaire['22253000']) # 25064002 == Headache
    questionnaire['102482005'] = random_subquestion_boolean(questionnaire['22253000']) # 102482005 == Growing pains

    ## Verdauungsprobleme
    questionnaire['386617003'] = random_boolean() # 386617003 == Digestive system finding (Vardauungsprobleme)

    ## Halsschmerzen
    questionnaire['267102003'] = random_boolean() # 267102003 == Sore Throat Symptom

    ## Kurzatmigkeit
    questionnaire['267036007'] = random_boolean() # 267036007 == Dyspnea (Kurzatmigkeit)

    ## Erschöpfung
    questionnaire['84229001'] = random_boolean() # 84229001 == Fatigue (Erschöpfung)

    # Corona Tests
    questionnaire['121973000'] = random_boolean() # 121973000 == Measurement of coronavirus antibody
    questionnaire['186747009'] = random_subquestion_boolean(questionnaire['121973000']) # 186747009 == Coronavirus infection
    questionnaire['432213005'] = date.today().isoformat() if questionnaire['186747009'] else None # 432213005 == Date of diagnosis

    return questionnaire

def random_gender():
    gender = ['248152002',  # 248152002 == female
            '248153007',    # 248153007 == male
            '772004004']    # 772004004 == non-binary gender
    return random.choice(gender)

def random_name():
    return f'{random.choice(docker_string_list)}_{random.choice(docker_string_names)}'

def random_age():
    return random.randint(1, 99)

def random_plz():
    return f'{random.randint(0,9)}{random.randint(0,9)}{random.randint(0,9)}{random.randint(0,9)}{random.randint(0,9)}'

def random_boolean():
    return True if 1 == random.randrange(0, 2) else False

def random_subquestion_boolean(parent):
    if parent:
        return random_boolean()
    else:
        return False

def main(n):
    outpath = './generated/'
    if not os.path.exists(outpath):
        os.makedirs(outpath)
    for i in range(0, n):
        random_quest = generate()
        with open(f'generated/questionnaire_{i}.json', 'w+') as write_file:
            write_file.write(json.dumps(random_quest, indent=4))

if len(sys.argv) < 2 or not sys.argv[1].isnumeric():
    print('You have to supply the number of files you want to generate. E.g.:\n$ python3 generate_testdata.py 1000')
    exit(1)
print(f'Generating {sys.argv[1]} questionnaires.')
main(int(sys.argv[1]))