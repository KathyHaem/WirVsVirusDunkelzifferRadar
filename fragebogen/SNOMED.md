# SNOMED und OMOP CDM Codes

## Allgemeines

| Variable | SNOMED Name | SNOMED Code | OMOP Concept ID | relationship |
| -------- | -------- | -------- |-------- |-------- |
| Geschlecht | gender | 263495000 | 4135376 | is a "General Clinical state"|
| weiblich | female | 248152002 | 442986 | is a "finding related to biological sex" |
| weiblich | FEMALE (OMOP)| -- | 8532 | -- |
| männlich | male | 248153007 | 442985| is a "finding related to biological sex" |
| männlich | MALE (OMOP) | -- | 8507 | -- |
| divers  | non-binary gender | 772004004 | 36675593 | is a "gender finding" |
| PLZ | Patient postal code | 184102003 | 4083591 | is a "Demographic history detail" |
| Geburtsdatum | Date of Birth | 184099003 | 4083587 | is a "Demographic history detail" |

## Husten
[Referenz f. Hustenarten](https://www.healthline.com/health/types-of-coughs#paroxysmal-cough)

| Variable | SNOMED Name | SNOMED Code | OMOP Concept ID | relationship |
| -------- | -------- | -------- |-------- |-------- |
| Husten | Cough | 49727002 | 254761 | is a "Resporatory function finding" |
| trockener Husten | Dry cough | 11833005 | 4038519 | is a "Cough" |
| feuchter Husten | Productive cough | 28743005 | 4102774 | is a "Cough" |
| schmerzhafter Husten | Painful cough | 247410004 | 4090569 | is a "Cough" |

## Fieber
Fieber == gemessenes Fieber

| Variable | SNOMED Name | SNOMED Code | OMOP Concept ID | relationship |
| -------- | -------- | -------- |-------- |-------- |
| Fieber | Fever | 386661006 | 437663 | is a "Body temperature above reference range" |
| gefühltes Fieber | Feeling feverish | 103001002 | 4011766 | is a "Temperature symptoms" |
| gemessenes Fieber | Fever | 386661006 | 437663 | is a "Body temperature above reference range" |

## Nasenstatus
| Variable | SNOMED Name | SNOMED Code | OMOP Concept ID | relationship |
| -------- | -------- | -------- |-------- |-------- |
| "Schnupfensymptome" | 
| Atmung (Nase) | Nose finding | 118237005 | 4042142 | is a "Finding of face" |
| Verstopfte Nase | Nasal congestion | 68235000 | 4195085 | is a "Nose finding" |
| Laufende Nase | Nasal discharge | 64531003 | 4276172 | is a "Nose finding" |
| Niesend | Sneezing | 76067001 | 4328356 | is a "Nose finding" |

## Schmerzen
| Variable | SNOMED Name | SNOMED Code | OMOP Concept ID | relationship |
| -------- | -------- | -------- |-------- |-------- |
| Schmerzen | Schmerzen | 22253000 | 4329041 |is a "pain / sensation finding" |
| Kopfschmerzen | Headache | 25064002 | 378253 | is a "head finding" |
| Gliederschmerzen | Growing pains | 102482005 | 4010339 | is a "Pain in limb" |

## Verdauungsprobleme
| Variable | SNOMED Name | SNOMED Code | OMOP Concept ID | relationship |
| -------- | -------- | -------- |-------- |-------- |
| Verdauungsprobleme | Digestive system finding | 386617003 | 4302537 | is a "Finding by site" |
| Verstopfung | Constipation | 14760008 | 75860 | is a "Altered bowel function" |
| Durchfall | Diarrhea | 62315008 | 196523 | is a "Altered bowel function" |
| Erbrechen | Finding of vomiting | 300359004 | 4101344 | is a "Functional finding of gastrointestinal tract (finding)" |
| Übelkeit | Nausea | 422587007 | 31967 | is a "Gastrointestinal tract finding" |

## Halsschmerzen
| Variable | SNOMED Name | SNOMED Code | OMOP Concept ID | relationship |
| -------- | -------- | -------- |-------- |-------- |
| Halsschmerzen | Sore Throat Symptom | 267102003 | 4147326 | is a "Pain in Throat" |
| Schluckbeschwerden | Difficulty Swallowing | 288939007 | 4125274 | is a "Finding related to ability to swallow" |
| Halskratzen | Throat Discomfort (mapped as "Pain in Throat") | 267102003 | 4147326 | is a "Pain in Throat" |

## Atembeschwerden
| Variable | SNOMED Name | SNOMED Code | OMOP Concept ID | relationship |
| -------- | -------- | -------- |-------- |-------- |
| Atembeschwerden | Difficulty breathing | 230145002 | 312437 | is a "Finding of ease of respiration" |
| Kurzatmigkeit |  Dyspnea | 267036007 | 312437 | is a "Difficulty breathing" |
| Schwere Atmung | Labored breathing | 248549001 | 4087166 | is a "Difficulty breathing" |

## Erschöpfung
| Variable | SNOMED Name | SNOMED Code | OMOP Concept ID | relationship |
| -------- | -------- | -------- |-------- |-------- |
| Erschöpfung | Energy or stamina finding | 359752005 | 4230389 | is a "Metabolic finding" |
| Ermüdung | Fatigue | 84229001 | 4223659 | is a "Energy or stamina finding" |
| Kraftlosigkeit | Lack of energy | 248274002 | 4087481 | is a "Fidning of general energy" |

## Abfrage Corona
 Variable | SNOMED Name | SNOMED Code | OMOP Concept ID | relationship |
| -------- | -------- | -------- |-------- |-------- |
| Getestet auf Coronavirus? | Measurement of coronavirus antibody | 121973000 | 4007829 | is a "Viral serologic study" |
| Positiv getestet auf Coronavirus | Coronavirus infection | 186747009 | 439676 | is a "Disease caused by Coronaviridae" |
| Negativ getestet auf Coronavirus |  |  |  |  |

# Vorerkrankungen
 Variable | SNOMED Name | SNOMED Code | OMOP Concept ID | relationship |
| -------- | -------- | -------- |-------- |-------- |
| Asthma | Asthma | 195967001 | 317009 | is a "Disorder of respiratory system" |
| Heuschnupfen| Allergic rhinitis caused by pollen | 21719001 | 256439 | is a "Seasonal allergic rhinitis" |
| Bluthochdruck | Hypoertensive Disorder | 38341003 | 316866 | is a "Disorder of Cardiovascular System" |
| Diabetes | Diabetes mellitus | 73211009 | 201820 | is a "disorder of endocrine system"

# ursprünglicher Fragenentwurf
* [x] Allgemeines

Warst du schon mal hier? sonst:
* [x] PLZ
* [x] Geschlecht
* [x] Alter

Physische Gesundheit
Symptome
* [x] Husten | Trocken, Schleimig, Schmerzvoll, Sonstige
* [x] Fieber | Gefühlt, Gemessen
* [x] Nasenstatus (Laufend, Verstopft, Niesend)
* [x] Schmerzen | Kopfschmerzen, Gliederschmerzen
* [x] Durchfall | Ja, Nein
* [x] Halsschmerzen | Kratzend, Schmerzend, ...
* [x] Atmung | Kurzatmig 
* [ ] Energiestatus (physisch) | Müde, träge, antriebslos
* [ ] Getestet auf Corona? 
* [x] Vorerkrankungen | Asthma, Heuschnupfen, COPD, Sonstige 

Psychische Gesundheit
* [ ] Quarantänestatus | Selbstverordnet, Offiziell verordnet, Gar nicht
* [ ] Arbeitsstatus | An der Arbeitsstelle, Im home-office, Nicht arbeitend
* [ ] Stimmung (bzgl. persönlicher Situation) | Gut, genervt, ängstlich. hoffnungsvoll, normal
* [ ] Stimmung (bzgl. Corona) | Ängstlich, normal, genervt, zuversichtlich
